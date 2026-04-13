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
    Hash
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleService } from '../../api/articleService';
import { categoryService } from '../../api/categoryService';
import { userService } from '../../api/userService';
import api from '../../api/axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const AdminInput = ({ label, ...props }) => (
    <div className="space-y-2">
        {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">{label}</label>}
        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all group/input">
            <input 
                {...props} 
                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none placeholder:text-slate-200"
            />
        </div>
    </div>
);

const AdminTextarea = ({ label, ...props }) => (
    <div className="space-y-2">
        {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">{label}</label>}
        <div className="bg-slate-50 border-none px-4 py-4 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
            <textarea 
                {...props} 
                className="w-full bg-transparent border-none p-0 text-[13px] font-medium text-slate-600 outline-none placeholder:text-slate-200 resize-none leading-relaxed"
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
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white border border-slate-100 p-1 opacity-0 group-hover:opacity-100 transition-all z-10">
            <button onClick={onMoveUp} className="p-1.5 hover:text-red-700 transition-colors"><MoveUp size={14} /></button>
            <div className="h-4 w-px bg-slate-100 my-1"></div>
            <button onClick={onMoveDown} className="p-1.5 hover:text-red-700 transition-colors"><MoveDown size={14} /></button>
        </div>
        
        <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em]">{label}</span>
            <button 
                onClick={onRemove}
                className="p-2 text-slate-300 hover:text-red-700 hover:bg-red-50 transition-all"
            >
                <Trash2 size={16} />
            </button>
        </div>
        {children}
    </div>
);

const AdminArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(id ? true : false);
    const [categories, setCategories] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('editorial');
    const [slugLocked, setSlugLocked] = useState(id ? true : false);
    const [users, setUsers] = useState([]);
    const [tagInput, setTagInput] = useState('');

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
            imageAlt: ''
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
            ogImage: ''
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
                        publishedAt: article.publishedAt ? format(new Date(article.publishedAt), "yyyy-MM-dd'T'HH:mm") : ''
                    });
                }
            } catch (err) {
                console.error("Error loading editor data:", err);
                toast.error('Failed to load intelligence data: ' + err.message);
            } finally {
                setFetching(false);
            }
        };
        loadInitialData();
    }, [id]);

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
        if (name === 'title' && !slugLocked) {
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

    // --- Tag Cloud Logic ---
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
                    <button onClick={() => navigate('/admin/articles')} className="p-2 text-slate-400 hover:text-red-700 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight">
                            {id ? 'Refine Report' : 'New Intelligence Briefing'}
                        </h1>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {id ? `ID: ${id.slice(-8)}` : 'Initiating standard editorial protocol'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <button onClick={() => window.open(id ? `/article/${formData.slug}` : '/', '_blank')} className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 border border-slate-100 flex items-center">
                        <Eye size={16} className="mr-2" /> Preview
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="px-8 py-3 bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-950 transition-all duration-500 shadow-xl shadow-red-700/10 flex items-center disabled:opacity-50">
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
                        className={`flex items-center px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative border-r border-slate-50 last:border-r-0 ${activeTab === tab.id ? 'text-red-700 bg-slate-50/50' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50/30'}`}
                    >
                        <tab.icon size={14} className="mr-3" />
                        {tab.name}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700"></div>}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Pane */}
                <div className="lg:col-span-8">
                    {activeTab === 'editorial' && (
                        <div className="space-y-12 animate-in fade-in duration-500">
                            {/* Title & Summary */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <div className="mb-10">
                                    <label className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4 block">Headline Presentation</label>
                                    <input 
                                        type="text"
                                        name="title"
                                        placeholder="Enter report headline..."
                                        className="w-full text-4xl font-serif italic font-black text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-100 outline-none"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
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

                            {/* Blocks Editor */}
                            <div className="editorial-canvas">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <h2 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight">Briefing Flow</h2>
                                    <div className="h-px bg-slate-100 flex-1 mx-6"></div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formData.content.length} Blocks Recorded</span>
                                </div>

                                {formData.content.length === 0 ? (
                                    <div className="bg-slate-50 border border-dashed border-slate-200 p-20 text-center mb-8">
                                        <Layout size={48} strokeWidth={1} className="mx-auto mb-6 text-slate-300" />
                                        <p className="text-lg font-serif italic text-slate-400 mb-2">Editorial canvas empty.</p>
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
                                                        className="w-full text-2xl font-black font-serif italic text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-100 outline-none"
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
                                                                        <label className="bg-white text-slate-900 px-6 py-3 text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-red-700 hover:text-white transition-all">
                                                                            Replace
                                                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'block', index)} />
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="flex flex-col items-center cursor-pointer text-slate-400 hover:text-red-700 transition-colors">
                                                                    <Upload size={32} strokeWidth={1.5} className="mb-4" />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">Select Visual Intel</span>
                                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'block', index)} />
                                                                </label>
                                                            )}
                                                        </div>
                                                        <div className="bg-slate-50 border-none px-4 py-3 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                                            <input 
                                                                type="text"
                                                                placeholder="Add caption / Source..."
                                                                className="w-full bg-transparent border-none text-[10px] italic font-medium text-slate-500 text-center tracking-wider outline-none"
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
                                                            className="w-full text-3xl font-black font-serif italic text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-100 leading-tight resize-none outline-none"
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
                                    <button onClick={() => addBlock('heading')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group"><Heading className="text-slate-300 group-hover:text-red-700 mb-3" size={20} /><span className="text-[9px] font-black uppercase tracking-widest">Subtitle</span></button>
                                    <button onClick={() => addBlock('text')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group"><Type className="text-slate-300 group-hover:text-red-700 mb-3" size={20} /><span className="text-[9px] font-black uppercase tracking-widest">Paragraph</span></button>
                                    <button onClick={() => addBlock('image')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group"><ImageIcon className="text-slate-300 group-hover:text-red-700 mb-3" size={20} /><span className="text-[9px] font-black uppercase tracking-widest">Media</span></button>
                                    <button onClick={() => addBlock('quote')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 group"><Quote className="text-slate-300 group-hover:text-red-700 mb-3" size={20} /><span className="text-[9px] font-black uppercase tracking-widest">Quote</span></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'authorship' && (
                        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
                            {/* System Author */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">Internal Verification</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">System Personnel (Author)</label>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                            <select 
                                                name="author"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                                value={formData.author}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Personnel...</option>
                                                {users.map(u => (
                                                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <AdminToggle 
                                        label="Verified Intelligence Seal"
                                        checked={formData.isVerified}
                                        onChange={(val) => setFormData(p => ({ ...p, isVerified: val }))}
                                    />
                                </div>
                            </div>

                            {/* Custom Author */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">Guest Reporting Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                    <div className="md:col-span-4">
                                        <div className="aspect-square bg-slate-50 border border-slate-100 relative group overflow-hidden">
                                            {formData.customAuthor.profileImage ? (
                                                <img src={formData.customAuthor.profileImage} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                    <UserCircle size={48} strokeWidth={1} />
                                                </div>
                                            )}
                                            <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                                                <Upload size={20} className="mb-2" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Update Photo</span>
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

                            {/* Source */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">External Intel Source</h3>
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
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">Transmission Protocols</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Publication Sector</label>
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
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Status Protocol</label>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all">
                                            <select 
                                                name="status"
                                                className="w-full bg-transparent border-none p-0 text-[12px] font-bold text-slate-900 outline-none uppercase tracking-widest"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="draft">Internal Draft</option>
                                                <option value="published">Final Broadcast</option>
                                                <option value="pending_review">Sent for Review</option>
                                                <option value="archived">Secure Archive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Manual Date Override</label>
                                        <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all flex items-center">
                                            <Clock size={16} className="text-slate-300 mr-3" />
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
                                    <AdminToggle label="Featured intel" checked={formData.isFeatured} onChange={(v) => setFormData(p => ({...p, isFeatured: v}))} />
                                    <AdminToggle label="Breaking Bulletin" checked={formData.isBreaking} onChange={(v) => setFormData(p => ({...p, isBreaking: v}))} />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-sm">
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-4">Indexing Tags</h3>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-8 italic">Type a concept and press Enter to bubble-wrap the tag.</p>
                                
                                <div className="space-y-6">
                                    <div className="bg-slate-50 border-none px-4 py-3.5 focus-within:ring-1 focus-within:ring-red-700/20 transition-all flex items-center">
                                        <Hash size={16} className="text-slate-300 mr-3" />
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
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="flex items-center px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest group">
                                                {tag}
                                                <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500 transition-colors">
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
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">Search Optimization (SEO)</h3>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Meta Headline</label>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${formData.seo.metaTitle.length > 60 ? 'text-red-700' : 'text-slate-300'}`}>
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
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Meta Briefing (Description)</label>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${formData.seo.metaDescription.length > 160 ? 'text-red-700' : 'text-slate-300'}`}>
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
                                <h3 className="text-xl font-black font-serif italic text-slate-900 uppercase tracking-tight mb-8">Social Graph (OG)</h3>
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
                                    <button onClick={() => setFormData(p => ({ ...p, media: { ...p.media, featuredImage: '' } }))} className="absolute top-4 right-4 p-2 bg-slate-950/40 text-white hover:bg-red-700 transition-all rounded-full"><X size={14} /></button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center cursor-pointer text-slate-400 hover:text-red-700 transition-colors">
                                    <Upload size={40} strokeWidth={1} className="mb-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-center px-6">Transmit Visual Asset</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'featured')} />
                                </label>
                            )}
                        </div>
                        <AdminInput label="Visual Alt Signature" value={formData.media.imageAlt} onChange={(e) => setFormData(p => ({...p, media: {...p.media, imageAlt: e.target.value}}))} />
                    </div>

                    {/* Meta Controls */}
                    <div className="bg-white border border-slate-100 p-8 shadow-sm">
                        <label className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-8 block">Control Protocol</label>
                        <div className="space-y-6">
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Network Broadcast Type</label>
                                <div className="grid grid-cols-2 bg-slate-50 p-1">
                                    <button onClick={() => setFormData(p => ({...p, type: 'news'}))} className={`py-2 text-[9px] font-black uppercase tracking-widest transition-all ${formData.type === 'news' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>News Intel</button>
                                    <button onClick={() => setFormData(p => ({...p, type: 'blog'}))} className={`py-2 text-[9px] font-black uppercase tracking-widest transition-all ${formData.type === 'blog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Opinion Blog</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pre-broadcast Checklist */}
                    <div className="p-8 bg-slate-950 text-white">
                        <div className="flex items-center mb-6">
                            <CheckCircle2 size={16} className="text-red-700 mr-3" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Integrity Check</h4>
                        </div>
                        <ul className="space-y-4">
                            <li className={`flex items-center text-[9px] font-bold uppercase tracking-widest ${formData.title ? 'text-white' : 'text-white/30'}`}>
                                <Plus size={12} className="mr-3" /> Headline Locked
                            </li>
                            <li className={`flex items-center text-[9px] font-bold uppercase tracking-widest ${formData.category ? 'text-white' : 'text-white/30'}`}>
                                <Plus size={12} className="mr-3" /> Sector Assigned
                            </li>
                            <li className={`flex items-center text-[9px] font-bold uppercase tracking-widest ${formData.author ? 'text-white' : 'text-white/30'}`}>
                                <Plus size={12} className="mr-3" /> Personnel Assigned
                            </li>
                            <li className={`flex items-center text-[9px] font-bold uppercase tracking-widest ${formData.media.featuredImage ? 'text-white' : 'text-white/30'}`}>
                                <Plus size={12} className="mr-3" /> Visual Asset Secure
                            </li>
                        </ul>
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
