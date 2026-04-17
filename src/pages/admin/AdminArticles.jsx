/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Type,
    Eye,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Sparkles
} from 'lucide-react';
import { articleService } from '../../api/articleService';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { categoryService } from '../../api/categoryService';
import { toast } from 'react-toastify';
import { confirmDestructive } from '../../utils/swal';
import TopicGeneratorModal from './components/TopicGeneratorModal';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (err) {
                console.error("Error loading categories:", err);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [page, categoryFilter, typeFilter]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 10,
                category: categoryFilter || undefined,
                type: typeFilter || undefined,
                keyword: searchTerm || undefined
            };
            const data = await articleService.getArticles(params);
            setArticles(data.articles);
            setPagination(data.pagination);
        } catch (err) {
            console.error("Error fetching articles:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setPage(1);
            fetchArticles();
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmDestructive(
            'Delete Report',
            'Are you sure you want to permanently delete this intelligence report? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            try {
                await articleService.deleteArticle(id);
                toast.success('Intelligence report successfully purged.');
                fetchArticles();
            } catch (err) {
                toast.error('Error during report deletion: ' + err.message);
            }
        }

    };

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black font-serif text-slate-900 tracking-tighter leading-none mb-4">
                        Article Matrix
                    </h1>
                    <p className="text-sm font-serif text-slate-500">Managing {pagination.totalItems || 0} intelligence reports across the network.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={() => setIsAIModalOpen(true)}
                        className="flex items-center justify-center cursor-pointer bg-white border border-red-700 text-red-700 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 hover:text-white transition-all duration-500 shadow-xl shadow-red-700/10 order-2 sm:order-1 w-full sm:w-auto"
                    >
                        <Sparkles size={16} className="mr-2" /> AI Discover
                    </button>
                    <Link
                        to="/admin/articles/new"
                        className="flex items-center justify-center bg-red-700 text-white px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-red-700/10 order-1 sm:order-2 w-full sm:w-auto"
                    >
                        <Plus size={16} className="mr-2" /> Publish New Report
                    </Link>
                </div>
            </header>

            <TopicGeneratorModal 
                isOpen={isAIModalOpen} 
                onClose={() => setIsAIModalOpen(false)} 
            />

            <div className="bg-white border border-slate-100 p-4 mb-8 flex flex-col xl:flex-row gap-6 items-center justify-between shadow-sm">
                <div className="relative w-full xl:max-w-100 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-700 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search headlines..."
                        className="w-full bg-slate-50 border-none pl-12 pr-4 py-3 text-[11px] font-bold uppercase tracking-wider placeholder:text-slate-500 focus:ring-1 focus:ring-red-100 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full xl:flex-1">
                    <div className="bg-slate-50 px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-red-100 transition-all">
                        <Filter size={14} className="text-slate-500 mr-3" />
                        <select
                            className="bg-transparent border-none w-full text-[10px] font-black uppercase tracking-widest text-slate-900 outline-none pb-0"
                            value={categoryFilter}
                            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                        >
                            <option value="">All Sectors</option>
                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div className="bg-slate-50 px-4 py-2 flex items-center focus-within:ring-1 focus-within:ring-red-100 transition-all">
                        <Type size={14} className="text-slate-500 mr-3" />
                        <select
                            className="bg-transparent border-none w-full text-[10px] font-black uppercase tracking-widest text-slate-900 outline-none"
                            value={typeFilter}
                            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                        >
                            <option value="">All Types</option>
                            <option value="news">News Intel</option>
                            <option value="blog">Editorial Blog</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white border border-slate-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto hidden-scrollbar text-nowrap">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest">Report Title</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest">Section</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest text-center">Engagement</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest">Status</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="py-8 px-8"><div className="h-4 bg-slate-100 w-3/4"></div></td>
                                    </tr>
                                ))
                            ) : articles.length > 0 ? (
                                articles.map((article) => (
                                    <tr key={article._id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="py-6 px-8 min-w-[300px]">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-slate-50 shrink-0 overflow-hidden mr-4 border border-slate-100">
                                                    <img
                                                        src={article.media?.featuredImage || 'placeholder.jpg'}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-slate-900 group-hover:text-red-700 transition-colors uppercase tracking-[0.05em] line-clamp-1 mb-1">
                                                        {article.title}
                                                    </p>
                                                    <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-widest">
                                                        <span>{article.author?.name || 'Staff Author'}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{format(new Date(article.createdAt), 'MMM dd, yyyy')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 uppercase tracking-widest">
                                                {article.category?.name || 'General'}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center justify-center space-x-6 text-slate-600">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black text-slate-900 tabular-nums leading-none mb-1">{article.engagement?.views?.toLocaleString() || 0}</p>
                                                    <p className="text-xs font-bold uppercase tracking-widest">Views</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black text-slate-900 tabular-nums leading-none mb-1">{article.engagement?.likes?.toLocaleString() || 0}</p>
                                                    <p className="text-xs font-bold uppercase tracking-widest">Likes</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className={`flex items-center space-x-2 ${article.status === 'published' ? 'text-green-600' : 'text-amber-500'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-current ${article.status === 'published' ? 'animate-pulse' : ''}`}></div>
                                                <span className="text-xs font-black uppercase tracking-widest">{article.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center justify-end space-x-2">
                                                <a
                                                    href={`/article/${article.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all group/btn"
                                                    aria-label="View article"
                                                >
                                                    <Eye size={18} />
                                                </a>
                                                <Link
                                                    to={`/admin/articles/edit/${article._id}`}
                                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-600 hover:text-red-700 hover:bg-red-50 transition-all"
                                                    aria-label="Edit article"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article._id)}
                                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-600 hover:text-white hover:bg-slate-950 transition-all"
                                                    aria-label="Delete article"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <AlertCircle size={48} strokeWidth={1} className="mb-4" />
                                            <p className="text-lg font-serif">No intelligence reports found matching your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setPage(p => p - 1)}
                                disabled={pagination.currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 text-slate-600 hover:text-red-700 disabled:opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-red-700"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 text-slate-600 hover:text-red-700 disabled:opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-red-700"
                                aria-label="Next page"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminArticles;

