import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText, getLangArray } from '../utils/langHelper';
import { 
  TrendingUp, 
  Share2, 
  Cpu, 
  Palette, 
  PenTool, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Zap, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

export default function ServicesPage({ currentLang, services = [], openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id || '');

  const iconMap = {
    TrendingUp: <TrendingUp size={28} />,
    Share2: <Share2 size={28} />,
    Cpu: <Cpu size={28} />,
    Palette: <Palette size={28} />,
    Sparkles: <Palette size={28} />
  };

  const packageMeta = [
    { key: 'starter', name: 'Starter Package', nameNe: 'स्टार्टर प्याकेज' },
    { key: 'growth', name: 'Growth Package', nameNe: 'ग्रोथ प्याकेज' },
    { key: 'enterprise', name: 'Institutional / Custom', nameNe: 'संस्थागत / कस्टम' }
  ];

  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.services.badge}</span>
          <h1 className="section-title">{t.services.title}</h1>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        {/* 1. Services Grid */}
        <div className="services-grid">
          {services.map((srv) => (
            <div key={srv.id} className="glass-card service-card">
              <div className="service-card-header">
                <div className="service-card-icon">
                  {iconMap[srv.icon] || <PenTool size={28} />}
                </div>
                <span className="service-card-tag">
                  {getLangText(srv, 'tag', currentLang) || srv.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--brand-navy)' }}>
                {getLangText(srv, 'title', currentLang) || srv.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                {getLangText(srv, 'shortDesc', currentLang) || srv.shortDesc}
              </p>

              <div className="service-deliverables">
                <div className="deliverables-label">
                  Key Deliverables
                </div>
                <ul className="service-deliverables-list">
                  {(getLangArray(srv, 'deliverables', currentLang).length > 0 ? getLangArray(srv, 'deliverables', currentLang) : (srv.deliverables || [])).map((d, i) => (
                    <li key={i} className="service-deliverables-item">
                      <CheckCircle size={14} color="#1C2F4D" /> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="btn btn-outline-gold"
                onClick={() => openLeadModal('services')}
              >
                <span>{t.services.inquireService}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* 2. Ready / Set / Go 3-Step Process (Digital Terai Pattern) */}
        <div className="services-section-wrapper">
          <div className="section-header">
            <span className="section-badge">{t.services.processBadge}</span>
            <h2 className="section-title">{t.services.processTitle}</h2>
            <p className="section-subtitle">A disciplined approach ensuring zero wasted ad budget and high accountability.</p>
          </div>

          <div className="process-grid">
            <div className="mindrisers-card process-card">
              <div className="process-step-num">01</div>
              <h3 className="process-title">{t.services.step1Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {t.services.step1Desc}
              </p>
            </div>

            <div className="mindrisers-card process-card">
              <div className="process-step-num">02</div>
              <h3 className="process-title">{t.services.step2Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {t.services.step2Desc}
              </p>
            </div>

            <div className="mindrisers-card process-card">
              <div className="process-step-num">03</div>
              <h3 className="process-title">{t.services.step3Title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {t.services.step3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Pricing Packages (dynamic from configured services) */}
        {activeService && (
        <div className="services-section-wrapper">
          <div className="section-header">
            <span className="section-badge">{t.services.pricingBadge}</span>
            <h2 className="section-title">{t.services.pricingTitle}</h2>
            <p className="section-subtitle">{currentLang === 'ne' ? 'कुनै लुकेको कमिसन छैन — पारदर्शी सम्झौता।' : 'Transparent engagement models without hidden commissions.'}</p>
          </div>

          {/* Service selector */}
          <div className="pricing-service-tabs">
            {services.map((srv) => (
              <button
                key={srv.id}
                className={`pricing-service-tab ${activeService.id === srv.id ? 'active' : ''}`}
                onClick={() => setActiveServiceId(srv.id)}
              >
                {getLangText(srv, 'title', currentLang) || srv.title}
              </button>
            ))}
          </div>

          <div className="pricing-grid">
            {packageMeta.map((tier) => {
              const price = (activeService.packages && activeService.packages[tier.key]) || (currentLang === 'ne' ? 'कस्टम' : 'Custom');
              const isEnterprise = tier.key === 'enterprise';
              return (
                <div 
                  key={tier.key} 
                  className={`mindrisers-card ${tier.key === 'growth' ? 'pricing-card-featured' : ''}`} 
                  style={{ padding: '36px 30px', position: 'relative' }}
                >
                  {tier.key === 'growth' && (
                    <div className="pricing-card-badge">
                      {currentLang === 'ne' ? 'लोकप्रिय' : 'MOST POPULAR'}
                    </div>
                  )}

                  <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-navy)', marginBottom: '8px' }}>
                    {currentLang === 'ne' ? tier.nameNe : tier.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', minHeight: '40px' }}>
                    {isEnterprise
                      ? (currentLang === 'ne' ? 'म्यापिङ·बुकिङ·अनुकूलित सम्झौता' : 'Mapped, scoped, and agreed to your exact needs')
                      : (currentLang === 'ne' ? 'महिनाको सक्रिय व्यवस्थापन' : 'Active monthly management & delivery')}
                  </p>

                  <div style={{ marginBottom: '28px' }}>
                    <span className="pricing-card-price">
                      {price}
                    </span>
                  </div>

                  <div style={{ marginBottom: '28px', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', minHeight: '80px' }}>
                    {getLangText(activeService, 'shortDesc', currentLang) || activeService.shortDesc}
                  </div>

                  <ul className="pricing-card-features">
                    {(getLangArray(activeService, 'deliverables', currentLang).length > 0
                      ? getLangArray(activeService, 'deliverables', currentLang)
                      : (activeService.deliverables || [])).map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle size={16} color="#1C2F4D" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => openLeadModal('services')}
                  >
                    <span>{currentLang === 'ne' ? 'प्याकेज छान्नुहोस्' : 'Select Package'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* 4. Consultation Banner */}
        <div className="mindrisers-card newsletter-cta">
          <h3 className="newsletter-cta-heading">Want to talk about marketing for your business?</h3>
          <p className="newsletter-cta-desc">
            Let's sit down for 30 minutes in person or over Google Meet. We'll look at your current social media page and share practical suggestions — no pressure, no commitment.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => openLeadModal('services')}>
            Book a Free 30-Min Discussion
          </button>
        </div>

      </div>
    </div>
  );
}
