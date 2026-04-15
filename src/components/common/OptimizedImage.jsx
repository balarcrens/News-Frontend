import React, { useState, useEffect } from 'react';

/**
 * OptimizedImage - A sophisticated image component for Nexora News.
 * Leverages ImageKit transformation API for performance and progressive loading.
 */
const OptimizedImage = ({ 
    src, 
    alt, 
    className = "", 
    width, 
    height, 
    aspectRatio = "aspect-video",
    priority = false, // if true, use loading="eager" and fetchpriority="high"
    quality = 80,
    blur = 30
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [placeholderSrc, setPlaceholderSrc] = useState('');

    useEffect(() => {
        if (!src) {
            const fallback = "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop";
            setImageSrc(fallback);
            setPlaceholderSrc(fallback);
            return;
        }

        // Check if it's an ImageKit URL
        const isImageKit = src.includes('ik.imagekit.io');

        if (isImageKit) {
            // Base URL without existing transformations
            const baseUrl = src.split('?')[0];
            
            // Create highly optimized main image URL
            let trs = [`q-${quality}`, `f-auto`];
            if (width) trs.push(`w-${width}`);
            if (height) trs.push(`h-${height}`);
            
            const finalSrc = `${baseUrl}?tr=${trs.join(',')}`;
            const finalPlaceholder = `${baseUrl}?tr=bl-${blur},q-20,f-auto${width ? `,w-${Math.round(width/10)}` : ''}`;
            
            setImageSrc(finalSrc);
            setPlaceholderSrc(finalPlaceholder);
        } else {
            // Fallback for non-ImageKit URLs (like GitHub fallback or Unsplash)
            setImageSrc(src);
            setPlaceholderSrc(src);
        }
    }, [src, width, height, quality, blur]);

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${aspectRatio} ${className}`}>
            {/* Low-res Placeholder (Blur-up) */}
            <img
                src={placeholderSrc}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'} blur-lg scale-110`}
                aria-hidden="true"
            />

            {/* Main High-res Image */}
            <img
                src={imageSrc}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                fetchpriority={priority ? 'high' : 'auto'}
                onLoad={() => setIsLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-110 transition-transform duration-1000`}
            />
        </div>
    );
};

export default OptimizedImage;
