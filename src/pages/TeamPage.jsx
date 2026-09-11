import React, { useState, useMemo } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { ArrowRight } from 'lucide-react';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TeamPage({ currentLang, teamMembers = [], openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMembers = useMemo(() => {
    if (activeFilter === 'all') return teamMembers;
    return teamMembers.filter(m => {
      const spec = (m.specialty || '').toLowerCase();
      const role = (m.role || '').toLowerCase();
      if (activeFilter === 'ai') return spec.includes('ai') || role.includes('ai') || spec.includes('tech');
      if (activeFilter === 'marketing') return spec.includes('marketing') || spec.includes('ads') || role.includes('marketing');
      if (activeFilter === 'leadership') return role.includes('ceo') || role.includes('lead') || role.includes('founder');
      return true;
    });
  }, [teamMembers, activeFilter]);

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">


        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'हाम्रा प्रशिक्षक तथा नेतृत्व' : 'OUR MENTORS & LEADERSHIP'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजको टिम' : 'The People Behind Vedanta Strategies'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'हामी प्रविधि, डिजिटल मार्केटिङ तथा संस्थागत रणनीतिमा प्रत्यक्ष कार्यरत विशेषज्ञहरूको समूह हौँ।'
              : 'We are active practitioners, engineers, and digital growth specialists who manage real campaigns and teach what works today in Nepal.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label_en: 'All Mentors & Leads', label_ne: 'सबै टिम सदस्यहरू' },
            { id: 'leadership', label_en: 'Leadership', label_ne: 'संस्थागत नेतृत्व' },
            { id: 'ai', label_en: 'AI & Tech Instructors', label_ne: 'एआई तथा प्रविधि' },
            { id: 'marketing', label_en: 'Digital Growth Specialists', label_ne: 'डिजिटल मार्केटिङ' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: activeFilter === f.id ? '2px solid var(--brand-navy)' : '1px solid var(--border-color)',
                background: activeFilter === f.id ? 'rgba(28, 47, 77, 0.08)' : '#ffffff',
                color: activeFilter === f.id ? 'var(--brand-navy)' : 'var(--brand-navy)',
                fontWeight: '700',
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {currentLang === 'ne' ? f.label_ne : f.label_en}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="mindrisers-card" 
              style={{ 
                padding: '36px 28px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderTop: '4px solid var(--brand-navy)'
              }}
            >
              <div className="team-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    (member.avatar || member.name?.slice(0, 2).toUpperCase())
                  )}
                </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '4px', color: 'var(--brand-navy)', fontWeight: '800' }}>
                {member.name}
              </h3>
              
              <div style={{ color: 'var(--brand-navy)', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                {getLangText(member, 'role', currentLang) || member.role}
              </div>

              <div style={{ flexGrow: 1 }} />

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {member.facebookUrl && (
                  <a
                    href={member.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on Facebook`}
                    className="team-social-link"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {member.instagramUrl && (
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="team-social-link"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="team-social-link"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Instructor Fellowship Banner */}
        <div 
          style={{ 
            background: '#ffffff', 
            border: '1px solid var(--border-light)',
            boxShadow: '0 1px 3px rgba(28, 47, 77, 0.05)',
            borderRadius: 'var(--radius-lg)', 
            padding: '40px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-navy)', fontWeight: '800' }}>
              JOIN OUR FELLOWSHIP
            </span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '6px', marginBottom: '10px', color: 'var(--brand-navy)' }}>
              Are you a practitioner passionate about teaching?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              We are constantly looking for practical instructors, AI researchers, and digital marketing leads in Kathmandu to lead weekend cohorts and campus bootcamps.
            </p>
          </div>

          <button 
            className="btn btn-primary btn-lg"
            onClick={() => openLeadModal('general')}
          >
            <span>Apply as a Mentor</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
