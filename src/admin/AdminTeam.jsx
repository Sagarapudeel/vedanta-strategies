import React, { useState } from 'react';
import { Users, PlusCircle, Trash2, Edit2, Globe, CheckCircle } from 'lucide-react';
import ImageInput from './ImageInput';

export default function AdminTeam({ 
  teamMembers = [], 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    name: '',
    role_en: '',
    role_ne: '',
    specialty_en: '',
    specialty_ne: '',
    bio_en: '',
    bio_ne: '',
    photo: '',
    avatar: 'VS'
  });

  const handleOpenAdd = () => {
    setEditingMember(null);
    setActiveLangTab('en');
    setFormData({
      name: '',
      role_en: '',
      role_ne: '',
      specialty_en: '',
      specialty_ne: '',
      bio_en: '',
      bio_ne: '',
      photo: '',
      avatar: 'VS'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setActiveLangTab('en');
    setFormData({
      name: member.name || '',
      role_en: member.role_en || member.role || '',
      role_ne: member.role_ne || '',
      specialty_en: member.specialty_en || member.specialty || '',
      specialty_ne: member.specialty_ne || '',
      bio_en: member.bio_en || member.bio || '',
      bio_ne: member.bio_ne || '',
      photo: member.photo || '',
      avatar: member.avatar || 'VS'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      role: formData.role_en,
      role_en: formData.role_en,
      role_ne: formData.role_ne,
      specialty: formData.specialty_en,
      specialty_en: formData.specialty_en,
      specialty_ne: formData.specialty_ne,
      bio: formData.bio_en,
      bio_en: formData.bio_en,
      bio_ne: formData.bio_ne,
      photo: formData.photo || '',
      avatar: formData.avatar || (formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'VS')
    };

    if (editingMember && updateTeamMember) {
      updateTeamMember(editingMember.id, payload);
    } else if (addTeamMember) {
      addTeamMember(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Team & Mentors</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Leadership, lead instructors, and production directors profile management.
          </p>
        </div>
        {addTeamMember && (
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={18} />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {teamMembers.map((member) => (
          <div key={member.id} className="glass-card" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '120px', height: '140px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: '1.4rem', fontWeight: '800', overflow: 'hidden' }}>
              {member.photo ? (
                <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                member.avatar
              )}
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '4px' }}>{member.name}</h3>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>
              {member.role_en || member.role}
            </div>
            {member.role_ne && (
              <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '6px' }}>
                🇳🇵 {member.role_ne}
              </div>
            )}
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', marginBottom: '12px' }}>
              {member.specialty_en || member.specialty}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', flexGrow: 1, marginBottom: '16px' }}>
              {member.bio_en || member.bio}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleOpenEdit(member)}
                style={{ padding: '4px 10px', fontSize: '0.8rem' }}
              >
                <Edit2 size={14} /> Edit
              </button>
              {deleteTeamMember && (
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm(`Delete ${member.name}?`)) {
                      deleteTeamMember(member.id);
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
              <Users size={20} color="#f59e0b" />
              <span>{editingMember ? 'Edit Team Member Profile' : 'Add Team Member'}</span>
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
                🇬🇧 English Profile
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
                🇳🇵 Nepali Profile (नेपाली)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Shared Name & Photo */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Full Name & Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Er. Suman Adhikari"
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <ImageInput
                  label="Profile Photo (Upload or URL)"
                  value={formData.photo}
                  onChange={(v) => setFormData({ ...formData, photo: v })}
                  hint="Shown as a circular portrait on the Team page. Leave empty to show initials instead."
                  previewHeight={110}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Avatar Initials (fallback when no photo)</label>
                <input
                  type="text"
                  className="form-input"
                  maxLength="3"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value.toUpperCase() })}
                  placeholder="e.g. SA"
                />
              </div>

              {activeLangTab === 'en' ? (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Role / Designation (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={formData.role_en}
                      onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                      placeholder="e.g. Founder & AI Trainer"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Specialty / Key Focus (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.specialty_en}
                      onChange={(e) => setFormData({ ...formData, specialty_en: e.target.value })}
                      placeholder="e.g. AI Tools, Prompting & Automation"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label className="form-label">Biography (English)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.bio_en}
                      onChange={(e) => setFormData({ ...formData, bio_en: e.target.value })}
                      placeholder="Brief background and teaching philosophy..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">पद / भूमिका (नेपाली)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.role_ne}
                      onChange={(e) => setFormData({ ...formData, role_ne: e.target.value })}
                      placeholder="जस्तै: संस्थापक तथा एआई प्रशिक्षक"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">मुख्य दक्षता / विषय (नेपाली)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.specialty_ne}
                      onChange={(e) => setFormData({ ...formData, specialty_ne: e.target.value })}
                      placeholder="जस्तै: एआई टुल्स, प्रम्प्टिङ र कार्यप्रवाह अटोमेसन"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label className="form-label">परिचय / जीवनी (नेपाली)</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={formData.bio_ne}
                      onChange={(e) => setFormData({ ...formData, bio_ne: e.target.value })}
                      placeholder="संक्षिप्त पृष्ठभूमि र अनुभव..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
