import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, ArrowRight, LogOut, Settings, ChevronDown, ArrowDown } from 'lucide-react';
import { articleService } from '../api/articleService';
import { categoryService } from '../api/categoryService';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const TopTicker = ({ headlines = [], isScrolled = false }) => {
    return (
        <div className={`bg-white border-b border-gray-100 py-2 overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 -translate-y-full' : 'h-auto opacity-100 translate-y-0'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-red-700 flex items-center whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-red-700 rounded-full mr-2 animate-pulse"></span>
                    Breaking News
                </span>
                <div className="ml-6 text-gray-500 marquee whitespace-nowrap overflow-hidden flex-1">
                    <span className="inline-block animate-marquee">
                        {headlines.length > 0 ? (
                            headlines.map((h, index) => (
                                <span key={h.slug}>
                                    <Link to={`article/${h.slug}`} className="hover:underline">
                                        {h.title}
                                    </Link>
                                    {index !== headlines.length - 1 && " | "}
                                </span>
                            ))
                        ) : (
                            "Global markets rally as inflation targets are met ahead of schedule • New space exploration initiative announced for 2026"
                        )}
                    </span>
                </div>
                <div className="ml-auto flex items-center text-gray-600 font-medium whitespace-nowrap pl-4">
                    <span>LIVE UPDATES</span>
                </div>
            </div>
        </div>
    )
};

const Navbar = ({ isScrolled = false, onMenuOpen, user, logout, categories = [] }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCategoryHovered, setIsCategoryHovered] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMobileSearchOpen(false);
        }
    };

    return (
        <nav className={`bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-500 ${isScrolled ? 'py-2 shadow-sm' : 'py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-4 justify-between relative">
                <div className="flex-1 flex items-center">
                    <button
                        onClick={onMenuOpen}
                        className="md:hidden mr-4 p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        aria-label="Open main menu"
                    >
                        <Menu size={22} />
                    </button>
                    <Link to="/" className={`font-black font-serif italic tracking-tighter text-slate-900 cursor-pointer transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                        Nexora News
                    </Link>
                </div>

                <div className="hidden md:flex justify-center items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
                    <div
                        className="relative h-full flex items-center group cursor-pointer"
                        onMouseEnter={() => setIsCategoryHovered(true)}
                        onMouseLeave={() => setIsCategoryHovered(false)}
                    >
                        <span className="group-hover:text-red-700 transition-colors flex items-center">
                            Categories
                            <ChevronDown size={12} className={`ml-1 transition-transform duration-300 ${isCategoryHovered ? 'rotate-180' : ''}`} />
                        </span>

                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 z-50 ${isCategoryHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                            <div className="bg-white shadow-2xl border border-gray-100 w-[600px] p-8 rounded-none grid grid-cols-3 gap-x-8 gap-y-6">
                                <div className="col-span-3 pb-4 border-b border-gray-50 mb-2">
                                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-[0.3em]">Editorial Sections</p>
                                </div>
                                {categories.map(cat => (
                                    <Link
                                        key={cat._id}
                                        to={`/category/${cat.slug}`}
                                        className="flex items-center space-x-3 group/item"
                                        onClick={() => setIsCategoryHovered(false)}
                                    >
                                        <div className="w-1.5 h-1.5 bg-gray-200 group-hover/item:bg-red-700 transition-colors"></div>
                                        <span className="hover:text-red-700 transition-colors font-serif italic text-sm normal-case tracking-normal text-slate-800">
                                            {cat.name}
                                        </span>
                                    </Link>
                                ))}
                                <div className="col-span-3 pt-4 border-t border-gray-50 mt-2">
                                    <Link to="/" className="text-xs text-gray-600 hover:text-slate-900 transition-colors flex items-center uppercase py-2">
                                        Browse all intelligence reports <ArrowRight size={10} className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="hover:text-red-700 transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-red-700 transition-colors">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center justify-end space-x-2 md:space-x-5">
                    <form onSubmit={handleSearchSubmit} className="relative group hidden lg:block">
                        <input
                            type="text"
                            placeholder="Find reports..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-4 pr-12 bg-white border border-gray-100 rounded-none text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-red-700/20 focus:border-red-700 outline-none transition-all duration-500 ${isScrolled ? 'py-2.5 w-40 focus:w-56' : 'py-3.5 w-48 focus:w-72'}`}
                        />
                        <button 
                            type="submit" 
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-600 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                            aria-label="Search"
                        >
                            <Search size={16} />
                        </button>
                    </form>

                    <button
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        aria-label={isMobileSearchOpen ? "Close search bar" : "Open search bar"}
                    >
                        {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="py-2 px-3 border cursor-pointer border-gray-100 flex items-center space-x-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                                    aria-label="User profile"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hidden sm:block">
                                        {user.name.split(' ')[0]}
                                    </span>
                                    <User size={18} className="text-gray-600" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-4 z-[100] animate-in fade-in slide-in-from-top-2">
                                        <div className="px-6 pb-3 border-b border-gray-50 mb-3">
                                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Account</p>
                                            <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                                        </div>
                                        {user?.role === 'admin' && (
                                            <button
                                                onClick={() => {
                                                    navigate('/admin');
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full cursor-pointer text-left px-6 py-2 text-xs font-bold text-gray-600 hover:text-red-700 hover:bg-gray-50 transition-all flex items-center space-x-3"
                                            >
                                                <Settings size={14} />
                                                <span>Dashboard</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={logout}
                                            className="w-full cursor-pointer text-left px-6 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-all flex items-center space-x-3"
                                        >
                                            <LogOut size={14} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/auth" className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-red-700 transition-colors px-2 py-1">
                                    Login
                                </Link>
                                <Link to="/auth" className="hidden sm:block text-[10px] font-bold uppercase tracking-widest bg-red-700 text-white px-4 py-2 hover:bg-red-800 transition-colors rounded-none text-center">
                                    Subscribe
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-b border-gray-50 ${isMobileSearchOpen ? 'max-h-20 opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-red-700 rounded-none text-sm outline-none transition-all"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                            aria-label="Search"
                        >
                            <Search size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

const MobileDrawer = ({ isOpen, onClose, user, logout, categories = [] }) => {
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[100] overflow-y-auto shadow-2xl transition-transform duration-500 ease-out border-r border-gray-100 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black font-serif italic tracking-tighter text-slate-900">Nexora News</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-600 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-8 relative group">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const q = e.target.search.value;
                            if (q) {
                                window.location.href = `/search?q=${encodeURIComponent(q)}`;
                                onClose();
                            }
                        }}>
                            <input
                                name="search"
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-4 pr-12 py-4 bg-gray-50 border-none text-sm focus:ring-1 focus:ring-red-700 outline-none transition-all"
                            />
                            <button 
                                type="submit" 
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-600 group-focus-within:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                                aria-label="Search"
                            >
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="mb-10 border-b border-gray-50 pb-8">
                        {user ? (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-700 font-black">
                                        {user.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Identity Verified</p>
                                        <p className="text-sm font-serif font-bold text-slate-900">{user.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {user?.role === 'admin' && (
                                        <button
                                            onClick={() => { navigate('/admin'); onClose(); }}
                                            className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
                                        >
                                            <Settings size={14} />
                                            <span>Admin Dashboard</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => { logout(); onClose(); }}
                                        className="w-full flex items-center justify-center space-x-2 border border-red-100 bg-red-50 text-red-700 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
                                    >
                                        <LogOut size={14} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Link to="/auth" onClick={onClose} className="w-full block text-center bg-slate-900 text-white font-bold py-4 text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors">
                                    Login to account
                                </Link>
                                <Link to="/auth" onClick={onClose} className="w-full block text-center border-2 border-slate-900 text-slate-900 font-bold py-4 text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>

                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-8">Navigation</h3>
                    <nav className="space-y-6">
                        <div>
                            <button
                                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                                className="w-full flex items-center justify-between text-lg font-bold font-serif text-slate-800 hover:text-red-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 p-1"
                                aria-expanded={isCategoriesExpanded}
                                aria-label={isCategoriesExpanded ? "Collapse categories" : "Expand categories"}
                            >
                                <span>Categories</span>
                                <ChevronDown size={18} className={`transition-transform duration-300 ${isCategoriesExpanded ? 'rotate-180 text-red-700' : 'text-gray-600'}`} />
                            </button>

                            <div className={`overflow-hidden relative custom-scrollbar transition-all duration-500 ease-in-out ${isCategoriesExpanded ? 'max-h-[200px] mt-6 opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
                                <div className="grid grid-cols-1 gap-4 pl-4 border-l border-gray-50">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat._id}
                                            to={`/category/${cat.slug}`}
                                            className="flex items-center space-x-3 text-sm font-bold font-serif text-gray-500 hover:text-red-700 transition-colors group/item"
                                            onClick={onClose}
                                        >
                                            <div className="w-1.5 h-1.5 bg-gray-200 group-hover/item:bg-red-700 transition-colors"></div>
                                            <span>{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-50 space-y-6">
                            <Link
                                to="/about"
                                className="flex items-center justify-between text-lg font-bold font-serif text-slate-800 hover:text-red-700 transition-colors group"
                                onClick={onClose}
                            >
                                About
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-red-700" />
                            </Link>
                            <Link
                                to="/contact"
                                className="flex items-center justify-between text-lg font-bold font-serif text-slate-800 hover:text-red-700 transition-colors group"
                                onClick={onClose}
                            >
                                Contact Us
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-red-700" />
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
};

const Header = () => {
    const [headlines, setHeadlines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const [breaking, cats] = await Promise.all([
                    articleService.getBreakingNews(5),
                    categoryService.getAll()
                ]);
                setHeadlines(breaking);
                setCategories(cats);
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };
        fetchHeaderData();

        const handleScroll = () => {
            if (window.scrollY > 40) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isMenuOpen]);

    return (
        <header className="fixed top-0 w-full z-50 bg-white transition-all duration-300">
            <TopTicker headlines={headlines} isScrolled={isScrolled} />
            <Navbar
                isScrolled={isScrolled}
                onMenuOpen={() => setIsMenuOpen(true)}
                user={user}
                logout={logout}
                categories={categories}
            />
            <MobileDrawer
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                user={user}
                logout={logout}
                categories={categories}
            />
        </header>
    );
};

export default Header;

