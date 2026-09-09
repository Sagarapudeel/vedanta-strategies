import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Sparkles, 
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
  ChevronDown
} from 'lucide-react';

export default function TrainingPage({ currentLang, courses = [], openCourseModal, openLeadModal }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', label: t.courses.filterAll },
    { id: 'ai', label: t.courses.filterAi },
    { id: 'marketing', label: t.courses.filterMarketing },
    { id: 'production', label: t.courses.filterProduction }
  ];

  const tracks = [
    { id: 'all', label: 'All Tracks' },
    { id: 'individual', label: 'For Individuals & Youth' },
    { id: 'institution', label: 'For Schools & Colleges' }
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
    const titleText = (getLangText(course, 'title', currentLang) || course.title || '').toLowerCase();
    const taglineText = (getLangText(course, 'tagline', currentLang) || course.tagline || '').toLowerCase();
    const titleEn = (course.title_en || course.title || '').toLowerCase();
    const taglineEn = (course.tagline_en || course.tagline || '').toLowerCase();
    const mentor = (course.mentor || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      titleText.includes(query) ||
      taglineText.includes(query) ||
      titleEn.includes(query) ||
      taglineEn.includes(query) ||
      mentor.includes(query);
    return matchesCategory && matchesTrack && matchesSearch;
  });

  const faqs = [
    {
      q: "Are the training programs available online or physical in Kathmandu?",
      a: "We offer both! Most courses feature a hybrid structure: physical studio sessions at our Putalisadak campus in Kathmandu, accompanied by live HD online streaming and recorded access for students outside the Valley."
    },
    {
      q: "How does the 'For Schools & Colleges' track work?",
      a: "Our institutional team designs customized 2-day to 4-week bootcamps directly inside partner campuses. We provide all workshop materials, AI sandbox environments, and faculty training manuals."
    },
    {
      q: "Do trainees receive certification upon completion?",
      a: "Yes. Trainees who complete the required hands-on capstone project receive a verified certificate from Vedanta Strategies, validated with a digital verification code."
    },
    {
      q: "What prerequisites are needed for the AI & Prompt Engineering course?",
      a: "Basic computer familiarity and a curious mindset. We teach the fundamentals from scratch before advancing to custom GPTs, multimodal generators, and API workflow automation."
    }
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.courses.badge}</span>
          <h1 className="section-title">{t.courses.title}</h1>
          <p className="section-subtitle">{t.courses.subtitle}</p>
        </div>

        {/* Search & Track Filter Strip (Digital Gurkha Academy Pattern) */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '40px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Track Switcher (Individual vs Institutional) */}
            <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: 'var(--radius-full)' }}>
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: selectedTrack === track.id ? 'var(--brand-navy)' : 'transparent',
                    color: selectedTrack === track.id ? '#ffffff' : '#475569',
                    fontWeight: '700',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {track.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '380px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
              <input
                type="text"
                placeholder="Search courses, mentors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', background: '#f8fafc' }}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                style={{ fontSize: '0.85rem', padding: '7px 18px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '12px' }}>No training programs match your selected criteria.</p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSelectedCategory('all'); setSelectedTrack('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid" style={{ marginBottom: '60px' }}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="mindrisers-card course-card">
                <div className="course-meta">
                  <span className="course-category-badge">{course.category.toUpperCase()}</span>
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

                <h3 className="course-card-title">{getLangText(course, 'title', currentLang) || course.title}</h3>
                <p className="course-card-desc">{getLangText(course, 'tagline', currentLang) || course.tagline}</p>

                <div className="course-specs">
                  <div className="spec-item">
                    <Clock size={15} color="#851C2C" />
                    <span>{getLangText(course, 'duration', currentLang) || course.duration}</span>
                  </div>
                  <div className="spec-item">
                    <Award size={15} color="#C59A3F" />
                    <span>{course.mentor}</span>
                  </div>
                  <div className="spec-item" style={{ gridColumn: 'span 2' }}>
                    <MapPin size={15} color="#172642" />
                    <span>{getLangText(course, 'mode', currentLang) || course.mode}</span>
                  </div>
                </div>

                <div className="course-card-footer">
                  <div className="course-fee">
                    {typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : course.fee}
                    <span> / cohort</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => openCourseModal(course)}
                    >
                      <span>{t.courses.viewDetails}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Free Demo Institutional Callout (Digital Gurkha Style Callout) */}
        <div 
          style={{ 
            padding: '40px', 
            background: 'linear-gradient(135deg, #172642 0%, #0f172a 100%)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(197, 154, 63, 0.4)',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <span className="section-badge" style={{ marginBottom: '10px', background: 'rgba(197,154,63,0.2)', color: '#fbbf24', borderColor: 'rgba(197,154,63,0.4)' }}>
              FOR SCHOOLS, COLLEGES & NGOS
            </span>
            <h3 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '10px' }}>
              Host a Hands-On AI & Media Literacy Session at Your Campus
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: '1.65' }}>
              We bring real-time deepfake detectors, prompt engineering frameworks, and interactive pedagogy directly to your students and teachers. No complex setup required.
            </p>
          </div>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => openLeadModal('institution')}
            style={{ fontWeight: '700' }}
          >
            <Sparkles size={18} /> Request Free Demo Session
          </button>
        </div>

        {/* FAQ Section with Crystal-Clear Typography */}
        <div>
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Common Questions on Training</h2>
            <p className="section-subtitle">Everything you need to know about batch timing, equipment, and certifications.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="mindrisers-card" 
                style={{ padding: '20px 24px', cursor: 'pointer', transition: 'var(--transition)' }}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', color: 'var(--brand-navy)', fontSize: '1.02rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color="#C59A3F" /> {faq.q}
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
