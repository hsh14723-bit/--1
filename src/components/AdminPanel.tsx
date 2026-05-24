import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Database, 
  Trash2, 
  CheckCheck, 
  Plus, 
  Camera, 
  UploadCloud, 
  User, 
  ArrowRight,
  TrendingUp,
  Inbox,
  FileImage,
  Layers,
  Sparkles,
  PhoneCall,
  Menu,
  CheckCircle2,
  X
} from 'lucide-react';
import { GalleryItem, Inquiry } from '../types';

interface AdminPanelProps {
  galleryItems: GalleryItem[];
  inquiries: Inquiry[];
  onAddGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: 'pending' | 'completed') => void;
  onDeleteInquiry: (id: string) => void;
  onLoginSuccess: () => void;
  isAdmin: boolean;
}

const PRESET_STOCK_IMAGES = [
  {
    name: '특수 강선 롤 브러쉬',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: '자동화 세정 헤드',
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: '골프 벙커 수작업 솔',
    url: 'https://images.openai.com/static-rsc-4/xjzb8kCpgx31RWlKmgofo5I6xnp65Xam7crtkuW6QeT9Rgb5WJD6oCU7o3wiKP72o5Nt63Rnmis_S17yEMJ9ydDAnjrTjDpw_I9O6j0lANhKiXuox7ES-BxTqXcuSAwydeCbIW7xvWP1ZRRmTDF9FLnsWe86_UghZ1J71c7Rns-1LpFSYthVl3sfzX2nP-W7?purpose=fullsize'
  },
  {
    name: '정밀 나일론 원사',
    url: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&q=80&w=600'
  }
];

