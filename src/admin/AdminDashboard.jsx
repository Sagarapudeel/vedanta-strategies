import React from 'react';
import { 
  Inbox, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Clock, 
  Phone, 
  Mail, 
  PlusCircle, 
  Download 
} from 'lucide-react';

export default function AdminDashboard({ 
  leads = [], 
  courses = [], 
  portfolioItems = [], 
  setActiveTab, 
  updateLeadStatus 
}) {
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;
  const conversionRate = leads.length > 0 ? Math.round((convertedCount / leads.length) * 100) : 0;

  const recentLeads = leads.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Executive Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Real-time snapshot of inquiries, courses, and agency conversion performance.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL LEADS</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Inbox size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {leads.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '4px' }}>
            {newLeadsCount} new uncontacted
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>ACTIVE COURSES</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {courses.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '4px' }}>
            Across Individual & Institutional
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>PORTFOLIO ITEMS</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {portfolioItems.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>
            Published Case Studies
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>LEAD CONVERSION</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {conversionRate}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#c084fc', marginTop: '4px' }}>
            {convertedCount} leads successfully closed
          </div>
        </div>

      </div>

      {/* Quick Action Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('courses')}>
          <PlusCircle size={16} /> Add New Course
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('leads')}>
          <Inbox size={16} /> Open Full Leads CRM ({leads.length})
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('portfolio')}>
          <Layers size={16} /> Add Case Study
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('settings')}>
          Update Site Settings
        </button>
      </div>

      {/* Recent Leads Table */}
      <div className="admin-table-wrap">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Recent Inquiries & Enrollments</h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Latest submissions across all entry funnels</div>
          </div>
          <button className="btn btn-outline-gold btn-sm" onClick={() => setActiveTab('leads')}>
            <span>View All Leads</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Lead Contact</th>
              <th>Channel / Purpose</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{lead.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {lead.phone} • {lead.email}
                  </div>
                  {lead.institutionName && (
                    <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
                      Org: {lead.institutionName}
                    </div>
                  )}
                </td>
                <td>
                  <span style={{ textTransform: 'capitalize', fontWeight: '600', color: 'var(--text-light)' }}>
                    {lead.purpose}
                  </span>
                  {lead.courseName && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.courseName}</div>
                  )}
                </td>
                <td>
                  <span className={`status-pill status-${lead.status}`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
                  {lead.createdAt}
                </td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.8rem', color: '#fff' }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
