import React, { useState, useEffect } from 'react';
import { X, Image, Video, ZoomIn } from 'lucide-react';

export default function GalleryPage({ media = {}, currentLang, kind = 'photos' }) {
  const [lightbox, setLightbox] = useState(null); // { type: 'photo'|'video', item }

  const photos = (media.galleryPhotos || []);
  const videos = (media.galleryVideos || []);
  const isVideos = kind === 'videos';

  useEffect(() => {
    if (!lightbox) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [lightbox]);

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div style={{ background: 'var(--brand-navy)', padding: '56px 0 48px 0', marginBottom: '0' }}>
        <div className="container">
          <div className="section-label">
            <span className="section-label-num" style={{ background: 'var(--brand-maroon)' }}>04</span>
            <div className="section-label-line" style={{ background: 'rgba(255,255,255,0.2)' }}></div>
            <span className="section-label-text" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {currentLang === 'ne' ? 'मिडिया' : 'MEDIA'}
            </span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '2.8rem', fontWeight: '700', marginBottom: '12px', lineHeight: 1.15 }}>
            {isVideos
              ? (currentLang === 'ne' ? 'भिडियो ग्यालेरी' : 'Video Gallery')
              : (currentLang === 'ne' ? 'ग्यालेरी' : 'Gallery')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', maxWidth: '560px' }}>
            {isVideos
              ? (currentLang === 'ne'
                  ? 'वेदान्त स्ट्राटेजिजका कार्यशाला, तालिम र कार्यक्रमका भिडियोहरू।'
                  : 'Videos from Vedanta Strategies workshops, training sessions, and events.')
              : (currentLang === 'ne'
                  ? 'वेदान्त स्ट्राटेजिजका कार्यशाला, तालिम र कार्यक्रमका झलकहरू।'
                  : 'Photos and videos from Vedanta Strategies workshops, training sessions, and events.')}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Photos Grid */}
        {!isVideos && (
          <>
            {photos.length === 0 ? (
              <div className="gallery-empty-state">
                <Image size={40} color="#cbd5e1" />
                <div>No photos yet</div>
                <div>Photos will appear here once added from the admin panel.</div>
              </div>
            ) : (
              <div className="gallery-photo-grid">
                {photos.map((photo) => (
                  <div key={photo.id}
                    onClick={() => setLightbox({ type: 'photo', item: photo })}
                    className="gallery-photo-thumb">
                    <img src={photo.url} alt={photo.caption}
                      onError={e => { e.target.src = ''; e.target.style.background = '#f1f5f9'; e.target.style.minHeight = '120px'; }} />
                    <div className="gallery-thumb-overlay">
                      <ZoomIn size={28} color="#fff" className="gallery-zoom-icon" />
                    </div>
                    {photo.caption && (
                      <div>{photo.caption}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Videos Grid */}
        {isVideos && (
          <>
            {videos.length === 0 ? (
              <div className="gallery-empty-state">
                <Video size={40} color="#cbd5e1" />
                <div>No videos yet</div>
                <div>Videos will appear here once added from the admin panel.</div>
              </div>
            ) : (
              <div className="gallery-video-grid">
                {videos.map((video) => {
                  const platformColors = { youtube: '#ff0000', tiktok: '#010101', facebook: '#1877f2', other: '#64748b' };
                  const platformLabels = { youtube: 'YouTube', tiktok: 'TikTok', facebook: 'Facebook', other: 'Video' };
                  const platform = video.platform || 'other';
                  return (
                    <div key={video.id} className="video-card">
                      {/* Live embed iframe */}
                      <div className="video-card-embed">
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {/* Title + platform badge */}
                      <div className="video-card-info">
                        <span style={{ background: platformColors[platform], color: '#fff' }}>
                          {platformLabels[platform]}
                        </span>
                        <div>
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
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Media lightbox">
          <button onClick={() => setLightbox(null)}
            className="gallery-lightbox-close"
            aria-label="Close lightbox">
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
    </div>
  );
}