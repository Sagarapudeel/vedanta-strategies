import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Quote, 
  MapPin, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  MessageCircle,
  Building2,
  Calendar
} from 'lucide-react';

export default function CeoMessagePage({ currentLang, siteContent, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  const ceoName = getLangText(siteContent?.about, 'ceoName', currentLang) || 'Er. Suman Adhikari';
  const ceoTitle = getLangText(siteContent?.about, 'ceoTitle', currentLang) || (
    currentLang === 'ne' ? 'संस्थापक तथा प्रमुख कार्यकारी अधिकृत' : 'Founder & Chief Executive Officer'
  );
  const ceoBio = getLangText(siteContent?.about, 'ceoBio', currentLang) || (
    currentLang === 'ne'
      ? 'इन्जिनियर, रणनीतिक सल्लाहकार तथा प्रविधि प्रशिक्षक जसले नेपालमा व्यावहारिक कार्यस्थल सीप विकास र प्रविधि शिक्षाको नेतृत्व गरिरहनुभएको छ।'
      : 'Engineer, executive strategist, and technology educator dedicated to bridging Nepal\'s practical workforce skills gap through execution-focused pedagogy and real-world tools.'
  );
  const ceoMessage = getLangText(siteContent?.about, 'ceoMessage', currentLang) || (
    currentLang === 'ne'
      ? 'वेदान्त स्ट्राटेजिजमा हाम्रो मूल उद्देश्य सधैं स्पष्ट छ: नेपालमा औपचारिक शिक्षा र वास्तविक कार्यस्थलका सीपहरूबीचको खाडल पुर्नु। धेरै लामो समयदेखि विद्यार्थी र संघसंस्थाहरूले पुराना पाठ्यक्रम र खोक्रा प्रचारमा समय खर्चिरहेका छन्। हामीले एउटा यस्तो सिकाइ वातावरण निर्माण गरेका छौँ जहाँ प्रत्येक प्रशिक्षार्थीले आफ्नै ल्यापटपमा वास्तविक परियोजनाहरूमा काम गरेर सीप हासिल गर्छन्। चाहे तपाईं आफ्नो करिअर उकास्न खोज्दै हुनुहुन्छ वा आफ्ना शिक्षक र विद्यार्थीलाई भविष्यका प्रविधि सिकाउन चाहने संस्था, हामी तपाईंको वास्तविक प्रगतिका लागि प्रतिबद्ध छौँ।'
      : 'At Vedanta Strategies, our founding purpose has always been crystal clear: to close the painful gap between academic credentials and real, productive workplace skills in Nepal. For too long, students and organizations have invested time in outdated syllabi and hollow buzzwords. We founded Vedanta to create an environment where every trainee learns on their own machine, works through actual live case studies, and leaves with skills they can deploy the very next day. Whether you are an individual wanting to master AI workflows or an educational institution looking to transform your faculty and student readiness, we are deeply committed to your measurable progress.'
  );

  const ceoPhoto = siteContent?.about?.ceoPhoto || '/images/ceo.jpg';

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">


        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'नेतृत्वको सन्देश' : 'LEADERSHIP PERSPECTIVE'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'प्रमुख कार्यकारी अधिकृत (CEO) को सन्देश' : 'Message from the Founder & CEO'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'नेपालमा सीप विकास, प्रविधि शिक्षा र संस्थागत रूपान्तरणबारे संस्थापकको दृष्टिकोण।'
              : 'Our founding philosophy, commitment to hands-on rigor, and long-term vision for Nepal\'s digital workforce.'}
          </p>
        </div>

        {/* Executive Letter Grid */}
        <div 
          className="mindrisers-card" 
          style={{ 
            padding: '48px', 
            background: 'linear-gradient(145deg, #ffffff 0%, #fcfbf9 100%)',
            border: '1px solid rgba(28, 47, 77, 0.4)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            marginBottom: '64px'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'start' }}>
            
            {/* Left: CEO Portrait with Subtle Luxury Animation */}
            <div>
              <div className="ceo-portrait-frame">
                <img 
                  src={ceoPhoto} 
                  alt={`${ceoName} - ${ceoTitle}`} 
                  className="ceo-img"
                  onError={(e) => {
                    // Fallback to stylized monogram if image link fails
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.style.padding = '80px 20px';
                      e.target.parentElement.style.textAlign = 'center';
                      e.target.parentElement.innerHTML = '<div style="font-size: 3rem; font-weight: 800; color: var(--brand-navy);">SA</div><div style="color: #fff; font-weight: 700; margin-top: 10px;">Er. Suman Adhikari</div>';
                    }
                  }}
                />
              </div>

              {/* CEO Identity Meta Box */}
              <div style={{ marginTop: '20px', textAlign: 'center', background: '#ffffff', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '4px', fontWeight: '800' }}>
                  {ceoName}
                </h3>
                <div style={{ color: 'var(--brand-navy)', fontSize: '0.92rem', fontWeight: '700', marginBottom: '6px' }}>
                  {ceoTitle}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--brand-navy)" />
                  <span>Bagbazar, Kathmandu 44600, Nepal</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', lineHeight: '1.5' }}>
                  {ceoBio}
                </div>
              </div>
            </div>

            {/* Right: The Executive Message */}
            <div style={{ position: 'relative' }}>
              <Quote size={56} color="rgba(28, 47, 77, 0.2)" style={{ position: 'absolute', top: '-24px', left: '-16px', zIndex: 0 }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-navy)', fontWeight: '800', marginBottom: '16px' }}>
                  {currentLang === 'ne' ? 'संस्थापकको पत्र' : 'A PERSONAL LETTER TO LEARNERS & PARTNERS'}
                </div>

                <blockquote style={{ fontSize: '1.12rem', color: 'var(--brand-navy)', lineHeight: '1.9', fontStyle: 'italic', marginBottom: '28px', margin: 0, fontWeight: '500' }}>
                  "{ceoMessage}"
                </blockquote>

                <div style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: '1.8', marginBottom: '28px' }}>
                  <p style={{ marginBottom: '16px' }}>
                    {currentLang === 'ne'
                      ? 'हाम्रो उद्देश्य केवल कक्षा कोठामा विद्यार्थीलाई प्रमाणपत्र वितरण गर्नु होइन। हामी चाहन्छौं कि हाम्रा प्रत्येक प्रशिक्षार्थीले आफ्नो ल्यापटप खोलेर वास्तविक ग्राहकका लागि काम गर्न सकून्, नेपाली बजारको मनोविज्ञान बुझ्न सकून् र तत्काल आम्दानी वा संस्थागत सुधार गर्न सक्षम होउन्।'
                      : 'Our benchmark is never how many certificates we print. It is whether a student or faculty member can sit with their laptop, configure enterprise AI workflows with confidence, optimize a real advertising budget, and produce measurable outcomes for themselves or their campus.'}
                  </p>
                  <p style={{ margin: 0 }}>
                    {currentLang === 'ne'
                      ? 'तपाईं आफ्नो करिअरलाई नयाँ दिशा दिन खोज्दै हुनुहुन्छ वा आफ्ना शिक्षक र विद्यार्थीलाई भविष्यका प्रविधि सिकाउन चाहने क्याम्पस, तपाईंलाई हाम्रो बागबजार कार्यालयमा हार्दिक स्वागत छ।'
                      : 'Whether you are an individual charting a new career direction or an educational institution looking to equip your students for tomorrow’s demands, our doors at Bagbazar are always open to you.'}
                  </p>
                </div>

                {/* Credentials & Signature Line */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', paddingTop: '24px', borderTop: '2px solid rgba(28, 47, 77, 0.25)' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: 'var(--brand-navy)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
                      {ceoName}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--brand-navy)', fontWeight: '700' }}>
                      {ceoTitle} • Vedanta Strategies Pvt. Ltd.
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Bagbazar, Kathmandu 44600, Nepal
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => openLeadModal('general')}
                    >
                      <Sparkles size={14} />
                      <span>{currentLang === 'ne' ? 'परामर्शका लागि सम्पर्क' : 'Reach Out Directly'}</span>
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      <MapPin size={14} />
                      <span>{currentLang === 'ne' ? 'कार्यालय भेट्नुहोस्' : 'Visit Campus'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3 Core Principles from the CEO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div className="mindrisers-card" style={{ padding: '28px', borderLeft: '4px solid var(--brand-navy)' }}>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', marginBottom: '8px', fontWeight: '700' }}>
              {currentLang === 'ne' ? '१. अभ्यासमा आधारित सिकाइ' : '1. Zero Dry Theory'}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              No slides without execution. Every lesson requires active input on your laptop with live tools.
            </p>
          </div>

          <div className="mindrisers-card" style={{ padding: '28px', borderLeft: '4px solid var(--brand-navy)' }}>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', marginBottom: '8px', fontWeight: '700' }}>
              {currentLang === 'ne' ? '२. स्थानीय बजार सान्दर्भिकता' : '2. Built for Nepal\'s Market'}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              Workflows and ad strategies tailored for Kathmandu consumers, schools, colleges, and local companies.
            </p>
          </div>

          <div className="mindrisers-card" style={{ padding: '28px', borderLeft: '4px solid var(--brand-navy)' }}>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', marginBottom: '8px', fontWeight: '700' }}>
              {currentLang === 'ne' ? '३. प्रशिक्षकको व्यक्तिगत उत्तरदायित्व' : '3. Mentor Accountability'}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              Class sizes are limited to 15 students to guarantee individual attention on assignments and projects.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
