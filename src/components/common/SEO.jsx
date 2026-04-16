import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    keywords, 
    canonicalUrl, 
    ogTitle, 
    ogDescription, 
    ogImage, 
    ogType = 'website',
    author,
    publishedTime,
    modifiedTime,
    category
}) => {
    const siteName = 'Nexora News';
    const baseUrl = import.meta.env.VITE_FRONTEND_URL || 'https://nexoranews.dpdns.org';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const currentUrl = canonicalUrl || window.location.href;

    const metaDescription = description || 'Nexora News - Premium global news network providing deep insights into politics, business, and technology.';
    const metaKeywords = keywords?.length > 0 ? keywords.join(', ') : 'news, headlines, politics, business, technology, Nexora News';

    const structuredData = [];

    // 1. Organization Schema
    structuredData.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteName,
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
            "https://facebook.com/nexoranews",
            "https://twitter.com/nexoranews",
            "https://linkedin.com/company/nexoranews"
        ]
    });

    // 2. Website Schema
    structuredData.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    });

    // 3. Article Schema (if applicable)
    if (ogType === 'article') {
        structuredData.push({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": title || ogTitle,
            "image": [ogImage || `${baseUrl}/og-image.jpeg`],
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "author": [{
                "@type": "Person",
                "name": author || 'Nexora Editorial',
                "url": baseUrl
            }],
            "publisher": {
                "@type": "Organization",
                "name": siteName,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/logo.png`
                }
            },
            "description": description || ogDescription
        });
    }

    // 4. Breadcrumb Schema
    if (category) {
        structuredData.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": baseUrl
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": category,
                    "item": `${baseUrl}/category/${category.toLowerCase()}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": currentUrl
                }
            ]
        });
    }

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={currentUrl} />
            <meta name="robots" content="index, follow" />
            {author && <meta name="author" content={author} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={ogTitle || fullTitle} />
            <meta property="og:description" content={ogDescription || metaDescription} />
            <meta property="og:image" content={ogImage || `${baseUrl}/og-image.jpeg`} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={ogTitle || fullTitle} />
            <meta name="twitter:description" content={ogDescription || metaDescription} />
            <meta name="twitter:image" content={ogImage || `${baseUrl}/og-image.jpeg`} />

            {/* Article specific metadata */}
            {ogType === 'article' && (
                <>
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    {category && <meta property="article:section" content={category} />}
                    {keywords?.map(tag => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Language alternates */}
            <link rel="alternate" hrefLang="x-default" href={baseUrl} />
            <link rel="alternate" hrefLang="en" href={baseUrl} />

            {/* Structured Data */}
            {structuredData.map((data, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(data)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;

