import React from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => (
    <div className="bg-[#111111] text-white p-8 rounded-xl mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        </div>

        <div className="relative z-10">
            <h3 className="text-2xl font-black font-serif italic tracking-tighter mb-4">The Morning Briefing</h3>
            <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                Join 250,000+ professionals who start their day with our curated global intelligence digest.
            </p>
            <form className="space-y-4">
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-[#1A1A1A] border border-gray-800 p-4 text-xs font-medium focus:outline-none focus:border-red-700 transition-colors"
                />
                <button className="w-full cursor-pointer bg-red-700 hover:bg-red-800 text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                    Subscribe Now
                </button>
            </form>
            <p className="text-[9px] text-gray-500 mt-6 text-center italic">
                Unsubscribe anytime. Privacy policy applies.
            </p>
        </div>
    </div>
);

const LatestNews = ({ articles = [], loading = false }) => {
    return (
        <div className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 mb-6 flex items-center">
                <span className="w-1.5 h-1.5 bg-red-700 mr-2"></span>
                Latest News
            </h3>
            <div className="space-y-8">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse flex flex-col space-y-2">
                            <div className="h-2 w-20 bg-gray-200"></div>
                            <div className="h-4 w-full bg-gray-200"></div>
                        </div>
                    ))
                ) : (
                    articles.length > 0 ? (
                        articles.map((item, i) => (
                            <Link to={`/article/${item.slug}`} key={item._id || i} className="group cursor-pointer block border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <span className="text-[9px] font-bold text-red-700/60 uppercase tracking-widest block mb-2 transition-colors group-hover:text-red-700">
                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <p className="text-sm font-bold text-slate-800 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                                    {item.title}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="text-xs text-gray-400 italic">No recent updates</div>
                    )
                )}
            </div>
        </div>
    );
};

const PopularNews = ({ articles = [], loading = false }) => {
    return (
        <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800 mb-8">
                Most Popular
            </h3>
            <div className="space-y-8">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse flex gap-4">
                            <div className="h-8 w-8 bg-gray-200"></div>
                            <div className="h-10 w-full bg-gray-200"></div>
                        </div>
                    ))
                ) : (
                    articles.length > 0 ? (
                        articles.map((item, i) => (
                            <Link to={`/article/${item.slug}`} key={item._id || i} className="flex gap-4 group cursor-pointer">
                                <span className="text-3xl font-black font-serif italic text-gray-200 group-hover:text-red-700 transition-colors leading-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="text-xs font-bold text-slate-800 leading-normal pt-1 group-hover:text-red-700 transition-colors line-clamp-2">
                                    {item.title}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <div className="text-xs text-gray-400 italic">No trending items</div>
                    )
                )}
            </div>
        </div>
    );
};

const Sidebar = ({ latestArticles = [], popularArticles = [], loading = false }) => (
    <aside>
        <LatestNews articles={latestArticles} loading={loading} />
        <PopularNews articles={popularArticles} loading={loading} />
        <Newsletter />
    </aside>
);

export default Sidebar;
