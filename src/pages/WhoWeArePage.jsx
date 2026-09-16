import React from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';

export default function WhoWeArePage({ currentLang, siteContent, media = {}, openLeadModal, setActivePage }) {
  const t = translations[currentLang] || translations.en;
  const aboutData = siteContent?.about || {};

  const badgeText = getLangText(aboutData, 'badge', currentLang) || (
    currentLang === 'ne' ? 'हाम्रो परिचय' : 'WHO WE ARE'
  );

  const titleText = getLangText(aboutData, 'title', currentLang) || (
    currentLang === 'ne' ? 'व्यावहारिक सीप, रणनीतिक सोच र संस्थागत प्रभाव' : 'Practical Learning, Strategic Thinking & Lasting Impact'
  );

  const subtitleText = getLangText(aboutData, 'subtitle', currentLang) || (
    currentLang === 'ne'
      ? 'हामी काठमाडौंस्थित प्रविधि प्रशिक्षक तथा डिजिटल रणनीतिकारहरूको समूह हौँ जसले नतिजामुखी काममा विश्वास गर्छौं।'
      : 'A Kathmandu-based strategic learning academy and digital consulting firm committed to execution-driven training and measurable progress.'
  );

  const whoWeAreText = getLangText(aboutData, 'whoWeAre', currentLang) || (
    currentLang === 'ne'
      ? 'वेदान्त स्ट्राटेजिज काठमाडौंको बागबजारस्थित एक रणनीतिक परामर्श तथा व्यावहारिक तालिम हब हो। हामी विद्यार्थी, कार्यरत जनशक्ति र संस्थाहरूलाई व्यावहारिक एआई टुल्स, नतिजामुखी डिजिटल मार्केटिङ र संस्थागत विकासमा पोख्त बनाउँछौँ।'
      : 'Vedanta Strategies is a strategic consultancy and hands-on training hub located in Bagbazar, Kathmandu. We equip students, working professionals, and organizations with deployable capabilities across Artificial Intelligence tools, performance digital marketing, and modern institutional management.'
  );

  const storyTitle = getLangText(aboutData, 'storyTitle', currentLang) || (
    currentLang === 'ne' ? 'हाम्रो कथा र पृष्ठभूमि' : 'Our Story & Founding Purpose'
  );

  const storyText = getLangText(aboutData, 'story', currentLang) || (
    currentLang === 'ne'
      ? 'हामीले काठमाडौंमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।'
      : 'We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.'
  );

  const missionTitle = getLangText(aboutData, 'missionTitle', currentLang) || (
    currentLang === 'ne' ? 'हाम्रो लक्ष्य (Mission)' : 'Our Mission'
  );

  const missionText = getLangText(aboutData, 'mission', currentLang) || (
    currentLang === 'ne'
      ? 'नेपालभरका विद्यार्थी, पेसाकर्मी र संस्थाहरूलाई व्यावहारिक एआई तथा आधुनिक डिजिटल सीपहरूमा प्रत्यक्ष ल्यापटप अभ्यासमार्फत दक्ष बनाई विश्वव्यापी डिजिटल अर्थतन्त्रमा प्रतिस्पर्धी बनाउनु हाम्रो मुख्य लक्ष्य हो।'
      : 'To democratize practical AI and modern digital skills across Nepal through high-touch, laptop-first mentoring and transparent strategic execution, empowering individuals and institutions to thrive in the modern digital economy.'
  );

  const visionTitle = getLangText(aboutData, 'visionTitle', currentLang) || (
    currentLang === 'ne' ? 'हाम्रो दृष्टिकोण (Vision)' : 'Our Vision'
  );

  const visionText = getLangText(aboutData, 'vision', currentLang) || (
    currentLang === 'ne'
      ? 'व्यावहारिक प्रविधि शिक्षा, नैतिक मिडिया साक्षरता र नतिजामुखी डिजिटल वृद्धिका लागि नेपालकै अग्रणी, भरपर्दो र व्यावहारिक सिकाइ केन्द्रको रूपमा स्थापित हुनु।'
      : 'To become Nepal\'s benchmark hub for practical technology education, ethical media literacy, and performance digital growth — recognized for measurable learner success and zero inflated promises.'
  );

  const differentiationTitle = getLangText(aboutData, 'differentiationTitle', currentLang) || (
    currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिज किन फरक छ' : 'Why Vedanta Strategies Feels Different'
  );

  const differentiationSubtitle = getLangText(aboutData, 'differentiationSubtitle', currentLang) || (
    currentLang === 'ne'
      ? 'हाम्रो शिक्षण विधि र संस्थागत सोच काठमाडौंका परम्परागत इन्स्टिच्युटहरूभन्दा किन फरक छ।'
      : 'How our founding philosophy and teaching model separates us from conventional training institutes in Kathmandu.'
  );

  const focusAreasTitle = getLangText(aboutData, 'focusAreasTitle', currentLang) || (
    currentLang === 'ne' ? 'हाम्रा मुख्य कार्यक्षेत्रहरू' : 'Our Core Areas of Focus'
  );

  const focusAreasSubtitle = getLangText(aboutData, 'focusAreasSubtitle', currentLang) || (
    currentLang === 'ne'
      ? 'हाम्रा मुख्य कार्यक्षेत्रहरू जहाँ हामी व्यक्ति तथा संस्थाहरूका लागि उत्कृष्ट नतिजा प्रदान गर्दछौं।'
      : 'Dedicated strategic capabilities where we deliver measurable excellence for individuals and institutions.'
  );

  const values = aboutData.values || [
    {
      id: 'val-1',
      title_en: 'Execution Over Theory',
      title_ne: 'सिद्धान्तभन्दा कार्यान्वयन',
      desc_en: 'Every session takes place on live software on your own laptop. We measure learning by what you build and deploy, not slides memorized.',
      desc_ne: 'हरेक कक्षा आफ्नै ल्यापटपमा वास्तविक सफ्टवेयरमा चल्छ। हामी कण्ठ गरेका कुराभन्दा तपाईंले निर्माण गरेका वास्तविक परियोजनाबाट सिकाइ मापन गर्छौं।'
    },
    {
      id: 'val-2',
      title_en: 'Radical Transparency & Integrity',
      title_ne: 'पूर्ण पारदर्शिता र इमानदारी',
      desc_en: 'We present honest, founding-stage realities. No fabricated partner logos, no fake student numbers, and no hollow placement guarantees.',
      desc_ne: 'हामी वास्तविक तथ्यमा विश्वास गर्छौं। कुनै नक्कली साझेदार, बनावटी संख्या वा खोक्रा आश्वासन हाम्रो संस्थामा पाइँदैन।'
    },
    {
      id: 'val-3',
      title_en: 'High-Touch Mentorship',
      title_ne: 'व्यक्तिगत प्रत्यक्ष मार्गदर्शन',
      desc_en: 'Batches are strictly capped at 15 learners so mentors know each student\'s name, workflow bottlenecks, and specific career goals.',
      desc_ne: 'ब्याचहरूमा अधिकतम १५ जना मात्र राखिन्छ ताकि प्रशिक्षकले प्रत्येक प्रशिक्षार्थीको कमजोरी र व्यक्तिगत लक्ष्य बुझेर सहयोग गर्न सकून्।'
    },
    {
      id: 'val-4',
      title_en: 'Nepal-Centric Relevance',
      title_ne: 'नेपाली परिवेश अनुकूल',
      desc_en: 'We tailor workflows to local payments, local client behaviors, Nepali language computing, and the practical constraints of Nepal\'s market.',
      desc_ne: 'हामी नेपाली भुक्तानी प्रणाली, स्थानीय बजार व्यवहार, नेपाली भाषा कम्प्युटिङ र नेपालको वास्तविक व्यापारिक आवश्यकताअनुसारका सीप सिकाउँछौं।'
    }
  ];

  const differentiationPoints = aboutData.differentiationPoints || [
    {
      id: 'diff-1',
      title_en: 'Active Practitioners, Not Textbook Lecturers',
      title_ne: 'सक्रिय पेसाकर्मी प्रशिक्षकहरू',
      desc_en: 'The exact same strategists who lead your classes are actively managing ad spend, prompt engineering pipelines, and media productions for real clients daily.',
      desc_ne: 'कक्षा लिने प्रशिक्षकहरू नै दैनिक रूपमा वास्तविक विज्ञापन, एआई वर्कफ्लो र मिडिया निर्माणमा प्रत्यक्ष संलग्न पेशेवरहरू हुन्।'
    },
    {
      id: 'diff-2',
      title_en: 'Dedicated In-Person Lab in Bagbazar',
      title_ne: 'बागबजारमा सुविधायुक्त भौतिक ल्याब',
      desc_en: 'Centrally located near City Bus Park and Putalisadak with high-speed internet, power backups, and collaborative workstations.',
      desc_ne: 'सिटी बसपार्क र पुतलीसडक नजिकै उच्च गतिको इन्टरनेट, पावर ब्याकअप र शान्त वातावरणसहितको आधुनिक कम्प्युटर ल्याब।'
    },
    {
      id: 'diff-3',
      title_en: 'Integrated Learning + Studio Production',
      title_ne: 'सिकाइ र स्टुडियो प्रोडक्सनको संगम',
      desc_en: 'Under one roof, we train talent and produce professional podcasts, corporate films, and brand media campaigns.',
      desc_ne: 'एउटै छानामुनि हामी व्यावहारिक जनशक्ति तयार गर्छौं र व्यावसायिक पोडकास्ट तथा भिडियो निर्माण सेवा प्रदान गर्छौं।'
    }
  ];

  const focusAreas = aboutData.focusAreas || [
    {
      id: 'foc-1',
      title_en: 'AI & Modern Technology Literacy',
      title_ne: 'एआई तथा आधुनिक प्रविधि साक्षरता',
      desc_en: 'Empowering students, professionals, and school faculties to leverage ChatGPT, Claude, automate repetitive administrative tasks, and navigate digital tools safely.',
      desc_ne: 'विद्यार्थी, पेसाकर्मी र शिक्षकहरूलाई च्याटजीपीटी, क्लाउड, कार्यालय स्वचालन र सुरक्षित डिजिटल औजारहरू प्रयोग गर्न सक्षम बनाउने।'
    },
    {
      id: 'foc-2',
      title_en: 'Cinematic Production & Podcasts',
      title_ne: 'सिनेमाटिक भिडियो र पोडकास्ट निर्माण',
      desc_en: 'Full-cycle video storytelling, multi-camera podcast recording, and audio mastering from our Bagbazar studio facility.',
      desc_ne: 'बागबजारस्थित स्टुडियोबाट गुणस्तरीय भिडियो निर्माण, बहु-क्यामेरा पोडकास्ट रेकर्डिङ र ध्वनि सम्पादन सेवा।'
    },
    {
      id: 'foc-3',
      title_en: 'Digital Growth & Institutional Enablement',
      title_ne: 'डिजिटल रणनीति र संस्थागत परामर्श',
      desc_en: 'Meta & Google advertising, social media brand management, and customized on-campus bootcamps for colleges and schools.',
      desc_ne: 'कलेज, विद्यालय तथा व्यवसायहरूका लागि लक्षित विज्ञापन, सामाजिक सञ्जाल व्यवस्थापन र अनुकूलित तालिम।'
    }
  ];

  const photo = aboutData?.photo || media?.banners?.about || media?.campusImage || '/images/studio.webp';

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">

        {/* 1. Page Header */}
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <span className="section-badge">{badgeText}</span>
          <h1 className="section-title">{titleText}</h1>
          <p className="section-subtitle">{subtitleText}</p>
        </div>

        {/* 2. Who We Are Overview & Photo Banner */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--brand-navy)', marginBottom: '18px', fontWeight: '800', lineHeight: '1.25' }}>
                {currentLang === 'ne' ? 'हामी को हौँ' : 'Who We Are'}
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '22px' }}>
                {whoWeAreText}
              </p>

              {/* Verified Checklist (typography-driven, no icon clutter) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '10px 14px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--brand-navy)', fontWeight: '600', borderLeft: '3px solid var(--brand-navy)' }}>
                  Max 15 Students / Batch
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--brand-navy)', fontWeight: '600', borderLeft: '3px solid var(--brand-navy)' }}>
                  100% Laptop Practice
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--brand-navy)', fontWeight: '600', borderLeft: '3px solid var(--brand-navy)' }}>
                  Practitioner Mentors
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '0.88rem', color: 'var(--brand-navy)', fontWeight: '600', borderLeft: '3px solid var(--brand-navy)' }}>
                  Bagbazar Studio Lab
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', height: '360px', background: 'var(--brand-navy)' }}>
                <img
                  src={photo}
                  alt={currentLang === 'ne' ? 'वेदान्त स्ट्र्याटेजीज बागबजार काठमाडौं तालिम हब तथा स्टुडियो' : 'Vedanta Strategies training hub and production studio in Bagbazar, Kathmandu'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    if (e.target.src !== '/images/studio.webp') {
                      e.target.src = '/images/studio.webp';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Founding Story & Background */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div className="mindrisers-card" style={{ padding: '36px 32px', background: '#ffffff', border: '1px solid var(--border-color)', borderLeft: '5px solid var(--brand-gold)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--brand-navy)', fontWeight: '800' }}>
              {storyTitle}
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.85', margin: 0 }}>
              {storyText}
            </p>
          </div>
        </section>

        {/* 4. Mission & Vision Dual Cards */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Mission Card */}
            <div className="mindrisers-card" style={{ padding: '36px 28px', background: 'var(--brand-navy)', color: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(197, 154, 63, 0.3)', position: 'relative' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {currentLang === 'ne' ? 'हाम्रो उद्देश्य' : 'Core Mission'}
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', fontWeight: '800', marginBottom: '14px' }}>
                {missionTitle}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.75', margin: 0 }}>
                {missionText}
              </p>
            </div>

            {/* Vision Card */}
            <div className="mindrisers-card" style={{ padding: '36px 28px', background: '#ffffff', color: 'var(--brand-navy)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-navy)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {currentLang === 'ne' ? 'हाम्रो दृष्टिकोण' : 'Long-Term Vision'}
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', fontWeight: '800', marginBottom: '14px' }}>
                {visionTitle}
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: '1.75', margin: 0 }}>
                {visionText}
              </p>
            </div>
          </div>
        </section>

        {/* 5. Core Values */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'हाम्रा मान्यताहरू' : 'FOUNDING PRINCIPLES'}</span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--brand-navy)', fontWeight: '800', marginTop: '6px' }}>
              {currentLang === 'ne' ? 'हाम्रा मूल मान्यताहरू' : 'Our Core Operating Values'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '620px', margin: '8px auto 0' }}>
              {currentLang === 'ne'
                ? 'यी सिद्धान्तहरूले हामी कसरी पढाउँछौं, ग्राहकहरूसँग कसरी काम गर्छौं र संस्था चलाउँछौं भन्ने मार्गदर्शन गर्दछन्।'
                : 'The fundamental commitments that guide how we design our syllabi, conduct classes, and advise organizations.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {values.map((val, idx) => {
              const title = currentLang === 'ne' ? (val.title_ne || val.title_en) : val.title_en;
              const desc = currentLang === 'ne' ? (val.desc_ne || val.desc_en) : val.desc_en;

              return (
                <div 
                  key={val.id || idx} 
                  className="mindrisers-card" 
                  style={{ 
                    padding: '28px 22px', 
                    background: '#ffffff', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-navy)', fontWeight: '700', marginBottom: '10px' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Why Vedanta Strategies Feels Different (Differentiators) */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'हाम्रो भिन्नता' : 'THE DIFFERENCE'}</span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--brand-navy)', fontWeight: '800', marginTop: '6px' }}>
              {differentiationTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '640px', margin: '8px auto 0' }}>
              {differentiationSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {differentiationPoints.map((pt, idx) => {
              const title = currentLang === 'ne' ? (pt.title_ne || pt.title_en) : pt.title_en;
              const desc = currentLang === 'ne' ? (pt.desc_ne || pt.desc_en) : pt.desc_en;

              return (
                <div 
                  key={pt.id || idx} 
                  className="mindrisers-card" 
                  style={{ 
                    padding: '30px 24px', 
                    background: '#ffffff', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)',
                    borderTop: '4px solid var(--brand-navy)'
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--brand-navy)', fontWeight: '700', marginBottom: '12px' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Strategic Focus Areas */}
        <section style={{ maxWidth: '1040px', margin: '0 auto 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-badge">{currentLang === 'ne' ? 'कार्यक्षेत्रहरू' : 'WHAT WE DO'}</span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--brand-navy)', fontWeight: '800', marginTop: '6px' }}>
              {focusAreasTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '640px', margin: '8px auto 0' }}>
              {focusAreasSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {focusAreas.map((area, idx) => {
              const title = currentLang === 'ne' ? (area.title_ne || area.title_en) : area.title_en;
              const desc = currentLang === 'ne' ? (area.desc_ne || area.desc_en) : area.desc_en;

              return (
                <div 
                  key={area.id || idx} 
                  className="mindrisers-card" 
                  style={{ 
                    padding: '30px 24px', 
                    background: '#ffffff', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--brand-navy)', fontWeight: '700', marginBottom: '12px' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. Visit Us & Consultation CTA Card */}
        <div className="mindrisers-card" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: '840px', margin: '0 auto', border: '1px solid var(--border-color)', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.8rem', margin: '0 0 10px 0', color: 'var(--brand-navy)', fontWeight: '800' }}>
            {currentLang === 'ne' ? 'हामीलाई भेट्नुहोस् — बागबजार, काठमाडौं' : 'Visit Our Learning Hub in Bagbazar'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '28px', lineHeight: '1.7', maxWidth: '620px', margin: '0 auto 28px' }}>
            {currentLang === 'ne'
              ? 'हाम्रा प्रशिक्षकहरूसँग चिया पिउँदै कम्प्युटर ल्याब अवलोकन गर्नुहोस् र तपाईं वा तपाईंको संस्थाका लागि उपयुक्त कार्यक्रमबारे छलफल गर्नुहोस्। बागबजार, काठमाडौं।'
              : 'Our practical classrooms and recording studio are centrally located in Bagbazar, Kathmandu. Drop in to inspect our lab machines, discuss your career goals, or plan customized corporate workshops.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => openLeadModal('consultation')}>
              {currentLang === 'ne' ? 'निःशुल्क परामर्श बुक गर्नुहोस्' : 'Book a Free Consultation'}
            </button>
            <button className="btn btn-secondary" onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              {currentLang === 'ne' ? 'कार्यालय ठेगाना र नक्सा' : 'View Location & Map'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}