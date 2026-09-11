import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { PUBLIC_PAGES, DEFAULT_OG_IMAGE, applySeoToHtml, getSiteUrl } from './src/lib/seoConfig.js';
import { initialData } from './src/data/initialData.js';
import { renderPage, setLiveStore } from './prerender-content.js';

const SITE_STORE_ROW = 'site_store'; // supabase table
const SITE_STORE_ID = 'default';

function mergeCmsStore(parsed = {}) {
  const siteSettings = {
    ...initialData.siteSettings,
    ...(parsed.siteSettings || {}),
    latitude: initialData.siteSettings.latitude,
    longitude: initialData.siteSettings.longitude,
    mapsUrl: initialData.siteSettings.mapsUrl,
    mapsEmbed: initialData.siteSettings.mapsEmbed
  };
  return {
    ...initialData,
    ...parsed,
    partners: (parsed.partners && parsed.partners.length > 0) ? parsed.partners : initialData.partners,
    teamMembers: (parsed.teamMembers && parsed.teamMembers.length > 0) ? parsed.teamMembers : initialData.teamMembers,
    blogPosts: (parsed.blogPosts && parsed.blogPosts.length > 0) ? parsed.blogPosts : initialData.blogPosts,
    testimonials: (parsed.testimonials && parsed.testimonials.length > 0) ? parsed.testimonials : initialData.testimonials,
    siteContent: parsed.siteContent ? {
      ...initialData.siteContent,
      ...parsed.siteContent,
      about: { ...initialData.siteContent.about, ...(parsed.siteContent.about || {}) }
    } : initialData.siteContent,
    siteSettings,
    media: { ...(initialData.media || {}), ...(parsed.media || {}) }
  };
}

// Fetch the LIVE CMS store from Supabase at build time so the pre-rendered
// SEO content reflects admin panel edits. Falls back to initialData if the
// project is not configured or the fetch fails. Only the public anon key is
// used (same key shipped in the client bundle); RLS still protects the data.
async function loadLiveStore(url, anonKey) {
  if (!url || !anonKey) return null;
  try {
    const res = await fetch(`${url}/rest/v1/${SITE_STORE_ROW}?select=data&id=eq.${SITE_STORE_ID}`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`
      },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return null;
    const rows = await res.json();
    const data = rows && rows[0]?.data;
    if (!data) return null;
    return mergeCmsStore(data);
  } catch (err) {
    console.warn('[seo] Live CMS fetch failed, using initialData:', err?.message || err);
    return null;
  }
}

// CSS to hide pre-rendered SEO content from normal users but keep it visible to crawlers.
// Crawlers that don't execute JS will see this content. Crawlers that DO execute JS
// will see the React-rendered content instead (which looks better). No duplication issue
// because the SEO content is hidden with display:none which crawlers still index.
const SEO_HIDDEN_CSS = `<style id="seo-content-css">
.seo-content {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.seo-content img {
  max-width: 100%;
  height: auto;
}
</style>`;

export function seoStaticPages() {
  return {
    name: 'seo-static-pages',
    apply: 'build',
    closeBundle: {
      sequential: true,
      async handler() {
        const dist = path.resolve('dist');
        const indexPath = path.join(dist, 'index.html');
        if (!fs.existsSync(indexPath)) return;

        const html = fs.readFileSync(indexPath, 'utf8');
        const siteUrl = getSiteUrl();
        const ogImage = `${siteUrl}${DEFAULT_OG_IMAGE}`;

        // ⚠ .env.local is NOT auto-injected into process.env by Vite for config/plugin
        // code — only into import.meta.env for client code. We MUST call loadEnv()
        // explicitly so the build-time Supabase fetch actually sees the anon key.
        // Otherwise process.env.VITE_SUPABASE_URL is undefined → fetch returns null →
        // prerender falls back to the hardcoded initialData CEO name. This was the
        // real cause of "CEO is X in the admin panel but crawlers can't find it."
        const envMode = process.env.NODE_ENV || 'production';
        const loaded = loadEnv(envMode, process.cwd(), '');
        const supabaseUrl = loaded.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = loaded.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

        // Load the LIVE CMS store at build time so admin panel edits are pre-rendered.
        const liveStore = await loadLiveStore(
          supabaseUrl,
          supabaseAnonKey
        );

        // Apply the live store to the prerender module's module-scope data
        // (about/siteContent) so every renderer uses the CURRENT CEO name etc.
        // The renderers read that scope, NOT the renderer() argument, so we
        // must call setLiveStore here rather than passing liveStore into renderers.
        if (liveStore) {
          setLiveStore(liveStore);
        }

        for (const page of PUBLIC_PAGES) {
          const canonical = `${siteUrl}${page.path}`;
          let injected = applySeoToHtml(html, {
            title: page.title,
            description: page.description,
            canonical,
            ogImage,
            lang: 'en'
          });

          // Inject pre-rendered crawlable content before </body>
          const renderer = renderPage[page.id];
          if (renderer) {
            const seoContent = renderer(liveStore || initialData);
            // Add the CSS + content before the closing </body> tag
            injected = injected.replace(
              '</body>',
              `${SEO_HIDDEN_CSS}\n${seoContent}\n</body>`
            );
          }

          if (page.path === '/') {
            fs.writeFileSync(indexPath, injected);
            continue;
          }
          const dir = path.join(dist, page.path.replace(/^\//, ''));
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, 'index.html'), injected);
        }

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_PAGES.map((page) => `  <url>
    <loc>${siteUrl}${page.path === '/' ? '/' : page.path}</loc>
    <changefreq>${page.id === 'blog' || page.id === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page.id === 'home' ? '1.0' : page.id === 'contact' || page.id === 'individual-training' ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
        fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

        const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;
        fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

        const blogPosts = initialData.blogPosts || [];
        const rssItems = blogPosts.map((post) => {
          const title = escapeXml(post.title_en || post.title || '');
          const summary = escapeXml(post.summary_en || post.summary || '');
          const author = escapeXml(post.author || 'Vedanta Strategies');
          const date = post.date || '';
          const link = `${siteUrl}/blog`;
          return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${summary}</description>
      <author>${author}</author>
      <pubDate>${date}</pubDate>
      <guid isPermaLink="false">${post.id}</guid>
    </item>`;
        }).join('\n');

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vedanta Strategies — Knowledge Hub</title>
    <link>${siteUrl}</link>
    <description>Essays and practical guides on artificial intelligence, media literacy, and creative production in Nepal.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>
`;
        fs.writeFileSync(path.join(dist, 'feed.xml'), rss);

        const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found | Vedanta Strategies</title>
  <meta name="description" content="The page you are looking for could not be found." />
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body { font-family: 'Poppins', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0b1220; color: #cbd5e1; text-align: center; }
    h1 { font-size: 4rem; color: #851C2C; margin-bottom: 0.5rem; }
    p { font-size: 1.1rem; margin-bottom: 2rem; }
    a { color: #C59A3F; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main>
    <h1>404</h1>
    <p>The page you are looking for could not be found.</p>
    <a href="/">Back to Home</a>
  </main>
</body>
</html>`;
        fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml);
      }
    }
  };
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
