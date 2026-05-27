import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  Copy, 
  Check, 
  Clock, 
  MessageCircle, 
  QrCode,
  Smartphone,
  Sparkles
} from 'lucide-react';

interface ContactHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'tel' | 'sms' | 'kakao';
}

export default function ContactHelperModal({ isOpen, onClose, initialTab = 'tel' }: ContactHelperModalProps) {
  const [activeTab, setActiveTab] = useState<'tel' | 'sms' | 'kakao'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCopiedText(null);
    }
  }, [isOpen, initialTab]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  if (!isOpen) return null;

  const defaultSmsMsg = '[한솔종합부러쉬] 안녕하세요, 산업용 맞춤 브러쉬 제작 견적 상담 요청합니다. 연락 부탁드립니다.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl z-10 border border-slate-100 flex flex-col overflow-hidden"
        >
          {/* Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />

          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="닫기"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase font-mono bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
              HANSOL CUSTOMER SERVICE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight mt-2 flex items-center gap-2">
              <span>한솔종합부러쉬 실시간 상담</span>
              <Sparkles size={18} className="text-emerald-500" />
            </h3>
            <p className="text-slate-400 text-xs mt-1.5 leading-normal">
              데스크톱에서는 전화/문자가 즉시 발송되지 않으므로 아래 정보를 통해 간편히 복사 및 전송해 주세요.
            </p>
          </div>

          {/* Tabs header */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              onClick={() => { setActiveTab('tel'); setCopiedText(null); }}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'tel'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <PhoneCall size={14} />
              <span>전화문의</span>
            </button>
            <button
              onClick={() => { setActiveTab('sms'); setCopiedText(null); }}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'sms'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare size={14} />
              <span>문자문의</span>
            </button>
            <button
              onClick={() => { setActiveTab('kakao'); setCopiedText(null); }}
              className={`flex items-center justify-center space-x-1.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeTab === 'kakao'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageCircle size={14} />
              <span>카카오톡</span>
            </button>
          </div>

          {/* Tab Contents wrapper */}
          <div className="flex-1 space-y-4">
            
            {/* 1. Phone numbers Tab */}
            {activeTab === 'tel' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/40 text-center space-y-1.5 mb-2">
                  <p className="text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5">
                    <Smartphone size={16} />
                    모바일에서는 다이얼이 자동으로 켜집니다!
                  </p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    핸드폰으로 보고 계시다면 각 링크 터치 시 즉시 발신 화면으로 전환됩니다.
                  </p>
                </div>

                {/* Main numbers lists */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-250 transition-all">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">MAIN HOTLINE</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">010-4610-3701</span>
                      <span className="text-xs text-slate-500 block">설계 디자인, 단품 및 대량 가공 전문 마스터</span>
                    </div>
                    <button
                      onClick={() => handleCopy('010-4610-3701', 'main')}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                        copiedText === 'main'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title="전화번호 복사"
                    >
                      {copiedText === 'main' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-250 transition-all">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">PRODUCTION DESK</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">010-7301-3701</span>
                      <span className="text-xs text-slate-500 block">쎈솔 제작지원, 벙커매트 가공 및 발송 담당</span>
                    </div>
                    <button
                      onClick={() => handleCopy('010-7301-3701', 'sub')}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                        copiedText === 'sub'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title="전화번호 복사"
                    >
                      {copiedText === 'sub' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400 justify-center pt-2">
                  <Clock size={12} />
                  <span>연중무휴 24시간 도면 및 수치 즉시 상담 통화 대기</span>
                </div>
              </motion.div>
            )}

            {/* 2. SMS Tab */}
            {activeTab === 'sms' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="space-y-3">
                  {/* Phone receiver */}
                  <div className="bg-slate-55 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">받는 번호 (SMS TO)</span>
                      <span className="font-extrabold text-slate-800 font-mono text-base">010-4610-3701</span>
                    </div>
                    <button
                      onClick={() => handleCopy('010-4610-3701', 'sms-phone')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                        copiedText === 'sms-phone'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-150'
                      }`}
                    >
                      {copiedText === 'sms-phone' ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedText === 'sms-phone' ? '복사됨' : '번호복사'}</span>
                    </button>
                  </div>

                  {/* Body text template */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 block">전송 본문 템플릿 (MSGPACK)</span>
                    <div className="bg-white border border-slate-150 rounded-xl p-3 text-xs text-slate-700 leading-relaxed font-semibold font-sans min-h-[70px]">
                      {defaultSmsMsg}
                    </div>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopy(defaultSmsMsg, 'sms-body')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          copiedText === 'sms-body'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-150'
                        }`}
                      >
                        {copiedText === 'sms-body' ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedText === 'sms-body' ? '복사완료!' : '템플릿 복사'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[11px] text-slate-500 leading-normal bg-neutral-50 px-4 py-3 rounded-xl border border-slate-100">
                  💡 번호와 본문 템플릿을 복사하여 이용하시는 메시지 앱 혹은 고객님의 모바일 대기창에 붙여넣기 한 뒤 발송해 주시면 가장 매끄럽게 답변 회신됩니다.
                </div>
              </motion.div>
            )}

            {/* 3. KakaoTalk Tab */}
            {activeTab === 'kakao' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100 text-center space-y-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-yellow-950 mx-auto">
                    <MessageCircle size={28} className="fill-current" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-yellow-950 text-sm">
                      카카오톡 ID 검색 및 친구 등록
                    </h4>
                    <p className="text-xs text-yellow-900/80 leading-relaxed max-w-sm mx-auto">
                      현재 별도의 1:1 주소 도메인이 고정 등록되지 않았거나 브라우저 환경에 따라 바로 들어가지지 않을 시, 가장 확실한 연락처 친구등록 방법입니다.
                    </p>
                  </div>

                  <div className="bg-white border border-yellow-100 rounded-xl p-3 max-w-xs mx-auto flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-mono font-bold text-slate-400 block">KAKAOTALK ID / PHONE</span>
                      <span className="font-bold font-mono text-slate-900 text-sm">010-4610-3701</span>
                    </div>
                    <button
                      onClick={() => handleCopy('010-4610-3701', 'kakao-phone')}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                        copiedText === 'kakao-phone'
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-yellow-400 text-yellow-950 hover:bg-yellow-500'
                      }`}
                    >
                      {copiedText === 'kakao-phone' ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedText === 'kakao-phone' ? '복사됨' : '복사하기'}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-yellow-900/60 leading-normal">
                    [친구 추가] ➔ [연락처로 추가] ➔ 한글 성함 기재 후 등록 시 신속하게 직접 톡상담을 시작하겠습니다.
                  </p>
                </div>

                {/* Optional default action links */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <a
                    href="https://open.kakao.com" // If they have real url they can exchange here
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    <span>카카오톡 공식 홈 이동</span>
                  </a>
                  
                  <button
                    onClick={onClose}
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Feedback messages */}
          <AnimatePresence>
            {copiedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-semibold text-xs py-2 px-4 rounded-full shadow-lg border border-slate-800 flex items-center gap-1.5 pointer-events-none"
              >
                <Check size={14} className="text-emerald-400" />
                <span>클립보드에 성공적으로 복사되었습니다!</span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
