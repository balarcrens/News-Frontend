import { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
    Users,
    FileText,
    Eye,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowUpRight,
    Settings,
    MessageCircle
} from 'lucide-react';
import LoadingState from '../../components/LoadingState';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/admin/stats');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <LoadingState message="Loading dashboard statistics..." />;

    const cards = [
        { label: 'Total Articles', value: stats.totalArticles, icon: <FileText className="text-accent" />, trend: '+12%', color: '#eff6ff' },
        { label: 'Total Views', value: stats.totalViews, icon: <Eye className="text-accent" />, trend: '+5.4%', color: '#f0fdf4' },
        { label: 'Published', value: stats.publishedArticles, icon: <CheckCircle className="text-accent" />, trend: 'Stable', color: '#fefce8' },
        { label: 'Drafts', value: stats.draftArticles, icon: <AlertCircle className="text-accent" />, trend: '-2', color: '#fef2f2' },
        { label: 'Total Comments', value: stats.totalComments || 0, icon: <MessageCircle className="text-accent" />, trend: 'New', color: '#f5f3ff' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-xl">
                <div>
                    <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
                    <p className="text-muted">Welcome back, here's what's happening today.</p>
                </div>
                <button className="btn btn-primary">Download Report</button>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-lg mb-2xl">
                {cards.map((card, i) => (
                    <div key={i} style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: 'var(--spacing-sm)' }}>{card.label}</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{card.value.toLocaleString()}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'var(--spacing-sm)', fontSize: '0.75rem', color: card.trend.startsWith('+') ? '#22c55e' : '#6b7280' }}>
                                <TrendingUp size={14} /> <span>{card.trend} from last month</span>
                            </div>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-xl">
                {/* Recent Articles */}
                <div style={{ gridColumn: '1 / span 2', backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <div className="flex justify-between items-center mb-lg">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Articles</h3>
                        <button className="text-accent" style={{ fontSize: '0.875rem', fontWeight: '600' }}>View All</button>
                    </div>
                    <div className="flex flex-col gap-md">
                        {stats.recentArticles.map((article) => (
                            <div key={article._id} className="flex justify-between items-center" style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>{article.title}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(article.createdAt).toLocaleDateString()} • {article.status}</p>
                                </div>
                                <ArrowUpRight size={18} className="text-muted" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h3>
                    <div className="flex flex-col gap-sm">
                        <button className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%', gap: 'var(--spacing-sm)' }}>
                            <Clock size={18} /> Draft New Article
                        </button>
                        <button className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%', gap: 'var(--spacing-sm)' }}>
                            <Users size={18} /> Manage Team
                        </button>
                        <button className="btn btn-outline" style={{ justifyContent: 'flex-start', width: '100%', gap: 'var(--spacing-sm)' }}>
                            <Settings size={18} /> Site Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
