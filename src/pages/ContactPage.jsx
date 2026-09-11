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
  Building2,
  Calendar,
  ExternalLink
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

  const mapUrl = siteSettings?.mapsUrl || "https://maps.app.goo.gl/rS7SUHTm1zKXiiYq5";
  const mapEmbed = siteSettings?.mapsEmbed || "https://maps.google.com/maps?q=27.7033949,85.3177065&z=17&output=embed";

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">{t.contact.badge}</span>
          <h1 className="section-title">{t.contact.title}</h1>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-grid">
          
          {/* Left: Contact Info & Map Card */}
          <div>
            <div className="mindrisers-card contact-info-card">
              <h3 style={{ fontSize: '1.4rem', color: 'var(--brand-navy)', marginBottom: '24px' }}>
                {t.contact.officeTitle}
              </h3>

              <div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" style={{ background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="contact-info-label">
                      {currentLang === 'ne' ? 'कार्यालय ठेगाना' : 'Address'}
                    </div>
                    <div className="contact-info-value">
                      {getLangText(siteSettings, 'address', currentLang) || siteSettings?.address || 'Bagbazar, Kathmandu 44600, Nepal'}
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" style={{ background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="contact-info-label">
                      {currentLang === 'ne' ? 'फोन तथा सहयोग' : 'Phone & Support'}
                    </div>
                    <div className="contact-info-value">
                      {siteSettings?.primaryPhone || '+977 1-4421098'}{siteSettings?.mobilePhone ? ` / ${siteSettings.mobilePhone}` : ''}
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" style={{ background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-info-label">
                      {currentLang === 'ne' ? 'इमेल सम्पर्क' : 'Email Inquiries'}
                    </div>
                    <div className="contact-info-value">
                      {siteSettings?.officialEmail || 'info.vedantastrategies@gmail.com'}
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" style={{ background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="contact-info-label">
                      {currentLang === 'ne' ? 'खुला रहने समय' : 'Office Hours'}
                    </div>
                    <div className="contact-info-value">
                      {getLangText(siteSettings, 'officeHours', currentLang) || siteSettings?.officeHours || 'Sun – Fri: 9:00 AM – 6:00 PM'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="contact-whatsapp-cta">
                <a
                  href={`https://wa.me/${siteSettings?.whatsappNumber || '9779747887598'}?text=${encodeURIComponent('Hello Vedanta Strategies! I would like to schedule a visit to your Bagbazar office or enquire about programs.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  <span>{t.contact.chatDirectly}</span>
                </a>
              </div>
            </div>

            {/* Interactive Map Visual with Bagbazar CID */}
            <div className="mindrisers-card contact-map-card">
              <div className="map-header-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--brand-navy)', fontWeight: '700' }}>
                  <MapPin size={16} color="var(--brand-maroon)" />
                  <span>Vedanta Strategies — Bagbazar, Kathmandu</span>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--brand-maroon)', fontWeight: '700', textDecoration: 'none' }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
              <iframe
                title="Vedanta Strategies Bagbazar Kathmandu Location"
                src={mapEmbed}
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Dynamic Inquiry Form */}
          <div className="mindrisers-card contact-form-wrapper">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div className="contact-info-icon" style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--brand-maroon-subtle)', color: 'var(--brand-maroon)', margin: '0 auto 20px auto' }}>
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

                  <div className="form-grid-2">
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

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
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
