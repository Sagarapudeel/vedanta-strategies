import React, { useState } from 'react';
import { translations } from '../translations';
import { getLangText } from '../utils/langHelper';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';

export default function ContactPage({ currentLang, siteSettings, onLeadSubmit }) {
  const t = translations[currentLang] || translations.en;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'training',
    institutionName: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onLeadSubmit(formData);
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.contact.badge}</span>
          <h1 className="section-title">{t.contact.title}</h1>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Left: Contact Info & Map Card */}
          <div>
            <div className="mindrisers-card" style={{ padding: '36px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-navy)', marginBottom: '24px' }}>
                {t.contact.officeTitle}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem', color: 'var(--text-body)' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '2px' }}>
                      {currentLang === 'ne' ? 'कार्यालय ठेगाना' : 'Address'}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      {getLangText(siteSettings, 'address', currentLang) || 'Putalisadak, Kathmandu 44600, Bagmati, Nepal'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '2px' }}>
                      {currentLang === 'ne' ? 'फोन तथा सहयोग' : 'Phone & Support'}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>{siteSettings?.primaryPhone} / {siteSettings?.mobilePhone}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '2px' }}>
                      {currentLang === 'ne' ? 'इमेल सम्पर्क' : 'Email Inquiries'}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>{siteSettings?.officialEmail}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.12)', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '2px' }}>
                      {currentLang === 'ne' ? 'खुला रहने समय' : 'Office Hours'}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>
                      {getLangText(siteSettings, 'officeHours', currentLang) || 'Sun – Fri: 9:00 AM – 6:00 PM'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href={`https://wa.me/9779801234567?text=${encodeURIComponent('Hello Vedanta Strategies! I would like to schedule a visit to your Putalisadak campus.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <MessageCircle size={18} />
                  <span>{t.contact.chatDirectly}</span>
                </a>
              </div>
            </div>

            {/* Interactive Map Visual */}
            <div className="mindrisers-card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ padding: '16px 20px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--brand-navy)', fontWeight: '600' }}>
                <MapPin size={16} color="var(--brand-maroon)" /> Putalisadak Location Map
              </div>
              <iframe
                title="Vedanta Strategies Kathmandu Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.743194097486!2d85.31688585!3d27.7038167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4e21a2c6d%3A0x6a0a7c49fca37a1a!2sPutalisadak%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="240"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Dynamic Inquiry Form */}
          <div className="mindrisers-card" style={{ padding: '40px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <CheckCircle size={40} />
                </div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-navy)', marginBottom: '12px' }}>
                  {t.contact.successTitle}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '28px' }}>
                  {t.contact.successMsg}
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--brand-navy)', marginBottom: '8px' }}>
                  {t.contact.formTitle}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                  Select your inquiry purpose to help us route your request to the right department.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">{t.contact.nameLabel}</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Roshan Thapa"
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">{t.contact.emailLabel}</label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. roshan@example.com"
                        className="form-input"
                      />
                    </div>

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
                  </div>

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
                      <option value="production">{t.contact.purposeOpts.production}</option>
                      <option value="partnership">{t.contact.purposeOpts.partnership}</option>
                      <option value="other">{t.contact.purposeOpts.other}</option>
                    </select>
                  </div>

                  {formData.purpose === 'institution' && (
                    <div className="form-group">
                      <label className="form-label">{t.contact.institutionNameLabel} *</label>
                      <input
                        type="text"
                        required
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        placeholder="e.g. Pokhara University / Milestone College"
                        className="form-input"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">{t.contact.messageLabel}</label>
                    <textarea
                      required
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your goals, requirements, or desired start dates..."
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                    <Send size={18} />
                    <span>{loading ? t.contact.submitting : t.contact.submitBtn}</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
