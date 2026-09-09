import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Edit2, Globe, CheckCircle } from 'lucide-react';

export default function AdminBlog({ 
  blogPosts = [], 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    title_en: '',
    title_ne: '',
    category_en: 'AI & Media Literacy',
    category_ne: 'एआई तथा मिडिया साक्षरता',
    author: 'Vedanta Editorial Team',
    readTime: '5 min read',
    summary_en: '',
    summary_ne: '',
    content_en: '',
    content_ne: ''
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setActiveLangTab('en');
    setFormData({
      title_en: '',
      title_ne: '',
      category_en: 'AI & Media Literacy',
      category_ne: 'एआई तथा मिडिया साक्षरता',
      author: 'Vedanta Editorial Team',
      readTime: '4 min read',
      summary_en: '',
      summary_ne: '',
      content_en: '',
      content_ne: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setActiveLangTab('en');
    setFormData({
      title_en: post.title_en || post.title || '',
      title_ne: post.title_ne || '',
      category_en: post.category_en || post.category || 'AI & Media Literacy',
      category_ne: post.category_ne || 'एआई तथा मिडिया साक्षरता',
      author: post.author || 'Vedanta Editorial Team',
      readTime: post.readTime || '4 min read',
      summary_en: post.summary_en || post.summary || '',
      summary_ne: post.summary_ne || '',
      content_en: post.content_en || post.content || '',
      content_ne: post.content_ne || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title_en,
      title_en: formData.title_en,
      title_ne: formData.title_ne,
      category: formData.category_en,
      category_en: formData.category_en,
      category_ne: formData.category_ne,
      author: formData.author,
      readTime: formData.readTime,
      summary: formData.summary_en,
      summary_en: formData.summary_en,
      summary_ne: formData.summary_ne,
      content: formData.content_en,
      content_en: formData.content_en,
      content_ne: formData.content_ne
    };

    if (editingPost && updateBlogPost) {
      updateBlogPost(editingPost.id, payload);
    } else if (addBlogPost) {
      addBlogPost(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Blog & Knowledge Hub</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Publish practical essays, playbooks, and research in both English and Nepali.
          </p>
        </div>

        {addBlogPost && (
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={18} /> New Article
          </button>
        )}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title & Summary</th>
              <th>Category</th>
              <th>Author</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{post.title_en || post.title}</div>
                  {post.title_ne && (
                    <div style={{ fontSize: '0.82rem', color: '#f59e0b', marginTop: '2px' }}>
                      🇳🇵 {post.title_ne}
                    </div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {post.summary_en || post.summary?.substring(0, 75)}...
                  </div>
                </td>
                <td>
                  <span className="course-category-badge">
                    {post.category_en || post.category}
                  </span>
                </td>
                <td style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>{post.author}</td>
                <td style={{ color: 'var(--text-subtle)', fontSize: '0.82rem' }}>{post.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Edit Article"
                    >
                      <Edit2 size={14} />
                    </button>
                    {deleteBlogPost && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete post "${post.title_en || post.title}"?`)) {
                            deleteBlogPost(post.id);
                          }
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="#f59e0b" />
              <span>{editingPost ? 'Edit Article' : 'Publish New Article'}</span>
            </h2>

            {/* Language Switch Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'en' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                  background: activeLangTab === 'en' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇬🇧 English Article
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('ne')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'ne' ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                  background: activeLangTab === 'ne' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇳🇵 Nepali Article (नेपाली)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Prerana Sharma"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="form-input"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              {activeLangTab === 'en' ? (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Article Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="form-input"
                      placeholder="e.g. 5 Simple Ways Nepali Students Can Use ChatGPT for Studies"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Category (English)</label>
                    <input
                      type="text"
                      value={formData.category_en}
                      onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
                      className="form-input"
                      placeholder="e.g. AI & Media Literacy"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Executive Summary (English) *</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.summary_en}
                      onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })}
                      className="form-input"
                      placeholder="Brief overview shown on cards..."
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Full Article Content (English) *</label>
                    <textarea
                      rows={6}
                      required
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      className="form-input"
                      placeholder="Full article body..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">लेखको शीर्षक (नेपाली) *</label>
                    <input
                      type="text"
                      value={formData.title_ne}
                      onChange={(e) => setFormData({ ...formData, title_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: नेपाली विद्यार्थीहरूले पढाइमा च्याटजीपिटी सदुपयोग गर्ने ५ सरल उपाय"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">विधा / वर्ग (नेपाली)</label>
                    <input
                      type="text"
                      value={formData.category_ne}
                      onChange={(e) => setFormData({ ...formData, category_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: एआई तथा मिडिया साक्षरता"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">संक्षिप्त सारांश (नेपाली)</label>
                    <textarea
                      rows={2}
                      value={formData.summary_ne}
                      onChange={(e) => setFormData({ ...formData, summary_ne: e.target.value })}
                      className="form-input"
                      placeholder="लेखको मुख्य निष्कर्ष वा सार..."
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">पूर्ण लेख विवरण (नेपाली)</label>
                    <textarea
                      rows={6}
                      value={formData.content_ne}
                      onChange={(e) => setFormData({ ...formData, content_ne: e.target.value })}
                      className="form-input"
                      placeholder="नेपालीमा लेखको सम्पूर्ण विवरण..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish to Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
