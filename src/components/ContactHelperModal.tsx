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
import { ContactConfig } from '../types';

interface ContactHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'tel' | 'sms' | 'kakao';
  contactConfig: ContactConfig;
}

export default function ContactHelperModal({ isOpen, onClose, initialTab = 'tel', contactConfig }: ContactHelperModalProps) {
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

  const defaultSmsMsg = contactConfig?.smsBody || '[한솔종합부러쉬] 안녕하세요, 산업용 맞춤 브러쉬 제작 견적 상담 요청합니다. 연락 부탁드립니다.';

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
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">MAIN HOTLINE (대표 전문가)</span>
                      <a href={`tel:${(contactConfig?.tel1 || '010-4610-3701').replace(/-/g, '')}`} className="text-base sm:text-lg font-extrabold text-emerald-600 hover:underline font-mono" title="터치 시 바로 통화">
                        {contactConfig?.tel1 || '010-4610-3701'}
                      </a>
                      <span className="text-xs text-slate-500 block">설계 디자인, 단품 및 대량 가공 전문 마스터</span>
                    </div>
                    <button
                      onClick={() => handleCopy(contactConfig?.tel1 || '010-4610-3701', 'main')}
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
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">PRODUCTION DESK (제작 지원)</span>
                      <a href={`tel:${(contactConfig?.tel2 || '010-7301-3701').replace(/-/g, '')}`} className="text-base sm:text-lg font-extrabold text-emerald-600 hover:underline font-mono" title="터치 시 바로 통화">
                        {contactConfig?.tel2 || '010-7301-3701'}
                      </a>
                      <span className="text-xs text-slate-500 block">쎈솔 제작지원, 벙커매트 가공 및 발송 담당</span>
                    </div>
                    <button
                      onClick={() => handleCopy(contactConfig?.tel2 || '010-7301-3701', 'sub')}
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
                      <a href={`sms:${(contactConfig?.tel1 || '010-4610-3701').replace(/-/g, '')}`} className="font-extrabold text-emerald-600 hover:underline font-mono text-base" title="터치 시 바로 문자">
                        {contactConfig?.tel1 || '010-4610-3701'}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(contactConfig?.tel1 || '010-4610-3701', 'sms-phone')}
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
                    <div className="bg-white border border-slate-150 rounded-xl p-3 text-xs text-slate-705 leading-relaxed font-semibold font-sans min-h-[70px]">
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
                {/* 1. Direct Consultation Launch Zone (First Choice) */}
                <div className="bg-gradient-to-br from-yellow-400 to-amber-300 rounded-2xl p-6 text-center shadow-lg border border-yellow-400 space-y-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-yellow-950 mx-auto shadow-md">
                    <MessageCircle size={32} className="fill-current text-yellow-500" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      카카오톡 1:1 채팅 즉시 연결 (실시간)
                    </h4>
                    <p className="text-xs text-slate-800/85 leading-relaxed max-w-sm mx-auto font-medium">
                      전화 통화가 곤란하시거나 도면/이미지 수치 자료를 실시간으로 빠르게 전송하고 싶으실 때, 가장 똑똑하고 신속한 디지털 견적 상담 채널입니다.
                    </p>
                  </div>

                  <a
                    href={contactConfig?.kakaoUrl && contactConfig.kakaoUrl.startsWith('http') ? contactConfig.kakaoUrl : 'https://open.kakao.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2.5 bg-slate-900 hover:bg-slate-950 text-white font-extrabold py-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md tracking-wider"
                  >
                    <MessageCircle size={16} className="fill-current text-yellow-400" />
                    <span>지금 즉시 1:1 실시간 상담방 입장</span>
                  </a>
                </div>

                {/* ⚠️ Automatic Connection Warning & Direct Choice Guide */}
                <div className="bg-emerald-50 border border-emerald-250/70 rounded-2xl p-4 space-y-2 text-left">
                  <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-xs sm:text-sm">
                    <span className="text-sm">💬</span>
                    <span>네이버 톡톡 & 카카오톡 1:1 다이렉트 채널 안내</span>
                  </div>
                  <p className="text-[11px] text-emerald-950 leading-relaxed font-semibold">
                    클릭 시 네이버 톡톡 상담창 또는 실시간 카카오 오픈챗방으로 <strong className="font-extrabold text-emerald-900 text-xs">무중단 직접 이동</strong>됩니다. 만약 대표 홈(open.kakao.com)으로 연결된다면 관리자 설정에서 전용 오픈채팅/채널 주소가 등록되지 않은 상태입니다.
                  </p>
                  <p className="text-[11px] text-emerald-800 font-semibold leading-normal">
                    💡 <span className="underline">안내</span>: 만약 바로 연결이 안 될 경우, 아래의 <strong className="font-bold text-slate-950">수동 친구 추가 방법</strong>으로 전담 번호(<span className="font-mono">{contactConfig?.tel1 || '010-4610-3701'}</span>)를 기기에 연락처 저장 후 카카오톡으로 즉시 문의 주시면 실시간으로 친절히 안내 도와드리겠습니다!
                  </p>
                </div>

                {/* 2. Direct ID Backup / Manual Friend Search (Second Backup Option) */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <span>💡 모바일 카카오톡 수동 친구 추가 방법</span>
                      </h5>
                      <span className="text-[10px] text-slate-400 block pt-0.5 leading-normal">
                        위 링크로 입장이 불가능할 시 백업용 친구 추가 연락처입니다.
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-xl p-3 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] font-mono font-bold text-slate-400 block">KAKAOTALK PHONE NUMBER</span>
                      <span className="font-extrabold font-mono text-slate-900 text-xs sm:text-sm">{contactConfig?.tel1 || '010-4610-3701'}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(contactConfig?.tel1 || '010-4610-3701', 'kakao-phone')}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                        copiedText === 'kakao-phone'
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {copiedText === 'kakao-phone' ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedText === 'kakao-phone' ? '번호 복사 완료!' : '연락처 복사'}</span>
                    </button>
                  </div>
                </div>

                {/* Optional footer triggers */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition cursor-pointer text-center"
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
