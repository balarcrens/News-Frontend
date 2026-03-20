import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Globe,
    Loader2,
    AlertTriangle,
    User,
} from 'lucide-react';
import LoadingState from '../../components/LoadingState';

const ArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [loading, setLoading] = useState(isEdit);
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        category: '',
        status: 'draft',
        type: 'news',
        media: { featuredImage: '' },
        seo: { metaTitle: '', metaDescription: '', keywords: [] },
        isFeatured: false,
        isBreaking: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catsRes, articleRes] = await Promise.all([
                    api.get('/api/categories'),
                    isEdit ? api.get(`/api/articles/id/${id}`) : Promise.resolve({ data: null })
                ]);

                setCategories(catsRes.data);
                if (isEdit && articleRes.data) {
                    const art = articleRes.data;
                    setFormData({
                        title: art.title || '',
                        summary: art.summary || '',
                        content: art.content || '',
                        category: art.category?._id || art.category || '',
                        status: art.status || 'draft',
                        type: art.type || 'news',
                        media: art.media || { featuredImage: '' },
                        seo: art.seo || { metaTitle: '', metaDescription: '', keywords: [] },
                        isFeatured: art.isFeatured || false,
                        isBreaking: art.isBreaking || false
                    });
                }
            } catch (err) {
                console.error('Fetch failed', err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            if (isEdit) {
                await api.put(`/api/articles/${id}`, formData);
            } else {
                await api.post('/api/articles', formData);
            }
            navigate('/admin/articles');
        } catch (err) {
            setError(err.response?.data?.message || 'Save failed.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingState message={isEdit ? "Retrieving article data..." : "Preparing editor..."} />;

    return (
        <div className="article-editor">
            <div className="flex items-center justify-between mb-xl">
                <div className="flex items-center gap-md">
                    <button onClick={() => navigate('/admin/articles')} className="icon-btn">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {isEdit ? 'Edit Article' : 'Create Article'}
                    </h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="btn btn-primary flex items-center gap-sm"
                    style={{ padding: '0.75rem 2rem' }}
                >
                    {saving ? <div className="flex items-center gap-xs"><div className="loader-icon-small animate-spin" /><span className="shimmer-text">Saving...</span></div> : <Save size={18} />}
                    Save Article
                </button>
            </div>

            {error && (
                <div style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderRadius: 'var(--radius-md)', backgroundColor: '#fee2e2', color: '#991b1b', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-xl">
                {/* Main Content Area */}
                <div style={{ gridColumn: '1 / span 2', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <div className="form-group">
                            <label className="form-label">Article Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="The headline goes here..."
                                required
                                style={{ fontSize: '1.25rem', fontWeight: '600' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Short Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="A brief overview for snippets..."
                                style={{ minHeight: '80px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Article Body Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Write the full article content here... (HTML supported)"
                                required
                                style={{ minHeight: '400px', fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <Globe size={20} className="text-accent" /> SEO Optimization
                        </h3>
                        <div className="grid md:grid-cols-2 gap-lg">
                            <div className="form-group">
                                <label className="form-label">Meta Title</label>
                                <input
                                    type="text"
                                    name="seo.metaTitle"
                                    value={formData.seo.metaTitle}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Appears in search results"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.seo.keywords.join(', ')}
                                    onChange={(e) => setFormData(p => ({ ...p, seo: { ...p.seo, keywords: e.target.value.split(',').map(k => k.trim()) } }))}
                                    className="form-input"
                                    placeholder="tech, news, review"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Meta Description (160 chars max)</label>
                            <textarea
                                name="seo.metaDescription"
                                value={formData.seo.metaDescription}
                                onChange={handleChange}
                                className="form-input"
                                maxLength="160"
                                style={{ minHeight: '60px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)' }}>Publish Settings</h3>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                                <option value="draft">Draft</option>
                                <option value="pending_review">Pending Review</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Content Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="form-input">
                                <option value="news">News</option>
                                <option value="blog">Blog</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-input" required>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <label className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                                <span style={{ fontSize: '0.875rem' }}>Featured Article</span>
                            </label>
                            <label className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                <input type="checkbox" name="isBreaking" checked={formData.isBreaking} onChange={handleChange} />
                                <span style={{ fontSize: '0.875rem' }}>Breaking News</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <User size={18} className="text-accent" /> Author Details (Manual)
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Author Name</label>
                            <input
                                type="text"
                                name="customAuthor.name"
                                value={formData.customAuthor?.name || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Guest Author Name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Author Bio</label>
                            <textarea
                                name="customAuthor.bio"
                                value={formData.customAuthor?.bio || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Short author biography..."
                                style={{ minHeight: '80px' }}
                            />
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <ImageIcon size={18} className="text-accent" /> Featured Image
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                name="media.featuredImage"
                                value={formData.media.featuredImage}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                        {formData.media.featuredImage && (
                            <div style={{ marginTop: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <img src={formData.media.featuredImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ArticleEditor;
