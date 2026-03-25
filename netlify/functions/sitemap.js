/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// netlify/functions/sitemap.js
const VALID_LANGS = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur',
    'es', 'fr', 'de', 'ar', 'zh-CN', 'ja', 'ru', 'pt', 'it', 'tr', 'vi', 'th', 'id', 'ko'
];

const STATIC_PAGES = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'about', priority: '0.6', changefreq: 'monthly' },
    { path: 'contact', priority: '0.6', changefreq: 'monthly' },
    { path: 'privacy-policy', priority: '0.3', changefreq: 'monthly' },
    { path: 'terms-of-service', priority: '0.3', changefreq: 'monthly' },
    { path: 'cookie-policy', priority: '0.3', changefreq: 'monthly' },
    { path: 'disclaimer', priority: '0.3', changefreq: 'monthly' }
];

const getAlternateLinks = (baseUrl, path) => {
    let links = '';
    VALID_LANGS.forEach(lang => {
        const langPath = lang === 'en' ? (path ? `/${path}` : '') : `/${lang}${path ? `/${path}` : ''}`;
        links += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />\n`;
    });
    links += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path ? `/${path}` : ''}" />\n`;
    return links;
};

exports.handler = async (event, context) => {
    const baseUrl = process.env.FRONTEND_URL || 'https://nexoranews.dpdns.org';
    const apiUrl = process.env.API_URL || 'https://news-api-v1.up.railway.app';

    try {
        // 1. Fetch articles from backend API
        const articlesRes = await fetch(`${apiUrl}/api/articles?limit=1000`);
        if (!articlesRes.ok) throw new Error('Articles fetch failed');
        const articlesData = await articlesRes.json();
        const articles = articlesData.articles || [];

        // 2. Fetch categories from backend API
        const categoriesRes = await fetch(`${apiUrl}/api/categories`);
        if (!categoriesRes.ok) throw new Error('Categories fetch failed');
        const categoriesData = await categoriesRes.json();
        const categories = categoriesData.categories || [];

        if (!articlesRes.ok) throw new Error('Articles fetch failed');
        if (!categoriesRes.ok) throw new Error('Categories fetch failed');

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

        // Static Pages
        STATIC_PAGES.forEach(page => {
            VALID_LANGS.forEach(lang => {
                const langPath = lang === 'en' ? (page.path ? `/${page.path}` : '') : `/${lang}${page.path ? `/${page.path}` : ''}`;
                xml += `
  <url>
    <loc>${baseUrl}${langPath}</loc>
${getAlternateLinks(baseUrl, page.path)}    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
            });
        });

        // Articles
        articles.forEach(article => {
            const articlePath = `article/${article.slug}`;
            const lastMod = article.updatedAt ? article.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];

            VALID_LANGS.forEach(lang => {
                const langPath = lang === 'en' ? `/${articlePath}` : `/${lang}/${articlePath}`;
                xml += `
  <url>
    <loc>${baseUrl}${langPath}</loc>
${getAlternateLinks(baseUrl, articlePath)}    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
            });
        });

        // Categories
        categories.forEach(category => {
            const categoryPath = `category/${category.slug}`;
            const lastMod = category.updatedAt ? category.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];

            VALID_LANGS.forEach(lang => {
                const langPath = lang === 'en' ? `/${categoryPath}` : `/${lang}/${categoryPath}`;
                xml += `
  <url>
    <loc>${baseUrl}${langPath}</loc>
${getAlternateLinks(baseUrl, categoryPath)}    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
            });
        });

        xml += `\n</urlset>`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            },
            body: xml,
        };
    } catch (error) {
        console.error('Sitemap function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate sitemap' }),
        };
    }
};
