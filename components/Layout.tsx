
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isHomePage ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md border-b border-gray-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className={`text-xl font-light tracking-tight transition-colors duration-500 ${isHomePage ? 'text-white drop-shadow-sm' : 'text-gray-900'}`}>
            hito-koto
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col space-y-1.5 p-2 focus:outline-none group z-[110]`}
          >
            <span className={`block w-8 h-[1px] transition-all duration-500 ${isHomePage ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-8 h-[1px] transition-all duration-500 ${isHomePage ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-[1px] transition-all duration-500 ${isHomePage ? 'bg-white' : 'bg-gray-900'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div className={`fixed inset-0 z-[105] bg-white transition-transform duration-700 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-12">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-extralight italic hover:text-gray-400 transition-colors">Home.</Link>
          <Link to="/post-job" onClick={() => setIsMenuOpen(false)} className="text-4xl font-extralight italic hover:text-gray-400 transition-colors">Post a Job.</Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-4xl font-extralight italic hover:text-gray-400 transition-colors">Admin Portal.</Link>
          <div className="flex space-x-8 pt-8">
            <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-gray-900">利用規約</Link>
            <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-gray-900">プライバシーポリシー</Link>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-light italic mb-6">hito-koto.</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-light">
                働くヒトの空気、シゴトを綴る。<br />
                私たちは、数字や条件だけでは語れない「現場のリアル」を、動画と物語を通じてお届けします。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Navigation</p>
                <ul className="space-y-2 text-sm text-gray-500 font-light">
                  <li><Link to="/" className="hover:text-gray-900">ホーム</Link></li>
                  <li><Link to="/post-job" className="hover:text-gray-900">求人掲載について</Link></li>
                  <li><Link to="/admin" className="hover:text-gray-900">管理者ログイン</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Legal</p>
                <ul className="space-y-2 text-sm text-gray-500 font-light">
                  <li><Link to="/terms" className="hover:text-gray-900">利用規約</Link></li>
                  <li><Link to="/privacy" className="hover:text-gray-900">プライバシーポリシー</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center text-[10px] text-gray-300 uppercase tracking-widest border-t border-gray-50 pt-12">
            &copy; 2025 hito-koto project. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;