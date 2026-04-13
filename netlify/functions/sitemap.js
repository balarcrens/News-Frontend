/* eslint-disable no-undef */
const STATIC_PAGES = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'about', priority: '0.8', changefreq: 'monthly' },
    { path: 'contact', priority: '0.8', changefreq: 'monthly' },
    { path: 'privacy-policy', priority: '0.3', changefreq: 'monthly' },
    { path: 'terms-conditions', priority: '0.3', changefreq: 'monthly' },
    { path: 'cookie-policy', priority: '0.3', changefreq: 'monthly' },
    { path: 'search', priority: '0.4', changefreq: 'daily' },
];

// Escape XML safely
const escapeXml = (unsafe = '') => {
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

// Safe URL builder (avoids double slash)
const buildUrl = (base, path) => {
    return path ? `${base}/${path}` : base;
};

exports.handler = async () => {
    const baseUrl = process.env.FRONTEND_URL || 'https://nexoranews.dpdns.org';
    const apiUrl = process.env.VITE_VERCEL_BACKEND_URL || 'https://nexora-service.vercel.app';

    try {
        console.log('Generating dynamic sitemap...');

        const [articlesRes, categoriesRes] = await Promise.all([
            fetch(`${apiUrl}/api/articles?limit=5000`),
            fetch(`${apiUrl}/api/categories`)
        ]);

        if (!articlesRes.ok) throw new Error(`Articles fetch failed: ${articlesRes.status}`);
        if (!categoriesRes.ok) throw new Error(`Categories fetch failed: ${categoriesRes.status}`);

        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();

        const articles = articlesData.articles || [];
        const categories = categoriesData.categories || [];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

        // --- Static Pages ---
        STATIC_PAGES.forEach(page => {
            xml += `
  <url>
    <loc>${escapeXml(buildUrl(baseUrl, page.path))}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        });

        // --- Categories ---
        categories.forEach(category => {
            const lastMod = category.updatedAt
                ? category.updatedAt.split('T')[0]
                : new Date().toISOString().split('T')[0];

            xml += `
  <url>
    <loc>${escapeXml(buildUrl(baseUrl, `category/${category.slug}`))}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        // --- Articles ---
        articles.forEach(article => {
            const lastMod = article.updatedAt
                ? article.updatedAt.split('T')[0]
                : article.createdAt
                    ? article.createdAt.split('T')[0]
                    : new Date().toISOString().split('T')[0];

            const pubDate = article.publishedAt || article.createdAt || new Date().toISOString();
            const pubDateObj = new Date(pubDate);

            xml += `
  <url>
    <loc>${escapeXml(buildUrl(baseUrl, `article/${article.slug}`))}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>`;

            // Image sitemap
            if (article.media?.featuredImage) {
                xml += `
    <image:image>
      <image:loc>${escapeXml(article.media.featuredImage)}</image:loc>
      <image:title>${escapeXml(article.title || 'Nexora News')}</image:title>
    </image:image>`;
            }

            // Google News sitemap (last 2 days only)
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

            if (!isNaN(pubDateObj) && pubDateObj > twoDaysAgo) {
                xml += `
    <news:news>
      <news:publication>
        <news:name>Nexora News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDateObj.toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.title || 'Nexora News')}</news:title>
    </news:news>`;
            }

            xml += `
  </url>`;
        });

        xml += `\n</urlset>`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                'X-Content-Type-Options': 'nosniff'
            },
            body: xml,
        };

    } catch (error) {
        console.error('Sitemap generation error:', error);

        // Safe fallback
        let fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        STATIC_PAGES.forEach(page => {
            fallbackXml += `
  <url>
    <loc>${escapeXml(buildUrl(baseUrl, page.path))}</loc>
    <priority>${page.priority}</priority>
  </url>`;
        });

        fallbackXml += `\n</urlset>`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'no-cache'
            },
            body: fallbackXml,
        };
    }
};