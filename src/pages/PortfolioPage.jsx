import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { TrendingUp, CheckCircle, ArrowRight, Layers, Target, Award } from 'lucide-react';

export default function PortfolioPage({ currentLang, portfolioItems = [], openLeadModal }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedPillar, setSelectedPillar] = useState('All');

  const pillars = ['All', 'Learning', 'Production', 'Collaboration'];

  const filtered = portfolioItems.filter(item => 
    selectedPillar === 'All' || item.pillar.toLowerCase() === selectedPillar.toLowerCase()
  );

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            {currentLang === 'ne' ? 'विगतका परियोजना तथा उपलब्धिहरू' : 'PAST PROJECTS & RESULTS'}
          </span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'वास्तविक काम, वास्तविक नतिजा' : 'Real Work, Real Results'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne' 
              ? 'हामीले सञ्चालन गरेका व्यावहारिक तालिम ब्याचहरू, अडियो/भिडियो निर्माण र नेपालका संस्थाहरूका लागि चलाइएका मार्केटिङ अभियानका वास्तविक विवरण।'
              : "A few examples of training cohorts we've conducted, video projects we've produced, and marketing campaigns we've managed in Nepal."
            }
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {pillars.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(pillar)}
              className={`filter-tab ${selectedPillar === pillar ? 'active' : ''}`}
            >
              {pillar === 'All' 
                ? (currentLang === 'ne' ? 'सबै केस स्टडीहरू' : 'All Case Studies') 
                : `${currentLang === 'ne' ? 'स्तम्भ' : 'Pillar'}: ${pillar}`
              }
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {filtered.map((caseStudy) => (
            <div key={caseStudy.id} className="mindrisers-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--brand-navy)', background: 'var(--brand-maroon-subtle)', padding: '4px 10px', borderRadius: '4px' }}>
                  {caseStudy.pillar}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
                  {currentLang === 'ne' ? 'ग्राहक / संस्था' : 'Client'}: {caseStudy.client}
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', marginBottom: '16px', color: 'var(--brand-navy)', lineHeight: '1.3' }}>
                {getLangText(caseStudy, 'title', currentLang)}
              </h3>

              {/* Key Metric Badge */}
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(28, 47, 77, 0.1)', color: '#1C2F4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#711B1F', fontFamily: 'var(--font-heading)' }}>
                    {getLangText(caseStudy, 'metric', currentLang)}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {currentLang === 'ne' ? 'प्रमाणित प्रतिफल' : 'Verified Outcome'}
                  </div>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px', flexGrow: 1 }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '4px' }}>
                    {currentLang === 'ne' ? 'चुनौती (THE CHALLENGE):' : 'THE CHALLENGE:'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {getLangText(caseStudy, 'challenge', currentLang)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '4px' }}>
                    {currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजको समाधान:' : 'WHAT VEDANTA STRATEGIES DELIVERED:'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {getLangText(caseStudy, 'solution', currentLang)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#711B1F', marginBottom: '4px' }}>
                    {currentLang === 'ne' ? 'मापनयोग्य प्रभाव:' : 'MEASURABLE IMPACT:'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                    {getLangText(caseStudy, 'outcome', currentLang)}
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                onClick={() => openLeadModal('partnership')}
              >
                <span>{currentLang === 'ne' ? 'यस्तै समाधानका लागि सम्पर्क' : 'Request Similar Solution'}</span>
                <ArrowRight size={14} />
              </button>

            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mindrisers-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '720px', margin: '0 auto', border: '2px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--brand-navy)', marginBottom: '10px' }}>
            {currentLang === 'ne' ? 'आफ्नो क्षेत्रसँग सम्बन्धित थप उदाहरण हेर्न चाहनुहुन्छ?' : 'Want to see more examples relevant to your field?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
            {currentLang === 'ne'
              ? 'हामीले विद्यालय, कलेज, क्लिनिक र स्थानीय संस्थाहरूसँग काम गरेका छौँ। हामी तपाईंको आवश्यकता अनुसार विगतका अभियानका नतिजा देखाउन खुसी हुनेछौँ।'
              : "We've worked with schools, clinics, local brands, and development organizations across Nepal. We're happy to share relevant past campaign data and sample videos."
            }
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => openLeadModal('general')}>
            {currentLang === 'ne' ? 'हाम्रो टिमसँग परामर्श गर्नुहोस्' : 'Talk to Our Team'}
          </button>
        </div>

      </div>
    </div>
  );
}
