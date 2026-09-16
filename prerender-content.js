// prerender-content.js
// Generates crawlable HTML content for each public page at build time.
// This content is injected into static HTML so search engines see everything
// without needing JavaScript. No sensitive data is included.
//
// SECURITY: Only public-facing content is included. No API keys, admin data, or leads.

import { initialData } from './src/data/initialData.js';
import { getLangText } from './src/utils/langHelper.js';

// Mirrors dataStore.js's mergeCms semantics for the prerender: merge the LIVE
// CMS store over initialData so admin-panel edits (e.g. CEO name in "CEO's
// Message") are pre-rendered, while initialData defaults win where the CMS
// omits required values (maps, lat/lng). dataStore keeps its own merge private,
// so we keep a tiny local equivalent here rather than importing a bogus name.
function mergePrerenderStore(cmsStore) {
  const base = initialData;
  const live = cmsStore || {};
  const siteSettings = {
    ...base.siteSettings,
    ...(live.siteSettings || {}),
    latitude: base.siteSettings.latitude,
    longitude: base.siteSettings.longitude,
    mapsUrl: base.siteSettings.mapsUrl,
    mapsEmbed: base.siteSettings.mapsEmbed
  };
  // Sanitize legacy fake partners if lingering in remote CMS
  const fakePartnerNames = ['apex', 'kathmandu model college', 'valley tech', 'milestone', 'rural heritage', 'himalayan naturals', 'techfin', 'kathmandu media lab'];
  const rawPartners = Array.isArray(live.partners) ? live.partners : base.partners;
  const partners = rawPartners.filter(p => !fakePartnerNames.some(fake => (p.name_en || p.name || '').toLowerCase().includes(fake)));

  // Sanitize legacy fake testimonials if lingering in remote CMS
  const fakeTestimonialNames = ['ramesh khadka', 'sunita maharjan', 'bikash adhikari'];
  const rawTestimonials = Array.isArray(live.testimonials) ? live.testimonials : base.testimonials;
  const testimonials = rawTestimonials.filter(t => !fakeTestimonialNames.some(fake => (t.author || '').toLowerCase().includes(fake)));

  // Sanitize legacy fake stats
  let siteContent = live.siteContent ? {
    ...base.siteContent,
    ...live.siteContent,
    about: { ...(base.siteContent.about || {}), ...(live.siteContent.about || {}) }
  } : base.siteContent;

  if (Array.isArray(siteContent.stats)) {
    const hasLegacyFabricatedStats = siteContent.stats.some(s => 
      s.value === '4,500+' || s.value === '28+' || s.value === '50+' ||
      (s.label_en || '').toLowerCase().includes('partner schools')
    );
    if (hasLegacyFabricatedStats) {
      siteContent = {
        ...siteContent,
        stats: base.siteContent.stats
      };
    }
  }

  return {
    ...base,
    ...live,
    siteSettings,
    partners,
    testimonials,
    teamMembers: Array.isArray(live.teamMembers) ? live.teamMembers : base.teamMembers,
    blogPosts: Array.isArray(live.blogPosts) ? live.blogPosts : base.blogPosts,
    siteContent,
    media: { ...(base.media || {}), ...(live.media || {}) }
  };
}

const SITE_URL = 'https://vedantastrategies.com';

// Mutable module data. The build plugin replaces these with the LIVE CMS store
// (from Supabase) via setLiveStore() before rendering, so admin panel edits
// (e.g. CEO name in "CEO's Message") appear in the crawlable HTML. Falls back
// to initialData when the project is unconfigured or the fetch fails.
let siteContent = initialData.siteContent || {};
let about = siteContent.about || {};
let currentData = initialData;

// Set the data used by every renderer. Called by vite.seoPlugin.js after it
// fetches the live store at build time. Merge keeps all fields consistent with
// the runtime app's mergeCms behavior (defaults from initialData win where the
// CMS omits required values like maps).
export function setLiveStore(cmsStore) {
  const merged = mergePrerenderStore(cmsStore || initialData);
  siteContent = merged.siteContent || initialData.siteContent || {};
  about = siteContent.about || {};
  currentData = merged;
}

function img(src, alt, extra = '') {
  if (!src) return '';
  const url = src.startsWith('http') ? src : `${SITE_URL}${src}`;
  return `<img src="${url}" alt="${esc(alt)}" loading="lazy" width="800" height="600" ${extra} />`;
}

