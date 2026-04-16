/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Eye,
    Heart,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    FileEdit,
    ChevronRight,
    Layers
} from 'lucide-react';
import { adminService } from '../../api/adminService';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';


const StatCard = ({ title, value, icon: Icon, color, trend, link }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(link)} className="bg-white p-8 cursor-pointer rounded-none border border-slate-100 hover:border-red-700 transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 flex items-center justify-center rounded-none transition-all duration-500 ${color} group-hover:bg-red-700 group-hover:text-white`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className="flex items-center text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-2 py-1">
                        <TrendingUp size={12} className="mr-1" />
                        {trend}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2">{title}</p>
                <h3 className="text-4xl font-serif font-black text-slate-900 tracking-tighter">{value}</h3>
            </div>
        </div>
    )
};

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to retrieve system telemetry.');
            } finally {

                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const cards = [
        { title: 'Total Articles', value: stats.totalArticles, icon: FileEdit, color: 'bg-indigo-50 text-indigo-700', trend: 12, link: "articles" },
        { title: 'Global Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'bg-emerald-50 text-emerald-700', trend: 24, link: "articles" },
        { title: 'Engagement (Likes)', value: stats.totalLikes.toLocaleString(), icon: Heart, color: 'bg-red-50 text-red-700', trend: 8, link: "articles" },
        { title: 'Approved Comments', value: stats.totalComments, icon: MessageSquare, color: 'bg-amber-50 text-amber-700', trend: 5, link: "articles" },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <header className="mb-12">
                <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4">Editorial Command Center</p>
                <h1 className="text-5xl md:text-6xl font-black font-serif text-slate-900 tracking-tighter leading-none mb-4">
                    Dashboard
                </h1>
                <p className="text-lg font-serif text-slate-500">System overview for current editorial operations.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {cards.map((card, i) => (
                    <StatCard key={i} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Articles */}
                <div className="lg:col-span-8">
                    <div className="bg-white border border-slate-100 p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">Recent Editorial Intel</h3>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">Last 5 stories published or modified</p>
                            </div>
                            <Link to="/admin/articles" className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
                                Full Article Matrix <ChevronRight size={14} className="ml-1" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-slate-50">
                                    <tr>
                                        <th className="pb-4 text-xs font-bold text-slate-600 uppercase tracking-widest">Headline</th>
                                        <th className="pb-4 text-xs font-bold text-slate-600 uppercase tracking-widest">Status</th>
                                        <th className="pb-4 text-xs font-bold text-slate-600 uppercase tracking-widest text-right">Date Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {stats.recentArticles.map((article) => (
                                        <tr key={article._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 pr-4">
                                                <Link to={`/admin/articles/edit/${article._id}`} className="block">
                                                    <p className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors uppercase tracking-[0.05em] line-clamp-1">{article.title}</p>
                                                    <p className="text-xs text-slate-600 font-medium uppercase mt-1">ID: {article._id.slice(-8)}</p>
                                                </Link>
                                            </td>
                                            <td className="py-6">
                                                <span className={`px-2 py-0.5 text-xs font-black uppercase tracking-widest ${article.status === 'published'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-amber-50 text-amber-700'
                                                    }`}>
                                                    {article.status}
                                                </span>
                                            </td>
                                            <td className="py-6 text-right">
                                                <p className="text-xs font-bold text-slate-900 tabular-nums">
                                                    {format(new Date(article.createdAt), 'MMM dd, yyyy')}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Editorial Health */}
                <div className="lg:col-span-4">
                    <div className="bg-white border border-slate-100 p-8 h-full">
                        <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">Editorial Commands</h3>

                        <div className="space-y-4">
                            <Link to="/admin/articles/new" className="flex items-center justify-between p-6 bg-slate-950 text-white hover:bg-red-700 transition-all duration-500 group">
                                <div className="flex items-center">
                                    <FileEdit size={20} className="mr-4 text-red-500 group-hover:text-white" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest">Report News</p>
                                        <p className="text-xs font-medium text-slate-500 group-hover:text-white/60 uppercase tracking-widest mt-1">Create new article</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} />
                            </Link>

                            <Link to="/admin/categories" className="flex items-center justify-between p-6 border border-slate-100 hover:border-red-700 transition-all duration-500 group">
                                <div className="flex items-center">
                                    <Layers size={20} className="mr-4 text-slate-500 group-hover:text-red-700" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Section Manager</p>
                                        <p className="text-xs font-medium text-slate-600 uppercase tracking-widest mt-1">Manage categories</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} />
                            </Link>

                            <div className="mt-12 pt-8 border-t border-slate-50">
                                <div className="flex items-center mb-6">
                                    <CheckCircle2 size={16} className="text-green-500 mr-2" />
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">System Health: Optimal</span>
                                </div>
                                <div className="p-4 bg-slate-50">
                                    <div className="flex items-center mb-2">
                                        <AlertCircle size={14} className="text-slate-600 mr-2" />
                                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">System Alerts</p>
                                    </div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide leading-relaxed">
                                        All systems are functional. CDN propagation is at 100%. MongoDB response time: 24ms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

