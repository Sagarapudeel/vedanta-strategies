import React, { useState, useRef } from 'react';
import { Image, Video, UploadCloud, Trash2, Plus, CheckCircle, Link, Play, ExternalLink } from 'lucide-react';

// ─── VIDEO URL PARSER ────────────────────────────────────────────────────────
function parseVideoUrl(raw) {
  if (!raw || !raw.trim()) return null;
  const url = raw.trim();

  // Already an embed URL
  if (url.includes('/embed/')) return { embedUrl: url, platform: 'youtube' };

  // YouTube standard: youtube.com/watch?v=ID  or  youtu.be/ID
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return { embedUrl: `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`, platform: 'youtube' };

  // YouTube Shorts
  m = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return { embedUrl: `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`, platform: 'youtube' };

  // TikTok: tiktok.com/@user/video/ID
  m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (m) return { embedUrl: `https://www.tiktok.com/embed/v2/${m[1]}`, platform: 'tiktok' };

  // Facebook video
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    const encoded = encodeURIComponent(url);
    return { embedUrl: `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=0&width=560`, platform: 'facebook' };
  }

  return { embedUrl: url, platform: 'other' };
}

const PLATFORM_COLORS = { youtube: '#ff0000', tiktok: '#010101', facebook: '#1877f2', other: '#64748b' };
const PLATFORM_LABELS = { youtube: 'YouTube', tiktok: 'TikTok', facebook: 'Facebook', other: 'Video' };

