import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Quote, 
  Target, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  MapPin, 
  Laptop, 
  TrendingUp, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function AboutPage({ currentLang, siteContent, teamMembers = [], openLeadModal, setActivePage }) {
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

  const ceoName = getLangText(siteContent?.about, 'ceoName', currentLang) || 'Er. Suman Adhikari';
  const ceoTitle = getLangText(siteContent?.about, 'ceoTitle', currentLang) || (
    currentLang === 'ne' ? 'संस्थापक तथा प्रमुख कार्यकारी अधिकृत' : 'Founder & Chief Executive Officer'
  );
  const ceoMessage = getLangText(siteContent?.about, 'ceoMessage', currentLang) || (
    currentLang === 'ne'
      ? 'वेदान्त स्ट्राटेजिजमा हाम्रो मूल उद्देश्य सधैं स्पष्ट छ: नेपालमा औपचारिक शिक्षा र वास्तविक कार्यस्थलका सीपहरूबीचको खाडल पुर्नु। धेरै लामो समयदेखि विद्यार्थी र संघसंस्थाहरूले पुराना पाठ्यक्रम र खोक्रा प्रचारमा समय खर्चिरहेका छन्। हामीले एउटा यस्तो सिकाइ वातावरण निर्माण गरेका छौँ जहाँ प्रत्येक प्रशिक्षार्थीले आफ्नै ल्यापटपमा वास्तविक परियोजनाहरूमा काम गरेर सीप हासिल गर्छन्। चाहे तपाईं आफ्नो करिअर उकास्न खोज्दै हुनुहुन्छ वा आफ्ना शिक्षक र विद्यार्थीलाई भविष्यका प्रविधि सिकाउन चाहने संस्था, हामी तपाईंको वास्तविक प्रगतिका लागि प्रतिबद्ध छौँ।'
      : 'At Vedanta Strategies, our founding purpose has always been crystal clear: to close the painful gap between academic credentials and real, productive workplace skills in Nepal. For too long, students and organizations have invested time in outdated syllabi and hollow buzzwords. We founded Vedanta to create an environment where every trainee learns on their own machine, works through actual live case studies, and leaves with skills they can deploy the very next day. Whether you are an individual wanting to master AI workflows or an educational institution looking to transform your faculty and student readiness, we are deeply committed to your measurable progress.'
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
        
        <div className="section-header" style={{ marginBottom: '56px' }}>
          <span className="section-badge">{currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजबारे' : 'ABOUT VEDANTA STRATEGIES'}</span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'व्यावहारिक सीप, रणनीतिक सोच र संस्थागत प्रभाव' : 'Practical Learning, Strategic Thinking & Lasting Impact'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne' 
              ? 'हामी काठमाडौंस्थित प्रविधि प्रशिक्षक तथा डिजिटल रणनीतिकारहरूको टिम हौँ जसले नतिजामुखी काममा विश्वास गर्छौं।'
              : 'A Kathmandu-based academy and digital agency committed to execution-driven training and measurable business growth.'}
          </p>
        </div>

        <section id="who-we-are" style={{ marginBottom: '88px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="section-badge" style={{ marginBottom: 0 }}>
                  {currentLang === 'ne' ? 'हाम्रो परिचय' : 'SECTION 1 • WHO WE ARE'}
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
                    Bagbazar Office
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Central Kathmandu Hub</div>
                </div>
                <div style={{ padding: '14px 22px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--brand-navy)', fontFamily: 'var(--font-heading)' }}>
                    Max 15 Trainees
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Rigorous Hands-On Batches</div>
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

        <section id="ceo-message" style={{ marginBottom: '88px' }}>
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'नेतृत्वको सन्देश' : 'SECTION 2 • LEADERSHIP PERSPECTIVE'}</span>
            <h2 className="section-title">
              {currentLang === 'ne' ? 'प्रमुख कार्यकारी अधिकृत (CEO) को सन्देश' : 'Message from the CEO'}
            </h2>
            <p className="section-subtitle">
              {currentLang === 'ne' 
                ? 'नेपालको सीप विकास र प्रविधि शिक्षाबारे संस्थापकको स्पष्ट दृष्टिकोण।'
                : 'Our founding philosophy, commitment to quality, and vision for digital capability in Nepal.'}
            </p>
          </div>

          <div 
            className="mindrisers-card" 
            style={{ 
              padding: '48px', 
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(28, 47, 77, 0.35)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              
              <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color)', paddingRight: '20px' }}>
                <div 
                  style={{ 
                    width: '110px', 
                    height: '110px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-navy) 100%)', 
                    border: '3px solid var(--brand-navy)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px auto', 
                    fontSize: '2.2rem', 
                    fontWeight: '800', 
                    color: '#ffffff',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  SA
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-navy)', marginBottom: '4px', fontWeight: '800' }}>
                  {ceoName}
                </h3>
                <div style={{ color: 'var(--brand-navy)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px' }}>
                  {ceoTitle}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--brand-navy)" />
                  <span>Bagbazar, Kathmandu, Nepal</span>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <Quote size={40} color="rgba(28, 47, 77, 0.25)" style={{ position: 'absolute', top: '-18px', left: '-12px', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <blockquote style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px', margin: 0 }}>
                    "{ceoMessage}"
                  </blockquote>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ width: '4px', height: '32px', background: 'var(--brand-navy)', borderRadius: '2px' }} />
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--brand-navy)', fontSize: '0.95rem' }}>{ceoName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vedanta Strategies Pvt. Ltd.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="team" style={{ marginBottom: '88px' }}>
          <div className="section-header">
            <span className="section-badge">{currentLang === 'ne' ? 'हाम्रो नेतृत्व तथा प्रशिक्षकहरू' : 'SECTION 3 • OUR TEAM'}</span>
            <h2 className="section-title">
              {currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजको टिम' : 'The People Behind Vedanta Strategies'}
            </h2>
            <p className="section-subtitle">
              {currentLang === 'ne'
                ? 'हामी प्रविधि, डिजिटल मार्केटिङ तथा संस्थागत रणनीतिमा प्रत्यक्ष कार्यरत विशेषज्ञहरूको समूह हौँ।'
                : 'We are hands-on practitioners, engineers, and digital marketing leaders who manage live operations every day.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="mindrisers-card" style={{ padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{ 
                    width: '76px', 
                    height: '76px', 
                    borderRadius: '50%', 
                    background: 'rgba(28, 47, 77, 0.08)', 
                    border: '2px solid var(--brand-navy)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px auto', 
                    fontSize: '1.55rem', 
                    fontWeight: '800', 
                    color: 'var(--brand-navy)' 
                  }}
                >
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--brand-navy)', fontWeight: '700' }}>
                  {member.name}
                </h3>
                <div style={{ color: 'var(--brand-navy)', fontSize: '0.86rem', fontWeight: '700', marginBottom: '6px' }}>
                  {getLangText(member, 'role', currentLang) || member.role}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--brand-navy-light)', marginBottom: '14px', fontWeight: '600' }}>
                  {getLangText(member, 'specialty', currentLang) || member.specialty}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                  {getLangText(member, 'bio', currentLang) || member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mindrisers-card" style={{ padding: '44px 32px', textAlign: 'center', maxWidth: '760px', margin: '0 auto', border: '1px solid var(--border-color)', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--brand-navy)', fontWeight: '800' }}>
            {currentLang === 'ne' ? 'हामीलाई भेट्नुहोस्' : 'Visit Us'}
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
              {currentLang === 'ne' ? 'कार्यालय ठेगाना र नक्सा' : 'Get Directions'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
