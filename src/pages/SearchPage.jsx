import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    Search,
    ChevronRight,
    Calendar,
    Filter,
    Clock,
    SortAsc,
    ArrowRight,
    User,
    Check
} from 'lucide-react';
import { articleService } from '../api/articleService';
import { categoryService } from '../api/categoryService';
import { format } from 'date-fns';
import SEO from '../components/common/SEO';
import OptimizedImage from '../components/common/OptimizedImage';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const selectedCategory = searchParams.get('category') || 'all';
    const timeframe = searchParams.get('timeframe') || 'all';
    const sortBy = searchParams.get('sortBy') || 'relevance';

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 });
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const cats = await categoryService.getAll();
            setCategories(cats);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, []);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                keyword: query,
                page: currentPage,
                limit: 10,
                sortBy: sortBy
            };

            if (selectedCategory !== 'all') {
                params.category = selectedCategory;
            }

            // Calculate dates for timeframe
            const now = new Date();
            if (timeframe === '24h') {
                params.startDate = new Date(now.setDate(now.getDate() - 1)).toISOString();
            } else if (timeframe === 'week') {
                params.startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
            } else if (timeframe === 'month') {
                params.startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
            }

            const response = await articleService.getArticles(params);
            setArticles(response.articles);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    }, [query, currentPage, selectedCategory, timeframe, sortBy]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchArticles();
        window.scrollTo(0, 0);
    }, [fetchArticles]);

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all' || !value) {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }

        if (key !== 'page') {
            newParams.set('page', '1');
        }

        setSearchParams(newParams);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newQuery = formData.get('search');
        handleFilterChange('q', newQuery);
    };

    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title={query ? `Search: ${query}` : 'Search News'}
                description={`Explore search results for "${query}" on Nexora News.`}
            />
            <div className="pt-32 pb-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <form onSubmit={handleSearchSubmit} className="max-w-3xl mb-8 relative">
                        <input
                            name="search"
                            type="text"
                            defaultValue={query}
                            placeholder="Find news, blogs, or insights..."
                            className="w-full text-2xl md:text-3xl font-serif italic py-4 pl-12 pr-32 border-b-2 border-gray-100 focus:border-red-700 outline-none transition-all placeholder:text-gray-500"
                        />
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600" size={28} />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-700 text-white px-8 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-red-800 transition-colors shadow-lg shadow-red-700/10"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm italic font-serif">
                            Showing <span className="text-slate-900 font-bold not-italic">{pagination.totalItems}</span> results for <span className="text-red-700 font-bold not-italic">"{query || 'Everything'}"</span>
                        </p>

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden flex items-center space-x-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest border border-gray-100 px-4 py-2 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                            aria-expanded={isFilterOpen}
                            aria-controls="search-filters"
                            aria-label={isFilterOpen ? "Close filters" : "Open filters"}
                        >
                            <Filter size={14} />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <aside className={`lg:w-1/4 space-y-10 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                        <section>
                            <h3 className="text-[10px] font-bold text-red-700 uppercase tracking-[0.3em] mb-6 flex items-center">
                                Refine by Category
                                <div className="ml-4 h-[1px] flex-1 bg-gray-100"></div>
                            </h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleFilterChange('category', 'all')}
                                    className={`flex items-center justify-between w-full group focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 p-1 ${selectedCategory === 'all' ? 'text-red-700' : 'text-gray-600 hover:text-slate-900'}`}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 border ${selectedCategory === 'all' ? 'bg-red-700 border-red-700' : 'border-gray-200'} mr-3 flex items-center justify-center transition-all`}>
                                            {selectedCategory === 'all' && <Check size={10} className="text-white" />}
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-[11px]">All Categories</span>
                                    </div>
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat._id}
                                        onClick={() => handleFilterChange('category', cat._id)}
                                        className={`flex items-center justify-between w-full group focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 p-1 ${selectedCategory === cat._id ? 'text-red-700' : 'text-gray-600 hover:text-slate-900'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-4 h-4 border ${selectedCategory === cat._id ? 'bg-red-700 border-red-700' : 'border-gray-200'} mr-3 flex items-center justify-center transition-all`}>
                                                {selectedCategory === cat._id && <Check size={10} className="text-white" />}
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest text-[11px]">{cat.name}</span>
                                        </div>
                                        <span className="text-[10px] font-mono opacity-40 group-hover:opacity-100">{cat.articleCount || 0}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-bold text-red-700 uppercase tracking-[0.3em] mb-6 flex items-center">
                                Timeframe
                                <div className="ml-4 h-[1px] flex-1 bg-gray-100"></div>
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'All Time', value: 'all' },
                                    { label: 'Last 24 Hours', value: '24h' },
                                    { label: 'Past Week', value: 'week' },
                                    { label: 'Past Month', value: 'month' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleFilterChange('timeframe', opt.value)}
                                        className={`block w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] border transition-all focus:outline-none focus:ring-2 focus:ring-red-700 ${timeframe === opt.value ? 'bg-red-700 text-white border-red-700 shadow-md shadow-red-700/5' : 'bg-gray-50 text-gray-600 border-transparent hover:border-gray-200'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-bold text-red-700 uppercase tracking-[0.3em] mb-6 flex items-center">
                                Sort By
                                <div className="ml-4 h-[1px] flex-1 bg-gray-100"></div>
                            </h3>
                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border-gray-100 px-4 py-3 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-red-700 transition-all pr-10 rounded-none shadow-sm"
                                >
                                    <option value="relevance">Most Relevant</option>
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="views">Most Popular</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-focus-within:text-red-700 transition-colors">
                                    <SortAsc size={16} />
                                </div>
                            </div>
                        </section>
                    </aside>

                    <main className="lg:w-3/4">
                        {loading ? (
                            <div className="space-y-12">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="animate-pulse flex flex-col md:flex-row gap-8 overflow-hidden rounded-xl border border-gray-50/50">
                                        <div className="w-full md:w-72 h-48 bg-gray-100 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"></div>
                                        </div>
                                        <div className="flex-1 space-y-4 p-4 md:p-0">
                                            <div className="h-4 bg-gray-100 w-24"></div>
                                            <div className="h-8 bg-gray-100 w-full"></div>
                                            <div className="h-4 bg-gray-100 w-3/4"></div>
                                            <div className="h-4 bg-gray-100 w-1/2 pt-4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : articles.length > 0 ? (
                            <div className="space-y-12">
                                {articles.map((article, idx) => (
                                    <article key={article._id} className="group flex flex-col md:flex-row gap-8 items-start relative pb-12">
                                        {idx !== articles.length - 1 && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-50"></div>}

                                        <div className={`absolute z-10 left-0 top-0 w-1 h-[calc(100%-48px)] bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block`}></div>

                                        <div className="w-full md:w-72 shrink-0 overflow-hidden relative group/img rounded-xl border border-gray-100 shadow-sm bg-gray-50 aspect-[16/10] md:h-48">
                                            <OptimizedImage
                                                src={article.media?.featuredImage}
                                                alt={article.title}
                                                aspectRatio="h-full"
                                                className="w-full h-full"
                                            />
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">
                                                <span>{article.category?.name || 'Uncategorized'}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span className="text-gray-600">{format(new Date(article.publishedAt || article.createdAt), 'MMMM dd, yyyy')}</span>
                                            </div>

                                            <Link to={`/article/${article.slug}`}>
                                                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-tight mb-3 line-clamp-1">
                                                    {article.title}
                                                </h2>
                                            </Link>

                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium italic">
                                                {article.summary}
                                            </p>

                                            <div className="pt-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                                                        <OptimizedImage
                                                            src={article.author?.avatar}
                                                            alt={article.author?.name}
                                                            aspectRatio="h-full"
                                                            className="w-full h-full"
                                                        />
                                                    </div>
                                                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                                                        By {article.author?.name || article.customAuthor?.name || 'Editorial Staff'}
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/article/${article.slug}`}
                                                    className="flex items-center space-x-2 text-[10px] font-bold text-slate-900 uppercase tracking-widest group/link hover:text-red-700 transition-all border-b-2 border-transparent hover:border-red-700 pb-0.5"
                                                >
                                                    <span>Read Article</span>
                                                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}

                                {pagination.totalPages >= 1 && (
                                    <div className="pt-8 flex items-center justify-center space-x-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => handleFilterChange('page', currentPage - 1)}
                                            className="w-12 h-12 border border-gray-100 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all font-bold focus:outline-none focus:ring-2 focus:ring-red-700"
                                            aria-label="Previous page"
                                        >
                                            <ChevronRight className="rotate-180" size={20} />
                                        </button>

                                        {[...Array(pagination.totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            if (
                                                pageNum === 1 ||
                                                pageNum === pagination.totalPages ||
                                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handleFilterChange('page', pageNum)}
                                                        className={`w-12 h-12 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-1 ${currentPage === pageNum ? 'bg-red-700 text-white border-red-700 shadow-md shadow-red-700/10' : 'border border-gray-100 hover:bg-gray-50'}`}
                                                        aria-label={`Page ${pageNum}`}
                                                        aria-current={currentPage === pageNum ? "page" : undefined}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            }
                                            if (pageNum === 2 || pageNum === pagination.totalPages - 1) {
                                                return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            disabled={currentPage === pagination.totalPages}
                                            onClick={() => handleFilterChange('page', currentPage + 1)}
                                            className="w-12 h-12 border border-gray-100 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all font-bold focus:outline-none focus:ring-2 focus:ring-red-700"
                                            aria-label="Next page"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
                                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto text-gray-500">
                                    <Search size={32} />
                                </div>
                                <div className="space-y-2 px-6">
                                    <h3 className="text-xl font-serif font-bold text-slate-900 italic">No matching reports found</h3>
                                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                                        We couldn't find any articles matching your search for "{query}". Try adjusting your keywords or filters.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleFilterChange('q', '')}
                                    className="bg-slate-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg shadow-slate-900/10"
                                >
                                    Browse all recent intelligence
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

