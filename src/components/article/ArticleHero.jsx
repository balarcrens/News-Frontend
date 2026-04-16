import React from 'react';
import { format } from 'date-fns';

const ArticleHero = ({ article }) => {
    if (!article) return null;

    const publishedDate = article.publishedAt || article.createdAt;

    return (
        <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex flex-col items-center mb-10">
                <span className="bg-red-700 text-white text-xs font-bold uppercase tracking-[0.3em] px-4 py-1.5 mb-8">
                    Featured & Global Analysis
                </span>

                <h1 className="text-3xl md:text-7xl font-black font-serif italic tracking-tighter text-slate-900 mb-10 leading-[1.05]">
                    {article.title}
                </h1>

                <p className="text-md md:text-2xl font-serif text-gray-500 leading-relaxed italic max-w-3xl">
                    {article.summary}
                </p>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-4 md:gap-0 space-x-12 pt-10 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                    <img
                        src={article.author?.avatar || 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png'}
                        alt={article.author?.name}
                        loading="eager"
                        className="w-12 h-12 rounded-full object-cover blur-md"
                        onLoad={(e) => {
                            e.currentTarget.classList.remove('blur-md');
                        }}
                        onError={(e) => {
                            e.target.src = 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png';
                        }}
                    />
                    <div className="text-left">
                        <p className="text-[12px] font-bold text-red-700 uppercase tracking-widest leading-none mb-1">BY {article.author?.name || 'NexoraNews'}</p>
                        <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em] font-serif italic">Senior Editorial Correspondent</p>
                    </div>
                </div>

                <div className="text-left">
                    <p className="text-[12px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-1">PUBLISHED</p>
                    <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em] font-serif italic">
                        {publishedDate ? format(new Date(publishedDate), 'MMMM dd, yyyy') : 'October 24, 2026'}
                    </p>
                </div>

                <div className="text-left">
                    <p className="text-[12px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-1">READ TIME</p>
                    <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em] font-serif italic">12 Minute Read</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleHero;