function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function sectionTitle(tag, text) { return `<${tag}>${esc(text)}</${tag}>`; }

// ─── HOME PAGE ───
function renderHome() {
  const hero = siteContent.hero || {};
  const stats = (siteContent.stats || []).map(s =>
    `<div class="seo-stat"><strong>${esc(s.value)}</strong> — ${esc(s.label_en)}</div>`
  ).join('\n');

  const courses = (currentData.courses || initialData.courses || []).slice(0, 6).map(c =>
    `<li><strong>${esc(c.title_en || c.title)}</strong> — ${esc(c.tagline_en || c.tagline || '')} | ${esc(c.category || '')} | ${esc(c.mode || '')} | Rs. ${c.fee?.toLocaleString() || ''}</li>`
  ).join('\n');

  const services = (currentData.services || initialData.services || []).map(s =>
    `<li><strong>${esc(s.title_en || s.title)}</strong> — ${esc(s.shortDesc_en || s.shortDesc || '')}</li>`
  ).join('\n');

  const testimonials = (currentData.testimonials || []).map(t =>
    `<blockquote>"${esc(t.quote_en || t.quote || '')}" — <cite>${esc(t.author)} (${esc(t.role_en || t.role || '')})</cite></blockquote>`
  ).join('\n');

  const partners = (currentData.partners || []).map(p =>
    `<li>${img(p.logo, p.name_en || p.name)} ${esc(p.name_en || p.name)}</li>`
  ).join('\n');

  return `
    <section class="seo-content" aria-label="Home">
      <h1>${esc(hero.title_en || 'Vedanta Strategies')}</h1>
      <h2>${esc(hero.titleHighlight_en || 'Kathmandu')}</h2>
      <p>${esc(hero.subtitle_en || hero.subtitle || '')}</p>
      ${img('/images/hero.webp', hero.badge_en || 'Vedanta Strategies Training')}

      <h2>Our Training Courses</h2>
      <ul>${courses}</ul>

      <h2>Our Services</h2>
      <ul>${services}</ul>

      ${testimonials ? `<h2>What People Say About Us</h2>\n${testimonials}` : ''}

      <h2>Meet the Founder & CEO</h2>
      ${(function () {
        const fName = getLangText(about, 'ceoName', 'en') || 'Er. Suman Adhikari';
        const fTitle = getLangText(about, 'ceoTitle', 'en') || 'Founder & Chief Executive Officer';
        const fBio = getLangText(about, 'ceoBio', 'en') || '';
        const fPhoto = about.ceoPhoto || '/images/ceo.webp';
        return `<article>
          ${img(fPhoto, `Portrait of ${fName}, Founder and CEO of Vedanta Strategies`)}
          <h3>${esc(fName)}</h3>
          <p><strong>${esc(fTitle)}</strong></p>
          ${fBio ? `<p>${esc(fBio)}</p>` : ''}
          <p><a href="/ceo-message">Read the founder's full message</a></p>
        </article>`;
      })()}

      ${partners ? `<h2>Our Partners</h2>\n<ul>${partners}</ul>` : ''}

      <h2>Our Approach & Cohort Highlights</h2>
      ${stats}
    </section>`;
}

