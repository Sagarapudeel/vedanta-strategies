import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { BookOpen, Clock, Calendar, User, Search, X, Sparkles, ArrowRight } from 'lucide-react';

export default function BlogPage({ currentLang, blogPosts = [], openLeadModal }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'AI & Media Literacy', 'Digital Marketing', 'Behind the Scenes'];

  const filteredPosts = blogPosts.filter(post => {
    const postCat = (post.category || '').toLowerCase();
    const matchesCat = selectedCategory === 'All' || postCat === selectedCategory.toLowerCase();
    
    const title = getLangText(post, 'title', currentLang).toLowerCase();
    const titleEn = (post.title_en || post.title || '').toLowerCase();
    const titleNe = (post.title_ne || '').toLowerCase();
    const summary = getLangText(post, 'summary', currentLang).toLowerCase();
    const author = (post.author || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = 
      title.includes(q) ||
      titleEn.includes(q) ||
      titleNe.includes(q) ||
      summary.includes(q) ||
      author.includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            {currentLang === 'ne' ? 'ज्ञान भण्डार तथा अनुसन्धान' : 'RESOURCES & PERSPECTIVES'}
          </span>
          <h1 className="section-title">
            {currentLang === 'ne' ? 'ज्ञान केन्द्र तथा डिजिटल विश्लेषण' : 'Knowledge Hub & Industry Analysis'}
          </h1>
          <p className="section-subtitle">
            {currentLang === 'ne'
              ? 'नेपालमा कृत्रिम बौद्धिकता (AI), मिडिया साक्षरता र सिर्जनशील उत्पादनका बारेमा विश्लेषणात्मक लेखहरू र व्यावहारिक मार्गदर्शन।'
              : 'Essays, tactical playbooks, and research on artificial intelligence, media integrity, and creative production in Nepal.'
            }
          </p>
        </div>

        {/* Filter Bar */}
        <div className="blog-filter-bar">
          
          <div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                style={{ fontSize: '0.85rem', padding: '6px 16px' }}
              >
                {cat === 'All' ? (currentLang === 'ne' ? 'सबै लेखहरू' : 'All') : cat}
              </button>
            ))}
          </div>

          <div>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={currentLang === 'ne' ? 'लेख खोज्नुहोस्...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
            />
          </div>

        </div>

        {/* Posts Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="mindrisers-card blog-card">
              <div className="blog-card-meta">
                <span className="blog-card-category">
                  {getLangText(post, 'category', currentLang) || post.category}
                </span>
                <span style={{ color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>

              <h3 className="blog-card-title">
                {getLangText(post, 'title', currentLang)}
              </h3>

              <p className="blog-card-summary">
                {getLangText(post, 'summary', currentLang)}
              </p>

              <div className="blog-card-footer">
                <div style={{ fontSize: '0.82rem', color: 'var(--brand-navy)' }}>
                  <div style={{ fontWeight: '600' }}>{post.author}</div>
                  <div style={{ color: 'var(--text-subtle)', fontSize: '0.78rem' }}>{post.date}</div>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setActiveArticle(post)}
                >
                  <span>{currentLang === 'ne' ? 'पुरा लेख पढ्नुहोस्' : 'Read Article'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mindrisers-card newsletter-cta">
          <h3 className="newsletter-cta-heading">
            {currentLang === 'ne' ? 'महत्वपूर्ण विश्लेषण नछुटाउनुहोस्' : 'Never Miss a Tactical Breakdown'}
          </h3>
          <p className="newsletter-cta-desc">
            {currentLang === 'ne'
              ? 'हामी हरेक महिना नेपालको प्रविधि, मिडिया साक्षरता, शिक्षा र व्यवसायमा एआईको प्रभावबारे गहन विश्लेषण प्रकाशित गर्दछौँ।'
              : 'We publish monthly whitepapers and investigative essays dissecting how AI is transforming media literacy, education, and commerce in Nepal.'
            }
          </p>
          <button className="btn btn-primary" onClick={() => openLeadModal('general')}>
            <Sparkles size={16} /> {currentLang === 'ne' ? 'निःशुल्क न्यूजलेटर सदस्यता' : 'Subscribe to Free Newsletter'}
          </button>
        </div>

        {/* Full Article Reader Modal */}
        {activeArticle && (
          <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
            <div className="modal-card" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setActiveArticle(null)}>✕</button>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span className="course-category-badge">
                  {getLangText(activeArticle, 'category', currentLang) || activeArticle.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeArticle.readTime}</span>
              </div>

              <h1 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>
                {getLangText(activeArticle, 'title', currentLang)}
              </h1>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={15} color="#1C2F4D" /> By {activeArticle.author}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="#1C2F4D" /> {activeArticle.date}
                </div>
              </div>

              <div style={{ color: 'var(--text-light)', fontSize: '1.02rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {getLangText(activeArticle, 'content', currentLang) || getLangText(activeArticle, 'summary', currentLang)}
              </div>

              <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {currentLang === 'ne' ? 'यो जानकारी आफ्नो टिमसँग सेयर गर्नुहोस्' : 'Share this insight with your team'}
                </span>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveArticle(null)}>
                  {currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close Article'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
