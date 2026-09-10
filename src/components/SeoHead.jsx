import { useEffect } from 'react';
import { getPageSeo, getSiteUrl, DEFAULT_OG_IMAGE, DEFAULT_SITE_NAME } from '../lib/seoConfig';
import { getLangText } from '../utils/langHelper';

function upsertMeta(selector, attr, key, content) {
  let el = document.head.querySelector(`${selector}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertHreflang(lang, href) {
  const key = `hreflang-${lang}`;
  let el = document.getElementById(key);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', lang);
    el.id = key;
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead({ pageId, currentLang, siteSettings }) {
  useEffect(() => {
    const isAdmin = pageId === 'admin';
    const seo = getPageSeo(pageId, currentLang);
    const siteUrl = getSiteUrl();
    const canonical = isAdmin ? `${siteUrl}/admin` : `${siteUrl}${seo.path}`;
    const title = isAdmin ? `Admin | ${DEFAULT_SITE_NAME}` : seo.title;
    const description = isAdmin
      ? 'Private administration area. Not for public indexing.'
      : seo.description;
    const imagePath = siteSettings?.ogImage || DEFAULT_OG_IMAGE;
    const ogImage = imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath}`;

    document.title = title;
    document.documentElement.lang = currentLang === 'ne' ? 'ne' : 'en';

    upsertMeta('meta', 'name', 'description', description);
    upsertMeta('meta', 'name', 'robots', isAdmin ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('meta', 'property', 'og:type', isAdmin ? 'website' : pageId === 'blog' ? 'article' : 'website');
    upsertMeta('meta', 'property', 'og:site_name', siteSettings?.siteName || DEFAULT_SITE_NAME);
    upsertMeta('meta', 'property', 'og:title', title);
    upsertMeta('meta', 'property', 'og:description', description);
    upsertMeta('meta', 'property', 'og:url', canonical);
    upsertMeta('meta', 'property', 'og:image', ogImage);
    upsertMeta('meta', 'property', 'og:locale', currentLang === 'ne' ? 'ne_NP' : 'en_US');
    upsertMeta('meta', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta', 'name', 'twitter:title', title);
    upsertMeta('meta', 'name', 'twitter:description', description);
    upsertMeta('meta', 'name', 'twitter:image', ogImage);
    upsertLink('canonical', canonical);

    if (!isAdmin) {
      const pagePath = seo.path || '/';
      const baseEn = `${siteUrl}${pagePath}`;
      const baseNe = `${siteUrl}${pagePath}${pagePath.includes('?') ? '&' : '?'}lang=ne`;
      upsertHreflang('en', baseEn);
      upsertHreflang('ne', baseNe);
      upsertHreflang('x-default', baseEn);
    }

    if (isAdmin) return;

    const address = getLangText(siteSettings, 'address', 'en')
      || siteSettings?.address_en
      || siteSettings?.address
      || 'Bagbazar, Kathmandu 44600, Nepal';
    const phone = siteSettings?.primaryPhone || '+977 1-4421098';
    const email = siteSettings?.officialEmail || 'info@vedantastrategies.com';
    const name = siteSettings?.siteName || DEFAULT_SITE_NAME;

    upsertJsonLd('seo-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['EducationalOrganization', 'LocalBusiness'],
          '@id': `${siteUrl}/#organization`,
          name,
          url: siteUrl,
          image: ogImage,
          email,
          telephone: phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: 'Kathmandu',
            addressCountry: 'NP'
          },
          geo: siteSettings?.latitude && siteSettings?.longitude
            ? {
                '@type': 'GeoCoordinates',
                latitude: siteSettings.latitude,
                longitude: siteSettings.longitude
              }
            : undefined,
          sameAs: [siteSettings?.facebookUrl, siteSettings?.linkedinUrl, siteSettings?.instagramUrl, siteSettings?.youtubeUrl].filter(
            (u) => u && u !== 'https://facebook.com' && u !== 'https://linkedin.com' && u !== 'https://instagram.com' && u !== 'https://youtube.com'
          )
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name,
          publisher: { '@id': `${siteUrl}/#organization` },
          inLanguage: ['en', 'ne']
        },
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl
            },
            ...(pageId !== 'home' ? [{
              '@type': 'ListItem',
              position: 2,
              name: title.split('|')[0].trim(),
              item: canonical
            }] : [])
          ]
        }
      ]
    });
  }, [pageId, currentLang, siteSettings]);

  return null;
}
