import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Layers, TrendingUp, Globe, CheckCircle } from 'lucide-react';

export default function AdminPortfolio({ 
  portfolioItems = [], 
  addPortfolio, 
  updatePortfolio, 
  deletePortfolio 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    title_en: '',
    title_ne: '',
    pillar: 'Collaboration',
    client: '',
    metric_en: '+250% Growth',
    metric_ne: '+२५०% वृद्धि',
    challenge_en: '',
    challenge_ne: '',
    solution_en: '',
    solution_ne: '',
    outcome_en: '',
    outcome_ne: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setActiveLangTab('en');
    setFormData({
      title_en: '',
      title_ne: '',
      pillar: 'Collaboration',
      client: '',
      metric_en: '',
      metric_ne: '',
      challenge_en: '',
      challenge_ne: '',
      solution_en: '',
      solution_ne: '',
      outcome_en: '',
      outcome_ne: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setActiveLangTab('en');
    setFormData({
      title_en: item.title_en || item.title || '',
      title_ne: item.title_ne || '',
      pillar: item.pillar || 'Collaboration',
      client: item.client || '',
      metric_en: item.metric_en || item.metric || '',
      metric_ne: item.metric_ne || '',
      challenge_en: item.challenge_en || item.challenge || '',
      challenge_ne: item.challenge_ne || '',
      solution_en: item.solution_en || item.solution || '',
      solution_ne: item.solution_ne || '',
      outcome_en: item.outcome_en || item.outcome || '',
      outcome_ne: item.outcome_ne || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title_en,
      title_en: formData.title_en,
      title_ne: formData.title_ne,
      pillar: formData.pillar,
      client: formData.client,
      metric: formData.metric_en,
      metric_en: formData.metric_en,
      metric_ne: formData.metric_ne,
      challenge: formData.challenge_en,
      challenge_en: formData.challenge_en,
      challenge_ne: formData.challenge_ne,
      solution: formData.solution_en,
      solution_en: formData.solution_en,
      solution_ne: formData.solution_ne,
      outcome: formData.outcome_en,
      outcome_en: formData.outcome_en,
      outcome_ne: formData.outcome_ne
    };

    if (editingItem && updatePortfolio) {
      updatePortfolio(editingItem.id, payload);
    } else if (addPortfolio) {
      addPortfolio(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Portfolio & Case Studies</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Showcase verified client case studies, metrics, and institutional impact stories with human-crafted English & Nepali copy.
          </p>
        </div>

        {addPortfolio && (
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={18} />
            <span>Add Case Study</span>
          </button>
        )}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Case Study Title & Summary</th>
              <th>Pillar</th>
              <th>Client / Partner</th>
              <th>Verified Metric</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolioItems.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{p.title_en || p.title}</div>
                  {p.title_ne && (
                    <div style={{ fontSize: '0.82rem', color: '#f59e0b', marginTop: '2px' }}>
                      🇳🇵 {p.title_ne}
                    </div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {p.outcome_en || p.outcome?.substring(0, 75)}...
                  </div>
                </td>
                <td>
                  <span className="course-category-badge">{p.pillar}</span>
                </td>
                <td style={{ color: 'var(--text-light)' }}>{p.client}</td>
                <td>
                  <span style={{ fontWeight: '800', color: '#10b981', fontSize: '0.95rem' }}>
                    {p.metric_en || p.metric}
                  </span>
                  {p.metric_ne && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {p.metric_ne}
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Edit Case Study"
                    >
                      <Edit2 size={14} />
                    </button>
                    {deletePortfolio && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete case study "${p.title_en || p.title}"?`)) {
                            deletePortfolio(p.id);
                          }
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                        title="Delete Case Study"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#f59e0b" />
              <span>{editingItem ? 'Edit Case Study' : 'Add New Case Study'}</span>
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
                🇬🇧 English Version
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
                🇳🇵 Nepali Version (नेपाली)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Client / Institution Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Kathmandu Model College"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Core Pillar</label>
                  <select
                    value={formData.pillar}
                    onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                    className="form-select"
                  >
                    <option value="Collaboration">Collaboration (Digital Marketing)</option>
                    <option value="Learning">Learning (Hands-on Training)</option>
                    <option value="Production">Production (Studio Media)</option>
                  </select>
                </div>
              </div>

              {activeLangTab === 'en' ? (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Case Study Headline (English) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      placeholder="e.g. Model College: 1,200+ Student Admission Inquiries"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Key Metric Badge (English) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={formData.metric_en}
                      onChange={(e) => setFormData({ ...formData, metric_en: e.target.value })}
                      placeholder="e.g. 1,200+ Inquiries"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">The Challenge (English)</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={formData.challenge_en}
                      onChange={(e) => setFormData({ ...formData, challenge_en: e.target.value })}
                      placeholder="What was the client struggling with before contacting us?"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Our Solution (English)</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={formData.solution_en}
                      onChange={(e) => setFormData({ ...formData, solution_en: e.target.value })}
                      placeholder="What campaign, training, or production did we build?"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Verified Outcome (English) *</label>
                    <textarea
                      rows={2}
                      required
                      className="form-input"
                      value={formData.outcome_en}
                      onChange={(e) => setFormData({ ...formData, outcome_en: e.target.value })}
                      placeholder="Specific result or feedback achieved..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">शीर्षक (नेपाली) *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.title_ne}
                      onChange={(e) => setFormData({ ...formData, title_ne: e.target.value })}
                      placeholder="जस्तै: मोडल कलेज: १,२०० भन्दा बढी विद्यार्थी भर्ना सोधपुछ"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">मुख्य उपलब्धि / मेट्रिक (नेपाली)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_ne}
                      onChange={(e) => setFormData({ ...formData, metric_ne: e.target.value })}
                      placeholder="जस्तै: १,२००+ सोधपुछ"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">समस्या / चुनौती (नेपाली)</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={formData.challenge_ne}
                      onChange={(e) => setFormData({ ...formData, challenge_ne: e.target.value })}
                      placeholder="हाम्रो सहकार्यअघि संस्थाले भोगिरहेको चुनौती..."
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">हाम्रो समाधान (नेपाली)</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={formData.solution_ne}
                      onChange={(e) => setFormData({ ...formData, solution_ne: e.target.value })}
                      placeholder="हामीले सञ्चालन गरेको अभियान वा तालिम..."
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">प्राप्त परिणाम (नेपाली)</label>
                    <textarea
                      rows={2}
                      className="form-input"
                      value={formData.outcome_ne}
                      onChange={(e) => setFormData({ ...formData, outcome_ne: e.target.value })}
                      placeholder="संस्थाले पाएको वास्तविक फाइदा वा नतिजा..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
