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
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Type,
    Heading as HeadingIcon,
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
        content: [{ type: 'text', value: '' }],
        category: '',
        status: 'draft',
        type: 'news',
        media: {
            featuredImage: '',
            imageAlt: '',
            gallery: [],
            videoUrl: ''
        },
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: [],
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: ''
        },
        customAuthor: {
            name: '',
            bio: '',
            profileImage: ''
        },
        source: {
            name: '',
            url: ''
        },
        isFeatured: false,
        isBreaking: false,
        tags: []
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
                    let content = art.content || [{ type: 'text', value: '' }];
                    if (typeof content === 'string') {
                        content = [{ type: 'text', value: content }];
                    }

                    setFormData(prev => ({
                        ...prev,
                        ...art,
                        content: content,
                        category: art.category?._id || art.category || '',
                        media: { ...prev.media, ...art.media },
                        seo: { ...prev.seo, ...art.seo },
                        customAuthor: { ...prev.customAuthor, ...art.customAuthor },
                        source: { ...prev.source, ...art.source },
                        tags: art.tags?.map(t => t._id || t) || []
                    }));
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

    const addBlock = (type) => {
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, { type, value: '', caption: type === 'image' || type === 'quote' ? '' : undefined }]
        }));
    };

    const removeBlock = (index) => {
        if (formData.content.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index)
        }));
    };

    const moveBlock = (index, direction) => {
        const newContent = [...formData.content];
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= newContent.length) return;
        [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleBlockChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], [field]: value };
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileUpload = async (e, targetField, blockIndex = null) => {
        const file = e.target.files[0];
        if (!file) return;

        // Visual feedback
        setSaving(true);
        setError('');

        try {
            const base64 = await convertToBase64(file);
            const { data } = await api.post('/api/upload', {
                fileData: base64,
                fileName: file.name,
                folder: 'articles'
            });

            if (data.success) {
                if (blockIndex !== null) {
                    handleBlockChange(blockIndex, 'value', data.url);
                } else if (targetField.includes('.')) {
                    const [parent, child] = targetField.split('.');
                    setFormData(prev => ({
                        ...prev,
                        [parent]: { ...prev[parent], [child]: data.url }
                    }));
                } else {
                    setFormData(prev => ({ ...prev, [targetField]: data.url }));
                }
            }
        } catch (err) {
            console.error('Upload failed', err);
            const msg = err.response?.data?.message || 'Image upload failed. Please try again or use a URL.';
            setError(msg);
        } finally {
            setSaving(false);
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
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
                <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <div className="form-group">
                            <label className="form-label">Article Title <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter a catchy headline..."
                                required
                                style={{ fontSize: '1.25rem', fontWeight: '600' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Summary / Excerpt <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className="form-input"
                                rows="3"
                                placeholder="Brief overview of the article..."
                                required
                                style={{ minHeight: '80px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                Article Content Blocks <span style={{ color: 'var(--color-accent)', marginLeft: '4px' }}>*</span>
                            </label>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {formData.content.map((block, index) => (
                                    <div key={index} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)', backgroundColor: '#fafafa', position: 'relative' }}>
                                        <div className="flex items-center justify-between mb-sm pb-xs border-b" style={{ borderColor: 'var(--color-border)' }}>
                                            <div className="flex items-center gap-xs font-bold text-sm text-muted">
                                                {block.type === 'text' && <><Type size={14} /> Paragraph</>}
                                                {block.type === 'heading' && <><HeadingIcon size={14} /> Heading</>}
                                                {block.type === 'image' && <><ImageIcon size={14} /> Image Block</>}
                                            </div>
                                            <div className="flex items-center gap-xs">
                                                <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="icon-btn" style={{ padding: '4px' }}><ArrowUp size={16} /></button>
                                                <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === formData.content.length - 1} className="icon-btn" style={{ padding: '4px' }}><ArrowDown size={16} /></button>
                                                <button type="button" onClick={() => removeBlock(index)} className="icon-btn text-accent" style={{ padding: '4px' }}><Trash2 size={16} /></button>
                                            </div>
                                        </div>

                                        {block.type === 'text' && (
                                            <textarea
                                                className="form-input"
                                                value={block.value}
                                                onChange={(e) => handleBlockChange(index, 'value', e.target.value)}
                                                placeholder="Write your paragraph here..."
                                                style={{ minHeight: '120px', fontSize: '1.1rem' }}
                                                required
                                            />
                                        )}

                                        {block.type === 'heading' && (
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={block.value}
                                                onChange={(e) => handleBlockChange(index, 'value', e.target.value)}
                                                placeholder="Enter section heading..."
                                                style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                                                required
                                            />
                                        )}

                                        {block.type === 'image' && (
                                            <div className="flex flex-col gap-sm">
                                                <div className="flex gap-sm">
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        value={block.value}
                                                        onChange={(e) => handleBlockChange(index, 'value', e.target.value)}
                                                        placeholder="Enter image URL..."
                                                        style={{ flexGrow: 1 }}
                                                    />
                                                    <div className="relative">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileUpload(e, 'content', index)}
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            style={{ position: 'absolute', opacity: 0, width: '40px', height: '100%', cursor: 'pointer' }}
                                                        />
                                                        <button type="button" className="btn btn-outline" style={{ padding: '0.8rem' }} title="Upload Image">
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={block.caption}
                                                    onChange={(e) => handleBlockChange(index, 'caption', e.target.value)}
                                                    placeholder="Optional image caption/credit..."
                                                    style={{ fontSize: '0.85rem' }}
                                                />
                                                {block.value && (
                                                    <img src={block.value} alt="Preview" style={{ maxWidth: '200px', borderRadius: '4px', marginTop: '4px' }} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-sm mt-lg flex-wrap">
                                <button type="button" onClick={() => addBlock('text')} className="btn btn-outline flex items-center gap-xs" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                                    <Plus size={14} /> Add Paragraph
                                </button>
                                <button type="button" onClick={() => addBlock('heading')} className="btn btn-outline flex items-center gap-xs" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                                    <Plus size={14} /> Add Heading
                                </button>
                                <button type="button" onClick={() => addBlock('image')} className="btn btn-outline flex items-center gap-xs" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                                    <Plus size={14} /> Add Image Block
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
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
                        <div className="form-group">
                            <label className="form-label">NexoraNews Primary Link (Canonical)</label>
                            <input
                                type="text"
                                name="seo.canonicalUrl"
                                value={formData.seo.canonicalUrl || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://nexoranews.dpdns.org/..."
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-lg mt-md pt-md border-t">
                            <div className="form-group">
                                <label className="form-label">OG Title (Social)</label>
                                <input
                                    type="text"
                                    name="seo.ogTitle"
                                    value={formData.seo.ogTitle || ''}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">OG Image URL</label>
                                <input
                                    type="text"
                                    name="seo.ogImage"
                                    value={formData.seo.ogImage || ''}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">OG Description</label>
                            <textarea
                                name="seo.ogDescription"
                                value={formData.seo.ogDescription || ''}
                                onChange={handleChange}
                                className="form-input"
                                style={{ minHeight: '60px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
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
                            <label className="form-label">Category <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-input" required>
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
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

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
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
                        <div className="form-group">
                            <label className="form-label">Author Profile Image</label>
                            <div className="flex gap-sm">
                                <input
                                    type="text"
                                    name="customAuthor.profileImage"
                                    value={formData.customAuthor?.profileImage || ''}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="https://..."
                                    style={{ flexGrow: 1 }}
                                />
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'customAuthor.profileImage')}
                                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                                    />
                                    <button type="button" className="btn btn-outline" style={{ height: "100%" }}>Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <Globe size={18} className="text-accent" /> Source Information
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Source Name</label>
                            <input
                                type="text"
                                name="source.name"
                                value={formData.source?.name || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Reuters, BBC, etc."
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Source URL</label>
                            <input
                                type="text"
                                name="source.url"
                                value={formData.source?.url || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <ImageIcon size={18} className="text-accent" /> Featured Image
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Featured Image <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                            <div className="flex gap-sm">
                                <input
                                    type="text"
                                    name="media.featuredImage"
                                    value={formData.media.featuredImage}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="https://images.unsplash.com/..."
                                    style={{ flexGrow: 1 }}
                                />
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'media.featuredImage')}
                                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                                    />
                                    <button type="button" className="btn btn-outline" style={{ height: '100%' }}>
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Image Alt Text (SEO)</label>
                            <input
                                type="text"
                                name="media.imageAlt"
                                value={formData.media.imageAlt || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Descriptive text for the image..."
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
