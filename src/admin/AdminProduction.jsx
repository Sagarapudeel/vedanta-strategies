import React, { useState } from 'react';
import { Film, Play, PlusCircle, Trash2, Edit2, Globe, CheckCircle } from 'lucide-react';

export default function AdminProduction({ 
  productionGallery = [], 
  addProductionItem, 
  updateProductionItem, 
  deleteProductionItem 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    title_en: '',
    title_ne: '',
    category_en: 'Podcast & Vodcast',
    category_ne: 'पोडकास्ट तथा भोडकास्ट',
    duration: '25 Mins',
    client: '',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumb: '/images/studio.jpg',
    summary_en: '',
    summary_ne: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setActiveLangTab('en');
    setFormData({
      title_en: '',
      title_ne: '',
      category_en: 'Podcast & Vodcast',
      category_ne: 'पोडकास्ट तथा भोडकास्ट',
      duration: '25 Mins',
      client: '',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumb: '/images/studio.jpg',
      summary_en: '',
      summary_ne: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setActiveLangTab('en');
    setFormData({
      title_en: item.title_en || item.title || '',
      title_ne: item.title_ne || '',
      category_en: item.category_en || item.category || 'Podcast & Vodcast',
      category_ne: item.category_ne || 'पोडकास्ट तथा भोडकास्ट',
      duration: item.duration || '25 Mins',
      client: item.client || '',
      videoUrl: item.videoUrl || '',
      thumb: item.thumb || '/images/studio.jpg',
      summary_en: item.summary_en || item.summary || '',
      summary_ne: item.summary_ne || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title_en,
      title_en: formData.title_en,
      title_ne: formData.title_ne,
      category: formData.category_en,
      category_en: formData.category_en,
      category_ne: formData.category_ne,
      duration: formData.duration,
      client: formData.client,
      videoUrl: formData.videoUrl,
      thumb: formData.thumb,
      summary: formData.summary_en,
      summary_en: formData.summary_en,
      summary_ne: formData.summary_ne
    };

    if (editingItem && updateProductionItem) {
      updateProductionItem(editingItem.id, payload);
    } else if (addProductionItem) {
      addProductionItem(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Production Studio Showcase</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage video showcases, documentaries, podcasts, and corporate client films.
          </p>
        </div>
        {addProductionItem && (
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={18} />
            <span>Add Video Production</span>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {productionGallery.map((item) => (
          <div key={item.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="course-category-badge">{item.category_en || item.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.duration}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>{item.title_en || item.title}</h3>
            {item.title_ne && (
              <div style={{ fontSize: '0.88rem', color: '#f59e0b', marginBottom: '8px' }}>
                🇳🇵 {item.title_ne}
              </div>
            )}
            <div style={{ fontSize: '0.82rem', color: '#38bdf8', marginBottom: '12px' }}>Client: {item.client}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5', flexGrow: 1, marginBottom: '16px' }}>
              {item.summary_en || item.summary}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => handleOpenEdit(item)}
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              >
                <Edit2 size={14} /> Edit
              </button>
              {deleteProductionItem && (
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm('Delete this video showcase item?')) {
                      deleteProductionItem(item.id);
                    }
                  }}
                  style={{ padding: '4px 10px', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>

            <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Film size={20} color="#f59e0b" />
              <span>{editingItem ? 'Edit Production Showcase' : 'Add Production Video'}</span>
            </h2>

            {/* Language Switch */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'en' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                  background: activeLangTab === 'en' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇬🇧 English Copy
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('ne')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'ne' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                  background: activeLangTab === 'ne' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇳🇵 Nepali Copy (नेपाली)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {activeLangTab === 'en' ? (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Video Title (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      placeholder="e.g. Kathmandu Education Talk: Episode 1"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Category (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.category_en}
                      onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
                      placeholder="Podcast & Vodcast / Documentary / Corporate Film"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Summary / Description (English)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.summary_en}
                      onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })}
                      placeholder="Brief synopsis of the video production..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">भिडियो शीर्षक (नेपाली)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.title_ne}
                      onChange={(e) => setFormData({ ...formData, title_ne: e.target.value })}
                      placeholder="जस्तै: काठमाडौं शिक्षा संवाद: भाग १"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">विधा / वर्ग (नेपाली)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.category_ne}
                      onChange={(e) => setFormData({ ...formData, category_ne: e.target.value })}
                      placeholder="पोडकास्ट / वृत्तचित्र / संस्थागत भिडियो"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">सारांश (नेपाली)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.summary_ne}
                      onChange={(e) => setFormData({ ...formData, summary_ne: e.target.value })}
                      placeholder="भिडियोको मुख्य विषयवस्तुको विवरण..."
                    />
                  </div>
                </>
              )}

              {/* Shared Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 24 Mins"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Client / Series Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Model Academy"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">YouTube Embed URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Save Changes' : 'Add to Showcase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
