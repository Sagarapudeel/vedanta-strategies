import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  BookOpen, 
  Briefcase, 
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
  Building2,
  Image
} from 'lucide-react';

export default function AdminLayout({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  onLogout, 
  onBackToSite, 
  leadCount, 
  children 
}) {
  const navGroups = [
    {
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, allowedRoles: ['super_admin', 'content_editor', 'sales_handler'] },
        { id: 'leads', label: 'Enrollments & Leads', icon: <Inbox size={16} />, badge: leadCount, allowedRoles: ['super_admin', 'sales_handler'] },
      ]
    },
    {
      label: 'Content',
      items: [
        { id: 'content', label: 'Page Content', icon: <Globe size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
        { id: 'blog', label: 'Blog & Articles', icon: <FileText size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
      ]
    },
    {
      label: 'Media',
      items: [
        { id: 'media', label: 'Media & Gallery', icon: <Image size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
        { id: 'partners', label: 'Partners & Logos', icon: <Building2 size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
      ]
    },
    {
      label: 'Courses & Services',
      items: [
        { id: 'courses', label: 'Courses & Programs', icon: <BookOpen size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
        { id: 'services', label: 'Services & Packages', icon: <Briefcase size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
      ]
    },
    {
      label: 'Community',
      items: [
        { id: 'portfolio', label: 'Portfolio', icon: <Layers size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
        { id: 'team', label: 'Team & Mentors', icon: <Users size={16} />, allowedRoles: ['super_admin', 'content_editor'] },
      ]
    },
    {
      label: 'System',
      items: [
        { id: 'users', label: 'Admin Accounts', icon: <ShieldCheck size={16} />, allowedRoles: ['super_admin'] },
        { id: 'settings', label: 'Site Settings & SEO', icon: <Settings size={16} />, allowedRoles: ['super_admin'] },
      ]
    }
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <div style={{ background: '#ffffff', borderRadius: '8px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', flexShrink: 0 }}>
            <img src="/images/logo.svg" alt="Vedanta Strategies" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '0.96rem', letterSpacing: '0.02em' }}>VEDANTA ADMIN</div>
            <div style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Executive CMS Portal
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '5px', fontWeight: '600', textTransform: 'uppercase' }}>Staff Role</div>
          <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
            {currentRole === 'super_admin' && 'Super Admin'}
            {currentRole === 'content_editor' && 'Content Editor'}
            {currentRole === 'sales_handler' && 'Sales / Leads Handler'}
            {!['super_admin', 'content_editor', 'sales_handler'].includes(currentRole) && currentRole}
          </div>
        </div>

        {/* Grouped Navigation */}
        <ul className="admin-nav-list" style={{ overflowY: 'auto', flex: 1 }}>
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(item => item.allowedRoles.includes(currentRole));
            if (visibleItems.length === 0) return null;
            return (
              <li key={group.label}>
                <div style={{ padding: '12px 16px 4px 16px', fontSize: '0.66rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(255,255,255,0.3)' }}>
                  {group.label}
                </div>
                {visibleItems.map((item) => (
                  <div key={item.id} className="admin-nav-item">
                    <button
                      className={activeTab === item.id ? 'active' : ''}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge > 0 && (
                        <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.7rem', fontWeight: '800', padding: '1px 6px', borderRadius: '4px' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </li>
            );
          })}
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
