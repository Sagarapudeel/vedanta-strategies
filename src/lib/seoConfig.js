/** Shared SEO routes — used by the app and the Vite prerender plugin. */

export const DEFAULT_SITE_URL = 'https://vedantastrategies.com';
export const DEFAULT_SITE_NAME = 'Vedanta Strategies';
export const DEFAULT_OG_IMAGE = '/images/logo.png';

export const PUBLIC_PAGES = [
  {
    id: 'home',
    path: '/',
    title: 'Vedanta Strategies | AI Training, Production & Collaboration in Nepal',
    titleNe: 'वेदान्त स्ट्र्याटेजीज | नेपालमा एआई तालिम, प्रोडक्सन र सहकार्य',
    description:
      "Vedanta Strategies in Bagbazar, Kathmandu offers AI & media literacy training, cinematic video and podcast production, and strategic growth collaboration for professionals and institutions.",
    descriptionNe:
      'बागबजार, काठमाडौंस्थित वेदान्त स्ट्र्याटेजीजमा एआई तथा मिडिया साक्षरता तालिम, भिडियो र पोडकास्ट प्रोडक्सन, र संस्थागत वृद्धिका लागि सहकार्य उपलब्ध छ।'
  },
  {
    id: 'who-we-are',
    path: '/who-we-are',
    title: 'Who We Are | Vedanta Strategies Kathmandu',
    titleNe: 'हाम्रो परिचय | वेदान्त स्ट्र्याटेजीज',
    description:
      'Learn about Vedanta Strategies — a Kathmandu institution for practical IT, AI training, media literacy, and digital growth based in Bagbazar.',
    descriptionNe:
      'वेदान्त स्ट्र्याटेजीजबारे जान्नुहोस् — बागबजार, काठमाडौंमा आधारित व्यावहारिक आईटी, एआई तालिम, मिडिया साक्षरता र डिजिटल वृद्धिको संस्था।'
  },
  {
    id: 'ceo-message',
    path: '/ceo-message',
    title: "CEO's Message | Vedanta Strategies",
    titleNe: 'प्रमुख कार्यकारीको सन्देश | वेदान्त स्ट्र्याटेजीज',
    description:
      "A message from the CEO of Vedanta Strategies on practical AI education, media integrity, and building digital capability in Nepal.",
    descriptionNe:
      'नेपालमा व्यावहारिक एआई शिक्षा, मिडिया निष्ठा र डिजिटल क्षमता विकासबारे वेदान्त स्ट्र्याटेजीजका प्रमुख कार्यकारीको सन्देश।'
  },
  {
    id: 'team',
    path: '/team',
    title: 'Our Team | Instructors & Strategists | Vedanta Strategies',
    titleNe: 'हाम्रो टिम | वेदान्त स्ट्र्याटेजीज',
    description:
      'Meet the instructors, producers, and digital strategists at Vedanta Strategies in Kathmandu.',
    descriptionNe:
      'काठमाडौंस्थित वेदान्त स्ट्र्याटेजीजका प्रशिक्षक, प्रोड्युसर र डिजिटल रणनीतिकारहरूलाई भेट्नुहोस्।'
  },
  {
    id: 'individual-training',
    path: '/individual-training',
    title: 'Individual Training & Courses | AI & Digital Skills | Vedanta Strategies',
    titleNe: 'व्यक्तिगत तालिम तथा कोर्सहरू | वेदान्त स्ट्र्याटेजीज',
    description:
      'Enroll in practical AI tools, media literacy, and digital marketing courses for students and professionals in Kathmandu.',
    descriptionNe:
      'काठमाडौंमा विद्यार्थी र पेशेवरहरूका लागि व्यावहारिक एआई टुल्स, मिडिया साक्षरता र डिजिटल मार्केटिङ कोर्सहरूमा भर्ना हुनुहोस्।'
  },
  {
    id: 'institutional-training',
    path: '/institutional-training',
    title: 'Institutional Programs & School Workshops | Vedanta Strategies',
    titleNe: 'संस्थागत कार्यक्रम | वेदान्त स्ट्र्याटेजीज',
    description:
      'On-campus AI literacy bootcamps and teacher training for schools, colleges, and organizations in Nepal.',
    descriptionNe:
      'नेपालका विद्यालय, कलेज र संस्थाहरूका लागि क्याम्पसमा एआई साक्षरता बुटक्याम्प र शिक्षक तालिम।'
  },
  {
    id: 'services',
    path: '/services',
    title: 'Video, Podcast & Growth Services | Vedanta Strategies',
    titleNe: 'भिडियो, पोडकास्ट र ग्रोथ सेवाहरू | वेदान्त स्ट्र्याटेजीज',
    description:
      'Cinematic video production, podcast studio work, and strategic digital growth collaboration from Vedanta Strategies in Kathmandu.',
    descriptionNe:
      'काठमाडौंबाट सिनेमाटिक भिडियो प्रोडक्सन, पोडकास्ट स्टुडियो र रणनीतिक डिजिटल ग्रोथ सहकार्य।'
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    title: 'Portfolio | Films, Podcasts & Campaigns | Vedanta Strategies',
    titleNe: 'पोर्टफोलियो | वेदान्त स्ट्र्याटेजीज',
    description:
      'Selected video, podcast, and digital campaign work produced by Vedanta Strategies in Nepal.',
    descriptionNe:
      'वेदान्त स्ट्र्याटेजीजले नेपालमा तयार पारेका भिडियो, पोडकास्ट र डिजिटल अभियानका चयनित कामहरू।'
  },
  {
    id: 'blog',
    path: '/blog',
    title: 'Knowledge Hub | AI, Media Literacy & Production | Vedanta Strategies',
    titleNe: 'ज्ञान केन्द्र | वेदान्त स्ट्र्याटेजीज',
    description:
      'Essays and practical guides on artificial intelligence, media literacy, and creative production in Nepal.',
    descriptionNe:
      'नेपालमा कृत्रिम बौद्धिकता, मिडिया साक्षरता र सिर्जनशील उत्पादनबारे लेख र व्यावहारिक मार्गदर्शन।'
  },
  {
    id: 'gallery',
    path: '/gallery',
    title: 'Gallery | Campus & Workshop Photos | Vedanta Strategies',
    titleNe: 'ग्यालेरी | वेदान्त स्ट्र्याटेजीज',
    description:
      'Photos and videos from Vedanta Strategies workshops, production sessions, and the Bagbazar campus.',
    descriptionNe:
      'वेदान्त स्ट्र्याटेजीजका कार्यशाला, प्रोडक्सन सत्र र बागबजार क्याम्पसका तस्बिर तथा भिडियो।'
  },
  {
    id: 'contact',
    path: '/contact',
    title: 'Contact & Admissions | Vedanta Strategies Bagbazar, Kathmandu',
    titleNe: 'सम्पर्क तथा भर्ना | वेदान्त स्ट्र्याटेजीज बागबजार',
    description:
      'Visit Vedanta Strategies in Bagbazar, Kathmandu or enquire about AI training, institutional workshops, and production services.',
    descriptionNe:
      'बागबजार, काठमाडौंमा वेदान्त स्ट्र्याटेजीजमा आउनुहोस् वा एआई तालिम, संस्थागत कार्यशाला र प्रोडक्सन सेवाबारे सोधपुछ गर्नुहोस्।'
  }
];

