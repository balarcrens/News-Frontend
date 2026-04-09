import React from 'react';
import { PlayCircle, Award, Target, BookOpen } from 'lucide-react';

const ArticleSidebar = () => {
    return (
        <aside className="space-y-12">
            {/* Key Takeaways */}
            <div className="bg-[#F9F9F9] p-8 border border-gray-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700 mb-8 flex items-center">
                    <Award size={14} className="mr-3" />
                    Key Insights
                </h3>
                
                <ol className="space-y-8">
                    {[
                        "Diplomatic frameworks must adapt to the speed of digital information parity.",
                        "The return to 'quiet corridors' represents a rejection of performative politics.",
                        "Digital oversight prevents non-mandated back-channeling in sensitive negotiations."
                    ].map((item, i) => (
                        <li key={i} className="flex space-x-4">
                            <span className="text-xl font-black font-serif italic text-red-700 leading-none">
                                0{i + 1}.
                            </span>
                            <p className="text-xs font-bold text-slate-800 leading-relaxed uppercase tracking-widest">
                                {item}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Related Podcast/Media Card */}
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-4">
                    In-Depth Podcast
                </h3>
                <div className="relative group cursor-pointer overflow-hidden aspect-[4/5] bg-slate-900 shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1478737270239-2fccd87ee078?q=80&w=2070&auto=format&fit=crop" 
                        alt="Podcast"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                            <PlayCircle size={32} className="text-white fill-red-700" />
                        </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <p className="text-[9px] font-bold text-red-500 uppercase tracking-[0.2em] mb-2">Pulse Podcast</p>
                        <h4 className="text-xl font-black font-serif italic text-white leading-tight">
                            The Silent Shift: Ep. 42
                        </h4>
                    </div>
                </div>
            </div>

            {/* Reading List Card */}
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
                        className="w-full bg-gray-50 border-none p-4 text-[10px] font-bold text-center uppercase tracking-widest placeholder:text-gray-300 focus:ring-1 focus:ring-red-700/20"
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
