import React from 'react';
import { Home, BookOpen, Briefcase, Mail, ArrowLeft, Search } from 'lucide-react';
import { pathForPage } from '../lib/seoConfig';

export default function NotFoundPage({ currentLang = 'en', setActivePage }) {
  const isNe = currentLang === 'ne';

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
        
        {/* Decorative Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'rgba(197, 154, 63, 0.12)', border: '1px solid rgba(197, 154, 63, 0.3)', color: '#B68A28', fontSize: '0.85rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '0.05em' }}>
          <span>ERROR 404</span>
        </div>

        {/* Big Stylized Number */}
        <div style={{ fontSize: 'clamp(5rem, 15vw, 8.5rem)', fontWeight: '900', lineHeight: 1, color: 'var(--brand-navy)', letterSpacing: '-0.03em', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
          4<span style={{ color: '#C59A3F' }}>0</span>4
        </div>

        {/* Single H1 */}
        <h1 className="section-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '16px', color: 'var(--brand-navy)' }}>
          {isNe ? 'पृष्ठ फेला परेन' : 'Page Not Found'}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px auto' }}>
          {isNe 
            ? 'तपाईंले खोज्नुभएको पृष्ठ हटाइएको, नाम परिवर्तन गरिएको वा अस्थायी रूपमा उपलब्ध नभएको हुन सक्छ।'
            : "The page you are looking for might have been moved, renamed, or is temporarily unavailable."}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <a
            href={pathForPage('home')}
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            className="btn btn-primary"
            style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Home size={18} />
            <span>{isNe ? 'गृहपृष्ठमा फर्कनुहोस्' : 'Back to Home'}</span>
          </a>

          <a
            href={pathForPage('individual-training')}
            onClick={(e) => { e.preventDefault(); navigateTo('individual-training'); }}
            className="btn btn-secondary"
            style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <BookOpen size={18} />
            <span>{isNe ? 'पाठ्यक्रमहरू हेर्नुहोस्' : 'Explore Courses'}</span>
          </a>
        </div>

        {/* Helpful links bar */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--brand-navy)', fontWeight: '600' }} onClick={() => navigateTo('services')}>
            {isNe ? 'सेवाहरू' : 'Services'}
          </span>
          <span>•</span>
          <span style={{ cursor: 'pointer', color: 'var(--brand-navy)', fontWeight: '600' }} onClick={() => navigateTo('who-we-are')}>
            {isNe ? 'हाम्रो परिचय' : 'Who We Are'}
          </span>
          <span>•</span>
          <span style={{ cursor: 'pointer', color: 'var(--brand-navy)', fontWeight: '600' }} onClick={() => navigateTo('contact')}>
            {isNe ? 'सम्पर्क' : 'Contact Us'}
          </span>
        </div>

      </div>
    </div>
  );
}
