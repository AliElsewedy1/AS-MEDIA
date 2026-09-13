import React from 'react';
import { LANGUAGES, TRANSLATIONS } from '../translations';
import { LanguageCode, PageId, ThemeMode } from '../types';

interface DrawerSheetProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  theme: ThemeMode;
  onClose: () => void;
  onSelectLanguage: (lang: LanguageCode) => void;
  onNavigate: (page: PageId) => void;
  onToggleTheme: () => void;
}

export const DrawerSheet: React.FC<DrawerSheetProps> = ({
  isOpen,
  currentLang,
  theme,
  onClose,
  onSelectLanguage,
  onNavigate,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  return (
    <div className="drawer-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle-pill"></div>

        <div className="sheet-top-row">
          <h3>{t.quickMenu}</h3>
          <button className="sheet-close-x-btn" onClick={onClose} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-solid fa-globe" style={{ color: 'var(--accent-red)' }}></i>
            <span>{t.selectLanguage}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '8px' }}>
            {LANGUAGES.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  className="lang-select-pill"
                  onClick={() => onSelectLanguage(lang.code)}
                  style={{
                    background: isActive ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#fff' : 'var(--text-pure)',
                    border: isActive ? '1px solid var(--accent-red)' : '1px solid var(--card-border)',
                    padding: '7px 2px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: isActive ? '0 0 10px var(--accent-red-glow)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{lang.flag}</span> {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sheet-links-stack">
          <button className="sheet-nav-tile" onClick={() => onNavigate('home')}>
            <span>{t.menuHome}</span>
            <i className={`fa-solid ${isRtl ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>

          <button className="sheet-nav-tile" onClick={() => onNavigate('about')}>
            <span>{t.menuAbout}</span>
            <i className={`fa-solid ${isRtl ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>

          <button className="sheet-nav-tile" onClick={() => onNavigate('photography')}>
            <span>{t.menuPhotography}</span>
            <i className={`fa-solid ${isRtl ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>

          <button className="sheet-nav-tile" onClick={() => onNavigate('design')}>
            <span>{t.menuDesign}</span>
            <i className={`fa-solid ${isRtl ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>

          <button className="sheet-nav-tile cta-red" onClick={() => onNavigate('connect')}>
            <span>{t.menuConnect}</span>
          </button>
        </div>

        <div className="sheet-bottom-theme-toggle">
          <button
            aria-label="Toggle Dark/Light Mode"
            className="theme-toggle-simple-btn"
            onClick={onToggleTheme}
            title="Toggle Dark/Light Mode"
            style={{ width: '40px', height: '36px' }}
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-moon text-slate-200 text-lg"></i>
            ) : (
              <i className="fa-solid fa-sun text-amber-500 text-lg"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
