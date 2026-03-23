import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, ogTitle, ogDescription, keywords, ogImage, ogType, canonicalUrl, author, publishedDate }) => {
  const siteTitle = "NexoraNews | Real-time Breaking News & Independent Journalism";
  const fullTitle = title ? `${title} | NexoraNews` : siteTitle;
  const defaultDescription = "NexoraNews delivers the latest breaking news, deep-dive analysis, and premium insights on global events, technology, and culture. Stay informed with our independent journalism.";
  
  // SEO optimization: prioritizes custom OG metadata if provided
  const seoTitle = ogTitle ? `${ogTitle} | NexoraNews` : fullTitle;
  const seoDescription = ogDescription || description || defaultDescription;
  
  // Fix: Ensure canonicalUrl is prioritized, then window.location.href
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://nexoranews.dpdns.org/');
  const defaultImage = "https://nexoranews.dpdns.org/preview.jpg";

  return (
    <Helmet key={fullTitle}>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : (keywords || "NexoraNews, breaking news, world news, technology insights, business headlines, independent journalism, global events")} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:site_name" content="NexoraNews" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article Specific OG */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={author || 'NexoraNews Editorial Team'} />
          <meta property="article:published_time" content={publishedDate || new Date().toISOString()} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nexoranews" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Ranking Signals */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default SEO;
