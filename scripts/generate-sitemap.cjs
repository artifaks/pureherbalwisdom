// Auto-generates sitemap.xml during build
// Includes all static routes and can be extended for dynamic routes

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://pureherbalwisdom.com';

// Static pages from App.tsx routes (exclude auth, admin, redirects, and 404)
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/symptom-matcher', priority: '0.8', changefreq: 'monthly' },
  { path: '/search', priority: '0.7', changefreq: 'monthly' },
  { path: '/herbal-teas', priority: '0.8', changefreq: 'weekly' },
  { path: '/plant-identifier', priority: '0.8', changefreq: 'monthly' },
  { path: '/saved-herbs', priority: '0.5', changefreq: 'monthly' },
  { path: '/herb-cabinet', priority: '0.5', changefreq: 'monthly' },
  { path: '/interaction-checker', priority: '0.8', changefreq: 'monthly' },
  { path: '/herb-store', priority: '0.8', changefreq: 'weekly' },
  { path: '/ebooks', priority: '0.7', changefreq: 'weekly' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = staticRoutes.map(route => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  // Write to dist/ (post-build)
  const distPath = path.resolve(__dirname, '../dist/sitemap.xml');
  fs.writeFileSync(distPath, sitemap.trim());
  console.log(`✅ Sitemap generated with ${staticRoutes.length} URLs → dist/sitemap.xml`);
}

generateSitemap();
