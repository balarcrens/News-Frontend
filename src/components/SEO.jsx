import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogImage, ogType, canonicalUrl, author, publishedDate }) => {
  const siteTitle = "The Chronicle | Premium News & Insights";
  const fullTitle = title ? `${title} | The Chronicle` : siteTitle;
  const defaultDescription = "Stay ahead with The Chronicle. We provide deep-dive analysis, breaking news, and premium insights on global events, technology, and culture.";
  
  // Fix: Ensure canonicalUrl is prioritized, then window.location.href
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://thechronicle.qzz.io/');
  const defaultImage = "https://thechronicle.qzz.io/preview.jpg";

  return (
    <Helmet key={fullTitle}>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : (keywords || "breaking news, world news, technology, business, journalism")} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:site_name" content="The Chronicle" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article Specific OG */}
      {ogType === 'article' && (
        <>
          <meta property="article:author" content={author || 'The Chronicle Editorial Team'} />
          <meta property="article:published_time" content={publishedDate || new Date().toISOString()} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thechronicle" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Ranking Signals */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default SEO;
