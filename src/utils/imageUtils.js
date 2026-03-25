/**
 * Utility to process and transform ImageKit URLs for responsive images and performance
 */

export const getOptimizedImage = (url, { width, height, quality = 80, format = 'auto' } = {}) => {
  if (!url) return 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80';
  
  // If not an ImageKit URL, return as is (but could add other CDN support later)
  if (!url.includes('ik.imagekit.io')) return url;

  try {
    const urlObj = new URL(url);
    const transformations = [];
    
    if (width) transformations.push(`w-${width}`);
    if (height) transformations.push(`h-${height}`);
    if (quality) transformations.push(`q-${quality}`);
    if (format) transformations.push(`f-${format}`);
    
    if (transformations.length > 0) {
      const trString = `tr:${transformations.join(',')}`;
      
      // Handle both path-based and query-based transformations
      // ImageKit usually uses path-based: ik.imagekit.io/endpoint/tr:w-300/path/to/image.jpg
      const pathParts = urlObj.pathname.split('/');
      // The first part is usually the endpoint ID
      pathParts.splice(2, 0, trString);
      urlObj.pathname = pathParts.join('/');
    }
    
    return urlObj.toString();
  } catch (e) {
    console.error('Error optimizing image URL:', e);
    return url;
  }
};

/**
 * Generates a srcset string for ImageKit images
 */
export const getImageSrcSet = (url, widths = [320, 640, 960, 1280, 1920]) => {
  if (!url || !url.includes('ik.imagekit.io')) return '';
  
  return widths
    .map(w => `${getOptimizedImage(url, { width: w })} ${w}w`)
    .join(', ');
};
