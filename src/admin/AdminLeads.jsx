import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Download, 
  Trash2, 
  MessageCircle, 
  Phone, 
  Mail, 
  CheckCircle, 
  Filter, 
  FileSpreadsheet, 
  UserPlus 
} from 'lucide-react';

export default function AdminLeads({ 
  leads = [], 
  updateLeadStatus, 
  deleteLead 
}) {
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');

  const filteredLeads = leads.filter(lead => {
    const matchesPurpose = filterPurpose === 'all' || lead.purpose === filterPurpose;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.institutionName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPurpose && matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Purpose", "Institution", "Status", "Created At", "Message", "Notes"];
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.purpose || ''}"`,
      `"${l.institutionName || ''}"`,
      `"${l.status || ''}"`,
      `"${l.createdAt || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vedanta_leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLeadDetail = (lead) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedLead) {
      updateLeadStatus(selectedLead.id, selectedLead.status, leadNotes);
      setSelectedLead(prev => ({ ...prev, notes: leadNotes }));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Enrollments & Inquiries (Leads CRM)</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage, tag, filter, and convert prospective students and institutional clients.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleExportCSV}>
          <FileSpreadsheet size={18} />
          <span>Export to Excel / CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{ background: '#0f172a', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
          />
        </div>

        {/* Filter by Purpose */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>CHANNEL:</span>
          <select
            value={filterPurpose}
            onChange={(e) => setFilterPurpose(e.target.value)}
            className="form-select"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">All Channels</option>
            <option value="training">Course Enrollment</option>
            <option value="institution">Schools / Institutions</option>
            <option value="services">Digital Marketing</option>
            <option value="production">Production</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Filter by Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>STATUS:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
        </div>

      </div>

      {/* Leads Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Lead Name & Info</th>
              <th>Channel / Intent</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No lead records found matching these criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{lead.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <span>{lead.phone}</span> • <span>{lead.email}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', textTransform: 'capitalize', color: 'var(--text-light)' }}>
                      {lead.purpose}
                    </span>
                    {lead.courseName && (
                      <div style={{ fontSize: '0.78rem', color: '#fbbf24' }}>
                        {lead.courseName}
                      </div>
                    )}
                  </td>
                  <td>
                    {lead.institutionName ? (
                      <span style={{ color: '#38bdf8', fontWeight: '600' }}>{lead.institutionName}</span>
                    ) : (
                      <span style={{ color: 'var(--text-subtle)' }}>Individual</span>
                    )}
                  </td>
                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className={`status-pill status-${lead.status}`}
                      style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                    {lead.createdAt}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Quick WhatsApp Chat button */}
                      <a
                        href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, greetings from Vedanta Strategies!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', color: '#25d366', borderColor: 'rgba(37,211,102,0.3)' }}
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={15} />
                      </a>
                      
                      {/* View & Notes */}
                      <button
                        onClick={() => openLeadDetail(lead)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="View Details & Notes"
                      >
                        Notes
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete lead ${lead.name}?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                        title="Delete Lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Lead Detail & Internal Notes Drawer/Modal */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedLead(null)}>✕</button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className={`status-pill status-${selectedLead.status}`}>
                {selectedLead.status.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>ID: {selectedLead.id}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>{selectedLead.name}</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {selectedLead.email} • {selectedLead.phone}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '4px', textTransform: 'uppercase' }}>
                Channel & Submission Notes:
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {selectedLead.message || 'No additional message provided.'}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="form-group">
              <label className="form-label">Internal Follow-up Notes (Saved to CRM)</label>
              <textarea
                rows="3"
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Log discussion notes, discount offered, or follow-up date..."
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <a
                href={`tel:${selectedLead.phone}`}
                className="btn btn-secondary btn-sm"
              >
                <Phone size={14} /> Call Lead
              </a>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedLead(null)}>
                  Close
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleSaveNotes}>
                  <CheckCircle size={15} /> Save Notes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
