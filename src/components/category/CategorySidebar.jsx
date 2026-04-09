import React from 'react';
import { ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategorySidebar = ({ 
    categories = [], 
    activeSlug, 
    onSortChange, 
    sortBy, 
    timePeriod, 
    onTimeChange,
    onApply 
}) => {
    return (
        <aside className="w-full lg:w-64 shrink-0 space-y-12">
            {/* Categories List */}
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-4">
                    Categories
                </h3>
                <nav className="space-y-3">
                    {categories.map((cat) => (
                        <Link 
                            key={cat._id}
                            to={`/category/${cat.slug}`}
                            className={`flex items-center justify-between group transition-all ${activeSlug === cat.slug ? 'text-red-700 font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            <span className="text-[11px] font-bold tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                                {cat.name}
                            </span>
                            {activeSlug === cat.slug ? (
                                <ChevronRight size={14} className="text-red-700" />
                            ) : (
                                <span className="text-[10px] text-gray-300 font-medium">
                                    {cat.articleCount || 0}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Sort By */}
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-4">
                    Sort By
                </h3>
                <div className="space-y-4">
                    {[
                        { id: 'newest', label: 'Newest First' },
                        { id: 'views', label: 'Most Popular' },
                        { id: 'likes', label: 'Most Liked' }
                    ].map((item) => (
                        <label key={item.id} className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="radio" 
                                    name="sort" 
                                    checked={sortBy === item.id}
                                    onChange={() => onSortChange(item.id)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 transition-all ${sortBy === item.id ? 'border-red-700' : 'border-gray-200 group-hover:border-gray-400'}`}>
                                    {sortBy === item.id && <div className="absolute inset-0 m-1 bg-red-700 rounded-full animate-in zoom-in-50 duration-200"></div>}
                                </div>
                            </div>
                            <span className={`ml-3 text-[11px] font-bold uppercase tracking-widest ${sortBy === item.id ? 'text-slate-900' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Time Period */}
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-4">
                    Time Period
                </h3>
                <select 
                    value={timePeriod}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="w-full bg-gray-50 border-none p-4 text-[10px] font-bold uppercase tracking-widest text-slate-900 outline-none focus:ring-1 focus:ring-red-700/20 appearance-none cursor-pointer"
                >
                    <option value="all">All Time</option>
                    <option value="today">Last 24 Hours</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="year">Last Year</option>
                </select>
            </div>

            {/* Apply Filters Button */}
            <button 
                onClick={onApply}
                className="w-full bg-slate-900 text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
            >
                <Filter size={12} />
                <span>Apply Filters</span>
            </button>
        </aside>
    );
};

export default CategorySidebar;