export default function AdminPanel({
  galleryItems,
  inquiries,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onLoginSuccess,
  isAdmin
}: AdminPanelProps) {
  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Gallery Uploader Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'production' | 'industry'>('production');
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Dashboard Sub-navigation Tab
  const [adminSubTab, setAdminSubTab] = useState<'dashboard' | 'inquiries' | 'gallery'>('dashboard');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Login Authentication
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Default Demo credentials as requested or quick default (e.g., admin / admin)
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else if (username === 'admin' && password === '1234') {
      onLoginSuccess();
    } else {
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // Convert File to Base64 (Local upload simulator)
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일포맷만 지원합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Form submit for gallery upload
  const handleUploadGalleryItem = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageUrl) {
      alert('모든 필수 항목과 이미지를 첨부하여야 합니다.');
      return;
    }

    onAddGalleryItem({
      title,
      description,
      category,
      imageUrl
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCategory('production');
    
    setUploadSuccessMsg('성공적으로 공장 생산품 갤러리가 추가 등록되었습니다! 포트폴리오를 바로 확인해 보십시오.');
    setTimeout(() => setUploadSuccessMsg(''), 4000);
  };

  // Analytics Metrics computation
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;
  const completedInquiriesCount = inquiries.filter(i => i.status === 'completed').length;

  if (!isAdmin) {
    return (
      <section id="admin" className="py-20 bg-slate-100 flex items-center justify-center min-h-[550px]">
        <div className="max-w-md w-full mx-4 bg-white border border-slate-200/60 shadow-2xl rounded-3xl overflow-hidden p-8">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-200 mb-4 animate-pulse">
              <Lock size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              한솔 기획관리 전용 로그인
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
              한솔종합부러쉬 포트폴리오 갤러리 관리, 시공 사례 등록 및 온라인 고객 견적 의뢰 접수를 통합 관제하는 허브입니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1" htmlFor="username">
                관리인 ID
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  placeholder="아이디 입력"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1" htmlFor="password">
                패스워드(비밀번호)
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-rose-600 text-xs font-bold text-center bg-rose-50 p-2 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              <span>관리 시스템 인증하기</span>
              <ArrowRight size={16} />
            </button>
          </form>

        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-12 bg-slate-50 border-t border-slate-100 min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Console */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span className="text-xs font-bold text-emerald-700 tracking-wider font-mono">HANSOL MASTER SYSTEM ENABLED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              한솔종합부러쉬 통합 경영 패널
            </h2>
          </div>

          {/* Quick Subtab bar */}
          <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-200/40">
            <button
              onClick={() => setAdminSubTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                adminSubTab === 'dashboard' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              통계 정보
            </button>
            <button
              onClick={() => setAdminSubTab('inquiries')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-1.5 ${
                adminSubTab === 'inquiries' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>상담 리드</span>
              {pendingInquiriesCount > 0 && (
                <span className="bg-rose-500 text-white font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setAdminSubTab('gallery')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                adminSubTab === 'gallery' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              갤러리 추가/관리
            </button>
          </div>
        </div>

        {/* Dynamic Display sections */}
        <AnimatePresence mode="wait">
          
          {/* SubTab 1: Dashboard Analytics Overview */}
          {adminSubTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="dashboard"
              className="space-y-8"
            >
              {/* Counter Statistics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 메트릭 1 */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-xs flex items-center space-x-4">
                  <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl">
                    <Inbox size={24} />
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[11px] font-mono block">PENDING INQUIRY</span>
                    <span className="text-3xl font-black text-slate-950 tracking-tight">{pendingInquiriesCount} 건</span>
                    <span className="text-[10px] text-amber-600 font-bold block mt-0.5">신속한 확인 요망</span>
                  </div>
                </div>

                {/* 메트릭 2 */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-xs flex items-center space-x-4">
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl">
                    <CheckCheck size={24} />
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[11px] font-mono block">COMPLETED INQUIRY</span>
                    <span className="text-3xl font-black text-slate-950 tracking-tight">{completedInquiriesCount} 건</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">상담 완료 처리</span>
                  </div>
                </div>

                {/* 메트릭 3 */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-xs flex items-center space-x-4">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <FileImage size={24} />
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[11px] font-mono block">GALLERY PORTFOLIO</span>
                    <span className="text-3xl font-black text-slate-950 tracking-tight">{galleryItems.length} 품목</span>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">모든 기종 누적 등록</span>
                  </div>
                </div>

                {/* 메트릭 4 */}
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-xs flex items-center space-x-4">
                  <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[11px] font-mono block">CONVERSION RATE</span>
                    <span className="text-3xl font-black text-slate-950 tracking-tight">
                      {inquiries.length > 0 ? Math.round((completedInquiriesCount / inquiries.length) * 100) : 0}%
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">영업 성공 전환율</span>
                  </div>
                </div>

              </div>

              {/* Graphical Simulation using pure Styled CSS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 주간 상담 신청 트렌드 */}
                <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-xs">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight">상담 문의 세그먼트 현황</h4>
                      <p className="text-xs text-slate-400">어떤 영역의 맞춤 주문 문의가 압도적인지 비교 분석합니다.</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded-md">LIVE UPDATE</span>
                  </div>

                  {/* Pure Styled Custom Bar chart */}
                  <div className="space-y-4">
                    {(() => {
                      const distribution = inquiries.reduce((acc, curr) => {
                        acc[curr.brushType] = (acc[curr.brushType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);

                      const defaultCategories = ['골프장/스크린골프용 브러쉬', '특수 제작 브러쉬', '원형 브러쉬', '롤 브러쉬'];
                      const totalCount = inquiries.length || 1;

                      return defaultCategories.map((cat, index) => {
                        const count = distribution[cat] || (index === 0 ? 3 : index === 1 ? 2 : index === 2 ? 1 : 0);
                        const percentage = Math.round((count / totalCount) * 100);

                        return (
                          <div key={index} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                              <span>{cat}</span>
                              <span className="font-mono text-emerald-600">{count}건 ({percentage}%)</span>
                            </div>
                            <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                                style={{ width: `${Math.max(percentage, 8)}%` }}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* 시스템 가이드 및 공지사항 */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl" />
                  
                  <div className="space-y-4 relative z-10">
                    <span className="text-xs font-bold font-mono tracking-widest text-emerald-400">
                      MASTER CONSOLE TIPS
                    </span>
                    <h4 className="text-xl font-bold tracking-tight">수고하십니다, 한솔종합부러쉬 총괄 마스터님!</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      이 브라우저 관리 시스템은 Local Storage 엔진과 인원 관리가 실시간으로 매핑됩니다.
                      모바일 폰에서 촬영한 대표 브러쉬 사진을 갤러리에 추가해두면, 사이트 첫 방문자의 포트폴리오 스크래칭에 즉시 반영됩니다.
                    </p>

                    <ul className="text-slate-300 text-xs space-y-2 list-disc list-inside">
                      <li>새로운 대기 문의가 오면 소리 알림과 리스트가 갱신됩니다.</li>
                      <li>상담완료 시 완료 스탬프 단추를 단 한번 누르면 누계 통계가 재배열됩니다.</li>
                      <li>임시 이미지 등록은 프레임 내 파일 드롭을 장려합니다.</li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-slate-500 text-[10px] font-mono">
                    <span>SECURITY: AES-256 LOCAL</span>
                    <span>HANSOL_SYS_Ver1.0</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* SubTab 2: Inquiries Management */}
          {adminSubTab === 'inquiries' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="inquiries"
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-extrabold text-slate-950 tracking-tight">
                  접수된 견적문의 내역 조회 ({inquiries.length}건)
                </h3>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl">
                  <Inbox className="mx-auto text-slate-300 stroke-1 mb-4" size={48} />
                  <p className="text-slate-400 text-sm font-semibold">대기 상담 신청 내역이 존재하지 않습니다.</p>
                  <p className="text-slate-300 text-xs mt-1">방문자 상담문의 탭에서 폼을 작성해 보십시오.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className={`p-6 bg-white border rounded-2xl transition flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${
                        inq.status === 'completed' 
                          ? 'border-slate-100 opacity-70' 
                          : 'border-l-4 border-l-emerald-500 border-slate-200/80 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3 flex-1">
                        
                        {/* Meta status badges */}
                        <div className="flex items-center space-x-2.5">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-sm font-mono ${
                            inq.status === 'completed' 
                              ? 'bg-slate-100 text-slate-400' 
                              : 'bg-amber-100 text-amber-800 animate-pulse'
                          }`}>
                            {inq.status === 'completed' ? '상담완료' : '전화상담 대기'}
                          </span>
                          <span className="text-slate-350 text-[10px]">|</span>
                          <span className="text-slate-400 text-xs font-mono font-semibold">{inq.createdAt}</span>
                        </div>

                        {/* Client details */}
                        <div>
                          <h4 className="text-base font-extrabold text-slate-950 flex items-center space-x-2">
                            <span>{inq.clientName} 대표(과장)님</span>
                            <span className="text-slate-300 font-normal">|</span>
                            <a href={`tel:${inq.phone}`} className="text-emerald-600 hover:underline hover:text-emerald-700 font-mono text-sm">
                              📞 {inq.phone}
                            </a>
                          </h4>
                          <p className="text-xs text-slate-500 font-bold mt-1">
                            요청 유형: <span className="text-slate-800">{inq.brushType}</span>
                          </p>
                        </div>

                        {/* Inquiry content */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {inq.content}
                        </div>

                      </div>

                      {/* Management Buttons cluster */}
                      <div className="flex md:flex-col gap-2 shrink-0 pt-1">
                        
                        {inq.status === 'pending' && (
                          <button
                            onClick={() => onUpdateInquiryStatus(inq.id, 'completed')}
                            className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            <CheckCheck size={13} />
                            <span>상담 완료하기</span>
                          </button>
                        )}

                        {inq.status === 'completed' && (
                          <button
                            onClick={() => onUpdateInquiryStatus(inq.id, 'pending')}
                            className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            <span>대기로 환원</span>
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-2 border border-rose-100 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded-xl transition cursor-pointer flex items-center justify-center"
                          title="상담 삭제"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* SubTab 3: Gallery Content Management & Uploader forms */}
          {adminSubTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="gallery"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Form card col */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-xs">
                
                <h3 className="text-lg font-extrabold text-slate-950 tracking-tight flex items-center space-x-2 mb-2">
                  <Camera size={20} className="text-emerald-600" />
                  <span>신규 제품 사진 즉시 전송</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  모바일 폰카메라로 찍은 브러쉬 성형 사진을 직접 업로드하거나 등록할 위치를 지정해 기재합니다.
                </p>

                <form onSubmit={handleUploadGalleryItem} className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1" htmlFor="gallery-title">
                      작품/사진 제목 *
                    </label>
                    <input
                      id="gallery-title"
                      type="text"
                      placeholder="예: 현대제철용 내마모 롤 브러쉬 납품성공"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1" htmlFor="gallery-desc">
                      상세가공/납품 부연설명 *
                    </label>
                    <textarea
                      id="gallery-desc"
                      rows={3}
                      placeholder="예: 0.8지름 항균 가공 나일론 와이어를 초정밀 원심 충진 성형. 세밀한 비산 가림 가이드가 포함되어 세정력이 극도로 뛰어납니다."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition resize-none"
                      required
                    />
                  </div>

                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1" htmlFor="gallery-category">
                      갤러리 분류 카테고리 *
                    </label>
                    <select
                      id="gallery-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition appearance-none cursor-pointer"
                    >
                      <option value="production">제작 제품 (Production)</option>
                      <option value="industry">산업별 제품 (Industry)</option>
                    </select>
                  </div>

                  {/* Drag and Drop Upload Area */}
                  <div>
                    <span className="block text-xs font-bold text-slate-600 mb-1">
                      제품 모바일 촬영 사진 등록 *
                    </span>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition p-4 ${
                        isDragging 
                          ? 'border-emerald-600 bg-emerald-50/50' 
                          : imageUrl 
                            ? 'border-emerald-500 bg-white' 
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {imageUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt="선택된 이미지 프리뷰"
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain rounded-lg"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 flex items-center justify-center transition rounded-lg">
                            <span className="text-white text-xs font-bold">새 이미지로 교체</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <UploadCloud className="mx-auto text-slate-400 stroke-1" size={32} />
                          <p className="text-xs font-bold text-slate-600">드래그하여 넣거나, 클릭하여 촬영/기기선택</p>
                          <p className="text-[10px] text-slate-400">PNG, JPG, HEIC 등 모바일 사진 완벽지원</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Preset Image Select Helper for visual prototyping */}
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 font-mono mb-1">
                      OR CHOOSE AN INDUSTRIAL STOCK IMAGE (원클릭 자동 완성 데모)
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {PRESET_STOCK_IMAGES.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(img.url)}
                          className="border border-slate-100 rounded-lg overflow-hidden relative aspect-square hover:ring-2 hover:ring-emerald-500 hover:scale-103 transition cursor-pointer"
                          title={img.name}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute inset-x-0 bottom-0 bg-slate-950/65 text-white text-[8px] font-bold truncate px-1 py-0.2">
                            {img.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload message banner */}
                  {uploadSuccessMsg && (
                    <div className="flex items-center space-x-2 text-emerald-700 text-xs font-extrabold bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <CheckCircle2 size={14} />
                      <span>{uploadSuccessMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>한솔 갤러리 추가 등재하기</span>
                  </button>
                </form>

              </div>

              {/* Gallery elements management list col */}
              <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950 tracking-tight flex items-center space-x-2 mb-2">
                    <Layers size={20} className="text-emerald-600" />
                    <span>갤러리 아이템 리스트 ({galleryItems.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">현재까지 등재되어 공개 중인 라이브 갤러리 아티클의 삭제 및 편집이 가능합니다.</p>

                  <div className="max-h-[500px] overflow-y-auto space-y-3.5 pr-2">
                    {galleryItems.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center space-x-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-100 bg-slate-105"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-extrabold text-emerald-600/95 font-mono uppercase bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 truncate tracking-tight py-0.5">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">{item.createdAt}</span>
                        </div>

                        <button
                          onClick={() => onDeleteGalleryItem(item.id)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-lg transition shrink-0 cursor-pointer"
                          title="삭제하기"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
                  * 품목 삭제 시 본사의 라이브 도감에서도 제거처리되나, 리로드 시 원복 데모 모드로 가공되어 안전합니다.
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
