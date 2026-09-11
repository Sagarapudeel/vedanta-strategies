import React, { useState, useRef } from 'react';
import {
  Building2,
  Plus,
  Edit3,
  Trash2,
  Search,
  Globe,
  Save,
  X,
  CheckCircle,
  Eye,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { uploadMediaFile } from '../lib/uploadMedia';

export default function AdminPartners({ 
  partners = [], 
  addPartner, 
  updatePartner, 
  deletePartner 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  const initialForm = {
    name_en: '',
    name_ne: '',
    sub_en: '',
    sub_ne: '',
    badge: '',
    logoUrl: '',
    color: '#172642',
    bg: '#e2e8f0',
    website: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const filteredPartners = partners.filter((p) => {
    const q = searchTerm.toLowerCase();
    const nameEn = (p.name_en || p.name || '').toLowerCase();
    const nameNe = (p.name_ne || '').toLowerCase();
    const subEn = (p.sub_en || p.sub || '').toLowerCase();
    const badge = (p.badge || '').toLowerCase();
    return nameEn.includes(q) || nameNe.includes(q) || subEn.includes(q) || badge.includes(q);
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setActiveLangTab('en');
    setModalOpen(true);
  };

  const handleOpenEdit = (partner) => {
    setEditingId(partner.id);
    setFormData({
      name_en: partner.name_en || partner.name || '',
      name_ne: partner.name_ne || '',
      sub_en: partner.sub_en || partner.sub || '',
      sub_ne: partner.sub_ne || '',
      badge: partner.badge || '',
      logoUrl: partner.logoUrl || '',
      color: partner.color || '#172642',
      bg: partner.bg || '#e2e8f0',
      website: partner.website || ''
    });
    setActiveLangTab('en');
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  // Handle Local Image File Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('The chosen image file is larger than 10MB. Please choose a smaller image (PNG/JPG/SVG/WebP).');
      return;
    }

    try {
      const url = await uploadMediaFile(file, 'partners');
      setFormData((prev) => ({ ...prev, logoUrl: url }));
    } catch (err) {
      alert(err.message || 'Failed to upload partner logo.');
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name_en.trim()) {
      alert('Please enter at least the English institute name.');
      return;
    }

    const payload = {
      ...formData,
      name: formData.name_en,
      sub: formData.sub_en,
      badge: formData.badge.trim() || formData.name_en.slice(0, 3).toUpperCase()
    };

    if (editingId) {
      updatePartner(editingId, payload);
      setSuccessMsg('Partner logo successfully updated!');
    } else {
      addPartner(payload);
      setSuccessMsg('New partner logo successfully added to running marquee!');
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Remove "${name}" from the running logo marquee?`)) {
      deletePartner(id);
      setSuccessMsg('Partner logo removed.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  // Color preset options for quick styling fallback
  const colorPresets = [
    { label: 'Navy', color: '#172642', bg: '#e2e8f0' },
    { label: 'Maroon', color: '#851C2C', bg: '#fce7f3' },
    { label: 'Sky', color: '#0284c7', bg: '#e0f2fe' },
    { label: 'Gold', color: '#b45309', bg: '#fef3c7' },
    { label: 'Emerald', color: '#15803d', bg: '#dcfce7' },
    { label: 'Indigo', color: '#4f46e5', bg: '#ede9fe' },
    { label: 'Teal', color: '#0d9488', bg: '#ccfbf1' },
    { label: 'Rose', color: '#e11d48', bg: '#ffe4e6' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
            Trusted Partners & Institute Logos
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Upload official institute logo images or configure monogram fallbacks for the homepage running marquee ticker.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ padding: '12px 20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          <span>Add New Institute / Logo</span>
        </button>
      </div>

      {successMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '12px 18px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Info Banner on Display Logic */}
      <div style={{ background: 'rgba(197, 154, 63, 0.08)', border: '1px solid rgba(197, 154, 63, 0.25)', borderRadius: 'var(--radius-md)', padding: '14px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.5' }}>
          <strong style={{ color: '#fbbf24' }}>Main Section Display Rule: </strong>
          Institutions with an uploaded image will <strong>ONLY show their logo image</strong> on the homepage marquee. If no image is provided, the institute's name and monogram badge are automatically shown instead.
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
          <input
            type="text"
            placeholder="Search partners by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Showing <span style={{ color: '#fff', fontWeight: '700' }}>{filteredPartners.length}</span> of {partners.length} institutions in marquee
        </div>
      </div>

      {/* Partners Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredPartners.map((partner) => {
          const hasImage = Boolean(partner.logoUrl && partner.logoUrl.trim());
          return (
            <div 
              key={partner.id} 
              className="admin-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Partner Card Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', background: 'rgba(255,255,255,0.03)', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {hasImage ? (
                    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '6px 10px', height: '48px', minWidth: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)', flexShrink: 0 }}>
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name_en || partner.name}
                        style={{ maxHeight: '36px', maxWidth: '80px', objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div 
                      style={{ 
                        width: '46px', 
                        height: '46px', 
                        borderRadius: '50%', 
                        background: partner.bg || '#e2e8f0', 
                        color: partner.color || '#172642',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}
                    >
                      {partner.badge || (partner.name_en || partner.name || 'INS').slice(0, 3).toUpperCase()}
                    </div>
                  )}
                  
                  <div style={{ overflow: 'hidden', flex: 1 }}>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {partner.name_en || partner.name}
                    </div>
                    {partner.name_ne && (
                      <div style={{ fontSize: '0.82rem', color: '#C59A3F' }}>
                        🇳🇵 {partner.name_ne}
                      </div>
                    )}
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {partner.sub_en || partner.sub}
                    </div>
                  </div>
                </div>

                {/* Display Mode Indicator */}
                <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {hasImage ? (
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ImageIcon size={12} />
                      <span>Image Logo Only (Displayed in Ticker)</span>
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span>🔤 Text & Monogram Mode</span>
                    </span>
                  )}
                </div>

                {partner.website && (
                  <div style={{ marginBottom: '14px', fontSize: '0.8rem' }}>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ExternalLink size={12} />
                      <span>{partner.website.replace('https://', '').replace('http://', '')}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => handleOpenEdit(partner)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Edit3 size={14} />
                  <span>Edit Details / Image</span>
                </button>

                <button
                  onClick={() => handleDelete(partner.id, partner.name_en || partner.name)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#f43f5e', borderColor: 'rgba(244,63,94,0.3)' }}
                  title="Remove logo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '680px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={20} color="#C59A3F" />
                <span>{editingId ? 'Edit Partner / Institute Logo' : 'Add New Partner / Institute Logo'}</span>
              </h2>
              <button className="modal-close-btn" onClick={handleClose}>
                <X size={18} />
              </button>
            </div>

            {/* Live Ticker Preview */}
            <div style={{ marginBottom: '22px', background: '#ffffff', padding: '18px 20px', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' }}>
                  Marquee Ticker Live Preview (Clean White Background):
                </span>
                <span style={{ fontSize: '0.72rem', color: formData.logoUrl ? '#0284c7' : '#64748b', fontWeight: '700' }}>
                  {formData.logoUrl ? '● Mode: Image Only' : '● Mode: Monogram + Name'}
                </span>
              </div>

              {/* Exact Home Page Representation */}
              <div 
                className={`client-logo-item ${formData.logoUrl ? 'has-image-logo' : ''}`} 
                style={{ cursor: 'default' }}
              >
                {formData.logoUrl ? (
                  <img 
                    src={formData.logoUrl} 
                    alt="Logo Preview" 
                    className="client-logo-only-img"
                    style={{ maxHeight: '96px', maxWidth: '280px', objectFit: 'contain' }}
                  />
                ) : (
                  <>
                    <div 
                      className="client-logo-badge" 
                      style={{ background: formData.bg, color: formData.color }}
                    >
                      {formData.badge || (formData.name_en || 'INS').slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div className="client-logo-text">
                        {activeLangTab === 'en' 
                          ? (formData.name_en || 'Institute Name in English') 
                          : (formData.name_ne || formData.name_en || 'संस्थाको नाम (नेपाली)')
                        }
                      </div>
                      <div className="client-logo-sub">
                        {activeLangTab === 'en' 
                          ? (formData.sub_en || 'Location') 
                          : (formData.sub_ne || formData.sub_en || 'क्याम्पस / क्षेत्र')
                        }
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* IMAGE LOGO UPLOAD SECTION (HIGHLIGHTED) */}
            <div style={{ background: '#0a1020', border: '1px solid #233558', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label className="form-label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={16} color="#C59A3F" />
                  <span style={{ color: '#fff', fontWeight: '700' }}>Upload Logo Image File</span>
                </label>
                {formData.logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{ background: 'transparent', border: 'none', color: '#f43f5e', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={13} /> Remove Image
                  </button>
                )}
              </div>

              {/* Upload Drop Area */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                {formData.logoUrl ? (
                  <div style={{ background: '#ffffff', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', minWidth: '100px', border: '1px solid #C59A3F' }}>
                    <img 
                      src={formData.logoUrl} 
                      alt="Uploaded Logo" 
                      style={{ maxHeight: '44px', maxWidth: '120px', objectFit: 'contain' }} 
                    />
                  </div>
                ) : null}

                <div style={{ flex: 1 }}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="logoFileInput"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-outline-gold btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    <Upload size={16} />
                    <span>{formData.logoUrl ? 'Replace Image File' : 'Choose Logo Image from Computer'}</span>
                  </button>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Supports PNG, SVG, JPG, WebP. Transparent backgrounds recommended.
                  </div>
                </div>
              </div>

              {/* URL Alternative */}
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #1e2d4d' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Or enter direct Image Web URL (Optional):
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.logoUrl.startsWith('data:') ? '(Image file uploaded from computer)' : formData.logoUrl}
                  disabled={formData.logoUrl.startsWith('data:')}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                />
              </div>
            </div>

            {/* Dual Language Switcher Tabs */}
            <div className="admin-lang-tabs">
              <button
                type="button"
                className={`admin-lang-tab ${activeLangTab === 'en' ? 'active' : ''}`}
                onClick={() => setActiveLangTab('en')}
              >
                <Globe size={14} color="#C59A3F" />
                <span>🇬🇧 English Details</span>
              </button>

              <button
                type="button"
                className={`admin-lang-tab ${activeLangTab === 'ne' ? 'active' : ''}`}
                onClick={() => setActiveLangTab('ne')}
              >
                <Globe size={14} color="#851C2C" />
                <span>🇳🇵 नेपाली विवरण</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* TAB: ENGLISH */}
              {activeLangTab === 'en' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Institute / Organization Name (English) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      placeholder="e.g. Kathmandu Model College"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location / Category Tagline (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.sub_en}
                      onChange={(e) => setFormData({ ...formData, sub_en: e.target.value })}
                      placeholder="e.g. Balkumari & Bagbazar"
                    />
                  </div>
                </div>
              )}

              {/* TAB: NEPALI */}
              {activeLangTab === 'ne' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Institute / Organization Name (नेपाली नाम)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name_ne}
                      onChange={(e) => setFormData({ ...formData, name_ne: e.target.value })}
                      placeholder="जस्तै: काठमाडौं मोडेल कलेज"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location / Category Tagline (नेपाली विवरण)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.sub_ne}
                      onChange={(e) => setFormData({ ...formData, sub_ne: e.target.value })}
                      placeholder="जस्तै: बालकुमारी तथा बागबजार"
                    />
                  </div>
                </div>
              )}

              {/* Monogram Fallback Settings */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', marginTop: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>
                  Fallback Monogram Badge (Used if no image is uploaded):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Monogram / Short Badge</label>
                    <input
                      type="text"
                      maxLength={4}
                      className="form-input"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value.toUpperCase() })}
                      placeholder="e.g. KMC (2-4 letters)"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official Website URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.edu.np"
                    />
                  </div>
                </div>

                {/* Badge Color Presets */}
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="form-label">Badge Color Accent</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: preset.color, bg: preset.bg })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: formData.color === preset.color ? '2px solid #C59A3F' : '1px solid var(--border-color)',
                          background: 'rgba(255,255,255,0.03)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          color: '#fff'
                        }}
                      >
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: preset.color }} />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={16} />
                  <span>{editingId ? 'Save Changes' : 'Add Institute to Marquee'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