// ─── WHO WE ARE ───
function renderWhoWeAre() {
  const title = getLangText(about, 'title', 'en') || 'Practical Learning, Strategic Thinking & Lasting Impact';
  const subtitle = getLangText(about, 'subtitle', 'en') || 'A Kathmandu-based strategic learning academy and digital consulting firm committed to execution-driven training and measurable progress.';
  const whoWeAreText = getLangText(about, 'whoWeAre', 'en') || 'Vedanta Strategies is a strategic consultancy and hands-on training hub located in Bagbazar, Kathmandu.';
  const storyTitle = getLangText(about, 'storyTitle', 'en') || 'Our Story & Founding Purpose';
  const storyText = getLangText(about, 'story', 'en') || 'We started Vedanta Strategies in Kathmandu with a simple conviction: technology training in Nepal shouldn\'t be about dry slideshows or confusing buzzwords.';
  const missionTitle = getLangText(about, 'missionTitle', 'en') || 'Our Mission';
  const missionText = getLangText(about, 'mission', 'en') || 'To democratize practical AI and modern digital skills across Nepal through high-touch, laptop-first mentoring.';
  const visionTitle = getLangText(about, 'visionTitle', 'en') || 'Our Vision';
  const visionText = getLangText(about, 'vision', 'en') || 'To become Nepal\'s benchmark hub for practical technology education, ethical media literacy, and performance digital growth.';

  const valuesHtml = (about.values || []).map(v => 
    `<li><strong>${esc(v.title_en || v.title)}</strong>: ${esc(v.desc_en || v.desc)}</li>`
  ).join('\n');

  const diffHtml = (about.differentiationPoints || []).map(d =>
    `<li><strong>${esc(d.title_en || d.title)}</strong>: ${esc(d.desc_en || d.desc)}</li>`
  ).join('\n');

  const focusHtml = (about.focusAreas || []).map(f =>
    `<li><strong>${esc(f.title_en || f.title)}</strong>: ${esc(f.desc_en || f.desc)}</li>`
  ).join('\n');

  const aboutPhoto = (currentData.media?.banners?.about) || '/images/studio.webp';

  return `
    <section class="seo-content" aria-label="Who We Are">
      <h1>${esc(title)} — Vedanta Strategies</h1>
      <p class="subtitle">${esc(subtitle)}</p>
      <p>${esc(whoWeAreText)}</p>
      ${img(aboutPhoto, 'Vedanta Strategies training hub and production studio in Bagbazar Kathmandu')}

      <h2>${esc(storyTitle)}</h2>
      <p>${esc(storyText)}</p>

      <h2>${esc(missionTitle)}</h2>
      <p>${esc(missionText)}</p>

      <h2>${esc(visionTitle)}</h2>
      <p>${esc(visionText)}</p>

      <h2>Core Operating Values</h2>
      <ul>
        ${valuesHtml}
      </ul>

      <h2>Why Vedanta Strategies Feels Different</h2>
      <ul>
        ${diffHtml}
      </ul>

      <h2>Core Areas of Focus</h2>
      <ul>
        ${focusHtml}
      </ul>

      <h2>Visit Our In-Person Hub in Kathmandu</h2>
      <p>Our practical classrooms and studio are located in Bagbazar, Kathmandu. In-person laptop training with maximum 15 learners per cohort.</p>
    </section>`;
}

// ─── CEO MESSAGE ───
function renderCeoMessage() {
  const name = getLangText(about, 'ceoName', 'en') || 'Er. Suman Adhikari';
  const title = getLangText(about, 'ceoTitle', 'en') || 'Founder & Chief Executive Officer';
  const bio = getLangText(about, 'ceoBio', 'en') || '';
  const msg = getLangText(about, 'ceoMessage', 'en') || '';
  const photo = about.ceoPhoto || '/images/ceo.jpg';

  return `
    <section class="seo-content" aria-label="CEO Message">
      <h1>Message from the Founder & CEO</h1>
      <h2>${esc(name)}</h2>
      <p><strong>${esc(title)}</strong></p>
      ${img(photo, `Portrait of ${name}, Founder and CEO of Vedanta Strategies`)}
      <p>${esc(bio)}</p>
      <blockquote>${esc(msg)}</blockquote>
      <p>Bagbazar, Kathmandu 44600, Nepal</p>
    </section>`;
}

// ─── TEAM ───
function renderTeam() {
  const members = (initialData.teamMembers || []).map(m => {
    const role = getLangText(m, 'role', 'en') || m.role || '';
    const spec = getLangText(m, 'specialty', 'en') || '';
    const bio = getLangText(m, 'bio', 'en') || '';
    return `
      <article>
        <h3>${esc(m.name)}</h3>
        <p><strong>${esc(role)}</strong></p>
        ${spec ? `<p>Specialty: ${esc(spec)}</p>` : ''}
        ${bio ? `<p>${esc(bio)}</p>` : ''}
        ${m.photo ? img(m.photo, `Photo of ${m.name}`) : ''}
      </article>`;
  }).join('\n');

  return `
    <section class="seo-content" aria-label="Our Team">
      <h1>The People Behind Vedanta Strategies</h1>
      <p>We are active practitioners, engineers, and digital growth specialists.</p>
      ${members}
    </section>`;
}

