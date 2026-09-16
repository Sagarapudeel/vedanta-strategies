import React, { useState } from 'react';
import { initialData } from '../data/initialData';
import { uploadMediaFile } from '../lib/uploadMedia';

export default function AdminCeoMessage({ siteContent = {}, updateSiteContent }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initialAbout = siteContent?.about || initialData.siteContent.about || {};

  const [formData, setFormData] = useState({
    ceoName_en: initialAbout.ceoName_en || 'Er. Suman Adhikari',
    ceoName_ne: initialAbout.ceoName_ne || 'इ. सुमन अधिकारी',
    ceoTitle_en: initialAbout.ceoTitle_en || 'Founder & Chief Executive Officer',
    ceoTitle_ne: initialAbout.ceoTitle_ne || 'संस्थापक तथा प्रमुख कार्यकारी अधिकृत',
    ceoPhoto: initialAbout.ceoPhoto || '/images/ceo.webp',
    ceoBio_en: initialAbout.ceoBio_en || 'Technology strategist, education innovator, and founder of Vedanta Strategies.',
    ceoBio_ne: initialAbout.ceoBio_ne || 'प्रविधि रणनीतिकार, शैक्षिक नवप्रवर्तक तथा वेदान्त स्ट्राटेजिजका संस्थापक।',
    ceoMessage_en: initialAbout.ceoMessage_en || 'At Vedanta Strategies, our founding purpose has always been crystal clear: to close the painful gap between academic credentials and real, productive workplace skills in Nepal. For too long, students and organizations have invested time in outdated syllabi and hollow buzzwords. We founded Vedanta to create an environment where every trainee learns on their own machine, works through actual live case studies, and leaves with skills they can deploy the very next day.',
    ceoMessage_ne: initialAbout.ceoMessage_ne || 'वेदान्त स्ट्राटेजिजमा हाम्रो मूल उद्देश्य सधैं स्पष्ट छ: नेपालमा औपचारिक शिक्षा र वास्तविक कार्यस्थलका सीपहरूबीचको खाडल पुर्नु। हामीले एउटा यस्तो सिकाइ वातावरण निर्माण गरेका छौँ जहाँ प्रत्येक प्रशिक्षार्थीले आफ्नै ल्यापटपमा वास्तविक परियोजनाहरूमा काम गरेर सीप हासिल गर्छन्।'
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleCeoPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Please choose an image smaller than 10MB.');
      return;
    }
    try {
      const ceoContext = `${formData.ceoName_en || 'er-suman-adhikari'}-founder-ceo-vedanta-strategies`;
      const url = await uploadMediaFile(file, 'content', ceoContext);
      handleChange('ceoPhoto', url);
    } catch (err) {
      alert(err.message || 'Failed to upload portrait.');
    }
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
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Message from the CEO</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Author the executive leadership message, official portrait, credentials, and vision statement.
          </p>
        </div>

        <button 
          onClick={handleSave} 
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: '700' }}
        >
          Save CEO Message
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#34d399', marginBottom: '24px' }}>
          CEO Message and leadership profile updated successfully.
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
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Portrait & Visual Presentation</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', padding: '18px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {/* Live Portrait Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#C59A3F', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                Portrait Preview
              </div>
              <div 
                className="ceo-portrait-frame" 
                style={{ 
                  width: '140px', 
                  height: '175px', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  background: '#172642',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(197, 154, 63, 0.3)'
                }}
              >
                <img
                  src={formData.ceoPhoto || '/images/ceo.webp'}
                  alt="CEO Portrait"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Photo Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Upload New Portrait Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCeoPhotoUpload}
                  className="form-input"
                  style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                  Automatically generates a clean SEO filename like vedanta-strategies-er-suman-adhikari-[tag].webp
                </span>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Or Image URL / Path</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.ceoPhoto || ''}
                    onChange={(e) => handleChange('ceoPhoto', e.target.value)}
                    placeholder="/images/ceo.webp"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleChange('ceoPhoto', '/images/ceo.webp')}
                    title="Reset to default portrait"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identity & Message Body */}
        <div className="admin-card" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>Leadership Information & Statement</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.ceoName_en : formData.ceoName_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'ceoName_en' : 'ceoName_ne', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Title / Designation</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.ceoTitle_en : formData.ceoTitle_ne}
                onChange={(e) => handleChange(activeLangTab === 'en' ? 'ceoTitle_en' : 'ceoTitle_ne', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Short Bio & Credentials</label>
            <input
              type="text"
              className="form-input"
              value={activeLangTab === 'en' ? formData.ceoBio_en : formData.ceoBio_ne}
              onChange={(e) => handleChange(activeLangTab === 'en' ? 'ceoBio_en' : 'ceoBio_ne', e.target.value)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Full Message / Vision Statement</label>
            <textarea
              rows={8}
              className="form-input"
              value={activeLangTab === 'en' ? formData.ceoMessage_en : formData.ceoMessage_ne}
              onChange={(e) => handleChange(activeLangTab === 'en' ? 'ceoMessage_en' : 'ceoMessage_ne', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: '700' }}
          >
            Save CEO Message
          </button>
        </div>
      </form>
    </div>
  );
}
