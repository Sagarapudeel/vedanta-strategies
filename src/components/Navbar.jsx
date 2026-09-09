import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
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
  Video, 
  Cpu, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ currentLang, setLang, activePage, setActivePage, openLeadModal, siteSettings, onSearch, replayIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[currentLang] || translations.en;

  const toggleLanguage = () => {
    setLang(currentLang === 'en' ? 'ne' : 'en');
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'training', label: t.nav.training },
    { id: 'services', label: t.nav.services },
    { id: 'production', label: t.nav.production },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact }
  ];

  const categoryPills = [
    { id: 'ai', label: 'AI & Data Tools', icon: <Cpu size={14} color="#851C2C" /> },
    { id: 'marketing', label: 'Digital Marketing & Ads', icon: <Share2 size={14} color="#172642" /> },
    { id: 'production', label: 'Podcast & Video Editing', icon: <Video size={14} color="#C59A3F" /> },
    { id: 'institution', label: 'School / College Workshops', icon: <GraduationCap size={14} color="#851C2C" /> }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActivePage('training');
      if (onSearch) onSearch(searchTerm);
    }
  };

  // Hidden keyboard shortcut: Ctrl+Shift+A opens admin for internal staff
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActivePage('admin');
        window.location.hash = '#admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePage]);

  return (
    <header className="main-navbar">
      {/* 1. Top Utility Contact Bar (Mindrisers Style) */}
      <div className="top-utility-bar">
        <div className="container top-utility-flex">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} color="#C59A3F" />
              <span>{siteSettings?.primaryPhone || '01-4421098'} / {siteSettings?.mobilePhone || '+977 9801234567'}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#C59A3F" />
              <span>{siteSettings?.officialEmail || 'info@vedantastrategies.com'}</span>
            </span>
            <span className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="#C59A3F" />
              <span>Putalisadak, Kathmandu</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Sun–Fri: 9am–6pm</span>
            {replayIntro && (
              <button
                onClick={replayIntro}
                style={{ background: 'rgba(197, 154, 63, 0.15)', border: '1px solid rgba(197, 154, 63, 0.4)', color: '#C59A3F', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Watch Opening Logo Animation"
              >
                <Sparkles size={11} color="#C59A3F" />
                <span>Play Intro</span>
              </button>
            )}
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

        {/* Mindrisers Style Header Search Bar */}
        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <input
            type="text"
            placeholder={currentLang === 'ne' ? 'पाठ्यक्रम खोज्नुहोस्...' : 'Search courses, skills...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nav-search-input"
          />
          <button type="submit" style={{ background: 'none', border: 'none', color: '#851C2C', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Search size={16} />
          </button>
        </form>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls - NO ADMIN BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => openLeadModal('general')}
          >
            <span>{currentLang === 'ne' ? 'सोधपुछ गर्नुहोस्' : 'Send Enquiry'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            style={{ background: 'transparent', border: 'none', color: '#172642', cursor: 'pointer', display: 'none' }}
            className="mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 3. Category Strip (Mindrisers Pattern) */}
      <div className="category-nav-strip">
        <div className="container category-nav-flex">
          <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore:</span>
          {categoryPills.map((pill) => (
            <div 
              key={pill.id} 
              className="category-item"
              onClick={() => {
                setActivePage('training');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {pill.icon}
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '2px solid #e2e8f0',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 99,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                color: activePage === item.id ? '#851C2C' : '#1e293b',
                fontSize: '1.05rem',
                fontWeight: activePage === item.id ? '700' : '500',
                padding: '6px 0',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }} 
              onClick={() => { setMobileMenuOpen(false); openLeadModal('general'); }}
            >
              {currentLang === 'ne' ? 'सोधपुछ पठाउनुहोस्' : 'Send Enquiry'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