// ─── FILE → BASE64 ───────────────────────────────────────────────────────────
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── REUSABLE IMAGE INPUT (upload + URL) ─────────────────────────────────────
function ImageInput({ label, value, onChange, hint, previewHeight = 160 }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) { alert('Please select an image file (JPG, PNG, WebP, SVG)'); return; }
    setUploading(true);
    try { onChange(await readFileAsDataURL(file)); }
    catch { alert('Failed to read image file'); }
    finally { setUploading(false); }
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {hint && <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '8px' }}>{hint}</div>}

      {/* Drag & drop zone */}
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
          {uploading ? 'Reading…' : 'Click to upload or drag & drop'}
        </div>
        <div style={{ fontSize: '0.73rem', color: 'var(--text-subtle)', marginTop: '3px' }}>JPG, PNG, WebP, SVG</div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { handleFile(e.target.files?.[0]); e.target.value = ''; }} />
      </div>

      {/* OR divider */}
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

      {/* Preview */}
      {value && (
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#1e293b', position: 'relative' }}>
          <img src={value} alt="Preview"
            style={{ width: '100%', height: `${previewHeight}px`, objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; }} />
          {value?.startsWith('data:') && (
            <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.65)', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', color: '#4ade80' }}>
              ✓ Uploaded
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
const SectionCard = ({ icon, title, children }) => (
  <div style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '28px', marginBottom: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ color: '#fbbf24' }}>{icon}</span>
      <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0 }}>{title}</h3>
    </div>
    {children}
  </div>
);

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function AdminMedia({ media = {}, updateMedia, addGalleryPhoto, deleteGalleryPhoto, addGalleryVideo, deleteGalleryVideo }) {
  const [saved, setSaved] = useState(false);
  const [localMedia, setLocalMedia] = useState({
    heroImage: media.heroImage || '/images/hero.jpg',
    heroImageAlt: media.heroImageAlt || 'Vedanta Strategies Training Workshop',
    siteLogo: media.siteLogo || '/images/logo.svg',
    banners: media.banners || {}
  });

  // Video form
  const [newVideo, setNewVideo] = useState({ title: '', rawUrl: '' });
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoError, setVideoError] = useState('');

  // Photo form
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const photoFileRef = useRef();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [draggingPhoto, setDraggingPhoto] = useState(false);

  const [activeTab, setActiveTab] = useState('site');
  const galleryPhotos = media.galleryPhotos || [];
  const galleryVideos = media.galleryVideos || [];

  const handleSave = () => {
    updateMedia(localMedia);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Video URL change → auto-parse
  const handleVideoUrlChange = (raw) => {
    setNewVideo(p => ({ ...p, rawUrl: raw }));
    setVideoError('');
    if (!raw.trim()) { setVideoPreview(null); return; }
    const parsed = parseVideoUrl(raw);
    if (parsed) setVideoPreview(parsed);
    else { setVideoPreview(null); setVideoError('Could not detect platform. Try a YouTube, TikTok, or Facebook video link.'); }
  };

  const handleAddVideo = () => {
    if (!newVideo.rawUrl.trim()) return;
    const parsed = parseVideoUrl(newVideo.rawUrl.trim());
    if (!parsed) { setVideoError('Invalid video URL'); return; }
    addGalleryVideo({ title: newVideo.title.trim() || 'Untitled Video', embedUrl: parsed.embedUrl, platform: parsed.platform, rawUrl: newVideo.rawUrl.trim() });
    setNewVideo({ title: '', rawUrl: '' });
    setVideoPreview(null);
  };

  const handlePhotoFile = async (file) => {
    if (!file?.type.startsWith('image/')) { alert('Please select an image file'); return; }
    setUploadingPhoto(true);
    try { setNewPhotoUrl(await readFileAsDataURL(file)); }
    finally { setUploadingPhoto(false); }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    addGalleryPhoto({ url: newPhotoUrl.trim(), caption: newPhotoCaption, date: new Date().getFullYear().toString() });
    setNewPhotoUrl('');
    setNewPhotoCaption('');
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
        <p style={{ color: 'var(--text-subtle)', fontSize: '0.88rem' }}>Upload images directly from your device, or paste any YouTube, TikTok, or Facebook video URL — it auto-converts to an embed.</p>
      </div>

      {/* Tab bar */}
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

      {/* ── SITE IMAGES ── */}
      {activeTab === 'site' && (
        <div>
          <SectionCard icon={<UploadCloud size={20} />} title="Hero Image — Homepage Full-Bleed">
            <ImageInput label="Hero Image" value={localMedia.heroImage}
              onChange={v => setLocalMedia(p => ({ ...p, heroImage: v }))}
              hint="Recommended: 1920×1080px, JPG/WebP/PNG. You can upload directly from your computer."
              previewHeight={200} />
            <div className="form-group">
              <label className="form-label">Alt Text (SEO & Accessibility)</label>
              <input type="text" value={localMedia.heroImageAlt}
                onChange={e => setLocalMedia(p => ({ ...p, heroImageAlt: e.target.value }))}
                className="form-input" placeholder="Vedanta Strategies Training Workshop in Kathmandu" />
            </div>
          </SectionCard>

          <SectionCard icon={<Image size={20} />} title="Site Logo — Navbar & Footer">
            <ImageInput label="Logo File (SVG or PNG recommended)" value={localMedia.siteLogo}
              onChange={v => setLocalMedia(p => ({ ...p, siteLogo: v }))}
              hint="SVG scales perfectly at any size. Transparent background recommended."
              previewHeight={80} />
          </SectionCard>

          <SectionCard icon={<Link size={20} />} title="Page Banner Images (Optional)">
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.84rem', marginBottom: '16px' }}>Header images for sub-pages. Leave blank to use default navy gradient.</p>
            {['about', 'training', 'contact', 'gallery'].map(page => (
              <ImageInput key={page}
                label={`${page.charAt(0).toUpperCase() + page.slice(1)} Page Banner`}
                value={localMedia.banners?.[page] || ''}
                onChange={v => setLocalMedia(p => ({ ...p, banners: { ...(p.banners || {}), [page]: v } }))}
                previewHeight={100} />
            ))}
          </SectionCard>

          <button onClick={handleSave} className="btn btn-primary">
            {saved ? <><CheckCircle size={16} /> Saved!</> : <><UploadCloud size={16} /> Save All Changes</>}
          </button>
        </div>
      )}

      {/* ── PHOTOS ── */}
      {activeTab === 'photos' && (
        <div>
          <SectionCard icon={<Plus size={20} />} title="Add Photo to Gallery">
            {/* Drop zone */}
            <div
              onClick={() => photoFileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDraggingPhoto(true); }}
              onDragLeave={() => setDraggingPhoto(false)}
              onDrop={e => { e.preventDefault(); setDraggingPhoto(false); handlePhotoFile(e.dataTransfer.files?.[0]); }}
              style={{ border: `2px dashed ${draggingPhoto ? '#fbbf24' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '28px', cursor: 'pointer', textAlign: 'center', marginBottom: '14px', background: draggingPhoto ? 'rgba(251,191,36,0.05)' : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}
            >
              <UploadCloud size={26} color="#fbbf24" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '600' }}>
                {uploadingPhoto ? 'Reading file…' : 'Click or drag & drop to upload photo'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px' }}>JPG, PNG, WebP, SVG</div>
              <input ref={photoFileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { handlePhotoFile(e.target.files?.[0]); e.target.value = ''; }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>or paste image URL</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Photo URL</label>
                <input type="text"
                  value={newPhotoUrl?.startsWith('data:') ? '(file uploaded ✓)' : newPhotoUrl}
                  onChange={e => setNewPhotoUrl(e.target.value)}
                  className="form-input" placeholder="https://... or /images/photo.jpg"
                  readOnly={newPhotoUrl?.startsWith('data:')} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Caption</label>
                <input type="text" value={newPhotoCaption} onChange={e => setNewPhotoCaption(e.target.value)}
                  className="form-input" placeholder="AI Workshop, Batch 14…" />
              </div>
            </div>

            {newPhotoUrl && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
                <img src={newPhotoUrl} alt="preview" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAddPhoto} className="btn btn-primary btn-sm" disabled={!newPhotoUrl}>
                <Plus size={15} /> Add to Gallery
              </button>
              {newPhotoUrl && (
                <button onClick={() => { setNewPhotoUrl(''); setNewPhotoCaption(''); }} className="btn btn-secondary btn-sm">
                  Clear
                </button>
              )}
            </div>
          </SectionCard>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '14px' }}>
            {galleryPhotos.map(photo => (
              <div key={photo.id} style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ height: '130px', background: '#1e293b' }}>
                  <img src={photo.url} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.caption || 'No caption'}</div>
                  <button onClick={() => deleteGalleryPhoto(photo.id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '2px' }}><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
            {galleryPhotos.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: '10px' }}>
                No photos yet. Upload or paste a URL above.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── VIDEOS ── */}
      {activeTab === 'videos' && (
        <div>
          <SectionCard icon={<Video size={20} />} title="Add Video — Paste Any YouTube, TikTok or Facebook URL">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Video Title</label>
                <input type="text" value={newVideo.title} onChange={e => setNewVideo(p => ({ ...p, title: e.target.value }))}
                  className="form-input" placeholder="AI Workshop Highlights, Batch 12…" />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Video URL *</label>
                <input type="text" value={newVideo.rawUrl} onChange={e => handleVideoUrlChange(e.target.value)}
                  className="form-input" placeholder="Paste YouTube / TikTok / Facebook video link here" />
                <div style={{ fontSize: '0.73rem', color: 'var(--text-subtle)', marginTop: '5px' }}>
                  Supports: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, tiktok.com/@user/video/, facebook.com video links
                </div>
              </div>

              {/* Live preview */}
              {videoPreview && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ background: PLATFORM_COLORS[videoPreview.platform], color: '#fff', borderRadius: '4px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: '700' }}>
                      {PLATFORM_LABELS[videoPreview.platform]}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>✓ URL detected — live preview</span>
                    <a href={newVideo.rawUrl} target="_blank" rel="noreferrer"
                      style={{ marginLeft: 'auto', color: '#38bdf8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                      <ExternalLink size={12} /> Open original
                    </a>
                  </div>
                  <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#000', border: '1px solid var(--border-subtle)' }}>
                    <iframe src={videoPreview.embedUrl} width="100%" height="260" frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen style={{ display: 'block' }} />
                  </div>
                </div>
              )}
              {videoError && <div style={{ color: '#f87171', fontSize: '0.8rem' }}>⚠ {videoError}</div>}
            </div>

            <button onClick={handleAddVideo} className="btn btn-primary btn-sm" disabled={!newVideo.rawUrl.trim()}>
              <Plus size={15} /> Add Video
            </button>
          </SectionCard>

          {/* Saved videos list with embed previews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {galleryVideos.map(video => (
              <div key={video.id} style={{ background: 'var(--admin-card-bg)', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ background: '#000', height: '220px' }}>
                  <iframe src={video.embedUrl} width="100%" height="220" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen style={{ display: 'block' }} />
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ background: PLATFORM_COLORS[video.platform || 'other'], color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: '700', flexShrink: 0 }}>
                    {PLATFORM_LABELS[video.platform || 'other']}
                  </span>
                  <div style={{ flex: 1, fontWeight: '600', color: '#fff', fontSize: '0.88rem' }}>{video.title || 'Untitled'}</div>
                  <button onClick={() => deleteGalleryVideo(video.id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {galleryVideos.length === 0 && (
              <div style={{ textAlign: 'center', padding: '56px', color: 'var(--text-muted)', border: '1px dashed var(--border-subtle)', borderRadius: '10px' }}>
                <Play size={36} color="var(--text-subtle)" style={{ marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
                <div style={{ fontWeight: '600' }}>No videos yet</div>
                <div style={{ fontSize: '0.83rem', marginTop: '4px' }}>Paste a YouTube, TikTok, or Facebook URL above.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
