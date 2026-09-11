import React, { useState } from 'react';
import { X, Clock, MapPin, Calendar, Award, CheckCircle2, Download, UserCheck } from 'lucide-react';
import { getLangText, getLangArray } from '../utils/langHelper';

export default function CourseDetailModal({ course, isOpen, onClose, onEnroll, currentLang = 'en' }) {
  const [syllabusNote, setSyllabusNote] = useState(false);

  if (!isOpen || !course) return null;

  const title = getLangText(course, 'title', currentLang) || course.title || 'Course Details';
  const tagline = getLangText(course, 'tagline', currentLang) || course.tagline || '';
  const duration = getLangText(course, 'duration', currentLang) || course.duration || '';
  const mode = getLangText(course, 'mode', currentLang) || course.mode || '';
  const nextBatch = getLangText(course, 'nextBatch', currentLang) || course.nextBatch || (currentLang === 'ne' ? 'नियमित भर्ना जारी' : 'Ongoing Enrollment');
  const curriculumList = getLangArray(course, 'curriculum', currentLang);
  const rawCurriculum = Array.isArray(course.curriculum) ? course.curriculum : [];
  const displayCurriculum = curriculumList.length > 0 ? curriculumList : rawCurriculum;
  const structuredModules = Array.isArray(course.structuredModules) ? course.structuredModules : [];

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
            <span style={{ fontSize: '0.75rem', background: 'rgba(182, 138, 40, 0.2)', color: '#B68A28', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
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
              <Clock size={15} color="#B68A28" /> {currentLang === 'ne' ? 'समय अवधि' : 'Duration'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{duration}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <MapPin size={15} color="#B68A28" /> {currentLang === 'ne' ? 'सिक्ने माध्यम' : 'Learning Mode'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{mode}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <Calendar size={15} color="#B68A28" /> {currentLang === 'ne' ? 'आगामी ब्याच' : 'Next Cohort'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{nextBatch}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <UserCheck size={15} color="#B68A28" /> {currentLang === 'ne' ? 'प्रशिक्षक' : 'Lead Mentor'}
            </div>
            <div style={{ fontWeight: '700', color: '#fff' }}>{course.mentor}</div>
          </div>
        </div>

        {/* Curriculum Modules & Structured Sub-Topics */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#B68A28" /> {currentLang === 'ne' ? 'पाठ्यक्रम मोड्युल तथा उप-विषयहरू' : 'Curriculum Modules & Sub-Topics'}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* If course has structured modules */}
            {structuredModules.length > 0 ? (
              structuredModules.map((mod, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(197, 154, 63, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 18px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(182, 138, 40, 0.2)', color: '#B68A28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '800', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '1rem' }}>
                      {getLangText(mod, 'title', currentLang) || mod.title}
                    </div>
                  </div>

                  {Array.isArray(mod.topics) && mod.topics.length > 0 && (
                    <ul style={{ listStyle: 'none', paddingLeft: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px 14px', margin: 0 }}>
                      {mod.topics.map((t, tIdx) => (
                        <li key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                          <CheckCircle2 size={13} color="#B68A28" style={{ flexShrink: 0 }} />
                          <span>{typeof t === 'string' ? t : ''}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : displayCurriculum.length > 0 ? (
              /* Fallback to line-by-line curriculum with sub-topic parsing */
              displayCurriculum.map((mod, idx) => {
                const isString = typeof mod === 'string';
                const parts = isString && mod.includes(':') ? mod.split(':') : null;
                const header = parts ? parts[0] : null;
                const body = parts ? parts.slice(1).join(':').trim() : mod;

                return (
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
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(182, 138, 40, 0.15)', color: '#B68A28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}>
                      {idx + 1}
                    </div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                      {header ? (
                        <>
                          <span style={{ fontWeight: '700', color: '#fff' }}>{header}: </span>
                          <span>{typeof body === 'string' ? body : ''}</span>
                        </>
                      ) : (
                        typeof body === 'string' ? body : ''
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {currentLang === 'ne'
                  ? 'यस कोर्सको विस्तृत पाठ्यक्रम अहिले तयार भइरहेको छ। पूर्ण सिलेबस प्राप्त गर्न कृपया सम्पर्क गर्नुहोस्।'
                  : 'The detailed syllabus for this course is being finalized. Please contact us for the complete module breakdown.'}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tuition / Investment</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#B68A28', fontFamily: 'var(--font-heading)' }}>
              {typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : course.fee}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}> / cohort</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setSyllabusNote(true)}
            >
              <Download size={16} />
              <span>{currentLang === 'ne' ? 'सिलेबस PDF' : 'Syllabus PDF'}</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEnroll(course.id);
              }}
            >
              <UserCheck size={16} />
              <span>{currentLang === 'ne' ? 'ब्याचमा भर्ना' : 'Enroll In Batch'}</span>
            </button>
          </div>
        </div>

        {/* Syllabus PDF availability note */}
        {syllabusNote && (
          <div style={{ marginTop: '16px', padding: '16px 18px', borderRadius: 'var(--radius-sm)', background: 'rgba(182, 138, 40, 0.1)', border: '1px dashed rgba(182, 138, 40, 0.45)', color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            {currentLang === 'ne'
              ? 'विस्तृत PDF सिलेबस तपाईंको व्हाट्सएप / इमेलमा पठाइनेछ। नम्बर: +977 9747887598 वा info.vedantastrategies@gmail.com मा सम्पर्क गर्नुहोस्।'
              : 'The detailed PDF syllabus will be shared on your WhatsApp / email. Reach us at +977 9747887598 or info.vedantastrategies@gmail.com.'}
          </div>
        )}

      </div>
    </div>
  );
}
