import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, CheckCircle, X, BookOpen, Clock, Award, Globe, ListPlus, Trash, Layers } from 'lucide-react';

const defaultModulesEn = [
  { id: 1, title: 'Module 1: Practical Fundamentals & Setup', topics: ['Setting up software properly', 'Workspace & keyboard shortcuts', 'Core workflow fundamentals'] },
  { id: 2, title: 'Module 2: Live Workplace Projects', topics: ['Real-world client scenarios', 'Step-by-step mentored execution', 'Troubleshooting common roadblocks'] },
  { id: 3, title: 'Module 3: Portfolio & Career Ready', topics: ['Compiling verifiable portfolio', 'Final capstone assessment', 'Official certification dispatch'] }
];

const defaultModulesNe = [
  { id: 1, title: 'खण्ड १: आधारभूत सीप र कार्यस्थल तयारी', topics: ['सफ्टवेयर र टूलको सही सेटअप', 'किबोर्ड सर्टकट र कार्यप्रवाह', 'आधारभूत सिद्धान्त र अभ्यास'] },
  { id: 2, title: 'खण्ड २: प्रत्यक्ष परियोजना अभ्यास', topics: ['वास्तविक ग्राहक परियोजना कार्य', 'प्रशिक्षकको प्रत्यक्ष मार्गदर्शन', 'व्यावहारिक समस्या समाधान'] },
  { id: 3, title: 'खण्ड ३: पोर्टफोलियो तथा प्रमाणीकरण', topics: ['व्यावसायिक पोर्टफोलियो निर्माण', 'अन्तिम मूल्याङ्कन र परीक्षा', 'प्रमाणित वेदान्त प्रमाणपत्र वितरण'] }
];

