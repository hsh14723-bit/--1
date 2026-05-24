import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Layers, 
  Eye, 
  X, 
  Calendar, 
  ArrowRight,
  Sparkles,
  UserCheck2
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  onNavigateToAdmin: () => void;
}

const CATEGORY_MAP = {
  all: '전체보기',
  production: '제작 제품',
  industry: '산업별 제품',
};

export default function GallerySection({ galleryItems, onNavigateToAdmin }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORY_MAP>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Filter gallery items based on category
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-100/60 px-3 py-1.5 rounded-full inline-block mb-3">
              Production Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              실시간 생산제품 & 납품 갤러리
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl">
              한솔종합부러쉬가 가공 완료한 현장 실물 갤러리입니다. 관리자가 휴대폰으로 사진을 직접 등록하면 즉시 웹사이트 포트폴리오에 자동 등재됩니다.
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <button
              onClick={onNavigateToAdmin}
              className="inline-flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border {{id:'some'}} border-emerald-200/50 rounded-xl px-4 py-2.5 text-xs font-extrabold transition cursor-pointer"
            >
              <Camera size={14} className="text-emerald-600" />
              <span>관리자 모드로 사진 등록해보기</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Category Filters Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-5">
          {(Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === catKey
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {CATEGORY_MAP[catKey]}
            </button>
          ))}
        </div>

        {/* Portfolio Grids */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl">
            <Layers className="mx-auto text-slate-300 stroke-1 mb-4" size={48} />
            <p className="text-slate-400 text-sm font-semibold">등록된 제품 사진이 존재하지 않습니다.</p>
            <p className="text-slate-300 text-xs mt-1">상단 버튼이나 우측 상단 관리자 아이콘을 통해 등록할 수 있습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  {/* Photo Frame */}
                  <div className="relative w-full aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* View overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="p-3 bg-white text-slate-950 rounded-full shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
                        title="크게 보기"
                      >
                        <Eye size={20} />
                      </button>
                    </div>

                    {/* Category Overlay tag */}
                    <span className="absolute top-3 left-3 bg-slate-950/85 text-white/95 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-xs font-mono">
                      {CATEGORY_MAP[item.category]}
                    </span>
                  </div>

                  {/* Descriptions block */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-950 tracking-tight leading-snug line-clamp-1 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={11} />
                        <span>{item.createdAt}</span>
                      </div>
                      <span className="text-emerald-600 font-semibold uppercase">Hansol Brush</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Photo Magnification Modal Dialog */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-800"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-950/80 hover:bg-rose-600 text-white rounded-full backdrop-blur-sm transition cursor-pointer"
                aria-label="닫기"
              >
                <X size={18} />
              </button>

              {/* Responsive layout: Photo on top, info below */}
              <div className="flex flex-col">
                <div className="bg-slate-950 w-full aspect-16/10 flex items-center justify-center">
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[500px] w-full object-contain"
                  />
                </div>

                <div className="p-6 sm:p-8 bg-white">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 font-mono mb-2">
                    <span className="bg-emerald-50 px-2.5 py-1 rounded-md">
                      {CATEGORY_MAP[activeModalItem.category]}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-400">{activeModalItem.createdAt}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug mb-3">
                    {activeModalItem.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                  
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>* 제작 문의 시 이미지 제목을 전달하시면 더욱 원활한 맞춤 설계 상담이 가능합니다.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
