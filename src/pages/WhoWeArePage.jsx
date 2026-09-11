import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { MapPin, ArrowRight } from 'lucide-react';

export default function WhoWeArePage({ currentLang, siteContent, media = {}, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  const whoWeAreText = getLangText(siteContent?.about, 'whoWeAre', currentLang) || (
    currentLang === 'ne'
      ? 'वेदान्त स्ट्राटेजिज काठमाडौंको व्यावहारिक तालिम एकेडेमी र डिजिटल रणनीति साझेदार हो। बागबजारस्थित हाम्रो क्याम्पसमा विद्यार्थी र पेसाकर्मीहरूलाई व्यावहारिक एआई र डिजिटल सीप सिकाउँछौं, र त्यही टिमले व्यवसाय तथा संस्थाहरूको नतिजामुखी मार्केटिङ पनि सञ्चालन गर्छ। सिकाइ र कार्यान्वयन — एउटै टिमका दुई ढोका।'
      : 'Vedanta Strategies is Kathmandu\'s hands-on training academy and digital strategy partner. At our Bagbazar campus we equip students and professionals with practical AI and digital skills, and the same team runs performance marketing for businesses and organizations. Learning and execution — two doors, one team.'
  );

  const photo = media?.heroImage || media?.campusImage || '/images/hero.jpg';

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'हाम्रो परिचय' : 'ABOUT VEDANTA STRATEGIES'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'व्यावहारिक सीप, रणनीतिक सोच र संस्थागत प्रभाव' : 'Practical Learning, Strategic Thinking & Lasting Impact'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'हामी काठमाडौंस्थित प्रविधि प्रशिक्षक तथा डिजिटल रणनीतिकारहरूको समूह हौँ जसले नतिजामुखी काममा विश्वास गर्छौं।'
              : 'A Kathmandu-based strategic learning academy and digital consulting firm committed to execution-driven training and measurable progress.'}
          </p>
        </div>

        {/* Who We Are: One Paragraph + One Photo */}
        <section style={{ maxWidth: '900px', margin: '0 auto 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--brand-navy)', marginBottom: '18px', fontWeight: '800' }}>
                {currentLang === 'ne' ? 'हामी को हौँ' : 'Who We Are'}
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.8', margin: 0 }}>
                {whoWeAreText}
              </p>
            </div>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <img
                src={photo}
                alt={currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिज बागबजार' : 'Vedanta Strategies, Bagbazar'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </section>

        {/* Visit Campus CTA Card */}
        <div className="mindrisers-card" style={{ padding: '44px 32px', textAlign: 'center', maxWidth: '760px', margin: '0 auto', border: '1px solid var(--border-color)', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--brand-navy)', marginBottom: '10px' }}>
            <MapPin size={20} />
            <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--brand-navy)', fontWeight: '800' }}>
              {currentLang === 'ne' ? 'हाम्रो बागबजार कार्यालय आउनुहोस्' : 'Visit Our Campus at Bagbazar'}
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '24px', lineHeight: '1.65' }}>
            {currentLang === 'ne'
              ? 'हाम्रा प्रशिक्षकहरूसँग चिया पिउँदै कम्प्युटर ल्याब अवलोकन गर्नुहोस् र तपाईं वा तपाईंको संस्थाका लागि उपयुक्त कार्यक्रमबारे छलफल गर्नुहोस्।'
              : 'Our office and practical labs are located right at Bagbazar, Kathmandu. Feel free to visit us during office hours to meet our instructors and discuss your goals.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => openLeadModal('general')}>
              {currentLang === 'ne' ? 'टोलीसँग परामर्श गर्नुहोस्' : 'Schedule a Consultation'}
            </button>
            <button className="btn btn-secondary" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <ArrowRight size={16} />
              {currentLang === 'ne' ? 'कार्यालय ठेगाना र नक्सा' : 'View Campus Directions & Map'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}