import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BRUSH_IMAGE_PRIMARY, INDUSTRIAL_STYLING } from '../data';

interface HeroSectionProps {
  onNavigateToContact: () => void;
  onContactClick: (type: 'tel' | 'sms' | 'kakao', phone?: string) => void;
}

export default function HeroSection({ onNavigateToContact, onContactClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: BRUSH_IMAGE_PRIMARY,
      badge: '산업용 · 특수 브러쉬 전문',
      title: '현장에 맞는 최고의\n맞춤형 브러쉬 제작',
      description: '산업현장, 설비 규격, 세밀한 환경적 요건에 맞춰 설계부터 상담, 가공, 납품까지 고신뢰 솔루션을 원스톱으로 제공합니다.',
    },
    {
      image: INDUSTRIAL_STYLING.carousel2,
      badge: '제품개발 · 제작상담 · 판매',
      title: '다목적 고기능성 브러쉬\n소량 및 대량 신속 생산',
      description: '골프존 벙커매트, 굴삭기 청소솔 쎈솔 등 독자 디자인 특수 특허 브러쉬부터 자동화 머신 부착형 맞춤 솔루션까지 완벽 제작합니다.',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[650px] sm:h-[720px] bg-slate-950 overflow-hidden">
      
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[currentSlide].image}
            alt="한솔종합부러쉬 대표 제품"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Contents */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Badge */}
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-600/90 text-white tracking-widest uppercase border border-emerald-500/30">
                {slides[currentSlide].badge}
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight whitespace-pre-line text-slate-100">
                {slides[currentSlide].title}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                {slides[currentSlide].description}
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={onNavigateToContact}
                  className="flex items-center justify-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer group"
                >
                  <span>1:1 간편 견적문의</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onContactClick('kakao')}
                  className="flex items-center justify-center space-x-3 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-xl border border-slate-700/60 transition-all cursor-pointer"
                >
                  <MessageCircle size={18} className="text-yellow-400 fill-current" />
                  <span>카카오톡 즉시 상담</span>
                </button>

                <button
                  onClick={() => onContactClick('tel', '010-4610-3701')}
                  className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-4 rounded-xl backdrop-blur-xs transition-all cursor-pointer"
                >
                  <Phone size={16} className="text-emerald-400" />
                  <span>010-4610-3701 전화걸기</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 right-4 sm:right-8 lg:right-16 flex items-center space-x-3 z-10">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 border border-slate-800 text-white transition cursor-pointer"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Custom Progress Ring Indicator */}
        <div className="text-xs font-mono text-slate-400 flex items-center space-x-1">
          <span className="font-bold text-white">{currentSlide + 1}</span>
          <span>/</span>
          <span>{slides.length}</span>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 border border-slate-800 text-white transition cursor-pointer"
          aria-label="다음 슬라이드"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-4 sm:left-8 lg:left-16 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              currentSlide === index ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
