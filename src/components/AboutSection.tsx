import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Settings, 
  Compass, 
  Box, 
  MapPin, 
  Phone, 
  Copy, 
  Navigation,
  CheckCircle2
} from 'lucide-react';

export default function AboutSection() {
  const [copied, setCopied] = useState(false);

  const coreValues = [
    {
      icon: <Settings className="text-emerald-500" size={28} />,
      title: '맞춤형 브러쉬 제작',
      description: '작업설비 규격, 모 원사의 재질(나일론, 돈모, 백말모, 황동 등)과 밀도를 1mm 기밀 단위로 맞춤 가공 개발합니다.'
    },
    {
      icon: <Award className="text-emerald-500" size={28} />,
      title: '산업용 브러쉬 개발',
      description: '반도체 세정부터 토목 청소, 식품 위생까지 고도의 특화 설계가 필요한 정밀 가설 솔루션을 기술 설계합니다.'
    },
    {
      icon: <Compass className="text-emerald-500" size={28} />,
      title: '제품 상담 및 판매',
      description: '풍부한 제작 경험의 전문 상담사가 1:1로 현장 마모 특성을 매핑하여 과도한 유지 관리비 지출을 방지합니다.'
    },
    {
      icon: <Box className="text-emerald-500" size={28} />,
      title: '소량/대량 제작 가능',
      description: '자체 생산 자동화 라인과 수작업 숙련공 전담팀을 통합 편성하여, 단 1개의 시제품부터 대량 납품 계약까지 완전 커버합니다.'
    }
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('대전광역시 대덕구 대화동 294-14');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-100/60 px-3 py-1.5 rounded-full inline-block mb-3">
            About Hansol General Brush
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            대한민국 산업의 든든한 파트너<br />
            <span className="text-emerald-600">한솔종합부러쉬</span>입니다.
          </h2>
          <div className="w-16 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            한솔종합부러쉬는 특수 및 산업용 맞춤 브러쉬 제작 시장의 기술 혁신 기업입니다.<br className="hidden sm:block" />
            현장의 환경과 설비 목적성 연구를 시작으로 정밀 설계·제작·사후 지원까지 밀착 동행합니다.
          </p>
        </div>

        {/* Company Pitch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreValues.map((val, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 hover:shadow-lg hover:shadow-slate-100/40 hover:border-emerald-200 transition-all flex flex-col items-start"
            >
              <div className="p-3 bg-emerald-50 rounded-xl mb-5">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-sans tracking-tight">
                {val.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Info & Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Company Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-2">
                  본사 및 상담 센터
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  대전 대덕구의 산업 혁신 중심지 대화동 공단에 기지를 두고 전국 유통망과 연동하여 브러쉬를 적기 공급합니다.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* 주소 */}
                <div className="flex items-start space-x-4 border-b border-slate-50 pb-4">
                  <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="text-slate-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-400 font-mono block">ADDR.</span>
                    <span className="text-slate-900 font-bold text-sm sm:text-base">
                      대전광역시 대덕구 대화동 294-14
                    </span>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={handleCopyAddress}
                        className="inline-flex items-center space-x-1 text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-sm font-semibold transition"
                      >
                        <Copy size={12} />
                        <span>{copied ? '복사 완료!' : '주소 복사하기'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 연락처 */}
                <div className="flex items-start space-x-4 pb-2">
                  <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">
                    <Phone className="text-slate-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-400 font-mono block">HOTLINE</span>
                    
                    <div className="space-y-1.5 mt-1">
                      <a 
                        href="tel:010-4610-3701" 
                        className="flex items-center justify-between text-slate-900 font-bold hover:text-emerald-600 hover:underline transition-colors block text-base"
                      >
                        <span>📞 대표전화 : 010-4610-3701</span>
                      </a>
                      <a 
                        href="tel:010-7301-3701" 
                        className="flex items-center justify-between text-slate-900 font-bold hover:text-emerald-600 hover:underline transition-colors block text-base"
                      >
                        <span>📞 제작지원 : 010-7301-3701</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600 text-white rounded-2xl p-5 mt-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-5 translate-y-5">
                <CheckCircle2 size={120} />
              </div>
              <h4 className="text-sm font-bold tracking-wider font-mono opacity-80 uppercase">
                Why Hansol?
              </h4>
              <p className="font-extrabold text-base mt-1 leading-normal">
                "대화동 소량 커스텀 주문부터 중장비용 강선 브러쉬까지 견고함이 다릅니다."
              </p>
            </div>
          </div>

          {/* Map Interactive Visualizer */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-[300px] sm:h-[350px] bg-slate-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Naver Map Representation with High Quality Mock Styling */}
              <div className="absolute inset-0 bg-emerald-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-90" />
              
              {/* Simulated Map Roadmap lines & landmarks */}
              <div className="absolute w-[2px] h-full bg-slate-300 left-1/3 rotate-[12deg] opacity-60" />
              <div className="absolute w-[2px] h-full bg-slate-300 left-2/3 -rotate-[45deg] opacity-60" />
              <div className="absolute w-full h-[2px] bg-slate-300 top-1/2 -rotate-[5deg] opacity-60" />
              
              {/* Surrounding Landmarks */}
              <div className="absolute top-1/4 left-1/4 text-[10px] text-slate-400 font-semibold bg-white/80 px-1.5 py-0.5 rounded-sm">
                대전산업단지공단
              </div>
              <div className="absolute bottom-1/4 right-1/4 text-[10px] text-slate-400 font-semibold bg-white/80 px-1.5 py-0.5 rounded-sm">
                대화공구상가
              </div>

              {/* Marker pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-rose-500 animate-ping opacity-60" />
                  <div className="h-10 w-10 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-white shadow-md">
                    <MapPin size={20} />
                  </div>
                </div>
                <div className="bg-slate-950 text-white font-bold text-xs px-3 py-1.5 rounded-md shadow-lg border border-slate-800 whitespace-nowrap mt-2">
                  🏡 한솔종합부러쉬
                </div>
              </div>

              {/* Grid Scales */}
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400 bg-white/80 px-1.5 py-0.5 rounded-sm">
                50m [Map Canvas Overlay]
              </div>
            </div>

            {/* Direct Links to Real Maps */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://map.naver.com/v5/search/%EB%8C%80%EC%A0%84%EA%B0%B1%EC%96%B5%EC%8B%9C%20%EB%8C%80%EB%8D%95%EA%B5%AC%20%EB%8C%80%ED%99%94%EB%8F%99%20294-14"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-xs hover:bg-emerald-700 transition"
              >
                <Navigation size={16} />
                <span>네이버 지도로 길찾기</span>
              </a>

              <a
                href="https://map.kakao.com/?q=%EB%8C%80%EC%A0%80%EA%B0%91%EC%97%AD%EC%8B%9C%20%EB%8C%80%EB%8D%95%EA%B5%AC%20%EB%8C%80%ED%99%94%EB%8F%99%20294-14"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-yellow-400 text-yellow-950 font-bold py-3.5 px-4 rounded-xl shadow-xs hover:bg-yellow-500 transition"
              >
                <Navigation size={16} />
                <span>카카오맵으로 길찾기</span>
              </a>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
