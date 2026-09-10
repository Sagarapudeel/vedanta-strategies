import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { X, CheckCircle, Send, MessageCircle, Sparkles } from 'lucide-react';

export default function LeadModal({ 
  isOpen, 
  onClose, 
  defaultPurpose = 'general', 
  defaultCourseId = '', 
  courses = [], 
  onLeadSubmit, 
  currentLang 
}) {
  const t = translations[currentLang] || translations.en;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: defaultPurpose || 'training',
    courseId: defaultCourseId || '',
    institutionName: '',
    targetAudienceCount: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        purpose: defaultPurpose || 'training',
        courseId: defaultCourseId || (courses.length > 0 ? courses[0].id : '')
      }));
    }
  }, [isOpen, defaultPurpose, defaultCourseId, courses]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const leadPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      purpose: formData.purpose,
      courseName: courses.find(c => c.id === formData.courseId)?.title || formData.courseId,
      institutionName: formData.institutionName,
      message: `${formData.message} ${formData.targetAudienceCount ? `| Count: ${formData.targetAudienceCount}` : ''} ${formData.projectType ? `| Project: ${formData.projectType}` : ''} ${formData.budget ? `| Budget: ${formData.budget}` : ''}`.trim()
    };

    setTimeout(() => {
      onLeadSubmit(leadPayload);
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(182, 138, 40, 0.15)', color: '#B68A28', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle size={40} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#fff' }}>
              {t.contact.successTitle}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
              {t.contact.successMsg}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/9779801234567?text=${encodeURIComponent(`Hello, I just submitted an inquiry for ${formData.purpose}. My name is ${formData.name}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={18} />
                <span>{t.contact.chatDirectly}</span>
              </a>
              <button className="btn btn-secondary" onClick={onClose}>
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="section-badge" style={{ marginBottom: 0 }}>
                <Sparkles size={13} /> {currentLang === 'ne' ? 'सिधा सम्पर्क' : 'QUICK INQUIRY'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#fff' }}>
              {currentLang === 'ne' ? 'वेदान्त स्ट्राटेजिजसँग जोडिनुहोस्' : 'Connect with Vedanta Strategies'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
              {currentLang === 'ne' 
                ? 'कृपया तपाईंको विवरण भर्नुहोस्। हाम्रो टोलीले तत्काल सम्पर्क गर्नेछ।'
                : 'Fill out this brief form and our team will get in touch with you within 24 hours.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Karki"
                    className="form-input"
                  />
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@example.com"
                    className="form-input"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="form-group">
                  <label className="form-label">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +977 9801234567"
                    className="form-input"
                  />
                </div>

                {/* Purpose Dropdown */}
                <div className="form-group">
                  <label className="form-label">{t.contact.purposeLabel}</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="training">{t.contact.purposeOpts.training}</option>
                    <option value="institution">{t.contact.purposeOpts.institution}</option>
                    <option value="services">{t.contact.purposeOpts.services}</option>
                    <option value="partnership">{t.contact.purposeOpts.partnership}</option>
                    <option value="other">{t.contact.purposeOpts.other}</option>
                  </select>
                </div>
              </div>

              {/* Conditional Fields based on purpose */}
              {formData.purpose === 'training' && (
                <div className="form-group">
                  <label className="form-label">
                    {currentLang === 'ne' ? 'इच्छुक पाठ्यक्रम छान्नुहोस्' : 'Select Program / Course'}
                  </label>
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {getLangText(course, 'title', currentLang)} (Rs. {course.fee?.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.purpose === 'institution' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">{t.contact.institutionNameLabel} *</label>
                    <input
                      type="text"
                      required
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      placeholder="e.g. Kathmandu Valley High School / College"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Approximate Learners / Educators</label>
                    <input
                      type="text"
                      name="targetAudienceCount"
                      value={formData.targetAudienceCount}
                      onChange={handleChange}
                      placeholder="e.g. 150 Students, 25 Teachers"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {formData.purpose === 'production' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Documentary">Cinematic Documentary</option>
                      <option value="Podcast">Podcast / Vodcast Series</option>
                      <option value="Corporate Film">Corporate / Admissions Brand Film</option>
                      <option value="Event">Conference / Event Live Coverage</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated Budget / Timeline</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. Rs. 150k - 300k / Within 1 month"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="form-group">
                <label className="form-label">{t.contact.messageLabel}</label>
                <textarea
                  required
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    currentLang === 'ne' 
                      ? 'तपाईंको आवश्यकता, समयसीमा वा अन्य जिज्ञासा लेख्नुहोस्...' 
                      : 'Please outline your specific goals, questions, or batch preferences...'
                  }
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  <Send size={16} />
                  <span>{loading ? t.contact.submitting : t.contact.submitBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
