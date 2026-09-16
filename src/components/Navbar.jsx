import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { pathForPage } from '../lib/seoConfig';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  BookOpen, 
  Share2, 
  Cpu, 
  ChevronRight,
  ChevronDown,
  GraduationCap,
  TrendingUp,
  Award,
  Users,
  Building2,
  FileText,
  Image,
  Video
} from 'lucide-react';

export default function Navbar({ currentLang, setLang, activePage, setActivePage, openLeadModal, siteSettings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const toggleLanguage = () => {
    setLang(currentLang === 'en' ? 'ne' : 'en');
  };

  const categoryPills = [
    { id: 'ai', label: 'AI & Data Tools', icon: <Cpu size={14} color="#1C2F4D" /> },
    { id: 'marketing', label: 'Digital Marketing & Ads', icon: <Share2 size={14} color="#1C2F4D" /> },
    { id: 'strategy', label: 'Growth Strategy & Funnels', icon: <TrendingUp size={14} color="var(--brand-navy)" /> },
    { id: 'institution', label: 'School / College Workshops', icon: <GraduationCap size={14} color="#1C2F4D" /> }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 1100) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', mobileMenuOpen);
    return () => document.body.classList.remove('mobile-nav-open');
  }, [mobileMenuOpen]);

  // Hidden keyboard shortcut: Ctrl+Shift+A opens admin for internal staff
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActivePage('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePage]);

  const isAboutActive = ['about', 'who-we-are', 'ceo-message', 'team'].includes(activePage);
  const isTrainingActive = ['training', 'individual-training', 'institutional-training'].includes(activePage);
  const isGalleryActive = ['gallery', 'gallery-videos'].includes(activePage);

  return (
    <>
      <header className="main-navbar">
      {/* 1. Top Utility Contact Bar (Site-wide Consistent Settings) */}
      <div className="top-utility-bar">
        <div className="container top-utility-flex">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="var(--brand-navy)" />
              <span>{getLangText(siteSettings, 'address', currentLang) || siteSettings?.address_en || siteSettings?.address || 'Bagbazar, Kathmandu 44600, Nepal'}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="var(--brand-navy)" />
              <span>{siteSettings?.primaryPhone || '+977 1-4421098'}{siteSettings?.mobilePhone ? ` / ${siteSettings.mobilePhone}` : ''}</span>
            </span>
            <span className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="var(--brand-navy)" />
              <span>{siteSettings?.officialEmail || 'info.vedantastrategies@gmail.com'}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {siteSettings?.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-navy)', display: 'inline-flex', opacity: 0.8 }} title="Facebook" aria-label="Facebook">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {siteSettings?.linkedinUrl && (
                <a href={siteSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-navy)', display: 'inline-flex', opacity: 0.8 }} title="LinkedIn" aria-label="LinkedIn">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              )}
              {siteSettings?.instagramUrl && (
                <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-navy)', display: 'inline-flex', opacity: 0.8 }} title="Instagram" aria-label="Instagram">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
            </div>
            <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{getLangText(siteSettings, 'officeHours', currentLang) || siteSettings?.officeHours || 'Sunday to Friday: 9:00 AM – 6:00 PM'}</span>
            <button
              onClick={toggleLanguage}
              style={{ background: 'rgba(23,38,66,0.06)', border: '1px solid var(--border-color)', color: 'var(--brand-navy)', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Globe size={12} color="var(--brand-navy)" />
              <span>{t.nav.languageName}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="container main-nav-container">
        {/* Brand Official Logo */}
        <a 
          href={pathForPage('home')} 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          className="logo-wrap"
          title="Vedanta Strategies - Home"
        >
          <img 
            src="/images/logo.svg" 
            alt="Vedanta Strategies" 
            className="brand-logo-img"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a
            href={pathForPage('home')}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          >
            {t.nav.home}
          </a>

          {/* About Us Dropdown */}
          <div className="nav-dropdown-wrapper">
            <a
              href={pathForPage('who-we-are')}
              onClick={(e) => { e.preventDefault(); handleNavClick('who-we-are'); }}
              className={`nav-link ${isAboutActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t.nav.about}</span>
              <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </a>
            <div className="nav-dropdown-panel">
              <a
                href={pathForPage('who-we-are')}
                className={`nav-dropdown-item ${activePage === 'who-we-are' || activePage === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('who-we-are'); }}
              >
                <Building2 size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.aboutWhoWeAre || 'Who We Are'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Our mission, values & Bagbazar office</div>
                </div>
              </a>
              <a
                href={pathForPage('ceo-message')}
                className={`nav-dropdown-item ${activePage === 'ceo-message' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('ceo-message'); }}
              >
                <Award size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.aboutCeo || 'Message from CEO'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Executive letter & philosophy</div>
                </div>
              </a>
              <a
                href={pathForPage('team')}
                className={`nav-dropdown-item ${activePage === 'team' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('team'); }}
              >
                <Users size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.aboutTeam || 'Our Team'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Instructors & digital strategists</div>
                </div>
              </a>
            </div>
          </div>

          {/* Training & Courses Dropdown */}
          <div className="nav-dropdown-wrapper">
            <a
              href={pathForPage('individual-training')}
              onClick={(e) => { e.preventDefault(); handleNavClick('individual-training'); }}
              className={`nav-link ${isTrainingActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t.nav.training}</span>
              <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </a>
            <div className="nav-dropdown-panel">
              <a
                href={pathForPage('individual-training')}
                className={`nav-dropdown-item ${activePage === 'individual-training' || activePage === 'training' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('individual-training'); }}
              >
                <BookOpen size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.trainingIndividual || 'Individual Training'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Small cohorts for professionals & students</div>
                </div>
              </a>
              <a
                href={pathForPage('institutional-training')}
                className={`nav-dropdown-item ${activePage === 'institutional-training' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('institutional-training'); }}
              >
                <GraduationCap size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.trainingInstitution || 'Institutional Programs'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>On-site bootcamps & teacher AI literacy</div>
                </div>
              </a>
            </div>
          </div>

          <a
            href={pathForPage('services')}
            onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
          >
            {t.nav.services}
          </a>

          <a
            href={pathForPage('portfolio')}
            onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}
            className={`nav-link ${activePage === 'portfolio' ? 'active' : ''}`}
          >
            {t.nav.portfolio}
          </a>

          <a
            href={pathForPage('blog')}
            onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}
            className={`nav-link ${activePage === 'blog' ? 'active' : ''}`}
          >
            {t.nav.blog}
          </a>

          {/* Gallery Dropdown */}
          <div className="nav-dropdown-wrapper">
            <a
              href={pathForPage('gallery')}
              onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
              className={`nav-link ${isGalleryActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t.nav.gallery || (currentLang === 'ne' ? 'ग्यालेरी' : 'Gallery')}</span>
              <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </a>
            <div className="nav-dropdown-panel">
              <a
                href={pathForPage('gallery')}
                className={`nav-dropdown-item ${activePage === 'gallery' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
              >
                <Image size={16} color="var(--brand-navy)" />
                <div>
                  <div>{currentLang === 'ne' ? 'फोटो' : 'Photos'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Workshops & production glimpses</div>
                </div>
              </a>
              <a
                href={pathForPage('gallery-videos')}
                className={`nav-dropdown-item ${activePage === 'gallery-videos' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('gallery-videos'); }}
              >
                <Video size={16} color="var(--brand-navy)" />
                <div>
                  <div>{currentLang === 'ne' ? 'भिडियो' : 'Videos'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Workshops, training & event videos</div>
                </div>
              </a>
            </div>
          </div>

          <a
            href={pathForPage('contact')}
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* Action Controls - Send Enquiry */}
        <div className="nav-actions">
          <button 
            className="btn btn-primary btn-sm nav-enquiry-btn"
            onClick={() => openLeadModal('general')}
          >
            <span>{currentLang === 'ne' ? 'सोधपुछ गर्नुहोस्' : 'Send Enquiry'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>



      </header>

      {/* Mobile Drawer — half-width vertical panel from the right */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
          <nav className="mobile-drawer" aria-label="Mobile menu">
          <div className="mobile-drawer-header">
            <img
              src="/images/logo.svg"
              alt="Vedanta Strategies"
              className="brand-logo-img mobile-drawer-logo"
            />
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <a href={pathForPage('home')} className={`mobile-drawer-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            {t.nav.home}
          </a>

            <div>
              <button type="button" className={`mobile-drawer-link mobile-drawer-accordion ${isAboutActive ? 'active' : ''}`} onClick={() => setMobileAboutOpen(!mobileAboutOpen)}>
                <span>{t.nav.about}</span>
                <ChevronDown size={16} style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {mobileAboutOpen && (
                <div className="mobile-drawer-sub">
                  <a href={pathForPage('who-we-are')} className={activePage === 'who-we-are' || activePage === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('who-we-are'); }}>{t.nav.aboutWhoWeAre}</a>
                  <a href={pathForPage('ceo-message')} className={activePage === 'ceo-message' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('ceo-message'); }}>{t.nav.aboutCeo}</a>
                  <a href={pathForPage('team')} className={activePage === 'team' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('team'); }}>{t.nav.aboutTeam}</a>
                </div>
              )}
            </div>

            <div>
              <button type="button" className={`mobile-drawer-link mobile-drawer-accordion ${isTrainingActive ? 'active' : ''}`} onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}>
                <span>{t.nav.training}</span>
                <ChevronDown size={16} style={{ transform: mobileTrainingOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {mobileTrainingOpen && (
                <div className="mobile-drawer-sub">
                  <a href={pathForPage('individual-training')} className={activePage === 'individual-training' || activePage === 'training' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('individual-training'); }}>{t.nav.trainingIndividual}</a>
                  <a href={pathForPage('institutional-training')} className={activePage === 'institutional-training' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('institutional-training'); }}>{t.nav.trainingInstitution}</a>
                </div>
              )}
            </div>

            <a href={pathForPage('services')} className={`mobile-drawer-link ${activePage === 'services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}>{t.nav.services}</a>
            <a href={pathForPage('portfolio')} className={`mobile-drawer-link ${activePage === 'portfolio' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}>{t.nav.portfolio}</a>
            <a href={pathForPage('blog')} className={`mobile-drawer-link ${activePage === 'blog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}>{t.nav.blog}</a>
            <div>
              <button type="button" className={`mobile-drawer-link mobile-drawer-accordion ${isGalleryActive ? 'active' : ''}`} onClick={() => setMobileGalleryOpen(!mobileGalleryOpen)}>
                <span>{t.nav.gallery}</span>
                <ChevronDown size={16} style={{ transform: mobileGalleryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {mobileGalleryOpen && (
                <div className="mobile-drawer-sub">
                  <a href={pathForPage('gallery')} className={activePage === 'gallery' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}>{currentLang === 'ne' ? 'फोटो' : 'Photos'}</a>
                  <a href={pathForPage('gallery-videos')} className={activePage === 'gallery-videos' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('gallery-videos'); }}>{currentLang === 'ne' ? 'भिडियो' : 'Videos'}</a>
                </div>
              )}
            </div>
            <a href={pathForPage('contact')} className={`mobile-drawer-link ${activePage === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>{t.nav.contact}</a>

            <div className="mobile-drawer-footer">
              <button type="button" className="mobile-lang-btn" onClick={toggleLanguage}>
                <Globe size={14} />
                {t.nav.languageName}
              </button>
              <div className="mobile-drawer-meta">
                {getLangText(siteSettings, 'address', currentLang) || siteSettings?.address_en || 'Bagbazar, Kathmandu 44600, Nepal'}
                <br />
                {siteSettings?.primaryPhone || '+977 1-4421098'}{siteSettings?.mobilePhone ? ` / ${siteSettings.mobilePhone}` : ''}
                <br />
                {siteSettings?.officialEmail || 'info.vedantastrategies@gmail.com'}
                <br />
                {getLangText(siteSettings, 'officeHours', currentLang) || siteSettings?.officeHours || 'Sunday to Friday: 9:00 AM – 6:00 PM'}
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => { setMobileMenuOpen(false); openLeadModal('general'); }}
              >
                {currentLang === 'ne' ? 'सोधपुछ पठाउनुहोस्' : 'Send Enquiry'}
              </button>
            </div>
          </nav>
          </>
      )}
    </>
  );
}

