/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Layers, 
    ChevronRight, 
    Save, 
    X, 
    Settings,
    Eye
} from 'lucide-react';
import { categoryService } from '../../api/categoryService';
import { toast } from 'react-toastify';
import { confirmDestructive } from '../../utils/swal';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        displayOrder: 0,
        isActive: true
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            description: category.description || '',
            displayOrder: category.displayOrder || 0,
            isActive: category.isActive !== undefined ? category.isActive : true
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ name: '', description: '', displayOrder: 0, isActive: true });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingId) {
                await categoryService.updateCategory(editingId, formData);
            } else {
                await categoryService.createCategory(formData);
            }
            handleCancel();
            await fetchCategories();
            toast.success(`Sector ${editingId ? 'refined' : 'annexed'} successfully.`);
        } catch (err) {
            toast.error('Failed to save category section: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await confirmDestructive(
            'Remove Sector',
            'Are you sure you want to remove this news sector? This will not delete articles in it, but may affect site navigation.'
        );
        
        if (result.isConfirmed) {
            try {
                await categoryService.deleteCategory(id);
                toast.success('Sector removed from network protocol.');
                fetchCategories();
            } catch (err) {
                toast.error('Error deleting section: ' + err.message);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-40">
            <header className="mb-12">
                <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4">Content Architecture</p>
                <h1 className="text-5xl md:text-6xl font-black font-serif text-slate-900 tracking-tighter leading-none mb-4">
                    Sector Management
                </h1>
                <p className="text-lg font-serif text-slate-500">Organize and refine the intellectual domains of Nexora News.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Editor / Creator Form */}
                <div className="lg:col-span-4">
                    <div className="bg-white border border-slate-100 p-8 sticky top-32 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">
                                {editingId ? 'Refine Sector' : 'Annex New Sector'}
                            </h2>
                            {editingId && (
                                <button onClick={handleCancel} className="text-slate-600 hover:text-red-700 transition-colors">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2 block">Sector Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border-none px-4 py-3 text-[11px] font-bold text-slate-900 uppercase tracking-widest focus:ring-1 focus:ring-red-100 transition-all outline-none md:p-3"
                                    placeholder="e.g., GLOBAL POLITICS"
                                    value={formData.name}
                                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2 block">System Memo (Description)</label>
                                <textarea 
                                    rows="4"
                                    className="w-full bg-slate-50 border-none p-4 text-[13px] font-medium text-slate-600 focus:ring-1 focus:ring-red-100 transition-all outline-none leading-relaxed"
                                    placeholder="Define the scope of this intelligence sector..."
                                    value={formData.description}
                                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2 block">Display Weight</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-50 border-none px-4 py-3 text-[11px] font-bold text-slate-900 focus:ring-1 focus:ring-red-100 transition-all outline-none"
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData(p => ({ ...p, displayOrder: parseInt(e.target.value) }))}
                                    />
                                </div>
                                <div className="flex flex-col justify-end pb-3">
                                    <label className="flex items-center cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                                            className="w-4 h-4 text-red-700 border-slate-200 rounded focus:ring-red-100"
                                        />
                                        <span className="ml-3 text-[10px] font-black text-slate-900 uppercase tracking-widest group-hover:text-red-700 transition-colors underline decoration-slate-100 underline-offset-4">Active Status</span>
                                    </label>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-red-700 cursor-pointer text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-950 transition-all duration-500 shadow-xl shadow-red-700/10 flex items-center justify-center disabled:opacity-50"
                            >
                                {isSaving ? 'Processing Matrix...' : (editingId ? 'Confirm Refinement' : 'Annex to Network')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Categories List */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-40 bg-white border border-slate-100 animate-pulse"></div>
                            ))
                        ) : categories.map((cat) => (
                            <div key={cat._id} className="bg-white border border-slate-100 p-8 group hover:border-red-700 transition-all duration-500 relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                                        <Layers size={18} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={() => handleEdit(cat)} 
                                            className="p-2 text-slate-500 cursor-pointer hover:text-red-700 hover:bg-red-50 transition-all"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(cat._id)} 
                                            className="p-2 text-slate-500 cursor-pointer hover:text-slate-900 hover:bg-slate-50 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight group-hover:text-red-700 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-600 underline decoration-slate-100 underline-offset-4 mt-2">/{cat.slug}</p>
                                </div>

                                <p className="text-[12px] text-gray-600 font-medium leading-relaxed mb-8 line-clamp-2">
                                    {cat.description || 'No system memo provided for this news sector.'}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-900 leading-none mb-1 tabular-nums">{cat.articleCount || 0}</p>
                                            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Articles</p>
                                        </div>
                                        <div className="w-px h-6 bg-slate-50"></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-900 leading-none mb-1 tabular-nums">{cat.displayOrder}</p>
                                            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Weight</p>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-0.5 text-xs font-black uppercase tracking-[0.2em] ${cat.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {cat.isActive ? 'Online' : 'Offline'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!loading && categories.length === 0 && (
                        <div className="bg-white border border-slate-100 p-20 text-center">
                            <Layers size={48} strokeWidth={1} className="mx-auto mb-6 text-slate-500" />
                            <p className="text-xl font-serif text-slate-600">No content sectors detected.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;

