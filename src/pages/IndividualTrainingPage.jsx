import React, { useState, useMemo, useEffect } from 'react';
import { translations } from '../translations';
import { getLangText, getLangArray } from '../utils/langHelper';
import { 
  Search, 
  Clock, 
  Award, 
  MapPin, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function IndividualTrainingPage({ currentLang, courses = [], openCourseModal, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Filter individual track courses
  const individualCourses = useMemo(() => {
    return courses.filter(c => !c.track || c.track === 'individual');
  }, [courses]);

  // Extract unique categories dynamically from free-text field
  const categories = useMemo(() => {
    const set = new Set();
    individualCourses.forEach(c => {
      if (c.category) set.add(c.category.trim());
    });
    return ['all', ...Array.from(set)];
  }, [individualCourses]);

  const getCategoryLabel = (cat) => {
    if (cat === 'all') return currentLang === 'ne' ? 'सबै व्यक्तिगत तालिमहरू' : 'All Categories';
    if (cat.toLowerCase() === 'ai') return currentLang === 'ne' ? 'एआई तथा उत्पादकत्व' : 'AI & Automation';
    if (cat.toLowerCase() === 'marketing') return currentLang === 'ne' ? 'डिजिटल मार्केटिङ' : 'Digital Marketing';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const filteredCourses = useMemo(() => {
    return individualCourses.filter((course) => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const title = (getLangText(course, 'title', currentLang) || course.title || '').toLowerCase();
      const tagline = (getLangText(course, 'tagline', currentLang) || course.tagline || '').toLowerCase();
      const mentor = (course.mentor || '').toLowerCase();
      const cat = (course.category || '').toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || title.includes(q) || tagline.includes(q) || mentor.includes(q) || cat.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [individualCourses, selectedCategory, searchQuery, currentLang]);

  const faqs = [
    {
      q: currentLang === 'ne' 
        ? "के तालिम कार्यक्रमहरू काठमाडौंको बागबजार क्याम्पसमा उपलब्ध छन्?"
        : "Are classes conducted physically at Bagbazar or online?",
      a: currentLang === 'ne'
        ? "हामी दुवै माध्यम उपलब्ध गराउँछौं! हाम्रा तालिमहरू काठमाडौंको बागबजारस्थित भौतिक कम्प्युटर ल्याबमा सञ्चालन हुन्छन्, साथै उपत्यका बाहिरका विद्यार्थीका लागि प्रत्यक्ष अनलाइन प्रसारण पनि उपलब्ध छ।"
        : "We offer both! Trainees can attend physical hands-on sessions at our Bagbazar office computer lab, or join live interactive online streams with screen-share guidance."
    },
    {
      q: currentLang === 'ne'
        ? "के मैले आफ्नै ल्यापटप लिएर आउनुपर्छ?"
        : "Do I need to bring my own laptop?",
      a: currentLang === 'ne'
        ? "हो, हामी आफ्नै ल्यापटपमा प्रत्यक्ष अभ्यास गराउन सिफारिस गर्छौं ताकि कक्षा सकिएपछि पनि तपाईंले आफ्नै मेसिनमा काम निरन्तर गर्न सक्नुहोस्। हाम्रो ल्याबमा उच्च गतिको वाइफाइ र चार्जिङ सुविधा छ।"
        : "Yes, we strongly recommend learning on your own laptop so every workflow, shortcut, and custom setup remains ready for your daily work."
    },
    {
      q: currentLang === 'ne'
        ? "के कोर्स पूरा गरेपछि प्रमाणपत्र पाइन्छ?"
        : "Do trainees receive verified certificates?",
      a: currentLang === 'ne'
        ? "हो। अन्तिम प्रयोगात्मक परियोजना (क्यापस्टोन) सम्पन्न गर्ने प्रशिक्षार्थीहरूले डिजिटल प्रमाणीकरण कोडसहितको आधिकारिक वेदान्त प्रमाणपत्र प्राप्त गर्छन्।"
        : "Yes. Trainees who complete the required hands-on capstone project receive an accredited certificate from Vedanta Strategies with digital verification."
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
    const id = 'faq-jsonld-individual';
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
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'व्यक्तिगत ट्रयाक' : 'FOR INDIVIDUALS & PROFESSIONALS'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'व्यावहारिक एआई, मार्केटिङ तथा डिजिटल सीप' : 'Practical Courses Designed for Real Work'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'किताबी कुरा होइन, आफ्नै ल्यापटपमा वास्तविक परियोजना र सफ्टवेयर चलाएर प्रत्यक्ष सिकाइ। ब्याचमा अधिकतम १५ जना मात्र।'
              : 'Zero outdated theory. Every cohort is capped at 15 learners with personalized mentor guidance and practical laptop assignments.'}
          </p>
        </div>

        {/* Control Bar: Search & Free-Text Category Filter Pills */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ fontWeight: '800', color: 'var(--brand-navy)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--brand-navy)" />
              <span>{currentLang === 'ne' ? 'विषयअनुसार छान्नुहोस्' : 'Filter by Category'}</span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
              <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder={currentLang === 'ne' ? 'पाठ्यक्रम खोज्नुहोस्...' : 'Search individual courses...'} 
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

        {/* Course Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card-clean" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="course-badge-category">{course.category?.toUpperCase()}</span>
                {course.featured && (
                  <span style={{ fontSize: '0.72rem', background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
                    FEATURED
                  </span>
                )}
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

              {course.nextBatch && (
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} color="var(--brand-navy)" />
                  <span>{getLangText(course, 'nextBatch', currentLang) || course.nextBatch}</span>
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
                    onClick={() => openLeadModal('training', course.id)}
                  >
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner to Switch to Institutional Programs */}
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
              CAMPUS & FACULTY TRACK
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', marginTop: '4px', marginBottom: '6px', color: 'var(--brand-navy)' }}>
              Looking for workshops for your School or College?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              We conduct customized AI bootcamps, teacher prompt development, and student credentialing directly at your institution.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => { setActivePage('institutional-training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span>View Institutional Programs</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'प्रायः सोधिने प्रश्नहरू' : 'TRAINING FAQS'}</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--brand-navy)', fontWeight: '800' }}>
              {currentLang === 'ne' ? 'विद्यार्थीहरूका जिज्ञासाहरू' : 'Frequently Asked Questions'}
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
