import React, { useState } from 'react';
import { X, Play, Image, Video, ZoomIn } from 'lucide-react';

export default function GalleryPage({ media = {}, currentLang }) {
  const [activeTab, setActiveTab] = useState('photos');
  const [lightbox, setLightbox] = useState(null); // { type: 'photo'|'video', item }

  const photos = (media.galleryPhotos || []);
  const videos = (media.galleryVideos || []);

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px', minHeight: '60vh' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--brand-navy)', padding: '56px 0 48px 0', marginBottom: '0' }}>
        <div className="container">
          <div className="section-label">
            <span className="section-label-num" style={{ background: 'var(--brand-gold)' }}>04</span>
            <div className="section-label-line" style={{ background: 'rgba(255,255,255,0.2)' }}></div>
            <span className="section-label-text" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {currentLang === 'ne' ? 'मिडिया' : 'MEDIA'}
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '2.8rem', fontWeight: '700', marginBottom: '12px', lineHeight: 1.15 }}>
            {currentLang === 'ne' ? 'ग्यालेरी' : 'Gallery'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '560px' }}>
            {currentLang === 'ne'
              ? 'वेदान्त स्ट्राटेजिजका कार्यशाला, तालिम र कार्यक्रमका झलकहरू।'
              : 'Photos and videos from Vedanta Strategies workshops, training sessions, and events.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Tab Bar */}
        <div className="gallery-tabs">
          <button id="gallery-tab-photos" onClick={() => setActiveTab('photos')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', border: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', borderRight: '1px solid var(--border-color)',
              background: activeTab === 'photos' ? 'var(--brand-navy)' : '#fff',
              color: activeTab === 'photos' ? '#fff' : 'var(--text-body)' }}>
            <Image size={16} />
            {currentLang === 'ne' ? 'फोटो' : 'Photos'} ({photos.length})
          </button>
          <button id="gallery-tab-videos" onClick={() => setActiveTab('videos')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', border: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
              background: activeTab === 'videos' ? 'var(--brand-navy)' : '#fff',
              color: activeTab === 'videos' ? '#fff' : 'var(--text-body)' }}>
            <Video size={16} />
            {currentLang === 'ne' ? 'भिडियो' : 'Videos'} ({videos.length})
          </button>
        </div>

        {/* Photos Grid */}
        {activeTab === 'photos' && (
          <>
            {photos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                <Image size={40} color="#cbd5e1" style={{ marginBottom: '12px' }} />
                <div style={{ fontWeight: '600' }}>No photos yet</div>
                <div style={{ fontSize: '0.88rem', marginTop: '4px' }}>Photos will appear here once added from the admin panel.</div>
              </div>
            ) : (
              <div className="gallery-photo-grid">
                {photos.map((photo) => (
                  <div key={photo.id}
                    onClick={() => setLightbox({ type: 'photo', item: photo })}
                    style={{ breakInside: 'avoid', marginBottom: '16px', cursor: 'zoom-in', position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'block' }}
                    className="gallery-photo-thumb">
                    <img src={photo.url} alt={photo.caption}
                      style={{ width: '100%', display: 'block', verticalAlign: 'top' }}
                      onError={e => { e.target.src = ''; e.target.style.background = '#f1f5f9'; e.target.style.minHeight = '120px'; }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(23,38,66,0)', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      className="gallery-thumb-overlay">
                      <ZoomIn size={28} color="#fff" style={{ opacity: 0, transition: 'opacity 0.2s' }} className="gallery-zoom-icon" />
                    </div>
                    {photo.caption && (
                      <div style={{ padding: '8px 12px', background: '#fff', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{photo.caption}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <>
            {videos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                <Video size={40} color="#cbd5e1" style={{ marginBottom: '12px' }} />
                <div style={{ fontWeight: '600' }}>No videos yet</div>
                <div style={{ fontSize: '0.88rem', marginTop: '4px' }}>Videos will appear here once added from the admin panel.</div>
              </div>
            ) : (
              <div className="gallery-video-grid">
                {videos.map((video) => {
                  const platformColors = { youtube: '#ff0000', tiktok: '#010101', facebook: '#1877f2', other: '#64748b' };
                  const platformLabels = { youtube: 'YouTube', tiktok: 'TikTok', facebook: 'Facebook', other: 'Video' };
                  const platform = video.platform || 'other';
                  return (
                    <div key={video.id} style={{ background: '#0f172a', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                      {/* Live embed iframe */}
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
                        />
                      </div>
                      {/* Title + platform badge */}
                      <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ background: platformColors[platform], color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '0.68rem', fontWeight: '700', flexShrink: 0 }}>
                          {platformLabels[platform]}
                        </span>
                        <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '600', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {video.title || 'Untitled'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <button onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '20px', right: '24px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>

          {lightbox.type === 'photo' && (
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
              <img src={lightbox.item.url} alt={lightbox.item.caption}
                style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '6px' }} />
              {lightbox.item.caption && (
                <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: '12px', fontSize: '0.9rem' }}>{lightbox.item.caption}</div>
              )}
            </div>
          )}

          {lightbox.type === 'video' && (
            <div onClick={e => e.stopPropagation()} style={{ width: 'min(860px, 90vw)', aspectRatio: '16/9' }}>
              <iframe src={lightbox.item.embedUrl} title={lightbox.item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '6px' }} />
            </div>
          )}
        </div>
      )}

      <style>{`
        .gallery-photo-thumb:hover .gallery-thumb-overlay { background: rgba(23,38,66,0.45) !important; }
        .gallery-photo-thumb:hover .gallery-zoom-icon { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
