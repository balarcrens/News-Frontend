/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
    Plus,
    Settings,
    Trash2,
    Save,
    X,
    TagIcon
} from 'lucide-react';
import LoadingState from '../../components/LoadingState';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: true,
        displayOrder: 0
    });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/categories');
            setCategories(data);
        } catch (err) {
            setError('Failed to load categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = (cat) => {
        setEditingId(cat._id);
        setFormData({
            name: cat.name,
            description: cat.description || '',
            isActive: cat.isActive !== false,
            displayOrder: cat.displayOrder || 0
        });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ name: '', description: '', isActive: true, displayOrder: 0 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/api/categories/${editingId}`, formData);
            } else {
                await api.post('/api/categories', formData);
            }
            handleCancel();
            fetchCategories();
        } catch (err) {
            setError('Save failed.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete category?')) return;
        try {
            await api.delete(`/api/categories/${id}`);
            fetchCategories();
        } catch (err) {
            setError('Delete failed.');
        }
    };

    if (loading) return <LoadingState message="Loading category management..." />;

    return (
        <div className="category-manager">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
                <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Categories</h1>
                {!isAdding && !editingId && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-primary flex items-center gap-sm">
                        <Plus size={18} /> Add Category
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-lg">
                {/* Category List */}
                <div>
                    <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', border: '1px solid var(--color-border)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: 'var(--spacing-md)', fontWeight: '600' }}>Name</th>
                                    <th style={{ padding: 'var(--spacing-md)', fontWeight: '600' }}>Order</th>
                                    <th style={{ padding: 'var(--spacing-md)', fontWeight: '600' }}>Status</th>
                                    <th style={{ padding: 'var(--spacing-md)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 ? (
                                    <tr><td colSpan="4" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>No categories yet.</td></tr>
                                ) : categories.map(cat => (
                                    <tr key={cat._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontWeight: '600' }}>{cat.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{cat.description?.substring(0, 50)}...</div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>{cat.displayOrder}</td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <span style={{
                                                fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px',
                                                backgroundColor: cat.isActive ? '#dcfce7' : '#f3f4f6',
                                                color: cat.isActive ? '#166534' : '#374151'
                                            }}>
                                                {cat.isActive ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <div className="flex justify-end gap-sm" style={{ justifyContent: 'end' }}>
                                                <button onClick={() => handleEdit(cat)} className="icon-btn text-muted"><Settings size={18} /></button>
                                                <button onClick={() => handleDelete(cat._id)} className="icon-btn text-muted"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add/Edit Form */}
                <div>
                    {(isAdding || editingId) ? (
                        <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderTop: `4px solid ${editingId ? 'var(--color-accent)' : '#22c55e'}` }}>
                            <div className="flex justify-between items-center mb-lg">
                                <h3 style={{ fontWeight: 'bold' }}>{editingId ? 'Edit Category' : 'New Category'}</h3>
                                <button onClick={handleCancel} className="icon-btn text-muted"><X size={18} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                                <div className="form-group">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="e.g. Technology"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-input"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Display Order</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    />
                                </div>
                                <label className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    <span style={{ fontSize: '0.875rem' }}>Active and Visible</span>
                                </label>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                                    <Save size={18} /> {editingId ? 'Update' : 'Create'} Category
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: 'white', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', border: '1px dashed var(--color-border)', margin: "0 auto" }}>
                            <TagIcon size={48} className="text-muted" style={{ margin: '0 auto var(--spacing-md)' }} />
                            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Select a category to edit or click the button to create a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
