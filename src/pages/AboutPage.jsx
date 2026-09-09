import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { Sparkles, Award, Target, Users, CheckCircle, ArrowRight, MapPin, Coffee } from 'lucide-react';

export default function AboutPage({ currentLang, siteContent, teamMembers = [], openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  const milestones = [
    { year: "2020", title: "Started with Media Literacy", desc: "Began conducting workshops in Kathmandu schools helping teachers and students identify online misinformation." },
    { year: "2022", title: "Opened Putalisadak Studio", desc: "Built our acoustic recording studio for podcasts and educational videos, supporting local creators and organizations." },
    { year: "2024", title: "Practical AI Training Cohorts", desc: "Launched hands-on AI tools classes for working professionals and customized workshops for colleges." },
    { year: "2026", title: "Training, Studio & Marketing", desc: "Now training hundreds of students each year, running campaigns for Nepali businesses, and hosting regular studio productions." }
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '88px' }}>
      <div className="container">
        
        {/* 1. Header & Story */}
        <div className="section-header">
          <span className="section-badge">{currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजबारे' : 'ABOUT VEDANTA STRATEGIES'}</span>
          <h1 className="section-title">{currentLang === 'ne' ? 'हामी को हौँ र किन सुरु गर्यौँ' : 'Who We Are & Why We Started'}</h1>
          <p className="section-subtitle">
            {currentLang === 'ne' ? 'हामी काठमाडौंस्थित डिजिटल मार्केटर, भिडियोग्राफर तथा प्रविधि प्रशिक्षकहरूको टिम हौँ जसले व्यावहारिक काममा विश्वास गर्छौं।' : 'We are a Kathmandu-based team of digital marketers, videographers, and technology instructors who believe in practical, down-to-earth work.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '72px' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '16px', color: 'var(--brand-navy)' }}>
              {currentLang === 'ne' ? 'व्यावहारिक सीप र इमानदार मार्केटिङ' : 'Practical Skills and Honest Marketing'}
            </h2>
            {getLangText(siteContent?.about, 'story', currentLang) ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '24px' }}>
                {getLangText(siteContent?.about, 'story', currentLang)}
              </p>
            ) : (
              <>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '14px' }}>
                  We started Vedanta Strategies because we noticed two common problems in Kathmandu: students were spending months in computer institutes learning outdated material that didn't help them in real jobs, and businesses were spending money boosting posts without seeing actual sales or leads.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '24px' }}>
                  We decided to bring practical training, in-house studio production, and real digital marketing together under one roof in Putalisadak. When you join our course, you practice on live tools. When you record a podcast with us, our audio engineers take care of everything.
                </p>
              </>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div style={{ padding: '16px 20px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--brand-maroon)', fontFamily: 'var(--font-heading)' }}>Max 15 Students</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Personal guidance per batch</div>
              </div>
              <div style={{ padding: '16px 20px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--brand-navy)', fontFamily: 'var(--font-heading)' }}>Putalisadak Lab</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Central Kathmandu location</div>
              </div>
            </div>
          </div>

          <div className="mindrisers-card" style={{ padding: '36px', borderLeft: '4px solid var(--brand-gold)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '16px', color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} color="var(--brand-maroon)" /> Our Simple Mission
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '20px' }}>
              "To teach practical digital skills that people can immediately use for their studies and jobs, while helping Nepali schools and businesses communicate clearly online."
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={17} color="#10b981" /> <span>No fake promises or exaggerated claims</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={17} color="#10b981" /> <span>Individual help on your own laptop</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={17} color="#10b981" /> <span>Honest marketing reports showing real customer inquiries</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Team & Mentors */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <span className="section-badge">OUR TEAM</span>
            <h2 className="section-title">The People Behind Vedanta Strategies</h2>
            <p className="section-subtitle">We are hands-on practitioners who manage live projects every day.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="mindrisers-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(197, 154, 63, 0.15)', border: '2px solid var(--brand-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.5rem', fontWeight: '800', color: 'var(--brand-maroon)' }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--brand-navy)' }}>{member.name}</h3>
                <div style={{ color: 'var(--brand-maroon)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                  {getLangText(member, 'role', currentLang) || member.role}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-navy-light)', marginBottom: '14px', fontWeight: '600' }}>
                  {getLangText(member, 'specialty', currentLang) || member.specialty}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {getLangText(member, 'bio', currentLang) || member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Milestones */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header">
            <span className="section-badge">OUR PROGRESS</span>
            <h2 className="section-title">How We Got Here</h2>
            <p className="section-subtitle">Step by step over the last 6 years in Kathmandu.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {milestones.map((m, idx) => (
              <div key={idx} className="mindrisers-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brand-maroon)', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                  {m.year}
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px', color: 'var(--brand-navy)' }}>{m.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Welcoming CTA */}
        <div className="mindrisers-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '720px', margin: '0 auto', border: '2px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--brand-navy)' }}>
            Drop by for a cup of tea!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '24px', lineHeight: '1.65' }}>
            Our office and studio are right at Putalisadak. Feel free to visit us during work hours to see our classrooms and studio setup in person.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => openLeadModal('general')}>
              Message Our Team
            </button>
            <button className="btn btn-secondary" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Get Office Directions
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
