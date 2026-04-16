import React from 'react';

/**
 * PageLoader - A classic, journal-style full-page loader for Nexora News.
 * Inspired by premium editorial design ("The Daily Pulse").
 */
const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#FDFCFB] flex flex-col items-center justify-center transition-opacity duration-700">
            {/* Subtle Texture/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

            <div className="relative flex flex-col items-center w-full max-w-lg px-8">
                {/* Main Branding */}
                <div className="mb-8 text-center opacity-0 animate-[fade-up_1s_forwards_ease-out_0.2s]">
                    <h1 className="text-5xl md:text-7xl font-serif italic font-black text-slate-900 leading-tight">
                        Nexora <br /> News
                    </h1>
                </div>

                {/* Animated Divider */}
                <div className="w-full h-[2px] bg-slate-100 relative mb-8 overflow-hidden">
                    <div className="absolute inset-0 bg-red-700 origin-center scale-x-0 animate-[grow-line_1.5s_forwards_ease-in-out_0.5s]"></div>
                </div>

                {/* Subtitle / Motto */}
                <div className="mb-6 text-center opacity-0 animate-[fade-up_1s_forwards_ease-out_1s]">
                    <p className="text-xs font-sans font-medium uppercase tracking-[0.3em] text-slate-500">
                        Curating the World for You...
                    </p>
                </div>

                {/* Loading Dots */}
                <div className="flex space-x-2 opacity-0 animate-[fade-in_1s_forwards_ease-out_1.5s]">
                    <div className="w-1.5 h-1.5 bg-red-700/30 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-red-700/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-red-700/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>

                {/* Footer Quote */}
                <div className="absolute bottom-12 md:bottom-20 w-full text-center px-8">
                    <div className="opacity-0 animate-[fade-in_1s_forwards_ease-out_2s]">
                        <p className="text-sm font-serif italic text-slate-600 mb-6">
                            "Quality is not an act, it is a habit."
                        </p>

                        {/* Minimalist Icons */}
                        <div className="flex items-center justify-center space-x-6 opacity-60">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes grow-line {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
            `}</style>
        </div>
    );
};

export default PageLoader;

