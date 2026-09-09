import React, { useState } from 'react';
import { Briefcase, Edit2, CheckCircle, Globe, PlusCircle, Trash2 } from 'lucide-react';

export default function AdminServices({ services = [], updateService, addService, deleteService }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    title_en: '',
    title_ne: '',
    tag_en: '',
    tag_ne: '',
    shortDesc_en: '',
    shortDesc_ne: '',
    starter: '',
    growth: ''
  });

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setActiveLangTab('en');
    setFormData({
      title_en: srv.title_en || srv.title || '',
      title_ne: srv.title_ne || '',
      tag_en: srv.tag_en || srv.tag || '',
      tag_ne: srv.tag_ne || '',
      shortDesc_en: srv.shortDesc_en || srv.shortDesc || '',
      shortDesc_ne: srv.shortDesc_ne || '',
      starter: srv.packages?.starter || 'Rs. 25,000 / month',
      growth: srv.packages?.growth || 'Rs. 50,000 / month'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingService) return;

    const payload = {
      ...editingService,
      title: formData.title_en,
      title_en: formData.title_en,
      title_ne: formData.title_ne,
      tag: formData.tag_en,
      tag_en: formData.tag_en,
      tag_ne: formData.tag_ne,
      shortDesc: formData.shortDesc_en,
      shortDesc_en: formData.shortDesc_en,
      shortDesc_ne: formData.shortDesc_ne,
      packages: {
        ...editingService.packages,
        starter: formData.starter,
        growth: formData.growth
      }
    };

    updateService(editingService.id, payload);
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Services & Collaboration Packages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Author both English and Nepali service titles, package deliverables, and monthly retainers.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {services.map((srv) => (
          <div key={srv.id} className="admin-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="course-category-badge">{srv.tag_en || srv.tag}</span>
              <button
                onClick={() => handleOpenEdit(srv)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              >
                <Edit2 size={13} />
                <span>Edit Bilingual Copy</span>
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '4px' }}>
              {srv.title_en || srv.title}
            </h3>
            {srv.title_ne && (
              <div style={{ fontSize: '0.88rem', color: '#C59A3F', marginBottom: '10px' }}>
                🇳🇵 {srv.title_ne}
              </div>
            )}

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px', lineHeight: '1.5' }}>
              {srv.shortDesc_en || srv.shortDesc}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pricing Packages:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
                <span>Starter: {srv.packages?.starter}</span>
                <span>Growth: {srv.packages?.growth}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={14} /> Active & Live on Public Services Page
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>

            <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="#C59A3F" />
              <span>Edit Service Package (Bilingual)</span>
            </h2>

            {/* Language Switch Tabs inside Modal */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'en' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
                  background: activeLangTab === 'en' ? '#172642' : 'transparent',
                  color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇬🇧 English Content
              </button>

              <button
                type="button"
                onClick={() => setActiveLangTab('ne')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'ne' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
                  background: activeLangTab === 'ne' ? '#172642' : 'transparent',
                  color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇳🇵 नेपाली सामग्री (Nepali)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {activeLangTab === 'en' ? (
                <div>
                  <div className="form-group">
                    <label className="form-label">Service Title (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge / Category Tag (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.tag_en}
                      onChange={(e) => setFormData({ ...formData, tag_en: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Description (English)</label>
                    <textarea
                      rows={3}
                      className="form-input"
                      value={formData.shortDesc_en}
                      onChange={(e) => setFormData({ ...formData, shortDesc_en: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label className="form-label">Service Title in Nepali (नेपाली शीर्षक)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.title_ne}
                      onChange={(e) => setFormData({ ...formData, title_ne: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge Tag in Nepali (ट्याग)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.tag_ne}
                      onChange={(e) => setFormData({ ...formData, tag_ne: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Description in Nepali (विवरण)</label>
                    <textarea
                      rows={3}
                      className="form-input"
                      value={formData.shortDesc_ne}
                      onChange={(e) => setFormData({ ...formData, shortDesc_ne: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Shared Pricing Tiers */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Starter Package Pricing</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.starter}
                    onChange={(e) => setFormData({ ...formData, starter: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Growth Package Pricing</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.growth}
                    onChange={(e) => setFormData({ ...formData, growth: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: '700' }}>
                  Save Service Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
