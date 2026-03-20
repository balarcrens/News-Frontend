import { Menu, Search, User, LogIn, LogOut, LayoutDashboard, X, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
                                <button className="icon-btn" style={{ display: 'none' }}><Menu size={24} /></button>
                                <Link to="/" className="navbar-brand">The Chronicle</Link>
                            </div>

                            <div className="navbar-links">
                                <Link to="/" className="navbar-link">Home</Link>

                                {/* Categories Dropdown */}
                                <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
                                    <span className="navbar-link cursor-pointer flex items-center gap-sm">
                                        Categories
                                        <ChevronLeft size={14} style={{ transform: 'rotate(-90deg)', marginTop: '2px' }} />
                                    </span>
                                    <div className="dropdown-content" style={{
                                        background: 'white',
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        minWidth: '200px',
                                        padding: 'var(--spacing-sm)',
                                        borderRadius: 'var(--radius-md)',
                                        marginTop: 'var(--spacing-sm)',
                                        opacity: 0,
                                        visibility: 'hidden',
                                        transition: 'all 0.3s ease',
                                        zIndex: 100,
                                        boxShadow: 'var(--shadow-lg)'
                                    }}>
                                        <Link to="/category/world" className="dropdown-item">World News</Link>
                                        <Link to="/category/politics" className="dropdown-item">Politics</Link>
                                        <Link to="/category/business" className="dropdown-item">Business</Link>
                                        <Link to="/category/tech" className="dropdown-item">Technology</Link>
                                        <Link to="/category/science" className="dropdown-item">Science</Link>
                                        <Link to="/category/culture" className="dropdown-item">Culture</Link>
                                    </div>
                                </div>

                                <Link to="/contact">Contact</Link>
                                <Link to="/about">About</Link>
                            </div>

                            <div className="navbar-actions">
                                <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}><Search size={20} /></button>

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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
