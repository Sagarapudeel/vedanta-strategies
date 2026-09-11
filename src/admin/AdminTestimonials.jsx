import React, { useState } from 'react';
import { MessageSquare, PlusCircle, Trash2, Edit2, Globe, CheckCircle } from 'lucide-react';
import ImageInput from './ImageInput';

export default function AdminTestimonials({ 
  testimonials = [], 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    author: '',
    role_en: '',
    role_ne: '',
    type: 'School Partner',
    quote_en: '',
    quote_ne: '',
    photo: '',
    avatar: 'VS'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setActiveLangTab('en');
    setFormData({
      author: '',
      role_en: '',
      role_ne: '',
      type: 'School Partner',
      quote_en: '',
      quote_ne: '',
      photo: '',
      avatar: 'VS'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setActiveLangTab('en');
    setFormData({
      author: item.author || '',
      role_en: item.role_en || item.role || '',
      role_ne: item.role_ne || '',
      type: item.type || 'School Partner',
      quote_en: item.quote_en || item.quote || '',
      quote_ne: item.quote_ne || '',
      photo: item.photo || '',
      avatar: item.avatar || (item.author ? item.author.slice(0, 2).toUpperCase() : 'VS')
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      author: formData.author,
      role: formData.role_en,
      role_en: formData.role_en,
      role_ne: formData.role_ne,
      type: formData.type,
      quote: formData.quote_en,
      quote_en: formData.quote_en,
      quote_ne: formData.quote_ne,
      photo: formData.photo || '',
      avatar: formData.avatar || (formData.author ? formData.author.slice(0, 2).toUpperCase() : 'VS')
    };

    if (editingItem && updateTestimonial) {
      updateTestimonial(editingItem.id, payload);
    } else if (addTestimonial) {
      addTestimonial(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Testimonials & Institutional Proof</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Curate verified student and partner endorsements in both English and Nepali.
          </p>
        </div>

        {addTestimonial && (
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={18} /> Add Testimonial
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {testimonials.map((t) => (
          <div key={t.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="course-category-badge">{t.type}</span>
            </div>

            <p style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '14px', flexGrow: 1 }}>
              "{t.quote_en || t.quote}"
            </p>

            {t.quote_ne && (
              <p style={{ color: '#fbbf24', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: '1.55', marginBottom: '16px', borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
                🇳🇵 "{t.quote_ne}"
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '68px', height: '80px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800', flexShrink: 0, overflow: 'hidden' }}>
                  {t.photo ? (
                    <img src={t.photo} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    (t.avatar || (t.author ? t.author.slice(0, 2).toUpperCase() : 'VS'))
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{t.author}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {t.role_en || t.role}
                  </div>
                  {t.role_ne && (
                    <div style={{ color: '#f59e0b', fontSize: '0.75rem' }}>
                      {t.role_ne}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '4px 8px' }}
                  title="Edit Testimonial"
                >
                  <Edit2 size={14} />
                </button>
                {deleteTestimonial && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete testimonial from ${t.author}?`)) {
                        deleteTestimonial(t.id);
                      }
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                    title="Delete Testimonial"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="#f59e0b" />
              <span>{editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}</span>
            </h2>

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
                🇬🇧 English Review
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
                🇳🇵 Nepali Review (नेपाली)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Dr. Ramesh Khadka"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Endorsement Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-select"
                  >
                    <option value="School Partner">School Partner</option>
                    <option value="Production Client">Production Client</option>
                    <option value="Course Student">Course Student</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <ImageInput
                  label="Author Photo (Upload or URL)"
                  value={formData.photo}
                  onChange={(v) => setFormData({ ...formData, photo: v })}
                  hint="Shown as a circular portrait on the testimonial card. Leave empty to show initials instead."
                  previewHeight={110}
                />
              </div>

              {activeLangTab === 'en' ? (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Role & Affiliation (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.role_en}
                      onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Principal, Kathmandu Model College"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Quote / Testimonial (English) *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.quote_en}
                      onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                      className="form-input"
                      placeholder="What did they say about Vedanta Strategies in English?"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">पद तथा संस्था (नेपाली)</label>
                    <input
                      type="text"
                      value={formData.role_ne}
                      onChange={(e) => setFormData({ ...formData, role_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: प्रधानाध्यापक, काठमाडौं मोडल कलेज"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">प्रतिक्रिया / भनाइ (नेपाली)</label>
                    <textarea
                      rows={3}
                      value={formData.quote_ne}
                      onChange={(e) => setFormData({ ...formData, quote_ne: e.target.value })}
                      className="form-input"
                      placeholder="वेदान्त स्ट्राटेजिजबारे नेपालीमा उहाँहरूको अनुभव..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
