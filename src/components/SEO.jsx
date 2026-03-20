import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogImage, ogType, canonicalUrl }) => {
  const siteTitle = "The Chronicle | Premium News & Insights";
  const fullTitle = title ? `${title} | The Chronicle` : siteTitle;
  const defaultDescription = "Stay ahead with The Chronicle. We provide deep-dive analysis, breaking news, and premium insights on global events, technology, and culture.";
  
  return (
    <Helmet key={title}>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Ranking Signals */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default SEO;
