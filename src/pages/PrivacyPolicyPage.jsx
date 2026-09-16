import React from 'react';
import { Shield, Lock, FileText, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { getLangText } from '../utils/langHelper';

export default function PrivacyPolicyPage({ currentLang = 'en', siteSettings = {} }) {
  const isNe = currentLang === 'ne';

  const address = getLangText(siteSettings, 'address', currentLang) || 'Bagbazar, Kathmandu 44600, Nepal';
  const phone = siteSettings?.primaryPhone || '+977 1-4421098';
  const email = siteSettings?.officialEmail || 'info.vedantastrategies@gmail.com';

  return (
    <div className="page-wrapper" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} />
            {isNe ? 'कानुनी तथा गोपनीयता नीति' : 'LEGAL & PRIVACY'}
          </span>
          <h1 className="section-title" style={{ fontSize: '2.4rem', marginTop: '12px', marginBottom: '14px', color: 'var(--brand-navy)' }}>
            {isNe ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <p className="section-subtitle" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {isNe 
              ? 'वेदान्त स्ट्र्याटेजीज (Vedanta Strategies Pvt. Ltd.) मा तपाईंको व्यक्तिगत विवरणको सुरक्षा र पारदर्शिताप्रतिको हाम्रो प्रतिबद्धता।'
              : 'How Vedanta Strategies collects, protects, and handles your personal information when you use our website, apply for courses, or visit our Bagbazar office.'}
          </p>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginTop: '14px' }}>
            {isNe ? 'पछिल्लो परिमार्जन: सेप्टेम्बर २०२६' : 'Last Updated: September 2026'}
          </div>
        </div>

        {/* Content Card */}
        <div className="mindrisers-card" style={{ padding: '40px 48px', lineHeight: '1.8', color: 'var(--text-body)' }}>
          
          {/* Section 1 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} color="var(--brand-maroon)" />
              {isNe ? '१. हामीले संकलन गर्ने जानकारी' : '1. Information We Collect'}
            </h2>
            <p style={{ marginBottom: '12px' }}>
              {isNe
                ? 'तपाईंले हाम्रो वेबसाइटमार्फत कोर्स सोधपुछ, परामर्श फारम भर्दा वा हामीलाई सिधै सम्पर्क गर्दा निम्न विवरणहरू संकलन गरिन्छ:'
                : 'When you visit our website, submit course admission inquiries, or contact us directly, we may collect the following information:'}
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>{isNe ? 'व्यक्तिगत विवरण:' : 'Personal Details:'}</strong> {isNe ? 'तपाईंको नाम, इमेल ठेगाना, फोन नम्बर, तथा रोजिएको तालिम पाठ्यक्रम।' : 'Your full name, email address, contact phone number, and intended course or service.'}</li>
              <li><strong>{isNe ? 'संस्थागत विवरण:' : 'Institutional Details:'}</strong> {isNe ? 'कलेज, विद्यालय वा व्यवसायको नाम यदि तपाईं संस्थागत कार्यशालाका लागि सोधपुछ गर्दै हुनुहुन्छ भने।' : 'Organization, school, or company name for corporate workshops and client service inquiries.'}</li>
              <li><strong>{isNe ? 'प्राविधिक डेटा:' : 'Technical Data:'}</strong> {isNe ? 'साइटको कार्यक्षमता सुधार गर्न प्रयोग हुने सामान्य ब्राउजर डेटा र कुकीहरू।' : 'Standard browser and usage analytics used strictly to optimize page loading and user experience.'}</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={18} color="var(--brand-maroon)" />
              {isNe ? '२. जानकारीको सदुपयोग' : '2. How We Use Your Information'}
            </h2>
            <p style={{ marginBottom: '12px' }}>
              {isNe ? 'हामीले संकलन गरेका विवरणहरू केवल निम्न उद्देश्यका लागि प्रयोग गरिन्छन्:' : 'We use the collected information solely for legitimate educational and consulting operations:'}
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>{isNe ? 'पाठ्यक्रम भर्ना, ब्याच तालिका र परामर्श समय तालिका निर्धारण गर्न।' : 'To process course admissions, confirm schedule timings, and provide direct consultations.'}</li>
              <li>{isNe ? 'ह्वाट्सएप वा फोनमार्फत तपाईंको सोधपुछको जवाफ दिन।' : 'To respond promptly to your inquiries via WhatsApp, phone, or email.'}</li>
              <li>{isNe ? 'तालिम सम्पन्न भएपछि आधिकारिक प्रमाणपत्र जारी गर्न।' : 'To generate verified digital credentials and course completion certificates.'}</li>
              <li>{isNe ? 'हामी तपाईंको व्यक्तिगत विवरण तेस्रो पक्षलाई बेच्ने वा दुरुपयोग गर्ने छैनौं।' : 'We never sell, rent, or trade your personal contact details with third-party advertisers.'}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--brand-maroon)" />
              {isNe ? '३. डेटा सुरक्षा र भण्डारण' : '3. Data Security & Storage'}
            </h2>
            <p>
              {isNe
                ? 'तपाईंको डेटा सुरक्षित सर्भरहरूमा सुरक्षित राखिन्छ। हामी अनधिकृत पहुँच, परिवर्तन वा खुलासा रोक्न उद्योग-मानक सुरक्षा उपायहरू अवलम्बन गर्दछौं। विद्यार्थी र ग्राहकको गोपनीयता हाम्रा लागि सर्वोच्च प्राथमिकता हो।'
                : 'All inquiry submissions and communications are stored securely. We implement industry-standard administrative and technical safeguards to prevent unauthorized access, disclosure, or modification.'}
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="var(--brand-maroon)" />
              {isNe ? '४. तेस्रो-पक्ष सेवाहरू' : '4. Third-Party Services'}
            </h2>
            <p>
              {isNe
                ? 'हाम्रो वेबसाइटले सम्पर्क र स्थान पहिचानका लागि गुगल म्याप्स (Google Maps) र प्रत्यक्ष सन्देशका लागि ह्वाट्सएप (WhatsApp) विजेट प्रयोग गर्दछ। यी सेवाहरूको आफ्नै गोपनीयता नीति लागू हुन्छ।'
                : 'Our website integrates Google Maps for office location directions and WhatsApp for direct communication. These external services operate under their respective privacy policies.'}
            </p>
          </section>

          {/* Section 5: Contact */}
          <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px' }}>
              {isNe ? '५. गोपनीयता अधिकारीसँग सम्पर्क' : '5. Contact Our Privacy Lead'}
            </h2>
            <p style={{ marginBottom: '16px' }}>
              {isNe
                ? 'यदि तपाईंसँग यस गोपनीयता नीतिबारे कुनै प्रश्न, सुझाव वा आफ्नो विवरण मेटाउने अनुरोध छ भने, कृपया हामीलाई सिधै सम्पर्क गर्नुहोस्:'
                : 'If you have questions regarding this Privacy Policy or wish to request data updates or deletion, please contact us:'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--brand-maroon)" />
                <span>Vedanta Strategies — {address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--brand-maroon)" />
                <span>{phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--brand-maroon)" />
                <span>{email}</span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
