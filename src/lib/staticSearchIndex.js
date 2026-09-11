import { translations } from '../translations';

function flattenStrings(obj, acc = []) {
  if (!obj || typeof obj !== 'object') return acc;
  for (const [, val] of Object.entries(obj)) {
    if (typeof val === 'string' && val.trim()) acc.push(val.trim());
    else if (val && typeof val === 'object') flattenStrings(val, acc);
  }
  return acc;
}

const EN = translations.en || {};
const NE = translations.ne || {};

function collectTranslationTexts(sections) {
  const enParts = [];
  const neParts = [];
  for (const sec of sections) {
    if (EN[sec]) flattenStrings(EN[sec], enParts);
    if (NE[sec]) flattenStrings(NE[sec], neParts);
  }
  return [...enParts, ...neParts].join(' ');
}

const TRANSLATION_INDEX = [
  { page: 'home', text: collectTranslationTexts(['hero', 'pillars', 'testimonials', 'whyUs']) },
  { page: 'individual-training', text: collectTranslationTexts(['courses']) },
  { page: 'services', text: collectTranslationTexts(['services']) },
  { page: 'contact', text: collectTranslationTexts(['contact']) },
];

const COMPONENT_INDEX = [
  // ===== HOME =====
  { page: 'home', text: 'Practical Learning Strategic Thinking Lasting Impact Hands-on AI Digital Skills Training Right Here in Kathmandu ChatGPT prompt engineering media literacy digital marketing small batches Bagbazar office your own laptop View Course Batches Book a Consultation Digital Strategy Ads Execution real Meta Google ad campaigns social media customer inquiries organizations Nepal See How We Can Help Batches Completed Students Teachers Trained Organizations Served Operating Kathmandu THREE WAYS WE WORK One Team Three Strategic Focus Areas Learning Training Organizational Programs Consulting Digital Strategy Execution Hands-on Courses Media literacy deepfakes weekend batches working professionals capacity building staff productivity digital credentials institutional programs on-site team workshops faculty AI tools Facebook Instagram LinkedIn pages Google Search Meta ad campaigns WhatsApp auto-responders customer support' },

  // ===== WHO WE ARE =====
  { page: 'who-we-are', text: 'About Vedanta Strategies Practical Learning Strategic Thinking Lasting Impact Who We Are Kathmandu strategic learning academy digital consulting firm execution-driven training measurable progress Bagbazar office equip students professionals practical AI digital skills performance marketing businesses organizations Learning execution two doors one team Visit Us office practical labs Bagbazar Kathmandu visit us office hours meet instructors discuss goals Schedule a Consultation View Directions Map' },

  // ===== CEO MESSAGE =====
  { page: 'ceo-message', text: 'Leadership Perspective Message Founder CEO Nepal skills development technology education institutional transformation founding philosophy hands-on rigor long-term vision digital workforce Er. Suman Adhikari Founder Chief Executive Officer Bagbazar Kathmandu 44600 Nepal Engineer executive strategist technology educator bridging Nepal practical workforce skills gap execution-focused pedagogy real-world tools close painful gap academic credentials real productive workplace skills outdated syllabi hollow buzzwords every trainee own machine actual live case studies deploy next day individual master AI workflows educational institution transform faculty student readiness measurable progress certificates print student faculty member laptop configure enterprise AI workflows confidence optimize real advertising budget produce measurable outcomes themselves institution charting new career direction equip students tomorrow demands doors Bagbazar always open Reach Out Directly Visit Us' },

  // ===== TEAM =====
  { page: 'team', text: 'Mentors Leadership People Behind Vedanta Strategies active practitioners engineers digital growth specialists real campaigns teach works today Nepal All Mentors Leadership AI Tech Instructors Digital Growth Specialists JOIN OUR FELLOWSHIP practitioner passionate teaching constantly looking practical instructors AI researchers digital marketing leads Kathmandu weekend cohorts on-site bootcamps Apply as a Mentor' },

  // ===== INDIVIDUAL TRAINING =====
  { page: 'individual-training', text: 'Individual Track Practical Courses Designed Real Work Zero outdated theory cohort capped 15 learners personalized mentor guidance practical laptop assignments FOR INDIVIDUALS PROFESSIONALS Filter by Category Search individual courses AI Automation Digital Marketing All Categories classes physically Bagbazar online both Trainees physical hands-on sessions Bagbazar office computer lab live interactive online streams screen-share guidance own laptop workflow shortcut custom setup ready daily work high speed WiFi charging facility verified certificates required hands-on capstone project accredited certificate Vedanta Strategies digital verification Do classes conducted physically Bagbazar online bring own laptop receive verified certificates laptop recommendation learning own machine CAMPUS FACULTY TRACK workshops School College customized AI bootcamps teacher prompt development student credentialing directly institution View Institutional Programs TRAINING FAQS Frequently Asked Questions students curiosities' },

  // ===== INSTITUTIONAL TRAINING =====
  { page: 'institutional-training', text: 'Institutional Track Schools Colleges Organizations Institutional Bootcamps Faculty Enablement empowering faculties administrations student bodies Nepal hands-on AI tools media literacy digital capabilities On-Site Delivery mentor team travels school college anywhere Nepal complete workshop materials Faculty Teacher AI Tools save 5 plus hours weekly lesson plan generation question paper drafting grading rubric aids Accredited Student Credentials completing trainee official digital verifiable certificate Vedanta Strategies Free 60 Minute Demo Workshop practical pedagogy multi-week cohort students staff customized bootcamps schools colleges partner institutions workshop materials AI sandbox environments faculty training manuals specialized faculty development programs lesson planning ChatGPT Claude assignment assessment student AI policy formulation free 60 minute demonstration workshop book Request Free Demo Class below college school name academic liaison reach out confirm suitable date 60-MINUTE COMPLIMENTARY WORKSHOP Book Free Practical AI Demo Faculty visit institution demonstrate live AI prompt templates fact-checking workflows digital tools formal cohort Request Free Demo Session Individual Learners Track open cohorts Bagbazar office AI workflows performance marketing video creation max 15 learners INSTITUTIONAL FAQS Frequently Asked Questions Institutions principal management' },

  // ===== SERVICES =====
  { page: 'services', text: 'Digital Strategy Ads Execution Clear No-Nonsense Digital Marketing vanity metrics real phone calls WhatsApp messages student admissions 3-Step Process How We Work Together Listen Understand Create Set Up Review Results Every Week Monthly Packages Straightforward Pricing Get Free Quote Key Deliverables a disciplined approach ensuring zero wasted ad budget high accountability transparent engagement models without hidden commissions Starter Package Growth Package Institutional Custom active monthly management delivery mapped scoped agreed exact needs Transparent engagement hidden commissions No-Nonsense Digital Marketing face-to-face or Google Meet target customers marketing problems budget graphics compelling copy ad campaigns brings actual calls inquiries cut wasted ad spend WhatsApp reports Want talk marketing business 30 minutes person Google Meet current social media page practical suggestions no pressure no commitment Book Free 30-Min Discussion Select Package' },

  // ===== PORTFOLIO =====
  { page: 'portfolio', text: 'Past Projects Results Real Work Real Results training cohorts conducted video projects produced marketing campaigns managed Nepal Past projects Case Studies Learning Production Collaboration Client Verified Outcome The Challenge What Vedanta Strategies Delivered' },

  // ===== BLOG =====
  { page: 'blog', text: 'Knowledge Hub Articles AI Media Literacy Production Essays practical guides artificial intelligence media literacy creative production Nepal' },

  // ===== GALLERY =====
  { page: 'gallery', text: 'Photo Gallery Workshop Training Photos photos Vedanta Strategies workshops training sessions production work Bagbazar office Kathmandu Video Gallery Workshops Events videos across Nepal' },

  // ===== GALLERY VIDEOS =====
  { page: 'gallery-videos', text: 'Video Gallery Workshops Events videos Vedanta Strategies workshops training sessions events across Nepal' },

  // ===== CONTACT =====
  { page: 'contact', text: 'Get In Touch Let Friendly Chat join course partner institutional training cup tea Bagbazar Send Direct Message purpose joining training course workshop school college digital marketing ads business collaborating project just asking general question School College Organization Name office hours Sunday Friday 9:00 AM 6:00 PM Bagbazar Kathmandu 44600 Nepal WhatsApp Chat WhatsApp Now Message Sent Thanks writing phone WhatsApp shortly during office hours Contact Admissions Bagbazar Kathmandu Visit Vedanta Strategies enquire AI training institutional workshops production services' },

  // ===== SEARCH =====
  { page: 'search', text: 'Search Vedanta Strategies courses services articles team members partners gallery content' },

  // ===== Navbar / Misc hardcoded =====
  { page: 'home', text: 'Upcoming Batches Apply Now New Batch Learn Skills Apply Enroll Inquiry Get Started Learn More Apply Now Talk to Us View Courses Primary Secondary Free Demo Request' },
];

const has = (text, q) => text.toLowerCase().includes(q);

export function searchStaticContent(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];

  const pageMatches = {};

  for (const entry of [...TRANSLATION_INDEX, ...COMPONENT_INDEX]) {
    if (has(entry.text, q)) {
      if (!pageMatches[entry.page]) pageMatches[entry.page] = true;
    }
  }

  return Object.keys(pageMatches);
}
