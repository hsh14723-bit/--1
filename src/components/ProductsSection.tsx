import { motion } from 'motion/react';
import { Sparkles, CalendarRange, ArrowRight, Settings2, ShieldCheck, CheckCircle } from 'lucide-react';
import { INITIAL_PRODUCTS, KEY_PRODUCTS } from '../data';
import BrushIcon from './BrushIcon';

interface ProductsSectionProps {
  onNavigateToContact: () => void;
}

export default function ProductsSection({ onNavigateToContact }: ProductsSectionProps) {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-100/60 px-3 py-1.5 rounded-full inline-block mb-3">
            Custom Manufacturing Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            용도와 현장에 최적화된<br />
            <span className="text-emerald-600">주문제작형 맞춤 브러쉬 솔루션</span>
          </h2>
          <div className="w-16 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-5 text-base sm:text-lg text-slate-600">
            기성 제품으로는 어려운 굴곡, 특정 기계 연결 하우징 설계, 특수 신선 와이어 복합 원사 등<br className="hidden sm:block" />
            한솔만의 30년 가공 노하우로 어떠한 사양도 완벽하게 현실화시킵니다.
          </p>
        </div>

        {/* 8 Brush Categories Grid */}
        <div className="mb-24">
          <div className="flex items-center space-x-3 mb-8">
            <Settings2 className="text-emerald-600" size={24} />
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              제작 가능 주요 브러쉬 종류
            </h3>
            <span className="text-xs text-slate-400 font-mono mt-1">| 1:1 도면 대응 및 실물 모델링 지원</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_PRODUCTS.map((prod, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:bg-emerald-950 hover:text-white transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-5 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <BrushIcon name={prod.iconName} size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-white font-sans tracking-tight mb-2">
                    {prod.name}
                  </h4>
                  <p className="text-sm text-slate-500 group-hover:text-slate-300 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-slate-200/50 group-hover:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-400">
                  <span>주문 가이드 확인</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 mb-24 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-emerald-400 text-xs font-bold font-mono tracking-widest uppercase">
              HAN-SOL PREMIUM PRODUCT LINEUP
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 mb-4 tracking-tight leading-snug">
              한솔의 특별한 특허 제작 주력 상품
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              스크린 골프장의 필드감을 극적으로 끌어올리는 특수 포밍 벙커매트와, 굴삭기에 손쉽게 부착하여 도로 및 토사를 소거하는 최고의 내구성 청소솔 '쎈솔'을 소개합니다.
            </p>
          </div>
        </div>

        {/* Key Products Dynamic Display (Bunker mat & Ssensol) */}
        <div className="space-y-16">
          {KEY_PRODUCTS.map((prod, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={prod.id}
                className={`flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Product Image Stage */}
                <div className="lg:w-1/2 relative bg-slate-100 rounded-3xl overflow-hidden shadow-xs border border-slate-100 group">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  
                  {/* Decorative Badge */}
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-lg font-mono">
                    {prod.brand || 'PREMIUM_SERIES'}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-xs text-white/90">
                      * 실제 한솔종합부러쉬가 납품 및 품질 인증을 마친 실물 제품입니다.
                    </p>
                  </div>
                </div>

                {/* Product spec block */}
                <div className="lg:w-1/2 flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-emerald-600 font-mono uppercase tracking-wider">
                        주력 개발 라인업 {idx + 1}
                      </span>
                      <h4 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 tracking-tight">
                        {prod.name}
                      </h4>
                      <p className="text-emerald-700 font-bold text-base sm:text-lg">
                        {prod.tagline}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-400 font-mono block">KEY ADVANTAGES</span>
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-3 text-slate-700 text-sm">
                          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                          <span className="font-semibold">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={onNavigateToContact}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition cursor-pointer"
                    >
                      <span>{prod.name} 가공의뢰 상담하기</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
