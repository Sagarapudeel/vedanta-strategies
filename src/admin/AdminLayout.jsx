import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  BookOpen, 
  Briefcase, 
  Film, 
  Layers, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  UserCircle,
  Globe,
  Building2 
} from 'lucide-react';

export default function AdminLayout({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  setCurrentRole, 
  onLogout, 
  onBackToSite, 
  leadCount, 
  children 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} />, allowedRoles: ['super_admin', 'content_editor', 'sales_handler'] },
    { id: 'leads', label: 'Enrollments & Leads', icon: <Inbox size={18} />, badge: leadCount, allowedRoles: ['super_admin', 'sales_handler'] },
    { id: 'content', label: 'Page Content & Translations', icon: <Globe size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'partners', label: 'Trusted Partners & Logos', icon: <Building2 size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'courses', label: 'Courses & Programs', icon: <BookOpen size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'services', label: 'Services & Packages', icon: <Briefcase size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'portfolio', label: 'Portfolio & Case Studies', icon: <Layers size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'production', label: 'Production Showcase', icon: <Film size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'team', label: 'Team & Mentors', icon: <Users size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'blog', label: 'Blog & Articles', icon: <FileText size={18} />, allowedRoles: ['super_admin', 'content_editor'] },
    { id: 'users', label: 'Admin Accounts & Team', icon: <ShieldCheck size={18} />, allowedRoles: ['super_admin'] },
    { id: 'settings', label: 'Site Settings & SEO', icon: <Settings size={18} />, allowedRoles: ['super_admin'] }
  ];

  const visibleNav = navItems.filter(item => item.allowedRoles.includes(currentRole));

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <div style={{ background: '#ffffff', borderRadius: '8px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', flexShrink: 0 }}>
            <img src="/images/logo.png" alt="Vedanta Strategies" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '0.96rem', letterSpacing: '0.02em' }}>VEDANTA ADMIN</div>
            <div style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Executive CMS Portal
            </div>
          </div>
        </div>

        {/* Role Selector Simulator (Blueprint Section 8) */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase' }}>
            Active Staff Role:
          </div>
          <select
            value={currentRole}
            onChange={(e) => {
              setCurrentRole(e.target.value);
              if (e.target.value === 'sales_handler') setActiveTab('leads');
            }}
            className="form-select"
            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
          >
            <option value="super_admin">Super Admin (Full Access)</option>
            <option value="content_editor">Content Editor (Pages & Media)</option>
            <option value="sales_handler">Sales/Lead Handler (Leads Only)</option>
          </select>
        </div>

        {/* Navigation List */}
        <ul className="admin-nav-list">
          {visibleNav.map((item) => (
            <li key={item.id} className="admin-nav-item">
              <button
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.72rem', fontWeight: '800', padding: '2px 7px', borderRadius: 'var(--radius-full)' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={onBackToSite}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </button>
          <button
            onClick={onLogout}
            className="btn btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', background: 'transparent', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.3)' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content-area">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={20} color="#f59e0b" />
            <span style={{ fontWeight: '700', fontSize: '1.05rem', color: '#fff' }}>
              Vedanta Control Center
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>•</span>
            <span style={{ fontSize: '0.82rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
              ● Live Mode Synchronized
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
              <UserCircle size={18} color="#f59e0b" />
              <span>admin@vedantastrategies.com</span>
            </div>
          </div>
        </header>

        {/* Child Module View */}
        <div className="admin-main-body">
          {children}
        </div>
      </main>
    </div>
  );
}
