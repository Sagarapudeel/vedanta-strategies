import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Video,
  Share2,
  CheckCircle,
  Play,
  Star,
  Clock,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  Users,
  MapPin,
  Cpu,
  GraduationCap
} from 'lucide-react';

const partnerLogos = [
  { name: "Apex Educational Group", sub: "Higher Secondary & College", badge: "AEG", color: "#172642", bg: "#e2e8f0" },
  { name: "Kathmandu Model College", sub: "Balkumari & Bagbazar", badge: "KMC", color: "#851C2C", bg: "#fce7f3" },
  { name: "Valley Tech Foundation", sub: "Skill Development Hub", badge: "VTF", color: "#0284c7", bg: "#e0f2fe" },
  { name: "Milestone International College", sub: "Balkumari, Lalitpur", badge: "MIC", color: "#b45309", bg: "#fef3c7" },
  { name: "Rural Heritage Nepal", sub: "Cultural Documentation NGO", badge: "RHN", color: "#15803d", bg: "#dcfce7" },
  { name: "Himalayan Naturals D2C", sub: "Organic Brands Nepal", badge: "HND", color: "#4f46e5", bg: "#ede9fe" },
  { name: "TechFin Innovations", sub: "Fintech & Enterprise Systems", badge: "TFI", color: "#0d9488", bg: "#ccfbf1" },
  { name: "Kathmandu Media Lab", sub: "Digital Journalism & Podcasting", badge: "KML", color: "#e11d48", bg: "#ffe4e6" }
];

