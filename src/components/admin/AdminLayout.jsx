/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Layers,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Search,
    Bell
} from 'lucide-react';
import useAuth from '../../context/useAuth';

const NavItem = ({ to, icon: Icon, label, active, collapsed }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-3.5 mb-2 transition-all duration-300 group ${active
            ? 'bg-red-700 text-white shadow-lg shadow-red-700/20'
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
            }`}
    >
        <Icon size={20} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
        <span className={`ml-4 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}>
            {label}
        </span>
        {!collapsed && active && (
            <div className="ml-auto">
                <ChevronRight size={12} />
            </div>
        )}
    </Link>
);

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navigation = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Articles', path: '/admin/articles', icon: FileText },
        { name: 'Categories', path: '/admin/categories', icon: Layers },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
        { name: 'Home Page', path: '/', icon: LogOut }, 
    ];

    return (
        <div className="min-h-screen bg-[#FBFBFB] flex flex-col lg:flex-row">
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col bg-white border-r border-slate-100 transition-all duration-500 ease-in-out z-30 ${collapsed ? 'w-20' : 'w-72'
                    }`}
            >
                {/* Logo Section */}
                <div className="h-24 flex items-center px-5 border-b border-slate-50 mb-8">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-700 flex items-center justify-center text-white shrink-0">
                            <span className="font-serif font-black text-xl">N</span>
                        </div>
                        {!collapsed && (
                            <div className="ml-4 overflow-hidden">
                                <h1 className="font-serif italic font-black text-slate-900 tracking-tighter leading-none whitespace-nowrap">Nexora</h1>
                                <p className="text-[8px] font-black text-red-700 uppercase tracking-widest mt-1">Intelligence Panel</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3.5">
                    {navigation.map((item) => (
                        <NavItem
                            key={item.name}
                            to={item.path}
                            icon={item.icon}
                            label={item.name}
                            active={location.pathname === item.path}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 mt-auto border-t border-slate-50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3.5 text-slate-400 hover:text-red-700 transition-colors group"
                    >
                        <LogOut size={20} />
                        {!collapsed && (
                            <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em]">Logout</span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 bottom-0 left-0 w-72 bg-white z-50 transition-transform duration-500 lg:hidden ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                    }`}
            >
                <div className="h-24 flex items-center justify-between px-6 border-b border-slate-50 mb-8">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-700 flex items-center justify-center text-white">
                            <span className="font-serif italic font-black text-xl">N</span>
                        </div>
                        <div className="ml-4">
                            <h1 className="font-serif italic font-black text-slate-900 tracking-tighter leading-none">Nexora</h1>
                        </div>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                        <X size={24} />
                    </button>
                </div>
                <nav className="px-4">
                    {navigation.map((item) => (
                        <NavItem
                            key={item.name}
                            to={item.path}
                            icon={item.icon}
                            label={item.name}
                            active={location.pathname === item.path}
                            collapsed={false}
                        />
                    ))}
                </nav>
            </aside>

            {/* Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300`}>
                {/* Top Header */}
                <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-20">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex text-slate-400 hover:text-red-700 transition-colors mr-6"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden text-slate-400 hover:text-red-700 transition-colors mr-4"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-700 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Intel Articles..."
                                className="bg-slate-50 border-none pl-10 pr-4 py-2.5 text-[11px] font-medium placeholder:text-slate-300 focus:ring-1 focus:ring-red-100 transition-all w-64 lg:w-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 text-slate-400 hover:text-red-700 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-700 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center pl-6 border-l border-slate-100">
                            <div className="mr-4 text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-1">{user?.name}</p>
                                <p className="text-[9px] font-bold text-red-700 uppercase tracking-widest">Editorial Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-900 rounded-full overflow-hidden flex items-center justify-center text-white ring-4 ring-slate-50">
                                {user?.avatar ? (
                                    <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <span className="font-serif font-bold text-sm tracking-tighter">NX</span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content Viewport */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>

            <style>{`
                aside nav::-webkit-scrollbar {
                    display: none;
                }
                aside {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
