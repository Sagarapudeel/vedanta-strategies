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
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.services.badge}</span>
          <h1 className="section-title">{t.services.title}</h1>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        {/* 1. Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '88px' }}>
          {services.map((srv) => (
            <div key={srv.id} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {iconMap[srv.icon] || <Sparkles size={28} />}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-blue)', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                  {getLangText(srv, 'tag', currentLang) || srv.tag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--brand-navy)' }}>
                {getLangText(srv, 'title', currentLang) || srv.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                {getLangText(srv, 'shortDesc', currentLang) || srv.shortDesc}
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Key Deliverables
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(getLangArray(srv, 'deliverables', currentLang).length > 0 ? getLangArray(srv, 'deliverables', currentLang) : (srv.deliverables || [])).map((d, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                      <CheckCircle size={14} color="#10b981" /> {d}
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
        <div style={{ marginBottom: '96px' }}>
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
        <div style={{ marginBottom: '88px' }}>
          <div className="section-header">
            <span className="section-badge">{t.services.pricingBadge}</span>
            <h2 className="section-title">{t.services.pricingTitle}</h2>
            <p className="section-subtitle">Transparent engagement models without hidden commissions.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '30px' }}>
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className="mindrisers-card" 
                style={{ 
                  padding: '36px 30px', 
                  position: 'relative',
                  border: tier.popular ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                  transform: tier.popular ? 'translateY(-6px)' : 'none',
                  boxShadow: tier.popular ? '0 10px 30px rgba(197, 154, 63, 0.15)' : 'var(--shadow-sm)'
                }}
              >
                {tier.popular && (
                  <div style={{ position: 'absolute', top: '-14px', right: '24px', background: 'var(--brand-gold)', color: '#ffffff', fontWeight: '800', fontSize: '0.75rem', padding: '4px 14px', borderRadius: 'var(--radius-full)', letterSpacing: '0.05em' }}>
                    MOST POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-navy)', marginBottom: '8px' }}>{tier.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', minHeight: '40px' }}>
                  {tier.idealFor}
                </p>

                <div style={{ marginBottom: '28px' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--brand-maroon)', fontFamily: 'var(--font-heading)' }}>
                    {tier.price}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> {tier.period}</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.5' }}>
                      <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
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
        <div className="mindrisers-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '720px', margin: '0 auto', border: '2px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--brand-navy)', marginBottom: '12px' }}>Want to talk about marketing for your business?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '24px', lineHeight: '1.65' }}>
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
