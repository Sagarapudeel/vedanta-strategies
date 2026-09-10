import fs from 'node:fs';
import path from 'node:path';
import { PUBLIC_PAGES, DEFAULT_OG_IMAGE, applySeoToHtml, getSiteUrl } from './src/lib/seoConfig.js';

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
        fs.copyFileSync(indexPath, path.join(dist, '404.html'));
      }
    }
  };
}
