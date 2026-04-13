import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { categoryService } from '../api/categoryService';
import { articleService } from '../api/articleService';
import CategoryHeader from '../components/category/CategoryHeader';
import CategorySidebar from '../components/category/CategorySidebar';
import { ChevronLeft, ChevronRight, Bookmark, Filter, X } from 'lucide-react';
import SEO from '../components/common/SEO';
import { format } from 'date-fns';

const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages < 1) return null;

    const { currentPage, totalPages } = pagination;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-2 pt-12 border-t border-gray-100 mt-16">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-red-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
                <ChevronLeft size={20} />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 text-[11px] font-bold uppercase transition-all ${currentPage === page ? 'bg-red-700 text-white' : 'text-slate-600 hover:bg-gray-50'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-red-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

const ArticleCard = ({ article, isFeatured = false }) => {
    if (isFeatured) {
        return (
            <div className="relative group mb-20">
                <div className="relative aspect-[21/9] overflow-hidden mb-10">
                    <img
                        src={article.media?.featuredImage || 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                        loading='eager'
                        alt={article.title}
                        className="w-full h-full object-cover will-change-transform transition-all duration-700 blur-md group-hover:scale-105"
                        onLoad={(e) => {
                            e.currentTarget.classList.remove('blur-md');
                        }}
                    />
                    <div className="absolute top-6 left-6 space-x-3 flex">
                        <span className="bg-red-700 text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
                            Breaking
                        </span>
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
                            {article.category?.name} — {article.readingTime || '10'} Min Read
                        </span>
                    </div>
                </div>

                <div className="max-w-4xl">
                    <h2 className="text-3xl md:text-6xl font-black font-serif italic tracking-tighter text-slate-900 mb-8 leading-[1.05] group-hover:text-red-700 transition-colors">
                        <Link to={`/article/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="text-md sm:text-xl font-serif text-gray-500 mb-10 leading-relaxed italic max-w-3xl line-clamp-2">
                        {article.summary}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={article.author?.avatar || 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png'}
                                alt={article.author?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{article.author?.name}</p>
                                <p className="text-[9px] font-medium text-gray-400 uppercase tracking-[0.2em] font-serif italic">Senior Correspondent</p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-red-700 transition-colors">
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="group">
            <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <img
                    src={article.media?.featuredImage || 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                    loading='eager'
                    alt={article.title}
                    className="w-full h-full object-cover will-change-transform transition-all duration-700 blur-md group-hover:scale-110"
                    onLoad={(e) => {
                        e.currentTarget.classList.remove('blur-md');
                    }}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[7px] font-bold uppercase tracking-[0.2em] px-2 py-1">
                        {article.category?.name} — {article.readingTime || '6'} Min Read
                    </span>
                </div>
            </div>
            <h3 className="text-lg md:text-xl font-black font-serif italic tracking-tight text-slate-900 mb-4 leading-tight group-hover:text-red-700 transition-colors line-clamp-2">
                <Link to={`/article/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="text-sm font-serif text-gray-500 mb-6 line-clamp-2 italic leading-relaxed">
                {article.summary}
            </p>
            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                {article.createdAt ? format(new Date(article.createdAt), 'MMMM dd, yyyy') : 'May 14, 2026'}
            </p>
        </div>
    );
};

const CategoryPage = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        sortBy: searchParams.get('sort') || 'newest',
        timePeriod: searchParams.get('time') || 'all',
        page: parseInt(searchParams.get('page')) || 1
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [catInfo, allCats] = await Promise.all([
                categoryService.getBySlug(slug),
                categoryService.getAll()
            ]);

            setCategory(catInfo);
            setCategories(allCats);

            // Fetch articles for this category
            const params = {
                category: catInfo._id,
                sortBy: filters.sortBy === 'newest' ? 'createdAt' : filters.sortBy,
                page: filters.page,
                limit: 5 // 1 featured + 4 grid
            };

            const articlesData = await articleService.getArticles(params);
            setArticles(articlesData.articles);
            setPagination(articlesData.pagination);

        } catch (error) {
            console.error("Error fetching category data:", error);
        } finally {
            setLoading(false);
        }
    }, [slug, filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSortChange = (val) => setFilters(prev => ({ ...prev, sortBy: val, page: 1 }));
    const handleTimeChange = (val) => setFilters(prev => ({ ...prev, timePeriod: val, page: 1 }));
    const handlePageChange = (p) => {
        setFilters(prev => ({ ...prev, page: p }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const applyFilters = () => {
        setSearchParams({
            sort: filters.sortBy,
            time: filters.timePeriod,
            page: filters.page
        });
        setIsSidebarOpen(false); // Close sidebar on mobile after applying
    };

    if (loading && !category) {
        return <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif italic text-gray-400">Curating archive...</div>;
    }

    const featuredArticle = articles[0];
    const gridArticles = articles.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <SEO 
                title={`${category?.name} News`}
                description={category?.description || `Explore the latest ${category?.name} news, analysis and reports on Nexora News.`}
                ogType="website"
            />
            <CategoryHeader
                title={category?.name}
                description={category?.description}
            />

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-end mb-8">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center space-x-2 bg-white border border-gray-100 px-6 py-3 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                    {isSidebarOpen ? (
                        <>
                            <X size={16} className="text-red-700" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Close Filters</span>
                        </>
                    ) : (
                        <>
                            <Filter size={16} className="text-red-700" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Refine Results</span>
                        </>
                    )}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar */}
                <div className={`${isSidebarOpen ? 'block animate-in fade-in slide-in-from-top-4 duration-300' : 'hidden lg:block'}`}>
                    <CategorySidebar
                        categories={categories}
                        activeSlug={slug}
                        sortBy={filters.sortBy}
                        timePeriod={filters.timePeriod}
                        onSortChange={handleSortChange}
                        onTimeChange={handleTimeChange}
                        onApply={applyFilters}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {articles.length > 0 ? (
                        <>
                            {featuredArticle && filters.page === 1 && (
                                <ArticleCard article={featuredArticle} isFeatured={true} />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {(filters.page === 1 ? gridArticles : articles).map(article => (
                                    <ArticleCard key={article._id} article={article} />
                                ))}
                            </div>

                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-2xl font-serif italic text-gray-300">No stories found in this section.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
