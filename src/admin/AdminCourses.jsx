import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, CheckCircle, X, BookOpen, Clock, Award, Globe } from 'lucide-react';

export default function AdminCourses({ courses = [], addCourse, updateCourse, deleteCourse }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState('en');

  const [formData, setFormData] = useState({
    title_en: '',
    title_ne: '',
    tagline_en: '',
    tagline_ne: '',
    duration_en: '6 Weeks (36 Hours)',
    duration_ne: '६ हप्ता (३६ घण्टा)',
    mode_en: 'Putalisadak Physical Lab & Live Online',
    mode_ne: 'पुतलीसडक भौतिक ल्याब तथा अनलाइन',
    nextBatch_en: 'Sunday, 15th Ashoj (Morning 7:00 AM)',
    nextBatch_ne: 'आइतबार, १५ असोज (बिहान ७:००)',
    curriculum_en: '',
    curriculum_ne: '',
    category: 'ai',
    track: 'individual',
    fee: 14000,
    mentor: 'Er. Suman Adhikari',
    featured: true
  });

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setActiveLangTab('en');
    setFormData({
      title_en: '',
      title_ne: '',
      tagline_en: '',
      tagline_ne: '',
      duration_en: '6 Weeks (36 Hours)',
      duration_ne: '६ हप्ता (३६ घण्टा)',
      mode_en: 'Putalisadak Campus or Live Online',
      mode_ne: 'पुतलीसडक क्याम्पस वा प्रत्यक्ष अनलाइन',
      nextBatch_en: 'Sunday, 15th Ashoj (Morning 7:00 AM & Evening 5:30 PM)',
      nextBatch_ne: 'आइतबार, १५ असोज (बिहान ७:०० र बेलुकी ५:३०)',
      curriculum_en: 'Module 1: Practical Fundamentals\nModule 2: Real-world Workflows\nModule 3: Final Project Submission',
      curriculum_ne: 'खण्ड १: व्यावहारिक आधारभूत सीप\nखण्ड २: वास्तविक कार्यस्थल परियोजना\nखण्ड ३: अन्तिम प्रमाणपत्र परियोजना',
      category: 'ai',
      track: 'individual',
      fee: 14000,
      mentor: 'Er. Suman Adhikari',
      featured: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setActiveLangTab('en');
    setFormData({
      title_en: course.title_en || course.title || '',
      title_ne: course.title_ne || '',
      tagline_en: course.tagline_en || course.tagline || '',
      tagline_ne: course.tagline_ne || '',
      duration_en: course.duration_en || course.duration || '6 Weeks (36 Hours)',
      duration_ne: course.duration_ne || '',
      mode_en: course.mode_en || course.mode || 'Putalisadak Campus',
      mode_ne: course.mode_ne || '',
      nextBatch_en: course.nextBatch_en || course.nextBatch || '',
      nextBatch_ne: course.nextBatch_ne || '',
      curriculum_en: Array.isArray(course.curriculum_en) ? course.curriculum_en.join('\n') : (Array.isArray(course.curriculum) ? course.curriculum.join('\n') : (course.curriculum || '')),
      curriculum_ne: Array.isArray(course.curriculum_ne) ? course.curriculum_ne.join('\n') : '',
      category: course.category || 'ai',
      track: course.track || 'individual',
      fee: course.fee || 14000,
      mentor: course.mentor || 'Er. Suman Adhikari',
      featured: Boolean(course.featured)
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currEnArray = formData.curriculum_en.split('\n').filter(line => line.trim().length > 0);
    const currNeArray = formData.curriculum_ne.split('\n').filter(line => line.trim().length > 0);

    const payload = {
      ...formData,
      title: formData.title_en,
      tagline: formData.tagline_en,
      duration: formData.duration_en,
      mode: formData.mode_en,
      nextBatch: formData.nextBatch_en,
      fee: Number(formData.fee),
      curriculum: currEnArray,
      curriculum_en: currEnArray,
      curriculum_ne: currNeArray.length > 0 ? currNeArray : currEnArray
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, payload);
    } else {
      addCourse(payload);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Courses & Training Programs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage English and Nepali curriculum, tuition fees, batch schedules, and instructor assignments.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <PlusCircle size={18} />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses List Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Course (EN & NE)</th>
              <th>Category & Track</th>
              <th>Tuition (NPR)</th>
              <th>Duration</th>
              <th>Lead Mentor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>
                    {c.title_en || c.title}
                  </div>
                  {c.title_ne && (
                    <div style={{ fontSize: '0.82rem', color: '#C59A3F', marginTop: '2px' }}>
                      🇳🇵 {c.title_ne}
                    </div>
                  )}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {(c.tagline_en || c.tagline || '').substring(0, 65)}...
                  </div>
                </td>
                <td>
                  <span className="course-category-badge" style={{ marginRight: '6px' }}>{c.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.track}</span>
                </td>
                <td style={{ fontWeight: '700', color: '#fbbf24' }}>
                  Rs. {c.fee?.toLocaleString()}
                </td>
                <td style={{ fontSize: '0.85rem' }}>{c.duration_en || c.duration}</td>
                <td style={{ fontSize: '0.85rem' }}>{c.mentor}</td>
                <td>
                  {c.featured ? (
                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>● Featured</span>
                  ) : (
                    <span style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>Standard</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 10px' }}
                      title="Edit Course (Bilingual)"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Archive course "${c.title_en || c.title}"?`)) {
                          deleteCourse(c.id);
                        }
                      }}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '6px' }}
                      title="Delete Course"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Course Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <BookOpen size={24} color="#C59A3F" />
              <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>
                {editingCourse ? 'Edit Course (Bilingual CMS)' : 'Create New Course Program'}
              </h2>
            </div>

            {/* Language Switch Tabs inside Modal */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'en' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
                  background: activeLangTab === 'en' ? '#172642' : 'transparent',
                  color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇬🇧 English Content
              </button>

              <button
                type="button"
                onClick={() => setActiveLangTab('ne')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: activeLangTab === 'ne' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
                  background: activeLangTab === 'ne' ? '#172642' : 'transparent',
                  color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                🇳🇵 नेपाली सामग्री (Nepali)
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* TAB: ENGLISH */}
              {activeLangTab === 'en' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Course Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="form-input"
                      placeholder="e.g. AI Tools for Daily Office Work & Studies"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tagline / Overview (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.tagline_en}
                      onChange={(e) => setFormData({ ...formData, tagline_en: e.target.value })}
                      className="form-input"
                      placeholder="One practical sentence describing the core outcome"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Duration (English)</label>
                      <input
                        type="text"
                        value={formData.duration_en}
                        onChange={(e) => setFormData({ ...formData, duration_en: e.target.value })}
                        className="form-input"
                        placeholder="e.g. 6 Weeks (36 Hours)"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Campus Mode (English)</label>
                      <input
                        type="text"
                        value={formData.mode_en}
                        onChange={(e) => setFormData({ ...formData, mode_en: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Putalisadak Campus or Live Online"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Next Batch Timing (English)</label>
                    <input
                      type="text"
                      value={formData.nextBatch_en}
                      onChange={(e) => setFormData({ ...formData, nextBatch_en: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Sunday, 15th Ashoj (Morning 7:00 AM & Evening 5:30 PM)"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Curriculum Modules in English (1 module per line)</label>
                    <textarea
                      rows="4"
                      value={formData.curriculum_en}
                      onChange={(e) => setFormData({ ...formData, curriculum_en: e.target.value })}
                      className="form-textarea"
                      placeholder="Module 1: Getting Started with AI&#10;Module 2: Excel & Data Analysis..."
                    />
                  </div>
                </div>
              )}

              {/* TAB: NEPALI */}
              {activeLangTab === 'ne' && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Course Title in Nepali (नेपाली शीर्षक) *</label>
                    <input
                      type="text"
                      value={formData.title_ne}
                      onChange={(e) => setFormData({ ...formData, title_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: दैनिक कार्यालय र अध्ययनका लागि एआई टुल्स"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tagline / Overview in Nepali (संक्षिप्त विवरण)</label>
                    <input
                      type="text"
                      value={formData.tagline_ne}
                      onChange={(e) => setFormData({ ...formData, tagline_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: च्याटजीपिटी र एआई टुल्स प्रयोग गरी प्रतिवेदन तयार गर्ने सीप..."
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Duration in Nepali (अवधि)</label>
                      <input
                        type="text"
                        value={formData.duration_ne}
                        onChange={(e) => setFormData({ ...formData, duration_ne: e.target.value })}
                        className="form-input"
                        placeholder="जस्तै: ६ हप्ता (३६ घण्टा)"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mode in Nepali (प्रशिक्षण स्थान)</label>
                      <input
                        type="text"
                        value={formData.mode_ne}
                        onChange={(e) => setFormData({ ...formData, mode_ne: e.target.value })}
                        className="form-input"
                        placeholder="जस्तै: पुतलीसडक भौतिक ल्याब वा अनलाइन"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Next Batch in Nepali (आगामी ब्याच समय)</label>
                    <input
                      type="text"
                      value={formData.nextBatch_ne}
                      onChange={(e) => setFormData({ ...formData, nextBatch_ne: e.target.value })}
                      className="form-input"
                      placeholder="जस्तै: आइतबार, १५ असोज (बिहान ७:०० र बेलुकी ५:३०)"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Curriculum Modules in Nepali (प्रति लाइन १ मोड्युल)</label>
                    <textarea
                      rows="4"
                      value={formData.curriculum_ne}
                      onChange={(e) => setFormData({ ...formData, curriculum_ne: e.target.value })}
                      className="form-textarea"
                      placeholder="खण्ड १: एआई टुल्सको सही प्रयोग&#10;खण्ड २: व्यावसायिक इमेल र लेखन..."
                    />
                  </div>
                </div>
              )}

              {/* SHARED SETTINGS */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Fee in NPR *</label>
                    <input
                      type="number"
                      required
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="ai">AI & Media Literacy</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="production">Media Production</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Track</label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="form-select"
                    >
                      <option value="individual">For Individuals</option>
                      <option value="institution">For Schools / Institutions</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Lead Mentor</label>
                    <input
                      type="text"
                      value={formData.mentor}
                      onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', marginBottom: '24px' }}>
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <label htmlFor="featuredCheck" style={{ fontSize: '0.9rem', color: '#fff', cursor: 'pointer' }}>
                    Mark as Featured Program on Homepage
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: '700' }}>
                  {editingCourse ? 'Save Bilingual Course' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
