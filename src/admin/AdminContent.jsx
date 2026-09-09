import React, { useState } from 'react';
import { Globe, Save, CheckCircle, RefreshCw, Eye, Sparkles, AlertCircle, Upload, Image, User, Camera } from 'lucide-react';

export default function AdminContent({ siteContent = {}, updateSiteContent, resetStoreToDefault }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const [formData, setFormData] = useState(() => ({
    hero: {
      badge_en: siteContent?.hero?.badge_en || 'Bagbazar, Kathmandu • Strategic Learning Hub',
      badge_ne: siteContent?.hero?.badge_ne || 'बागबजार, काठमाडौं • प्रयोगात्मक ल्याब तथा हब',
      title_en: siteContent?.hero?.title_en || 'Practical AI, Media & Digital Skills for Nepal',
      title_ne: siteContent?.hero?.title_ne || 'नेपालका लागि व्यावहारिक एआई, मिडिया तथा डिजिटल सीप',
      subtitle_en: siteContent?.hero?.subtitle_en || 'Learn practical digital tools on your own laptop at our Bagbazar campus, and grow your institution with targeted AI and marketing workflows.',
      subtitle_ne: siteContent?.hero?.subtitle_ne || 'आफ्नै ल्यापटपमा व्यावहारिक डिजिटल टुल्स सिक्नुहोस्, हाम्रो बागबजार ल्याबमा अभ्यास गर्नुहोस् र संस्थाको व्यवसाय बढाउनुहोस्।',
      searchPlaceholder_en: siteContent?.hero?.searchPlaceholder_en || 'Search courses (e.g. AI tools, video editing, social ads)...',
      searchPlaceholder_ne: siteContent?.hero?.searchPlaceholder_ne || 'कोर्स खोज्नुहोस् (जस्तै: एआई टुल्स, भिडियो सम्पादन, डिजिटल मार्केटिङ)...',
      ctaPrimary_en: siteContent?.hero?.ctaPrimary_en || 'View Training Programs',
      ctaPrimary_ne: siteContent?.hero?.ctaPrimary_ne || 'तालिम कार्यक्रमहरू हेर्नुहोस्',
      ctaSecondary_en: siteContent?.hero?.ctaSecondary_en || 'Talk to Our Team',
      ctaSecondary_ne: siteContent?.hero?.ctaSecondary_ne || 'हाम्रो टिमसँग कुरा गर्नुहोस्'
    },
    stats: siteContent?.stats || [
      { id: 'stat-1', value: '4,500+', label_en: 'Learners & Professionals Reached', label_ne: 'तालिमप्राप्त विद्यार्थी तथा कर्मचारी' },
      { id: 'stat-2', value: '28+', label_en: 'Partner Schools & Colleges', label_ne: 'सहकार्य गरिएका विद्यालय तथा कलेजहरू' },
      { id: 'stat-3', value: '50+', label_en: 'Workshops & Seminars Conducted', label_ne: 'सञ्चालित कार्यशाला तथा सेमिनारहरू' },
      { id: 'stat-4', value: '15', label_en: 'Max Students Per Batch Guarantee', label_ne: 'प्रति ब्याच अधिकतम १५ जना मात्र' }
    ],
    pillars: {
      learning_title_en: siteContent?.pillars?.learning_title_en || '1. Learning (Hands-on Training)',
      learning_title_ne: siteContent?.pillars?.learning_title_ne || '१. सिकाइ (व्यावहारिक तालिम)',
      learning_desc_en: siteContent?.pillars?.learning_desc_en || 'Small batches (max 15), guided practice on your own laptop in Bagbazar, and school workshops.',
      learning_desc_ne: siteContent?.pillars?.learning_desc_ne || 'सानो ब्याच (अधिकतम १५ जना), बागबजारमा आफ्नै ल्यापटपमा अभ्यास र विद्यालय कार्यशाला।',
      institution_title_en: siteContent?.pillars?.institution_title_en || siteContent?.pillars?.production_title_en || '2. Institutional Bootcamps',
      institution_title_ne: siteContent?.pillars?.institution_title_ne || siteContent?.pillars?.production_title_ne || '२. संस्थागत बुटक्याम्प (विद्यालय तथा कलेज)',
      institution_desc_en: siteContent?.pillars?.institution_desc_en || siteContent?.pillars?.production_desc_en || 'Customized AI tools, digital safety, and prompt engineering workshops for school and college faculties.',
      institution_desc_ne: siteContent?.pillars?.institution_desc_ne || siteContent?.pillars?.production_desc_ne || 'शिक्षक तथा विद्यार्थीहरूका लागि प्रयोगात्मक एआई, तथ्य-जाँच र अनलाइन सुरक्षा कार्यशाला।',
      collaboration_title_en: siteContent?.pillars?.collaboration_title_en || '3. Collaboration (Agency Growth)',
      collaboration_title_ne: siteContent?.pillars?.collaboration_title_ne || '३. सहकार्य (डिजिटल वृद्धि)',
      collaboration_desc_en: siteContent?.pillars?.collaboration_desc_en || 'Facebook & Instagram ad funnels directly connected to WhatsApp for colleges and local businesses.',
      collaboration_desc_ne: siteContent?.pillars?.collaboration_desc_ne || 'कलेज तथा स्थानीय व्यवसायहरूका लागि ह्वाट्सएपसँग जोडिएका लक्षित विज्ञापन अभियान।'
    },
    about: {
      story_en: siteContent?.about?.story_en || 'We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.',
      story_ne: siteContent?.about?.story_ne || 'हामीले काठमाडौंमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।',
      whoWeAre_en: siteContent?.about?.whoWeAre_en || 'Vedanta Strategies is a premier strategic learning academy and digital consulting firm located in Bagbazar, Kathmandu. We equip students, working professionals, and educational institutions with hands-on capabilities across Artificial Intelligence tools, performance digital marketing, and modern institutional management.',
      whoWeAre_ne: siteContent?.about?.whoWeAre_ne || 'वेदान्त स्ट्राटेजिज काठमाडौंको बागबजारस्थित एक अग्रणी व्यावहारिक सिकाइ एकेडेमी तथा डिजिटल परामर्श संस्था हो। हामी विद्यार्थी, कार्यरत जनशक्ति र शैक्षिक संस्थाहरूलाई व्यावहारिक एआई टुल्स, नतिजामुखी डिजिटल मार्केटिङ र संस्थागत विकासमा पोख्त बनाउँछौँ।',
      ceoName_en: siteContent?.about?.ceoName_en || 'Er. Suman Adhikari',
      ceoName_ne: siteContent?.about?.ceoName_ne || 'इ. सुमन अधिकारी',
      ceoTitle_en: siteContent?.about?.ceoTitle_en || 'Founder & Chief Executive Officer',
      ceoTitle_ne: siteContent?.about?.ceoTitle_ne || 'संस्थापक तथा प्रमुख कार्यकारी अधिकृत',
      ceoPhoto: siteContent?.about?.ceoPhoto || '/images/ceo.jpg',
      ceoBio_en: siteContent?.about?.ceoBio_en || 'Technology strategist, education innovator, and founder of Vedanta Strategies.',
      ceoBio_ne: siteContent?.about?.ceoBio_ne || 'प्रविधि रणनीतिकार, शैक्षिक नवप्रवर्तक तथा वेदान्त स्ट्राटेजिजका संस्थापक।',
      ceoMessage_en: siteContent?.about?.ceoMessage_en || 'At Vedanta Strategies, our founding purpose has always been crystal clear: to close the painful gap between academic credentials and real, productive workplace skills in Nepal. For too long, students and organizations have invested time in outdated syllabi and hollow buzzwords. We founded Vedanta to create an environment where every trainee learns on their own machine, works through actual live case studies, and leaves with skills they can deploy the very next day.',
      ceoMessage_ne: siteContent?.about?.ceoMessage_ne || 'वेदान्त स्ट्राटेजिजमा हाम्रो मूल उद्देश्य सधैं स्पष्ट छ: नेपालमा औपचारिक शिक्षा र वास्तविक कार्यस्थलका सीपहरूबीचको खाडल पुर्नु। हामीले एउटा यस्तो सिकाइ वातावरण निर्माण गरेका छौँ जहाँ प्रत्येक प्रशिक्षार्थीले आफ्नै ल्यापटपमा वास्तविक परियोजनाहरूमा काम गरेर सीप हासिल गर्छन्।'
    },
    cta: {
      title_en: siteContent?.cta?.title_en || 'Visit Our Bagbazar Campus or Discuss Your Project',
      title_ne: siteContent?.cta?.title_ne || 'हाम्रो बागबजार कार्यालय आउनुहोस् वा परियोजनाबारे छलफल गर्नुहोस्',
      desc_en: siteContent?.cta?.desc_en || 'Have a cup of tea with our mentors, check out the computer lab and recording studio, and see which program fits your goals.',
      desc_ne: siteContent?.cta?.desc_ne || 'हाम्रा प्रशिक्षकहरूसँग चिया पिउँदै कम्प्युटर ल्याब तथा स्टुडियो अवलोकन गर्नुहोस् र तपाईंको लक्ष्यअनुसारको कार्यक्रम रोज्नुहोस्।',
      btn_en: siteContent?.cta?.btn_en || 'Schedule a Free Discussion',
      btn_ne: siteContent?.cta?.btn_ne || 'निःशुल्क परामर्श समय लिनुहोस्'
    }
  }));

  const handleHeroChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  };

  const handleStatChange = (idx, field, val) => {
    setFormData(prev => {
      const nextStats = [...prev.stats];
      nextStats[idx] = { ...nextStats[idx], [field]: val };
      return { ...prev, stats: nextStats };
    });
  };

  const handlePillarChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      pillars: { ...prev.pillars, [field]: val }
    }));
  };

  const handleAboutChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: val }
    }));
  };

  const handleCeoPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Please choose an image smaller than 3MB for optimal browser performance.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        handleAboutChange('ceoPhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCtaChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: val }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateSiteContent) {
      updateSiteContent(formData);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Page Content & Bilingual Translations</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Directly author and control English & Nepali content for headlines, trust stats, pillars, and CTA banners. No auto-translation.
          </p>
        </div>

        <button 
          onClick={handleSave} 
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Save size={18} />
          <span>Save Live Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#34d399', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: '600' }}>All English & Nepali copy updated successfully! The public site now renders your exact words.</span>
        </div>
      )}

      {/* Language Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveLangTab('en')}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            border: activeLangTab === 'en' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
            background: activeLangTab === 'en' ? '#172642' : 'transparent',
            color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Globe size={16} color="#C59A3F" />
          <span>🇬🇧 English Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLangTab('ne')}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            border: activeLangTab === 'ne' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
            background: activeLangTab === 'ne' ? '#172642' : 'transparent',
            color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Globe size={16} color="#851C2C" />
          <span>🇳🇵 नेपाली सामग्री (Nepali Content)</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* SECTION 1: HERO */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#C59A3F" />
            <span>Homepage Hero Section ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label">Location / Badge Text</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.hero.badge_en : formData.hero.badge_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'e.g. Bagbazar, Kathmandu • Strategic Learning Hub' : 'जस्तै: बागबजार, काठमाडौं • प्रयोगात्मक ल्याब तथा हब'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Main Hero Headline</label>
              <input
                type="text"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: '700' }}
                value={activeLangTab === 'en' ? formData.hero.title_en : formData.hero.title_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'e.g. Practical AI, Media & Digital Skills for Nepal' : 'जस्तै: नेपालका लागि व्यावहारिक एआई, मिडिया तथा डिजिटल सीप'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hero Subtitle & Introduction</label>
              <textarea
                rows={3}
                className="form-input"
                value={activeLangTab === 'en' ? formData.hero.subtitle_en : formData.hero.subtitle_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)}
                placeholder="Clear, grounded description of what students and clients gain..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Primary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.ctaPrimary_en : formData.hero.ctaPrimary_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'ctaPrimary_en' : 'ctaPrimary_ne', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.ctaSecondary_en : formData.hero.ctaSecondary_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'ctaSecondary_en' : 'ctaSecondary_ne', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Course Search Input Placeholder</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.searchPlaceholder_en : formData.hero.searchPlaceholder_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'searchPlaceholder_en' : 'searchPlaceholder_ne', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: TRUST STATS */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            Trust Stats & Institutional Proof ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {formData.stats.map((stat, idx) => (
              <div key={stat.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <label className="form-label">Stat #{idx + 1} Number / Value</label>
                  <input
                    type="text"
                    className="form-input"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stat Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? stat.label_en : stat.label_ne}
                    onChange={(e) => handleStatChange(idx, activeLangTab === 'en' ? 'label_en' : 'label_ne', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: THREE PILLARS */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            The 3 Pillars (Learning, Production, Collaboration)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            {/* Pillar 1 */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 1: Learning & Training</h3>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Title ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.learning_title_en : formData.pillars.learning_title_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_title_en' : 'learning_title_ne', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <textarea
                  rows={2}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.learning_desc_en : formData.pillars.learning_desc_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_desc_en' : 'learning_desc_ne', e.target.value)}
                />
              </div>
            </div>

            {/* Pillar 2 */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 2: Institutional Bootcamps</h3>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Title ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.institution_title_en : formData.pillars.institution_title_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_title_en' : 'institution_title_ne', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <textarea
                  rows={2}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.institution_desc_en : formData.pillars.institution_desc_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_desc_en' : 'institution_desc_ne', e.target.value)}
                />
              </div>
            </div>

            {/* Pillar 3 */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 3: Collaboration & Growth</h3>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Title ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.collaboration_title_en : formData.pillars.collaboration_title_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_title_en' : 'collaboration_title_ne', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <textarea
                  rows={2}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.collaboration_desc_en : formData.pillars.collaboration_desc_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_desc_en' : 'collaboration_desc_ne', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ABOUT PAGE (WHO WE ARE & MESSAGE FROM CEO) */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            About Us Sections ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
          </h2>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Who We Are Narrative</label>
            <textarea
              rows={3}
              className="form-input"
              value={activeLangTab === 'en' ? formData.about.whoWeAre_en : formData.about.whoWeAre_ne}
              onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'whoWeAre_en' : 'whoWeAre_ne', e.target.value)}
              placeholder="Authoritative description of Vedanta Strategies' identity, mission, and scope..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Founding Story & Practical Philosophy</label>
            <textarea
              rows={3}
              className="form-input"
              value={activeLangTab === 'en' ? formData.about.story_en : formData.about.story_ne}
              onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'story_en' : 'story_ne', e.target.value)}
            />
          </div>

          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#C59A3F" />
                <h3 style={{ fontSize: '1.1rem', color: '#C59A3F', margin: 0 }}>
                  Executive Leadership & CEO's Message
                </h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Appears on dedicated CEO's Message page with animated luxury portrait frame
              </span>
            </div>

            {/* CEO Photo Upload & Live Animated Frame Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(197, 154, 63, 0.2)' }}>
              {/* Photo Frame Preview */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#C59A3F', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Live Animated Preview
                </div>
                <div 
                  className="ceo-portrait-frame" 
                  style={{ 
                    width: '130px', 
                    height: '160px', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    background: '#172642',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={formData.about?.ceoPhoto || '/images/ceo.jpg'}
                    alt="CEO Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.admin-ceo-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="admin-ceo-fallback" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', padding: '10px', textAlign: 'center', fontSize: '0.75rem' }}>
                    <User size={32} color="#C59A3F" />
                    <span>No image</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '8px' }}>Pulsing gold shimmer active</span>
              </div>

              {/* Photo Input Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Upload size={14} color="#C59A3F" /> Upload New CEO Portrait (File)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCeoPhotoUpload}
                    className="form-input"
                    style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    Uploads a local image directly into browser database storage (PNG, JPG, WebP &lt; 3MB).
                  </span>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Image size={14} color="#C59A3F" /> Or Image URL / Public Path
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.about?.ceoPhoto || ''}
                      onChange={(e) => handleAboutChange('ceoPhoto', e.target.value)}
                      placeholder="/images/ceo.jpg or https://..."
                      style={{ fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleAboutChange('ceoPhoto', '/images/ceo.jpg')}
                      title="Reset to default generated portrait"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO Identity Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div className="form-group">
                <label className="form-label">CEO Full Name ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.about.ceoName_en : formData.about.ceoName_ne}
                  onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'ceoName_en' : 'ceoName_ne', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">CEO Title / Designation ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.about.ceoTitle_en : formData.about.ceoTitle_ne}
                  onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'ceoTitle_en' : 'ceoTitle_ne', e.target.value)}
                />
              </div>
            </div>

            {/* CEO Short Bio / Credentials */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">CEO Short Bio & Credentials ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? (formData.about.ceoBio_en || '') : (formData.about.ceoBio_ne || '')}
                onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'ceoBio_en' : 'ceoBio_ne', e.target.value)}
                placeholder="e.g. Technology strategist, education innovator, and founder of Vedanta Strategies."
              />
            </div>

            {/* CEO Statement / Message */}
            <div className="form-group">
              <label className="form-label">Full Statement / Message ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
              <textarea
                rows={6}
                className="form-input"
                value={activeLangTab === 'en' ? formData.about.ceoMessage_en : formData.about.ceoMessage_ne}
                onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'ceoMessage_en' : 'ceoMessage_ne', e.target.value)}
                placeholder="Personal message from CEO on vision, hands-on learning, and career impact..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: CTA BANNER */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            Bagbazar Invitation CTA Banner ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Banner Headline</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.cta.title_en : formData.cta.title_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Description</label>
              <textarea
                rows={2}
                className="form-input"
                value={activeLangTab === 'en' ? formData.cta.desc_en : formData.cta.desc_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'desc_en' : 'desc_ne', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Button Text</label>
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: '300px' }}
                value={activeLangTab === 'en' ? formData.cta.btn_en : formData.cta.btn_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'btn_en' : 'btn_ne', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Changes are saved to local persistent storage and instantly reflected on the public site when visitors switch languages.
          </span>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: '700' }}>
            <Save size={18} />
            <span>Publish Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
