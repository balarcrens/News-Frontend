/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useMemo } from 'react';

const OptimizedImage = ({
    src,
    alt,
    className = "",
    width,
    height,
    aspectRatio = "aspect-video",
    priority = false, // if true, use loading="eager" and fetchPriority="high"
    quality = 80
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Reset loading state when src changes
    useEffect(() => {
        setIsLoaded(false);
    }, [src]);

    const urls = useMemo(() => {
        const fallback = "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop";
        const currentSrc = src || fallback;

        const isImageKit = typeof currentSrc === 'string' && currentSrc.includes('ik.imagekit.io');

        if (isImageKit) {
            const baseUrl = currentSrc.split('?')[0];

            let trs = [`q-${quality}`, `f-auto`];
            if (width) trs.push(`w-${width}`);
            if (height) trs.push(`h-${height}`);

            return {
                main: `${baseUrl}?tr=${trs.join(',')}`,
                placeholder: `${baseUrl}?q-20,f-auto${width ? `,w-${Math.round(width / 10)}` : ''}`
            };
        } else {
            return {
                main: currentSrc || null,
                placeholder: currentSrc || null
            };
        }
    }, [src, width, height, quality]);

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${aspectRatio} ${className}`}>
            {urls.placeholder && (
                <img
                    src={urls.placeholder}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'} scale-110`}
                    aria-hidden="true"
                />
            )}

            {urls.main && (
                <img
                    src={urls.main}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    onLoad={() => setIsLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-110 transition-transform duration-1000`}
                />
            )}
        </div>
    );
};

export default OptimizedImage;

