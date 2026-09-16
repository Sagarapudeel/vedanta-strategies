import React, { useState } from 'react';
import { initialData } from '../data/initialData';
import ImageInput from './ImageInput';

export default function AdminWhoWeAre({ siteContent = {}, updateSiteContent }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initialAbout = siteContent?.about || initialData.siteContent.about || {};

  const [formData, setFormData] = useState({
    photo: initialAbout.photo || '/images/studio.webp',
    badge_en: initialAbout.badge_en || 'WHO WE ARE',
    badge_ne: initialAbout.badge_ne || 'हाम्रो परिचय',
    title_en: initialAbout.title_en || 'Practical Learning, Strategic Thinking & Lasting Impact',
    title_ne: initialAbout.title_ne || 'व्यावहारिक सीप, रणनीतिक सोच र संस्थागत प्रभाव',
    subtitle_en: initialAbout.subtitle_en || 'A Kathmandu-based strategic learning academy and digital consulting firm committed to execution-driven training and measurable progress.',
    subtitle_ne: initialAbout.subtitle_ne || 'हामी काठमाडौंस्थित प्रविधि प्रशिक्षक तथा डिजिटल रणनीतिकारहरूको समूह हौँ जसले नतिजामुखी काममा विश्वास गर्छौं।',
    whoWeAre_en: initialAbout.whoWeAre_en || 'Vedanta Strategies is a strategic consultancy and hands-on training hub located in Bagbazar, Kathmandu. We equip students, working professionals, and organizations with deployable capabilities across Artificial Intelligence tools, performance digital marketing, and modern institutional management.',
    whoWeAre_ne: initialAbout.whoWeAre_ne || 'वेदान्त स्ट्राटेजिज काठमाडौंको बागबजारस्थित एक रणनीतिक परामर्श तथा व्यावहारिक तालिम हब हो। हामी विद्यार्थी, कार्यरत जनशक्ति र संस्थाहरूलाई व्यावहारिक एआई टुल्स, नतिजामुखी डिजिटल मार्केटिङ र संस्थागत विकासमा पोख्त बनाउँछौँ।',
    storyTitle_en: initialAbout.storyTitle_en || 'Our Story & Background',
    storyTitle_ne: initialAbout.storyTitle_ne || 'हाम्रो कथा र पृष्ठभूमि',
    story_en: initialAbout.story_en || 'We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.',
    story_ne: initialAbout.story_ne || 'हामीले काठमाडौंमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।',
    missionTitle_en: initialAbout.missionTitle_en || 'Our Mission',
    missionTitle_ne: initialAbout.missionTitle_ne || 'हाम्रो लक्ष्य (Mission)',
    mission_en: initialAbout.mission_en || 'To democratize practical AI and modern digital skills across Nepal through high-touch, laptop-first mentoring and transparent strategic execution, empowering individuals and institutions to thrive in the modern digital economy.',
    mission_ne: initialAbout.mission_ne || 'नेपालभरका विद्यार्थी, पेसाकर्मी र संस्थाहरूलाई व्यावहारिक एआई तथा आधुनिक डिजिटल सीपहरूमा प्रत्यक्ष ल्यापटप अभ्यासमार्फत दक्ष बनाई विश्वव्यापी डिजिटल अर्थतन्त्रमा प्रतिस्पर्धी बनाउनु हाम्रो मुख्य लक्ष्य हो।',
    visionTitle_en: initialAbout.visionTitle_en || 'Our Vision',
    visionTitle_ne: initialAbout.visionTitle_ne || 'हाम्रो दृष्टिकोण (Vision)',
    vision_en: initialAbout.vision_en || 'To become Nepal\'s benchmark hub for practical technology education, ethical media literacy, and performance digital growth — recognized for measurable learner success and zero inflated promises.',
    vision_ne: initialAbout.vision_ne || 'व्यावहारिक प्रविधि शिक्षा, नैतिक मिडिया साक्षरता र नतिजामुखी डिजिटल वृद्धिका लागि नेपालकै अग्रणी, भरपर्दो र व्यावहारिक सिकाइ केन्द्रको रूपमा स्थापित हुनु।',
    values: initialAbout.values || initialData.siteContent.about.values,
    differentiationTitle_en: initialAbout.differentiationTitle_en || 'Why Vedanta Strategies Feels Different',
    differentiationTitle_ne: initialAbout.differentiationTitle_ne || 'वेदान्त स्ट्राटेजिज किन फरक छ',
    differentiationSubtitle_en: initialAbout.differentiationSubtitle_en || 'How our founding philosophy and teaching model separates us from conventional training institutes in Kathmandu.',
    differentiationSubtitle_ne: initialAbout.differentiationSubtitle_ne || 'हाम्रो शिक्षण विधि र संस्थागत सोच काठमाडौंका परम्परागत इन्स्टिच्युटहरूभन्दा किन फरक छ।',
    differentiationPoints: initialAbout.differentiationPoints || initialData.siteContent.about.differentiationPoints,
    focusAreasTitle_en: initialAbout.focusAreasTitle_en || 'Our Core Areas of Focus',
    focusAreasTitle_ne: initialAbout.focusAreasTitle_ne || 'हाम्रा मुख्य कार्यक्षेत्रहरू',
    focusAreasSubtitle_en: initialAbout.focusAreasSubtitle_en || 'Three dedicated capabilities where we deliver measurable excellence for individuals and institutions.',
    focusAreasSubtitle_ne: initialAbout.focusAreasSubtitle_ne || 'हाम्रा ३ मुख्य क्षेत्रहरू जहाँ हामी व्यक्ति तथा संस्थाहरूका लागि उत्कृष्ट नतिजा प्रदान गर्दछौं।',
    focusAreas: initialAbout.focusAreas || initialData.siteContent.about.focusAreas
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // Values handlers
  const handleValueChange = (idx, field, val) => {
    setFormData(prev => {
      const next = [...(prev.values || [])];
      next[idx] = { ...next[idx], [field]: val };
      return { ...prev, values: next };
    });
  };

  const handleAddValue = () => {
    setFormData(prev => ({
      ...prev,
      values: [
        ...(prev.values || []),
        {
          id: `val-${Date.now()}`,
          title_en: 'New Core Value',
          title_ne: 'नयाँ मूल मान्यता',
          desc_en: 'Actionable description of this principle.',
          desc_ne: 'यस मान्यताको व्यावहारिक विवरण।'
        }
      ]
    }));
  };

  const handleDeleteValue = (idx) => {
    setFormData(prev => ({
      ...prev,
      values: (prev.values || []).filter((_, i) => i !== idx)
    }));
  };

  // Differentiation handlers
  const handleDiffChange = (idx, field, val) => {
    setFormData(prev => {
      const next = [...(prev.differentiationPoints || [])];
      next[idx] = { ...next[idx], [field]: val };
      return { ...prev, differentiationPoints: next };
    });
  };

  const handleAddDiff = () => {
    setFormData(prev => ({
      ...prev,
      differentiationPoints: [
        ...(prev.differentiationPoints || []),
        {
          id: `diff-${Date.now()}`,
          title_en: 'Distinct Operational Advantage',
          title_ne: 'हाम्रो विशिष्ट भिन्नता',
          desc_en: 'How we operate differently from conventional institutes.',
          desc_ne: 'हामी परम्परागत इन्स्टिच्युटहरूभन्दा कसरी फरक तरिकाले काम गर्छौं भन्ने विवरण।'
        }
      ]
    }));
  };

  const handleDeleteDiff = (idx) => {
    setFormData(prev => ({
      ...prev,
      differentiationPoints: (prev.differentiationPoints || []).filter((_, i) => i !== idx)
    }));
  };

  // Focus areas handlers
  const handleFocusChange = (idx, field, val) => {
    setFormData(prev => {
      const next = [...(prev.focusAreas || [])];
      next[idx] = { ...next[idx], [field]: val };
      return { ...prev, focusAreas: next };
    });
  };

  const handleAddFocus = () => {
    setFormData(prev => ({
      ...prev,
      focusAreas: [
        ...(prev.focusAreas || []),
        {
          id: `foc-${Date.now()}`,
          title_en: 'New Focus Area',
          title_ne: 'नयाँ कार्यक्षेत्र',
          desc_en: 'Description of the strategic service capability.',
          desc_ne: 'रणनीतिक क्षमता र सेवाको विवरण।'
        }
      ]
    }));
  };

  const handleDeleteFocus = (idx) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: (prev.focusAreas || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateSiteContent) {
      updateSiteContent({
        about: {
          ...(siteContent?.about || {}),
          ...formData
        }
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Who We Are Page Content</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Author all company background information, founding story, mission, vision, core values, differentiators, and strategic focus areas.
          </p>
        </div>

        <button 
          onClick={handleSave} 
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: '700' }}
        >
          Save Who We Are Changes
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#34d399', marginBottom: '24px' }}>
          Who We Are content updated successfully. Live page and pre-rendered SEO copies are updated.
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
            cursor: 'pointer'
          }}
        >
          English Content
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
            cursor: 'pointer'
          }}
        >
          Nepali Content
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* Section 1: Page Header */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Page Header & Overview</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Badge Text</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.badge_en : formData.badge_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Main Headline</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.title_en : formData.title_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Page Subtitle</label>
            <textarea
              rows={2}
              className="form-input"
              value={activeLangTab === 'en' ? formData.subtitle_en : formData.subtitle_ne}
              onChange={(e) => handleChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Who We Are Summary Narrative</label>
              <textarea
                rows={4}
                className="form-input"
                value={activeLangTab === 'en' ? formData.whoWeAre_en : formData.whoWeAre_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'whoWeAre_en' : 'whoWeAre_ne', e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Founding Story & Purpose</label>
              <textarea
                rows={4}
                className="form-input"
                value={activeLangTab === 'en' ? formData.story_en : formData.story_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'story_en' : 'story_ne', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <ImageInput
              label="Who We Are Feature Photo / Studio Image"
              value={formData.photo}
              onChange={(url) => handleChange('photo', url)}
              hint="Displayed on the Who We Are page alongside the company narrative."
              contextName="who-we-are-studio-bagbazar"
              folder="about"
              previewHeight={180}
            />
          </div>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Mission & Vision Statements</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Mission Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.missionTitle_en : formData.missionTitle_ne}
                  onChange={(e) => handleChange(activeLangTab === 'en' ? 'missionTitle_en' : 'missionTitle_ne', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Mission Statement</label>
                <textarea
                  rows={3}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.mission_en : formData.mission_ne}
                  onChange={(e) => handleChange(activeLangTab === 'en' ? 'mission_en' : 'mission_ne', e.target.value)}
                />
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Vision Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.visionTitle_en : formData.visionTitle_ne}
                  onChange={(e) => handleChange(activeLangTab === 'en' ? 'visionTitle_en' : 'visionTitle_ne', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Vision Statement</label>
                <textarea
                  rows={3}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.vision_en : formData.vision_ne}
                  onChange={(e) => handleChange(activeLangTab === 'en' ? 'vision_en' : 'vision_ne', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Core Values */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 4px 0' }}>Core Operating Values</h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>The foundational principles that guide teaching and execution</span>
            </div>
            <button
              type="button"
              onClick={handleAddValue}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#C59A3F', color: '#C59A3F' }}
            >
              + Add Value
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {(formData.values || []).map((val, idx) => (
              <div key={val.id || idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#C59A3F', fontWeight: '700' }}>Value #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteValue(idx)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '2px 8px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                  >
                    Delete
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? (val.title_en || '') : (val.title_ne || '')}
                    onChange={(e) => handleValueChange(idx, activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
                  <textarea
                    rows={2}
                    className="form-input"
                    value={activeLangTab === 'en' ? (val.desc_en || '') : (val.desc_ne || '')}
                    onChange={(e) => handleValueChange(idx, activeLangTab === 'en' ? 'desc_en' : 'desc_ne', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: What Sets Us Apart */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 4px 0' }}>Why Vedanta Strategies Feels Different</h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Key operational differentiators separating us from conventional institutes</span>
            </div>
            <button
              type="button"
              onClick={handleAddDiff}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#C59A3F', color: '#C59A3F' }}
            >
              + Add Differentiator
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.differentiationTitle_en : formData.differentiationTitle_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'differentiationTitle_en' : 'differentiationTitle_ne', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Subtitle</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.differentiationSubtitle_en : formData.differentiationSubtitle_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'differentiationSubtitle_en' : 'differentiationSubtitle_ne', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {(formData.differentiationPoints || []).map((pt, idx) => (
              <div key={pt.id || idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#C59A3F', fontWeight: '700' }}>Point #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteDiff(idx)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '2px 8px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                  >
                    Delete
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? (pt.title_en || '') : (pt.title_ne || '')}
                    onChange={(e) => handleDiffChange(idx, activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
                  <textarea
                    rows={2}
                    className="form-input"
                    value={activeLangTab === 'en' ? (pt.desc_en || '') : (pt.desc_ne || '')}
                    onChange={(e) => handleDiffChange(idx, activeLangTab === 'en' ? 'desc_en' : 'desc_ne', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Strategic Focus Areas */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 4px 0' }}>Core Areas of Focus</h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>The primary service pillars delivered by the company</span>
            </div>
            <button
              type="button"
              onClick={handleAddFocus}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#C59A3F', color: '#C59A3F' }}
            >
              + Add Focus Area
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.focusAreasTitle_en : formData.focusAreasTitle_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'focusAreasTitle_en' : 'focusAreasTitle_ne', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Subtitle</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.focusAreasSubtitle_en : formData.focusAreasSubtitle_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'focusAreasSubtitle_en' : 'focusAreasSubtitle_ne', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {(formData.focusAreas || []).map((area, idx) => (
              <div key={area.id || idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#C59A3F', fontWeight: '700' }}>Area #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFocus(idx)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '2px 8px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                  >
                    Delete
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? (area.title_en || '') : (area.title_ne || '')}
                    onChange={(e) => handleFocusChange(idx, activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
                  <textarea
                    rows={2}
                    className="form-input"
                    value={activeLangTab === 'en' ? (area.desc_en || '') : (area.desc_ne || '')}
                    onChange={(e) => handleFocusChange(idx, activeLangTab === 'en' ? 'desc_en' : 'desc_ne', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: '700' }}
          >
            Save Who We Are Changes
          </button>
        </div>
      </form>
    </div>
  );
}
