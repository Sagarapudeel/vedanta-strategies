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
  media = {},
  setActivePage,
  openLeadModal,
  openCourseModal
}) {
  const t = translations[currentLang] || translations.en;
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');

  const effectivePartners = (partners && partners.length > 0) ? partners : partnerLogos;

  const featuredCourses = courses.filter(c => c.featured).slice(0, 3);
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
    setActivePage('individual-training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. HERO — Premium dark navy, photo right, bold heading */}
      <section style={{
        background: 'linear-gradient(135deg, #0f1f3d 0%, #172642 60%, #1a2d4a 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '72px 0 80px 0',
      }}>
        {/* Subtle dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        {/* Gold accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #C59A3F, #e8b84b, #C59A3F)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* LEFT — Text */}
          <div>
            {/* Location pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C59A3F', background: 'rgba(197,154,63,0.12)', border: '1px solid rgba(197,154,63,0.3)', padding: '5px 14px', borderRadius: '100px' }}>
              <MapPin size={11} /> {t.hero.badge}
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '3.4rem', fontWeight: '800', lineHeight: 1.08, color: '#ffffff', marginBottom: '20px', letterSpacing: '-0.03em' }}>
              {t.hero.titleStart}
              <span style={{ color: '#C59A3F', display: 'block' }}>{t.hero.titleHighlight}</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' }}>
              {t.hero.subtitle}
            </p>

            {/* Horizontal mini-stats */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '40px', borderLeft: '2px solid rgba(197,154,63,0.4)' }}>
              {[
                { num: '120+', label: 'Batches Run' },
                { num: '15,000+', label: 'Students Trained' },
                { num: '6 Yrs', label: 'In Kathmandu' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '0 24px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#C59A3F', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => openLeadModal('training')}
                style={{ padding: '14px 32px', fontSize: '0.97rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #C59A3F, #e8b84b)', color: '#0f1f3d', border: 'none', borderRadius: '7px', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 20px rgba(197,154,63,0.35)', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(197,154,63,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(197,154,63,0.35)'; }}
              >
                {currentLang === 'ne' ? 'सिट बुक गर्नुहोस्' : 'Book Your Seat →'}
              </button>
              <button
                onClick={() => { setActivePage('individual-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ padding: '14px 28px', fontSize: '0.97rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '7px', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {currentLang === 'ne' ? 'पाठ्यक्रमहरू' : 'View Courses'}
              </button>
            </div>
          </div>

          {/* RIGHT — Photo Card */}
          <div style={{ position: 'relative' }}>
            {/* Decorative gold ring */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '140px', height: '140px', borderRadius: '50%', border: '2px solid rgba(197,154,63,0.2)', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(197,154,63,0.15)', zIndex: 0 }} />

            {/* Photo */}
            <div style={{ position: 'relative', zIndex: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
              <img
                src={media?.heroImage || "/images/hero.jpg"}
                alt={media?.heroImageAlt || "Vedanta Strategies Training Workshop"}
                style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              />
              {/* Subtle top scrim */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,31,61,0.15) 0%, transparent 40%)' }} />
            </div>

            {/* Floating "Next Batch" badge */}
            <div style={{ position: 'absolute', bottom: '-18px', left: '-18px', zIndex: 2, background: '#ffffff', borderRadius: '12px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 28px rgba(0,0,0,0.2)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(133,28,44,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={18} color="#851C2C" />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.8rem', color: '#172642' }}>Next Batch — October</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1px' }}>Limited seats available</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST-STAT STRIP — full-bleed dark navy */}
      <div className="trust-stats-bar">
        <div className="container">
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
      <section className="section-py" style={{ background: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">
              <span className="section-label-num">01</span>
              <div className="section-label-line"></div>
              <span className="section-label-text">{t.pillars.badge}</span>
            </div>
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
                onClick={() => { setActivePage('individual-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p1Btn}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Pillar 2: Institutional Programs */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-maroon)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(133, 28, 44, 0.08)', color: 'var(--brand-maroon)' }}>
                <GraduationCap size={26} />
              </div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-maroon)', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {currentLang === 'ne' ? 'संस्थागत कार्यक्रम' : 'INSTITUTIONAL TRACK'}
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '10px' }}>
                {currentLang === 'ne' ? '२. विद्यालय तथा कलेज बुटक्याम्प' : '2. Institutional Bootcamps'}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px', flexGrow: 1 }}>
                {currentLang === 'ne' 
                  ? 'शिक्षक तथा विद्यार्थीहरूका लागि प्रयोगात्मक एआई, तथ्य-जाँच र अनलाइन सुरक्षा कार्यशाला।' 
                  : 'Customized AI tools, media literacy, and digital safety workshops designed for campuses and faculties across Nepal.'}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {currentLang === 'ne' ? 'तपाईंकै कलेज वा विद्यालय परिसरमा' : 'On-campus workshops or hybrid cohorts'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {currentLang === 'ne' ? 'शिक्षकहरूका लागि एआई पाठयोजना अभ्यास' : 'Teacher prompt templates & curriculum aids'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="var(--brand-maroon)" /> {currentLang === 'ne' ? 'प्रमाणित वेदान्त संस्थागत प्रमाणपत्र' : 'Verified digital credentialing for trainees'}
                </li>
              </ul>

              <button
                className="btn btn-secondary"
                style={{ color: 'var(--brand-maroon)', borderColor: 'rgba(133, 28, 44, 0.3)' }}
                onClick={() => { setActivePage('institutional-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{currentLang === 'ne' ? 'संस्थागत कार्यक्रम हेर्नुहोस्' : 'View Institutional Programs'}</span>
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
            <div className="section-label">
              <span className="section-label-num">02</span>
              <div className="section-label-line"></div>
              <span className="section-label-text">{t.courses.badge}</span>
            </div>
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

      {/* 8. TESTIMONIALS — Premium dark section */}
      <section style={{ background: 'linear-gradient(135deg, #0f1f3d 0%, #172642 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Dot texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Gold top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, #C59A3F, transparent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C59A3F', background: 'rgba(197,154,63,0.12)', border: '1px solid rgba(197,154,63,0.25)', padding: '5px 14px', borderRadius: '100px' }}>
              ★ {t.testimonials.badge}
            </div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.2rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              {t.testimonials.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.98rem', maxWidth: '480px', margin: '0 auto' }}>
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [
              { id: 't1', author: 'Priya Shrestha', role: 'Digital Marketing Executive', quote_en: 'The AI tools training completely changed how I work. I can now automate tasks that used to take hours. The instructors at Vedanta are genuinely experienced and patient.', quote_ne: 'AI टूल्सको तालिमले मेरो काम गर्ने तरिका पूरै बदल्यो।' },
              { id: 't2', author: 'Rohan Magar', role: 'School Teacher, Bagbazar', quote_en: 'The school faculty workshop opened my eyes to how AI can be used in teaching. I now use it daily for lesson planning. Highly recommended for all educators.', quote_ne: 'शिक्षक कार्यशालाले मलाई AI को नयाँ संसार देखायो।' },
              { id: 't3', author: 'Sita Gurung', role: 'E-commerce Entrepreneur', quote_en: 'After completing the Meta Ads course I was able to run profitable campaigns for my online store. The practical approach — bringing real dashboards into the class — is something you don\'t get anywhere else.', quote_ne: 'Meta Ads कोर्स पछि मेरो व्यापार धेरै बढ्यो।' },
            ]).map((testimonial, i) => {
              const quote = currentLang === 'ne' ? testimonial.quote_ne || testimonial.quote_en || testimonial.quote : testimonial.quote_en || testimonial.quote;
              const role = currentLang === 'ne' ? testimonial.role_ne || testimonial.role : testimonial.role_en || testimonial.role;
              const initials = testimonial.author?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              const accentColors = ['#C59A3F', '#851C2C', '#4f87c5'];
              return (
                <div key={testimonial.id || i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '20px', backdropFilter: 'blur(4px)', transition: 'background 0.2s, transform 0.2s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {/* Big decorative quote mark */}
                  <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '5rem', lineHeight: 1, color: accentColors[i % 3], opacity: 0.18, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, si) => <Star key={si} size={15} fill="#C59A3F" color="#C59A3F" />)}
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, fontStyle: 'italic', flex: 1 }}>
                    "{quote}"
                  </p>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: accentColors[i % 3], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', color: '#0f1f3d', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#ffffff' }}>{testimonial.author}</div>
                      <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot navigation */}
          {testimonials.length > 3 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonialIdx(i)}
                  style={{ width: i === activeTestimonialIdx ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === activeTestimonialIdx ? '#C59A3F' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }} />
              ))}
            </div>
          )}
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
            {currentLang === 'ne' ? 'सोधपुछ गर्न वा हाम्रो कार्यालय आउन चाहनुहुन्छ?' : 'Have a question or want to visit our campus?'}
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.02rem', marginBottom: '28px', lineHeight: '1.65' }}>
            {currentLang === 'ne'
              ? 'आगामी तालिम ब्याच, संस्थागत कार्यशाला वा डिजिटल मार्केटिङ परामर्शका लागि तपाईंलाई हाम्रो बागबजार कार्यालयमा हार्दिक स्वागत छ।'
              : 'Whether you want to join an upcoming training cohort, discuss customized institutional workshops, or grow your business, you are always welcome to drop by our Bagbazar campus.'}
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

    </div>
  );
}
