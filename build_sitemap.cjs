const fs = require('fs');

const data = fs.readFileSync('src/data/projectsData.js', 'utf8');
const ids = [...new Set([...data.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]))];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Temel Sayfalar -->
  <url>
    <loc>https://bahtiyartuna.com/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bahtiyartuna.com/projects</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bahtiyartuna.com/about</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bahtiyartuna.com/contact</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Proje Detay Sayfalari --><!-- Dinamik Uretim -->
`;

ids.forEach(id => {
  xml += `  <url>
    <loc>https://bahtiyartuna.com/projects/${id}</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap built with ' + (4 + ids.length) + ' URLs.');

