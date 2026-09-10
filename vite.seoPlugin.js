import fs from 'node:fs';
import path from 'node:path';
import { PUBLIC_PAGES, DEFAULT_OG_IMAGE, applySeoToHtml, getSiteUrl } from './src/lib/seoConfig.js';
import { initialData } from './src/data/initialData.js';

export function seoStaticPages() {
  return {
    name: 'seo-static-pages',
    apply: 'build',
    closeBundle: {
      sequential: true,
      handler() {
        const dist = path.resolve('dist');
        const indexPath = path.join(dist, 'index.html');
        if (!fs.existsSync(indexPath)) return;

        const html = fs.readFileSync(indexPath, 'utf8');
        const siteUrl = getSiteUrl();
        const ogImage = `${siteUrl}${DEFAULT_OG_IMAGE}`;

        for (const page of PUBLIC_PAGES) {
          const canonical = `${siteUrl}${page.path}`;
          const injected = applySeoToHtml(html, {
            title: page.title,
            description: page.description,
            canonical,
            ogImage,
            lang: 'en'
          });
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
