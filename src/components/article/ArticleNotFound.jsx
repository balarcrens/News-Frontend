import React from 'react';
import { Link } from 'react-router-dom';

const ArticleNotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-white relative overflow-hidden">
            {/* Elegant Background Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-700"></div>
            
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
                {/* Visual Side */}
                <div className="w-full md:w-1/2 relative group">
                    <div className="absolute -inset-2 bg-slate-100/50 rounded-sm blur transition-all duration-700 group-hover:bg-red-50/50"></div>
                    <div className="relative aspect-[4/5] overflow-hidden border border-slate-200 shadow-2xl">
                        <img 
                            src="/assets/article-not-found.png" 
                            alt="News report missing" 
                            className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 text-left space-y-8">
                    <div className="space-y-4">
                        <span className="inline-block px-3 py-1 bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.3em]">
                            Update: Archives Missing
                        </span>
                        <h1 className="text-5xl md:text-6xl font-serif italic font-black text-slate-900 tracking-tighter leading-none">
                            News <span className="text-red-700">Unavailable</span>
                        </h1>
                        <div className="w-20 h-1.5 bg-slate-900"></div>
                    </div>

                    <p className="text-xl md:text-2xl font-serif text-slate-600 leading-relaxed max-w-md italic">
                        The professional report you are searching for cannot be located in our digital archives. It may have been relocated or is currently under revision.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-red-700 transition-all duration-500 group"
                        >
                            Return to Home
                            <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/category/all"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border border-slate-200 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-red-700 hover:text-red-700 transition-all duration-500"
                        >
                            Latest News
                        </Link>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                            Nexora News Editorial Board — Corrections Department
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
        </div>
    );
};

export default ArticleNotFound;
