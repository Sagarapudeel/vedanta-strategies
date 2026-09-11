import React, { useState } from 'react';
import { Settings, Save, CheckCircle, RotateCcw, Globe, MapPin, Clock, Megaphone } from 'lucide-react';

export default function AdminSettings({ siteSettings = {}, updateSettings, resetStoreToDefault }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    siteName: siteSettings.siteName || 'Vedanta Strategies',
    officialEmail: siteSettings.officialEmail || 'info.vedantastrategies@gmail.com',
    supportEmail: siteSettings.supportEmail || 'info.vedantastrategies@gmail.com',
    primaryPhone: siteSettings.primaryPhone || '+977 1-4421098',
    mobilePhone: siteSettings.mobilePhone || '+977 9747887598',
    whatsappNumber: siteSettings.whatsappNumber || '9779747887598',
    
    // Bilingual Campus Address
    address_en: siteSettings.address_en || siteSettings.address || 'Bagbazar, Kathmandu 44600, Nepal',
    address_ne: siteSettings.address_ne || 'बागबजार, काठमाडौं ४४६००, नेपाल',
    mapsUrl: siteSettings.mapsUrl || 'https://maps.google.com/?cid=2818761487808049031',
    mapsEmbed: siteSettings.mapsEmbed || 'https://maps.google.com/maps?cid=2818761487808049031&output=embed',
    
    // Bilingual Office Hours
    officeHours_en: siteSettings.officeHours_en || siteSettings.officeHours || 'Sunday to Friday: 9:00 AM – 6:00 PM',
    officeHours_ne: siteSettings.officeHours_ne || 'आइतबार देखि शुक्रबार: बिहान ९:०० – बेलुकी ६:००',
    
    // Bilingual Announcement Marquee
    announcementText_en: siteSettings.announcementText_en || siteSettings.announcementText || 'Admissions open for new AI & Social Media Marketing batches! Morning & evening slots available.',
    announcementText_ne: siteSettings.announcementText_ne || 'नयाँ एआई तथा डिजिटल मार्केटिङ ब्याचहरूका लागि भर्ना खुला! बिहान र बेलुकीका सिटहरू उपलब्ध।',
    
    // Social Links
    facebookUrl: siteSettings.facebookUrl || 'https://facebook.com',
    linkedinUrl: siteSettings.linkedinUrl || 'https://linkedin.com',
    instagramUrl: siteSettings.instagramUrl || 'https://instagram.com',
    youtubeUrl: siteSettings.youtubeUrl || 'https://youtube.com'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Keep backward compatible legacy fields for any older components
    const payload = {
      ...formData,
      address: formData.address_en,
      officeHours: formData.officeHours_en,
      announcementText: formData.announcementText_en
    };
    updateSettings(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all site data and settings back to original blueprint factory defaults? This cannot be undone.")) {
      resetStoreToDefault();
      alert("Database reset to factory defaults. Reloading store...");
      window.location.reload();
    }
  };

  return (
    <div style={{ maxWidth: '880px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Global Site Settings & CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Full control over campus address, operating hours, announcement bar, and social channels with dedicated English and Nepali fields.
          </p>
        </div>

        <button 
          onClick={handleSubmit} 
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Save size={18} />
          <span>Save Live Settings</span>
        </button>
      </div>

      {saved && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={18} /> Global settings & localized texts successfully saved and published!
        </div>
      )}

      {/* Language Switcher Tabs for Localized Fields */}
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
          <span>🇬🇧 English Settings & Copy</span>
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
          <span>🇳🇵 नेपाली सेटिङहरू (Nepali Settings & Copy)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Localized Campus Info Card */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#C59A3F" />
            <span>Campus Location & Announcement ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label">
                Campus & Office Address ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
              </label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.address_en : formData.address_ne}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLangTab === 'en' ? 'address_en' : 'address_ne']: e.target.value
                })}
                placeholder={activeLangTab === 'en' ? 'e.g. Bagbazar, Kathmandu 44600, Nepal' : 'जस्तै: बागबजार, काठमाडौं ४४६००, नेपाल'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Google Maps Link / CID URL</label>
              <input
                type="text"
                className="form-input"
                value={formData.mapsUrl}
                onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                placeholder="https://maps.google.com/?cid=2818761487808049031"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Operating Hours ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
              </label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.officeHours_en : formData.officeHours_ne}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLangTab === 'en' ? 'officeHours_en' : 'officeHours_ne']: e.target.value
                })}
                placeholder={activeLangTab === 'en' ? 'e.g. Sunday to Friday: 9:00 AM – 6:00 PM' : 'जस्तै: आइतबार देखि शुक्रबार: बिहान ९:०० – बेलुकी ६:००'}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Megaphone size={14} color="#f59e0b" />
                <span>Homepage Marquee Announcement Banner ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.announcementText_en : formData.announcementText_ne}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLangTab === 'en' ? 'announcementText_en' : 'announcementText_ne']: e.target.value
                })}
                placeholder={activeLangTab === 'en' ? 'e.g. Admissions open for new AI batches! Morning & evening slots available.' : 'जस्तै: नयाँ एआई तथा डिजिटल मार्केटिङ ब्याचहरूका लागि भर्ना खुला!'}
              />
            </div>
          </div>
        </div>

        {/* Global Contact & Telecommunications Card */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '18px' }}>
            Contact Telecommunications & Routing
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Official Primary Email</label>
              <input
                type="email"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Support / Admissions Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Landline Phone (Kathmandu)</label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Direct Mobile Number</label>
              <input
                type="text"
                value={formData.mobilePhone}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  mobilePhone: e.target.value, 
                  whatsappNumber: e.target.value.replace(/[^0-9]/g, '') 
                })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Number (Digits with Country Code)</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="form-input"
                placeholder="e.g. 9779801234567"
              />
            </div>
          </div>
        </div>

        {/* Social Media Channels Card */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '18px' }}>
            Social Media Handles & Links
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Facebook Page URL</label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">LinkedIn Page URL</label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Instagram Profile URL</label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">YouTube Channel URL</label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{ color: '#f43f5e', borderColor: 'rgba(244,63,94,0.3)' }}
          >
            <RotateCcw size={14} /> Reset Database to Factory Defaults
          </button>

          <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: '700' }}>
            <Save size={18} /> Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}