const parseToModules = (curr, defaultList = []) => {
  if (!curr) return defaultList;
  if (Array.isArray(curr)) {
    if (curr.length === 0) return defaultList;
    return curr.map((item, idx) => {
      if (typeof item === 'object' && item !== null) {
        return {
          id: idx + 1,
          title: item.title || item.module || `Module ${idx + 1}`,
          topics: Array.isArray(item.topics) ? [...item.topics] : []
        };
      }
      if (typeof item === 'string') {
        if (item.includes(':')) {
          const [title, rest] = item.split(/:\s*(.+)/);
          const topics = rest ? rest.split(/,\s*/).map(s => s.trim()).filter(Boolean) : [];
          return { id: idx + 1, title: title.trim(), topics };
        }
        return { id: idx + 1, title: item.trim(), topics: [] };
      }
      return { id: idx + 1, title: String(item), topics: [] };
    });
  }
  if (typeof curr === 'string') {
    const lines = curr.split('\n').map(l => l.trim()).filter(Boolean);
    const result = [];
    let currentMod = null;
    lines.forEach((line, idx) => {
      if (line.startsWith('-') || line.startsWith('*') || line.startsWith('•')) {
        const topic = line.replace(/^[-*•]\s*/, '');
        if (currentMod) {
          currentMod.topics.push(topic);
        } else {
          currentMod = { id: idx + 1, title: `Module ${result.length + 1}`, topics: [topic] };
          result.push(currentMod);
        }
      } else if (line.includes(':')) {
        const [title, rest] = line.split(/:\s*(.+)/);
        const topics = rest ? rest.split(/,\s*/).map(s => s.trim()).filter(Boolean) : [];
        currentMod = { id: idx + 1, title: title.trim(), topics };
        result.push(currentMod);
      } else {
        currentMod = { id: idx + 1, title: line, topics: [] };
        result.push(currentMod);
      }
    });
    return result.length > 0 ? result : defaultList;
  }
  return defaultList;
};

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
    mode_en: 'Bagbazar Physical Lab & Live Online',
    mode_ne: 'बागबजार भौतिक ल्याब तथा अनलाइन',
    nextBatch_en: 'Sunday, 15th Ashoj (Morning 7:00 AM)',
    nextBatch_ne: 'आइतबार, १५ असोज (बिहान ७:००)',
    modules_en: defaultModulesEn,
    modules_ne: defaultModulesNe,
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
      mode_en: 'Bagbazar Campus or Live Online',
      mode_ne: 'बागबजार क्याम्पस वा प्रत्यक्ष अनलाइन',
      nextBatch_en: 'Sunday, 15th Ashoj (Morning 7:00 AM & Evening 5:30 PM)',
      nextBatch_ne: 'आइतबार, १५ असोज (बिहान ७:०० र बेलुकी ५:३०)',
      modules_en: defaultModulesEn,
      modules_ne: defaultModulesNe,
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
      mode_en: course.mode_en || course.mode || 'Bagbazar Campus',
      mode_ne: course.mode_ne || '',
      nextBatch_en: course.nextBatch_en || course.nextBatch || '',
      nextBatch_ne: course.nextBatch_ne || '',
      modules_en: parseToModules(course.curriculum_en || course.curriculum, defaultModulesEn),
      modules_ne: parseToModules(course.curriculum_ne, defaultModulesNe),
      category: course.category || 'ai',
      track: course.track || 'individual',
      fee: course.fee || 14000,
      mentor: course.mentor || 'Er. Suman Adhikari',
      featured: Boolean(course.featured)
    });
    setModalOpen(true);
  };

  // Structured Module & Sub-topics Handlers
  const handleAddModule = (lang) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    const current = formData[key] || [];
    const newId = Date.now();
    const newTitle = lang === 'en' ? `Module ${current.length + 1}: New Topic` : `खण्ड ${current.length + 1}: नयाँ शीर्षक`;
    setFormData(prev => ({
      ...prev,
      [key]: [...current, { id: newId, title: newTitle, topics: ['Key takeaway or skill item'] }]
    }));
  };

  const handleRemoveModule = (lang, modId) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].filter(m => m.id !== modId)
    }));
  };

  const handleModuleTitleChange = (lang, modId, val) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map(m => m.id === modId ? { ...m, title: val } : m)
    }));
  };

  const handleAddSubtopic = (lang, modId) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map(m => {
        if (m.id === modId) {
          return { ...m, topics: [...m.topics, ''] };
        }
        return m;
      })
    }));
  };

  const handleUpdateSubtopic = (lang, modId, topicIdx, val) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map(m => {
        if (m.id === modId) {
          const nextTopics = [...m.topics];
          nextTopics[topicIdx] = val;
          return { ...m, topics: nextTopics };
        }
        return m;
      })
    }));
  };

  const handleRemoveSubtopic = (lang, modId, topicIdx) => {
    const key = lang === 'en' ? 'modules_en' : 'modules_ne';
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].map(m => {
        if (m.id === modId) {
          return { ...m, topics: m.topics.filter((_, idx) => idx !== topicIdx) };
        }
        return m;
      })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanModulesEn = (formData.modules_en || [])
      .filter(m => m.title && m.title.trim().length > 0)
      .map(m => ({
        title: m.title.trim(),
        topics: (m.topics || []).map(t => t.trim()).filter(Boolean)
      }));

    const cleanModulesNe = (formData.modules_ne || [])
      .filter(m => m.title && m.title.trim().length > 0)
      .map(m => ({
        title: m.title.trim(),
        topics: (m.topics || []).map(t => t.trim()).filter(Boolean)
      }));

    const fallbackCurriculum = cleanModulesEn.map(m => 
      m.topics.length > 0 ? `${m.title}: ${m.topics.join(', ')}` : m.title
    );

    const payload = {
      ...formData,
      title: formData.title_en,
      tagline: formData.tagline_en,
      duration: formData.duration_en,
      mode: formData.mode_en,
      nextBatch: formData.nextBatch_en,
      fee: Number(formData.fee),
      curriculum: fallbackCurriculum,
      curriculum_en: cleanModulesEn,
      curriculum_ne: cleanModulesNe.length > 0 ? cleanModulesNe : cleanModulesEn
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
                        placeholder="e.g. Bagbazar Campus or Live Online"
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

                  <div className="form-group" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label className="form-label" style={{ fontWeight: '700', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <Layers size={16} /> Structured Modules & Sub-topics (English)
                      </label>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAddModule('en')}
                        style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                      >
                        <ListPlus size={14} /> + Add Module
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {(formData.modules_en || []).map((mod, modIdx) => (
                        <div key={mod.id || modIdx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: '800', background: 'rgba(197, 154, 63, 0.2)', color: '#fbbf24', padding: '4px 8px', borderRadius: '4px', flexShrink: 0 }}>
                              Module #{modIdx + 1}
                            </span>
                            <input
                              type="text"
                              required
                              value={mod.title}
                              onChange={(e) => handleModuleTitleChange('en', mod.id, e.target.value)}
                              className="form-input"
                              placeholder={`Module ${modIdx + 1} Title`}
                              style={{ flex: 1, fontWeight: '600' }}
                            />
                            {formData.modules_en.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveModule('en', mod.id)}
                                style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                                title="Remove Module"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>

                          {/* Sub-topics list */}
                          <div style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(197, 154, 63, 0.3)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                              Sub-topics Checklist:
                            </div>
                            {(mod.topics || []).map((topic, tIdx) => (
                              <div key={tIdx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>•</span>
                                <input
                                  type="text"
                                  value={topic}
                                  onChange={(e) => handleUpdateSubtopic('en', mod.id, tIdx, e.target.value)}
                                  className="form-input"
                                  placeholder={`Sub-topic ${tIdx + 1}`}
                                  style={{ padding: '4px 8px', fontSize: '0.82rem', flex: 1 }}
                                />
                                {(mod.topics || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSubtopic('en', mod.id, tIdx)}
                                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleAddSubtopic('en', mod.id)}
                              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.78rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0', fontWeight: '600', width: 'fit-content' }}
                            >
                              + Add Sub-topic
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                        placeholder="जस्तै: बागबजार भौतिक ल्याब वा अनलाइन"
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

                  <div className="form-group" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label className="form-label" style={{ fontWeight: '700', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <Layers size={16} /> संरचित मोड्युल तथा उप-विषयहरू (नेपाली)
                      </label>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAddModule('ne')}
                        style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                      >
                        <ListPlus size={14} /> + नयाँ मोड्युल थप्नुहोस्
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {(formData.modules_ne || []).map((mod, modIdx) => (
                        <div key={mod.id || modIdx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: '800', background: 'rgba(197, 154, 63, 0.2)', color: '#fbbf24', padding: '4px 8px', borderRadius: '4px', flexShrink: 0 }}>
                              मोड्युल #{modIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={mod.title}
                              onChange={(e) => handleModuleTitleChange('ne', mod.id, e.target.value)}
                              className="form-input"
                              placeholder={`खण्ड ${modIdx + 1} शीर्षक`}
                              style={{ flex: 1, fontWeight: '600' }}
                            />
                            {formData.modules_ne.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveModule('ne', mod.id)}
                                style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                                title="Remove Module"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>

                          {/* Sub-topics list */}
                          <div style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(197, 154, 63, 0.3)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                              उप-विषयहरू (Sub-topics):
                            </div>
                            {(mod.topics || []).map((topic, tIdx) => (
                              <div key={tIdx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>•</span>
                                <input
                                  type="text"
                                  value={topic}
                                  onChange={(e) => handleUpdateSubtopic('ne', mod.id, tIdx, e.target.value)}
                                  className="form-input"
                                  placeholder={`उप-विषय ${tIdx + 1}`}
                                  style={{ padding: '4px 8px', fontSize: '0.82rem', flex: 1 }}
                                />
                                {(mod.topics || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSubtopic('ne', mod.id, tIdx)}
                                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleAddSubtopic('ne', mod.id)}
                              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.78rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0', fontWeight: '600', width: 'fit-content' }}
                            >
                              + उप-विषय थप्नुहोस्
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <label className="form-label">Category (Free-Text Manual Field)</label>
                    <input
                      type="text"
                      required
                      list="existing-categories"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-input"
                      placeholder="Type any category (e.g. AI & Automation)"
                    />
                    <datalist id="existing-categories">
                      {Array.from(new Set(courses.map(c => c.category).filter(Boolean))).map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Track Selection</label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="form-select"
                    >
                      <option value="individual">Individual Track (Students & Professionals)</option>
                      <option value="institution">Institution Track (Schools & Colleges)</option>
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
