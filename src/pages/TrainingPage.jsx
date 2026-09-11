import React, { useState, useMemo } from 'react';
import { translations } from '../translations';
import { getLangText, getLangArray } from '../utils/langHelper';
import { 
  Search, 
  Clock, 
  Award, 
  MapPin, 
  CheckCircle, 
  Users, 
  Building2, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function TrainingPage({ currentLang, courses = [], openCourseModal, openLeadModal }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Counts for each track
  const individualCount = useMemo(() => courses.filter(c => c.track === 'individual').length, [courses]);
  const institutionCount = useMemo(() => courses.filter(c => c.track === 'institution').length, [courses]);

  // Dynamically extract unique categories from courses based on track
  const dynamicCategories = useMemo(() => {
    const trackCourses = courses.filter(c => selectedTrack === 'all' || c.track === selectedTrack);
    const set = new Set();
    trackCourses.forEach(c => {
      if (c.category) set.add(c.category.trim());
    });
    return ['all', ...Array.from(set)];
  }, [courses, selectedTrack]);

  // Category display label helper
  const getCategoryLabel = (cat) => {
    if (cat === 'all') return t.courses.filterAll || (currentLang === 'ne' ? 'सबै तालिमहरू' : 'All Categories');
    if (cat.toLowerCase() === 'ai') return currentLang === 'ne' ? 'एआई तथा उत्पादकत्व' : 'AI & Automation';
    if (cat.toLowerCase() === 'marketing') return currentLang === 'ne' ? 'डिजिटल मार्केटिङ' : 'Digital Marketing';
    if (cat.toLowerCase() === 'production') return currentLang === 'ne' ? 'भिडियो तथा कन्टेन्ट' : 'Video & Creative';
    // Free text category entered by admin
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Helper to extract curriculum modules safely as array
  const getCurriculumModules = (course) => {
    const arr = getLangArray(course, 'curriculum', currentLang);
    if (arr && arr.length > 0) return arr;
    const raw = currentLang === 'ne'
      ? (course.curriculum_ne || course.curriculum_en || course.curriculum)
      : (course.curriculum_en || course.curriculum);
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (typeof raw === 'string') {
      return raw.split('\n').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  // Filtered courses based on track, dynamic category, and search query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      
      const titleText = (getLangText(course, 'title', currentLang) || course.title || '').toLowerCase();
      const taglineText = (getLangText(course, 'tagline', currentLang) || course.tagline || '').toLowerCase();
      const titleEn = (course.title_en || course.title || '').toLowerCase();
      const taglineEn = (course.tagline_en || course.tagline || '').toLowerCase();
      const mentor = (course.mentor || '').toLowerCase();
      const categoryText = (course.category || '').toLowerCase();
      
      const modules = getCurriculumModules(course).join(' ').toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      
      const matchesSearch = !query || 
        titleText.includes(query) ||
        taglineText.includes(query) ||
        titleEn.includes(query) ||
        taglineEn.includes(query) ||
        mentor.includes(query) ||
        categoryText.includes(query) ||
        modules.includes(query);

      return matchesTrack && matchesCategory && matchesSearch;
    });
  }, [courses, selectedTrack, selectedCategory, searchQuery, currentLang]);

  const faqs = [
    {
      q: currentLang === 'ne' 
        ? "के तालिम कार्यक्रमहरू अनलाइन वा काठमाडौंको बागबजार क्याम्पसमा उपलब्ध छन्?"
        : "Are the training programs available online or physical in Kathmandu?",
      a: currentLang === 'ne'
        ? "हामी दुवै माध्यम उपलब्ध गराउँछौं! हाम्रा धेरैजसो कोर्सहरू हाइब्रिड संरचनामा आधारित छन्: काठमाडौंको बागबजारस्थित हाम्रो क्याम्पसमा प्रयोगात्मक ल्याब अभ्यास, साथै उपत्यका बाहिरका विद्यार्थीका लागि प्रत्यक्ष अनलाइन प्रसारण र रेकर्डिङ।"
        : "We offer both! Most courses feature a hybrid structure: physical studio sessions at our Bagbazar campus in Kathmandu, accompanied by live HD online streaming and recorded access for students outside the Valley."
    },
    {
      q: currentLang === 'ne'
        ? "विद्यालय तथा कलेजका लागि संस्थागत ट्रयाक कसरी सञ्चालन हुन्छ?"
        : "How does the 'For Schools & Colleges' institution track work?",
      a: currentLang === 'ne'
        ? "हाम्रो संस्थागत टोलीले साझेदार क्याम्पसहरूमा २ दिनदेखि ४ हप्तासम्मका अनुकूलित बुटक्याम्पहरू सञ्चालन गर्छ। हामी सम्पूर्ण कार्यशाला सामग्री, एआई अभ्यास वातावरण र शिक्षक प्रशिक्षण गाइड उपलब्ध गराउँछौं।"
        : "Our institutional team designs customized 2-day to 4-week bootcamps directly inside partner campuses. We provide all workshop materials, AI sandbox environments, and faculty training manuals."
    },
    {
      q: currentLang === 'ne'
        ? "के प्रशिक्षार्थीहरूले कोर्स पूरा गरेपछि प्रमाणपत्र पाउँछन्?"
        : "Do trainees receive certification upon completion?",
      a: currentLang === 'ne'
        ? "हो। व्यावहारिक परियोजना (क्यापस्टोन प्रोजेक्ट) सफलतापूर्वक सम्पन्न गर्ने प्रशिक्षार्थीहरूले वेदान्त स्ट्राटेजिजबाट प्रमाणित र डिजिटल कोडसहितको आधिकारिक प्रमाणपत्र प्राप्त गर्छन्।"
        : "Yes. Trainees who complete the required hands-on capstone project receive a verified certificate from Vedanta Strategies, validated with a digital verification code."
    },
    {
      q: currentLang === 'ne'
        ? "एआई तथा प्रम्प्ट इन्जिनियरिङ कोर्सका लागि के पूर्व-योग्यता चाहिन्छ?"
        : "What prerequisites are needed for the AI & Prompt Engineering course?",
      a: currentLang === 'ne'
        ? "आधारभूत कम्प्युटर चलाउन जान्नु र सिक्ने इच्छा भए पुग्छ। हामी आधारभूत तहबाटै सिकाउँदै कस्टम जीपिटी, मल्टिमोडल टूल्स र एपीआई अटोमेसनसम्म पुग्छौं।"
        : "Basic computer familiarity and a curious mindset. We teach the fundamentals from scratch before advancing to custom GPTs, multimodal generators, and API workflow automation."
    }
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <span className="section-badge">{t.courses.badge}</span>
          <h1 className="section-title">{t.courses.title}</h1>
          <p className="section-subtitle">{t.courses.subtitle}</p>
        </div>

        {/* Top Control Bar: Dual Track Switcher & Search */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
          
          {/* Row 1: Dual Track Switcher & Search Input */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            
            {/* Primary Track Switcher Tabs (Individual vs Institution vs All) */}
            <div className="tracks-nav-bar">
              <button
                onClick={() => {
                  setSelectedTrack('all');
                  setSelectedCategory('all');
                }}
                className={`track-nav-btn ${selectedTrack === 'all' ? 'active' : ''}`}
              >
                <Layers size={16} />
                <span>{t.courses.allTracksLabel || (currentLang === 'ne' ? 'सबै ट्रयाक' : 'All Tracks')}</span>
                <span className="track-count-badge">{courses.length}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedTrack('individual');
                  setSelectedCategory('all');
                }}
                className={`track-nav-btn ${selectedTrack === 'individual' ? 'active' : ''}`}
              >
                <Users size={16} />
                <span>{t.courses.trackIndividual || (currentLang === 'ne' ? 'व्यक्तिगत ट्रयाक' : 'Individual Track')}</span>
                <span className="track-count-badge">{individualCount}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedTrack('institution');
                  setSelectedCategory('all');
                }}
                className={`track-nav-btn ${selectedTrack === 'institution' ? 'active' : ''}`}
              >
                <Building2 size={16} />
                <span>{t.courses.trackInstitution || (currentLang === 'ne' ? 'संस्थागत ट्रयाक' : 'Institution Track')}</span>
                <span className="track-count-badge">{institutionCount}</span>
              </button>
            </div>

            {/* Search Input with Clear Icon */}
            <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '380px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '14px' }} />
              <input
                type="text"
                placeholder={currentLang === 'ne' ? "कोर्स, मोड्युल वा मेन्टर खोज्नुहोस्..." : "Search courses, sub-topics, or mentors..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '42px', background: '#f8fafc' }}
              />
            </div>
          </div>

          {/* Row 2: Dynamic Free-Text Categories Filter Tabs */}
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: '10px' }}>
              {currentLang === 'ne' ? 'विषयगत वर्ग (Dynamic Categories):' : 'Filter by Category:'}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                  style={{ fontSize: '0.84rem', padding: '6px 16px' }}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Informative Track Context Banner */}
        {selectedTrack === 'individual' && (
          <div className="track-highlight-banner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: 'var(--brand-navy)', fontSize: '1.05rem', marginBottom: '4px' }}>
                <Users size={18} color="var(--brand-navy)" />
                {t.courses.trackIndividualTitle}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                {t.courses.trackIndividualDesc}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#334155', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> Max 15 Trainees
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> Laptop-First Practice
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> Bagbazar Campus
              </span>
            </div>
          </div>
        )}

        {selectedTrack === 'institution' && (
          <div className="track-highlight-banner" style={{ borderLeftColor: 'var(--brand-navy)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: 'var(--brand-navy)', fontSize: '1.05rem', marginBottom: '4px' }}>
                <Building2 size={18} color="var(--brand-navy)" />
                {t.courses.trackInstitutionTitle}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                {t.courses.trackInstitutionDesc}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#334155', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> On-Campus Delivery
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> Faculty Handbooks
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={15} color="#1C2F4D" /> Custom Schedules
              </span>
            </div>
          </div>
        )}

        {/* Structured Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', fontWeight: '700', marginBottom: '8px' }}>
              {currentLang === 'ne' ? 'कुनै तालिम कार्यक्रम भेटिएन।' : 'No training programs match your selected criteria.'}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {currentLang === 'ne' ? 'कृपया अन्य ट्रयाक वा फिल्टरहरू प्रयोग गर्नुहोस्।' : 'Try resetting your search query or selecting another category.'}
            </p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSelectedCategory('all'); setSelectedTrack('all'); setSearchQuery(''); }}
            >
              {currentLang === 'ne' ? 'फिल्टरहरू रिसेट गर्नुहोस्' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="courses-grid" style={{ marginBottom: '60px' }}>
            {filteredCourses.map((course) => {
              const modules = getCurriculumModules(course);
              const nextBatchText = getLangText(course, 'nextBatch', currentLang) || course.nextBatch;

              return (
                <div key={course.id} className="mindrisers-card course-card">
                  
                  {/* Top Metadata: Category, Track Badge, and Next Batch */}
                  <div className="course-meta">
                    <span className="course-category-badge">
                      {course.category?.toUpperCase()}
                    </span>
                    <span className="course-track-badge">
                      {course.track === 'institution' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Building2 size={13} /> {t.courses.trackInstitution}
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={13} /> {t.courses.trackIndividual}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Next Batch Indicator Tag */}
                  {nextBatchText && (
                    <div className="course-next-batch">
                      <Calendar size={13} />
                      <span>{nextBatchText}</span>
                    </div>
                  )}

                  {/* Course Title & Overview */}
                  <h3 className="course-card-title">
                    {getLangText(course, 'title', currentLang) || course.title}
                  </h3>
                  <p className="course-card-desc">
                    {getLangText(course, 'tagline', currentLang) || course.tagline}
                  </p>

                  {/* Clean, Structured Sub-Topics & Curriculum Preview (Structured Layout, NOT raw list) */}
                  {modules.length > 0 && (
                    <div className="course-curriculum-container">
                      <div className="course-curriculum-header">
                        <BookOpen size={13} color="var(--brand-navy)" />
                        <span>{t.courses.curriculumLabel}</span>
                      </div>
                      <div className="course-curriculum-list">
                        {modules.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="course-curriculum-item">
                            <span className="course-curriculum-num">0{idx + 1}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {modules.length > 3 && (
                        <button 
                          className="course-curriculum-more-btn"
                          onClick={() => openCourseModal(course)}
                        >
                          <span>+{modules.length - 3} {currentLang === 'ne' ? 'थप मोड्युलहरू पाठ्यक्रममा' : 'more modules in syllabus'}</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Structured Specifications Grid */}
                  <div className="course-specs">
                    <div className="spec-item">
                      <Clock size={15} color="var(--brand-navy)" />
                      <span>{getLangText(course, 'duration', currentLang) || course.duration}</span>
                    </div>
                    <div className="spec-item">
                      <Award size={15} color="var(--brand-navy)" />
                      <span>{course.mentor}</span>
                    </div>
                    <div className="spec-item" style={{ gridColumn: 'span 2' }}>
                      <MapPin size={15} color="var(--brand-navy)" />
                      <span>{getLangText(course, 'mode', currentLang) || course.mode}</span>
                    </div>
                  </div>

                  {/* Footer: Fee & Action Buttons */}
                  <div className="course-card-footer">
                    <div className="course-fee">
                      {typeof course.fee === 'number' && course.fee > 0 ? (
                        <>
                          Rs. {course.fee.toLocaleString()}
                          <span> / cohort</span>
                        </>
                      ) : (
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--brand-navy)' }}>
                          {currentLang === 'ne' ? 'संस्थागत प्याकेज' : 'Institutional Package'}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => openCourseModal(course)}
                        title="View Detailed Syllabus"
                      >
                        <span>{t.courses.viewDetails}</span>
                      </button>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => openLeadModal(course.id)}
                      >
                        <span>{t.courses.enrollNow}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Free Demo Institutional Callout */}
        <div 
          style={{ 
            padding: '40px', 
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 1px 3px rgba(28, 47, 77, 0.05)',
            marginBottom: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <span className="section-badge" style={{ marginBottom: '10px', background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)', borderColor: 'rgba(28, 47, 77, 0.2)' }}>
              {currentLang === 'ne' ? 'विद्यालय, कलेज तथा संस्थाहरूका लागि' : 'FOR SCHOOLS, COLLEGES & NGOS'}
            </span>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--brand-navy)', marginBottom: '10px', lineHeight: '1.25' }}>
              {currentLang === 'ne' 
                ? 'तपाईंको क्याम्पसमा व्यावहारिक एआई तथा डिजिटल साक्षरता सत्र सञ्चालन गर्नुहोस्' 
                : 'Host a Hands-On AI & Digital Skills Session at Your Campus'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.65' }}>
              {currentLang === 'ne'
                ? 'हामी वास्तविक एआई कार्यप्रवाह, शिक्षक तालिम टेम्प्लेट र व्यावहारिक अन्तरक्रियात्मक विधि सिधै तपाईंका विद्यार्थी र शिक्षकहरूसम्म पुर्याउँछौं।'
                : 'We bring real-time deepfake detectors, prompt engineering frameworks, and interactive pedagogy directly to your students and teachers. No complex setup required.'}
            </p>
          </div>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => openLeadModal('institution')}
            style={{ fontWeight: '700' }}
          >
            {t.courses.freeDemoBtn}
          </button>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'प्रायः सोधिने प्रश्नहरू' : 'FREQUENTLY ASKED QUESTIONS'}</span>
            <h2 className="section-title">{currentLang === 'ne' ? 'तालिम सम्बन्धी सामान्य जिज्ञासाहरू' : 'Common Questions on Training'}</h2>
            <p className="section-subtitle">
              {currentLang === 'ne' 
                ? 'ब्याच समय, कम्प्युटर ल्याब, स्थान र प्रमाणीकरण बारे जान्नैपर्ने विवरणहरू।'
                : 'Everything you need to know about batch timing, campus facilities, and certifications.'}
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="mindrisers-card" 
                style={{ padding: '20px 24px', cursor: 'pointer', transition: 'var(--transition)' }}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', color: 'var(--brand-navy)', fontSize: '1.02rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color="var(--brand-navy)" /> {faq.q}
                  </span>
                  <ChevronDown size={18} color="var(--brand-navy)" style={{ transform: expandedFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }} />
                </div>
                {expandedFaq === idx && (
                  <p style={{ marginTop: '14px', color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.65', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
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
