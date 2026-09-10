import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { pathForPage } from '../lib/seoConfig';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Share2
} from 'lucide-react';

export default function Footer({ currentLang, setActivePage, openLeadModal, siteSettings }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[currentLang] || translations.en;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer" style={{ background: '#172642', color: '#e2e8f0', borderTop: '3px solid #851C2C', paddingTop: '56px', paddingBottom: '32px' }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          
          {/* Column 1: Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            {/* Logo — white container so it's always visible on dark footer */}
            <div style={{ marginBottom: '16px', display: 'inline-block' }}>
              <div style={{ background: '#ffffff', borderRadius: '10px', padding: '7px 14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                <img 
                  src="/images/logo.png" 
                  alt="Vedanta Strategies" 
                  style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }} 
                />
              </div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
              {currentLang === 'ne'
                ? 'काठमाडौंस्थित व्यावहारिक सूचना प्रविधि, डिजिटल रणनीति तथा संस्थागत सीप विकास केन्द्र।'
                : 'Practical IT & AI training, institutional workshops, and digital growth agency based in Kathmandu, Nepal.'}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={siteSettings?.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Facebook">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={siteSettings?.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="LinkedIn">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={siteSettings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Instagram">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: '#C59A3F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentLang === 'ne' ? 'छिटो नेभिगेसन' : 'Quick Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'home', label: t.nav.home },
                { id: 'who-we-are', label: t.nav.whoWeAre || (currentLang === 'ne' ? 'हाम्रो परिचय' : 'Who We Are') },
                { id: 'ceo-message', label: t.nav.ceoMessage || (currentLang === 'ne' ? 'प्रमुख कार्यकारीको सन्देश' : "CEO's Message") },
                { id: 'team', label: t.nav.team || (currentLang === 'ne' ? 'हाम्रो टिम' : 'Our Team') },
                { id: 'individual-training', label: t.nav.individualTraining || (currentLang === 'ne' ? 'व्यक्तिगत तालिम' : 'Individual Training') },
                { id: 'institutional-training', label: t.nav.institutionalTraining || (currentLang === 'ne' ? 'संस्थागत कार्यक्रम' : 'Institutional Programs') },
                { id: 'services', label: t.nav.services },
                { id: 'portfolio', label: t.nav.portfolio },
                { id: 'blog', label: t.nav.blog },
                { id: 'gallery', label: t.nav.gallery || (currentLang === 'ne' ? 'ग्यालेरी' : 'Gallery') },
                { id: 'contact', label: t.nav.contact }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={pathForPage(item.id)}
                    onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                    style={{ background: 'transparent', color: '#cbd5e1', fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 0', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C59A3F'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
                  >
                    <span>›</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The 3 Pillars */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: '#C59A3F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentLang === 'ne' ? 'हाम्रा मुख्य सेवाहरू' : 'Our Core Services'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.9rem' }}>
                  {currentLang === 'ne' ? '१. सिकाइ तथा तालिम' : '1. Learning & Training'}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  {currentLang === 'ne' ? 'एआई टुल्स, मिडिया साक्षरता र डिजिटल सीपमा प्रयोगात्मक कक्षा' : 'Practical classes on AI tools, media literacy & digital skills'}
                </div>
              </li>
              <li>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.9rem' }}>
                  {currentLang === 'ne' ? '२. संस्थागत बुटक्याम्प' : '2. Institutional Bootcamps'}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  {currentLang === 'ne' ? 'कलेज, विद्यालय र संघसंस्थाहरूका लागि विशेष एआई र डिजिटल साक्षरता' : 'Customized AI & digital literacy workshops for colleges and schools'}
                </div>
              </li>
              <li>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.9rem' }}>
                  {currentLang === 'ne' ? '३. डिजिटल मार्केटिङ' : '3. Digital Marketing'}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                  {currentLang === 'ne' ? 'मेटा विज्ञापन, लिड जेनेरेसन र सामाजिक सञ्जाल व्यवस्थापन' : 'Meta ads, lead generation, and social media management'}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: '#C59A3F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentLang === 'ne' ? 'काठमाडौं कार्यालय' : 'Kathmandu Office'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#C59A3F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{getLangText(siteSettings, 'address', currentLang) || siteSettings?.address || 'Bagbazar, Kathmandu 44600, Nepal'}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} color="#C59A3F" style={{ flexShrink: 0 }} />
                <span>{siteSettings?.primaryPhone || '+977 1-4421098'}{siteSettings?.mobilePhone ? ` / ${siteSettings.mobilePhone}` : ''}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Mail size={16} color="#C59A3F" style={{ flexShrink: 0 }} />
                <span>{siteSettings?.officialEmail || 'info@vedantastrategies.com'}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} color="#C59A3F" style={{ flexShrink: 0 }} />
                <span>{getLangText(siteSettings, 'officeHours', currentLang) || 'Sun – Fri: 9:00 AM – 6:00 PM'}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: '18px' }}>
              {subscribed ? (
                <div style={{ color: '#86efac', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={14} /> {currentLang === 'ne' ? 'अपडेटका लागि सदस्यता भयो!' : 'Subscribed to updates!'}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="email"
                    required
                    placeholder={currentLang === 'ne' ? 'तपाईंको इमेल' : 'Your email address'}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 10px',
                      fontSize: '0.82rem',
                      color: '#fff',
                      flex: 1
                    }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '7px 12px' }}>
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar - Clean & Professional */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: '#94a3b8' }}>
          <div>
            © {new Date().getFullYear()} Vedanta Strategies Pvt. Ltd. {siteSettings?.address ? siteSettings.address.split(',')[0] : 'Bagbazar'}, Kathmandu, Nepal. {currentLang === 'ne' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('who-we-are')}>{t.nav.whoWeAre || (currentLang === 'ne' ? 'हाम्रो परिचय' : 'Who We Are')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('individual-training')}>{t.nav.individualTraining || (currentLang === 'ne' ? 'तालिम' : 'Training')}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('contact')}>{t.nav.contact}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
