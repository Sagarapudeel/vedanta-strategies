import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { signInAdmin } from '../lib/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your administrator credentials.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const auth = await signInAdmin(email, password);
      onLoginSuccess(auth);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'radial-gradient(circle at center, #111c35 0%, #060b18 100%)' }}>
      <div style={{ maxWidth: '460px', width: '100%', padding: '40px', background: '#111c35', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(197, 154, 63, 0.4)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)' }}>

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

        {!isSupabaseConfigured && (
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', color: '#fbbf24', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.85rem' }}>
            Database is not configured. Copy <code>.env.example</code> to <code>.env.local</code> and add your Supabase URL and anon key.
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', color: '#fda4af', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

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
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '14px' }} disabled={loading}>
            <ShieldCheck size={18} />
            <span>{loading ? 'Signing in…' : 'Enter Admin Dashboard'}</span>
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
