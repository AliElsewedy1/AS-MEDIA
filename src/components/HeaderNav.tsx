import React, { useEffect, useState } from 'react';
import { LanguageCode, PageId, ThemeMode } from '../types';

interface HeaderNavProps {
  currentLang: LanguageCode;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onOpenDrawer: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentLang,
  theme,
  onNavigate,
  onToggleLang,
  onToggleTheme,
  onOpenDrawer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scrolled class
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-floating-bar ${isScrolled ? 'scrolled' : ''}`} id="appFloatingNav">
      <button
        onClick={() => onNavigate('home')}
        className="as-media-brand-mark bg-transparent border-0 p-0"
        title="AS MEDIA Home"
        aria-label="AS MEDIA Home"
      >
        <svg className="as-vector-logo-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.6 23.1">
          <g>
            <path
              className="logo-fill-adaptive"
              d="M15.2,10.1l-2.4-4.4-2.5,4.5h4.9ZM13.6,0c1.3,0,1.5.1,2.5,1.7l2.7,4.8,2.7,4.8c-2.2,0-4.1.9-5.1,2.9H7.9s-2,3.6-2,3.6H0S9.4,2,9.4,2C10.6,0,10.8,0,11.9,0h1.7Z"
            />
            <path
              className="logo-fill-adaptive"
              d="M33.2,17.9h-16s0-1.4.1-2.1c.2-1.4,1.4-2.1,2.7-2.1h13.2c.8,0,1.3-.5,1.3-1.2,0-.5-.5-1.2-1.2-1.3h-6.9c-1.2,0-2.4-.4-3.4-1-1.8-1-2.6-2.8-2.6-4.8,0-1.8.9-3.4,2.5-4.3.8-.4,1.8-.9,2.7-.9h13.8c0,2.2-1.7,4.2-4.1,4.2h-8.8c-.7,0-1.2.6-1.2,1.2,0,.5.4,1.2,1.1,1.2h7c3.4,0,6.2,2,6.1,5.6,0,3.6-2.9,5.5-6.4,5.5h0s0,0,0,0Z"
            />
            <rect className="logo-red-accent" x="17.2" y="17.9" width="17" height="5.2" />
            <path
              className="logo-text-media"
              d="M27.8,20.1c0-.4-.4-.5-.7-.6h-4v.5c-.1,0,1.7,0,1.7,0l-.2.9h-1.8v.5c-.1,0,1.9,0,1.9,0l-.2.9h-3.1l.6-2.1-.5.8-.8,1.3h-.9l-.4-2.1-.5,2.1h-1l.4-1.6.6-2.2h1.3l.4,2.4,1.4-2.2c0-.1.2-.2.4-.2h5.1c.3,0,.6,0,.9.2.7.4.8,1.2.6,1.9-.2.8-.7,1.4-1.5,1.6-.2,0-.4,0-.7,0h-1.8s.4-1.6.4-1.6l.2-.8h1l-.3,1.4h.6c.1,0,.3,0,.4,0,.3,0,.5-.3.7-.6.1-.2.2-.5.1-.8,0,0,0,0,0,0Z"
            />
            <polygon
              className="logo-text-media"
              points="32.3 21.5 32 19.8 30.8 22 30.5 22.4 29.5 22.4 30.3 21 31.7 18.6 32.8 18.6 33.3 21.3 33.5 22.4 31.2 22.4 31.7 21.5 32.3 21.5"
            />
            <polygon className="logo-text-media" points="29.8 20.9 29.5 22.4 28.5 22.4 29.4 18.6 30.4 18.6 29.8 20.9" />
          </g>
        </svg>
      </button>

      <div className="bar-controls-group">
        <button
          onClick={onToggleLang}
          className="lang-toggle-pill bar-hidable-btn"
          title="Switch Language EN / AR"
          aria-label="Switch Language"
        >
          {currentLang.toUpperCase()}
        </button>

        <button
          aria-label="Toggle Dark/Light Mode"
          className="theme-toggle-simple-btn bar-hidable-btn"
          onClick={onToggleTheme}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? (
            <i className="fa-solid fa-moon text-slate-200 text-sm"></i>
          ) : (
            <i className="fa-solid fa-sun text-amber-500 text-sm"></i>
          )}
        </button>

        <button
          aria-label="Open Navigation Menu"
          className="menu-burger-btn"
          onClick={onOpenDrawer}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="nav-scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
};
