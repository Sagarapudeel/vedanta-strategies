import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Sparkles, 
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
  Image
} from 'lucide-react';

export default function Navbar({ currentLang, setLang, activePage, setActivePage, openLeadModal, siteSettings, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const toggleLanguage = () => {
    setLang(currentLang === 'en' ? 'ne' : 'en');
  };

  const categoryPills = [
    { id: 'ai', label: 'AI & Data Tools', icon: <Cpu size={14} color="#851C2C" /> },
    { id: 'marketing', label: 'Digital Marketing & Ads', icon: <Share2 size={14} color="#172642" /> },
    { id: 'strategy', label: 'Growth Strategy & Funnels', icon: <TrendingUp size={14} color="#C59A3F" /> },
    { id: 'institution', label: 'School / College Workshops', icon: <GraduationCap size={14} color="#851C2C" /> }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.location.hash = pageId === 'home' ? 'home' : pageId;
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActivePage('individual-training');
      if (onSearch) onSearch(searchTerm);
    }
  };

  // Hidden keyboard shortcut: Ctrl+Shift+A opens admin for internal staff
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActivePage('admin');
        window.location.hash = '#admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePage]);

  const isAboutActive = ['about', 'who-we-are', 'ceo-message', 'team'].includes(activePage);
  const isTrainingActive = ['training', 'individual-training', 'institutional-training'].includes(activePage);

  return (
    <header className="main-navbar">
      {/* 1. Top Utility Contact Bar (Site-wide Consistent Settings) */}
      <div className="top-utility-bar">
        <div className="container top-utility-flex">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="#C59A3F" />
              <span>{siteSettings?.primaryPhone || '+977 1-4421098'}{siteSettings?.mobilePhone ? ` / ${siteSettings.mobilePhone}` : ''}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#C59A3F" />
              <span>{siteSettings?.officialEmail || 'info@vedantastrategies.com'}</span>
            </span>
            <span className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="#C59A3F" />
              <span>{getLangText(siteSettings, 'address', currentLang) || siteSettings?.address_en || siteSettings?.address || 'Bagbazar, Kathmandu 44600, Nepal'}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Sun–Fri: 9am–6pm</span>
            <button
              onClick={toggleLanguage}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Globe size={12} color="#C59A3F" />
              <span>{t.nav.languageName}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="container main-nav-container">
        {/* Brand Official Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          className="logo-wrap"
          title="Vedanta Strategies - Home"
        >
          <img 
            src="/images/logo.png" 
            alt="Vedanta Strategies" 
            className="brand-logo-img"
          />
        </a>

        {/* Compact Search Toggle */}
        <div className="nav-search-wrap" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {searchOpen && (
            <form onSubmit={handleSearchSubmit}
              style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '6px', padding: '4px 8px', gap: '4px', marginRight: '6px', border: '1px solid var(--border-color)' }}>
              <input
                autoFocus
                type="text"
                placeholder={currentLang === 'ne' ? 'खोज्नुहोस्...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => { if (!searchTerm) setSearchOpen(false); }}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '160px', color: 'var(--text-main)' }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-maroon)', display: 'flex', padding: '2px' }}>
                <Search size={15} />
              </button>
            </form>
          )}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
            style={{ background: searchOpen ? 'rgba(133,28,44,0.08)' : 'transparent', border: 'none', cursor: 'pointer', color: 'var(--brand-maroon)', display: 'flex', alignItems: 'center', padding: '7px', borderRadius: '6px', transition: 'background 0.15s' }}>
            <Search size={18} />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          >
            {t.nav.home}
          </a>

          {/* About Us Dropdown */}
          <div className="nav-dropdown-wrapper">
            <a
              href="#who-we-are"
              onClick={(e) => { e.preventDefault(); handleNavClick('who-we-are'); }}
              className={`nav-link ${isAboutActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t.nav.about}</span>
              <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </a>
            <div className="nav-dropdown-panel">
              <div 
                className={`nav-dropdown-item ${activePage === 'who-we-are' || activePage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('who-we-are')}
              >
                <Building2 size={16} color="var(--brand-maroon)" />
                <div>
                  <div>{t.nav.aboutWhoWeAre || 'Who We Are'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Our mission, values & Bagbazar campus</div>
                </div>
              </div>
              <div 
                className={`nav-dropdown-item ${activePage === 'ceo-message' ? 'active' : ''}`}
                onClick={() => handleNavClick('ceo-message')}
              >
                <Award size={16} color="var(--brand-gold)" />
                <div>
                  <div>{t.nav.aboutCeo || 'Message from CEO'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Executive letter & philosophy</div>
                </div>
              </div>
              <div 
                className={`nav-dropdown-item ${activePage === 'team' ? 'active' : ''}`}
                onClick={() => handleNavClick('team')}
              >
                <Users size={16} color="var(--brand-navy)" />
                <div>
                  <div>{t.nav.aboutTeam || 'Our Team'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Instructors & digital strategists</div>
                </div>
              </div>
            </div>
          </div>

          {/* Training & Courses Dropdown */}
          <div className="nav-dropdown-wrapper">
            <a
              href="#individual-training"
              onClick={(e) => { e.preventDefault(); handleNavClick('individual-training'); }}
              className={`nav-link ${isTrainingActive ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>{t.nav.training}</span>
              <ChevronDown size={14} style={{ opacity: 0.7 }} />
            </a>
            <div className="nav-dropdown-panel">
              <div 
                className={`nav-dropdown-item ${activePage === 'individual-training' || activePage === 'training' ? 'active' : ''}`}
                onClick={() => handleNavClick('individual-training')}
              >
                <BookOpen size={16} color="var(--brand-gold)" />
                <div>
                  <div>{t.nav.trainingIndividual || 'Individual Training'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>Small cohorts for professionals & students</div>
                </div>
              </div>
              <div 
                className={`nav-dropdown-item ${activePage === 'institutional-training' ? 'active' : ''}`}
                onClick={() => handleNavClick('institutional-training')}
              >
                <GraduationCap size={16} color="var(--brand-maroon)" />
                <div>
                  <div>{t.nav.trainingInstitution || 'Institutional Programs'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>On-campus bootcamps & teacher AI literacy</div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
            className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
          >
            {t.nav.services}
          </a>

          <a
            href="#portfolio"
            onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }}
            className={`nav-link ${activePage === 'portfolio' ? 'active' : ''}`}
          >
            {t.nav.portfolio}
          </a>

          <a
            href="#blog"
            onClick={(e) => { e.preventDefault(); handleNavClick('blog'); }}
            className={`nav-link ${activePage === 'blog' ? 'active' : ''}`}
          >
            {t.nav.blog}
          </a>

          <a
            href="#gallery"
            onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
            className={`nav-link ${activePage === 'gallery' ? 'active' : ''}`}
          >
            {t.nav.gallery || (currentLang === 'ne' ? 'ग्यालेरी' : 'Gallery')}
          </a>

          <a
            href="#contact"
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



      {/* Mobile Drawer — full menu including Gallery */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
          <nav className="mobile-drawer" aria-label="Mobile menu">
            <button className={`mobile-drawer-link ${activePage === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>
              {t.nav.home}
            </button>

            <div>
              <button type="button" className={`mobile-drawer-link mobile-drawer-accordion ${isAboutActive ? 'active' : ''}`} onClick={() => setMobileAboutOpen(!mobileAboutOpen)}>
                <span>{t.nav.about}</span>
                <ChevronDown size={16} style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {mobileAboutOpen && (
                <div className="mobile-drawer-sub">
                  <button className={activePage === 'who-we-are' || activePage === 'about' ? 'active' : ''} onClick={() => handleNavClick('who-we-are')}>{t.nav.aboutWhoWeAre}</button>
                  <button className={activePage === 'ceo-message' ? 'active' : ''} onClick={() => handleNavClick('ceo-message')}>{t.nav.aboutCeo}</button>
                  <button className={activePage === 'team' ? 'active' : ''} onClick={() => handleNavClick('team')}>{t.nav.aboutTeam}</button>
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
                  <button className={activePage === 'individual-training' || activePage === 'training' ? 'active' : ''} onClick={() => handleNavClick('individual-training')}>{t.nav.trainingIndividual}</button>
                  <button className={activePage === 'institutional-training' ? 'active' : ''} onClick={() => handleNavClick('institutional-training')}>{t.nav.trainingInstitution}</button>
                </div>
              )}
            </div>

            <button className={`mobile-drawer-link ${activePage === 'services' ? 'active' : ''}`} onClick={() => handleNavClick('services')}>{t.nav.services}</button>
            <button className={`mobile-drawer-link ${activePage === 'portfolio' ? 'active' : ''}`} onClick={() => handleNavClick('portfolio')}>{t.nav.portfolio}</button>
            <button className={`mobile-drawer-link ${activePage === 'blog' ? 'active' : ''}`} onClick={() => handleNavClick('blog')}>{t.nav.blog}</button>
            <button className={`mobile-drawer-link ${activePage === 'gallery' ? 'active' : ''}`} onClick={() => handleNavClick('gallery')}>
              <Image size={16} />
              {t.nav.gallery}
            </button>
            <button className={`mobile-drawer-link ${activePage === 'contact' ? 'active' : ''}`} onClick={() => handleNavClick('contact')}>{t.nav.contact}</button>

            <div className="mobile-drawer-footer">
              <button type="button" className="mobile-lang-btn" onClick={toggleLanguage}>
                <Globe size={14} />
                {t.nav.languageName}
              </button>
              <div className="mobile-drawer-meta">
                {getLangText(siteSettings, 'address', currentLang) || siteSettings?.address_en || 'Bagbazar, Kathmandu 44600, Nepal'}
                <br />
                {siteSettings?.primaryPhone || '+977 1-4421098'}
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
    </header>
  );
}

