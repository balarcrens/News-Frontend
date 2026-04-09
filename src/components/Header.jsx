import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, ArrowRight, LogOut, Settings } from 'lucide-react';
import { articleService } from '../api/articleService';
import { categoryService } from '../api/categoryService';
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

const TopTicker = ({ headlines = [], isScrolled = false }) => (
    <div className={`bg-white border-b border-gray-100 py-2 overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 -translate-y-full' : 'h-auto opacity-100 translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center text-[10px] font-bold uppercase tracking-widest">
            <span className="text-red-700 flex items-center whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-red-700 rounded-full mr-2 animate-pulse"></span>
                Breaking News
            </span>
            <div className="ml-6 text-gray-500 marquee whitespace-nowrap overflow-hidden flex-1">
                <span className="inline-block animate-marquee">
                    {headlines.length > 0
                        ? headlines.map(h => h.title).join(' • ')
                        : "Global markets rally as inflation targets are met ahead of schedule • New space exploration initiative announced for 2026"}
                </span>
            </div>
            <div className="ml-auto flex items-center text-gray-400 font-medium whitespace-nowrap pl-4">
                <span>LIVE UPDATES</span>
            </div>
        </div>
    </div>
);

const Navbar = ({ isScrolled = false, onMenuOpen, user, logout, categories = [] }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className={`bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-500 ${isScrolled ? 'py-2 shadow-sm' : 'py-4 md:py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-2 justify-between">
                <div className="flex-1 flex items-center">
                    <button
                        onClick={onMenuOpen}
                        className="md:hidden mr-4 p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Menu size={22} />
                    </button>
                    <Link to="/" className={`font-black font-serif italic tracking-tighter text-slate-900 cursor-pointer transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-25xl md:text-3xl'}`}>
                        Nexora News
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 justify-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
                    {categories.slice(0, 5).map(cat => (
                        <Link 
                            key={cat._id} 
                            to={`/category/${cat.slug}`} 
                            className="hover:text-red-700 transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                <div className="flex-1 flex items-center justify-end space-x-3 md:space-x-5">
                    <div className="relative group hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`pl-4 pr-10 bg-gray-50 border-none rounded-full text-xs focus:ring-1 focus:ring-gray-200 outline-none transition-all duration-500 ${isScrolled ? 'py-1.5 w-32 focus:w-48' : 'py-2 w-32 md:w-48 focus:w-64'}`}
                        />
                        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="p-1 px-3 border border-gray-100 rounded-full flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hidden sm:block">
                                        {user.name.split(' ')[0]}
                                    </span>
                                    <User size={18} className="text-gray-600" />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-4 z-[100] animate-in fade-in slide-in-from-top-2">
                                        <div className="px-6 pb-3 border-b border-gray-50 mb-3">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>
                                            <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                                        </div>
                                        <button className="w-full text-left px-6 py-2 text-xs font-bold text-gray-600 hover:text-red-700 hover:bg-gray-50 transition-all flex items-center space-x-3">
                                            <Settings size={14} />
                                            <span>Dashboard</span>
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-6 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-all flex items-center space-x-3"
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
        </nav>
    );
};

const MobileDrawer = ({ isOpen, onClose, user, logout, categories = [] }) => (
    <>
        <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        />
        <div className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[100] shadow-2xl transition-transform duration-500 ease-out border-r border-gray-100 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-black font-serif italic tracking-tighter text-slate-900">Nexora News</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-700 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <div className="p-8">
                <div className="mb-10 border-b border-gray-50">
                    {user ? (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-700 font-black">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Welcome back</p>
                                    <p className="text-sm font-serif font-bold text-slate-900">{user.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { logout(); onClose(); }}
                                className="w-full flex items-center justify-center space-x-2 border border-red-100 bg-red-50 text-red-700 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
                            >
                                <LogOut size={14} />
                                <span>Sign Out</span>
                            </button>
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

                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Main Sections</h3>
                <nav className="space-y-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            to={`/category/${cat.slug}`}
                            className="flex items-center justify-between text-lg font-bold font-serif text-slate-800 hover:text-red-700 transition-colors group"
                            onClick={onClose}
                        >
                            {cat.name}
                            <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-red-700" />
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    </>
);

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