export const PAGE_ALIASES = {
  about: 'who-we-are',
  training: 'individual-training',
  production: 'services'
};

export const PUBLIC_PAGE_IDS = PUBLIC_PAGES.map((p) => p.id);

export function getSiteUrl() {
  const fromVite =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL;
  const fromProcess =
    typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL;
  return String(fromVite || fromProcess || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function canonicalizePage(pageId) {
  if (!pageId) return 'home';
  if (pageId === 'admin') return 'admin';
  const aliased = PAGE_ALIASES[pageId] || pageId;
  if (PUBLIC_PAGE_IDS.includes(aliased)) return aliased;
  return 'home';
}

export function pathForPage(pageId) {
  const id = canonicalizePage(pageId);
  if (id === 'admin') return '/admin';
  const page = PUBLIC_PAGES.find((p) => p.id === id);
  return page ? page.path : '/';
}

export function pageFromPath(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  if (clean === '/admin') return 'admin';
  const page = PUBLIC_PAGES.find((p) => p.path === clean);
  return page ? page.id : null;
}

export function getPageSeo(pageId, lang = 'en') {
  const id = canonicalizePage(pageId);
  const page = PUBLIC_PAGES.find((p) => p.id === id) || PUBLIC_PAGES[0];
  const isNe = lang === 'ne';
  return {
    id: page.id,
    path: page.path,
    title: isNe ? page.titleNe : page.title,
    description: isNe ? page.descriptionNe : page.description
  };
}

export function pageFromHash(hashRaw) {
  const hash = String(hashRaw || '').replace(/^#\/?/, '').split('?')[0];
  if (!hash) return null;
  if (hash === 'admin') return 'admin';
  const id = PAGE_ALIASES[hash] || hash;
  if (PUBLIC_PAGE_IDS.includes(id)) return id;
  return null;
}

export function parseLocationPage() {
  if (typeof window === 'undefined') return 'home';
  const fromHash = pageFromHash(window.location.hash);
  if (fromHash) return fromHash;
  return pageFromPath(window.location.pathname) || 'home';
}

export function applySeoToHtml(html, { title, description, canonical, ogImage, lang = 'en' }) {
  let out = html;
  out = out.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = replaceMeta(out, 'name', 'description', description);
  out = replaceMeta(out, 'property', 'og:title', title);
  out = replaceMeta(out, 'property', 'og:description', description);
  out = replaceMeta(out, 'property', 'og:url', canonical);
  out = replaceMeta(out, 'property', 'og:image', ogImage);
  out = replaceMeta(out, 'name', 'twitter:title', title);
  out = replaceMeta(out, 'name', 'twitter:description', description);
  out = replaceMeta(out, 'name', 'twitter:image', ogImage);
  if (/rel="canonical"/.test(out)) {
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  } else {
    out = out.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  }
  return out;
}

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*\\/?>`);
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
