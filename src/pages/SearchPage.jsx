import React, { useMemo, useState } from 'react';
import {
  Search,
  GraduationCap,
  Briefcase,
  FileText,
  Users,
  Building2,
  Image as ImageIcon,
  Video,
  Globe,
  ChevronRight,
  SearchX
} from 'lucide-react';
import { PUBLIC_PAGES } from '../lib/seoConfig';

const norm = (value) => String(value || '').toLowerCase();

export default function SearchPage({ query: initialQuery, onQueryChange, store, goToPage, currentLang }) {
  const [query, setQuery] = useState(initialQuery || '');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];

    const has = (text) => norm(text).includes(q);

    const groups = [];
    const push = (slug, icon, label, items) => {
      if (items.length > 0) groups.push({ slug, icon, label, items });
    };

    // Courses & Training
    const courses = (store?.courses || [])
      .map((c) => ({
        id: c.id,
        title: currentLang === 'ne' ? c.title_ne || c.title : c.title_en || c.title,
        subtitle: [c.category, c.duration].filter(Boolean).join(' · '),
        page: c.track === 'institutional' ? 'institutional-training' : 'individual-training',
        searchable: [
          c.title, c.title_en, c.title_ne,
          c.tagline, c.tagline_en, c.tagline_ne,
          c.category, c.category_en, c.category_ne,
          c.duration, c.duration_en, c.duration_ne,
          c.mode, c.mentor,
          ...(c.curriculum || []),
          ...(c.curriculum_en || []),
          ...(c.curriculum_ne || [])
        ].join(' ')
      }))
      .filter((c) => has(c.searchable));
    push('courses', GraduationCap, currentLang === 'ne' ? 'पाठ्यक्रम तथा तालिम' : 'Courses & Training', courses);

    // Services
    const services = (store?.services || [])
      .map((s) => ({
        id: s.id,
        title: currentLang === 'ne' ? s.title_ne || s.title : s.title_en || s.title,
        subtitle: currentLang === 'ne' ? s.tag_ne || s.tag : s.tag_en || s.tag,
        page: 'services',
        searchable: [
          s.title, s.title_en, s.title_ne,
          s.tag, s.tag_en, s.tag_ne,
          s.shortDesc, s.shortDesc_en, s.shortDesc_ne,
          ...(s.deliverables || []),
          ...(s.deliverables_en || []),
          ...(s.deliverables_ne || [])
        ].join(' ')
      }))
      .filter((s) => has(s.searchable));
    push('services', Briefcase, currentLang === 'ne' ? 'सेवाहरू' : 'Services', services);

    // Blog posts
    const posts = (store?.blogPosts || [])
      .map((b) => ({
        id: b.id,
        title: currentLang === 'ne' ? b.title_ne || b.title : b.title_en || b.title,
        subtitle: [b.category, b.author].filter(Boolean).join(' · '),
        page: 'blog',
        searchable: [
          b.title, b.title_en, b.title_ne,
          b.category, b.category_en, b.category_ne,
          b.author,
          b.summary_en, b.summary_ne,
          b.content_en, b.content_ne
        ].join(' ')
      }))
      .filter((b) => has(b.searchable));
    push('posts', FileText, currentLang === 'ne' ? 'ब्लग लेखहरू' : 'Blog Articles', posts);

    // Team members
    const team = (store?.teamMembers || [])
      .map((m) => ({
        id: m.id,
        title: m.name,
        subtitle: currentLang === 'ne' ? m.role_ne || m.role : m.role_en || m.role,
        page: 'team',
        searchable: [
          m.name,
          m.role, m.role_en, m.role_ne,
          m.specialty, m.specialty_en, m.specialty_ne,
          m.bio_en, m.bio_ne
        ].join(' ')
      }))
      .filter((m) => has(m.searchable));
    push('team', Users, currentLang === 'ne' ? 'टिम सदस्यहरू' : 'Team Members', team);

    // Partners
    const partners = (store?.partners || [])
      .map((p) => ({
        id: p.id,
        title: currentLang === 'ne' ? p.name_ne || p.name : p.name_en || p.name,
        subtitle: currentLang === 'ne' ? p.sub_ne || p.sub : p.sub_en || p.sub,
        page: 'home',
        searchable: [p.name, p.name_en, p.name_ne, p.sub, p.sub_en, p.sub_ne].join(' ')
      }))
      .filter((p) => has(p.searchable));
    push('partners', Building2, currentLang === 'ne' ? 'साझेदारहरू' : 'Partners', partners);

    // Gallery photos
    const photos = (store?.media?.galleryPhotos || [])
      .map((ph) => ({
        id: ph.id,
        title: ph.caption,
        subtitle: ph.date || 'Gallery',
        page: 'gallery',
        searchable: [ph.caption, ph.date].join(' ')
      }))
      .filter((ph) => has(ph.searchable));
    push('photos', ImageIcon, currentLang === 'ne' ? 'ग्यालेरी फोटोहरू' : 'Gallery Photos', photos);

    // Gallery videos
    const videos = (store?.media?.galleryVideos || [])
      .map((v) => ({
        id: v.id,
        title: v.title,
        subtitle: v.platform || 'Video',
        page: 'gallery-videos',
        searchable: [v.title, v.platform].join(' ')
      }))
      .filter((v) => has(v.searchable));
    push('videos', Video, currentLang === 'ne' ? 'ग्यालेरी भिडियोहरू' : 'Gallery Videos', videos);

    // Static pages (searchable by name/description)
    const pages = PUBLIC_PAGES
      .filter((p) => p.id !== 'search')
      .map((p) => ({
        id: p.id,
        title: currentLang === 'ne' ? p.titleNe : p.title,
        subtitle: currentLang === 'ne' ? 'पृष्ठ' : 'Page',
        page: p.id,
        searchable: [p.title, p.titleNe, p.description, p.descriptionNe].join(' ')
      }))
      .filter((p) => has(p.searchable));
    push('pages', Globe, currentLang === 'ne' ? 'पृष्ठहरू' : 'Pages', pages);

    return groups;
  }, [q, store, currentLang]);

  const total = results.reduce((sum, g) => sum + g.items.length, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onQueryChange && query.trim()) onQueryChange(query.trim());
  };

  const open = (page) => {
    if (onQueryChange) onQueryChange(query.trim());
    goToPage(page);
  };

  return (
    <div className="page-wrapper search-page">
      {/* Search Hero */}
      <div
        style={{
          background: 'var(--brand-navy)',
          padding: '56px 0 48px 0',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <span className="section-label-num" style={{ color: '#B68A28', display: 'inline-block', marginBottom: '10px' }}>
            0{currentLang === 'ne' ? '4' : '5'} — {currentLang === 'ne' ? 'खोज' : 'SEARCH'}
          </span>
          <h1 style={{ color: '#fff', fontSize: '2.4rem', fontWeight: '700', marginBottom: '18px', lineHeight: 1.15 }}>
            {currentLang === 'ne' ? 'वेदान्त स्ट्र्याटेजीजमा खोज्नुहोस्' : 'Search Vedanta Strategies'}
          </h1>
          <form onSubmit={handleSubmit} className="search-hero-form">
            <Search size={20} color="#1C2F4D" className="search-hero-icon" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentLang === 'ne' ? 'पाठ्यक्रम, सेवा, लेख वा टिम खोज्नुहोस्...' : 'Search courses, services, articles, team...'}
              className="search-hero-input"
            />
            <button type="submit" className="btn btn-primary">{currentLang === 'ne' ? 'खोज' : 'Search'}</button>
          </form>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '36px' }}>
        {!q && (
          <div className="search-empty">
            <Search size={40} color="#B68A28" />
            <div>{currentLang === 'ne' ? 'केही टाइप गरेर खोज्नुहोस्' : 'Type something to search'}</div>
            <div>
              {currentLang === 'ne'
                ? 'पाठ्यक्रम, सेवा, ब्लग, टिम, साझेदार र ग्यालेरी — सबै एकै ठाउँमा।'
                : 'Courses, services, blog, team, partners and gallery — all in one place.'}
            </div>
          </div>
        )}

        {q && total === 0 && (
          <div className="search-empty">
            <SearchX size={40} color="#B68A28" />
            <div>{currentLang === 'ne' ? `"${q}" का लागि कुनै नतिजा भेटिएन` : `No results found for "${q}"`}</div>
            <div>
              {currentLang === 'ne'
                ? 'फरक शब्द वा छोटो शब्दले प्रयास गर्नुहोस्।'
                : 'Try a different keyword or a shorter search term.'}
            </div>
          </div>
        )}

        {q && total > 0 && (
          <div className="search-results">
            <div className="search-summary">
              {total} {currentLang === 'ne' ? 'नतिजा भेटिए' : 'results for'} “{q}”
              <button type="button" className="search-clear" onClick={() => setQuery('')}>
                <SearchX size={14} /> {currentLang === 'ne' ? 'सफा गर्नुहोस्' : 'Clear'}
              </button>
            </div>

            {results.map((group) => {
              const GroupIcon = group.icon;
              return (
                <section key={group.slug} className="search-group">
                  <div className="search-group-head">
                    <GroupIcon size={16} color="#B68A28" />
                    <span>{group.label}</span>
                    <span className="search-group-count">{group.items.length}</span>
                  </div>
                  <div className="search-group-list">
                    {group.items.map((item) => (
                      <button
                        key={group.slug + '-' + item.id}
                        type="button"
                        className="search-item"
                        onClick={() => open(item.page)}
                      >
                        <span className="search-item-icon">
                          <GroupIcon size={18} color="#ffffff" />
                        </span>
                        <span className="search-item-text">
                          <span className="search-item-title">{item.title}</span>
                          {item.subtitle && <span className="search-item-sub">{item.subtitle}</span>}
                        </span>
                        <ChevronRight size={16} color="#B68A28" className="search-item-chevron" />
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}