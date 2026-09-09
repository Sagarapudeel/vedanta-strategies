import React, { useState } from 'react';
import { Image, Video, UploadCloud, Trash2, Plus, Globe, CheckCircle, Link } from 'lucide-react';

const SectionCard = ({ icon, title, children }) => (
  <div style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '28px', marginBottom: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ color: '#fbbf24' }}>{icon}</span>
      <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0 }}>{title}</h3>
    </div>
    {children}
  </div>
);

const UrlInputRow = ({ label, value, onChange, placeholder, hint }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    {hint && <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '6px' }}>{hint}</div>}
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        placeholder={placeholder || 'https://... or /images/file.jpg'}
        style={{ flex: 1 }}
      />
      {value && (
        <a href={value} target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#38bdf8', fontSize: '0.8rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <Globe size={13} /> Preview
        </a>
      )}
    </div>
  </div>
);

export default function AdminMedia({ media = {}, updateMedia, addGalleryPhoto, deleteGalleryPhoto, addGalleryVideo, deleteGalleryVideo }) {
  const [saved, setSaved] = useState(false);
  const [localMedia, setLocalMedia] = useState({
    heroImage: media.heroImage || '/images/hero.jpg',
    heroImageAlt: media.heroImageAlt || 'Vedanta Strategies Training Workshop',
    siteLogo: media.siteLogo || '/images/logo.png',
    banners: media.banners || {}
  });
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' });
  const [newVideo, setNewVideo] = useState({ title: '', embedUrl: '' });
  const [activeTab, setActiveTab] = useState('site');

  const galleryPhotos = media.galleryPhotos || [];
  const galleryVideos = media.galleryVideos || [];

  const handleSave = () => {
    updateMedia(localMedia);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddPhoto = () => {
    if (!newPhoto.url.trim()) return;
    addGalleryPhoto({ url: newPhoto.url.trim(), caption: newPhoto.caption, date: new Date().getFullYear().toString() });
    setNewPhoto({ url: '', caption: '' });
  };

  const handleAddVideo = () => {
    if (!newVideo.embedUrl.trim()) return;
    addGalleryVideo({ ...newVideo });
    setNewVideo({ title: '', embedUrl: '' });
  };

  const tabs = [
    { id: 'site', label: 'Site Images & Logo' },
    { id: 'photos', label: `Photos (${galleryPhotos.length})` },
    { id: 'videos', label: `Videos (${galleryVideos.length})` }
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '1.4rem', marginBottom: '4px' }}>Media & Gallery</h2>
        <p style={{ color: 'var(--text-subtle)', fontSize: '0.88rem' }}>Manage all images, logos, and gallery content shown on the public site.</p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '28px', background: 'rgba(255,255,255,0.03)', padding: '5px', borderRadius: '8px', border: '1px solid var(--border-subtle)', width: 'fit-content' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '7px 18px', borderRadius: '6px', border: 'none', fontSize: '0.84rem', fontWeight: '600', cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--brand-gold)' : 'transparent',
              color: activeTab === tab.id ? '#172642' : 'var(--text-subtle)' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'site' && (
        <div>
          <SectionCard icon={<UploadCloud size={20} />} title="Hero Image — Homepage Full-Bleed Background">
            <UrlInputRow label="Hero Image URL" value={localMedia.heroImage}
              onChange={(v) => setLocalMedia(p => ({ ...p, heroImage: v }))}
              placeholder="/images/hero.jpg or https://..."
              hint="Full-bleed background on homepage. Recommended size: 1920×1080px or wider, JPG/WebP." />
            <UrlInputRow label="Alt Text (accessibility & SEO)" value={localMedia.heroImageAlt}
              onChange={(v) => setLocalMedia(p => ({ ...p, heroImageAlt: v }))}
              placeholder="Vedanta Strategies Training Workshop in Kathmandu" />
            {localMedia.heroImage && (
              <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', maxHeight: '180px', border: '1px solid var(--border-subtle)' }}>
                <img src={localMedia.heroImage} alt="Hero preview" style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </SectionCard>

          <SectionCard icon={<Image size={20} />} title="Site Logo — Navbar & Admin">
            <UrlInputRow label="Logo Image URL" value={localMedia.siteLogo}
              onChange={(v) => setLocalMedia(p => ({ ...p, siteLogo: v }))}
              placeholder="/images/logo.png or https://..."
              hint="Used in navbar and admin sidebar. Transparent PNG recommended, min 200px wide." />
            {localMedia.siteLogo && (
              <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
                <img src={localMedia.siteLogo} alt="Logo preview" style={{ maxHeight: '56px', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </SectionCard>

          <SectionCard icon={<Link size={20} />} title="Page Banner Images">
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.84rem', marginBottom: '16px' }}>Optional header images for sub-pages. Leave blank to use the default navy gradient header.</p>
            {['about', 'training', 'contact', 'gallery'].map(page => (
              <UrlInputRow key={page}
                label={`${page.charAt(0).toUpperCase() + page.slice(1)} Page Banner`}
                value={localMedia.banners?.[page] || ''}
                onChange={(v) => setLocalMedia(p => ({ ...p, banners: { ...(p.banners || {}), [page]: v } }))}
                placeholder={`Banner image URL for /${page} page`} />
            ))}
          </SectionCard>

          <button onClick={handleSave} className="btn btn-primary">
            {saved ? <><CheckCircle size={16} /> Saved!</> : <><UploadCloud size={16} /> Save All Changes</>}
          </button>
        </div>
      )}

      {activeTab === 'photos' && (
        <div>
          <SectionCard icon={<Plus size={20} />} title="Add New Photo to Gallery">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Photo URL *</label>
                <input type="text" value={newPhoto.url} onChange={e => setNewPhoto(p => ({ ...p, url: e.target.value }))}
                  className="form-input" placeholder="/images/photo.jpg or https://..." />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Caption</label>
                <input type="text" value={newPhoto.caption} onChange={e => setNewPhoto(p => ({ ...p, caption: e.target.value }))}
                  className="form-input" placeholder="AI Workshop, Batch 14..." />
              </div>
            </div>
            <button onClick={handleAddPhoto} className="btn btn-primary btn-sm"><Plus size={15} /> Add Photo</button>
          </SectionCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
            {galleryPhotos.map(photo => (
              <div key={photo.id} style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ height: '130px', background: '#1e293b', position: 'relative' }}>
                  <img src={photo.url} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.caption || 'No caption'}</div>
                  <button onClick={() => deleteGalleryPhoto(photo.id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '2px', flexShrink: 0 }}><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
            {galleryPhotos.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: '10px' }}>
                No photos yet. Add your first photo above.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div>
          <SectionCard icon={<Plus size={20} />} title="Add New Video to Gallery">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Video Title *</label>
                <input type="text" value={newVideo.title} onChange={e => setNewVideo(p => ({ ...p, title: e.target.value }))}
                  className="form-input" placeholder="AI Workshop Introduction..." />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">YouTube / Vimeo Embed URL *</label>
                <input type="text" value={newVideo.embedUrl} onChange={e => setNewVideo(p => ({ ...p, embedUrl: e.target.value }))}
                  className="form-input" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                  YouTube: Share → Embed → copy the src URL (format: youtube.com/embed/ID)
                </div>
              </div>
            </div>
            <button onClick={handleAddVideo} className="btn btn-primary btn-sm"><Plus size={15} /> Add Video</button>
          </SectionCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {galleryVideos.map(video => (
              <div key={video.id} style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Video size={20} color="#fbbf24" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#fff', marginBottom: '2px', fontSize: '0.9rem' }}>{video.title || 'Untitled video'}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', wordBreak: 'break-all' }}>{video.embedUrl}</div>
                </div>
                <button onClick={() => deleteGalleryVideo(video.id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}><Trash2 size={15} /></button>
              </div>
            ))}
            {galleryVideos.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: '10px' }}>
                No videos yet. Add a YouTube or Vimeo embed URL above.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
