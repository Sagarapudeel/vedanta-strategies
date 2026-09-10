import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText, getLangArray } from '../utils/langHelper';
import { 
  TrendingUp, 
  Share2, 
  Cpu, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Zap, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

export default function ServicesPage({ currentLang, services = [], openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  const iconMap = {
    TrendingUp: <TrendingUp size={28} />,
    Share2: <Share2 size={28} />,
    Cpu: <Cpu size={28} />,
    Sparkles: <Sparkles size={28} />
  };

  const pricingTiers = [
    {
      name: "Starter Package",
      idealFor: "Small local businesses, clinics, and new shops",
      price: "Rs. 25,000",
      period: "/ month",
      features: [
        "Managing Facebook & Instagram page",
        "8 custom designed visual posts per month",
        "Running targeted Meta ads for WhatsApp inquiries",
        "Weekly spend and inquiry summary on WhatsApp"
      ],
      popular: false
    },
    {
      name: "Growth Package",
      idealFor: "Colleges, established clinics, and active brands",
      price: "Rs. 48,000",
      period: "/ month",
      features: [
        "Full Facebook, Instagram & LinkedIn management",
        "16 custom graphic posts + 4 edited video reels per month",
        "Meta & Google search ad management",
        "WhatsApp auto-responder setup for customer inquiries",
        "Dedicated campaign manager with weekly review call"
      ],
      popular: true
    },
    {
      name: "Institutional / Campaign",
      idealFor: "College admission seasons, school campaigns & NGOs",
      price: "Custom",
      period: "per project",
      features: [
        "Comprehensive admission or awareness campaign",
        "Campus promotional video & student interview reels",
        "High-volume lead handling & WhatsApp routing",
        "On-site photography and event coverage"
      ],
      popular: false
    }
  ];

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
                  {iconMap[srv.icon] || <Sparkles size={28} />}
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

        {/* 3. Pricing Packages */}
        <div className="services-section-wrapper">
          <div className="section-header">
            <span className="section-badge">{t.services.pricingBadge}</span>
            <h2 className="section-title">{t.services.pricingTitle}</h2>
            <p className="section-subtitle">Transparent engagement models without hidden commissions.</p>
          </div>

          <div className="pricing-grid">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`mindrisers-card ${tier.popular ? 'pricing-card-featured' : ''}`} 
                style={{ padding: '36px 30px', position: 'relative' }}
              >
                {tier.popular && (
                  <div className="pricing-card-badge">
                    MOST POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-navy)', marginBottom: '8px' }}>{tier.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', minHeight: '40px' }}>
                  {tier.idealFor}
                </p>

                <div style={{ marginBottom: '28px' }}>
                  <span className="pricing-card-price">
                    {tier.price}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> {tier.period}</span>
                </div>

                <ul className="pricing-card-features">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle size={16} color="#1C2F4D" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                  onClick={() => openLeadModal('services')}
                >
                  <span>Select Package</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

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
