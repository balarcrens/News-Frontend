import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '/assets/pagenotfound.gif'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* News Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* 404 Breaking News Badge */}
                <div className="inline-block mb-8 animate-pulse">
                    <span className="bg-red-700 text-white px-4 py-1 text-xs font-black uppercase tracking-[0.3em] flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                        Breaking News: Error 404
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-6 tracking-tighter">
                    404 <span className="text-red-700">Not Found</span>
                </h1>

                {/* GIF Container (Professional technical difficulties screen) */}
                <div className="relative w-full aspect-video mb-10 overflow-hidden rounded-sm">
                    <img
                        src={PageNotFound || "https://shreexpresscourier.netlify.app/assets/pagenotfound.gif"}
                        alt="Technical Difficulties"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl font-serif italic text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
                    Our lead investigative reporters couldn't find this story. It may have been retracted, redirected, or never existed in our archives.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link
                        to="/"
                        className="w-full sm:w-auto bg-red-700 text-white px-10 py-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all duration-500 shadow-lg shadow-red-700/20"
                    >
                        Return to Home Page
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto cursor-pointer bg-white text-slate-600 px-10 py-4 text-xs font-black uppercase tracking-[0.3em] hover:text-slate-900 hover:bg-slate-50 transition-all duration-500 border border-slate-100"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-10 text-center w-full">
                <p className="text-[10px] uppercase font-sans font-bold tracking-[0.6em] text-slate-500">
                    Nexora News Editorial Division
                </p>
            </div>
        </div>
    );
};

export default NotFound;

