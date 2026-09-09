import React from 'react';
import { X, Clock, MapPin, Calendar, Award, CheckCircle2, Download, UserCheck, Sparkles } from 'lucide-react';
import { getLangText, getLangArray } from '../utils/langHelper';

export default function CourseDetailModal({ course, isOpen, onClose, onEnroll, currentLang = 'en' }) {
  if (!isOpen || !course) return null;

  const title = getLangText(course, 'title', currentLang) || course.title;
  const tagline = getLangText(course, 'tagline', currentLang) || course.tagline;
  const duration = getLangText(course, 'duration', currentLang) || course.duration;
  const mode = getLangText(course, 'mode', currentLang) || course.mode;
  const nextBatch = getLangText(course, 'nextBatch', currentLang) || course.nextBatch || (currentLang === 'ne' ? 'नियमित भर्ना जारी' : 'Ongoing Enrollment');
  const curriculumList = getLangArray(course, 'curriculum', currentLang);
  const displayCurriculum = curriculumList.length > 0 ? curriculumList : (course.curriculum || []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        {/* Header Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span className="course-category-badge">{course.category?.toUpperCase()}</span>
          <span className="course-track-badge">
            {course.track === 'institution' ? (currentLang === 'ne' ? 'विद्यालय तथा कलेजका लागि' : 'For Schools & Colleges') : (currentLang === 'ne' ? 'व्यक्ति तथा युवाका लागि' : 'For Individuals & Professionals')}
          </span>
          {course.featured && (
            <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
              POPULAR
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h2 style={{ fontSize: '2rem', marginBottom: '12px', color: '#fff', lineHeight: '1.2' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {tagline}
        </p>

        {/* Key Specs Card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '18px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Clock size={15} color="#f59e0b" /> {currentLang === 'ne' ? 'समय अवधि' : 'Duration'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{duration}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <MapPin size={15} color="#38bdf8" /> {currentLang === 'ne' ? 'सिक्ने माध्यम' : 'Learning Mode'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{mode}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Calendar size={15} color="#10b981" /> {currentLang === 'ne' ? 'आगामी ब्याच' : 'Next Cohort'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{nextBatch}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <UserCheck size={15} color="#f59e0b" /> {currentLang === 'ne' ? 'प्रशिक्षक' : 'Lead Mentor'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{course.mentor}</div>
          </div>
        </div>

        {/* Curriculum Modules */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#f59e0b" /> {currentLang === 'ne' ? 'पाठ्यक्रम मोड्युलहरू' : 'Detailed Curriculum Modules'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {displayCurriculum.map((mod, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}>
                  {idx + 1}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  {mod}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tuition / Investment</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fbbf24', fontFamily: 'var(--font-heading)' }}>
              {typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : course.fee}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / cohort</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => alert(`Syllabus for "${course.title}" has been prepared! Starting PDF download...`)}
            >
              <Download size={16} />
              <span>Syllabus PDF</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEnroll(course.id);
              }}
            >
              <Sparkles size={16} />
              <span>Enroll In Batch</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