// ─── INDIVIDUAL TRAINING ───
function renderIndividualTraining() {
  const courses = (initialData.courses || [])
    .filter(c => !c.track || c.track === 'individual')
    .map(c => {
      const title = getLangText(c, 'title', 'en') || c.title || '';
      const tagline = getLangText(c, 'tagline', 'en') || c.tagline || '';
      const cat = getLangText(c, 'category', 'en') || c.category || '';
      const dur = getLangText(c, 'duration', 'en') || c.duration || '';
      const mode = getLangText(c, 'mode', 'en') || c.mode || '';
      const mentor = c.mentor || '';
      const fee = c.fee?.toLocaleString() || '';
      const curriculum = (getLangArray(c, 'curriculum', 'en').length ? getLangArray(c, 'curriculum', 'en') : (c.curriculum || [])).map(i => `<li>${esc(i)}</li>`).join('');

      return `
        <article class="seo-course">
          <h3>${esc(title)}</h3>
          <p>${esc(tagline)}</p>
          <ul>
            <li>Category: ${esc(cat)}</li>
            <li>Duration: ${esc(dur)}</li>
            <li>Mode: ${esc(mode)}</li>
            ${mentor ? `<li>Mentor: ${esc(mentor)}</li>` : ''}
            ${fee ? `<li>Fee: Rs. ${fee}</li>` : ''}
          </ul>
          ${curriculum ? `<h4>Curriculum</h4><ul>${curriculum}</ul>` : ''}
        </article>`;
    }).join('\n');

  return `
    <section class="seo-content" aria-label="Individual Training">
      <h1>Practical Courses Designed for Real Work</h1>
      <p>Zero outdated theory. Every cohort is capped at 15 learners with personalized mentor guidance.</p>
      ${courses}
      <h2>Frequently Asked Questions</h2>
      <h3>Are classes conducted physically at Bagbazar or online?</h3>
      <p>We offer both! Trainees can attend physical hands-on sessions at our Bagbazar office computer lab, or join live interactive online streams.</p>
      <h3>Do I need to bring my own laptop?</h3>
      <p>Yes, we strongly recommend learning on your own laptop so every workflow remains ready for your daily work.</p>
      <h3>Do trainees receive verified certificates?</h3>
      <p>Yes. Trainees who complete the required hands-on capstone project receive an accredited certificate with digital verification.</p>
    </section>`;
}

function getLangArray(obj, field, lang) {
  const langKey = `${field}_${lang}`;
  if (Array.isArray(obj[langKey]) && obj[langKey].length) return obj[langKey];
  const enKey = `${field}_en`;
  if (Array.isArray(obj[enKey]) && obj[enKey].length) return obj[enKey];
  return Array.isArray(obj[field]) ? obj[field] : [];
}

// ─── INSTITUTIONAL TRAINING ───
function renderInstitutionalTraining() {
  const courses = (initialData.courses || [])
    .filter(c => c.track === 'institution')
    .map(c => {
      const title = getLangText(c, 'title', 'en') || c.title || '';
      const tagline = getLangText(c, 'tagline', 'en') || c.tagline || '';
      const cat = getLangText(c, 'category', 'en') || c.category || '';
      const dur = getLangText(c, 'duration', 'en') || c.duration || '';
      const mode = getLangText(c, 'mode', 'en') || c.mode || '';
      return `<article><h3>${esc(title)}</h3><p>${esc(tagline)}</p><ul><li>Category: ${esc(cat)}</li><li>Duration: ${esc(dur)}</li><li>Mode: ${esc(mode)}</li></ul></article>`;
    }).join('\n');

  return `
    <section class="seo-content" aria-label="Institutional Training">
      <h1>Institutional Bootcamps & Faculty Enablement</h1>
      <p>Empowering faculties, administrations, and student bodies across Nepal with hands-on AI tools, media literacy, and digital capabilities.</p>

      <h2>On-Site Delivery</h2><p>Our mentor team travels to your school or college anywhere across Nepal with complete workshop materials.</p>
      <h2>Faculty & Teacher AI Tools</h2><p>Save 5+ hours weekly with lesson-plan generation, question paper drafting, and grading rubric aids.</p>
      <h2>Accredited Student Credentials</h2><p>Each completing trainee receives an official digital verifiable certificate from Vedanta Strategies.</p>
      <h2>Free 60-Minute Demo Workshop</h2><p>Test our practical pedagogy before committing to a multi-week cohort.</p>

      ${courses}

      <h2>Frequently Asked Questions for Institutions</h2>
      <h3>How do customized bootcamps work for schools and colleges?</h3>
      <p>Our institutional team designs customized 2-day to 4-week bootcamps directly inside partner institutions.</p>
      <h3>Can we arrange training exclusively for our faculty?</h3>
      <p>Yes! We run specialized faculty development programs focused on lesson planning with ChatGPT/Claude.</p>
      <h3>How do we request the free 60-minute demonstration?</h3>
      <p>Click 'Request Free Demo Class', provide your school/college name, and our liaison will reach out.</p>
    </section>`;
}

