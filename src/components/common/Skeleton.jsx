import React from 'react';

/**
 * A reusable Skeleton component with a premium shimmering effect.
 * @param {string} variant - 'text', 'rect', or 'circle'
 * @param {string} width - CSS width
 * @param {string} height - CSS height
 * @param {string} className - Additional Tailwind classes
 */
const Skeleton = ({ variant = 'rect', width, height, className = '' }) => {
    const baseClasses = "relative overflow-hidden bg-slate-100";
    
    // Variant styles
    const variantClasses = {
        text: "h-3 w-full rounded",
        rect: "rounded-lg",
        circle: "rounded-full"
    };

    return (
        <div 
            className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
            style={{ width, height }}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
    );
};

export default Skeleton;
