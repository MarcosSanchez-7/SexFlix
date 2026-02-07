import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppView } from '../types';


import { useAuth } from '../src/context/AuthContext';
import { useLanguage } from '../src/context/LanguageContext';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onSearch }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { logout, user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Sync search input with URL query param on mount and when it changes
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setSearchValue(q);
  }, [window.location.search]); // Use window.location.search to detect URL updates

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, view: AppView.HOME },
    { label: t.nav.tvShows, view: AppView.SEARCH },
    { label: t.nav.movies, view: AppView.SEARCH },
    { label: t.nav.newPopular, view: AppView.SEARCH },
    { label: t.nav.myList, view: AppView.SEARCH },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
    >
      <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-6 md:py-4 gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-8 flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer touch-manipulation min-h-[44px] min-w-[44px]"
            onClick={() => setView(AppView.HOME)}
          >
            <span className="text-primary text-3xl font-black tracking-tighter uppercase italic">SEXFLIX</span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setView(item.view)}
                className={`${(item.view === AppView.HOME && currentView === AppView.HOME)
                  ? 'text-white'
                  : 'text-gray-400'
                  } hover:text-white transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Language, Search (Desktop), Profile */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white border border-white/30 px-3 py-1.5 rounded hover:bg-white/10 transition-all"
            >
              <span>{language === 'es' ? '🇪🇸 ESPAÑOL' : '🇺🇸 ENGLISH'}</span>
              <span className={`material-symbols-outlined text-sm transition-transform ${showLangMenu ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors ${language === 'es' ? 'bg-primary/10 text-primary' : 'text-gray-300'}`}
                    onClick={() => { setLanguage('es'); setShowLangMenu(false); }}
                  >
                    <span className="text-lg">🇪🇸</span>
                    <span className="text-xs font-bold">ESPAÑOL</span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors ${language === 'en' ? 'bg-primary/10 text-primary' : 'text-gray-300'}`}
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                  >
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-xs font-bold">INGLES</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-gray-500 cursor-not-allowed"
                    onClick={() => setShowLangMenu(false)}
                  >
                    <span className="text-lg">🇯🇵</span>
                    <span className="text-xs font-bold">JAPONES</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors text-gray-500 cursor-not-allowed"
                    onClick={() => setShowLangMenu(false)}
                  >
                    <span className="text-lg">🇨🇳</span>
                    <span className="text-xs font-bold">CHINO</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded bg-primary overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="User profile"
                />
              </div>
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">arrow_drop_down</span>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-white/10 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2 px-4 border-b border-white/10 text-xs text-gray-400">
                {t.nav.hello}, {user?.username || t.nav.guest}
              </div>
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm">Account</li>
                <li className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm">Help Center</li>
                <li
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm border-t border-white/10 mt-2"
                  onClick={() => logout()}
                >
                  {t.nav.signOut}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search Bar - Full Width on Mobile, Auto on Desktop */}
        <div className="w-full order-last mt-2 md:order-none md:mt-0 md:w-auto md:flex-1 md:max-w-xs md:ml-auto">
          <div className="flex items-center bg-zinc-900/80 border border-zinc-700 rounded-lg px-3 py-2 md:py-1.5 focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-base md:text-sm w-full placeholder:text-gray-500 text-white ml-2"
              placeholder={t.nav.searchPlaceholder}
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => setView(AppView.SEARCH)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
