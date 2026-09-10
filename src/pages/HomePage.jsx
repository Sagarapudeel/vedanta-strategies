import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { pathForPage } from '../lib/seoConfig';
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
  Cpu,
  GraduationCap
} from 'lucide-react';

const partnerLogos = [
  { name: "Apex Educational Group", sub: "Higher Secondary & College", badge: "AEG", color: "#1C2F4D", bg: "#e2e8f0" },
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
      {/* 1. HERO — Deerwalk photo-backed hero with dark overlay */}
      <section
        className="hero-dark"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(28, 47, 77, 0.84) 0%, rgba(28, 47, 77, 0.68) 100%), url("${media?.heroImage || "/images/hero.jpg"}")` }}
      >
        {/* Subtle dot grid texture */}
        <div className="hero-dark-dot-grid" />
        {/* Gold accent line top */}
        <div className="hero-dark-gold-line" />

        <div className="hero-grid">

          {/* LEFT — Text */}
          <div>
            {/* Heading */}
            <h1 className="hero-heading">
              {t.hero.titleStart}
              <span className="hero-heading-gold">{t.hero.titleHighlight}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>

            {/* Horizontal mini-stats */}
            <div className="hero-mini-stats">
              {[
                { num: '120+', label: 'Batches Run' },
                { num: '15,000+', label: 'Students Trained' },
                { num: '6 Yrs', label: 'In Kathmandu' },
              ].map((s, i) => (
                <div key={i} className="hero-mini-stat">
                  <div className="hero-mini-stat-num">{s.num}</div>
                  <div className="hero-mini-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-cta-group">
              <button
                onClick={() => openLeadModal('training')}
                className="btn-hero-gold"
              >
                {currentLang === 'ne' ? 'सिट बुक गर्नुहोस्' : 'Book Your Seat →'}
              </button>
              <a
                href={pathForPage('individual-training')}
                onClick={(e) => { e.preventDefault(); setActivePage('individual-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-hero-outline"
              >
                {currentLang === 'ne' ? 'पाठ्यक्रमहरू' : 'View Courses'}
              </a>
            </div>
          </div>

          {/* RIGHT — Photo Card */}
          <div className="hero-photo-wrap">
            {/* Decorative gold ring */}
            <div className="hero-photo-deco-ring-1" />
            <div className="hero-photo-deco-ring-2" />

            {/* Photo */}
            <div className="hero-photo-inner">
              <img
                src={media?.heroImage || "/images/hero.jpg"}
                alt={media?.heroImageAlt || "Vedanta Strategies Training Workshop"}
                className="hero-photo-img"
              />
              {/* Subtle top scrim */}
              <div className="hero-photo-scrim" />
            </div>

            {/* Floating "Next Batch" badge */}
            <div className="hero-floating-badge">
              <div className="hero-floating-badge-icon">
                <Award size={18} color="#1C2F4D" />
              </div>
              <div>
                <div className="hero-floating-badge-title">Next Batch — October</div>
                <div className="hero-floating-badge-sub">Limited seats available</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THREE CORE PILLARS */}
      <section className="section-py section-light-bg">
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

          <div className="pillars-grid">

            {/* Pillar 1: Learning */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-navy)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)' }}>
                <BookOpen size={26} />
              </div>
              <span className="pillar-card-tag">
                {t.pillars.p1Tag}
              </span>
              <h3 className="pillar-card-heading">{t.pillars.p1Title}</h3>
              <p className="pillar-card-desc">{t.pillars.p1Desc}</p>

              <ul className="pillar-card-list">
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p1F1}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p1F2}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p1F3}
                </li>
              </ul>

              <a
                href={pathForPage('individual-training')}
                className="btn btn-outline-gold"
                onClick={(e) => { e.preventDefault(); setActivePage('individual-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p1Btn}</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Pillar 2: Institutional Programs */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-navy)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)' }}>
                <GraduationCap size={26} />
              </div>
              <span className="pillar-card-tag">
                {currentLang === 'ne' ? 'संस्थागत कार्यक्रम' : 'INSTITUTIONAL TRACK'}
              </span>
              <h3 className="pillar-card-heading">
                {currentLang === 'ne' ? '२. विद्यालय तथा कलेज बुटक्याम्प' : '2. Institutional Bootcamps'}
              </h3>
              <p className="pillar-card-desc">
                {currentLang === 'ne' 
                  ? 'शिक्षक तथा विद्यार्थीहरूका लागि प्रयोगात्मक एआई, तथ्य-जाँच र अनलाइन सुरक्षा कार्यशाला।' 
                  : 'Customized AI tools, media literacy, and digital safety workshops designed for campuses and faculties across Nepal.'}
              </p>

              <ul className="pillar-card-list">
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {currentLang === 'ne' ? 'तपाईंकै कलेज वा विद्यालय परिसरमा' : 'On-campus workshops or hybrid cohorts'}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {currentLang === 'ne' ? 'शिक्षकहरूका लागि एआई पाठयोजना अभ्यास' : 'Teacher prompt templates & curriculum aids'}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {currentLang === 'ne' ? 'प्रमाणित वेदान्त संस्थागत प्रमाणपत्र' : 'Verified digital credentialing for trainees'}
                </li>
              </ul>

              <a
                href={pathForPage('institutional-training')}
                className="btn btn-secondary"
                style={{ color: 'var(--brand-navy)', borderColor: 'rgba(28, 47, 77, 0.3)' }}
                onClick={(e) => { e.preventDefault(); setActivePage('institutional-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{currentLang === 'ne' ? 'संस्थागत कार्यक्रम हेर्नुहोस्' : 'View Institutional Programs'}</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Pillar 3: Collaboration */}
            <div className="pillar-card-clean" style={{ borderTop: '4px solid var(--brand-navy)' }}>
              <div className="pillar-icon-wrap" style={{ background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)' }}>
                <Share2 size={26} />
              </div>
              <span className="pillar-card-tag">
                {t.pillars.p3Tag}
              </span>
              <h3 className="pillar-card-heading">{t.pillars.p3Title}</h3>
              <p className="pillar-card-desc">{t.pillars.p3Desc}</p>

              <ul className="pillar-card-list">
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F1}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F2}
                </li>
                <li>
                  <CheckCircle size={15} color="var(--brand-navy)" /> {t.pillars.p3F3}
                </li>
              </ul>

              <a
                href={pathForPage('services')}
                className="btn btn-navy"
                onClick={(e) => { e.preventDefault(); setActivePage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span>{t.pillars.p3Btn}</span>
                <ArrowRight size={15} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES (Mindrisers Clean Card Layout) */}
      <section className="section-py">
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

          <div className="pillars-grid">
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
                    <Clock size={14} color="var(--brand-navy)" />
                    <span>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color="#1C2F4D" />
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
          <div className="cta-banner">
            <div>
              <div className="cta-banner-heading">
                {t.courses.freeDemoBanner}
              </div>
              <div className="cta-banner-desc">
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
      <section className="partner-strip-section">
        <div className="container" style={{ marginBottom: '28px' }}>
          <div className="partner-strip-title">
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
                        style={{ background: partner.bg || '#e2e8f0', color: partner.color || '#1C2F4D' }}
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
                        style={{ background: partner.bg || '#e2e8f0', color: partner.color || '#1C2F4D' }}
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
              <div className="process-step-num" style={{ color: 'var(--brand-navy)' }}>02</div>
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
      <section className="testimonials-section">
        {/* Dot texture */}
        <div className="testimonials-section-dot-grid" />
        {/* Gold top accent */}
        <div className="testimonials-section-gold-line" />

        <div className="container">
          {/* Header */}
          <div className="testimonials-header">
            <div className="hero-badge-location">
              ★ {t.testimonials.badge}
            </div>
            <h2 className="testimonials-header-title">
              {t.testimonials.title}
            </h2>
            <p className="testimonials-header-subtitle">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="testimonials-grid">
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [
              { id: 't1', author: 'Priya Shrestha', role: 'Digital Marketing Executive', quote_en: 'The AI tools training completely changed how I work. I can now automate tasks that used to take hours. The instructors at Vedanta are genuinely experienced and patient.', quote_ne: 'AI टूल्सको तालिमले मेरो काम गर्ने तरिका पूरै बदल्यो।' },
              { id: 't2', author: 'Rohan Magar', role: 'School Teacher, Bagbazar', quote_en: 'The school faculty workshop opened my eyes to how AI can be used in teaching. I now use it daily for lesson planning. Highly recommended for all educators.', quote_ne: 'शिक्षक कार्यशालाले मलाई AI को नयाँ संसार देखायो।' },
              { id: 't3', author: 'Sita Gurung', role: 'E-commerce Entrepreneur', quote_en: 'After completing the Meta Ads course I was able to run profitable campaigns for my online store. The practical approach — bringing real dashboards into the class — is something you don\'t get anywhere else.', quote_ne: 'Meta Ads कोर्स पछि मेरो व्यापार धेरै बढ्यो।' },
            ]).map((testimonial, i) => {
              const quote = currentLang === 'ne' ? testimonial.quote_ne || testimonial.quote_en || testimonial.quote : testimonial.quote_en || testimonial.quote;
              const role = currentLang === 'ne' ? testimonial.role_ne || testimonial.role : testimonial.role_en || testimonial.role;
              const initials = testimonial.author?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              const accentColors = ['#1C2F4D', '#711B1F', '#B68A28'];
              return (
                <div key={testimonial.id || i} className="testimonial-card-dark">
                  {/* Big decorative quote mark */}
                  <div className="testimonial-quote-mark">"</div>

                  {/* Portrait */}
                  <div className="testimonial-photo" style={{ background: accentColors[i % 3] }}>
                    {testimonial.photo ? (
                      <img src={testimonial.photo} alt={testimonial.author} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      initials
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, si) => <Star key={si} size={15} fill="var(--brand-navy)" color="var(--brand-navy)" />)}
                  </div>

                  {/* Quote */}
                  <p className="testimonial-quote-text">
                    "{quote}"
                  </p>

                  {/* Author */}
                  <div className="testimonial-author-bar">
                    <div className="testimonial-author-name">{testimonial.author}</div>
                    <div className="testimonial-author-role">{role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot navigation */}
          {testimonials.length > 3 && (
            <div className="testimonial-dot-nav">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonialIdx(i)}
                  className={`testimonial-dot ${i === activeTestimonialIdx ? 'active' : ''}`} />
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

          <div className="pillars-grid">
            {recentBlog.map((post) => (
              <div
                key={post.id}
                className="blog-preview-card"
              >
                <div className="blog-preview-meta">
                  <span>{post.category}</span>
                  <span style={{ color: '#64748b', fontWeight: 'normal' }}>{post.readTime}</span>
                </div>
                <h4 className="blog-preview-title">
                  {post.title}
                </h4>
                <p className="blog-preview-summary">
                  {post.summary}
                </p>
                <div className="blog-preview-footer">
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>By {post.author}</span>
                  <a
                    href={pathForPage('blog')}
                    onClick={(e) => { e.preventDefault(); setActivePage('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--brand-navy)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                  >
                    Read Guide ›
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL FRIENDLY CTA BANNER */}
      <section className="hero-cta-section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <span className="hero-badge-location">
            VISIT OR MESSAGE US
          </span>
          <h2 className="hero-cta-section-heading">
            {currentLang === 'ne' ? 'सोधपुछ गर्न वा हाम्रो कार्यालय आउन चाहनुहुन्छ?' : 'Have a question or want to visit our campus?'}
          </h2>
          <p className="hero-cta-section-desc">
            {currentLang === 'ne'
              ? 'आगामी तालिम ब्याच, संस्थागत कार्यशाला वा डिजिटल मार्केटिङ परामर्शका लागि तपाईंलाई हाम्रो बागबजार कार्यालयमा हार्दिक स्वागत छ।'
              : 'Whether you want to join an upcoming training cohort, discuss customized institutional workshops, or grow your business, you are always welcome to drop by our Bagbazar campus.'}
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-primary btn-lg" onClick={() => openLeadModal('general')}>
              <span>Talk to Our Team</span>
            </button>
            <a href={pathForPage('contact')} className="btn btn-secondary btn-lg" onClick={(e) => { e.preventDefault(); setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span>View Office Location & Map</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