export default function HomePage({
  currentLang,
  partners = [],
  courses = [],
  services = [],
  productionGallery = [],
  portfolioItems = [],
  testimonials = [],
  blogPosts = [],
  setActivePage,
  openLeadModal,
  openCourseModal
}) {
  const t = translations[currentLang] || translations.en;
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [heroSearch, setHeroSearch] = useState('');

  const effectivePartners = (partners && partners.length > 0) ? partners : partnerLogos;

  const featuredCourses = courses.filter(c => c.featured).slice(0, 3);
  const recentWork = productionGallery.slice(0, 3);
  const recentBlog = blogPosts.slice(0, 3);

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonialIdx] || testimonials[0];

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    setActivePage('training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. HERO SECTION (Mindrisers Clean Human Layout) */}
      <section className="hero-clean">
        <div className="container">
          <div className="hero-clean-grid">

            <div>
              <div className="section-badge">
                <MapPin size={13} /> {t.hero.badge}
              </div>

              <h1 className="hero-clean-h1">
                {t.hero.titleStart}
                <span style={{ color: 'var(--brand-maroon)' }}>{t.hero.titleHighlight}</span>
              </h1>

              <p className="hero-clean-p">
                {t.hero.subtitle}
              </p>

              {/* Mindrisers Search Form in Hero */}
              <form onSubmit={handleHeroSearchSubmit} className="hero-search-box">
                <Search size={18} color="#851C2C" style={{ marginRight: '8px' }} />
                <input
                  type="text"
                  placeholder={currentLang === 'ne' ? 'कुन कोर्स वा सेवा खोज्दै हुनुहुन्छ?' : 'Which course are you interested in?'}
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  {currentLang === 'ne' ? 'खोज्नुहोस्' : 'Search'}
                </button>
              </form>

              {/* Popular Tags (Mindrisers Style) */}
              <div className="popular-tags">
                <span style={{ fontWeight: '700', color: 'var(--brand-navy)' }}>Popular:</span>
                <button
                  className="popular-tag-btn"
                  onClick={() => { setActivePage('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  AI Tools for Office
                </button>
                <button
                  className="popular-tag-btn"
                  onClick={() => { setActivePage('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  Meta Ads & Marketing
                </button>
                <button
                  className="popular-tag-btn"
                  onClick={() => { setActivePage('production'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  Podcast Studio
                </button>
                <button
                  className="popular-tag-btn"
                  onClick={() => openLeadModal('institution')}
                >
                  School Workshops
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#334155', fontWeight: '500' }}>
                  <CheckCircle size={16} color="#851C2C" /> Small Batches (12–15 Students)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#334155', fontWeight: '500' }}>
                  <CheckCircle size={16} color="#851C2C" /> Putalisadak Lab & Studio
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#334155', fontWeight: '500' }}>
                  <CheckCircle size={16} color="#851C2C" /> Direct Mentor Guidance
                </div>
              </div>
            </div>

            {/* Hero Visual Card with Guarantee Seal */}
            <div className="hero-visual-card">
              <img
                src="/images/hero.jpg"
                alt="Vedanta Strategies Training Workshop in Kathmandu"
                className="hero-visual-img"
              />

              {/* Trust Badge Seal */}
              <div className="hero-guarantee-seal">
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(133, 28, 44, 0.1)', color: 'var(--brand-maroon)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--brand-navy)' }}>100% Practical & Guided</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Learn on your own laptop with real tools</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST-STAT STRIP */}
      <div className="container">
        <div className="trust-stats-bar">
          <div className="trust-stats-grid">
            <div className="stat-item">
              <div className="stat-num">{t.hero.stat1Number}</div>
              <div className="stat-title">{t.hero.stat1Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{t.hero.stat2Number}</div>
              <div className="stat-title">{t.hero.stat2Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{t.hero.stat3Number}</div>
              <div className="stat-title">{t.hero.stat3Label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{t.hero.stat4Number}</div>
              <div className="stat-title">{t.hero.stat4Label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THREE CORE PILLARS */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.pillars.badge}</span>
            <h2 className="section-title">{t.pillars.title}</h2>
            <p className="section-subtitle">{t.pillars.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>

            {/* Pillar 1: Learning */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-gold)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'var(--brand-gold-light)', color: 'var(--brand-gold)' }}>
                <BookOpen size={26} />
              </div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-gold)', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {t.pillars.p1Tag}
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '10px' }}>{t.pillars.p1Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px', flexGrow: 1 }}>{t.pillars.p1Desc}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-gold)" /> {t.pillars.p1F1}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-gold)" /> {t.pillars.p1F2}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-gold)" /> {t.pillars.p1F3}
                </li>
              </ul>

              <button
                className="btn btn-outline-gold"
                onClick={() => { setActivePage('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p1Btn}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Pillar 2: Production */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-maroon)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(133, 28, 44, 0.08)', color: 'var(--brand-maroon)' }}>
                <Video size={26} />
              </div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-maroon)', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {t.pillars.p2Tag}
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '10px' }}>{t.pillars.p2Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px', flexGrow: 1 }}>{t.pillars.p2Desc}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {t.pillars.p2F1}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {t.pillars.p2F2}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {t.pillars.p2F3}
                </li>
              </ul>

              <button
                className="btn btn-secondary"
                style={{ color: 'var(--brand-maroon)', borderColor: 'rgba(133, 28, 44, 0.3)' }}
                onClick={() => { setActivePage('production'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p2Btn}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Pillar 3: Collaboration */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-navy)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(23, 38, 66, 0.08)', color: 'var(--brand-navy)' }}>
                <Share2 size={26} />
              </div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-navy)', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {t.pillars.p3Tag}
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '10px' }}>{t.pillars.p3Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px', flexGrow: 1 }}>{t.pillars.p3Desc}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F1}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F2}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F3}
                </li>
              </ul>

              <button
                className="btn btn-navy"
                onClick={() => { setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p3Btn}</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES (Mindrisers Clean Card Layout) */}
      <section className="section-py" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.courses.badge}</span>
            <h2 className="section-title">{t.courses.title}</h2>
            <p className="section-subtitle">{t.courses.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
            {featuredCourses.map((course) => (
              <div key={course.id} className="course-card-clean">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="course-badge-category">{course.category.toUpperCase()}</span>
                  <span className="course-badge-track">
                    {course.track === 'institution' ? t.courses.trackInstitution : t.courses.trackIndividual}
                  </span>
                </div>

                <h3 className="course-title-clean">{course.title}</h3>
                <p className="course-desc-clean">{course.tagline}</p>

                <div className="course-meta-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#C59A3F" />
                    <span>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color="#851C2C" />
                    <span>{course.mentor}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="course-price-clean">
                    Rs. {course.fee?.toLocaleString()}
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal' }}> / cohort</span>
                  </div>
                  <button
                    className="btn btn-navy btn-sm"
                    onClick={() => openCourseModal(course)}
                  >
                    <span>{t.courses.viewDetails}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Free Demo Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #172642 0%, #1e3a6c 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.25rem', marginBottom: '6px' }}>
                {t.courses.freeDemoBanner}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                We conduct 60-minute practical demonstration sessions on generative AI and media literacy for school faculty and students.
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => openLeadModal('institution')}
            >
              <Sparkles size={16} />
              <span>{t.courses.freeDemoBtn}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. RECENT WORK & STUDIO PREVIEW */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.production.badge}</span>
            <h2 className="section-title">Recent Studio & Video Projects</h2>
            <p className="section-subtitle">A look at podcasts, educational videos, and documentaries shot in Kathmandu.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {recentWork.map((item) => (
              <div key={item.id} className="mindrisers-card" style={{ overflow: 'hidden' }}>
                <div className="production-thumb-wrap">
                  <img src={item.thumb} alt={item.title} className="production-thumb" />
                  <div
                    className="play-badge-overlay"
                    onClick={() => setSelectedVideo(item)}
                    title="Watch Sample"
                  >
                    <Play size={20} fill="#fff" color="#fff" />
                  </div>
                </div>
                <div className="production-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem', color: 'var(--brand-maroon)', fontWeight: '700' }}>
                    <span>{item.category}</span>
                    <span>{item.duration}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>{item.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => { setActivePage('production'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span>Explore Putalisadak Studio</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>

      {/* 6. CLIENT & PARTNER LOGO RUNNING MARQUEE STRIP */}
      <section style={{ padding: '56px 0 64px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '28px' }}>
          <div style={{ textAlign: 'center', fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
            {currentLang === 'ne' ? 'नेपालका विद्यालय, कलेज तथा संस्थाहरूको विश्वास' : 'TRUSTED BY SCHOOLS, COLLEGES & ORGANIZATIONS IN NEPAL'}
          </div>
        </div>

        {/* Continuous Running Marquee */}
        <div className="logo-marquee-wrapper">
          <div className="logo-marquee-track">
            {[...effectivePartners, ...effectivePartners].map((partner, idx) => {
              const partnerName = getLangText(partner, 'name', currentLang) || partner.name;
              const partnerSub = getLangText(partner, 'sub', currentLang) || partner.sub;
              const hasLogo = Boolean(partner.logoUrl && partner.logoUrl.trim());
              return (
                <div 
                  key={idx} 
                  className={`client-logo-item ${hasLogo ? 'has-image-logo' : ''}`}
                  title={`${partnerName} ${partnerSub ? '- ' + partnerSub : ''}`}
                  onClick={() => {
                    if (partner.website) {
                      window.open(partner.website, '_blank');
                    }
                  }}
                >
                  {hasLogo ? (
                    <img 
                      src={partner.logoUrl} 
                      alt={partnerName}
                      className="client-logo-only-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement?.querySelector('.logo-text-fallback');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <>
                      <div 
                        className="client-logo-badge" 
                        style={{ background: partner.bg || '#e2e8f0', color: partner.color || '#172642' }}
                      >
                        {partner.badge || partnerName?.slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="client-logo-text">{partnerName}</div>
                        {partnerSub && <div className="client-logo-sub">{partnerSub}</div>}
                      </div>
                    </>
                  )}

                  {/* Graceful fallback if image link is broken */}
                  {hasLogo && (
                    <div className="logo-text-fallback" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
                      <div 
                        className="client-logo-badge" 
                        style={{ background: partner.bg || '#e2e8f0', color: partner.color || '#172642' }}
                      >
                        {partner.badge || partnerName?.slice(0, 3).toUpperCase()}
                      </div>
                      <div className="client-logo-text">{partnerName}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY US (Mindrisers Pattern) */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.whyUs.badge}</span>
            <h2 className="section-title">{t.whyUs.title}</h2>
            <p className="section-subtitle">We bridge the gap between classroom theory and real-world execution.</p>
          </div>

          <div className="process-grid">
            <div className="mindrisers-card process-card">
              <div className="process-step-num">01</div>
              <h3 className="process-title" style={{ color: 'var(--brand-navy)' }}>{t.whyUs.p1Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {t.whyUs.p1Desc}
              </p>
            </div>

            <div className="mindrisers-card process-card">
              <div className="process-step-num" style={{ color: 'var(--brand-maroon)' }}>02</div>
              <h3 className="process-title" style={{ color: 'var(--brand-navy)' }}>{t.whyUs.p2Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {t.whyUs.p2Desc}
              </p>
            </div>

            <div className="mindrisers-card process-card">
              <div className="process-step-num" style={{ color: 'var(--brand-navy)' }}>03</div>
              <h3 className="process-title" style={{ color: 'var(--brand-navy)' }}>{t.whyUs.p3Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {t.whyUs.p3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section-py" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.testimonials.badge}</span>
            <h2 className="section-title">{t.testimonials.title}</h2>
            <p className="section-subtitle">{t.testimonials.subtitle}</p>
          </div>

          <div className="mindrisers-card testimonial-box">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C59A3F" color="#C59A3F" />
              ))}
            </div>

            <p className="testimonial-quote" style={{ color: 'var(--brand-navy)' }}>
              "{currentTestimonial.quote}"
            </p>

            <div className="testimonial-author" style={{ color: 'var(--brand-maroon)' }}>{currentTestimonial.author}</div>
            <div className="testimonial-role">{currentTestimonial.role}</div>

            {/* Carousel Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '24px' }}>
              <button
                onClick={prevTestimonial}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextTestimonial}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
                aria-label="Next Testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LATEST INSIGHTS & ARTICLES */}
      <section className="section-py">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">ARTICLES & GUIDES</span>
            <h2 className="section-title">Practical Guides from Our Instructors</h2>
            <p className="section-subtitle">Real tips on using AI effectively, saving advertising budget, and producing media in Nepal.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {recentBlog.map((post) => (
              <div
                key={post.id}
                className="mindrisers-card"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--brand-maroon)', fontWeight: '700', marginBottom: '10px' }}>
                  <span>{post.category}</span>
                  <span style={{ color: '#64748b', fontWeight: 'normal' }}>{post.readTime}</span>
                </div>
                <h4 style={{ fontSize: '1.18rem', color: 'var(--brand-navy)', marginBottom: '8px', lineHeight: '1.35' }}>
                  {post.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '18px', flexGrow: 1, lineHeight: '1.6' }}>
                  {post.summary}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>By {post.author}</span>
                  <button
                    onClick={() => { setActivePage('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--brand-maroon)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Read Guide ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL FRIENDLY CTA BANNER */}
      <section style={{ padding: '56px 0', background: 'linear-gradient(135deg, #172642 0%, #0f1a30 100%)', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <span className="section-badge" style={{ background: 'rgba(197, 154, 63, 0.2)', color: 'var(--brand-gold-hover)', borderColor: 'rgba(197, 154, 63, 0.4)' }}>
            VISIT OR MESSAGE US
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '14px', color: '#ffffff' }}>
            Have a question or want to visit our studio?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.02rem', marginBottom: '28px', lineHeight: '1.65' }}>
            Whether you want to join an upcoming training batch, record a podcast episode, or discuss marketing for your school or brand, you're always welcome to drop by our Putalisadak office.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => openLeadModal('general')}>
              <span>Talk to Our Team</span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span>View Office Location & Map</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-card" style={{ maxWidth: '800px', padding: '20px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>{selectedVideo.title}</h3>
              <button className="modal-close-btn" style={{ position: 'static' }} onClick={() => setSelectedVideo(null)}>✕</button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
              <iframe
                title={selectedVideo.title}
                src={selectedVideo.videoUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p style={{ marginTop: '14px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {selectedVideo.summary} (Client: {selectedVideo.client})
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
