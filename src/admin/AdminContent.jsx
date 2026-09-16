import React, { useState } from 'react';
import { Globe, Save, CheckCircle, PlusCircle, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function AdminContent({ siteContent = {}, updateSiteContent }) {
  const [activeLangTab, setActiveLangTab] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const [formData, setFormData] = useState(() => ({
    hero: {
      badge_en: siteContent?.hero?.badge_en || 'Bagbazar, Kathmandu • Strategic Learning Hub',
      badge_ne: siteContent?.hero?.badge_ne || 'बागबजार, काठमाडौं • प्रयोगात्मक ल्याब तथा हब',
      title_en: siteContent?.hero?.title_en || 'Hands-on AI & Digital Skills Training ',
      title_ne: siteContent?.hero?.title_ne || 'व्यावहारिक एआई तथा डिजिटल सीप तालिम ',
      titleHighlight_en: siteContent?.hero?.titleHighlight_en || 'for Nepal',
      titleHighlight_ne: siteContent?.hero?.titleHighlight_ne || 'नेपालमै बागबजारबाट',
      subtitle_en: siteContent?.hero?.subtitle_en || 'Learn ChatGPT, prompt engineering, media literacy, and digital marketing from active practitioners — small batches at our Bagbazar office, on your own laptop.',
      subtitle_ne: siteContent?.hero?.subtitle_ne || 'सक्रिय पेसाकर्मी प्रशिक्षकहरूबाट च्याटजीपीटी, प्रम्प्ट इन्जिनियरिङ, मिडिया साक्षरता र डिजिटल मार्केटिङ सिक्नुहोस् — बागबजार क्याम्पसमा साना ब्याचहरूमा, आफ्नै ल्यापटपमा।',
      trnTag_en: siteContent?.hero?.trnTag_en || 'TRAINING & COURSES',
      trnTag_ne: siteContent?.hero?.trnTag_ne || 'तालिम तथा पाठ्यक्रमहरू',
      svcTag_en: siteContent?.hero?.svcTag_en || 'SERVICES FOR BUSINESSES & ORGANIZATIONS',
      svcTag_ne: siteContent?.hero?.svcTag_ne || 'व्यवसाय तथा संस्थाहरूका लागि सेवाहरू',
      svcTitle_en: siteContent?.hero?.svcTitle_en || 'Digital Strategy, Ads & Execution',
      svcTitle_ne: siteContent?.hero?.svcTitle_ne || 'डिजिटल रणनीति, विज्ञापन र कार्यान्वयन',
      svcSubtitle_en: siteContent?.hero?.svcSubtitle_en || 'The same strategists who teach also run real Meta & Google ad campaigns, manage social media pages, and automate customer inquiries for organizations across Nepal.',
      svcSubtitle_ne: siteContent?.hero?.svcSubtitle_ne || 'सिकाउने तीव्र रणनीतिकारहरू नै नेपालभरका संस्थाहरूका लागि वास्तविक मेटा र गुगल विज्ञापन चलाउँछन्, सोसल मिडिया व्यवस्थापन गर्छन् र ग्राहक सोधपुछ स्वचालित बनाउँछन्।',
      svcBtn_en: siteContent?.hero?.svcBtn_en || 'See How We Can Help',
      svcBtn_ne: siteContent?.hero?.svcBtn_ne || 'हामी कसरी सहयोग गर्न सक्छौं हेर्नुहोस्',
      searchPlaceholder_en: siteContent?.hero?.searchPlaceholder_en || 'Search courses (e.g. AI tools, video editing, social ads)...',
      searchPlaceholder_ne: siteContent?.hero?.searchPlaceholder_ne || 'कोर्स खोज्नुहोस् (जस्तै: एआई टुल्स, भिडियो सम्पादन, डिजिटल मार्केटिङ)...',
      ctaPrimary_en: siteContent?.hero?.ctaPrimary_en || 'Book Your Seat →',
      ctaPrimary_ne: siteContent?.hero?.ctaPrimary_ne || 'सिट बुक गर्नुहोस्',
      ctaSecondary_en: siteContent?.hero?.ctaSecondary_en || 'View Courses',
      ctaSecondary_ne: siteContent?.hero?.ctaSecondary_ne || 'पाठ्यक्रमहरू',
      floatTitle_en: siteContent?.hero?.floatTitle_en || 'Next Batch — October',
      floatTitle_ne: siteContent?.hero?.floatTitle_ne || 'अर्को ब्याच — असोज',
      floatSub_en: siteContent?.hero?.floatSub_en || 'Limited seats available',
      floatSub_ne: siteContent?.hero?.floatSub_ne || 'सीमित सिट उपलब्ध'
    },
    stats: siteContent?.stats || [
      { id: 'stat-1', value: 'Cohort 1', label_en: 'Now Enrolling First Batch', label_ne: 'पहिलो ब्याच भर्ना प्रारम्भ' },
      { id: 'stat-2', value: '15 Max', label_en: 'Students Per Batch Guarantee', label_ne: 'प्रति ब्याच अधिकतम १५ जना मात्र' },
      { id: 'stat-3', value: '100%', label_en: 'Hands-on Practical & Laptop-Driven', label_ne: 'शतप्रतिशत व्यावहारिक र ल्यापटप अभ्यास' },
      { id: 'stat-4', value: 'Bagbazar', label_en: 'In-Person Learning Hub, Kathmandu', label_ne: 'काठमाडौंको बागबजारस्थित भौतिक हब' }
    ],
    pillars: {
      badge_en: siteContent?.pillars?.badge_en || 'WHAT WE DO',
      badge_ne: siteContent?.pillars?.badge_ne || 'हाम्रा ३ मुख्य कामहरू',
      title_en: siteContent?.pillars?.title_en || 'Three Strategic Focus Areas',
      title_ne: siteContent?.pillars?.title_ne || 'सिकाइ, संस्थागत रूपान्तरण र मार्केटिङ',
      subtitle_en: siteContent?.pillars?.subtitle_en || 'Joining hands-on training with live institutional and market workflows — a consultancy that trains, builds, and grows.',
      subtitle_ne: siteContent?.pillars?.subtitle_ne || 'सामान्य इन्स्टिच्युटभन्दा फरक, हामी सिकाइलाई वास्तविक बजार र संस्थागत नतिजासँग प्रत्यक्ष जोड्दछौं।',
      learning_tag_en: siteContent?.pillars?.learning_tag_en || 'HANDS-ON COURSES',
      learning_tag_ne: siteContent?.pillars?.learning_tag_ne || 'व्यावहारिक तालिम',
      learning_title_en: siteContent?.pillars?.learning_title_en || '1. Learning & Training',
      learning_title_ne: siteContent?.pillars?.learning_title_ne || '१. सिकाइ तथा तालिम',
      learning_desc_en: siteContent?.pillars?.learning_desc_en || 'Small batches (max 15), guided practice on your own laptop in Bagbazar, and individual career mentoring.',
      learning_desc_ne: siteContent?.pillars?.learning_desc_ne || 'सानो ब्याच (अधिकतम १५ जना), बागबजारमा आफ्नै ल्यापटपमा अभ्यास र व्यक्तिगत करिअर मार्गदर्शन।',
      learning_f1_en: siteContent?.pillars?.learning_f1_en || 'Practical AI, prompt design, and digital marketing classes',
      learning_f1_ne: siteContent?.pillars?.learning_f1_ne || 'व्यावहारिक एआई, प्रम्प्ट सीप र डिजिटल मार्केटिङ कक्षाहरू',
      learning_f2_en: siteContent?.pillars?.learning_f2_en || 'Media literacy & deepfake identification for teams',
      learning_f2_ne: siteContent?.pillars?.learning_f2_ne || 'टिमहरूका लागि मिडिया साक्षरता तथा डीपफेक पहिचान',
      learning_f3_en: siteContent?.pillars?.learning_f3_en || 'Weekend batches for busy working professionals',
      learning_f3_ne: siteContent?.pillars?.learning_f3_ne || 'पेसाकर्मीहरूका लागि बिहान र साँझका विशेष ब्याचहरू',
      learning_btn_en: siteContent?.pillars?.learning_btn_en || 'See Upcoming Batches',
      learning_btn_ne: siteContent?.pillars?.learning_btn_ne || 'नयाँ ब्याचहरू हेर्नुहोस्',
      institution_tag_en: siteContent?.pillars?.institution_tag_en || 'ORGANIZATION PROGRAMS & ADVISORY',
      institution_tag_ne: siteContent?.pillars?.institution_tag_ne || 'संस्थागत कार्यक्रम',
      institution_title_en: siteContent?.pillars?.institution_title_en || '2. Organizational Programs & Consulting',
      institution_title_ne: siteContent?.pillars?.institution_title_ne || '२. संस्थागत कार्यक्रम तथा परामर्श',
      institution_desc_en: siteContent?.pillars?.institution_desc_en || 'Custom AI literacy, digital strategy, and media verification programs for organizations and their teams — at your office, on-site, or at our Bagbazar hub.',
      institution_desc_ne: siteContent?.pillars?.institution_desc_ne || 'संस्था र तिनका टिमहरूका लागि अनुकूलित एआई साक्षरता, डिजिटल रणनीति र तथ्य-जाँच कार्यक्रम — तपाईंकै कार्यालय, साइट वा हाम्रो बागबजार हबमा।',
      institution_f1_en: siteContent?.pillars?.institution_f1_en || 'On-site / on-location team workshops in AI & digital tools',
      institution_f1_ne: siteContent?.pillars?.institution_f1_ne || 'एआई र डिजिटल टुल्समा टिमका लागि व्यावहारिक कार्यशाला',
      institution_f2_en: siteContent?.pillars?.institution_f2_en || 'Capacity building for staff productivity and modern workflows',
      institution_f2_ne: siteContent?.pillars?.institution_f2_ne || 'कर्मचारी उत्पादकत्व र आधुनिक कार्यप्रवाह क्षमता निर्माण',
      institution_f3_en: siteContent?.pillars?.institution_f3_en || 'Verified digital credentials for participants',
      institution_f3_ne: siteContent?.pillars?.institution_f3_ne || 'सहभागीहरूका लागि प्रमाणित डिजिटल प्रमाणपत्र',
      institution_btn_en: siteContent?.pillars?.institution_btn_en || 'View Institutional Programs',
      institution_btn_ne: siteContent?.pillars?.institution_btn_ne || 'संस्थागत कार्यक्रम हेर्नुहोस्',
      collaboration_tag_en: siteContent?.pillars?.collaboration_tag_en || 'GROWTH & MARKETING',
      collaboration_tag_ne: siteContent?.pillars?.collaboration_tag_ne || 'डिजिटल प्रचार',
      collaboration_title_en: siteContent?.pillars?.collaboration_title_en || '3. Growth & Strategy',
      collaboration_title_ne: siteContent?.pillars?.collaboration_title_ne || '३. सहकार्य र मार्केटिङ',
      collaboration_desc_en: siteContent?.pillars?.collaboration_desc_en || 'High-converting Meta and Google ad campaigns, social media management, and automated customer inquiry systems for colleges, clinics, and businesses.',
      collaboration_desc_ne: siteContent?.pillars?.collaboration_desc_ne || 'कलेज, अस्पताल तथा व्यवसायहरूका लागि ह्वाट्सएपसँग जोडिएका प्रभावकारी विज्ञापन र ग्राहक सोधपुछ प्रणाली।',
      collaboration_f1_en: siteContent?.pillars?.collaboration_f1_en || 'Managing Facebook, Instagram, and LinkedIn pages',
      collaboration_f1_ne: siteContent?.pillars?.collaboration_f1_ne || 'फेसबुक, इन्स्टाग्राम र लिङ्क्डइन पेज व्यवस्थापन',
      collaboration_f2_en: siteContent?.pillars?.collaboration_f2_en || 'Google Search & Meta ad campaigns for real leads',
      collaboration_f2_ne: siteContent?.pillars?.collaboration_f2_ne || 'वास्तविक ग्राहक खोज्न गुगल र मेटा विज्ञापन',
      collaboration_f3_en: siteContent?.pillars?.collaboration_f3_en || 'WhatsApp auto-responders for customer support',
      collaboration_f3_ne: siteContent?.pillars?.collaboration_f3_ne || 'ह्वाट्सएपमार्फत स्वचालित ग्राहक सोधपुछ प्रणाली',
      collaboration_btn_en: siteContent?.pillars?.collaboration_btn_en || 'View Services',
      collaboration_btn_ne: siteContent?.pillars?.collaboration_btn_ne || 'सेवाहरू हेर्नुहोस्'
    },
    courses: {
      badge_en: siteContent?.courses?.badge_en || 'UPCOMING BATCHES & DUAL TRACKS',
      badge_ne: siteContent?.courses?.badge_ne || 'नयाँ ब्याच तथा दुई प्रमुख ट्रयाक',
      title_en: siteContent?.courses?.title_en || 'Practical Courses Designed for Real Work',
      title_ne: siteContent?.courses?.title_ne || 'काम लाग्ने व्यावहारिक तालिमहरू',
      subtitle_en: siteContent?.courses?.subtitle_en || 'No outdated theories. Every class focuses on practical assignments, real software tools, and personalized instructor guidance.',
      subtitle_ne: siteContent?.courses?.subtitle_ne || 'किताबी कुरा मात्र होइन, आफ्नै ल्यापटपमा वास्तविक सफ्टवेयर चलाएर प्रत्यक्ष सिकाइ।',
      freeDemoBanner_en: siteContent?.courses?.freeDemoBanner_en || 'Would you like a free 1-hour workshop on AI & Media Literacy for your teachers or students?',
      freeDemoBanner_ne: siteContent?.courses?.freeDemoBanner_ne || 'के तपाईं तपाईंकै संस्थाका टिमहरूका लागि एआई तथा मिडिया साक्षरताको निःशुल्क १ घण्टे कार्यशाला चाहनुहुन्छ?',
      freeDemoDesc_en: siteContent?.courses?.freeDemoDesc_en || 'We conduct 60-minute practical demonstration sessions on generative AI and media literacy for teams, faculties, and organizations.',
      freeDemoDesc_ne: siteContent?.courses?.freeDemoDesc_ne || 'हामी संस्था, टिम र शैक्षिक विभागहरूका लागि जेनेरेटिभ एआई र मिडिया साक्षरतामा ६० मिनेटे व्यावहारिक प्रदर्शन सत्रहरू सञ्चालन गर्दछौं।',
      freeDemoBtn_en: siteContent?.courses?.freeDemoBtn_en || 'Request Free Demo Class',
      freeDemoBtn_ne: siteContent?.courses?.freeDemoBtn_ne || 'निःशुल्क डेमो कक्षा लिनुहोस्'
    },
    whyUs: {
      badge_en: siteContent?.whyUs?.badge_en || 'THE DIFFERENCE',
      badge_ne: siteContent?.whyUs?.badge_ne || 'हाम्रो फरक',
      title_en: siteContent?.whyUs?.title_en || 'Why Working With Us Feels Different',
      title_ne: siteContent?.whyUs?.title_ne || 'हामीसँग काम गर्दा के फरक महसुस हुन्छ',
      subtitle_en: siteContent?.whyUs?.subtitle_en || 'We bridge the gap between classroom theory and real-world execution.',
      subtitle_ne: siteContent?.whyUs?.subtitle_ne || 'हामी कक्षाको सिद्धान्त र वास्तविक कार्यसम्पादनबीचको खाडल पुर्तछौं।',
      p1Title_en: siteContent?.whyUs?.p1Title_en || 'Active Practitioners, Not Just Teachers',
      p1Title_ne: siteContent?.whyUs?.p1Title_ne || 'सिद्धान्तविद् मात्र होइन, प्रयोगकर्ता प्रशिक्षकहरू',
      p1Desc_en: siteContent?.whyUs?.p1Desc_en || 'Our instructors and consultants manage real campaigns and live AI workflows every week. You learn what works right now, not textbook theory.',
      p1Desc_ne: siteContent?.whyUs?.p1Desc_ne || 'हाम्रा प्रशिक्षकहरू हरेक हप्ता वास्तविक विज्ञापन अभियान र एआई कार्यप्रवाह ह्यान्डल गर्छन्। तपाईंले काम गर्ने सीप सिक्नुहुन्छ, किताबी कुरा होइन।',
      p2Title_en: siteContent?.whyUs?.p2Title_en || 'Practical Facilities & Real Tools',
      p2Title_ne: siteContent?.whyUs?.p2Title_ne || 'व्यावहारिक ल्याब र वास्तविक औजारहरू',
      p2Desc_en: siteContent?.whyUs?.p2Desc_en || 'Trainees get hands-on access to physical computing facilities in Bagbazar and practice with the same enterprise-grade tools used in real workplaces.',
      p2Desc_ne: siteContent?.whyUs?.p2Desc_ne || 'प्रशिक्षार्थीहरूले बागबजारको भौतिक कम्प्युटिङ सुविधामा हातैले अभ्यास गर्न पाउँछन् र वास्तविक कार्यस्थलमा प्रयोग हुने औजारहरू नै प्रयोग गर्छन्।',
      p3Title_en: siteContent?.whyUs?.p3Title_en || 'Personal Attention',
      p3Title_ne: siteContent?.whyUs?.p3Title_ne || 'व्यक्तिगत ध्यान',
      p3Desc_en: siteContent?.whyUs?.p3Desc_en || 'Every trainee works on their own laptop with direct mentor guidance. No drowning in a crowded batch.',
      p3Desc_ne: siteContent?.whyUs?.p3Desc_ne || 'हरेक प्रशिक्षार्थीले आफ्नै ल्यापटपमा प्रशिक्षकको प्रत्यक्ष मार्गदर्शन पाउँछन्। भीडभाडको ब्याचमा हराउनु पर्दैन।'
    },
    testimonials: {
      badge_en: siteContent?.testimonials?.badge_en || 'REAL EXPERIENCES',
      badge_ne: siteContent?.testimonials?.badge_ne || 'वास्तविक साक्षी',
      title_en: siteContent?.testimonials?.title_en || 'What People in Kathmandu Say About Us',
      title_ne: siteContent?.testimonials?.title_ne || 'काठमाडौंमा हाम्रा बारेमा मानिसहरू के भन्छन्',
      subtitle_en: siteContent?.testimonials?.subtitle_en || 'Honest feedback from principals, marketing managers, and former trainees.',
      subtitle_ne: siteContent?.testimonials?.subtitle_ne || 'प्रधानाध्यापक, मार्केटिङ म्यानेजर र पूर्व प्रशिक्षार्थीहरूको इमानदार प्रतिक्रिया।'
    },
    blog: {
      badge_en: siteContent?.blog?.badge_en || 'ARTICLES & GUIDES',
      badge_ne: siteContent?.blog?.badge_ne || 'लेख तथा मार्गदर्शन',
      title_en: siteContent?.blog?.title_en || 'Practical Guides from Our Instructors',
      title_ne: siteContent?.blog?.title_ne || 'हाम्रा प्रशिक्षकहरूका व्यावहारिक मार्गदर्शनहरू',
      subtitle_en: siteContent?.blog?.subtitle_en || 'Real tips on using AI effectively, saving advertising budget, and producing media in Nepal.',
      subtitle_ne: siteContent?.blog?.subtitle_ne || 'प्रभावकारी एआई प्रयोग, विज्ञापन बजेट बचत र नेपालमा मिडिया उत्पादनका वास्तविक टिप्सहरू।',
      readLink_en: siteContent?.blog?.readLink_en || 'Read Guide ›',
      readLink_ne: siteContent?.blog?.readLink_ne || 'मार्गदर्शन पढ्नुहोस् ›'
    },
    cta: {
      badge_en: siteContent?.cta?.badge_en || 'VISIT OR MESSAGE US',
      badge_ne: siteContent?.cta?.badge_ne || 'हामीलाई सम्पर्क गर्नुहोस्',
      title_en: siteContent?.cta?.title_en || 'Have a question or want to visit our office?',
      title_ne: siteContent?.cta?.title_ne || 'सोधपुछ गर्न वा हाम्रो कार्यालय आउन चाहनुहुन्छ?',
      desc_en: siteContent?.cta?.desc_en || 'Whether you want to join an upcoming training cohort, discuss customized organizational programs, or grow your business, you are always welcome to drop by our Bagbazar office.',
      desc_ne: siteContent?.cta?.desc_ne || 'आगामी तालिम ब्याच, संस्थागत कार्यशाला वा डिजिटल मार्केटिङ परामर्शका लागि तपाईंलाई हाम्रो बागबजार कार्यालयमा हार्दिक स्वागत छ।',
      btn_en: siteContent?.cta?.btn_en || 'Talk to Our Team',
      btn_ne: siteContent?.cta?.btn_ne || 'हाम्रो टिमसँग कुरा गर्नुहोस्',
      btnSecondary_en: siteContent?.cta?.btnSecondary_en || 'View Office Location & Map',
      btnSecondary_ne: siteContent?.cta?.btnSecondary_ne || 'कार्यालयको स्थान हेर्नुहोस्'
    }
  }));

  const handleHeroChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: val }
    }));
  };

  const handleStatChange = (idx, field, val) => {
    setFormData(prev => {
      const nextStats = [...prev.stats];
      nextStats[idx] = { ...nextStats[idx], [field]: val };
      return { ...prev, stats: nextStats };
    });
  };

  const handleAddStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [
        ...prev.stats,
        {
          id: `stat-${Date.now()}`,
          value: '100%',
          label_en: 'New Verified Metric',
          label_ne: 'नयाँ प्रमाणित विवरण'
        }
      ]
    }));
  };

  const handleDeleteStat = (idx) => {
    if (formData.stats.length <= 1) {
      alert('You must keep at least one statistic card.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== idx)
    }));
  };

  const handleMoveStat = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= formData.stats.length) return;
    setFormData(prev => {
      const nextStats = [...prev.stats];
      const temp = nextStats[idx];
      nextStats[idx] = nextStats[targetIdx];
      nextStats[targetIdx] = temp;
      return { ...prev, stats: nextStats };
    });
  };

  const handlePillarChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      pillars: { ...prev.pillars, [field]: val }
    }));
  };

  const handleCtaChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: val }
    }));
  };

  const handleCoursesChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      courses: { ...prev.courses, [field]: val }
    }));
  };

  const handleWhyUsChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      whyUs: { ...prev.whyUs, [field]: val }
    }));
  };

  const handleTestimonialsChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      testimonials: { ...prev.testimonials, [field]: val }
    }));
  };

  const handleBlogChange = (field, val) => {
    setFormData(prev => ({
      ...prev,
      blog: { ...prev.blog, [field]: val }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateSiteContent) {
      updateSiteContent(formData);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>Page Content & Bilingual Translations</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Directly author and control English & Nepali content for every homepage section, headlines, trust stats, pillars, courses, why-us, testimonials, blog, and CTA banners. No auto-translation.
          </p>
        </div>

        <button 
          onClick={handleSave} 
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Save size={18} />
          <span>Save Live Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 'var(--radius-md)', color: '#34d399', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: '600' }}>All English & Nepali copy updated successfully! The public site now renders your exact words.</span>
        </div>
      )}

      {/* Language Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveLangTab('en')}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            border: activeLangTab === 'en' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
            background: activeLangTab === 'en' ? '#172642' : 'transparent',
            color: activeLangTab === 'en' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Globe size={16} color="#C59A3F" />
          <span>English Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLangTab('ne')}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            border: activeLangTab === 'ne' ? '2px solid #C59A3F' : '1px solid var(--border-color)',
            background: activeLangTab === 'ne' ? '#172642' : 'transparent',
            color: activeLangTab === 'ne' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Globe size={16} color="#851C2C" />
          <span>नेपाली सामग्री (Nepali Content)</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* SECTION 1: HERO */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Homepage Hero Section ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            <div className="form-group">
              <label className="form-label">Location / Badge Text</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.hero.badge_en : formData.hero.badge_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'e.g. Bagbazar, Kathmandu • Strategic Learning Hub' : 'जस्तै: बागबजार, काठमाडौं • प्रयोगात्मक ल्याब तथा हब'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Main Hero Headline</label>
              <input
                type="text"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: '700' }}
                value={activeLangTab === 'en' ? formData.hero.title_en : formData.hero.title_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'e.g. Hands-on AI & Digital Skills Training' : 'जस्तै: व्यावहारिक एआई तथा डिजिटल सीप तालिम'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gold Highlight / Suffix (displayed in gold at end of headline)</label>
              <input
                type="text"
                className="form-input"
                style={{ fontSize: '1.05rem', fontWeight: '700', color: '#C59A3F' }}
                value={activeLangTab === 'en' ? formData.hero.titleHighlight_en : formData.hero.titleHighlight_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'titleHighlight_en' : 'titleHighlight_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'for Nepal' : 'नेपालमै बागबजारबाट'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hero Subtitle & Introduction</label>
              <textarea
                rows={3}
                className="form-input"
                value={activeLangTab === 'en' ? formData.hero.subtitle_en : formData.hero.subtitle_ne}
                onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)}
                placeholder="Clear, grounded description of what students and clients gain..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Primary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.ctaPrimary_en : formData.hero.ctaPrimary_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'ctaPrimary_en' : 'ctaPrimary_ne', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.ctaSecondary_en : formData.hero.ctaSecondary_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'ctaSecondary_en' : 'ctaSecondary_ne', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Course Search Input Placeholder</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.searchPlaceholder_en : formData.hero.searchPlaceholder_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'searchPlaceholder_en' : 'searchPlaceholder_ne', e.target.value)}
                />
              </div>
            </div>

            {/* Dual-hero panel fields */}
            <div style={{ padding: '14px 16px', background: 'rgba(28, 47, 77, 0.18)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(28, 47, 77, 0.4)' }}>
              <h4 style={{ fontSize: '0.88rem', color: '#ffffff', marginBottom: '12px' }}>Training Panel Tag (left side of hero)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Training Panel Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? formData.hero.trnTag_en : formData.hero.trnTag_ne}
                    onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'trnTag_en' : 'trnTag_ne', e.target.value)}
                    placeholder={activeLangTab === 'en' ? 'TRAINING & COURSES' : 'तालिम तथा पाठ्यक्रमहरू'}
                  />
                </div>
              </div>
            </div>

            {/* Services Panel fields */}
            <div style={{ padding: '14px 16px', background: 'rgba(182, 138, 40, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(182, 138, 40, 0.2)' }}>
              <h4 style={{ fontSize: '0.88rem', color: '#C59A3F', marginBottom: '12px' }}>Services Panel (right side of hero)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Services Panel Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? formData.hero.svcTag_en : formData.hero.svcTag_ne}
                    onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'svcTag_en' : 'svcTag_ne', e.target.value)}
                    placeholder={activeLangTab === 'en' ? 'SERVICES FOR BUSINESSES & ORGANIZATIONS' : 'व्यवसाय तथा संस्थाहरूका लागि सेवाहरू'}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Services Panel Title</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontWeight: '700' }}
                    value={activeLangTab === 'en' ? formData.hero.svcTitle_en : formData.hero.svcTitle_ne}
                    onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'svcTitle_en' : 'svcTitle_ne', e.target.value)}
                    placeholder={activeLangTab === 'en' ? 'Digital Strategy, Ads & Execution' : 'डिजिटल रणनीति, विज्ञापन र कार्यान्वयन'}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Services Panel Button</label>
                  <input
                    type="text"
                    className="form-input"
                    value={activeLangTab === 'en' ? formData.hero.svcBtn_en : formData.hero.svcBtn_ne}
                    onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'svcBtn_en' : 'svcBtn_ne', e.target.value)}
                    placeholder={activeLangTab === 'en' ? 'See How We Can Help' : 'हामी कसरी सहयोग गर्न सक्छौं हेर्नुहोस्'}
                  />
                </div>
              </div>
              <div className="form-group" style={{ margin: '12px 0 0' }}>
                <label className="form-label">Services Panel Subtitle</label>
                <textarea
                  rows={3}
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.hero.svcSubtitle_en : formData.hero.svcSubtitle_ne}
                  onChange={(e) => handleHeroChange(activeLangTab === 'en' ? 'svcSubtitle_en' : 'svcSubtitle_ne', e.target.value)}
                  placeholder="What organizations get from the same team..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: TRUST STATS */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Founding Proof & Trust Metrics ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</span>
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Author genuine founding metrics (Cohort 1, 15 Max Students, 100% Practical, Bagbazar Hub). Fully add, edit, reorder, or remove cards.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddStat}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderColor: '#C59A3F', color: '#C59A3F' }}
            >
              <PlusCircle size={16} />
              <span>Add Metric Card</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
            {formData.stats.map((stat, idx) => (
              <div 
                key={stat.id || idx} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                {/* Header with index, move controls, and delete */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#C59A3F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Metric #{idx + 1}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => handleMoveStat(idx, -1)}
                      disabled={idx === 0}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 6px', opacity: idx === 0 ? 0.3 : 1 }}
                      title="Move Left / Up"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveStat(idx, 1)}
                      disabled={idx === formData.stats.length - 1}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 6px', opacity: idx === formData.stats.length - 1 ? 0.3 : 1 }}
                      title="Move Right / Down"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStat(idx)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 6px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}
                      title="Delete Metric"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Metric Highlight / Value</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontWeight: '700', fontSize: '1rem', color: '#fff' }}
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    placeholder="e.g. Cohort 1, 15 Max, 100%, Bagbazar"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    English Label
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={stat.label_en || ''}
                    onChange={(e) => handleStatChange(idx, 'label_en', e.target.value)}
                    placeholder="e.g. Now Enrolling First Batch"
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    Nepali Label (नेपाली)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={stat.label_ne || ''}
                    onChange={(e) => handleStatChange(idx, 'label_ne', e.target.value)}
                    placeholder="जस्तै: पहिलो ब्याच भर्ना प्रारम्भ"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: THREE PILLARS */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            The 3 Pillars — Section Header & Cards
          </h2>

          {/* Pillars Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Badge / Label ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
              <input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.badge_en : formData.pillars.badge_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Title ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
              <input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.title_en : formData.pillars.title_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Section Subtitle ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
              <textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.pillars.subtitle_en : formData.pillars.subtitle_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
            {/* Pillar 1: Learning */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 1: Learning & Training</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Tag / Badge</label>
                  <input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_tag_en : formData.pillars.learning_tag_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_tag_en' : 'learning_tag_ne', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_title_en : formData.pillars.learning_title_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_title_en' : 'learning_title_ne', e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label>
                <textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_desc_en : formData.pillars.learning_desc_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_desc_en' : 'learning_desc_ne', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 1</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_f1_en : formData.pillars.learning_f1_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_f1_en' : 'learning_f1_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 2</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_f2_en : formData.pillars.learning_f2_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_f2_en' : 'learning_f2_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 3</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.learning_f3_en : formData.pillars.learning_f3_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_f3_en' : 'learning_f3_ne', e.target.value)} /></div>
              </div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Button Label</label><input type="text" className="form-input" style={{ maxWidth: '260px' }} value={activeLangTab === 'en' ? formData.pillars.learning_btn_en : formData.pillars.learning_btn_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'learning_btn_en' : 'learning_btn_ne', e.target.value)} /></div>
            </div>

            {/* Pillar 2: Organization Programs */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 2: Organizational Programs & Consulting</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Tag / Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_tag_en : formData.pillars.institution_tag_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_tag_en' : 'institution_tag_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_title_en : formData.pillars.institution_title_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_title_en' : 'institution_title_ne', e.target.value)} /></div>
              </div>
              <div className="form-group" style={{ marginBottom: '10px' }}><label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label><textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_desc_en : formData.pillars.institution_desc_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_desc_en' : 'institution_desc_ne', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 1</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_f1_en : formData.pillars.institution_f1_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_f1_en' : 'institution_f1_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 2</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_f2_en : formData.pillars.institution_f2_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_f2_en' : 'institution_f2_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 3</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.institution_f3_en : formData.pillars.institution_f3_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_f3_en' : 'institution_f3_ne', e.target.value)} /></div>
              </div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Button Label</label><input type="text" className="form-input" style={{ maxWidth: '260px' }} value={activeLangTab === 'en' ? formData.pillars.institution_btn_en : formData.pillars.institution_btn_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'institution_btn_en' : 'institution_btn_ne', e.target.value)} /></div>
            </div>

            {/* Pillar 3: Collaboration & Growth */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1rem', color: '#C59A3F', marginBottom: '10px' }}>Pillar 3: Collaboration & Growth</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Tag / Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_tag_en : formData.pillars.collaboration_tag_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_tag_en' : 'collaboration_tag_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_title_en : formData.pillars.collaboration_title_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_title_en' : 'collaboration_title_ne', e.target.value)} /></div>
              </div>
              <div className="form-group" style={{ marginBottom: '10px' }}><label className="form-label">Description ({activeLangTab === 'en' ? 'English' : 'नेपाली'})</label><textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_desc_en : formData.pillars.collaboration_desc_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_desc_en' : 'collaboration_desc_ne', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 1</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_f1_en : formData.pillars.collaboration_f1_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_f1_en' : 'collaboration_f1_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 2</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_f2_en : formData.pillars.collaboration_f2_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_f2_en' : 'collaboration_f2_ne', e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Feature 3</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.pillars.collaboration_f3_en : formData.pillars.collaboration_f3_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_f3_en' : 'collaboration_f3_ne', e.target.value)} /></div>
              </div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Button Label</label><input type="text" className="form-input" style={{ maxWidth: '260px' }} value={activeLangTab === 'en' ? formData.pillars.collaboration_btn_en : formData.pillars.collaboration_btn_ne} onChange={(e) => handlePillarChange(activeLangTab === 'en' ? 'collaboration_btn_en' : 'collaboration_btn_ne', e.target.value)} /></div>
            </div>
          </div>
        </div>

        {/* SECTION 4: COURSES, WHY US, TESTIMONIALS & BLOG HEADERS */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>Homepage Section Copy (Courses, Why Us, Testimonials, Blog)</h2>

          {/* Courses Section */}
          <div style={{ marginBottom: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#C59A3F', marginBottom: '12px' }}>Courses Section Header & Demo Banner</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.courses.badge_en : formData.courses.badge_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.courses.title_en : formData.courses.title_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}><label className="form-label">Subtitle</label><textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.courses.subtitle_en : formData.courses.subtitle_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Demo Banner Heading</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.courses.freeDemoBanner_en : formData.courses.freeDemoBanner_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'freeDemoBanner_en' : 'freeDemoBanner_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Demo Banner Description</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.courses.freeDemoDesc_en : formData.courses.freeDemoDesc_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'freeDemoDesc_en' : 'freeDemoDesc_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Demo Button Text</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.courses.freeDemoBtn_en : formData.courses.freeDemoBtn_ne} onChange={(e) => handleCoursesChange(activeLangTab === 'en' ? 'freeDemoBtn_en' : 'freeDemoBtn_ne', e.target.value)} /></div>
            </div>
          </div>

          {/* Why Us Section */}
          <div style={{ marginBottom: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#C59A3F', marginBottom: '12px' }}>Why Us Section</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.whyUs.badge_en : formData.whyUs.badge_ne} onChange={(e) => handleWhyUsChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.whyUs.title_en : formData.whyUs.title_ne} onChange={(e) => handleWhyUsChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)} /></div>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}><label className="form-label">Subtitle</label><textarea rows={2} className="form-input" value={activeLangTab === 'en' ? formData.whyUs.subtitle_en : formData.whyUs.subtitle_ne} onChange={(e) => handleWhyUsChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)} /></div>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginBottom: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Step {n} Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.whyUs[`p${n}Title_en`] : formData.whyUs[`p${n}Title_ne`]} onChange={(e) => handleWhyUsChange(activeLangTab === 'en' ? `p${n}Title_en` : `p${n}Title_ne`, e.target.value)} /></div>
                <div className="form-group" style={{ margin: 0 }}><label className="form-label">Step {n} Description</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.whyUs[`p${n}Desc_en`] : formData.whyUs[`p${n}Desc_ne`]} onChange={(e) => handleWhyUsChange(activeLangTab === 'en' ? `p${n}Desc_en` : `p${n}Desc_ne`, e.target.value)} /></div>
              </div>
            ))}
          </div>

          {/* Testimonials Header */}
          <div style={{ marginBottom: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#C59A3F', marginBottom: '12px' }}>Testimonials Section Header</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.testimonials.badge_en : formData.testimonials.badge_ne} onChange={(e) => handleTestimonialsChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.testimonials.title_en : formData.testimonials.title_ne} onChange={(e) => handleTestimonialsChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Subtitle</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.testimonials.subtitle_en : formData.testimonials.subtitle_ne} onChange={(e) => handleTestimonialsChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)} /></div>
            </div>
          </div>

          {/* Blog Header */}
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#C59A3F', marginBottom: '12px' }}>Blog / Articles Section Header</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Badge</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.blog.badge_en : formData.blog.badge_ne} onChange={(e) => handleBlogChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Title</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.blog.title_en : formData.blog.title_ne} onChange={(e) => handleBlogChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Subtitle</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.blog.subtitle_en : formData.blog.subtitle_ne} onChange={(e) => handleBlogChange(activeLangTab === 'en' ? 'subtitle_en' : 'subtitle_ne', e.target.value)} /></div>
              <div className="form-group" style={{ margin: 0 }}><label className="form-label">Card Link Text</label><input type="text" className="form-input" value={activeLangTab === 'en' ? formData.blog.readLink_en : formData.blog.readLink_ne} onChange={(e) => handleBlogChange(activeLangTab === 'en' ? 'readLink_en' : 'readLink_ne', e.target.value)} /></div>
            </div>
          </div>
        </div>
        {/* FINAL CTA BANNER */}
        <div className="admin-card" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
            Final CTA Banner (bottom of homepage) ({activeLangTab === 'en' ? 'English' : 'नेपाली'})
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Badge / Label above headline</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.cta.badge_en : formData.cta.badge_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'badge_en' : 'badge_ne', e.target.value)}
                placeholder={activeLangTab === 'en' ? 'VISIT OR MESSAGE US' : 'हामीलाई सम्पर्क गर्नुहोस्'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Headline</label>
              <input
                type="text"
                className="form-input"
                value={activeLangTab === 'en' ? formData.cta.title_en : formData.cta.title_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'title_en' : 'title_ne', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Description</label>
              <textarea
                rows={2}
                className="form-input"
                value={activeLangTab === 'en' ? formData.cta.desc_en : formData.cta.desc_ne}
                onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'desc_en' : 'desc_ne', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Primary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.cta.btn_en : formData.cta.btn_ne}
                  onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'btn_en' : 'btn_ne', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={activeLangTab === 'en' ? formData.cta.btnSecondary_en : formData.cta.btnSecondary_ne}
                  onChange={(e) => handleCtaChange(activeLangTab === 'en' ? 'btnSecondary_en' : 'btnSecondary_ne', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Changes are saved to the Supabase database and appear on the public site for every visitor.
          </span>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: '700' }}>
            <Save size={18} />
            <span>Publish Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
