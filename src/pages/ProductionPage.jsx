import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  Video, 
  Play, 
  Mic, 
  Film, 
  Camera, 
  Headphones, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Maximize2 
} from 'lucide-react';

export default function ProductionPage({ currentLang, productionGallery = [], openLeadModal }) {
  const t = translations[currentLang] || translations.en;
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = ['All', 'Documentary', 'Podcast & Vodcast', 'Corporate Film', 'Event Coverage'];

  const filteredItems = productionGallery.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const equipmentList = currentLang === 'ne' ? [
    { title: "सोनी FX सिनेमा सिरिज र जी-मास्टर लेन्सहरू", desc: "सिनेम्याटिक कलर प्रोफाइल सहित ४K १०-बिट ४:२:२ रेकर्डिङ।" },
    { title: "प्रसारण गुणस्तरका माइक तथा साउन्ड ट्रिटमेन्ट", desc: "श्योर SM7B ब्रोडकास्ट माइक, रोडकास्टर प्रो II मिक्सर, ध्वनिरोधक स्टुडियो।" },
    { title: "एप्युचर स्टुडियो लाइटिङ ग्रिड", desc: "६००d डेलाइट पोइन्ट-सोर्स, ल्यान्टर्न डिफ्युजर, आरजीबी एक्सन्ट ट्युब लाइट।" },
    { title: "डाभिन्ची रिजल्भ स्टुडियो र कलर ग्रेडिङ", desc: "क्यालिब्रेटेड मोनिटर सहित उच्च क्षमताको एम-सिरिज भिडियो एडिटिङ।" }
  ] : [
    { title: "Sony FX Cinema Series & G-Master Lenses", desc: "4K 10-bit 4:2:2 cinematic recording with cine color profiles." },
    { title: "Broadcast Microphones & Sound Treatment", desc: "Shure SM7B broadcast mics, Rodecaster Pro II mixers, acoustic diffusers." },
    { title: "Aputure Studio Lighting Grid", desc: "600d daylight point-sources, lantern diffusers, RGB accent tubes." },
    { title: "DaVinci Resolve Studio & Color Grading", desc: "High-spec M-series editing suites with hardware calibration." }
  ];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.production.badge}</span>
          <h1 className="section-title">{t.production.title}</h1>
          <p className="section-subtitle">{t.production.subtitle}</p>
        </div>

        {/* 1. Showreel Hero Banner */}
        <div 
          className="glass-card" 
          style={{ 
            position: 'relative', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden', 
            marginBottom: '72px', 
            border: '1px solid rgba(245, 158, 11, 0.4)' 
          }}
        >
          <div style={{ position: 'relative', height: '420px' }}>
            <img 
              src="/images/studio.jpg" 
              alt="Vedanta Strategies Production Studio Kathmandu" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,15,29,0.3) 0%, rgba(10,15,29,0.92) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Film size={16} /> {currentLang === 'ne' ? 'आधिकारिक २०२६ सोरिल' : 'OFFICIAL 2026 PRODUCTION SHOWREEL'}
              </div>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '12px', maxWidth: '700px' }}>
                {currentLang === 'ne' ? 'अर्थपूर्ण कथाहरू। प्रभावकारी दृश्यहरू।' : 'Stories That Resonate. Visuals That Command Attention.'}
              </h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1rem', maxWidth: '640px', marginBottom: '24px' }}>
                {currentLang === 'ne'
                  ? 'नेपालभर गरिएका वृत्तचित्र यात्रा, उच्चस्तरीय पोडकास्ट अन्तर्वार्ता र व्यावसायिक विज्ञापनहरूको ३ मिनेटको झलक।'
                  : 'A 3-minute montage showcasing documentary expeditions across Nepal, high-profile podcast interviews, and commercial brand launches.'
                }
              </p>
              <div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedVideo(productionGallery[0])}
                >
                  <Play size={18} fill="#000" /> {currentLang === 'ne' ? 'स्टुडियो सोरिल हेर्नुहोस् (३:१५)' : 'Watch Studio Showreel (3:15)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Categorized Portfolio */}
        <div style={{ marginBottom: '88px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--brand-navy)' }}>
              {currentLang === 'ne' ? 'निर्माण गरिएका भिडियो तथा रिलिजहरू' : 'Production Work & Releases'}
            </h2>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  style={{ fontSize: '0.85rem', padding: '6px 16px' }}
                >
                  {cat === 'All' ? (currentLang === 'ne' ? 'सबै निर्माण' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="production-showcase-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="production-card">
                <div className="production-thumb-wrap">
                  <img src={item.thumb} alt={getLangText(item, 'title', currentLang)} className="production-thumb" />
                  <div 
                    className="play-badge-overlay"
                    onClick={() => setSelectedVideo(item)}
                    title={currentLang === 'ne' ? 'भिडियो हेर्नुहोस्' : 'Watch Video'}
                  >
                    <Play size={22} fill="#000" />
                  </div>
                </div>

                <div className="production-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                    <span style={{ fontWeight: '700' }}>
                      {getLangText(item, 'category', currentLang) || item.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {item.duration}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--brand-navy)', lineHeight: '1.3' }}>
                    {getLangText(item, 'title', currentLang)}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '10px' }}>
                    {currentLang === 'ne' ? 'ग्राहक' : 'Client'}: {item.client}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {getLangText(item, 'summary', currentLang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Studio Equipment & Capabilities */}
        <div className="mindrisers-card" style={{ padding: '48px', marginBottom: '80px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ maxWidth: '680px', marginBottom: '36px' }}>
            <span className="section-badge" style={{ color: '#0284c7', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
              {currentLang === 'ne' ? 'स्टुडियो उपकरण तथा प्रविधि' : 'STUDIO SPECIFICATIONS'}
            </span>
            <h2 style={{ fontSize: '2rem', color: 'var(--brand-navy)', marginBottom: '12px' }}>
              {t.production.equipmentTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.7' }}>
              {t.production.equipmentDesc}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {equipmentList.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--brand-navy)', fontSize: '1rem', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color="#0284c7" /> {item.title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Production Inquiry CTA */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--brand-navy)', marginBottom: '14px' }}>
            {currentLang === 'ne' ? 'भिडियो वा पोडकास्ट परियोजनाको योजनामा हुनुहुन्छ?' : 'Planning a Production Project?'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '28px', lineHeight: '1.6' }}>
            {currentLang === 'ne'
              ? 'पुतलीसडकमा हाम्रो ध्वनिरोधक पोडकास्ट स्टुडियो आवश्यक होस् वा नेपालभर वृत्तचित्र छायांकन टोली, आफ्नो योजनाबारे छलफल गर्नुहोस्।'
              : "Whether you need our acoustic podcast studio in Putalisadak or a full documentary field crew across Nepal, let’s discuss your vision."
            }
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => openLeadModal('production')}>
            <Sparkles size={18} /> {currentLang === 'ne' ? 'प्रोडक्सन सोधपुछ दर्ता गर्नुहोस्' : 'Book Production Inquiry'}
          </button>
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
            <div className="modal-card" style={{ maxWidth: '820px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                  {getLangText(selectedVideo, 'title', currentLang)}
                </h3>
                <button className="modal-close-btn" style={{ position: 'static' }} onClick={() => setSelectedVideo(null)}>✕</button>
              </div>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                <iframe
                  title={getLangText(selectedVideo, 'title', currentLang)}
                  src={selectedVideo.videoUrl}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {getLangText(selectedVideo, 'summary', currentLang)} ({currentLang === 'ne' ? 'विधा' : 'Category'}: {getLangText(selectedVideo, 'category', currentLang) || selectedVideo.category} • {currentLang === 'ne' ? 'ग्राहक' : 'Client'}: {selectedVideo.client})
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
