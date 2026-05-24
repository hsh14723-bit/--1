import { useState } from 'react';
import { Menu, X, Settings2, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdminMode: (mode: boolean) => void;
  isAdminMode: boolean;
  onLogout: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  isAdmin,
  setIsAdminMode,
  isAdminMode,
  onLogout
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: '회사소개' },
    { id: 'products', label: '제품소개' },
    { id: 'gallery', label: '생산갤러리' },
    { id: 'contact', label: '상담문의' },
  ];

  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsAdminMode(false);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleMenuClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-200 transition-transform group-hover:scale-105">
              H
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight group-hover:text-emerald-700 transition-colors">
                한솔종합부러쉬
              </h1>
              <span className="hidden sm:block text-[10px] text-slate-500 font-mono tracking-wider -mt-1 font-semibold">
                HANSOL GENERAL BRUSH
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === item.id && !isAdminMode
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Quick Consultation Trigger */}
            <button
              onClick={() => handleMenuClick('contact')}
              className="ml-4 flex items-center space-x-2 bg-slate-950 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-100 transition-all cursor-pointer"
            >
              <PhoneCall size={14} />
              <span>간편 유선상담</span>
            </button>

            {/* Admin toggle if logged in */}
            {isAdmin ? (
              <div className="ml-2 flex items-center border-l border-slate-200 pl-2">
                <button
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isAdminMode
                      ? 'bg-amber-100 text-amber-800 font-bold border border-amber-200 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Settings2 size={12} />
                  <span>{isAdminMode ? '관리자 퇴장' : '관리자 패널'}</span>
                </button>
                {isAdminMode && (
                  <button
                    onClick={onLogout}
                    className="ml-1 text-xs text-rose-600 hover:underline px-1 py-1"
                  >
                    로그아웃
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAdminMode(true);
                  setActiveTab('admin');
                }}
                className="ml-2 border-l border-slate-200 pl-3 text-xs text-slate-400 hover:text-emerald-600 font-medium cursor-pointer"
              >
                관리자
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`p-2 rounded-lg ${
                  isAdminMode ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                }`}
                title="관리자 모드"
              >
                <Settings2 size={18} />
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-slide-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold text-base transition-colors ${
                  activeTab === item.id && !isAdminMode
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 pb-2 border-t border-slate-100 px-4 space-y-2">
              <button
                onClick={() => handleMenuClick('contact')}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
              >
                <PhoneCall size={16} />
                <span>010-4610-3701 전화하기</span>
              </button>
              
              {!isAdmin ? (
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setActiveTab('admin');
                    setIsOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                >
                  제작자/관리자 전용 로그인
                </button>
              ) : (
                <div className="flex items-center justify-between py-2 text-xs text-slate-600 bg-amber-50 px-3 rounded-lg">
                  <span>관리자 등록 상태</span>
                  <button onClick={onLogout} className="text-rose-600 font-bold hover:underline">
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
