import { Menu, Search, User, LogIn, LogOut, LayoutDashboard, X, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/api/categories');
                // Only show active categories and sort by displayOrder
                const activeCategories = data
                    .filter(cat => cat.isActive !== false)
                    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                setCategories(activeCategories);
            } catch (err) {
                console.error('Failed to fetch categories for navbar', err);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {!isSearchOpen ? (
                        <>
                            <div className="flex items-center gap-md">
                                <button className="icon-btn mobile-menu-btn mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                                <Link to="/" className="navbar-brand text-gradient">NexoraNews</Link>
                            </div>

                            <div className="navbar-links" style={{ color: 'var(--color-black)' }} >
                                <Link to="/" className="navbar-link">Home</Link>

                                {/* Categories Dropdown */}
                                <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                                    <span className="navbar-link">
                                        Categories
                                        <ChevronLeft size={14} style={{ transform: 'rotate(-90deg)', marginTop: '2px' }} />
                                    </span>
                                    <div className="dropdown-content">
                                        {categories.length > 0 ? (
                                            categories.map(cat => (
                                                <Link
                                                    key={cat._id}
                                                    to={`/category/${cat.slug}`}
                                                    className="dropdown-item"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="dropdown-item text-muted">No categories</div>
                                        )}
                                    </div>
                                </div>

                                <Link to="/contact" className="navbar-link">Contact</Link>
                                <Link to="/about" className="navbar-link">About</Link>
                            </div>

                            <div className="navbar-actions">
                                <div className="desktop-only items-center">
                                    <LanguageSelector />
                                </div>
                                <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}><Search size={20} /></button>

                                <div className="desktop-only items-center gap-md">
                                    {isAdmin && (
                                        <Link to="/admin" className="icon-btn" title="Admin Dashboard">
                                            <LayoutDashboard size={20} />
                                        </Link>
                                    )}

                                    {user ? (
                                        <div className="flex items-center gap-sm">
                                            <span className="text-sm font-bold">{user.name}</span>
                                            <button onClick={logout} className="icon-btn" title="Logout">
                                                <LogOut size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Link to="/login" className="icon-btn" title="Login"><LogIn size={20} /></Link>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSearch} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{ position: 'relative', flexGrow: 1 }}>
                                <Search
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-primary)',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search stories, topics, and more..."
                                    className="navbar-search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        color: 'var(--color-primary)',
                                        background: '#fff',
                                        border: '1px solid var(--color-border)',
                                        padding: '0.6rem 1rem 0.6rem 2.8rem',
                                        borderRadius: 'var(--radius-full)',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)' }}>Search</button>
                            <button type="button" className="icon-btn" onClick={() => setIsSearchOpen(false)}><X size={24} /></button>
                        </form>
                    )}

                    {isMobileMenuOpen && !isSearchOpen && (
                        <div className="mobile-nav-panel">
                            <div>
                                <LanguageSelector />
                            </div>

                            <Link to="/" className="navbar-link" style={{ color: 'var(--color-white)', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                            <div className="mobile-categories-section" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <button
                                    className="navbar-link"
                                    style={{
                                        color: 'var(--color-white)',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 'var(--spacing-sm) 0',
                                        background: 'none',
                                        border: 'none'
                                    }}
                                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                                >
                                    <span>Categories</span>
                                    <ChevronLeft
                                        size={18}
                                        style={{
                                            transform: isMobileCategoriesOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    />
                                </button>

                                <div style={{
                                    maxHeight: isMobileCategoriesOpen ? '500px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease-out',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingLeft: '1rem',
                                    background: 'rgba(255,255,255,0.03)'
                                }}>
                                    {categories.map(cat => (
                                        <Link
                                            key={`mobile-${cat._id}`}
                                            to={`/category/${cat.slug}`}
                                            className="navbar-link"
                                            style={{
                                                color: '#cbd5e1',
                                                fontSize: '0.9rem',
                                                padding: 'var(--spacing-xs) 0',
                                                border: 'none'
                                            }}
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsMobileCategoriesOpen(false);
                                            }}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link to="/contact" className="navbar-link" style={{ color: 'var(--color-white)', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

                            <Link to="/about" className="navbar-link" style={{ color: 'var(--color-white)', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setIsMobileMenuOpen(false)}>About</Link>

                            <div className="mt-sm pt-sm flex items-center justify-between" style={{ color: 'white' }}>
                                {user ? (
                                    <>
                                        <span className="font-bold text-sm">{user.name}</span>
                                        <div className="flex gap-md">
                                            {isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} title="Dashboard"><LayoutDashboard size={20} /></Link>}
                                            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} title="Logout"><LogOut size={20} /></button>
                                        </div>
                                    </>
                                ) : (
                                    <Link to="/login" className="flex items-center gap-sm text-sm font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                                        <LogIn size={20} /> Login / Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
