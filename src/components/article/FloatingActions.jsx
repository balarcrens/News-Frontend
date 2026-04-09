import React from 'react';
import { Share2, Bookmark, MessageSquare, Twitter, Facebook, Linkedin } from 'lucide-react';

const FloatingActions = ({ commentCount = 0 }) => {
    return (
        <div className="hidden lg:flex flex-col items-center sticky top-40 h-fit space-y-8 py-6 pr-8 border-r border-gray-100 italic font-serif">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 vertical-text mb-4">
                Share Stories
            </p>
            
            <div className="flex flex-col items-center space-y-6">
                <button className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative">
                    <Twitter size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Twitter / X
                    </span>
                </button>
                <button className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative">
                    <Facebook size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Facebook
                    </span>
                </button>
                <button className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative">
                    <Linkedin size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        LinkedIn
                    </span>
                </button>
            </div>

            <div className="w-8 h-px bg-gray-100"></div>

            <div className="flex flex-col items-center space-y-6">
                <button className="flex flex-col items-center space-y-2 group">
                    <div className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full">
                        <MessageSquare size={18} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-red-700 transition-colors uppercase tracking-widest">
                        {commentCount}
                    </span>
                </button>
                
                <button className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative">
                    <Bookmark size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Save Article
                    </span>
                </button>
                
                <button className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative">
                    <Share2 size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Copy Link
                    </span>
                </button>
            </div>

            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
            `}</style>
        </div>
    );
};

export default FloatingActions;
