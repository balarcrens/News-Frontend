import React from 'react';

/**
 * PageLoader - A premium full-page loader for Nexora News.
 * Features a top progress line and a minimalist centered animation.
 */
const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-500">
            {/* Top Progress Line Animation */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-100 overflow-hidden">
                <div className="h-full bg-red-700 animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
            </div>

            {/* Centered Branded Animation */}
            <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 relative">
                    {/* Ring animation */}
                    <div className="absolute inset-0 border-2 border-red-700/10 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-t-red-700 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
                
                {/* Text Animation */}
                <div className="mt-8 overflow-hidden">
                    <h1 className="text-sm font-serif italic font-black uppercase tracking-[0.4em] text-slate-900 animate-pulse">
                        Nexora <span className="text-red-700">News</span>
                    </h1>
                </div>
            </div>

            <style>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); width: 30%; }
                    50% { transform: translateX(0%); width: 100%; }
                    100% { transform: translateX(100%); width: 30%; }
                }
            `}</style>
        </div>
    );
};

export default PageLoader;