// ─── SERVICES ───
function renderServices() {
  const services = (initialData.services || []).map(s => {
    const title = getLangText(s, 'title', 'en') || s.title || '';
    const desc = getLangText(s, 'shortDesc', 'en') || s.shortDesc || '';
    const delivs = (getLangArray(s, 'deliverables', 'en').length ? getLangArray(s, 'deliverables', 'en') : (s.deliverables || [])).map(d => `<li>${esc(d)}</li>`).join('');
    return `<article><h3>${esc(title)}</h3><p>${esc(desc)}</p>${delivs ? `<ul>${delivs}</ul>` : ''}</article>`;
  }).join('\n');

  return `
    <section class="seo-content" aria-label="Services">
      <h1>Clear, No-Nonsense Digital Marketing</h1>
      <p>We don't sell vanity metrics. We focus on getting real phone calls, WhatsApp messages, and student admissions.</p>
      ${services}
      <h2>Our 3-Step Process</h2>
      <h3>Step 1: We Listen & Understand</h3><p>We sit down with you to understand your target customers, current marketing problems, and budget.</p>
      <h3>Step 2: We Create & Set Up</h3><p>Our team designs the graphics, writes compelling copy, and sets up your ad campaigns.</p>
      <h3>Step 3: We Review Results Every Week</h3><p>We check which ads are bringing actual calls and inquiries, and send clear WhatsApp reports.</p>
    </section>`;
}

// ─── PORTFOLIO ───
function renderPortfolio() {
  const items = (initialData.portfolioItems || []).map(p => {
    const title = getLangText(p, 'title', 'en') || p.title || '';
    const challenge = getLangText(p, 'challenge', 'en') || '';
    const solution = getLangText(p, 'solution', 'en') || '';
    const metric = getLangText(p, 'metric', 'en') || '';
    return `<article><h3>${esc(title)}</h3><p>Client: ${esc(p.client || '')}</p><p>Pillar: ${esc(p.pillar || '')}</p>${metric ? `<p>Metric: ${esc(metric)}</p>` : ''}${challenge ? `<p>Challenge: ${esc(challenge)}</p>` : ''}${solution ? `<p>Solution: ${esc(solution)}</p>` : ''}</article>`;
  }).join('\n');

  return `
    <section class="seo-content" aria-label="Portfolio">
      <h1>Real Work, Real Results</h1>
      <p>Training cohorts conducted, video projects produced, and marketing campaigns managed in Nepal.</p>
      ${items}
    </section>`;
}

// ─── BLOG ───
function renderBlog() {
  const posts = (initialData.blogPosts || []).map(p => {
    const title = getLangText(p, 'title', 'en') || p.title || '';
    const summary = getLangText(p, 'summary', 'en') || '';
    const content = getLangText(p, 'content', 'en') || '';
    return `<article><h2>${esc(title)}</h2><p>Author: ${esc(p.author || '')} | Category: ${esc(p.category || '')} | ${esc(p.date || '')}</p><p>${esc(summary)}</p>${content ? `<div>${esc(content)}</div>` : ''}</article>`;
  }).join('\n');

  return `
    <section class="seo-content" aria-label="Blog">
      <h1>Knowledge Hub — Articles & Guides</h1>
      <p>Essays and practical guides on artificial intelligence, media literacy, and creative production in Nepal.</p>
      ${posts}
    </section>`;
}

// ─── GALLERY ───
function renderGallery() {
  const photos = (initialData.media?.galleryPhotos || []).map(p =>
    `<figure>${img(p.url || '/images/studio.jpg', p.caption || 'Gallery photo')}<figcaption>${esc(p.caption || '')}</figcaption></figure>`
  ).join('\n');

  return `
    <section class="seo-content" aria-label="Gallery">
      <h1>Photo Gallery — Workshop & Training Photos</h1>
      <p>Photos from Vedanta Strategies workshops, training sessions, production work, and the Bagbazar office.</p>
      ${img('/images/studio.jpg', 'Vedanta Strategies Studio')}
      ${photos || '<p>Gallery photos coming soon.</p>'}
    </section>`;
}

