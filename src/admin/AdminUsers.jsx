import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Search, 
  Key, 
  Mail, 
  User, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Save, 
  Lock,
  Globe,
  Inbox,
  Sparkles
} from 'lucide-react';

export default function AdminUsers({
  adminUsers = [],
  currentAdmin = '',
  addAdminUser,
  updateAdminUser,
  deleteAdminUser
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const initialForm = {
    name: '',
    email: '',
    role: 'content_editor',
    password: '',
    status: 'active'
  };

  const [formData, setFormData] = useState(initialForm);

  const filteredUsers = adminUsers.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q)
    );
  });

  const superAdminCount = adminUsers.filter(u => u.role === 'super_admin').length;
  const editorCount = adminUsers.filter(u => u.role === 'content_editor').length;
  const salesCount = adminUsers.filter(u => u.role === 'sales_handler').length;

  const handleOpenAdd = () => {
    setErrorMsg('Create new staff in the Supabase dashboard: Authentication → Users. A profile appears here automatically after they are created.');
    setModalOpen(false);
  };

  const handleOpenEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'content_editor',
      password: '',
      status: user.status || 'active'
    });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingId(null);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter both name and email.');
      return;
    }

    if (!editingId) {
      setErrorMsg('Create new staff in Supabase Authentication → Users. Then edit their role here.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      status: formData.status
    };

    updateAdminUser(editingId, payload);
    setSuccessMsg(`Admin account "${payload.name}" updated successfully!`);

    setModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDelete = (id, name, email) => {
    if (email === currentAdmin) {
      alert("Security Violation: You cannot delete the account you are currently logged in with.");
      return;
    }

    const userToDelete = adminUsers.find(u => u.id === id);
    if (userToDelete?.isPrimary) {
      alert("Protected Account: The primary root Super Administrator cannot be deleted.");
      return;
    }

    if (confirm(`Are you sure you want to completely revoke and delete admin account "${name}" (${email})?`)) {
      try {
        deleteAdminUser(id);
        setSuccessMsg(`Admin account "${name}" has been revoked and deleted.`);
        setTimeout(() => setSuccessMsg(''), 3500);
      } catch (err) {
        alert(err.message || 'Failed to delete admin');
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.74rem', background: 'rgba(197, 154, 63, 0.2)', color: '#fbbf24', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Super Admin Privilege
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
            Admin Accounts & Team Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Roles are stored in Supabase. Create login accounts in Authentication → Users, then set the role here.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ padding: '12px 22px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <UserPlus size={18} />
          <span>Add via Supabase</span>
        </button>
      </div>

      {successMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: '600' }}>{successMsg}</span>
        </div>
      )}

      {errorMsg && !modalOpen && (
        <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', color: '#fbbf24', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', fontSize: '0.9rem' }}>
          {errorMsg}
        </div>
      )}

      {/* Role Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        <div className="admin-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL ADMINS</span>
            <ShieldCheck size={18} color="#C59A3F" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>
            {adminUsers.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Authorized portal users
          </div>
        </div>

        <div className="admin-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '700' }}>SUPER ADMINS</span>
            <Shield size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbf24' }}>
            {superAdminCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Unrestricted full system control
          </div>
        </div>

        <div className="admin-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '700' }}>CONTENT EDITORS</span>
            <Globe size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8' }}>
            {editorCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Courses, blogs, partners & media
          </div>
        </div>

        <div className="admin-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700' }}>SALES & LEADS</span>
            <Inbox size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>
            {salesCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Inquiry CRM & student conversions
          </div>
        </div>
      </div>

      {/* Role Permission Legend */}
      <div style={{ background: '#0a1020', border: '1px solid #1a2744', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Shield size={15} /> Super Admin
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            Can add/delete other admins, change site settings, manage all courses, partners, media, and export leads.
          </div>
        </div>

        <div>
          <div style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Globe size={15} /> Content Editor
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            Can manage courses, partners, production showcase, blog articles, and bilingual translations. Cannot delete admins.
          </div>
        </div>

        <div>
          <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Inbox size={15} /> Sales / Lead Handler
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            Restricted to viewing incoming inquiries, changing status (contacted, converted), and logging follow-up notes.
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
          <input
            type="text"
            placeholder="Search admins by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Active Session: <strong style={{ color: '#fff' }}>{currentAdmin}</strong> (Super Admin)
        </div>
      </div>

      {/* Admins Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Admin Name & Identity</th>
              <th>Assigned Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const isSelf = user.email === currentAdmin;
              return (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: user.role === 'super_admin' ? 'rgba(197, 154, 63, 0.2)' : (user.role === 'content_editor' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(16, 185, 129, 0.2)'), color: user.role === 'super_admin' ? '#fbbf24' : (user.role === 'content_editor' ? '#38bdf8' : '#34d399'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>
                        {(user.name || 'A').slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{user.name}</span>
                          {user.isPrimary && (
                            <span style={{ fontSize: '0.68rem', color: '#fbbf24', background: 'rgba(197, 154, 63, 0.2)', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              ROOT
                            </span>
                          )}
                          {isSelf && (
                            <span style={{ fontSize: '0.68rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              YOU
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.role === 'super_admin' && (
                      <span style={{ background: 'rgba(197, 154, 63, 0.15)', color: '#fbbf24', border: '1px solid rgba(197, 154, 63, 0.35)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Shield size={12} /> Super Admin
                      </span>
                    )}
                    {user.role === 'content_editor' && (
                      <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Globe size={12} /> Content Editor
                      </span>
                    )}
                    {user.role === 'sales_handler' && (
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Inbox size={12} /> Sales / Leads
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
                      <span>Active</span>
                    </span>
                  </td>
                  <td style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    {user.createdAt || '2026-01-01'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                        title="Edit Admin Role or Name"
                      >
                        <Edit3 size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id, user.name, user.email)}
                        disabled={user.isPrimary || isSelf}
                        className="btn btn-secondary btn-sm"
                        style={{ 
                          color: (user.isPrimary || isSelf) ? '#64748b' : '#f43f5e', 
                          borderColor: (user.isPrimary || isSelf) ? '#1e2d4d' : 'rgba(244,63,94,0.3)',
                          cursor: (user.isPrimary || isSelf) ? 'not-allowed' : 'pointer',
                          padding: '6px 10px'
                        }}
                        title={user.isPrimary ? 'Primary root super admin cannot be deleted' : (isSelf ? 'Cannot delete your active account' : 'Delete and revoke admin access')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div 
            className="modal-card" 
            style={{ maxWidth: '580px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#C59A3F" />
                <span>{editingId ? 'Edit Admin Account' : 'Provision New Administrator'}</span>
              </h2>
              <button className="modal-close-btn" onClick={handleClose}>
                <X size={18} />
              </button>
            </div>

            {errorMsg && (
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#fda4af', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.88rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Binod Sharma"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Email Address *</label>
                <input
                  type="email"
                  required
                  disabled={Boolean(editingId)} // Email is identity key
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. binod@vedantastrategies.com"
                  style={editingId ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Administrator Role & Privilege Level *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="form-select"
                >
                  <option value="super_admin">Super Admin (Full System Control & Staff Provisioning)</option>
                  <option value="content_editor">Content Editor (Courses, Pages, Media & Translations)</option>
                  <option value="sales_handler">Sales / Lead Handler (Leads CRM & Inquiries Only)</option>
                </select>
              </div>

              {/* Dynamic Role Explanation Preview */}
              <div style={{ background: '#0a1020', border: '1px solid #1e2d4d', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {formData.role === 'super_admin' && (
                  <div>
                    <strong style={{ color: '#fbbf24' }}>Super Admin:</strong> Complete access to all modules, creating/deleting other admins, modifying site settings, managing CMS and leads CRM.
                  </div>
                )}
                {formData.role === 'content_editor' && (
                  <div>
                    <strong style={{ color: '#38bdf8' }}>Content Editor:</strong> Authority to edit all courses, partner logos, blog posts, portfolio, and production gallery in both English & Nepali.
                  </div>
                )}
                {formData.role === 'sales_handler' && (
                  <div>
                    <strong style={{ color: '#34d399' }}>Sales / Lead Handler:</strong> Focused access strictly to view incoming leads, change student enrollment statuses, and save CRM follow-up notes.
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Account status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

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
                  <span>{editingId ? 'Update Admin' : 'Provision Admin'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
