import React from 'react';
import { FileCheck, BookOpen, Briefcase, Scale, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { getLangText } from '../utils/langHelper';

export default function TermsPage({ currentLang = 'en', siteSettings = {} }) {
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
            <FileCheck size={14} />
            {isNe ? 'सेवाका सर्तहरू' : 'TERMS & CONDITIONS'}
          </span>
          <h1 className="section-title" style={{ fontSize: '2.4rem', marginTop: '12px', marginBottom: '14px', color: 'var(--brand-navy)' }}>
            {isNe ? 'सेवाका सर्तहरू (Terms of Service)' : 'Terms of Service'}
          </h1>
          <p className="section-subtitle" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {isNe 
              ? 'वेदान्त स्ट्र्याटेजीजका तालिम कार्यक्रम, डिजिटल सेवा र परामर्श उपयोग गर्दा लागू हुने सामान्य सर्त तथा व्यवस्थाहरू।'
              : 'Terms governing course admissions, training participation, and client service engagements at Vedanta Strategies.'}
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
              <Scale size={18} color="var(--brand-maroon)" />
              {isNe ? '१. सर्तहरूको स्वीकृति' : '1. Acceptance of Terms'}
            </h2>
            <p>
              {isNe
                ? 'हाम्रो वेबसाइट प्रयोग गरेर, तालिममा भर्ना भएर वा परामर्श सेवाका लागि सम्झौता गरेर तपाईं यी सर्तहरू मान्न सहमत हुनुहुन्छ। यदि तपाईं यी सर्तहरूसँग सहमत हुनुहुन्न भने, कृपया सेवा प्रयोग नगर्नुहोला।'
                : 'By accessing our website, enrolling in training cohorts, or engaging our consulting and production services, you agree to be bound by these terms and conditions.'}
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--brand-maroon)" />
              {isNe ? '२. तालिम भर्ना तथा कक्षा आचारसंहिता' : '2. Course Enrollment & Conduct'}
            </h2>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>{isNe ? 'सिट आरक्षण:' : 'Seat Reservation:'}</strong> {isNe ? 'हाम्रा प्रत्येक ब्याचमा अधिकतम १५ जना मात्र विद्यार्थी रहने भएकाले भर्ना सिट निश्चित शुल्क भुक्तानीपछि मात्र सुरक्षित हुन्छ।' : 'Due to our strict 15-student cohort guarantee, enrollment is confirmed upon registration deposit.'}</li>
              <li><strong>{isNe ? 'उपकरण तयारी:' : 'Equipment Policy:'}</strong> {isNe ? 'व्यावहारिक अभ्यासका लागि विद्यार्थीहरूले आफ्नै काम गर्न सक्ने ल्यापटप ल्याउनु आवश्यक छ।' : 'As hands-on training takes place directly on trainee machines, students are required to bring a functional laptop.'}</li>
              <li><strong>{isNe ? 'आचारसंहिता:' : 'Classroom Decorum:'}</strong> {isNe ? 'अन्य विद्यार्थी तथा प्रशिक्षकहरूप्रति सम्मानजनक व्यवहार आवश्यक छ। अनादरपूर्ण व्यवहार गर्ने सहभागीलाई ब्याचबाट निष्कासन गर्न सकिनेछ।' : 'Mutual respect and professional conduct are mandatory. Disruptive behavior may lead to forfeiture of enrollment.'}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="var(--brand-maroon)" />
              {isNe ? '३. संस्थागत तथा डिजिटल सेवाहरू' : '3. Institutional & Client Services'}
            </h2>
            <p>
              {isNe
                ? 'कलेज, विद्यालय तथा व्यवसायहरूका लागि सञ्चालन गरिने विशेष कार्यशाला र डिजिटल विज्ञापन अभियानहरू लिखित कार्यक्षेत्र (Scope of Work) का आधारमा सञ्चालन गरिन्छ। विज्ञापन बजेट ग्राहकको मेटा/गुगल खातामार्फत पारदर्शी रूपमा खर्च गरिन्छ।'
                : 'Custom institutional workshops and digital growth retainers operate under separate signed proposals and agreed scopes of work. Advertising spend is billed transparently through client advertising accounts.'}
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} color="var(--brand-maroon)" />
              {isNe ? '४. बौद्धिक सम्पत्ति' : '4. Intellectual Property'}
            </h2>
            <p>
              {isNe
                ? 'वेदान्त स्ट्र्याटेजीजका पाठ्यक्रम, अध्ययन सामग्री र ब्रान्डिङ हाम्रै बौद्धिक सम्पत्ति हुन्। बिना लिखित अनुमति यी सामग्रीहरूको व्यावसायिक पुनःउत्पादन वा बिक्री गर्न पाइने छैन।'
                : 'All course curriculum, training presentations, software templates, and branding assets created by Vedanta Strategies remain our intellectual property. Commercial redistribution without written consent is strictly prohibited.'}
            </p>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="var(--brand-maroon)" />
              {isNe ? '५. लागू हुने कानुन तथा क्षेत्राधिकार' : '5. Governing Law'}
            </h2>
            <p>
              {isNe
                ? 'यी सर्तहरू नेपालको कानुनअनुसार व्याख्या र लागू हुनेछन्। कुनै पनि कानुनी विवाद भएमा काठमाडौं जिल्ला अदालतको क्षेत्राधिकार रहनेछ।'
                : 'These terms are governed by and construed in accordance with the laws of Nepal. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.'}
            </p>
          </section>

          {/* Section 6: Contact */}
          <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', marginBottom: '12px' }}>
              {isNe ? '६. कार्यालय सम्पर्क' : '6. Contact Legal Inquiries'}
            </h2>
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
