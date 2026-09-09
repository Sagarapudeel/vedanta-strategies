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
  FileText
} from 'lucide-react';

export default function Navbar({ currentLang, setLang, activePage, setActivePage, openLeadModal, siteSettings, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* Action Controls - Send Enquiry */}
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

      {/* 3. Category Strip (No Explore label) */}
      <div className="category-nav-strip">
        <div className="container category-nav-flex">
          <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Topics:</span>
          {categoryPills.map((pill) => (
            <div 
              key={pill.id} 
              className="category-item"
              onClick={() => {
                if (pill.id === 'institution') {
                  setActivePage('institutional-training');
                } else {
                  setActivePage('individual-training');
                }
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
            bottom: 0,
            background: '#ffffff',
            borderBottom: '2px solid #e2e8f0',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 9999,
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <button
            onClick={() => handleNavClick('home')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activePage === 'home' ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: activePage === 'home' ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
          >
            {t.nav.home}
          </button>

          {/* Mobile About Us Accordion */}
          <div>
            <div 
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: isAboutActive ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: isAboutActive ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
            >
              <span>{t.nav.about}</span>
              <ChevronDown size={16} style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </div>
            {mobileAboutOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', paddingTop: '8px', borderLeft: '2px solid rgba(133, 28, 44, 0.2)', marginLeft: '4px' }}>
                <span style={{ cursor: 'pointer', color: activePage === 'who-we-are' ? '#851C2C' : '#475569', fontSize: '0.92rem', fontWeight: activePage === 'who-we-are' ? '700' : '500' }} onClick={() => handleNavClick('who-we-are')}>• {t.nav.aboutWhoWeAre || 'Who We Are'}</span>
                <span style={{ cursor: 'pointer', color: activePage === 'ceo-message' ? '#851C2C' : '#475569', fontSize: '0.92rem', fontWeight: activePage === 'ceo-message' ? '700' : '500' }} onClick={() => handleNavClick('ceo-message')}>• {t.nav.aboutCeo || 'Message from CEO'}</span>
                <span style={{ cursor: 'pointer', color: activePage === 'team' ? '#851C2C' : '#475569', fontSize: '0.92rem', fontWeight: activePage === 'team' ? '700' : '500' }} onClick={() => handleNavClick('team')}>• {t.nav.aboutTeam || 'Our Team'}</span>
              </div>
            )}
          </div>

          {/* Mobile Training Accordion */}
          <div>
            <div 
              onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: isTrainingActive ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: isTrainingActive ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
            >
              <span>{t.nav.training}</span>
              <ChevronDown size={16} style={{ transform: mobileTrainingOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </div>
            {mobileTrainingOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', paddingTop: '8px', borderLeft: '2px solid rgba(197, 154, 63, 0.3)', marginLeft: '4px' }}>
                <span style={{ cursor: 'pointer', color: activePage === 'individual-training' ? '#851C2C' : '#475569', fontSize: '0.92rem', fontWeight: activePage === 'individual-training' ? '700' : '500' }} onClick={() => handleNavClick('individual-training')}>• {t.nav.trainingIndividual || 'Individual Training'}</span>
                <span style={{ cursor: 'pointer', color: activePage === 'institutional-training' ? '#851C2C' : '#475569', fontSize: '0.92rem', fontWeight: activePage === 'institutional-training' ? '700' : '500' }} onClick={() => handleNavClick('institutional-training')}>• {t.nav.trainingInstitution || 'Institutional Programs'}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('services')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activePage === 'services' ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: activePage === 'services' ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
          >
            {t.nav.services}
          </button>

          <button
            onClick={() => handleNavClick('portfolio')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activePage === 'portfolio' ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: activePage === 'portfolio' ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
          >
            {t.nav.portfolio}
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activePage === 'blog' ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: activePage === 'blog' ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
          >
            {t.nav.blog}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activePage === 'contact' ? '#851C2C' : '#1e293b', fontSize: '1.05rem', fontWeight: activePage === 'contact' ? '700' : '600', padding: '6px 0', cursor: 'pointer' }}
          >
            {t.nav.contact}
          </button>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #e2e8f0', marginTop: 'auto' }}>
            <div style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '12px' }}>
              📍 {getLangText(siteSettings, 'address', currentLang) || siteSettings?.address_en || 'Bagbazar, Kathmandu 44600, Nepal'}<br />
              📞 {siteSettings?.primaryPhone || '+977 1-4421098'}
            </div>
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

