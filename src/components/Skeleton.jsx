import React from 'react';

const Skeleton = ({ 
    width = '100%', 
    height = '20px', 
    borderRadius = 'var(--radius-sm)', 
    className = '',
    variant = 'rectangular', // rectangular, circular, text
    animate = true
}) => {
    const style = {
        width,
        height,
        borderRadius: variant === 'circular' ? '50%' : borderRadius,
        display: 'block',
        backgroundColor: 'var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <span 
            className={`skeleton ${variant} ${animate ? 'animate-shimmer' : ''} ${className}`}
            style={style}
            aria-hidden="true"
        >
            {animate && (
                <span className="skeleton-shimmer"></span>
            )}
        </span>
    );
};

export default Skeleton;
