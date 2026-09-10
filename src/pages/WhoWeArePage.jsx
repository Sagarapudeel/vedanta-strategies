import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Target, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  MapPin, 
  Laptop, 
  TrendingUp, 
  GraduationCap,
  Award,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function WhoWeArePage({ currentLang, siteContent, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;

  const whoWeAreText = getLangText(siteContent?.about, 'whoWeAre', currentLang) || (
    currentLang === 'ne'
      ? 'वेदान्त स्ट्राटेजिज काठमाडौंको बागबजारस्थित एक अग्रणी व्यावहारिक सिकाइ एकेडेमी तथा डिजिटल परामर्श संस्था हो। हामी विद्यार्थी, कार्यरत जनशक्ति र शैक्षिक संस्थाहरूलाई व्यावहारिक एआई टुल्स, नतिजामुखी डिजिटल मार्केटिङ र संस्थागत विकासमा पोख्त बनाउँछौँ। हामी सैद्धान्तिक भाषणभन्दा वास्तविक कार्यसम्पादन, प्रशिक्षकको प्रत्यक्ष निगरानी र नेपालको डिजिटल जनशक्तिलाई सक्षम बनाउन विश्वास गर्छौं।'
      : 'Vedanta Strategies is a premier strategic learning academy and digital consulting firm located in Bagbazar, Kathmandu. We equip students, working professionals, and educational institutions with hands-on capabilities across Artificial Intelligence tools, performance digital marketing, and modern institutional management. We believe in execution over theory, mentor accountability, and building long-term capability for Nepal\'s digital workforce.'
  );

  const storyText = getLangText(siteContent?.about, 'story', currentLang) || (
    currentLang === 'ne'
      ? 'हामीले काठमाडौंमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।'
      : 'We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.'
  );

  const corePillars = [
    {
      icon: <Laptop size={22} color="var(--brand-navy)" />,
      title_en: "Hands-on Laptop Mastery",
      title_ne: "आफ्नै ल्यापटपमा प्रत्यक्ष अभ्यास",
      desc_en: "Every workflow is practiced live on your own machine. Zero theoretical lectures without practical output.",
      desc_ne: "प्रत्येक सीप आफ्नै ल्यापटपमा प्रत्यक्ष अभ्यास गरिन्छ। केवल सैद्धान्तिक व्याख्यान होइन, नतिजामुखी सिकाइ।"
    },
    {
      icon: <Users size={22} color="var(--brand-navy)" />,
      title_en: "Small Cohorts (12–15 Max)",
      title_ne: "सानो समूह (अधिकतम १२–१५)",
      desc_en: "Dedicated attention and step-by-step guidance from mentors on your specific projects and questions.",
      desc_ne: "प्रत्येक प्रशिक्षार्थीका प्रश्न र परियोजनामा प्रशिक्षकको प्रत्यक्ष निगरानी तथा व्यक्तिगत मार्गदर्शन।"
    },
    {
      icon: <TrendingUp size={22} color="var(--brand-navy)" />,
      title_en: "Live Nepali Market Case Studies",
      title_ne: "नेपाली बजारका वास्तविक केस स्टडी",
      desc_en: "We study and optimize real ad campaigns, client funnels, and workflows relevant to Kathmandu and Nepal.",
      desc_ne: "नेपाली उपभोक्ता मनोविज्ञान, स्थानीय विज्ञापन अभियान र वास्तविक बजार चुनौतीमा आधारित अध्ययन।"
    },
    {
      icon: <GraduationCap size={22} color="var(--brand-navy)" />,
      title_en: "Institutional Readiness",
      title_ne: "शैक्षिक तथा संस्थागत रूपान्तरण",
      desc_en: "Tailored bootcamps and faculty development programs designed for schools, colleges, and corporate teams.",
      desc_ne: "विद्यालय, कलेज र व्यावसायिक प्रतिष्ठानहरूका लागि लक्षित आधुनिक एआई तथा डिजिटल क्षमता विकास।"
    }
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">


        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '56px' }}>
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

        {/* Main Who We Are Grid */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="section-badge" style={{ marginBottom: 0 }}>
                  {currentLang === 'ne' ? 'संस्थागत दृष्टिकोण' : 'OUR IDENTITY & VALUES'}
                </span>
              </div>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--brand-navy)', marginBottom: '18px', fontWeight: '800' }}>
                {currentLang === 'ne' ? 'हामी को हौँ र हाम्रो दर्शन' : 'Who We Are & What Drives Us'}
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.75', marginBottom: '20px' }}>
                {whoWeAreText}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '28px' }}>
                {storyText}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ padding: '14px 22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--brand-navy)', fontFamily: 'var(--font-heading)' }}>
                    Bagbazar Campus
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Central Kathmandu Practical Lab</div>
                </div>
                <div style={{ padding: '14px 22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--brand-navy)', fontFamily: 'var(--font-heading)' }}>
                    Max 15 Trainees
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Small Hands-On Cohorts</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              {corePillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="mindrisers-card" 
                  style={{ 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    borderTop: '3px solid var(--brand-navy)'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-navy)', margin: 0, fontWeight: '700' }}>
                    {currentLang === 'ne' ? pillar.title_ne : pillar.title_en}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                    {currentLang === 'ne' ? pillar.desc_ne : pillar.desc_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus & Infrastructure Highlights */}
        <section style={{ marginBottom: '80px', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'हाम्रो क्याम्पस' : 'THE BAGBAZAR CAMPUS'}</span>
            <h2 style={{ fontSize: '1.85rem', color: 'var(--brand-navy)', fontWeight: '800', marginBottom: '12px' }}>
              {currentLang === 'ne' ? 'काठमाडौंको केन्द्रमा सुविधायुक्त सिकाइ वातावरण' : 'Centrally Located with Practical Computing Infrastructure'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.65' }}>
              {currentLang === 'ne'
                ? 'काठमाडौंको बागबजार (२७.७०३३९४९, ८५.३१७७०६५) मा अवस्थित हाम्रो केन्द्र विद्यार्थी तथा संस्थागत प्रतिनिधिहरूका लागि सहज पहुँचमा छ।'
                : 'Conveniently located at Bagbazar, Kathmandu (27.7033949, 85.3177065), our campus is designed for focused, disruption-free learning with dedicated workstation desks and gigabit fiber internet.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(28, 47, 77, 0.08)', color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Laptop size={18} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--brand-navy)', marginBottom: '6px' }}>
                {currentLang === 'ne' ? 'ल्यापटप पावर स्टेशन' : 'Dedicated Workstations'}
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                High-speed dual fiber connections and ergonomic seating tailored for multi-hour hands-on sprints.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(28, 47, 77, 0.1)', color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Users size={18} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--brand-navy)', marginBottom: '6px' }}>
                {currentLang === 'ne' ? '१२–१५ सिट मात्र' : 'Intimate Cohort Rooms'}
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                Spacious lab rooms capped strictly at 15 trainees so every mentor can walk up to your laptop screen.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(28, 47, 77, 0.1)', color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Building2 size={18} />
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--brand-navy)', marginBottom: '6px' }}>
                {currentLang === 'ne' ? 'केन्द्रीय बागबजार' : 'Central Accessibility'}
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                Accessible by public transit from anywhere across Kathmandu, Lalitpur, and Bhaktapur.
              </p>
            </div>
          </div>
        </section>

        {/* Visit Campus CTA Card */}
        <div className="mindrisers-card" style={{ padding: '44px 32px', textAlign: 'center', maxWidth: '760px', margin: '0 auto', border: '1px solid var(--border-color)', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--brand-navy)', fontWeight: '800' }}>
            {currentLang === 'ne' ? 'हाम्रो बागबजार कार्यालय आउनुहोस्' : 'Visit Our Campus at Bagbazar'}
          </h3>
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
              {currentLang === 'ne' ? 'कार्यालय ठेगाना र नक्सा' : 'View Campus Directions & Map'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
