import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { uploadMediaFile } from '../lib/uploadMedia';

export default function ImageInput({ label, value, onChange, hint, previewHeight = 160 }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) { alert('Please select an image file (JPG, PNG, WebP, SVG)'); return; }
    setUploading(true);
    try { onChange(await uploadMediaFile(file, 'site')); }
    catch (err) { alert(err.message || 'Failed to upload image'); }
    finally { setUploading(false); }
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {hint && <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '8px' }}>{hint}</div>}

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={async e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
        style={{
          border: `2px dashed ${dragging ? '#fbbf24' : 'var(--border-subtle)'}`,
          borderRadius: '8px', padding: '18px', cursor: 'pointer', textAlign: 'center',
          marginBottom: '10px', background: dragging ? 'rgba(251,191,36,0.05)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.2s'
        }}
      >
        <UploadCloud size={22} color="#fbbf24" style={{ marginBottom: '6px' }} />
        <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: '600' }}>
          {uploading ? 'Uploading…' : 'Click to upload or drag & drop'}
        </div>
        <div style={{ fontSize: '0.73rem', color: 'var(--text-subtle)', marginTop: '3px' }}>JPG, PNG, WebP, SVG</div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { handleFile(e.target.files?.[0]); e.target.value = ''; }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>or paste URL</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>

      <input type="text"
        value={value?.startsWith('data:') ? '' : (value || '')}
        onChange={e => onChange(e.target.value)}
        className="form-input"
        placeholder="https://... or /images/file.jpg"
        style={{ marginBottom: '10px' }}
      />

      {value && (
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#1e293b', position: 'relative' }}>
          <img src={value} alt="Preview"
            style={{ width: '100%', height: `${previewHeight}px`, objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; }} />
          {value && !value.startsWith('/') && (
            <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.65)', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', color: '#4ade80' }}>
              ✓ Uploaded
            </div>
          )}
        </div>
      )}
    </div>
  );
}