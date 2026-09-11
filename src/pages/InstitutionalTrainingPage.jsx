import React, { useState, useMemo, useEffect } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Award, 
  Search,
  Calendar,
  Layers,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function InstitutionalTrainingPage({ currentLang, courses = [], openCourseModal, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Filter institutional courses
  const institutionalCourses = useMemo(() => {
    return courses.filter(c => c.track === 'institution');
  }, [courses]);

  // Extract unique categories dynamically from free-text field
  const categories = useMemo(() => {
    const set = new Set();
    institutionalCourses.forEach(c => {
      if (c.category) set.add(c.category.trim());
    });
    return ['all', ...Array.from(set)];
  }, [institutionalCourses]);

  const getCategoryLabel = (cat) => {
    if (cat === 'all') return currentLang === 'ne' ? 'सबै संस्थागत कार्यक्रम' : 'All Institutional Programs';
    if (cat.toLowerCase() === 'ai') return currentLang === 'ne' ? 'एआई तथा शिक्षक तालिम' : 'AI & Teacher Literacy';
    if (cat.toLowerCase() === 'marketing') return currentLang === 'ne' ? 'संस्थागत मार्केटिङ' : 'Institutional Growth';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const filteredCourses = useMemo(() => {
    return institutionalCourses.filter((course) => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const title = (getLangText(course, 'title', currentLang) || course.title || '').toLowerCase();
      const tagline = (getLangText(course, 'tagline', currentLang) || course.tagline || '').toLowerCase();
      const mentor = (course.mentor || '').toLowerCase();
      const cat = (course.category || '').toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || title.includes(q) || tagline.includes(q) || mentor.includes(q) || cat.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [institutionalCourses, selectedCategory, searchQuery, currentLang]);

  const institutionalPerks = [
    {
      title_en: "On-Site Delivery",
      title_ne: "तपाईंकै क्याम्पस परिसरमा",
      desc_en: "Our mentor team travels to your school or college anywhere across Nepal with complete workshop materials."
    },
    {
      title_en: "Faculty & Teacher AI Tools",
      title_ne: "शिक्षकहरूका लागि एआई सहयोग",
      desc_en: "Save 5+ hours weekly with lesson-plan generation, question paper drafting, and grading rubric aids."
    },
    {
      title_en: "Accredited Student Credentials",
      title_ne: "डिजिटल प्रमाणित प्रमाणपत्र",
      desc_en: "Each completing trainee receives an official digital verifiable certificate from Vedanta Strategies."
    },
    {
      title_en: "Free 60-Min Demo Workshop",
      title_ne: "६० मिनेटको निःशुल्क नमुना कक्षा",
      desc_en: "Test our practical pedagogy before committing to a multi-week cohort for your students or staff."
    }
  ];

  const faqs = [
    {
      q: currentLang === 'ne'
        ? "विद्यालय तथा कलेजका लागि संस्थागत तालिम कसरी सञ्चालन हुन्छ?"
        : "How do customized bootcamps work for schools and colleges?",
      a: currentLang === 'ne'
        ? "हाम्रो संस्थागत टोलीले साझेदार क्याम्पसहरूसँग समन्वय गरी २ दिनदेखि ४ हप्तासम्मका अनुकूलित बुटक्याम्पहरू सञ्चालन गर्छ। हामी कार्यशाला सामग्री, एआई प्रम्प्ट टेम्प्लेट र व्यावहारिक केस स्टडी उपलब्ध गराउँछौं।"
        : "Our institutional team designs customized 2-day to 4-week bootcamps directly inside partner institutions. We provide all workshop materials, AI sandbox environments, and faculty training manuals."
    },
    {
      q: currentLang === 'ne'
        ? "के हामीले हाम्रा शिक्षकहरूका लागि मात्र तालिम आयोजना गर्न सक्छौं?"
        : "Can we arrange training exclusively for our faculty and administration?",
      a: currentLang === 'ne'
        ? "हो! शिक्षकहरूका लागि विशेष सप्ताहन्त वा छुट्टीको समयमा एआई पाठ योजना, प्रश्नपत्र तयारी र डिजिटल कक्षा व्यवस्थापन सम्बन्धी विशेष कार्यशाला सञ्चालन गर्न सकिन्छ।"
        : "Yes! We run specialized faculty development programs focused on lesson planning with ChatGPT/Claude, assignment assessment, and student AI policy formulation."
    },
    {
      q: currentLang === 'ne'
        ? "निःशुल्क ६० मिनेटको डेमो कार्यशाला कसरी बुक गर्ने?"
        : "How do we request the free 60-minute demonstration workshop?",
      a: currentLang === 'ne'
        ? "तलको 'निःशुल्क डेमो अनुरोध गर्नुहोस्' बटनमा थिचेर आफ्नो कलेज वा विद्यालयको नाम र सम्पर्क नम्बर दिनुहोस्। हाम्रो टोलीले २४ घण्टाभित्र सम्पर्क गर्नेछ।"
        : "Simply click 'Request Free Demo Class' below, provide your school/college name, and our academic liaison will reach out to confirm a suitable date."
    }
  ];

  useEffect(() => {
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    };
    const id = 'faq-jsonld-institutional';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(faqData);
    return () => { el?.remove(); };
  }, [currentLang]);

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">


        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'संस्थागत ट्रयाक' : 'FOR SCHOOLS, COLLEGES & ORGANIZATIONS'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'विद्यालय तथा कलेजका लागि आधुनिक एआई र सीप विकास' : 'Institutional Bootcamps & Faculty Enablement'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'तपाईंकै कलेज परिसरमा प्रत्यक्ष कार्यशाला, शिक्षक एआई तालिम र विद्यार्थीहरूका लागि प्रमाणित व्यावहारिक सीप।'
              : 'Empowering faculties, administrations, and student bodies across Nepal with hands-on AI tools, media literacy, and digital capabilities.'}
          </p>
        </div>

        {/* 4 Pillars of Institutional Programs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {institutionalPerks.map((perk, idx) => (
            <div 
              key={idx} 
              className="mindrisers-card" 
              style={{ padding: '24px', borderTop: '3px solid var(--brand-navy)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle size={18} color="var(--brand-navy)" />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--brand-navy)', margin: 0, fontWeight: '700' }}>
                  {currentLang === 'ne' ? perk.title_ne : perk.title_en}
                </h4>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                {perk.desc_en}
              </p>
            </div>
          ))}
        </div>

        {/* Free Demo Banner */}
        <div 
          style={{ 
            background: '#ffffff', 
            border: '1px solid var(--border-light)',
            boxShadow: '0 1px 3px rgba(28, 47, 77, 0.05)',
            borderRadius: 'var(--radius-lg)', 
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
              60-MINUTE COMPLIMENTARY WORKSHOP
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '6px', marginBottom: '8px', color: 'var(--brand-navy)' }}>
              Book a Free Practical AI Demo for Your Faculty
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              We visit your institution to demonstrate live AI prompt templates, fact-checking workflows, and digital tools before you plan any formal cohort.
            </p>
          </div>

          <button 
            className="btn btn-primary btn-lg"
            onClick={() => openLeadModal('institution')}
          >
            <span>Request Free Demo Session</span>
          </button>
        </div>

        {/* Control Bar: Search & Free-Text Category Filter Pills */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ fontWeight: '800', color: 'var(--brand-navy)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="var(--brand-navy)" />
              <span>{currentLang === 'ne' ? 'संस्थागत कार्यक्रमहरू छान्नुहोस्' : 'Filter Institutional Tracks'}</span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder={currentLang === 'ne' ? 'संस्थागत कार्यक्रम खोज्नुहोस्...' : 'Search institutional programs...'} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  background: 'var(--bg-subtle)'
                }}
              />
            </div>
          </div>

          {/* Dynamic Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategory === cat ? '2px solid var(--brand-navy)' : '1px solid var(--border-color)',
                  background: selectedCategory === cat ? 'rgba(28, 47, 77, 0.08)' : '#ffffff',
                  color: selectedCategory === cat ? 'var(--brand-navy)' : 'var(--brand-navy)',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Course Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card-clean" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="course-badge-category">{course.category?.toUpperCase()}</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(28, 47, 77, 0.1)', color: 'var(--brand-navy)', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
                  ON-CAMPUS / LAB
                </span>
              </div>

              <h3 className="course-title-clean">{getLangText(course, 'title', currentLang) || course.title}</h3>
              <p className="course-desc-clean" style={{ flexGrow: 1 }}>{getLangText(course, 'tagline', currentLang) || course.tagline}</p>

              <div className="course-meta-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--brand-navy)" />
                  <span>{getLangText(course, 'duration', currentLang) || course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} color="#1C2F4D" />
                  <span>{course.mentor}</span>
                </div>
              </div>

              {course.mode && (
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={13} color="var(--brand-navy)" />
                  <span>{getLangText(course, 'mode', currentLang) || course.mode}</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                <div className="course-price-clean">
                  Rs. {course.fee?.toLocaleString()}
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal' }}> / cohort</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-navy btn-sm"
                    onClick={() => openCourseModal(course)}
                  >
                    <span>{t.courses.viewDetails}</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openLeadModal('institution', course.id)}
                  >
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Switcher Banner to Individual Training */}
        <div 
          style={{ 
            background: '#ffffff', 
            border: '1px solid var(--border-light)',
            boxShadow: '0 1px 3px rgba(28, 47, 77, 0.05)',
            borderRadius: 'var(--radius-lg)', 
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '64px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>
              INDIVIDUAL LEARNERS TRACK
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', marginTop: '4px', marginBottom: '6px', color: 'var(--brand-navy)' }}>
              Looking for open cohorts for yourself?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              Join upcoming small-batch cohorts (max 15) at our Bagbazar office for AI workflows, performance marketing, and video creation.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => { setActivePage('individual-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span>View Individual Training</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Institutional FAQs */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'संस्थागत जिज्ञासाहरू' : 'INSTITUTIONAL FAQS'}</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--brand-navy)', fontWeight: '800' }}>
              {currentLang === 'ne' ? 'प्रधानाध्यापक तथा व्यवस्थापनका प्रश्नहरू' : 'Frequently Asked Questions for Institutions'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="mindrisers-card" 
                style={{ padding: '20px 24px', cursor: 'pointer' }}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', color: 'var(--brand-navy)', fontSize: '1.02rem' }}>
                  <span>{faq.q}</span>
                  <ChevronDown size={18} color="var(--brand-navy)" style={{ transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
                </div>
                {expandedFaq === idx && (
                  <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65', margin: '12px 0 0 0' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
