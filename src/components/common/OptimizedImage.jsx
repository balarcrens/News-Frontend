/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useMemo } from 'react';

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

    // Reset loading state when src changes
    useEffect(() => {
        setIsLoaded(false);
    }, [src]);

    // Pre-calculate URLs to avoid empty src on first render
    const urls = useMemo(() => {
        const fallback = "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop";
        const currentSrc = src || fallback;

        // Check if it's an ImageKit URL
        const isImageKit = typeof currentSrc === 'string' && currentSrc.includes('ik.imagekit.io');

        if (isImageKit) {
            // Base URL without existing transformations
            const baseUrl = currentSrc.split('?')[0];

            // Create highly optimized main image URL
            let trs = [`q-${quality}`, `f-auto`];
            if (width) trs.push(`w-${width}`);
            if (height) trs.push(`h-${height}`);

            return {
                main: `${baseUrl}?tr=${trs.join(',')}`,
                placeholder: `${baseUrl}?tr=bl-${blur},q-20,f-auto${width ? `,w-${Math.round(width / 10)}` : ''}`
            };
        } else {
            // Fallback for non-ImageKit URLs
            return {
                main: currentSrc || null,
                placeholder: currentSrc || null
            };
        }
    }, [src, width, height, quality, blur]);

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${aspectRatio} ${className}`}>
            {/* Low-res Placeholder (Blur-up) */}
            {urls.placeholder && (
                <img
                    src={urls.placeholder}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'} blur-lg scale-110`}
                    aria-hidden="true"
                />
            )}

            {/* Main High-res Image */}
            {urls.main && (
                <img
                    src={urls.main}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    onLoad={() => setIsLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-110 transition-transform duration-1000`}
                />
            )}
        </div>
    );
};

export default OptimizedImage;

