// Seed data for Vedanta Strategies - Authentic, Human, Bilingual (English & Nepali)
// Admin panel has full authority to manage all data and translations

export const initialData = {
  // Global Site Content & Page Translations (Admin Manageable)
  siteContent: {
    hero: {
      badge_en: "Bagbazar, Kathmandu • Strategic Learning Hub",
      badge_ne: "बागबजार, काठमाडौं • प्रयोगात्मक ल्याब तथा हब",
      title_en: "Practical AI, Media & Digital Skills for Nepal",
      title_ne: "नेपालका लागि व्यावहारिक एआई, मिडिया तथा डिजिटल सीप",
      subtitle_en: "Learn practical digital tools on your own laptop at our Bagbazar campus, and grow your career or institution with targeted AI and marketing workflows.",
      subtitle_ne: "आफ्नै ल्यापटपमा व्यावहारिक डिजिटल टुल्स सिक्नुहोस्, हाम्रो बागबजार ल्याबमा अभ्यास गर्नुहोस् र संस्थाको कार्यसम्पादन बढाउनुहोस्।",
      searchPlaceholder_en: "Search courses (e.g. AI tools, video editing, social ads)...",
      searchPlaceholder_ne: "कोर्स खोज्नुहोस् (जस्तै: एआई टुल्स, भिडियो सम्पादन, डिजिटल मार्केटिङ)...",
      ctaPrimary_en: "View Training Programs",
      ctaPrimary_ne: "तालिम कार्यक्रमहरू हेर्नुहोस्",
      ctaSecondary_en: "Talk to Our Team",
      ctaSecondary_ne: "हाम्रो टिमसँग कुरा गर्नुहोस्"
    },
    stats: [
      {
        id: "stat-1",
        value: "4,500+",
        label_en: "Learners & Professionals Reached",
        label_ne: "तालिमप्राप्त विद्यार्थी तथा कर्मचारी"
      },
      {
        id: "stat-2",
        value: "28+",
        label_en: "Partner Schools & Colleges",
        label_ne: "सहकार्य गरिएका विद्यालय तथा कलेजहरू"
      },
      {
        id: "stat-3",
        value: "50+",
        label_en: "Studio Podcasts & Videos Produced",
        label_ne: "रेकर्ड गरिएका पोडकास्ट तथा भिडियो"
      },
      {
        id: "stat-4",
        value: "15",
        label_en: "Max Students Per Batch Guarantee",
        label_ne: "प्रति ब्याच अधिकतम १५ जना मात्र"
      }
    ],
    pillars: {
      learning_title_en: "1. Learning & Training",
      learning_title_ne: "१. सिकाइ तथा तालिम",
      learning_desc_en: "Small batches (max 15), guided practice on your own laptop in Bagbazar, and individual career mentoring.",
      learning_desc_ne: "सानो ब्याच (अधिकतम १५ जना), बागबजारमा आफ्नै ल्यापटपमा अभ्यास र व्यक्तिगत करिअर मार्गदर्शन।",
      institution_title_en: "2. Institutional Bootcamps",
      institution_title_ne: "२. संस्थागत बुटक्याम्प तथा तालिम",
      institution_desc_en: "Customized on-campus workshops, teacher AI training, and accredited digital capability programs for schools and colleges.",
      institution_desc_ne: "विद्यालय र कलेजका लागि अनुकूलित क्याम्पस बुटक्याम्प, शिक्षक एआई तालिम र डिजिटल क्षमता कार्यक्रम।",
      collaboration_title_en: "3. Growth & Strategy",
      collaboration_title_ne: "३. डिजिटल रणनीति तथा वृद्धि",
      collaboration_desc_en: "High-converting Meta and Google ad campaigns directly connected to WhatsApp for colleges, clinics, and businesses.",
      collaboration_desc_ne: "कलेज, अस्पताल तथा व्यवसायहरूका लागि ह्वाट्सएपसँग जोडिएका प्रभावकारी विज्ञापन र ग्राहक सोधपुछ प्रणाली।"
    },
    about: {
      story_en: "We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn't be about dry slideshows or confusing buzzwords. It should be hands-on, practical, and immediately useful for your daily job, college studies, or local business.",
      story_ne: "हामीले काठमाडौंमा एउटा स्पष्ट उद्देश्यका साथ वेदान्त स्ट्राटेजिज सुरु गरेका हौँ: नेपालमा प्रविधि तालिम केवल जटिल सैद्धान्तिक स्लाइडहरूमा सीमित हुनुहुँदैन। यो व्यावहारिक, हातैले गर्ने अभ्यास र दैनिक कार्यालय वा व्यवसायमा तत्काल उपयोगी हुनुपर्छ।",
      whoWeAre_en: "Vedanta Strategies is a premier strategic learning academy and digital consulting firm located in Bagbazar, Kathmandu. We equip students, working professionals, and educational institutions with hands-on capabilities across Artificial Intelligence tools, performance digital marketing, and modern institutional management. We believe in execution over theory, mentor accountability, and building long-term capability for Nepal's digital workforce.",
      whoWeAre_ne: "वेदान्त स्ट्राटेजिज काठमाडौंको बागबजारस्थित एक अग्रणी व्यावहारिक सिकाइ एकेडेमी तथा डिजिटल परामर्श संस्था हो। हमी विद्यार्थी, कार्यरत जनशक्ति र शैक्षिक संस्थाहरूलाई व्यावहारिक एआई टुल्स, नतिजामुखी डिजिटल मार्केटिङ र संस्थागत विकासमा पोख्त बनाउँछौँ। हामी सैद्धान्तिक भाषणभन्दा वास्तविक कार्यसम्पादन, प्रशिक्षकको प्रत्यक्ष निगरानी र नेपालको डिजिटल जनशक्तिलाई सक्षम बनाउन विश्वास गर्छौं।",
      ceoPhoto: "/images/ceo.jpg",
      ceoName_en: "Er. Suman Adhikari",
      ceoName_ne: "इ. सुमन अधिकारी",
      ceoTitle_en: "Founder & Chief Executive Officer",
      ceoTitle_ne: "संस्थापक तथा प्रमुख कार्यकारी अधिकृत",
      ceoBio_en: "Engineer, executive strategist, and technology educator dedicated to bridging Nepal's practical workforce skills gap through execution-focused pedagogy and real-world tools.",
      ceoBio_ne: "इन्जिनियर, रणनीतिक सल्लाहकार तथा प्रविधि प्रशिक्षक जसले नेपालमा व्यावहारिक कार्यस्थल सीप विकास र प्रविधि शिक्षाको नेतृत्व गरिरहनुभएको छ।",
      ceoMessage_en: "At Vedanta Strategies, our founding purpose has always been crystal clear: to close the painful gap between academic credentials and real, productive workplace skills in Nepal. For too long, students and organizations have invested time in outdated syllabi and hollow buzzwords. We founded Vedanta to create an environment where every trainee learns on their own machine, works through actual live case studies, and leaves with skills they can deploy the very next day. Whether you are an individual wanting to master AI workflows or an educational institution looking to transform your faculty and student readiness, we are deeply committed to your measurable progress.",
      ceoMessage_ne: "वेदान्त स्ट्राटेजिजमा हाम्रो मूल उद्देश्य सधैं स्पष्ट छ: नेपालमा औपचारिक शिक्षा र वास्तविक कार्यस्थलका सीपहरूबीचको खाडल पुर्नु। हामीले एउटा यस्तो सिकाइ वातावरण निर्माण गरेका छौँ जहाँ प्रत्येक प्रशिक्षार्थीले आफ्नै ल्यापटपमा वास्तविक परियोजनाहरूमा काम गरेर सीप हासिल गर्छन्। चाहे तपाईं आफ्नो करिअर उकास्न खोज्दै हुनुहुन्छ वा आफ्ना शिक्षक र विद्यार्थीलाई भविष्यका प्रविधि सिकाउन चाहने संस्था, हामी तपाईंको वास्तविक प्रगतिका लागि प्रतिबद्ध छौँ।"
    },
    cta: {
      title_en: "Visit Our Bagbazar Campus or Discuss Your Project",
      title_ne: "हाम्रो बागबजार कार्यालय आउनुहोस् वा परियोजनाबारे छलफल गर्नुहोस्",
      desc_en: "Have a cup of tea with our mentors, check out the computer lab and recording studio, and see which program fits your goals.",
      desc_ne: "हाम्रा प्रशिक्षकहरूसँग चिया पिउँदै कम्प्युटर ल्याब तथा स्टुडियो अवलोकन गर्नुहोस् र तपाईंको लक्ष्यअनुसारको कार्यक्रम रोज्नुहोस्।",
      btn_en: "Schedule a Free Discussion",
      btn_ne: "निःशुल्क परामर्श समय लिनुहोस्"
    }
  },

  courses: [
    {
      id: "crs-ai-work",
      title: "AI Tools for Daily Office Work & Studies",
      title_en: "AI Tools for Daily Office Work & Studies",
      title_ne: "दैनिक कार्यालय र अध्ययनका लागि एआई टुल्स",
      category: "ai",
      track: "individual",
      duration: "6 Weeks (36 Hours)",
      duration_en: "6 Weeks (36 Hours)",
      duration_ne: "६ हप्ता (३६ घण्टा)",
      mode: "Bagbazar Campus or Live Online",
      mode_en: "Bagbazar Campus or Live Online",
      mode_ne: "बागबजार ल्याब वा प्रत्यक्ष अनलाइन",
      fee: 14000,
      mentor: "Er. Suman Adhikari",
      featured: true,
      tagline: "Learn how to use ChatGPT, Claude, and AI tools to write reports, draft emails, automate Excel tasks, and save 2 hours every day.",
      tagline_en: "Learn how to use ChatGPT, Claude, and AI tools to write reports, draft emails, automate Excel tasks, and save 2 hours every day.",
      tagline_ne: "च्याटजीपिटी, क्लाउड र एआई टुल्स प्रयोग गरी प्रतिवेदन तयार गर्ने, एक्सेल हिसाब गर्ने र दैनिक २ घण्टा समय बचत गर्ने सीप सिक्नुहोस्।",
      curriculum: [
        "Getting Started: Setting up ChatGPT, Claude, and Gemini properly",
        "Writing & Research: Drafting emails, office proposals, and academic summaries",
        "Excel & Data Tasks: Analyzing spreadsheets and generating formulas with AI",
        "Design & Visuals: Generating social media images and presentations",
        "Practical Workflows: Creating custom instructions and automated shortcuts"
      ],
      curriculum_en: [
        "Getting Started: Setting up ChatGPT, Claude, and Gemini properly",
        "Writing & Research: Drafting emails, office proposals, and academic summaries",
        "Excel & Data Tasks: Analyzing spreadsheets and generating formulas with AI",
        "Design & Visuals: Generating social media images and presentations",
        "Practical Workflows: Creating custom instructions and automated shortcuts"
      ],
      curriculum_ne: [
        "सुरुवात: च्याटजीपिटी, क्लाउड र जेमिनाईको सही प्रयोग र सेटिङ",
        "लेखन र अनुसन्धान: व्यावसायिक इमेल, कार्यालय प्रस्ताव र सारांश लेखन",
        "एक्सेल र डेटा: स्प्रेडसिट विश्लेषण र एआई मार्फत फर्मुला सिर्जना",
        "डिजाइन र प्रस्तुति: सामाजिक सञ्जालका ग्राफिक्स र प्रेजेन्टेसन निर्माण",
        "व्यावहारिक कार्यप्रवाह: कार्यस्थलका लागि स्वचालित सर्टकट र निर्देशन"
      ],
      nextBatch: "Sunday, 15th Ashoj (Morning 7:00 AM & Evening 5:30 PM)",
      nextBatch_en: "Sunday, 15th Ashoj (Morning 7:00 AM & Evening 5:30 PM)",
      nextBatch_ne: "आइतबार, १५ असोज (बिहान ७:०० र बेलुकी ५:३०)"
    },
    {
      id: "crs-social-ads",
      title: "Social Media Marketing & Meta Ads",
      title_en: "Social Media Marketing & Meta Ads",
      title_ne: "सोसल मिडिया मार्केटिङ तथा मेटा एड्स",
      category: "marketing",
      track: "individual",
      duration: "8 Weeks (48 Hours)",
      duration_en: "8 Weeks (48 Hours)",
      duration_ne: "८ हप्ता (४८ घण्टा)",
      mode: "Bagbazar Physical Lab",
      mode_en: "Bagbazar Physical Lab",
      mode_ne: "बागबजार भौतिक ल्याब",
      fee: 18000,
      mentor: "Bibek Shrestha",
      featured: true,
      tagline: "Run profitable Facebook and Instagram ad campaigns that bring real customer inquiries, not just empty page likes.",
      tagline_en: "Run profitable Facebook and Instagram ad campaigns that bring real customer inquiries, not just empty page likes.",
      tagline_ne: "फेसबुक र इन्स्टाग्राममा प्रभावकारी विज्ञापन चलाएर वास्तविक ग्राहक सोधपुछ तथा बिक्री बढाउनुहोस्।",
      curriculum: [
        "Understanding the Nepali Audience & Buyer Psychology",
        "Meta Ads Manager Setup: Pixels, Custom Audiences, and Ad Budgeting",
        "Creating Ad Creatives: Copywriting in Nepali/English and Canva basics",
        "Lead Generation Funnels: Connecting ads directly to WhatsApp",
        "Weekly Budget Optimization and Lowering Cost Per Message"
      ],
      curriculum_en: [
        "Understanding the Nepali Audience & Buyer Psychology",
        "Meta Ads Manager Setup: Pixels, Custom Audiences, and Ad Budgeting",
        "Creating Ad Creatives: Copywriting in Nepali/English and Canva basics",
        "Lead Generation Funnels: Connecting ads directly to WhatsApp",
        "Weekly Budget Optimization and Lowering Cost Per Message"
      ],
      curriculum_ne: [
        "नेपाली उपभोक्ता मनोविज्ञान र बजारको अध्ययन",
        "मेटा एड्स म्यानेजर सेटिङ: पिक्सेल, लक्षित समूह र बजेट व्यवस्थापन",
        "विज्ञापन सामग्री निर्माण: नेपाली/अंग्रेजी कपीराइटिङ र क्यानभा",
        "ग्राहक सम्पर्क फनेल: विज्ञापनलाई सीधै ह्वाट्सएपसँग जोड्ने तरिका",
        "बजेट अप्टिमाइजेसन र सन्देश लागत घटाउने व्यावहारिक उपाय"
      ],
      nextBatch: "Thursday, 18th Ashoj (Morning 8:00 AM)",
      nextBatch_en: "Thursday, 18th Ashoj (Morning 8:00 AM)",
      nextBatch_ne: "बिहीबार, १८ असोज (बिहान ८:००)"
    },
    {
      id: "crs-video-editing",
      title: "Video Editing & Content Creation (DaVinci & CapCut)",
      title_en: "Video Editing & Content Creation (DaVinci & CapCut)",
      title_ne: "भिडियो सम्पादन तथा कन्टेन्ट क्रिएसन (डार्विन्ची र क्यापकट)",
      category: "production",
      track: "individual",
      duration: "6 Weeks (36 Hours)",
      duration_en: "6 Weeks (36 Hours)",
      duration_ne: "६ हप्ता (३६ घण्टा)",
      mode: "Physical Lab (Bagbazar)",
      mode_en: "Physical Lab (Bagbazar)",
      mode_ne: "बागबजार भौतिक ल्याब",
      fee: 16000,
      mentor: "Aarav Karki",
      featured: true,
      tagline: "Shoot and edit engaging reels, YouTube videos, and podcasts using studio cameras, sound gear, and editing software.",
      tagline_en: "Shoot and edit engaging reels, YouTube videos, and podcasts using studio cameras, sound gear, and editing software.",
      tagline_ne: "स्टुडियो क्यामेरा, साउन्ड गियर र सम्पादन सफ्टवेयर प्रयोग गरेर आकर्षक रिल्स, युट्युब भिडियो र पोडकास्ट तयार गर्नुहोस्।",
      curriculum: [
        "Camera Basics: Framing, lighting with 3-point lights, and audio recording",
        "DaVinci Resolve Basics: Cutting footage, pacing, and color adjustments",
        "CapCut Pro for Fast Reels: Sound effects, transitions, and auto-captions",
        "Microphones & Audio: Removing room noise and balancing speech",
        "Final Project: Editing a real 3-minute video ready for publication"
      ],
      curriculum_en: [
        "Camera Basics: Framing, lighting with 3-point lights, and audio recording",
        "DaVinci Resolve Basics: Cutting footage, pacing, and color adjustments",
        "CapCut Pro for Fast Reels: Sound effects, transitions, and auto-captions",
        "Microphones & Audio: Removing room noise and balancing speech",
        "Final Project: Editing a real 3-minute video ready for publication"
      ],
      curriculum_ne: [
        "क्यामेराको आधारभूत ज्ञान: फ्रेमिङ, थ्री-पोइन्ट लाइटिङ र अडियो रेकर्डिङ",
        "डार्विन्ची रिजल्भ: फुटेज काट्ने, पेसिङ र कलर करेक्सन",
        "क्यापकट प्रो: साउन्ड इफेक्ट, ट्रान्जिसन र अटो क्याप्सन",
        "माइक र अडियो: कोठाको अनावश्यक आवाज हटाउने र आवाज सन्तुलन",
        "अन्तिम परियोजना: प्रसारणका लागि तयार ३ मिनेटको पूर्ण भिडियो"
      ],
      nextBatch: "Sunday, 25th Ashoj (Evening 5:00 PM)",
      nextBatch_en: "Sunday, 25th Ashoj (Evening 5:00 PM)",
      nextBatch_ne: "आइतबार, २५ असोज (बेलुकी ५:००)"
    },
    {
      id: "crs-media-literacy",
      title: "Media Literacy & Fact-Checking Workshop",
      title_en: "Media Literacy & Fact-Checking Workshop",
      title_ne: "मिडिया साक्षरता तथा तथ्य जाँच कार्यशाला",
      category: "ai",
      track: "institution",
      duration: "3 to 4 Weeks",
      duration_en: "3 to 4 Weeks",
      duration_ne: "३ देखि ४ हप्ता",
      mode: "On-Campus at Your School / College",
      mode_en: "On-Campus at Your School / College",
      mode_ne: "तपाईंकै विद्यालय वा कलेज परिसरमा",
      fee: 25000,
      mentor: "Prerana Sharma",
      featured: false,
      tagline: "An interactive workshop for high school and college students to spot fake news, identify deepfakes, and use the internet responsibly.",
      tagline_en: "An interactive workshop for high school and college students to spot fake news, identify deepfakes, and use the internet responsibly.",
      tagline_ne: "विद्यार्थीहरूलाई भ्रामक समाचार चिन्न, डीपफेक पहिचान गर्न र जिम्मेवार इन्टरनेट प्रयोग सिकाउने अन्तरक्रियात्मक कार्यशाला।",
      curriculum: [
        "How Social Media Algorithms Spread Sensational News",
        "Spotting Manipulated Images & Deepfake Videos",
        "Source Verification and Cross-checking Nepali News",
        "Online Safety, Privacy, and Cyber Law in Nepal",
        "Student Group Activity: Real-time Fact Checking Exercise"
      ],
      curriculum_en: [
        "How Social Media Algorithms Spread Sensational News",
        "Spotting Manipulated Images & Deepfake Videos",
        "Source Verification and Cross-checking Nepali News",
        "Online Safety, Privacy, and Cyber Law in Nepal",
        "Student Group Activity: Real-time Fact Checking Exercise"
      ],
      curriculum_ne: [
        "सामाजिक सञ्जाल अल्गोरिदमले कसरी सनसनी फैलाउँछ",
        "तस्बिर छेडछाड तथा डीपफेक भिडियो पहिचान गर्ने तरिका",
        "स्रोत प्रमाणीकरण र समाचार क्रस-चेकिङ विधि",
        "अनलाइन सुरक्षा, गोपनीयता र नेपालको साइबर कानुन",
        "समूह अभ्यास: प्रत्यक्ष तथ्य-जाँच परियोजना"
      ],
      nextBatch: "Flexible Dates (Book for Your Institution)",
      nextBatch_en: "Flexible Dates (Book for Your Institution)",
      nextBatch_ne: "अनुकूल मिति (संस्थाका लागि बुकिङ खुला)"
    },
    {
      id: "crs-ai-teachers",
      title: "AI Workshop for School Principals & Teachers",
      title_en: "AI Workshop for School Principals & Teachers",
      title_ne: "प्रधानाध्यापक तथा शिक्षकहरूका लागि एआई कार्यशाला",
      category: "ai",
      track: "institution",
      duration: "2-Day Weekend Intensive",
      duration_en: "2-Day Weekend Intensive",
      duration_ne: "२ दिने सप्ताहन्त गहन तालिम",
      mode: "At Your Campus or Vedanta Lab",
      mode_en: "At Your Campus or Vedanta Lab",
      mode_ne: "तपाईंकै कलेज वा वेदान्त ल्याबमा",
      fee: 20000,
      mentor: "Er. Suman Adhikari & Prerana Sharma",
      featured: false,
      tagline: "Help your faculty save time on lesson planning, question paper setting, and grading while guiding students on ethical AI use.",
      tagline_en: "Help your faculty save time on lesson planning, question paper setting, and grading while guiding students on ethical AI use.",
      tagline_ne: "शिक्षकहरूलाई पाठ योजना निर्माण, प्रश्नपत्र तयारी र नैतिक एआई प्रयोगमा सहयोग पुर्याउने शिक्षक केन्द्रित कार्यशाला।",
      curriculum: [
        "Demystifying AI for Educators: What it can and cannot do",
        "Creating Lesson Plans, Worksheets, and Rubrics in Minutes",
        "Framing Classroom Policies on Student AI Usage and Plagiarism",
        "Hands-on Practice with Teacher Prompt Templates"
      ],
      curriculum_en: [
        "Demystifying AI for Educators: What it can and cannot do",
        "Creating Lesson Plans, Worksheets, and Rubrics in Minutes",
        "Framing Classroom Policies on Student AI Usage and Plagiarism",
        "Hands-on Practice with Teacher Prompt Templates"
      ],
      curriculum_ne: [
        "शिक्षकका लागि एआई: यसको सामर्थ्य र सीमाहरू",
        "मिनेटमै पाठ योजना, कार्यपत्र र मूल्याङ्कन आधार निर्माण",
        "कक्षाकोठामा विद्यार्थीको एआई प्रयोग तथा नीति तर्जुमा",
        "शिक्षकका लागि उपयोगी प्रम्प्ट टेम्प्लेट अभ्यास"
      ],
      nextBatch: "Custom Weekend Booking",
      nextBatch_en: "Custom Weekend Booking",
      nextBatch_ne: "अनुकूल सप्ताहन्त बुकिङ"
    }
  ],

  services: [
    {
      id: "srv-performance-marketing",
      title: "Meta & Google Ad Campaigns",
      title_en: "Meta & Google Ad Campaigns",
      title_ne: "मेटा तथा गुगल विज्ञापन व्यवस्थापन",
      icon: "TrendingUp",
      tag: "Customer Leads",
      tag_en: "Customer Leads",
      tag_ne: "ग्राहक सोधपुछ",
      shortDesc: "We manage your Facebook, Instagram, and Google ads with clear targeting so you get actual phone calls and WhatsApp messages.",
      shortDesc_en: "We manage your Facebook, Instagram, and Google ads with clear targeting so you get actual phone calls and WhatsApp messages.",
      shortDesc_ne: "फेसबुक, इन्स्टाग्राम र गुगलमा लक्षित विज्ञापन सञ्चालन गरेर सीधै फोन कल तथा ह्वाट्सएप सोधपुछ ल्याइदिन्छौँ।",
      deliverables: [
        "Ad copywriting and banner designs",
        "Targeting people in Kathmandu or specific cities",
        "Weekly WhatsApp reports showing spend vs leads"
      ],
      deliverables_en: [
        "Ad copywriting and banner designs",
        "Targeting people in Kathmandu or specific cities",
        "Weekly WhatsApp reports showing spend vs leads"
      ],
      deliverables_ne: [
        "विज्ञापन कपीराइटिङ र आकर्षक ब्यानर डिजाइन",
        "काठमाडौं वा तोकिएका सहरहरूमा लक्षित दर्शक छनोट",
        "खर्च र नतिजा देखाउने साप्ताहिक ह्वाट्सएप प्रतिवेदन"
      ],
      packages: {
        starter: "Rs. 25,000 / month",
        growth: "Rs. 50,000 / month",
        enterprise: "Custom"
      }
    },
    {
      id: "srv-social-management",
      title: "Social Media Page Management",
      title_en: "Social Media Page Management",
      title_ne: "सोसल मिडिया पेज व्यवस्थापन",
      icon: "Share2",
      tag: "Regular Content",
      tag_en: "Regular Content",
      tag_ne: "नियमित पोस्टिङ",
      shortDesc: "Never worry about what to post next. We design graphics, write captions, and post consistently on your pages.",
      shortDesc_en: "Never worry about what to post next. We design graphics, write captions, and post consistently on your pages.",
      shortDesc_ne: "सामाजिक सञ्जालमा के पोस्ट गर्ने भन्ने चिन्ता अब छाड्नुहोस्। हामी नियमित ग्राफिक्स, क्याप्सन र पोस्ट व्यवस्थापन गर्छौँ।",
      deliverables: [
        "12 custom designed visual posts per month",
        "Writing captions in clean Nepali and English",
        "Responding to common comments and messages"
      ],
      deliverables_en: [
        "12 custom designed visual posts per month",
        "Writing captions in clean Nepali and English",
        "Responding to common comments and messages"
      ],
      deliverables_ne: [
        "प्रति महिना १२ वटा व्यावसायिक ग्राफिक्स पोस्टहरू",
        "सफा नेपाली तथा अंग्रेजी भाषामा क्याप्सन लेखन",
        "सामान्य कमेन्ट तथा म्यासेजहरूको तत्काल जवाफ"
      ],
      packages: {
        starter: "Rs. 20,000 / month",
        growth: "Rs. 40,000 / month",
        enterprise: "Custom"
      }
    },
    {
      id: "srv-ai-consulting",
      title: "WhatsApp & Office Automation",
      title_en: "WhatsApp & Office Automation",
      title_ne: "ह्वाट्सएप तथा कार्यालय अटोमेसन",
      icon: "Cpu",
      tag: "Time Saver",
      tag_en: "Time Saver",
      tag_ne: "समय बचत",
      shortDesc: "Stop answering the same fee inquiries and office questions over and over. We set up automated WhatsApp replies and customer tracking.",
      shortDesc_en: "Stop answering the same fee inquiries and office questions over and over. We set up automated WhatsApp replies and customer tracking.",
      shortDesc_ne: "बारम्बार सोधिने उही प्रश्नहरूको जवाफ दिने झन्झटबाट मुक्ति। हामी स्वचालित ह्वाट्सएप रिप्लाई र ग्राहक ट्र्याकिङ तयार गर्छौँ।",
      deliverables: [
        "WhatsApp business greeting and quick-reply setup",
        "Automatic saving of student or client inquiries into Google Sheets",
        "Staff training on how to use the system"
      ],
      deliverables_en: [
        "WhatsApp business greeting and quick-reply setup",
        "Automatic saving of student or client inquiries into Google Sheets",
        "Staff training on how to use the system"
      ],
      deliverables_ne: [
        "ह्वाट्सएप बिजनेस ग्रिटिङ तथा द्रुत उत्तर सेटिङ",
        "सोधपुछहरू सीधै गुगल सिट्समा सुरक्षित हुने प्रणाली",
        "प्रणाली सहजै चलाउन कर्मचारीहरूलाई व्यावहारिक तालिम"
      ],
      packages: {
        starter: "Rs. 15,000 one-time",
        growth: "Rs. 35,000 setup",
        enterprise: "Consultation"
      }
    },
    {
      id: "srv-content-design",
      title: "Branding, Logos & Print Materials",
      title_en: "Branding, Logos & Print Materials",
      title_ne: "ब्रान्डिङ, लोगो तथा प्रिन्ट सामग्री",
      icon: "Sparkles",
      tag: "Professional Look",
      tag_en: "Professional Look",
      tag_ne: "व्यावसायिक पहिचान",
      shortDesc: "Clean logos, school prospectuses, brochures, and standees that make your organization look respectable.",
      shortDesc_en: "Clean logos, school prospectuses, brochures, and standees that make your organization look respectable.",
      shortDesc_ne: "स्तरीय लोगो, कलेज ब्रोसर, भर्ना फाराम तथा स्ट्यान्डी जसले तपाईंको संस्थाको गरिमा बढाउँछ।",
      deliverables: [
        "Logo design with source files",
        "Brochures, admission flyers & visiting cards",
        "Social media profile templates"
      ],
      deliverables_en: [
        "Logo design with source files",
        "Brochures, admission flyers & visiting cards",
        "Social media profile templates"
      ],
      deliverables_ne: [
        "लोगो डिजाइन तथा सबै कच्चा फाइलहरू (वेक्टर)",
        "ब्रोसर, भर्ना सूचना पम्पलेट तथा भिजिटिङ कार्ड",
        "सामाजिक सञ्जाल प्रोफाइल र कभर टेम्प्लेट"
      ],
      packages: {
        starter: "Rs. 18,000 per project",
        growth: "Rs. 35,000 full kit",
        enterprise: "Retainer"
      }
    }
  ],

  productionGallery: [
    {
      id: "prod-pod-1",
      title: "The Kathmandu Education Talk: AI in Nepali Schools",
      title_en: "The Kathmandu Education Talk: AI in Nepali Schools",
      title_ne: "काठमाडौं शिक्षा संवाद: नेपाली विद्यालयमा एआई",
      category: "Podcast & Vodcast",
      category_en: "Podcast & Vodcast",
      category_ne: "पोडकास्ट तथा भोडकास्ट",
      duration: "38 Mins",
      client: "Vedanta Strategies Studio Series",
      thumb: "/images/studio.jpg",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      summary: "A relaxed studio conversation with two Kathmandu school principals discussing how they handle ChatGPT in their classrooms.",
      summary_en: "A relaxed studio conversation with two Kathmandu school principals discussing how they handle ChatGPT in their classrooms.",
      summary_ne: "काठमाडौंका दुई विद्यालयका प्रधानाध्यापकहरूसँग कक्षाकोठामा च्याटजीपिटीको प्रभाव र व्यवस्थापनबारे स्टुडियो संवाद।"
    },
    {
      id: "prod-doc-1",
      title: "Mountain Tea Stories: From Ilam to Kathmandu",
      title_en: "Mountain Tea Stories: From Ilam to Kathmandu",
      title_ne: "पहाडी चिया कथा: इलामदेखि काठमाडौंसम्म",
      category: "Documentary",
      category_en: "Documentary",
      category_ne: "वृत्तचित्र",
      duration: "18 Mins",
      client: "Local Agricultural Cooperative",
      thumb: "/images/hero.jpg",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      summary: "A short documentary showing how small organic farmers in eastern Nepal package and sell tea through social media.",
      summary_en: "A short documentary showing how small organic farmers in eastern Nepal package and sell tea through social media.",
      summary_ne: "पूर्वी नेपालका साना प्राङ्गारिक चिया किसानहरूले कसरी डिजिटल माध्यमबाट आफ्नो उत्पादन बजार पुर्याइरहेका छन् भन्ने कथा।"
    },
    {
      id: "prod-corp-1",
      title: "Model Academy Campus Tour & Admissions Film",
      title_en: "Model Academy Campus Tour & Admissions Film",
      title_ne: "मोडल एकेडेमी क्याम्पस अवलोकन तथा भर्ना भिडियो",
      category: "Corporate Film",
      category_en: "Corporate Film",
      category_ne: "संस्थागत भिडियो",
      duration: "2 Mins 45 Sec",
      client: "Model Academy Kathmandu",
      thumb: "/images/hero.jpg",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      summary: "A natural, warm video showing science labs, student activities, and teacher interviews for annual admissions.",
      summary_en: "A natural, warm video showing science labs, student activities, and teacher interviews for annual admissions.",
      summary_ne: "वार्षिक भर्नाका लागि विज्ञान ल्याब, विद्यार्थी गतिविधि तथा शिक्षक अन्तर्वार्ता समेटिएको परिचयात्मक भिडियो।"
    }
  ],

  portfolioItems: [
    {
      id: "case-apex-college",
      title: "Model College: 1,200+ Student Admission Inquiries",
      title_en: "Model College: 1,200+ Student Admission Inquiries",
      title_ne: "मोडल कलेज: १,२०० भन्दा बढी विद्यार्थी भर्ना सोधपुछ",
      pillar: "Collaboration",
      client: "Kathmandu Valley College",
      metric: "1,200+ Inquiries",
      metric_en: "1,200+ Inquiries",
      metric_ne: "१,२००+ सोधपुछ",
      challenge_en: "The college was spending heavily on paper flyers and newspaper ads with very few students actually contacting them.",
      challenge_ne: "कलेजले पर्चा-पम्पलेट र पत्रपत्रिकामा ठूलो खर्च गरिरहे पनि विद्यार्थीहरूको प्रत्यक्ष सम्पर्क निकै कम थियो।",
      solution_en: "We ran targeted Facebook and Instagram video ads showing student projects with a direct button to chat on WhatsApp.",
      solution_ne: "हामीले विद्यार्थीका परियोजना देखाउने भिडियो बनाई सीधै ह्वाट्सएप च्याट खुल्ने लक्षित सामाजिक सञ्जाल विज्ञापन चलायौँ।",
      outcome_en: "Received over 1,200 genuine inquiries during admission season and cut marketing expenses by 35%.",
      outcome_ne: "भर्नाको सिजनमा १,२०० भन्दा बढी प्रत्यक्ष सोधपुछ प्राप्त भयो र विज्ञापन खर्च ३५% ले घट्यो।"
    },
    {
      id: "case-media-literacy-nepal",
      title: "Media Literacy Workshops Across 28 Schools",
      title_en: "Media Literacy Workshops Across 28 Schools",
      title_ne: "२८ विद्यालयहरूमा मिडिया साक्षरता कार्यशाला",
      pillar: "Learning",
      client: "District Education Initiative",
      metric: "4,500+ Students",
      metric_en: "4,500+ Students",
      metric_ne: "४,५००+ विद्यार्थी",
      challenge_en: "Students were easily misled by fake social media notices and viral rumors during exam periods.",
      challenge_ne: "परीक्षाको समयमा सामाजिक सञ्जालमा फैलिने अफवाह र भ्रामक सूचनाबाट विद्यार्थीहरू छिट्टै प्रभावित भइरहेका थिए।",
      solution_en: "Conducted 2-hour interactive workshops where students analyzed real viral posts and learned reverse image search.",
      solution_ne: "२ घण्टे अन्तरक्रियात्मक कार्यशाला सञ्चालन गरी भाइरल पोस्टहरूको तथ्य-जाँच र रिभर्स इमेज सर्चको अभ्यास गराइयो।",
      outcome_en: "Certified over 4,500 students and 180 teachers across 28 schools with high engagement.",
      outcome_ne: "२८ विद्यालयका ४,५०० भन्दा बढी विद्यार्थी तथा १८० शिक्षकहरूलाई सफल तालिम र प्रमाणपत्र प्रदान गरियो।"
    },
    {
      id: "case-himalayan-herbal",
      title: "Organic Kitchen: Tripling Daily Delivery Orders",
      title_en: "Organic Kitchen: Tripling Daily Delivery Orders",
      title_ne: "अर्ग्यानिक किचेन: दैनिक डेलिभरी अर्डरमा ३ गुणा वृद्धि",
      pillar: "Collaboration",
      client: "Kathmandu Organic Foods",
      metric: "3x Delivery Orders",
      metric_en: "3x Delivery Orders",
      metric_ne: "३ गुणा अर्डर वृद्धि",
      challenge_en: "A small local food brand struggling to get regular customers beyond their immediate neighborhood.",
      challenge_ne: "स्थानीय उत्पादन भए पनि टोलभन्दा बाहिर नियमित ग्राहक पाउन संघर्ष गरिरहेको अवस्था थियो।",
      solution_en: "Created short 20-second reels of their food preparation and ran simple location-based ads around Kathmandu and Lalitpur.",
      solution_ne: "खाद्य सामग्री तयारीका २० सेकेन्डका छोटा रिल्स बनाएर काठमाडौं र ललितपुर क्षेत्रमा लक्षित विज्ञापन चलायौँ।",
      outcome_en: "Daily delivery orders increased from 15 to over 50 orders within two months.",
      outcome_ne: "दैनिक डेलिभरी अर्डर १५ बाट बढेर दुई महिनाभित्रै ५० भन्दा बढी पुग्यो।"
    }
  ],

  testimonials: [
    {
      id: "t-1",
      author: "Dr. Ramesh Khadka",
      role: "Principal, Kathmandu Model College",
      role_en: "Principal, Kathmandu Model College",
      role_ne: "प्रधानाध्यापक, काठमाडौं मोडल कलेज",
      type: "School Partner",
      quote_en: "The teachers and students thoroughly enjoyed the AI workshop. The team from Vedanta Strategies explained things in simple Nepali and English without complicated jargon. Very practical.",
      quote_ne: "हाम्रा शिक्षक तथा विद्यार्थीहरूले एआई कार्यशाला निकै फलदायी पाए। वेदान्त स्ट्राटेजिजको टिमले बिना कुनै जटिलता सरल नेपाली र अंग्रेजीमा प्रयोगात्मक रूपमा सिकाउनुभयो।",
      avatar: "RK"
    },
    {
      id: "t-2",
      author: "Sunita Maharjan",
      role: "Communications Lead, Valley Community Group",
      role_en: "Communications Lead, Valley Community Group",
      role_ne: "सञ्चार अधिकृत, भ्याली कम्युनिटी ग्रुप",
      type: "Production Client",
      quote_en: "We attended their specialized workshop at their Bagbazar training hub. The sound quality was crystal clear, the mentor guidance was warm, and the materials delivered were immediately useful.",
      quote_ne: "हामीले उहाँहरूको बागबजार तालिम हबमा कार्यशालामा भाग लियौं। विषयवस्तु प्रष्ट, प्रशिक्षकको मार्गदर्शन उत्कृष्ट र सामग्रीहरू तत्काल उपयोगी थिए।",
      avatar: "SM"
    },
    {
      id: "t-3",
      author: "Bikash Adhikari",
      role: "Student (AI Tools Batch 14)",
      role_en: "Student (AI Tools Batch 14)",
      role_ne: "विद्यार्थी (एआई टुल्स ब्याच १४)",
      type: "Course Student",
      quote_en: "I was confused about how to use ChatGPT for my job. The mentor helped me step-by-step on my own laptop. Now I use it daily to draft emails and format Excel sheets.",
      quote_ne: "कार्यालयको कामका लागि च्याटजीपिटी कसरी प्रयोग गर्ने भन्ने अन्योल थियो। मेन्टरले मेरो आफ्नै ल्यापटपमा हातैले सिकाउनुभयो। अहिले म इमेल र एक्सेलमा दैनिक यसको प्रयोग गर्छु।",
      avatar: "BA"
    }
  ],

  teamMembers: [
    {
      id: "tm-suman",
      name: "Er. Suman Adhikari",
      role: "Founder & AI Trainer",
      role_en: "Founder & AI Trainer",
      role_ne: "संस्थापक तथा एआई प्रशिक्षक",
      specialty_en: "AI Tools, Prompting & Workflow Automation",
      specialty_ne: "एआई टुल्स, प्रम्प्टिङ र कार्यप्रवाह अटोमेसन",
      bio_en: "Engineer with 8+ years experience in tech. Enjoys breaking down complex software and AI tools into simple, everyday steps.",
      bio_ne: "प्रविधि क्षेत्रमा ८ वर्षभन्दा बढी अनुभव भएका इन्जिनियर। जटिल सफ्टवेयरलाई दैनिक जीवनमा उपयोगी सरल चरणहरूमा सिकाउन सिपालु।",
      avatar: "SA"
    },
    {
      id: "tm-prerana",
      name: "Prerana Sharma",
      role: "Media Literacy & Education Lead",
      role_en: "Media Literacy & Education Lead",
      role_ne: "मिडिया साक्षरता तथा शिक्षा प्रमुख",
      specialty_en: "Fact-Checking, Online Safety & School Curriculums",
      specialty_ne: "तथ्य-जाँच, अनलाइन सुरक्षा र विद्यालय पाठ्यक्रम",
      bio_en: "Former journalist who has conducted workshops in dozens of schools across Bagmati province on digital safety and media literacy.",
      bio_ne: "पूर्व पत्रकार जसले बागमती प्रदेशका दर्जनौँ विद्यालयहरूमा डिजिटल सुरक्षा तथा तथ्य-जाँच कार्यशाला सञ्चालन गर्नुभएको छ।",
      avatar: "PS"
    },
    {
      id: "tm-aarav",
      name: "Aarav Karki",
      role: "Studio & Video Production Head",
      role_en: "Studio & Video Production Head",
      role_ne: "स्टुडियो तथा भिडियो निर्माण प्रमुख",
      specialty_en: "Camera Shooting, Audio Mixing & DaVinci Resolve",
      specialty_ne: "क्यामेरा सुटिङ, अडियो मिक्सिङ र डार्विन्ची रिजल्भ",
      bio_en: "Multimedia producer who coordinates our Bagbazar media lab and directs corporate training visuals.",
      bio_ne: "बागबजार मिडिया ल्याब व्यवस्थापन गर्ने तथा वृत्तचित्र र भिडियो निर्माणमा दक्ष अनुभवी भिडियोग्राफर।",
      avatar: "AK"
    },
    {
      id: "tm-bibek",
      name: "Bibek Shrestha",
      role: "Digital Marketing Lead",
      role_en: "Digital Marketing Lead",
      role_ne: "डिजिटल मार्केटिङ प्रमुख",
      specialty_en: "Meta Ads, Google Search & WhatsApp Lead Funnels",
      specialty_ne: "मेटा एड्स, गुगल सर्च र ह्वाट्सएप लिड फनेल",
      bio_en: "Marketer who has managed advertising campaigns for colleges, clinics, and local e-commerce businesses in Nepal.",
      bio_ne: "नेपालका विभिन्न कलेज, स्वास्थ्य संस्था तथा व्यवसायहरूका लागि प्रभावकारी विज्ञापन अभियान सञ्चालन गरिसकेका मार्केटिङ विज्ञ।",
      avatar: "BS"
    }
  ],

  blogPosts: [
    {
      id: "post-ai-literacy-2026",
      title: "5 Simple Ways Nepali Students Can Use ChatGPT for Studies (Without Cheating)",
      title_en: "5 Simple Ways Nepali Students Can Use ChatGPT for Studies (Without Cheating)",
      title_ne: "नेपाली विद्यार्थीहरूले पढाइमा च्याटजीपिटी सदुपयोग गर्ने ५ सरल उपाय",
      category: "AI & Media Literacy",
      category_en: "AI & Media Literacy",
      category_ne: "एआई तथा मिडिया साक्षरता",
      author: "Prerana Sharma",
      date: "September 4, 2026",
      readTime: "4 min read",
      summary_en: "How to use AI as a personal tutor to explain difficult concepts, test yourself with practice questions, and improve your English writing.",
      summary_ne: "कठिन विषय बुझ्न, अभ्यास प्रश्नहरू बनाउन र व्यक्तिगत शिक्षकको रूपमा एआई प्रयोग गर्ने व्यावहारिक तरिका।",
      content_en: `Many teachers in Nepal are worried that students will just use AI to copy homework. But when used properly, ChatGPT is like having a patient tutor who can explain difficult topics in simple words at any time.

Here are 5 practical ways we teach students to use it:
1. Ask for analogies: If you don't understand a concept in economics or physics, ask the AI to "explain this like I'm a high school student in Nepal with an everyday example."
2. Generate practice quiz questions: Paste your notes and ask for 5 multiple choice questions to test your memory.
3. Grammar and vocabulary feedback: Ask AI to review your essay draft and explain why certain sentences could be phrased better.
4. Summarizing long articles: Get a quick 3-bullet summary before reading an in-depth chapter.
5. Brainstorming project ideas: Ask for 5 creative science or social project ideas using materials available locally.`,
      content_ne: `नेपालका धेरै शिक्षक तथा अभिभावकहरूलाई विद्यार्थीले गृहकार्य सार्न मात्र एआई प्रयोग गर्लान् कि भन्ने चिन्ता छ। तर सही ढङ्गले प्रयोग गर्दा च्याटजीपिटी २४सै घण्टा उपलब्ध रहने एउटा धैर्यवान् व्यक्तिगत शिक्षक जस्तै हो।

हामीले विद्यार्थीहरूलाई सिकाउने ५ मुख्य उपायहरू:
१. उदाहरण माग्ने: कुनै गाह्रो विषय बुझिएन भने "नेपाली विद्यार्थीले बुझ्ने गरी दैनिक जीवनको उदाहरणसहित बुझाइदिनुहोस्" भनी सोध्ने।
२. अभ्यास प्रश्नहरू बनाउने: आफ्ना नोटहरू राखेर सम्झन मद्दत गर्ने ५ वटा बहुवैकल्पिक प्रश्न सोध्न लगाउने।
३. व्याकरण र भाषा सुधार: आफ्नो लेख जाँच गराई कुन वाक्य कसरी राम्रो बनाउन सकिन्छ भनेर सुझाव माग्ने।
४. लामो पाठको सारांश: ठूला लेख वा अध्याय पढ्नुअघि मुख्य ३ बुँदाको सारांश माग्ने।
५. परियोजनाका नयाँ विचार: स्थानीय सामग्री प्रयोग गरेर गर्न सकिने विज्ञान वा सामाजिक परियोजनाका उपाय सोध्ने।`
    },
    {
      id: "post-agency-overhead-ai",
      title: "Why Most Facebook Ads in Nepal Waste Money (And How to Fix It)",
      title_en: "Why Most Facebook Ads in Nepal Waste Money (And How to Fix It)",
      title_ne: "नेपालमा फेसबुक विज्ञापन किन प्रभावहीन हुन्छन् र यसलाई कसरी सुधार्ने?",
      category: "Digital Marketing",
      category_en: "Digital Marketing",
      category_ne: "डिजिटल मार्केटिङ",
      author: "Bibek Shrestha",
      date: "August 28, 2026",
      readTime: "5 min read",
      summary_en: "Why clicking the blue 'Boost Post' button usually gets you likes from irrelevant accounts, and how to set up proper message campaigns.",
      summary_ne: "नीलो 'बूस्ट पोस्ट' थिच्दा किन खाली लाइक मात्र आउँछ र वास्तविक ग्राहक सोधपुछ ल्याउने विज्ञापन कसरी चलाउने?",
      content_en: `The most common mistake small business owners make in Kathmandu is tapping "Boost Post" on Facebook with default settings. Facebook is happy to take your Rs. 2,000 and show your post to random accounts that like everything, but you end up with zero sales.

What works much better:
- Set up Meta Ads Manager with specific city targeting (e.g. Kathmandu, Lalitpur, Bhaktapur within 10 km).
- Run Click-to-WhatsApp ads: In Nepal, people prefer messaging directly over WhatsApp to ask about price and availability.
- Use clear pricing or a direct call-to-action in the first line of your caption.
- Show short real video clips of the product or service rather than generic stock photos.`,
      content_ne: `काठमाडौंमा साना व्यवसायीहरूले गर्ने सबैभन्दा ठूलो गल्ती फेसबुकको "Boost Post" बटन थिचेर सामान्य सेटिङमा पैसा खर्च गर्नु हो। यसले अनावश्यक प्रोफाइलबाट लाइक त ल्याउँछ तर वास्तविक ग्राहक एक जना पनि आउँदैन।

सही र प्रभावकारी तरिका:
- मेटा एड्स म्यानेजरमार्फत काठमाडौं, ललितपुर वा भक्तपुरका तोकिएका क्षेत्रमा मात्र विज्ञापन देखाउने।
- ह्वाट्सएप सन्देश अभियान चलाउने: नेपालमा ग्राहकहरू सीधै ह्वाट्सएपमा मूल्य र सेवाबारे सोध्न रुचाउँछन्।
- क्याप्सनको पहिलो वा दोस्रो लाइनमै मूल्य र सम्पर्क नम्बर स्पष्ट खुलाउने।
- इन्टरनेटबाट डाउनलोड गरिएका फोटोको सट्टा आफ्नै पसल वा उत्पादनको १५ सेकेन्डको वास्तविक भिडियो प्रयोग गर्ने।`
    }
  ],

  leads: [
    {
      id: "lead-101",
      name: "Sanjay Rajbhandari",
      email: "sanjay@valleycollege.edu.np",
      phone: "+977 9841234567",
      purpose: "institution",
      institutionName: "Valley College of Technology",
      message: "We want to host a 1-day AI and fact-checking workshop for our 200+ BBS and CSIT students next month.",
      status: "new",
      notes: "Interested in a Friday afternoon session. Sent initial syllabus outline.",
      createdAt: "2026-09-08 14:15"
    },
    {
      id: "lead-102",
      name: "Alina Tamang",
      email: "alina.t@gmail.com",
      phone: "+977 9813567890",
      purpose: "training",
      institutionName: "",
      message: "I work in an office and want to join the evening batch of the AI tools course. Is there a batch at 5:30 PM?",
      status: "contacted",
      notes: "Confirmed evening batch starts on 15th Ashoj. She will visit campus on Sunday.",
      createdAt: "2026-09-07 11:30"
    },
    {
      id: "lead-103",
      name: "Naveen Shrestha",
      email: "naveen@organicnepal.com",
      phone: "+977 9801987654",
      purpose: "production",
      institutionName: "Organic Mountain Tea",
      message: "Need to record 4 podcast episodes discussing organic agriculture in Nepal. Want to book studio for a full day.",
      status: "in_progress",
      notes: "Booked studio slot for next Wednesday 10 AM to 4 PM.",
      createdAt: "2026-09-06 09:40"
    }
  ],

  partners: [
    {
      id: "part-1",
      name: "Apex Educational Group",
      name_en: "Apex Educational Group",
      name_ne: "एपेक्स एजुकेसनल ग्रुप",
      sub: "Higher Secondary & College",
      sub_en: "Higher Secondary & College",
      sub_ne: "उच्च माध्यमिक तथा कलेज",
      badge: "AEG",
      logoUrl: "",
      color: "#172642",
      bg: "#e2e8f0",
      website: "https://apexcollege.edu.np"
    },
    {
      id: "part-2",
      name: "Kathmandu Model College",
      name_en: "Kathmandu Model College",
      name_ne: "काठमाडौं मोडल कलेज",
      sub: "Balkumari & Bagbazar",
      sub_en: "Balkumari & Bagbazar",
      sub_ne: "बालकुमारी तथा बागबजार",
      badge: "KMC",
      logoUrl: "",
      color: "#851C2C",
      bg: "#fce7f3",
      website: "https://ktmmodelcollege.edu.np"
    },
    {
      id: "part-3",
      name: "Valley Tech Foundation",
      name_en: "Valley Tech Foundation",
      name_ne: "भ्याली टेक फाउन्डेसन",
      sub: "Skill Development Hub",
      sub_en: "Skill Development Hub",
      sub_ne: "सीप विकास केन्द्र",
      badge: "VTF",
      logoUrl: "",
      color: "#0284c7",
      bg: "#e0f2fe",
      website: "https://valleytech.org.np"
    },
    {
      id: "part-4",
      name: "Milestone International College",
      name_en: "Milestone International College",
      name_ne: "माइलस्टोन इन्टरनेसनल कलेज",
      sub: "Balkumari, Lalitpur",
      sub_en: "Balkumari, Lalitpur",
      sub_ne: "बालकुमारी, ललितपुर",
      badge: "MIC",
      logoUrl: "",
      color: "#b45309",
      bg: "#fef3c7",
      website: "https://milestone.edu.np"
    },
    {
      id: "part-5",
      name: "Rural Heritage Nepal",
      name_en: "Rural Heritage Nepal",
      name_ne: "रुरल हेरिटेज नेपाल",
      sub: "Cultural Documentation NGO",
      sub_en: "Cultural Documentation NGO",
      sub_ne: "सांस्कृतिक अभिलेखीकरण गैरसरकारी संस्था",
      badge: "RHN",
      logoUrl: "",
      color: "#15803d",
      bg: "#dcfce7",
      website: "https://ruralheritagenepal.org"
    },
    {
      id: "part-6",
      name: "Himalayan Naturals D2C",
      name_en: "Himalayan Naturals D2C",
      name_ne: "हिमालयन नेचुरल्स",
      sub: "Organic Brands Nepal",
      sub_en: "Organic Brands Nepal",
      sub_ne: "अर्गानिक ब्रान्ड नेपाल",
      badge: "HND",
      logoUrl: "",
      color: "#4f46e5",
      bg: "#ede9fe",
      website: "https://himalayannaturals.com.np"
    },
    {
      id: "part-7",
      name: "TechFin Innovations",
      name_en: "TechFin Innovations",
      name_ne: "टेकफिन इनोभेसन्स",
      sub: "Fintech & Enterprise Systems",
      sub_en: "Fintech & Enterprise Systems",
      sub_ne: "फिनटेक तथा इन्टरप्राइज प्रणाली",
      badge: "TFI",
      logoUrl: "",
      color: "#0d9488",
      bg: "#ccfbf1",
      website: "https://techfin.com.np"
    },
    {
      id: "part-8",
      name: "Kathmandu Media Lab",
      name_en: "Kathmandu Media Lab",
      name_ne: "काठमाडौं मिडिया ल्याब",
      sub: "Digital Journalism & Podcasting",
      sub_en: "Digital Journalism & Podcasting",
      sub_ne: "डिजिटल पत्रकारिता तथा पोडकास्टिङ",
      badge: "KML",
      logoUrl: "",
      color: "#e11d48",
      bg: "#ffe4e6",
      website: "https://medialabnepal.com"
    }
  ],

  siteSettings: {
    siteName: "Vedanta Strategies",
    officialEmail: "info@vedantastrategies.com",
    supportEmail: "support@vedantastrategies.com",
    primaryPhone: "+977 1-4421098",
    mobilePhone: "+977 9801234567",
    whatsappNumber: "9779801234567",
    address_en: "Bagbazar, Kathmandu 44600, Nepal",
    address_ne: "बागबजार, काठमाडौं ४४६००, नेपाल",
    latitude: 27.7033949,
    longitude: 85.3177065,
    mapsUrl: "https://maps.app.goo.gl/rS7SUHTm1zKXiiYq5",
    mapsEmbed: "https://maps.google.com/maps?q=27.7033949,85.3177065&z=17&output=embed",
    officeHours_en: "Sunday to Friday: 9:00 AM – 6:00 PM",
    officeHours_ne: "आइतबार देखि शुक्रबार: बिहान ९:०० – बेलुकी ६:००",
    announcementText_en: "Admissions open for new AI & Social Media Marketing batches! Morning & evening slots available.",
    announcementText_ne: "नयाँ एआई तथा डिजिटल मार्केटिङ ब्याचहरूका लागि भर्ना खुला! बिहान र बेलुकीका सिटहरू उपलब्ध।",
    facebookUrl: "https://facebook.com",
    linkedinUrl: "https://linkedin.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com"
  },

  // Admin Accounts managed by Super Admin
  adminUsers: [
    {
      id: "admin-1",
      name: "Chief Administrator",
      email: "admin@vedantastrategies.com",
      role: "super_admin",
      createdAt: "2026-01-01",
      status: "active",
      isPrimary: true
    },
    {
      id: "admin-2",
      name: "Content Team Lead",
      email: "editor@vedantastrategies.com",
      role: "content_editor",
      createdAt: "2026-02-15",
      status: "active",
      isPrimary: false
    },
    {
      id: "admin-3",
      name: "Admissions & Inquiries Officer",
      email: "sales@vedantastrategies.com",
      role: "sales_handler",
      createdAt: "2026-03-01",
      status: "active",
      isPrimary: false
    }
  ],

  // Media Manager defaults
  media: {
    heroImage: "/images/hero.jpg",
    heroImageAlt: "Vedanta Strategies Training Workshop in Kathmandu",
    siteLogo: "/images/logo.svg",
    banners: {
      about: "",
      training: "",
      contact: "",
      gallery: ""
    },
    galleryPhotos: [
      { id: "gph-1", url: "/images/hero.jpg", caption: "AI Tools Workshop — Bagbazar", date: "2026" },
      { id: "gph-2", url: "/images/hero.jpg", caption: "Media Literacy Session", date: "2026" },
      { id: "gph-3", url: "/images/hero.jpg", caption: "Corporate Bootcamp", date: "2026" }
    ],
    galleryVideos: []
  }
};
