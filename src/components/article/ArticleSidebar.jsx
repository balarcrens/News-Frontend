import React from 'react';
import { PlayCircle, Award, BookOpen } from 'lucide-react';

const ArticleSidebar = ({ article }) => {
    return (
        <aside className="space-y-12">
            {article?.summary && (
                <div className="bg-[#F9F9F9] p-8 border border-gray-100">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700 mb-8 flex items-center">
                        <Award size={14} className="mr-3" />
                        Executive Briefing
                    </h3>

                    <p className="text-sm font-serif italic text-slate-700 leading-relaxed mb-6">
                        {article.summary}
                    </p>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                            READ TIME: {Math.ceil(JSON.stringify(article.content).length / 1000) || 5} MIN
                        </p>
                    </div>
                </div>
            )}

            <div className="border border-gray-100 p-8 text-center bg-white shadow-sm">
                <BookOpen size={24} className="mx-auto text-red-700 mb-6" />
                <h3 className="text-sm font-black font-serif italic text-slate-900 mb-3">Newsletter Exclusive</h3>
                <p className="text-[10px] font-medium text-gray-500 leading-relaxed uppercase tracking-[0.1em] mb-6">
                    Get the weekly briefing delivered directly to your desk.
                </p>
                <div className="space-y-3">
                    <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-gray-50 border-none p-4 text-[10px] font-bold text-center uppercase tracking-widest placeholder:text-gray-500 focus:ring-1 focus:ring-red-700/20 outline-none"
                    />
                    <button className="w-full bg-red-700 text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-red-800 transition-all">
                        Subscribe
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ArticleSidebar;

