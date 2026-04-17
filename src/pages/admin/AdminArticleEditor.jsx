/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Save,
    Eye,
    Plus,
    Type,
    Heading,
    Image as ImageIcon,
    Quote,
    Trash2,
    MoveUp,
    MoveDown,
    Loader2,
    CheckCircle2,
    Upload,
    X,
    Layout,
    Globe,
    UserCircle,
    Clock,
    Lock,
    Hash,
    Sparkles,
    RefreshCcw,
    Zap
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { articleService } from '../../api/articleService';
import { categoryService } from '../../api/categoryService';
import { userService } from '../../api/userService';
import { aiService } from '../../api/aiService';
import api from '../../api/axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const AdminInput = ({ label, ...props }) => (
    <div className="space-y-2">
        {label && <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">{label}</label>}
        <div className="bg-white border border-slate-200 px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all group/input">
            <input
                {...props}
                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none placeholder:text-slate-500"
            />
        </div>
    </div>
);

const AdminTextarea = ({ label, ...props }) => (
    <div className="space-y-2">
        {label && <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">{label}</label>}
        <div className="bg-white border border-slate-200 px-4 py-4 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
            <textarea
                {...props}
                className="w-full bg-transparent border-none p-0 text-[13px] font-medium text-slate-600 outline-none placeholder:text-slate-500 resize-none leading-relaxed"
            />
        </div>
    </div>
);

const AdminToggle = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between group cursor-pointer py-2">
        <span className="text-[10px] font-black text-slate-900 tracking-widest group-hover:text-red-700 transition-colors uppercase">
            {label}
        </span>
        <div
            onClick={() => onChange(!checked)}
            className={`relative w-10 h-5 transition-colors duration-300 ${checked ? 'bg-red-700' : 'bg-slate-200'}`}
        >
            <div className={`absolute top-1 left-1 bg-white w-3 h-3 transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
    </label>
);

const BlockWrapper = ({ children, onRemove, onMoveUp, onMoveDown, label }) => (
    <div className="relative group bg-white border border-slate-100 p-8 mb-8 hover:border-red-200 transition-all duration-500 shadow-sm hover:shadow-xl">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white border border-slate-100 p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg">
            <button
                onClick={onMoveUp}
                className="w-10 h-10 flex items-center justify-center hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                aria-label="Move block up"
            >
                <MoveUp size={18} />
            </button>
            <div className="h-4 w-px bg-slate-100 my-1"></div>
            <button
                onClick={onMoveDown}
                className="w-10 h-10 flex items-center justify-center hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                aria-label="Move block down"
            >
                <MoveDown size={18} />
            </button>
        </div>

        <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em]">{label}</span>
            <button
                onClick={onRemove}
                className="w-11 h-11 flex items-center justify-center text-slate-500 hover:text-red-700 hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-700 rounded-lg"
                aria-label="Remove block"
            >
                <Trash2 size={18} />
            </button>
        </div>
        {children}
    </div>
);

const AdminArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(id ? true : false);
    const [categories, setCategories] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState('editorial');
    const [users, setUsers] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [aiHint, setAiHint] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedTitles, setSuggestedTitles] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        summary: '',
        status: 'draft',
        type: 'news',
        isFeatured: false,
        isBreaking: false,
        isVerified: false,
        author: '',
        publishedAt: '',
        media: {
            featuredImage: '',
            imageAlt: '',
            imagePrompt: ''
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
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: [],
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: null
        },
        tags: [],
        content: []
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [cats, allUsers] = await Promise.all([
                    categoryService.getAll(),
                    userService.getUsers()
                ]);
                setCategories(cats);
                setUsers(allUsers);

                if (id) {
                    const article = await articleService.getArticleById(id);
                    setFormData({
                        ...article,
                        category: article.category?._id || article.category,
                        author: article.author?._id || article.author || '',
                        tags: article.tags?.map(t => typeof t === 'object' ? (t.name || t._id) : t) || [],
                        publishedAt: article.publishedAt ? format(new Date(article.publishedAt), "yyyy-MM-dd'T'HH:mm") : ''
                    });
                } else {
                    // Handle query params for new article from AI Topic Discovery
                    const searchParams = new URLSearchParams(location.search);
                    const topicParam = searchParams.get('topic');
                    const categoryParam = searchParams.get('category');
                    const summaryParam = searchParams.get('summary');

                    if (topicParam) {
                        const matchedCat = cats.find(c => c.name.toLowerCase() === categoryParam?.toLowerCase());
                        setFormData(prev => ({
                            ...prev,
                            title: topicParam,
                            summary: summaryParam || '',
                            category: matchedCat?._id || '',
                            slug: topicParam.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                        }));
                    }
                }
            } catch (err) {
                console.error("Error loading editor data:", err);
                toast.error('Failed to load intelligence data: ' + err.message);
            } finally {
                setFetching(false);
            }
        };
        loadInitialData();
    }, [id, location.search]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle nested fields (e.g., customAuthor.name)
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Auto-slug logic
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSEOChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            seo: { ...prev.seo, [name]: value }
        }));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }));
    };

    // --- Block Management ---
    const addBlock = (type) => {
        const newBlock = {
            type,
            value: '',
            id: Date.now() + Math.random(),
            ...(type === 'image' ? { caption: '' } : {})
        };
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, newBlock]
        }));

        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    };

    const updateBlock = (index, value, extraProps = {}) => {
        const newContent = [...formData.content];
        newContent[index] = { ...newContent[index], value, ...extraProps };
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const removeBlock = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const moveBlock = (index, direction) => {
        const newContent = [...formData.content];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newContent.length) return;
        [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    // --- Upload ---
    const handleFileUpload = async (e, type, blockIndex = null) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            try {
                const base64Data = reader.result;
                const { data } = await api.post('/api/upload', {
                    fileData: base64Data,
                    fileName: `article_${Date.now()}_${file.name}`,
                    folder: 'articles'
                });

                if (type === 'featured') {
                    setFormData(prev => ({ ...prev, media: { ...prev.media, featuredImage: data.url } }));
                } else if (type === 'customAuthor') {
                    setFormData(prev => ({ ...prev, customAuthor: { ...prev.customAuthor, profileImage: data.url } }));
                } else if (type === 'block') {
                    updateBlock(blockIndex, data.url);
                }
            } catch (err) {
                toast.error('Upload failed: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
    };

    const handleSuggestTitles = async () => {
        if (!aiHint.trim()) {
            toast.warning('Please provide a hint or context for title suggestions.');
            return;
        }
        setIsSuggesting(true);
        try {
            const data = await aiService.suggestTitles(aiHint);
            setSuggestedTitles(data.suggestions || []);
            toast.success('Generated headline suggestions.');
        } catch (err) {
            toast.error('Failed to suggest titles: ' + err.message);
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleAIGenerate = async () => {
        if (!formData.title && !aiHint) {
            toast.warning('Headline or Hint required for AI intelligence generation.');
            return;
        }

        setIsGenerating(true);
        try {
            const aiData = await aiService.generateArticle(formData.title, aiHint);

            // Map blocks from AI response to editor internal format
            const mappedContent = aiData.content.content.map(item => ({
                id: Math.random() + Date.now(),
                type: item.type === 'paragraph' ? 'text' : 'heading',
                value: item.text,
                ...(item.type === 'heading' ? { level: item.level } : {})
            }));

            // Try to match category ID from category name
            const matchedCat = categories.find(c => c.name.toLowerCase() === aiData.categoryName?.toLowerCase());

            setFormData(prev => ({
                ...prev,
                title: aiData.title || prev.title,
                slug: aiData.slug || prev.slug,
                summary: aiData.summary || prev.summary,
                category: matchedCat?._id || prev.category,
                tags: [...new Set([...prev.tags, ...(aiData.tags || [])])],
                isBreaking: aiData.isBreaking ?? prev.isBreaking,
                isFeatured: aiData.isFeatured ?? prev.isFeatured,
                publishedAt: aiData.publishedAt ? format(new Date(aiData.publishedAt), "yyyy-MM-dd'T'HH:mm") : prev.publishedAt,
                media: {
                    ...prev.media,
                    imageAlt: aiData.media?.imageAlt || prev.media.imageAlt,
                    imagePrompt: aiData.media?.featuredImage || prev.media.imagePrompt,
                },
                content: mappedContent,
                seo: {
                    ...prev.seo,
                    metaTitle: aiData.seo?.metaTitle || aiData.title,
                    metaDescription: (aiData.seo?.metaDescription || aiData.summary)?.substring(0, 160),
                    keywords: aiData.seo?.keywords || aiData.tags || [],
                    canonicalUrl: aiData.seo?.canonicalUrl || prev.seo.canonicalUrl,
                    ogTitle: aiData.seo?.ogTitle || aiData.seo?.metaTitle || aiData.title,
                    ogDescription: (aiData.seo?.ogDescription || aiData.seo?.metaDescription || aiData.summary)?.substring(0, 160),
                    ogImage: aiData.seo?.ogImage || formData?.media?.featuredImage,
                },
                source: {
                    name: aiData.source?.name || '',
                    url: aiData.source?.url || ''
                }
            }));

            toast.success('AI intelligence successfully synthesized.');
        } catch (err) {
            console.error('AI Gen Error:', err);
            toast.error('AI synthesis failed: ' + (err.message || 'Check API key configuration'));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.category) {
            toast.warning('Title and Category are required for intelligence reporting.');
            return;
        }
        setIsSaving(true);
        try {
            if (id) {
                await articleService.updateArticle(id, formData);
            } else {
                await articleService.createArticle(formData);
            }
            toast.success(`Intelligence report ${id ? 'refined' : 'transmitted'} successfully.`);
            navigate('/admin/articles');
        } catch (err) {
            toast.error('Failed to transmit report: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (fetching) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'editorial', name: 'Reporting', icon: Type },
        { id: 'authorship', name: 'Authorship', icon: UserCircle },
        { id: 'internal', name: 'Internal', icon: Lock },
        { id: 'seo', name: 'Search/SEO', icon: Globe },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-40">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 -mx-4 md:-mx-8 px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/articles')}
                        className="p-2 text-slate-600 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-lg"
                        aria-label="Return to articles list"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">
                            {id ? 'Refine Report' : 'New Intelligence Briefing'}
                        </h1>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">
                            {id ? `ID: ${id.slice(-8)}` : 'Initiating standard editorial protocol'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => window.open(id ? `/article/${formData.slug}` : '/', '_blank')}
                        className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900 border border-slate-100 flex items-center focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        aria-label="Preview article"
                    >
                        <Eye size={16} className="mr-2" /> Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-950 transition-all duration-500 shadow-xl shadow-red-700/10 flex items-center disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        aria-label={id ? 'Update report' : 'Transmit report'}
                    >
                        {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                        {id ? 'Update' : 'Transmit'}
                    </button>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-100 mb-12 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative border-r border-slate-50 last:border-r-0 focus:outline-none focus:ring-2 focus:ring-red-700 focus:z-10 ${activeTab === tab.id ? 'text-red-700 bg-slate-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/30'}`}
                        aria-pressed={activeTab === tab.id}
                        aria-label={`Show ${tab.name} section`}
                    >
                        <tab.icon size={14} className="mr-3" />
                        {tab.name}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700"></div>}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    {activeTab === 'editorial' && (
                        <div className="space-y-12 animate-in fade-in duration-500">
                            {/* AI Intelligence Assistance */}
                            <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap size={80} className="text-red-400" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <Sparkles size={16} className="text-red-700" />
                                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">AI Intelligence Command</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <textarea
                                            rows="2"
                                            className="w-full bg-slate-950 border border-slate-800 p-4 text-[12px] font-medium text-slate-300 focus:border-red-700 outline-none transition-all placeholder:text-slate-400"
                                            placeholder="Provide context, specific instructions, or a hint for the AI (e.g., 'Focus on today's GST council meeting in Delhi'...)"
                                            value={aiHint}
                                            onChange={(e) => setAiHint(e.target.value)}
                                        ></textarea>

                                        <div className="flex flex-wrap gap-4">
                                            <button
                                                onClick={handleSuggestTitles}
                                                disabled={isSuggesting || !aiHint}
                                                className="flex items-center px-6 py-3 bg-white text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all disabled:opacity-30"
                                            >
                                                {isSuggesting ? <Loader2 size={12} className="mr-2 animate-spin" /> : <Plus size={12} className="mr-2" />}
                                                Suggest Headlines
                                            </button>

                                            <button
                                                onClick={handleAIGenerate}
                                                disabled={isGenerating || (!formData.title && !aiHint)}
                                                className="flex items-center px-6 py-3 bg-red-700 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all disabled:opacity-30"
                                            >
                                                {isGenerating ? <Loader2 size={12} className="mr-2 animate-spin" /> : <Zap size={12} className="mr-2" />}
                                                Synthesize Full Article
                                            </button>
                                        </div>

                                        {suggestedTitles.length > 0 && (
                                            <div className="mt-8 pt-6 border-t border-slate-800 animate-in fade-in slide-in-from-top-2">
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Draft Headline:</p>
                                                <div className="space-y-2">
                                                    {suggestedTitles.map((item, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, title: item.title, slug: item.slug_hint }));
                                                                setSuggestedTitles([]);
                                                            }}
                                                            className="w-full text-left p-3 bg-slate-950 border border-slate-800 hover:border-red-700 text-[11px] text-slate-300 hover:text-white transition-all flex items-center group/item"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-red-700 mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                                            {item.title}
                                                            <span className="ml-auto text-xs opacity-40 italic">{item.angle}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div className="flex-1">
                                        <label className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4 block">Headline Presentation</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Enter report headline..."
                                            className="w-full text-2xl font-serif font-black text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-300 outline-none"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <AdminTextarea
                                    label="Executive Summary"
                                    name="summary"
                                    rows="4"
                                    placeholder="Brief overview for the central intelligence network..."
                                    value={formData.summary}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="editorial-canvas">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <h2 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">Briefing Flow</h2>
                                    <div className="h-px bg-slate-100 flex-1 mx-6"></div>
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{formData.content.length} Blocks Recorded</span>
                                </div>

                                {formData.content.length === 0 ? (
                                    <div className="bg-slate-50 border border-dashed border-slate-200 p-20 text-center mb-8">
                                        <Layout size={48} strokeWidth={1} className="mx-auto mb-6 text-slate-500" />
                                        <p className="text-lg font-serif text-slate-600 mb-2">Editorial canvas empty.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {formData.content.map((block, index) => (
                                            <BlockWrapper
                                                key={block.id}
                                                label={block.type === 'text' ? 'Paragraph' : block.type === 'heading' ? 'Subtitle' : block.type}
                                                onRemove={() => removeBlock(index)}
                                                onMoveUp={() => moveBlock(index, -1)}
                                                onMoveDown={() => moveBlock(index, 1)}
                                            >
                                                {block.type === 'text' && (
                                                    <textarea
                                                        rows="5"
                                                        className="w-full text-lg font-serif text-slate-700 leading-9 md:leading-10 border-none p-0 focus:ring-0 placeholder:text-slate-100 resize-none outline-none"
                                                        placeholder="Report details..."
                                                        value={block.value}
                                                        onChange={(e) => updateBlock(index, e.target.value)}
                                                    ></textarea>
                                                )}
                                                {block.type === 'heading' && (
                                                    <input
                                                        type="text"
                                                        className="w-full text-2xl font-black font-serif text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-100 outline-none"
                                                        placeholder="Section subtitle..."
                                                        value={block.value}
                                                        onChange={(e) => updateBlock(index, e.target.value)}
                                                    />
                                                )}
                                                {block.type === 'image' && (
                                                    <div className="space-y-6">
                                                        <div className="aspect-video bg-slate-50 border border-slate-100 flex items-center justify-center relative group/img overflow-hidden">
                                                            {block.value ? (
                                                                <>
                                                                    <img src={block.value} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" alt="" />
                                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <label className="bg-white text-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-red-700 hover:text-white transition-all">
                                                                            Replace
                                                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'block', index)} />
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="flex flex-col items-center cursor-pointer text-slate-600 hover:text-red-700 transition-colors">
                                                                    <Upload size={32} strokeWidth={1.5} className="mb-4" />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">Select Visual Intel</span>
                                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'block', index)} />
                                                                </label>
                                                            )}
                                                        </div>
                                                        <div className="bg-white border border-slate-200 px-4 py-3 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                                            <input
                                                                type="text"
                                                                placeholder="Add caption / Source..."
                                                                className="w-full bg-transparent border-none text-[10px] font-medium text-slate-500 text-center tracking-wider outline-none"
                                                                value={block.caption}
                                                                onChange={(e) => updateBlock(index, block.value, { caption: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {block.type === 'quote' && (
                                                    <div className="border-l-4 border-red-700 pl-8 relative">
                                                        <span className="absolute -left-3 -top-10 text-8xl text-red-700/5 font-serif leading-none select-none">“</span>
                                                        <textarea
                                                            rows="2"
                                                            className="w-full text-3xl font-black font-serif text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-100 leading-tight resize-none outline-none"
                                                            placeholder="Pull quote..."
                                                            value={block.value}
                                                            onChange={(e) => updateBlock(index, e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                )}
                                            </BlockWrapper>
                                        ))}
                                    </div>
                                )}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 bg-white border border-slate-100 p-2">
                                    <button onClick={() => addBlock('heading')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-red-700 focus:z-10" aria-label="Add subtitle block"><Heading className="text-slate-500 group-hover:text-red-700 mb-3" size={20} /><span className="text-xs font-black uppercase tracking-widest">Subtitle</span></button>
                                    <button onClick={() => addBlock('text')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-red-700 focus:z-10" aria-label="Add paragraph block"><Type className="text-slate-500 group-hover:text-red-700 mb-3" size={20} /><span className="text-xs font-black uppercase tracking-widest">Paragraph</span></button>
                                    <button onClick={() => addBlock('image')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-red-700 focus:z-10" aria-label="Add media block"><ImageIcon className="text-slate-500 group-hover:text-red-700 mb-3" size={20} /><span className="text-xs font-black uppercase tracking-widest">Media</span></button>
                                    <button onClick={() => addBlock('quote')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-red-700 focus:z-10" aria-label="Add quote block"><Quote className="text-slate-500 group-hover:text-red-700 mb-3" size={20} /><span className="text-xs font-black uppercase tracking-widest">Quote</span></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'authorship' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">Guest Reporting Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                    <div className="md:col-span-4">
                                        <div className="aspect-square bg-slate-50 border border-slate-100 relative group overflow-hidden">
                                            {formData.customAuthor.profileImage ? (
                                                <img src={formData.customAuthor.profileImage} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                    <UserCircle size={48} strokeWidth={1} />
                                                </div>
                                            )}
                                            <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                                                <Upload size={20} className="mb-2" />
                                                <span className="text-xs font-black uppercase tracking-widest">Update Photo</span>
                                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'customAuthor')} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:col-span-8 space-y-6">
                                        <AdminInput
                                            label="Public Display Name"
                                            name="customAuthor.name"
                                            value={formData.customAuthor.name}
                                            onChange={handleInputChange}
                                            placeholder="Guest Reporter Identity"
                                        />
                                        <AdminTextarea
                                            label="Short Intelligence Bio"
                                            name="customAuthor.bio"
                                            rows="3"
                                            value={formData.customAuthor.bio}
                                            onChange={handleInputChange}
                                            placeholder="Reporting background and credentials..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">External Intel Source</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <AdminInput
                                        label="Source Identity"
                                        name="source.name"
                                        value={formData.source.name}
                                        onChange={handleInputChange}
                                    />
                                    <AdminInput
                                        label="Canonical Source URL"
                                        name="source.url"
                                        value={formData.source.url}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'internal' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">Transmission Protocols</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className='flex justify-between'>
                                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Publication Sector</label>
                                            <RefreshCcw size={12} className="text-slate-600 cursor-pointer" onClick={() => categoryService.getAll().then(setCategories)} />
                                        </div>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                            <select
                                                name="category"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Level...</option>
                                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Status Protocol</label>
                                        <div className="bg-white border border-slate-200 px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                            <select
                                                name="status"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="pending_review">Pending Review</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="published">Published</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Manual Date Override</label>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all flex items-center">
                                            <Clock size={16} className="text-slate-500 mr-3" />
                                            <input
                                                type="datetime-local"
                                                name="publishedAt"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                                value={formData.publishedAt}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <AdminToggle label="Featured intel" checked={formData.isFeatured} onChange={(v) => setFormData(p => ({ ...p, isFeatured: v }))} />
                                    <AdminToggle label="Breaking Bulletin" checked={formData.isBreaking} onChange={(v) => setFormData(p => ({ ...p, isBreaking: v }))} />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-4">Indexing Tags</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Type a concept and press Enter to bubble-wrap the tag.</p>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all flex items-center">
                                        <Hash size={16} className="text-slate-500 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="Add intel markers..."
                                            className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagKeyDown}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, idx) => (
                                            <span key={idx} className="flex items-center px-3 py-1.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest group">
                                                {typeof tag === 'object' ? tag.name : tag}
                                                <button
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-2 hover:text-red-500 transition-colors focus:outline-none focus:text-red-500"
                                                    aria-label={`Remove tag ${typeof tag === 'object' ? tag.name : tag}`}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">Search Optimization (SEO)</h3>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Meta Headline</label>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${formData.seo.metaTitle.length > 60 ? 'text-red-700' : 'text-slate-500'}`}>
                                                {formData.seo.metaTitle.length} / 60
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                            <input
                                                type="text"
                                                name="metaTitle"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none"
                                                value={formData.seo.metaTitle}
                                                onChange={handleSEOChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] block">Meta Briefing (Description)</label>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${formData.seo.metaDescription.length > 160 ? 'text-red-700' : 'text-slate-500'}`}>
                                                {formData.seo.metaDescription.length} / 160
                                            </span>
                                        </div>
                                        <AdminTextarea
                                            name="metaDescription"
                                            rows="4"
                                            value={formData.seo.metaDescription}
                                            onChange={handleSEOChange}
                                        />
                                    </div>
                                    <AdminInput
                                        label="Canonical Intel URL"
                                        name="canonicalUrl"
                                        value={formData.seo.canonicalUrl}
                                        onChange={handleSEOChange}
                                    />
                                </div>
                            </div>

                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight mb-8">Social Graph (OG)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <AdminInput label="OG Headline" name="ogTitle" value={formData.seo.ogTitle} onChange={handleSEOChange} />
                                    <AdminInput label="OG Visual Assets (URL)" name="ogImage" value={formData.seo.ogImage} onChange={handleSEOChange} />
                                    <div className="md:col-span-2">
                                        <AdminTextarea label="OG Briefing" name="ogDescription" value={formData.seo.ogDescription} onChange={handleSEOChange} rows="3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info Pane */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Featured Visual */}
                    <div className="bg-white border border-slate-100 p-8 shadow-sm">
                        <label className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-6 block">Transmission Cover</label>
                        <div className="aspect-[16/10] bg-slate-50 border border-slate-100 flex items-center justify-center relative group overflow-hidden mb-6">
                            {formData.media.featuredImage ? (
                                <>
                                    <img src={formData.media.featuredImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                                    <button
                                        onClick={() => setFormData(p => ({ ...p, media: { ...p.media, featuredImage: '' } }))}
                                        className="absolute top-4 right-4 p-2 bg-slate-950/40 text-white hover:bg-red-700 transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                                        aria-label="Remove featured image"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center cursor-pointer text-slate-600 hover:text-red-700 transition-colors">
                                    <Upload size={40} strokeWidth={1} className="mb-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-center px-6">Transmit Visual Asset</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'featured')} />
                                </label>
                            )}
                        </div>
                        <AdminInput label="Visual Alt Signature" value={formData.media.imageAlt} onChange={(e) => setFormData(p => ({ ...p, media: { ...p.media, imageAlt: e.target.value } }))} />

                        {formData.media.imagePrompt && (
                            <div className="mt-6 p-5 bg-slate-50 border-l-2 border-red-700 animate-in slide-in-from-left-2 duration-700">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Sparkles size={12} className="text-red-700" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Suggested Visual Protocol</span>
                                </div>
                                <p className="text-[10px] text-slate-600 leading-relaxed font-serif">
                                    "{formData.media.imagePrompt}"
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border border-slate-100 p-8 shadow-sm">
                        <label className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-8 block">Control Protocol</label>
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 block">Network Broadcast Type</label>
                                <div className="grid grid-cols-2 bg-slate-50 p-1">
                                    <button onClick={() => setFormData(p => ({ ...p, type: 'news' }))} className={`py-2 text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'news' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600'}`}>News Intel</button>
                                    <button onClick={() => setFormData(p => ({ ...p, type: 'blog' }))} className={`py-2 text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'blog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600'}`}>Opinion Blog</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <Loader2 size={40} className="animate-spin text-red-700 mb-6" />
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Processing Transmissions...</p>
                </div>
            )}
        </div>
    );
};

export default AdminArticleEditor;

