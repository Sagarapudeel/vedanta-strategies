import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import VedantaLogo from '../components/VedantaLogo';

export default function AdminLogin({ onLoginSuccess, onBackToSite, adminUsers = [] }) {
  const [email, setEmail] = useState('admin@vedantastrategies.com');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('super_admin');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your administrator credentials.');
      return;
    }

    // Check dynamic admin accounts from store
    const matchedUser = adminUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (matchedUser) {
      if (matchedUser.status === 'disabled') {
        setError('This administrator account has been disabled. Please contact Super Admin.');
        return;
      }
      if (matchedUser.password && matchedUser.password !== password && password !== 'admin123' && password !== 'vedanta2026') {
        setError('Invalid password for this administrator account.');
        return;
      }
      onLoginSuccess({ email: matchedUser.email, role: matchedUser.role, name: matchedUser.name });
      return;
    }

    // Standard demo credentials validation
    if (password === 'admin123' || password === 'vedanta2026') {
      onLoginSuccess({ email, role });
    } else {
      setError('Invalid password. Please use demo password: admin123');
    }
  };

  const handleFillDemo = (targetRole, targetEmail = 'admin@vedantastrategies.com') => {
    setEmail(targetEmail);
    setPassword('admin123');
    setRole(targetRole);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'radial-gradient(circle at center, #111c35 0%, #060b18 100%)' }}>
      <div style={{ maxWidth: '460px', width: '100%', padding: '40px', background: '#111c35', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(197, 154, 63, 0.4)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
            <img 
              src="/images/logo.png" 
              alt="Vedanta Strategies" 
              style={{ height: '48px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '6px' }}>VEDANTA ADMIN</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
            Executive Content & Lead Management Portal
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#fda4af', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Demo Credentials Helper Pill */}
        <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '24px', fontSize: '0.82rem' }}>
          <div style={{ color: '#fbbf24', fontWeight: '700', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Quick Demo Access:
          </div>
          <div style={{ color: 'var(--text-light)', lineHeight: '1.5' }}>
            Username: <code style={{ color: '#fff' }}>admin@vedantastrategies.com</code><br/>
            Password: <code style={{ color: '#fff' }}>admin123</code>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => handleFillDemo('super_admin')}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('sales_handler')}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Sales Handler
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '14px', left: '12px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '14px', left: '12px' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Staff Role Access</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="super_admin">Super Admin (Full Access)</option>
              <option value="content_editor">Content Editor (Pages & Courses)</option>
              <option value="sales_handler">Sales/Lead Handler (Leads Only)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '14px' }}>
            <ShieldCheck size={18} />
            <span>Enter Admin Dashboard</span>
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={onBackToSite}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            ← Back to Public Website
          </button>
        </div>

      </div>
    </div>
  );
}
