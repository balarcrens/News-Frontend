/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    ExternalLink,
    Eye
} from 'lucide-react';
import LoadingState from '../../components/LoadingState';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/articles');
            setArticles(data || []);
        } catch (error) {
            console.error('Failed to fetch articles', error);
            setMessage({ type: 'error', text: 'Could not load articles.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/api/articles/${id}`);
            setMessage({ type: 'success', text: 'Article deleted.' });
            fetchArticles();
        } catch (_) {
            setMessage({ type: 'error', text: 'Delete failed.' });
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';
        try {
            await api.put(`/api/articles/${id}`, { status: newStatus, publishedAt: newStatus === 'published' ? new Date() : null });
            fetchArticles();
        } catch (_) {
            setMessage({ type: 'error', text: 'Update failed.' });
        }
    };

    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="articles-list-page">
            <div className="flex justify-between items-center mb-xl">
                <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Manage Articles</h1>
                <Link to="/admin/articles/create" className="btn btn-primary flex items-center gap-sm">
                    <Plus size={18} /> New Article
                </Link>
            </div>

            {message.text && (
                <div style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', backgroundColor: message.type === 'error' ? '#fee2e2' : '#f0fdf4', color: message.type === 'error' ? '#991b1b' : '#166534' }}>
                    {message.text}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-md mb-lg" style={{ backgroundColor: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div className="flex-grow flex items-center gap-sm px-sm" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    <Search size={18} className="text-muted" style={{ margin: "0 10px" }} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="form-input"
                        style={{ border: 'none', boxShadow: 'none' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-sm">
                    <Filter size={18} className="text-muted" />
                    <select
                        className="form-input"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending_review">Pending Review</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', border: '1px solid var(--color-border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', fontSize: '0.875rem' }}>Title</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', fontSize: '0.875rem' }}>Category</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', fontSize: '0.875rem' }}>Engagement</th>
                            <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: 'var(--spacing-3xl) 0' }}><LoadingState message="Fetching article archive..." fullPage={false} /></td></tr>
                        ) : filteredArticles.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>No articles found.</td></tr>
                        ) : filteredArticles.map(article => (
                            <tr key={article._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{article.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(article.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#f3f4f6', color: '#374151' }}>
                                        {article.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '4px 10px',
                                        borderRadius: 'var(--radius-sm)',
                                        fontWeight: 'bold',
                                        backgroundColor: article.status === 'published' ? '#dcfce7' : '#fef9c3',
                                        color: article.status === 'published' ? '#166534' : '#854d0e'
                                    }}>
                                        {article.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', fontSize: '0.875rem' }}>
                                    <div className="flex items-center gap-sm"><Eye size={14} /> {article.engagement?.views || 0}</div>
                                </td>
                                <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                    <div className="flex items-center gap-sm" style={{ justifyContent: 'end' }}>
                                        <button onClick={() => handleToggleStatus(article._id, article.status)} className="icon-btn" title={article.status === 'published' ? 'Unpublish' : 'Publish'}>
                                            {article.status === 'published' ? <XCircle size={18} style={{ color: '#ef4444' }} /> : <CheckCircle size={18} style={{ color: '#22c55e' }} />}
                                        </button>
                                        <button onClick={() => navigate(`/admin/articles/edit/${article._id}`)} className="icon-btn text-muted" title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <a href={`/article/${article.slug}`} target="_blank" rel="noreferrer" className="icon-btn text-muted" title="View Public">
                                            <ExternalLink size={18} />
                                        </a>
                                        <button onClick={() => handleDelete(article._id)} className="icon-btn text-muted" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArticlesList;