// ─── GALLERY VIDEOS ───
function renderGalleryVideos() {
  const videos = (initialData.media?.galleryVideos || []).map(v =>
    `<article><h3>${esc(v.title || '')}</h3><p>Platform: ${esc(v.platform || '')}</p></article>`
  ).join('\n');

  return `
    <section class="seo-content" aria-label="Gallery Videos">
      <h1>Video Gallery — Workshops & Events</h1>
      <p>Videos from Vedanta Strategies workshops, training sessions, and events across Nepal.</p>
      ${videos || '<p>Video gallery coming soon.</p>'}
    </section>`;
}

// ─── CONTACT ───
function renderContact() {
  return `
    <section class="seo-content" aria-label="Contact">
      <h1>Contact & Admissions</h1>
      <p>Visit Vedanta Strategies in Bagbazar, Kathmandu or enquire about AI training, institutional workshops, and production services.</p>
      <h2>Our Kathmandu Office</h2>
      <p>Bagbazar, Kathmandu 44600, Nepal</p>
      <p>Sunday to Friday: 9:00 AM – 6:00 PM</p>
      <p>Phone: +977 1-4421098 | WhatsApp: +977-9747887598</p>
      <p>Email: info.vedantastrategies@gmail.com</p>
      <h2>What are you looking for?</h2>
      <ul>
        <li>Joining a training course</li>
        <li>Workshop for our school or college</li>
        <li>Digital marketing & ads for my business</li>
        <li>Collaborating on a project</li>
        <li>Just asking a general question</li>
      </ul>
    </section>`;
}

// ─── SEARCH ───
function renderSearch() {
  return `
    <section class="seo-content" aria-label="Search">
      <h1>Search Vedanta Strategies</h1>
      <p>Search courses, services, blog articles, team members, partners, and gallery content.</p>
    </section>`;
}

// ─── PRIVACY POLICY ───
function renderPrivacyPolicy() {
  return `
    <section class="seo-content" aria-label="Privacy Policy">
      <h1>Privacy Policy — Vedanta Strategies</h1>
      <p>Vedanta Strategies Pvt. Ltd. is committed to protecting the privacy of our students, institutional partners, and website visitors in Nepal.</p>
      <h2>Information We Collect</h2>
      <p>We collect student enquiry details including name, email, phone number, and course interests solely to facilitate course enrollment, counseling, and direct communication.</p>
      <h2>Data Usage &amp; Protection</h2>
      <p>We do not sell, rent, or trade personal information to any third parties. All lead and enrollment records are handled confidentially.</p>
      <h2>Contact for Privacy Enquiries</h2>
      <p>Vedanta Strategies, Bagbazar, Kathmandu 44600, Nepal. Email: info.vedantastrategies@gmail.com | Phone: +977 1-4421098</p>
    </section>`;
}

// ─── TERMS OF SERVICE ───
function renderTermsOfService() {
  return `
    <section class="seo-content" aria-label="Terms of Service">
      <h1>Terms of Service — Vedanta Strategies</h1>
      <p>Terms and conditions governing course enrollments, institutional workshops, and creative production services with Vedanta Strategies Pvt. Ltd., Bagbazar, Kathmandu.</p>
      <h2>Course Enrollment &amp; Attendance</h2>
      <p>Admissions to practical cohorts operate on limited seat capacities (maximum 15 seats per cohort) to ensure high-touch mentoring. Seats are secured upon confirmed registration.</p>
      <h2>Production &amp; Consulting Agreements</h2>
      <p>All client production projects, podcast bookings, and institutional workshops are executed under clear project scopes and mutual agreements.</p>
      <h2>Contact</h2>
      <p>Bagbazar, Kathmandu 44600, Nepal. Phone: +977 1-4421098 | Email: info.vedantastrategies@gmail.com</p>
    </section>`;
}

// ─── RENDER MAP ───
export const renderPage = {
  home: renderHome,
  'who-we-are': renderWhoWeAre,
  'ceo-message': renderCeoMessage,
  team: renderTeam,
  'individual-training': renderIndividualTraining,
  'institutional-training': renderInstitutionalTraining,
  services: renderServices,
  portfolio: renderPortfolio,
  blog: renderBlog,
  gallery: renderGallery,
  'gallery-videos': renderGalleryVideos,
  contact: renderContact,
  search: renderSearch,
  'privacy-policy': renderPrivacyPolicy,
  'terms-of-service': renderTermsOfService,
};
