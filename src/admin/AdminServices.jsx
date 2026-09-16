import React, { useState } from 'react';
import { 
  Briefcase, 
  Edit2, 
  CheckCircle, 
  Globe, 
  PlusCircle, 
  Trash2, 
  TrendingUp, 
  Share2, 
  Cpu, 
  Palette, 
  Video, 
  PenTool, 
  Sparkles, 
  Zap,
  ListChecks
} from 'lucide-react';
import ImageInput from './ImageInput';

export default function AdminServices({ services = [], updateService, addService, deleteService }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const defaultFormState = {
    title_en: '',
    title_ne: '',
    tag_en: 'Consulting & Strategy',
    tag_ne: 'रणनीति तथा परामर्श',
    shortDesc_en: '',
    shortDesc_ne: '',
    icon: 'TrendingUp',
    image: '',
    deliverables_en_text: '',
    deliverables_ne_text: '',
    starter: 'Rs. 25,000 / month',
    growth: 'Rs. 50,000 / month',
    enterprise: 'Custom'
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleOpenAdd = () => {
    setEditingService(null);
    setActiveLangTab('en');
    setFormData(defaultFormState);
    setModalOpen(true);
  };

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
      icon: srv.icon || 'TrendingUp',
      image: srv.image || '',
      deliverables_en_text: (srv.deliverables_en || srv.deliverables || []).join('\n'),
      deliverables_ne_text: (srv.deliverables_ne || []).join('\n'),
      starter: srv.packages?.starter || 'Rs. 25,000 / month',
      growth: srv.packages?.growth || 'Rs. 50,000 / month',
      enterprise: srv.packages?.enterprise || 'Custom'
    });
    setModalOpen(true);
  };

  const handleDelete = (srv) => {
    if (!window.confirm(`Are you sure you want to delete the service "${srv.title_en || srv.title}"?`)) {
      return;
    }
    if (deleteService) {
      deleteService(srv.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title_en) {
      alert('Please enter a service title in English.');
      return;
    }

    const deliverablesEn = formData.deliverables_en_text
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const deliverablesNe = formData.deliverables_ne_text
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      ...(editingService || {}),
      title: formData.title_en,
      title_en: formData.title_en,
      title_ne: formData.title_ne,
      tag: formData.tag_en,
      tag_en: formData.tag_en,
      tag_ne: formData.tag_ne,
      icon: formData.icon,
      image: formData.image,
      shortDesc: formData.shortDesc_en,
      shortDesc_en: formData.shortDesc_en,
      shortDesc_ne: formData.shortDesc_ne,
      deliverables: deliverablesEn,
      deliverables_en: deliverablesEn,
      deliverables_ne: deliverablesNe.length > 0 ? deliverablesNe : deliverablesEn,
      packages: {
        starter: formData.starter,
        growth: formData.growth,
        enterprise: formData.enterprise
      }
    };

    if (editingService) {
      if (updateService) updateService(editingService.id, payload);
    } else {
      if (addService) addService(payload);
    }

    setModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Services & Collaboration Packages</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Full CRUD: Add, edit, or remove client services, bilingual deliverables lists, and monthly retainer pricing tiers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', fontWeight: '700' }}
        >
          <PlusCircle size={18} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {services.map((srv) => (
          <div key={srv.id} className="admin-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="course-category-badge">{srv.tag_en || srv.tag}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(srv)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(srv)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                  title="Delete Service"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '4px' }}>
              {srv.title_en || srv.title}
            </h3>
            {srv.title_ne && (
              <div style={{ fontSize: '0.88rem', color: '#C59A3F', marginBottom: '10px' }}>
                {srv.title_ne}
              </div>
            )}

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px', lineHeight: '1.5', flexGrow: 1 }}>
              {srv.shortDesc_en || srv.shortDesc}
            </p>

            {/* Deliverables snippet */}
            {((srv.deliverables_en || srv.deliverables || []).length > 0) && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: '#C59A3F', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ListChecks size={13} />
                  <span>Key Deliverables ({(srv.deliverables_en || srv.deliverables || []).length}):</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {(srv.deliverables_en || srv.deliverables || []).slice(0, 3).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                  {(srv.deliverables_en || srv.deliverables || []).length > 3 && (
                    <li style={{ color: 'var(--text-subtle)' }}>+ {(srv.deliverables_en || srv.deliverables || []).length - 3} more</li>
                  )}
                </ul>
              </div>
            )}

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pricing Packages:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem', color: '#fff', fontWeight: '600' }}>
                <span>Starter: {srv.packages?.starter || 'Custom'}</span>
                <span>Growth: {srv.packages?.growth || 'Custom'}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
              <CheckCircle size={14} /> Active & Live on Public Services Page
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="#C59A3F" />
              <span>{editingService ? 'Edit Service Offering' : 'Add New Service Offering'}</span>
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
                English Content
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
                नेपाली सामग्री (Nepali)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {activeLangTab === 'en' ? (
                <div>
                  <div className="form-group">
                    <label className="form-label">Service Title (English) *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      placeholder="e.g. Performance Meta & Google Ads"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge / Category Tag (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.tag_en}
                      onChange={(e) => setFormData({ ...formData, tag_en: e.target.value })}
                      placeholder="e.g. Paid Advertising, Regular Content"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Description (English)</label>
                    <textarea
                      rows={3}
                      className="form-input"
                      value={formData.shortDesc_en}
                      onChange={(e) => setFormData({ ...formData, shortDesc_en: e.target.value })}
                      placeholder="What the client gets and the primary business benefit..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Key Deliverables (English — one per line)</label>
                    <textarea
                      rows={4}
                      className="form-input"
                      value={formData.deliverables_en_text}
                      onChange={(e) => setFormData({ ...formData, deliverables_en_text: e.target.value })}
                      placeholder="Ad copywriting and banner designs&#10;Weekly performance report on WhatsApp&#10;Targeting customers in Kathmandu"
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
                      placeholder="जस्तै: लक्षित मेटा र गुगल विज्ञापन"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge Tag in Nepali (ट्याग)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.tag_ne}
                      onChange={(e) => setFormData({ ...formData, tag_ne: e.target.value })}
                      placeholder="जस्तै: विज्ञापन रणनीति"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Description in Nepali (विवरण)</label>
                    <textarea
                      rows={3}
                      className="form-input"
                      value={formData.shortDesc_ne}
                      onChange={(e) => setFormData({ ...formData, shortDesc_ne: e.target.value })}
                      placeholder="नेपालीमा छोटो र प्रभावकारी विवरण..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Key Deliverables in Nepali (नेपाली बुँदाहरू — प्रति लाइन एक)</label>
                    <textarea
                      rows={4}
                      className="form-input"
                      value={formData.deliverables_ne_text}
                      onChange={(e) => setFormData({ ...formData, deliverables_ne_text: e.target.value })}
                      placeholder="विज्ञापन कपीराइटिङ र आकर्षक ब्यानर डिजाइन&#10;खर्च र नतिजा देखाउने साप्ताहिक प्रतिवेदन&#10;लक्षित ग्राहक छनोट"
                    />
                  </div>
                </div>
              )}

              {/* Icon Selection */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div className="form-group">
                  <label className="form-label">Service Icon</label>
                  <select
                    className="form-input"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  >
                    <option value="TrendingUp">TrendingUp (Performance Ads / Growth)</option>
                    <option value="Share2">Share2 (Social Media Management)</option>
                    <option value="Cpu">Cpu (Automation & AI Consulting)</option>
                    <option value="Palette">Palette (Brand Design & Visuals)</option>
                    <option value="Video">Video (Podcast & Production)</option>
                    <option value="PenTool">PenTool (Copywriting & Strategy)</option>
                    <option value="Sparkles">Sparkles (Generative AI)</option>
                    <option value="Zap">Zap (Rapid Execution)</option>
                  </select>
                </div>
              </div>

              {/* Image Input with SEO Hyphenated Filename generation */}
              <div style={{ marginBottom: '16px' }}>
                <ImageInput
                  label="Service Card Image / Illustration (Optional)"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="services"
                  contextName={formData.title_en || 'service-offering'}
                  helpText="Automatically generates hyphenated SEO filename like vedanta-strategies-service-offering-[tag].webp"
                />
              </div>

              {/* Shared Pricing Tiers */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#C59A3F', marginBottom: '10px' }}>Pricing Packages (Monthly / Retainer)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Starter Package</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.starter}
                      onChange={(e) => setFormData({ ...formData, starter: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Growth Package</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.growth}
                      onChange={(e) => setFormData({ ...formData, growth: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Enterprise / Custom</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.enterprise}
                      onChange={(e) => setFormData({ ...formData, enterprise: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: '700' }}>
                  {editingService ? 'Save Service Changes' : 'Create Service Offering'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

