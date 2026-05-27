import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  setDoc, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { compressImageIfNeeded } from './utils/imageCompressor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import ContactHelperModal from './components/ContactHelperModal';
import { GalleryItem, Inquiry } from './types';
import { INITIAL_GALLERY, KEY_PRODUCTS } from './data';
import { 
  PhoneCall, 
  MessageCircle, 
  Settings2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Wrench,
  Sparkles,
  Award
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hansol_is_admin_v2') === 'true';
    } catch (e) {
      console.warn('localStorage is not available, defaulting isAdmin to false', e);
      return false;
    }
  });
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // States and behavior for smart contact fallbacks (tel, sms, kakao)
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalTab, setContactModalTab] = useState<'tel' | 'sms' | 'kakao'>('tel');

  const handleContactAction = (type: 'tel' | 'sms' | 'kakao', phone?: string) => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      if (type === 'tel') {
        window.location.href = `tel:${phone || '010-4610-3701'}`;
      } else if (type === 'sms') {
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const smsBody = '[한솔종합부러쉬] 안녕하세요, 산업용 맞춤 브러쉬 제작 견적 상담 요청합니다. 연락 부탁드립니다.';
        const separator = isIOS ? '&' : '?';
        const formattedPhone = (phone || '010-4610-3701').replace(/-/g, '');
        window.location.href = `sms:${formattedPhone}${separator}body=${encodeURIComponent(smsBody)}`;
      } else {
        // Fallback or dialog for Mobile Kakao
        setContactModalTab('kakao');
        setContactModalOpen(true);
      }
    } else {
      // Desktop
      setContactModalTab(type);
      setContactModalOpen(true);
    }
  };

  // Gallery items state (Starts with preset items, updated live from Firestore)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);

  // Client inquiries state (Starts empty, updated live from Firestore)
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Test Firestore Connection on startup
  useEffect(() => {
    async function testFirestore() {
      try {
        const { getDocFromServer } = await import('firebase/firestore');
        await getDocFromServer(doc(db, 'gallery', 'connection_test'));
      } catch (err) {
        console.warn('Firestore connectivity notification:', err);
      }
    }
    testFirestore();
  }, []);

  // One-time check and seed of gallery defaults on app startup
  useEffect(() => {
    async function seedGalleryIfEmpty() {
      try {
        const { getDocs, collection, writeBatch, doc } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'gallery'));
        if (snap.empty) {
          console.log('Gallery collection empty on startup. Seeding initial presets...');
          const batch = writeBatch(db);
          INITIAL_GALLERY.forEach((item) => {
            batch.set(doc(db, 'gallery', item.id), item);
          });
          await batch.commit();
        }
      } catch (e) {
        console.warn('One-time gallery seeding check ignored or failed:', e);
      }
    }
    const timer = setTimeout(() => {
      seedGalleryIfEmpty();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // One-time check and seed of inquiries defaults on app startup
  useEffect(() => {
    async function seedInquiriesIfEmpty() {
      try {
        const { getDocs, collection, writeBatch, doc } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'inquiries'));
        if (snap.empty) {
          console.log('Inquiries collection empty on startup. Seeding default inquiries...');
          const defaultInquiries: Inquiry[] = [
            {
              id: 'inq-1',
              clientName: '김태윤 차장 (현대건설 현장관리)',
              phone: '010-9876-5432',
              brushType: '굴삭기 청소솔 – 쎈솔',
              content: '인천 송도 아파트 토목 건설 현장에서 쓸 버킷 결착용 쎈솔 5대 특별 가공 및 단가 견적을 메일 혹은 문자로 우선 부탁드립니다.',
              createdAt: '2026-05-21',
              status: 'pending'
            },
            {
              id: 'inq-2',
              clientName: '김한아 매니저 (골프존파크 대화공단점)',
              phone: '010-1234-5678',
              brushType: '골프장/스크린골프용 브러쉬',
              content: '스크린골프 타격 연습장 벙커용 특수매트 8세트 주문 가공 요청드립니다. 기성 사이즈 600x400 호환 여부 궁금합니다.',
              createdAt: '2026-05-23',
              status: 'completed'
            }
          ];
          const batch = writeBatch(db);
          defaultInquiries.forEach((inq) => {
            batch.set(doc(db, 'inquiries', inq.id), inq);
          });
          await batch.commit();
        }
      } catch (e) {
        console.warn('One-time inquiries seeding check ignored or failed:', e);
      }
    }
    const timer = setTimeout(() => {
      seedInquiriesIfEmpty();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Real-time synchronization for Gallery Items with Firebase Firestore (Passive, no write loops!)
  useEffect(() => {
    const path = 'gallery';
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      if (snapshot.empty) {
        // Fallback to local INITIAL_GALLERY if Firestore is completely empty
        setGalleryItems(INITIAL_GALLERY);
      } else {
        const items: GalleryItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as GalleryItem);
        });
        // Sort newest first
        items.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
        setGalleryItems(items);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  // Real-time synchronization for Inquiries with Firebase Firestore (Passive, no write loops!)
  useEffect(() => {
    const path = 'inquiries';
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      if (snapshot.empty) {
        setInquiries([]);
      } else {
        const items: Inquiry[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as Inquiry);
        });
        items.sort((a, b) => b.id.localeCompare(a.id));
        setInquiries(items);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  // Migrate items stored in historical LocalStorage to Firestore once with automatic compression!
  useEffect(() => {
    async function migrateLocalStorage() {
      try {
        const priorKeys = [
          'hansol_gallery_v25',
          'hansol_gallery_v24',
          'hansol_gallery_v23',
          'hansol_gallery_v22',
          'hansol_gallery_v21',
          'hansol_gallery_v20',
          'hansol_gallery_v1',
          'hansol_gallery'
        ];
        
        for (const key of priorKeys) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              for (const item of parsed) {
                if (item && item.id && item.id !== 'gal-1' && item.id !== 'gal-2') {
                  // Verify that it is a valid GalleryItem object
                  if (item.title && item.imageUrl && item.category && item.createdAt) {
                    try {
                      // Compress historical local base64 image so it fits within Firestore's 1M limit
                      console.log('Compressing historical local image for:', item.title);
                      const optimizedUrl = await compressImageIfNeeded(item.imageUrl);
                      await setDoc(doc(db, 'gallery', item.id), {
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        imageUrl: optimizedUrl,
                        createdAt: item.createdAt,
                        ...(item.description ? { description: item.description } : {})
                      });
                      console.log('Successfully migrated item to Firebase:', item.title);
                    } catch (e) {
                      console.error('Error migrating item:', item.id, e);
                    }
                  }
                }
              }
              break;
            }
          }
        }
      } catch (err) {
        console.warn('Migration from localStorage skipped or failed:', err);
      }
    }
    const timer = setTimeout(() => {
      migrateLocalStorage();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('hansol_is_admin_v2', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.warn('Unable to write isAdmin to localStorage', e);
    }
  }, [isAdmin]);

  // Gallery Management handlers
  const handleAddGalleryItem = async (newItem: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const guid = `gal-${Date.now()}`;
    const path = 'gallery';
    try {
      console.log('Optimizing selected image before storing in secure database...');
      const optimizedUrl = await compressImageIfNeeded(newItem.imageUrl);
      const freshItem: GalleryItem = {
        ...newItem,
        imageUrl: optimizedUrl,
        id: guid,
        createdAt: new Date().toISOString().split('T')[0]
      };
      await setDoc(doc(db, path, guid), freshItem);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${path}/${guid}`);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (window.confirm('해당 제품 사진을 아카이브에서 영구 차단하시겠습니까?')) {
      const path = 'gallery';
      try {
        await deleteDoc(doc(db, path, id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
      }
    }
  };

  // Inquiry management handlers
  const handleAddInquiry = async (newInq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const guid = `inq-${Date.now()}`;
    const freshInq: Inquiry = {
      ...newInq,
      id: guid,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    const path = 'inquiries';
    try {
      await setDoc(doc(db, path, guid), freshInq);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${path}/${guid}`);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: 'pending' | 'completed') => {
    const path = 'inquiries';
    try {
      await updateDoc(doc(db, path, id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${path}/${id}`);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('접수된 견적 의뢰 내역을 삭제 처리하시겠습니까?')) {
      const path = 'inquiries';
      try {
        await deleteDoc(doc(db, path, id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminMode(true);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsAdminMode(false);
    setActiveTab('home');
  };

  // Direct fast navigation for banners
  const handleNavigateToContact = () => {
    setActiveTab('contact');
    setIsAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    setActiveTab('admin');
    setIsAdminMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      
      {/* Header component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        setIsAdminMode={setIsAdminMode}
        isAdminMode={isAdminMode}
        onLogout={handleLogout}
      />

      {/* Main Container router */}
      <main className="flex-1">
        
        {/* If Admin Mode selection is active, override standard view */}
        {isAdminMode ? (
          <AdminPanel
            galleryItems={galleryItems}
            inquiries={inquiries}
            onAddGalleryItem={handleAddGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onDeleteInquiry={handleDeleteInquiry}
            onLoginSuccess={handleLoginSuccess}
            isAdmin={isAdmin}
          />
        ) : (
          <div>
            {/* HOME VIEW OR CORRESPONDING TAB VIEWS */}
            {activeTab === 'home' && (
              <div className="space-y-0">
                
                {/* Hero Slider */}
                <HeroSection 
                  onNavigateToContact={handleNavigateToContact} 
                  onContactClick={handleContactAction} 
                />

                {/* Core Branded Features / Value propositions */}
                <section className="py-16 bg-white border-b border-slate-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                      <div className="flex space-x-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-950 text-base">즉각적인 1:1 상담대응</h4>
                          <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                            번거로운 온라인 상담 절차를 우회하고, 실무 전문가 다이렉트 유선 연결로 원가가 저렴해집니다.
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                          <Award size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-950 text-base">대소량 주문 유연성</h4>
                          <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                            프로토타입 단 1개라도 소중히 대응하며 규격 협의와 대형 양산이 완벽히 지원됩니다.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* Representative core products introduction showcase (Requested in Home section) */}
                <section className="py-20 bg-slate-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-2xl mx-auto mb-16">
                      <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase bg-emerald-100 px-3 py-1.5 rounded-full inline-block mb-3 font-mono">
                        Hansol Prime Series
                      </span>
                      <h3 className="text-2xl sm:text-3xl.5 font-extrabold tracking-tight text-slate-950">
                        한솔종합부러쉬 대표 베스트셀러
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                      {KEY_PRODUCTS.map((prod) => (
                        <div 
                          key={prod.id} 
                          className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-[10px] sm:text-xs font-mono uppercase px-2.5 py-1 rounded-md">
                                {prod.brand || 'OFFICIAL_BEST'}
                              </span>
                            </div>
                            
                            <div className="p-6 sm:p-8 space-y-3">
                              <h4 className="text-xl font-bold text-slate-950 tracking-tight">
                                {prod.name}
                              </h4>
                              <p className="text-emerald-700 text-xs sm:text-sm font-semibold">
                                {prod.tagline}
                              </p>
                              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                {prod.description.substring(0, 120)}...
                              </p>
                            </div>
                          </div>

                          <div className="px-6 sm:px-8 pb-8 pt-4 flex items-center justify-between border-t border-slate-50">
                            <span className="text-xs text-slate-400 font-mono font-bold">1:1 특화 주문 가공</span>
                            <button
                              onClick={() => {
                                setActiveTab('products');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="text-xs font-bold text-emerald-650 hover:text-emerald-700 hover:underline flex items-center space-x-1 cursor-pointer"
                            >
                              <span>자세히 보기</span>
                              <ChevronRight size={14} className="mt-0.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick navigation and call action drawer banner */}
                    <div className="mt-16 bg-slate-950 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
                      <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                        <Settings2 size={150} />
                      </div>
                      <div className="space-y-1.5 relative z-10 text-center md:text-left">
                        <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                          필요하신 기계 수치 및 특수 브러쉬 도안을 구상 중이신가요?
                        </h4>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                          대전 대화동 제조기지에서 30년간 다듬어진 마스터가 도면 한장 없이도 친절히 전력 설계해 드립니다. 소량 단 1개 가공 환영!
                        </p>
                      </div>
                      <button
                        onClick={handleNavigateToContact}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl transition cursor-pointer shrink-0 relative z-10 shadow-lg shadow-emerald-950/50"
                      >
                        간편 견적 상담 신청하기 →
                      </button>
                    </div>

                  </div>
                </section>

                {/* Real Video Showcase Section (YouTube) */}
                <section className="py-20 bg-slate-900 text-white border-b border-slate-950 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="text-center max-w-3xl mx-auto mb-12">
                      <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase font-mono bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-full inline-block mb-3">
                        Production Technology Video
                      </span>
                      <h3 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white mb-4">
                        한솔종합부러쉬 기계 제작 & 작업 현장 생생스케치
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
                        30년 숙련 기술 장인의 세밀한 자동 식모 가공 공정 및 실제 도로 보수 굴삭기용 청소솔 &apos;쎈솔&apos;의 현장 구동 동영상을 직접 감상하실 수 있습니다.
                      </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                      <div className="relative w-full overflow-hidden rounded-3xl border border-slate-800 shadow-2xl bg-slate-950" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src="https://www.youtube.com/embed/LmZnohmsGtQ"
                          title="한솔종합부러쉬 작업 공정 동영상"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0 absolute inset-0"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                          <span className="text-emerald-400 font-bold text-lg font-mono block">30+ Years</span>
                          <span className="text-slate-400 text-xs mt-1 block">전문 식모가공 역사</span>
                        </div>
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                          <span className="text-emerald-400 font-bold text-lg font-mono block">100% Real</span>
                          <span className="text-slate-400 text-xs mt-1 block">국산 특수 강선 및 부자재</span>
                        </div>
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                          <span className="text-emerald-400 font-bold text-lg font-mono block">Customized</span>
                          <span className="text-slate-400 text-xs mt-1 block">당일 즉각 도면 제작 출고</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Instant Gallery Teaser */}
                <section className="py-20 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-end mb-10">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-50 px-2.5 py-1 rounded">Live Portfolio</span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1.5">
                          라이브 시공 & 납품 갤러리
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('gallery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-slate-600 hover:text-emerald-600 hover:underline flex items-center space-x-1"
                      >
                        <span>전체 포트폴리오 보기</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {galleryItems.slice(0, 4).map((item) => (
                        <div 
                          key={item.id} 
                          className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition bg-white flex flex-col justify-between"
                        >
                          <div className="aspect-4/3 bg-slate-50 relative overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                              {item.category.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="p-4 flex-1">
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

              </div>
            )}

            {activeTab === 'about' && (
              <AboutSection />
            )}

            {activeTab === 'products' && (
              <ProductsSection onNavigateToContact={handleNavigateToContact} />
            )}

            {activeTab === 'gallery' && (
              <GallerySection 
                galleryItems={galleryItems} 
                onNavigateToAdmin={handleNavigateToAdmin} 
              />
            )}

            {activeTab === 'contact' && (
              <ContactSection 
                onAddInquiry={handleAddInquiry} 
                onContactClick={handleContactAction}
              />
            )}
            
            {activeTab === 'admin' && (
              <AdminPanel
                galleryItems={galleryItems}
                inquiries={inquiries}
                onAddGalleryItem={handleAddGalleryItem}
                onDeleteGalleryItem={handleDeleteGalleryItem}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
                onLoginSuccess={handleLoginSuccess}
                isAdmin={isAdmin}
              />
            )}
          </div>
        )}

      </main>

      {/* Floating Fast Consultation Mobile Action Button */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end space-y-2 lg:hidden">
        
        {/* Kakao Talk instant connect button */}
        <button
          onClick={() => handleContactAction('kakao')}
          className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 shadow-lg text-slate-950 flex items-center justify-center animate-bounce duration-1000 cursor-pointer"
          title="카카오톡 즉시문의"
        >
          <MessageCircle size={22} className="fill-current text-slate-950" />
        </button>

        {/* Dynamic Mobile Phone trigger */}
        <button
          onClick={() => handleContactAction('tel', '010-4610-3701')}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg font-bold text-xs cursor-pointer"
        >
          <PhoneCall size={14} className="animate-wiggle" />
          <span>전화 상담문의</span>
        </button>

      </div>

      {/* Footer block */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-emerald-650 flex items-center justify-center font-bold text-lg text-white">
                  H
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  한솔종합부러쉬
                </h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                최선의 가공 단가와 최상의 내구도로 승부하는 산업 전담 맞춤형 고기능성 브러쉬 기술 전문 기업입니다. 골프존 벙커매트, 원형/롤 청소용 브러쉬 대량 수동 가공까지 완벽 납품합니다.
              </p>
              <div className="text-slate-500 text-[11px] font-mono font-bold uppercase tracking-wider">
                Industrial Brush Manufacturing Leader
              </div>
            </div>

            {/* Quick Map links / Hotline numbers */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-slate-300 font-mono tracking-widest uppercase">
                COMPANY HOTLINE
              </h4>
              <ul className="text-xs sm:text-sm space-y-2.5 text-slate-400">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold shrink-0">📞</span>
                  <div>
                    <span className="font-semibold block text-slate-200">상담: 010-4610-3701</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold shrink-0">📞</span>
                  <div>
                    <span className="font-semibold block text-slate-200">상담: 010-7301-3701</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-slate-500 font-bold shrink-0">📍</span>
                  <div>
                    <span className="block text-slate-300 font-medium">대전광역시 대덕구 대화동 294-14</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct consultation call to action */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-slate-300 font-mono tracking-widest uppercase">
                QUICK ACCESS
              </h4>
              <div className="flex flex-wrap gap-2">
                {['home', 'about', 'products', 'gallery', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsAdminMode(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-slate-900 hover:bg-emerald-600 text-[11px] text-slate-300 font-bold px-3 py-1.5 rounded-md border border-slate-800 tracking-wider transition-colors uppercase cursor-pointer"
                  >
                    {tab}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-amber-600/20 text-amber-400 text-[11px] font-bold px-3 py-1.5 rounded-md border border-amber-500/20 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                >
                  SYSTEM CONTROL
                </button>
              </div>
              <div className="text-[10px] text-slate-500 leading-normal">
                본 웹사이트에 게재된 대표 시공 포트폴리오 및 쎈솔, 벙커매트는 특허 보장 및 지적 재산권으로 법적 보호를 받습니다.
              </div>
            </div>

          </div>

          {/* Subcopyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
            <div>
              © 2026 HANSOL GENERAL BRUSH CO. ALL RIGHTS RESERVED.
            </div>
            <div className="flex space-x-4">
              <span className="hover:text-slate-300">사업자 정보 : 대전 294-14 한솔</span>
              <span className="text-slate-755">|</span>
              <span className="hover:text-slate-300 cursor-pointer" onClick={() => handleNavigateToAdmin()}>제조관제인 전용</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Global smart-contact modal */}
      <ContactHelperModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
        initialTab={contactModalTab} 
      />

    </div>
  );
}
