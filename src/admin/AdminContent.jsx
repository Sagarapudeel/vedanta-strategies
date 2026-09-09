import React, { useState } from 'react';
import { Globe, Save, CheckCircle, RefreshCw, Eye, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminContent({ siteContent = {}, updateSiteContent, resetStoreToDefault }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const [formData, setFormData] = useState(() => ({
    hero: {
      badge_en: siteContent?.hero?.badge_en || 'Putalisadak, Kathmandu • Hands-on Lab & Studio',
      badge_ne: siteContent?.hero?.badge_ne || 'पुतलीसडक, काठमाडौं • प्रयोगात्मक ल्याब र स्टुडियो',
      title_en: siteContent?.hero?.title_en || 'Practical AI, Media & Digital Skills for Nepal',
      title_ne: siteContent?.hero?.title_ne || 'नेपालका लागि व्यावहारिक एआई, मिडिया तथा डिजिटल सीप',
      subtitle_en: siteContent?.hero?.subtitle_en || 'Learn practical digital tools on your own laptop, record podcasts in our Putalisadak studio, and grow your institution with targeted marketing.',
      subtitle_ne: siteContent?.hero?.subtitle_ne || 'आफ्नै ल्यापटपमा व्यावहारिक डिजिटल टुल्स सिक्नुहोस्, हाम्रो पुतलीसडक स्टुडियोमा पोडकास्ट रेकर्ड गर्नुहोस् र संस्थाको व्यवसाय बढाउनुहोस्।',
      searchPlaceholder_en: siteContent?.hero?.searchPlaceholder_en || 'Search courses (e.g. AI tools, video editing, social ads)...',
      searchPlaceholder_ne: siteContent?.hero?.searchPlaceholder_ne || 'कोर्स खोज्नुहोस् (जस्तै: एआई टुल्स, भिडियो सम्पादन, डिजिटल मार्केटिङ)...',
      ctaPrimary_en: siteContent?.hero?.ctaPrimary_en || 'Explore Training Programs',
      ctaPrimary_ne: siteContent?.hero?.ctaPrimary_ne || 'तालिम कार्यक्रमहरू हेर्नुहोस्',
      ctaSecondary_en: siteContent?.hero?.ctaSecondary_en || 'Talk to Our Team',
      ctaSecondary_ne: siteContent?.hero?.ctaSecondary_ne || 'हाम्रो टिमसँग कुरा गर्नुहोस्'
    },
    stats: siteContent?.stats || [
      { id: 'stat-1', value: '4,500+', label_en: 'Learners & Professionals Reached', label_ne: 'तालिमप्राप्त विद्यार्थी तथा कर्मचारी' },
      { id: 'stat-2', value: '28+', label_en: 'Partner Schools & Colleges', label_ne: 'सहकार्य गरिएका विद्यालय तथा कलेजहरू' },
      { id: 'stat-3', value: '50+', label_en: 'Studio Podcasts & Videos Produced', label_ne: 'रेकर्ड गरिएका पोडकास्ट तथा भिडियो' },
      { id: 'stat-4', value: '15', label_en: 'Max Students Per Batch Guarantee', label_ne: 'प्रति ब्याच अधिकतम १५ जना मात्र' }
    ],
    pillars: {
      learning_title_en: siteContent?.pillars?.learning_title_en || '1. Learning (Hands-on Training)',
      learning_title_ne: siteContent?.pillars?.learning_title_ne || '१. सिकाइ (व्यावहारिक तालिम)',
      learning_desc_en: siteContent?.pillars?.learning_desc_en || 'Small batches (max 15), guided practice on your own laptop in Putalisadak, and school workshops.',
      learning_desc_ne: siteContent?.pillars?.learning_desc_ne || 'सानो ब्याच (अधिकतम १५ जना), पुतलीसडकमा आफ्नै ल्यापटपमा अभ्यास र विद्यालय कार्यशाला।',
      production_title_en: siteContent?.pillars?.production_title_en || '2. Production (Acoustic Studio)',
      production_title_ne: siteContent?.pillars?.production_title_ne || '२. निर्माण (अडियो/भिडियो स्टुडियो)',
      production_desc_en: siteContent?.pillars?.production_desc_en || 'Clean podcast recording, corporate interviews, documentaries, and social media reels.',
      production_desc_ne: siteContent?.pillars?.production_desc_ne || 'उच्च गुणस्तरीय पोडकास्ट रेकर्डिङ, संस्थागत अन्तर्वार्ता, वृत्तचित्र र सामाजिक सञ्जाल रिल्स।',
      collaboration_title_en: siteContent?.pillars?.collaboration_title_en || '3. Collaboration (Agency Growth)',
      collaboration_title_ne: siteContent?.pillars?.collaboration_title_ne || '३. सहकार्य (डिजिटल वृद्धि)',
      collaboration_desc_en: siteContent?.pillars?.collaboration_desc_en || 'Facebook & Instagram ad funnels directly connected to WhatsApp for colleges and local businesses.',
      collaboration_desc_ne: siteContent?.pillars?.collaboration_desc_ne || 'कलेज तथा स्थानीय व्यवसायहरूका लागि ह्वाट्सएपसँग जोडिएका लक्षित विज्ञापन अभियान।'
    },
    about: {
      story_en: siteContent?.about?.story_en || 'We started Vedanta Strategies in Putalisadak with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.',
      story_ne: siteContent?.about?.story_ne || 'हामीले पुतलीसडकमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।'
    },
    cta: {
      title_en: siteContent?.cta?.title_en || 'Visit Our Putalisadak Campus or Discuss Your Project',
      title_ne: siteContent?.cta?.title_ne || 'हाम्रो पुतलीसडक कार्यालय आउनुहोस् वा परियोजनाबारे छलफल गर्नुहोस्',
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
                placeholder={activeLangTab === 'en' ? 'e.g. Putalisadak, Kathmandu • Hands-on Lab & Studio' : 'जस्तै: पुतलीसडक, काठमाडौं • प्रयोगात्मक ल्याब र स्टुडियो'}
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
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 2: Production Studio</h3>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Title ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.production_title_en : formData.pillars.production_title_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'production_title_en' : 'production_title_ne', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <textarea
                  rows={2}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.pillars.production_desc_en : formData.pillars.production_desc_ne}
                  onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'production_desc_en' : 'production_desc_ne', e.target.value)}
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

        {/* SECTION 4: ABOUT STORY */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            About Our Company ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
          </h2>
          <div className="form-group">
            <label className="form-label">Founding Story & Practical Philosophy</label>
            <textarea
              rows={4}
              className="form-input"
              value={activeLangTab === 'en' ? formData.about.story_en : formData.about.story_ne}
              onChange={(e) => handleAboutChange(activeLangTab === 'en' ? 'story_en' : 'story_ne', e.target.value)}
            />
          </div>
        </div>

        {/* SECTION 5: CTA BANNER */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            Putalisadak Invitation CTA Banner ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
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
