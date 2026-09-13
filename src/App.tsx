import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AmbientBackground } from './components/AmbientBackground';
import { DrawerSheet } from './components/DrawerSheet';
import { HeaderNav } from './components/HeaderNav';
import { Toast } from './components/Toast';
import { DESIGN_ITEMS, PHOTO_ITEMS, TOOLS_LIST } from './data';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { BassetStyle, DesignCategory, LanguageCode, PageId, PhotoCategory, ThemeMode } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [photoFilter, setPhotoFilter] = useState<PhotoCategory>('all');
  const [designFilter, setDesignFilter] = useState<DesignCategory>('all');
  const [bassetStyle, setBassetStyle] = useState<BassetStyle>('basset7-solid');

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [currentLang, isRtl]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Spotlight card mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      const target = el?.closest?.('.spotlight-card') as HTMLElement | null | undefined;
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--spotlight-x', `${x}px`);
        target.style.setProperty('--spotlight-y', `${y}px`);
        target.style.setProperty('--spotlight-opacity', '1');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      const target = el?.closest?.('.spotlight-card') as HTMLElement | null | undefined;
      if (target) {
        target.style.setProperty('--spotlight-opacity', '0');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    const nextLang: LanguageCode = currentLang === 'en' ? 'ar' : 'en';
    handleSelectLanguage(nextLang);
  };

  const handleSelectLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    const langObj = LANGUAGES.find((l) => l.code === lang);
    showToast(`${langObj?.name || lang} Active`);
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 250);
  };

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(
      nextTheme === 'light'
        ? currentLang === 'ar'
          ? 'الوضع الفاتح مفعل'
          : 'Day Mode Active'
        : currentLang === 'ar'
        ? 'الوضع المظلم مفعل'
        : 'Night Mode Active'
    );
  };

  const filteredPhotos =
    photoFilter === 'all' ? PHOTO_ITEMS : PHOTO_ITEMS.filter((item) => item.category === photoFilter);

  const filteredDesigns =
    designFilter === 'all' ? DESIGN_ITEMS : DESIGN_ITEMS.filter((item) => item.category === designFilter);

  const arrowClass = isRtl ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right';
  const externalArrowClass = isRtl ? 'fa-solid fa-arrow-up-left-from-square' : 'fa-solid fa-arrow-up-right-from-square';

  // Dynamic style for the word ABOUT based on Basset Seven mode (monochrome, no red)
  const getBassetStyleProps = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: '"basset-seven", sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
    };

    // Basset Seven Outline (Pat Hickson / Steve Jackaman Outline Style)
    if (bassetStyle === 'basset7-outline') {
      return {
        ...base,
        color: 'transparent',
        WebkitTextStroke: theme === 'dark' ? '2px #ffffff' : '2px #0b0c10',
        textShadow:
          theme === 'dark'
            ? '3px 3px 0px rgba(0, 0, 0, 0.95), 6px 6px 16px rgba(0, 0, 0, 0.8)'
            : '2px 2px 0px rgba(0, 0, 0, 0.25)',
      };
    }
    // Basset Seven 3D Dimensional
    if (bassetStyle === 'basset7-dimensional') {
      return {
        ...base,
        color: theme === 'dark' ? '#ffffff' : '#0b0c10',
        WebkitTextStroke: theme === 'dark' ? '1px rgba(255, 255, 255, 0.7)' : '1px rgba(0, 0, 0, 0.7)',
        textShadow:
          theme === 'dark'
            ? '2px 2px 0px #000000, 4px 4px 0px rgba(255, 255, 255, 0.15), 7px 7px 18px rgba(0, 0, 0, 0.9)'
            : '2px 2px 0px rgba(255, 255, 255, 0.95), 4px 4px 0px rgba(0, 0, 0, 0.25)',
      };
    }
    // Basset Seven Solid Bold
    return {
      ...base,
      color: 'var(--text-pure)',
      WebkitTextStroke: '0px transparent',
      textShadow:
        theme === 'dark'
          ? '3px 3px 0px #000000, 6px 6px 16px rgba(0, 0, 0, 0.9)'
          : '2px 2px 4px rgba(0, 0, 0, 0.25)',
    };
  };

  return (
    <>
      <AmbientBackground />

      <div className="app-screen-frame">
        <HeaderNav
          currentLang={currentLang}
          theme={theme}
          onNavigate={handleNavigate}
          onToggleLang={handleToggleLang}
          onToggleTheme={handleToggleTheme}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        <main className="flex-1 mt-0">
          {/* ===================== HOME PAGE ===================== */}
          {currentPage === 'home' && (
            <section className="view-page active-view" id="page-home">
              <div className="hero-split-stage">
                <div className="hero-typography-col">
                  {/* The Word ABOUT in Basset Seven */}
                  <div
                    className="title-stacked-3d about-basset-badge cursor-pointer"
                    style={{
                      fontSize: 'clamp(3.8rem, 13vw, 6.5rem)',
                      letterSpacing: '-1.5px',
                      ...getBassetStyleProps(),
                    }}
                    onClick={() => handleNavigate('about')}
                    title="Font: Basset Seven (Adobe Fonts)"
                  >
                    {t.aboutTitle}
                  </div>

                  <div className="author-name-lead">{t.authorFirstName}</div>
                  <div className="author-surname-red">{t.authorLastName}</div>

                  <div className="roles-unified-pod">
                    <span className="role-pod-item">{t.roleDesigner}</span>
                    <span className="role-pod-item">{t.rolePhotographer}</span>
                    <span className="role-pod-item">{t.roleDirector}</span>
                  </div>

                  <p className="creator-bio-snippet">{t.heroBio}</p>
                  <span className="punchy-sub-line">{t.heroSub}</span>
                </div>

                <div className="hero-standee-col">
                  <img
                    alt="Ali Elsewedy"
                    className="creator-cutout-img"
                    src={
                      theme === 'dark'
                        ? 'https://lh3.googleusercontent.com/d/13GRXgFwKlE6F0bjhGDwEyxz-_8eIoofF'
                        : 'https://lh3.googleusercontent.com/d/1Nq0-KeCEBnMofq2nPp7PMowbY_jxB_Lg'
                    }
                  />
                </div>
              </div>

              {/* Stats Triad */}
              <div className="stats-triad">
                <div className="stat-pod spotlight-card">
                  <div className="stat-number">2016</div>
                  <div className="stat-label">{t.since}</div>
                </div>
                <div className="stat-pod spotlight-card">
                  <div className="stat-number">
                    100<span className="red">+</span>
                  </div>
                  <div className="stat-label">{t.projects}</div>
                </div>
                <div className="stat-pod spotlight-card">
                  <div className="stat-number">
                    AI <span className="red">∞</span>
                  </div>
                  <div className="stat-label">{t.workflow}</div>
                </div>
              </div>

              {/* Primary Action Button -> About */}
              <button className="primary-action-btn" onClick={() => handleNavigate('about')}>
                <span>{t.discoverJourney}</span>
                <div className="action-icon-circle">
                  <i className={arrowClass}></i>
                </div>
              </button>

              {/* Photography Section Header */}
              <div className="section-header-bar">
                <div className="section-headline">{t.photographyHeadline}</div>
                <div className="section-spec-tag">{t.photoSpecTag}</div>
              </div>

              {/* 4 Category Duo Grid for Photography */}
              <div className="category-duo-grid">
                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setPhotoFilter('events');
                    handleNavigate('photography');
                  }}
                >
                  <div className="card-matrix-index">01</div>
                  <h4>{t.eventsTitle}</h4>
                  <p>{t.eventsDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setPhotoFilter('showroom');
                    handleNavigate('photography');
                  }}
                >
                  <div className="card-matrix-index">02</div>
                  <h4>{t.showroomTitle}</h4>
                  <p>{t.showroomDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setPhotoFilter('products');
                    handleNavigate('photography');
                  }}
                >
                  <div className="card-matrix-index">03</div>
                  <h4>{t.productsTitle}</h4>
                  <p>{t.productsDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setPhotoFilter('sessions');
                    handleNavigate('photography');
                  }}
                >
                  <div className="card-matrix-index">04</div>
                  <h4>{t.sessionsTitle}</h4>
                  <p>{t.sessionsDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>
              </div>

              {/* Design Section Header */}
              <div className="section-header-bar">
                <div className="section-headline">{t.designHeadline}</div>
                <div className="section-spec-tag">{t.designSpecTag}</div>
              </div>

              {/* 5 Category Duo Grid for Design */}
              <div className="category-duo-grid">
                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setDesignFilter('social');
                    handleNavigate('design');
                  }}
                >
                  <div className="card-matrix-index">01</div>
                  <h4>{t.socialTitle}</h4>
                  <p>{t.socialDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setDesignFilter('uiux');
                    handleNavigate('design');
                  }}
                >
                  <div className="card-matrix-index">02</div>
                  <h4>{t.uiuxTitle}</h4>
                  <p>{t.uiuxDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setDesignFilter('branding');
                    handleNavigate('design');
                  }}
                >
                  <div className="card-matrix-index">03</div>
                  <h4>{t.brandingTitle}</h4>
                  <p>{t.brandingDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  onClick={() => {
                    setDesignFilter('logofolio');
                    handleNavigate('design');
                  }}
                >
                  <div className="card-matrix-index">04</div>
                  <h4>{t.logofolioTitle}</h4>
                  <p>{t.logofolioDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>

                <div
                  className="category-slate-card spotlight-card"
                  style={{ gridColumn: 'span 2' }}
                  onClick={() => {
                    setDesignFilter('packaging');
                    handleNavigate('design');
                  }}
                >
                  <div className="card-matrix-index">05</div>
                  <h4>{t.packagingTitle}</h4>
                  <p>{t.packagingDesc}</p>
                  <div className="card-nav-arrow">
                    <i className={arrowClass}></i>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===================== PHOTOGRAPHY PAGE ===================== */}
          {currentPage === 'photography' && (
            <section className="view-page active-view" id="page-photography" style={{ paddingTop: '28px' }}>
              <div
                className="title-stacked-3d"
                style={{ fontSize: '1.8rem', marginBottom: '4px', ...getBassetStyleProps() }}
              >
                {t.photoGalleryTitle}
              </div>
              <div className="author-surname-red" style={{ fontSize: '2.2rem', marginBottom: '14px' }}>
                {t.photoGallerySub}
              </div>

              <div className="filter-pills-sticky-bar" id="photoFilterBar">
                <button
                  className={`filter-pill-tab ${photoFilter === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setPhotoFilter('all')}
                >
                  {t.allFilter}
                </button>
                <button
                  className={`filter-pill-tab ${photoFilter === 'events' ? 'active-filter' : ''}`}
                  onClick={() => setPhotoFilter('events')}
                >
                  {t.eventsTitle}
                </button>
                <button
                  className={`filter-pill-tab ${photoFilter === 'showroom' ? 'active-filter' : ''}`}
                  onClick={() => setPhotoFilter('showroom')}
                >
                  {t.showroomTitle}
                </button>
                <button
                  className={`filter-pill-tab ${photoFilter === 'products' ? 'active-filter' : ''}`}
                  onClick={() => setPhotoFilter('products')}
                >
                  {t.productsTitle}
                </button>
                <button
                  className={`filter-pill-tab ${photoFilter === 'sessions' ? 'active-filter' : ''}`}
                  onClick={() => setPhotoFilter('sessions')}
                >
                  {t.sessionsTitle}
                </button>
              </div>

              <div className="photo-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '24px' }}>
                {filteredPhotos.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="gallery-item-card spotlight-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="gallery-image-box">
                      <div className="gallery-category-tag">{item.tagKey}</div>
                      <img src={item.image} alt={item.titleKey} loading="lazy" />
                    </div>
                    <div className="gallery-content-meta">
                      <div className="gallery-title-group">
                        <h4>{item.titleKey}</h4>
                        <p>{item.descKey}</p>
                      </div>
                      <button
                        className="gallery-view-btn"
                        onClick={() => handleNavigate('connect')}
                        aria-label="Inquire about this shoot"
                      >
                        <i className={externalArrowClass}></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="primary-action-btn" onClick={() => handleNavigate('connect')}>
                <span>{t.bookPhotoSession}</span>
                <div className="action-icon-circle">
                  <i className={arrowClass}></i>
                </div>
              </button>
            </section>
          )}

          {/* ===================== DESIGN PAGE ===================== */}
          {currentPage === 'design' && (
            <section className="view-page active-view" id="page-design" style={{ paddingTop: '28px' }}>
              <div
                className="title-stacked-3d"
                style={{ fontSize: '1.8rem', marginBottom: '4px', ...getBassetStyleProps() }}
              >
                {t.designGalleryTitle}
              </div>
              <div className="author-surname-red" style={{ fontSize: '2.2rem', marginBottom: '14px' }}>
                {t.designGallerySub}
              </div>

              <div className="filter-pills-sticky-bar" id="designFilterBar">
                <button
                  className={`filter-pill-tab ${designFilter === 'all' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('all')}
                >
                  {t.allFilter}
                </button>
                <button
                  className={`filter-pill-tab ${designFilter === 'social' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('social')}
                >
                  {t.socialTitle}
                </button>
                <button
                  className={`filter-pill-tab ${designFilter === 'uiux' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('uiux')}
                >
                  {t.uiuxTitle}
                </button>
                <button
                  className={`filter-pill-tab ${designFilter === 'branding' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('branding')}
                >
                  {t.brandingTitle}
                </button>
                <button
                  className={`filter-pill-tab ${designFilter === 'logofolio' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('logofolio')}
                >
                  {t.logofolioTitle}
                </button>
                <button
                  className={`filter-pill-tab ${designFilter === 'packaging' ? 'active-filter' : ''}`}
                  onClick={() => setDesignFilter('packaging')}
                >
                  {t.packagingTitle}
                </button>
              </div>

              <div className="design-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '24px' }}>
                {filteredDesigns.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="gallery-item-card spotlight-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="gallery-image-box">
                      <div className="gallery-category-tag">{item.tagKey}</div>
                      <img src={item.image} alt={item.titleKey} loading="lazy" />
                    </div>
                    <div className="gallery-content-meta">
                      <div className="gallery-title-group">
                        <h4>{item.titleKey}</h4>
                        <p>{item.descKey}</p>
                      </div>
                      <button
                        className="gallery-view-btn"
                        onClick={() => handleNavigate('connect')}
                        aria-label="Inquire about this project"
                      >
                        <i className={externalArrowClass}></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="primary-action-btn" onClick={() => handleNavigate('connect')}>
                <span>{t.startDesignProject}</span>
                <div className="action-icon-circle">
                  <i className={arrowClass}></i>
                </div>
              </button>
            </section>
          )}

          {/* ===================== ABOUT PAGE ===================== */}
          {currentPage === 'about' && (
            <section className="view-page active-view" id="page-about" style={{ paddingTop: '36px' }}>
              {/* The Word ABOUT displayed prominently in Basset Seven Solid */}
              <div className="mb-1">
                <div
                  className="title-stacked-3d about-basset-badge"
                  style={{
                    fontSize: 'clamp(3.8rem, 13vw, 6.5rem)',
                    letterSpacing: '-1.5px',
                    ...getBassetStyleProps(),
                  }}
                >
                  {t.aboutTitle}
                </div>
              </div>

              <div className="author-name-lead">{t.authorFirstName}</div>
              <div className="author-surname-red" style={{ fontSize: '1.45rem' }}>
                {t.authorLastName}
              </div>

              <div className="roles-unified-pod" style={{ marginTop: '4px', marginBottom: '14px' }}>
                <span className="role-pod-item">{t.roleDesigner}</span>
                <span className="role-pod-item">{t.rolePhotographer}</span>
                <span className="role-pod-item">{t.roleArtDirector}</span>
              </div>

              <div className="section-headline" style={{ fontSize: '1rem', marginBottom: '6px' }}>
                {t.helloGreeting}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  marginBottom: '24px',
                }}
              >
                {t.aboutParagraph}
              </p>

              {/* Editorial Expertise */}
              <div className="expertise-editorial-section">
                <div className="editorial-header-wrap">
                  <div className="diamond-lead">
                    <span className="dia">◆</span> <span>{t.expertiseTitle}</span>
                  </div>
                  <svg className="hand-squiggle-svg" viewBox="0 0 80 8">
                    <path d="M2 5 C16 1, 28 8, 42 4 C54 1, 68 7, 78 4" />
                  </svg>
                </div>

                <div className="expertise-editorial-grid">
                  <div className="expertise-editorial-col">
                    <div className="expertise-lead-row">
                      <svg
                        className="expertise-wireframe-icon"
                        viewBox="0 0 38 38"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12a3 3 0 0 1 3-3h3l2-3h12l2 3h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V12z" />
                        <circle cx="19" cy="20" r="6" />
                        <circle cx="28" cy="13" r="1.2" fill="currentColor" />
                      </svg>
                      <div className="expertise-meta">
                        <span className="expertise-num">01.</span>
                        <h4 className="expertise-col-heading">{t.expertise1Heading}</h4>
                      </div>
                    </div>
                    <p className="expertise-col-body">{t.expertise1Body}</p>
                  </div>

                  <div className="expertise-editorial-col">
                    <div className="expertise-lead-row">
                      <svg
                        className="expertise-wireframe-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 39.6 23.1"
                      >
                        <path d="M25.5,13.5c-.8,1.6-1.9,3.3-2.5,4.7v4.6c0,0-6.5,0-6.5,0,0-1.7,0-3.2,0-4.8-.5-1.2-1.7-2.9-2.5-4.4l5-10.2-1.1-1.2h-6.3c-.8.9-2.4,2-3.2.5-.4-.7,0-2.1.6-2.3.9-.3,1.7.5,2.4.9,2,.3,6.7,0,6.7,0l1.8-1.1,1.7,1.2s4.7,0,6.7,0c.7-.7,1.4-1.3,2.4-1,.6.2.9,1.5.5,2.3-.8,1.5-2.3.4-3.2-.3l-6.3-.2-1,1.3,4.9,10.1ZM20.4,4.5c-.5,2.2-.4,4.1-.3,5.7,0,.4.7,1.2,1,1.7.4.6,0,1.9-.5,2.3-.5.3-1.6.4-2-.3-.7-2.2.9-2.2.9-3.6,0-2,.2-4-.4-5.8-1.8,3.3-3.2,6.2-4.6,9.1,1.3,2,1.8,2.9,3.1,5.4h4.3c1-2,1.9-3.4,3-5.4-1.4-3.1-2.9-6.1-4.6-9.1ZM17.1,19.4v2.8h5.5v-2.8h-5.5Z" />
                      </svg>
                      <div className="expertise-meta">
                        <span className="expertise-num">02.</span>
                        <h4 className="expertise-col-heading">{t.expertise2Heading}</h4>
                      </div>
                    </div>
                    <p className="expertise-col-body">{t.expertise2Body}</p>
                  </div>
                </div>
              </div>

              {/* Tools I Use */}
              <div className="section-header-bar">
                <div className="section-headline">{t.toolsTitle}</div>
                <div className="section-spec-tag">{t.toolsSpec}</div>
              </div>

              <div className="tools-flex-container">
                {TOOLS_LIST.map((tool) => (
                  <span key={tool.name} className="software-pill">
                    <span className={`sw-icon ${tool.className}`}>{tool.icon}</span> {tool.name}
                  </span>
                ))}
              </div>

              {/* Dual Columns: Experience & Education */}
              <div className="dual-story-columns">
                <div>
                  <div className="story-section-title">
                    <span className="diamond">◆</span> <span>{t.experienceTitle}</span>
                  </div>

                  <div className="career-timeline-node" style={{ paddingTop: '4px' }}>
                    <div className="timeline-date-stamp">{t.exp1Date}</div>
                    <div className="timeline-job-title">{t.exp1Role}</div>
                    <div className="timeline-location">{t.exp1Location}</div>
                  </div>

                  <div className="career-timeline-node">
                    <div className="timeline-date-stamp">{t.exp2Date}</div>
                    <div className="timeline-job-title">{t.exp2Role}</div>
                    <div className="timeline-location">{t.exp2Location}</div>
                  </div>

                  <div className="career-timeline-node">
                    <div className="timeline-date-stamp">{t.exp3Date}</div>
                    <div className="timeline-job-title">{t.exp3Role}</div>
                    <div className="timeline-location">{t.exp3Location}</div>
                  </div>
                </div>

                <div>
                  <div className="story-section-title">
                    <span className="diamond">◆</span> <span>{t.educationTitle}</span>
                  </div>

                  <div className="career-timeline-node">
                    <div className="timeline-job-title">{t.eduDegree}</div>
                    <div className="timeline-location">{t.eduDetails}</div>
                  </div>

                  <div className="passion-manifesto-badge">
                    <div className="manifesto-label">
                      <span>◆</span> <span>{t.passionateLabel}</span>
                    </div>
                    <div className="manifesto-words">{t.passionateWords}</div>
                  </div>
                </div>
              </div>

              <button className="primary-action-btn" onClick={() => handleNavigate('connect')}>
                <span>{t.viewWorkContact}</span>
                <div className="action-icon-circle">
                  <i className={externalArrowClass}></i>
                </div>
              </button>
            </section>
          )}

          {/* ===================== CONNECT PAGE ===================== */}
          {currentPage === 'connect' && (
            <section className="view-page active-view" id="page-connect" style={{ paddingTop: '28px' }}>
              <div className="status-capsule-badge">
                <div className="status-live-beacon"></div>
                <span className="status-text">{t.availableBadge}</span>
              </div>

              <div
                className="title-stacked-3d"
                style={{ fontSize: '2rem', marginBottom: '4px', ...getBassetStyleProps() }}
              >
                {t.letsTitle}
              </div>
              <div className="author-surname-red" style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
                {t.connectSub}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  marginBottom: '24px',
                }}
              >
                {t.connectBio}
              </p>

              <div className="direct-channels-pod spotlight-card">
                <div className="channels-header-row">
                  <span>{t.channelsHeader}</span>
                  <span className="direct">{t.directTag}</span>
                </div>
                <div className="social-quad-row">
                  <a
                    href="https://www.behance.net"
                    target="_blank"
                    rel="noreferrer"
                    className="social-anchor-cube spotlight-card"
                    title="Behance"
                  >
                    <i className="fa-brands fa-behance"></i>
                    <span>BEHANCE</span>
                  </a>
                  <a
                    href="https://www.instagram.com/sewedy_media?stkn=MXY4MzY4bTJ3MWZzcw=="
                    target="_blank"
                    rel="noreferrer"
                    className="social-anchor-cube spotlight-card"
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram"></i>
                    <span>INSTAGRAM</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/19KCe8Mm3H/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-anchor-cube spotlight-card"
                    title="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                    <span>FACEBOOK</span>
                  </a>
                  <a
                    href="https://wa.me/qr/5JRN6AWP6WZQG1"
                    target="_blank"
                    rel="noreferrer"
                    className="social-anchor-cube spotlight-card"
                    title="WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              <a
                href="https://wa.me/qr/5JRN6AWP6WZQG1"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-direct-cell spotlight-card"
              >
                <div className="wa-flex-lead">
                  <div className="wa-icon-bubble">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div className="wa-textual-meta">
                    <h4>{t.chatOnWhatsApp}</h4>
                    <p>{t.waDirectLine}</p>
                  </div>
                </div>
                <div className="wa-external-glyph">
                  <i className={externalArrowClass}></i>
                </div>
              </a>
            </section>
          )}
        </main>

        <footer>
          <div className="as-media-brand-mark" style={{ marginBottom: '4px' }}>
            <svg
              className="as-vector-logo-svg"
              style={{ width: '58px', height: '26px' }}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 39.6 23.1"
            >
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
          </div>
          <p className="brand-mark-copy">{t.footerCopyright}</p>
          <p className="brand-sub-disclaimer">{t.footerDisclaimer}</p>
        </footer>

        <DrawerSheet
          isOpen={isDrawerOpen}
          currentLang={currentLang}
          theme={theme}
          onClose={() => setIsDrawerOpen(false)}
          onSelectLanguage={handleSelectLanguage}
          onNavigate={handleNavigate}
          onToggleTheme={handleToggleTheme}
        />

        <Toast message={toastMessage} />
      </div>
    </>
  );
}
