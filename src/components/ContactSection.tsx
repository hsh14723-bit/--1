import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  Send, 
  Sparkles,
  ClipboardList,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Inquiry } from '../types';

interface ContactSectionProps {
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  onContactClick: (type: 'tel' | 'sms' | 'kakao', phone?: string) => void;
}

export default function ContactSection({ onAddInquiry, onContactClick }: ContactSectionProps) {
  // Form State
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [brushType, setBrushType] = useState('원형 브러쉬');
  const [content, setContent] = useState('');
  
  // Notice Banner State
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const brushTypesList = [
    '원형 브러쉬',
    '롤 브러쉬',
    '산업용 청소 브러쉬',
    '컨베이어 브러쉬',
    '특수 제작 브러쉬',
    '기계 장착용 브러쉬',
    '바닥 청소 브러쉬',
    '골프장/스크린골프용 브러쉬',
    '기타 / 상세 별도 협의'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!clientName.trim()) {
      setSubmitError('신청자 또는 회사명을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      setSubmitError('연락 받으실 전화번호를 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      setSubmitError('상세 문의 내용을 작성해 주세요.');
      return;
    }

    // Call state handler back to App.tsx (which stores in localStorage)
    onAddInquiry({
      clientName,
      phone,
      brushType,
      content,
    });

    // Reset forms
    setClientName('');
    setPhone('');
    setBrushType('원형 브러쉬');
    setContent('');
    
    // Trigger Success Banner
    setSubmitSuccess(true);
  };

  const handleSmsRequest = () => {
    onContactClick('sms', '010-4610-3701');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-100/60 px-3 py-1.5 rounded-full inline-block mb-3">
            Get a Free Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            도면 없이도 즉석 설계 상담이 가능한<br />
            <span className="text-emerald-600 font-extrabold">간편 상담 & 즉시 견적신청</span>
          </h2>
          <div className="w-16 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-5 text-sm sm:text-lg text-slate-600 leading-relaxed">
            필요하신 용도, 대략적인 규격, 구상 중이신 기계 도안만 있어도 충분합니다.<br className="hidden sm:block" />
            풍부한 실무 설계 경험을 바탕으로 합리적인 가공 원가를 찾아드립니다.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Quick call/talk icons */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-y-10 translate-x-10" />
            
            <div className="space-y-8 relative z-10">
              <div>
                <span className="text-xs font-bold font-mono tracking-widest uppercase text-emerald-400">
                  REAL-TIME CHAT & PHONE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                  전화 및 메신저 바로 연결
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                  아래 원터치 접속 단추를 활용하시면 대기 시간 없이 즉시 1:1 전담 마스터와 유선/모바일 채팅 연결됩니다.
                </p>
              </div>

                       {/* Connected Buttons Cluster */}
              <div className="space-y-3.5 pt-4">
                
                {/* 전화 바로걸기 1 */}
                <button
                  onClick={() => onContactClick('tel', '010-4610-3701')}
                  className="w-full flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-4 rounded-2xl transition shadow-md shadow-emerald-950/50 block group cursor-pointer text-left"
                >
                  <div className="flex items-center space-x-3">
                    <PhoneCall size={18} />
                    <span className="text-base">010-4610-3701 전화걸기</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-100 group-hover:translate-x-1 transition-transform">CALL NOW</span>
                </button>

                {/* 전화 바로걸기 2 */}
                <button
                  onClick={() => onContactClick('tel', '010-7301-3701')}
                  className="w-full flex items-center justify-between bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-5 py-4 rounded-2xl transition block group cursor-pointer text-left"
                >
                  <div className="flex items-center space-x-3">
                    <PhoneCall size={18} />
                    <span className="text-base">010-7301-3701 전화걸기</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-100 group-hover:translate-x-1 transition-transform">CALL NOW</span>
                </button>

                {/* 문자 전송 */}
                <button
                  onClick={handleSmsRequest}
                  className="w-full flex items-center justify-between bg-slate-900 border border-slate-700/65 hover:bg-slate-850 text-white font-bold px-5 py-4 rounded-2xl transition block group cursor-pointer text-left"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-teal-400" />
                    <span className="text-base">문자 메시지 견적문의</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 group-hover:translate-x-1 transition-transform">SMS SEND</span>
                </button>

                {/* 카카오톡 링크 */}
                <button
                  onClick={() => onContactClick('kakao')}
                  className="w-full flex items-center justify-between bg-yellow-400 text-slate-900 font-extrabold px-5 py-4 rounded-2xl hover:bg-yellow-50 transition block group cursor-pointer text-left"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-slate-900 fill-current" />
                    <span className="text-base">카카오톡 실시간 문의</span>
                  </div>
                  <span className="text-xs font-mono text-yellow-950 group-hover:translate-x-1 transition-transform">TALK CHAT</span>
                </button>

              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 mt-8 text-neutral-400 text-xs font-mono font-bold">
              HANSOL INDUSTRIAL GENERAL BRUSH CO. — SINCE 2001
            </div>
          </div>

          {/* Right panel: Online Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                <ClipboardList size={20} />
                <h3 className="text-lg font-extrabold text-slate-950 tracking-tight">
                  온라인 가제작 견적 의뢰서
                </h3>
              </div>

              {/* Description helper */}
              <p className="text-xs text-slate-400 leading-normal mb-4">
                필드를 빠짐없이 입력하고 '견적서 제출하기'를 누르면, 한솔종합부러쉬 마스터 전용 시스템에 연동 접수되어 담당자가 신속히 전화를 드립니다.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Client Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" htmlFor="client-name">
                    성함 또는 업체(회사)명 *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    placeholder="예: 홍길동 과장 또는 한솔디자인"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" htmlFor="phone-number">
                    회신받으실 연락처 *
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    placeholder="예: 010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                {/* Brush Type Category selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" htmlFor="brush-category">
                    제작 희망 브러쉬 유형 *
                  </label>
                  <div className="relative">
                    <select
                      id="brush-category"
                      value={brushType}
                      onChange={(e) => setBrushType(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition appearance-none cursor-pointer"
                    >
                      {brushTypesList.map((type, idx) => (
                        <option key={idx} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {/* SVG Dropdown marker */}
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Detail Description content */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" htmlFor="inquiry-content">
                    원하시는 소재/상세 문의 내용 *
                  </label>
                  <textarea
                    id="inquiry-content"
                    rows={4}
                    placeholder="예: 원형 지름 150mm, 기둥 브릿지 샤프트 삽입 규격, 골프존 벙커매트용 특수 브러쉬 가공 문의, 쎈솔 단품 주문 등 편안한 자연어로 규격을 입력해 주십시오."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition resize-none"
                  />
                </div>

                {/* Error Box display if any */}
                {submitError && (
                  <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold bg-rose-50 p-3 rounded-lg border border-rose-100">
                    <AlertCircle size={14} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Send size={16} />
                  <span>간편 견적의뢰 제출하기</span>
                </button>
              </form>
            </div>
          </div>
          
        </div>

      </div>

      {/* Success Modal Popups */}
      <AnimatePresence>
        {submitSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitSuccess(false)}
              className="absolute inset-0 bg-slate-950/70"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl z-10 text-center border border-slate-100"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-5 animate-bounce">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-2">
                견적 문의 신청 완료!
              </h3>
              
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                입력하신 상담서가 성공적으로 접수되었습니다.<br />
                감사합니다. 최고 실력의 마스터가 검토 후 신속히 안내 전화를 드리겠습니다.
              </p>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full bg-slate-950 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition cursor-pointer"
              >
                닫기 및 홈으로
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
