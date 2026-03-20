import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Tag,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Bell,
    User,
    Home
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
        { icon: <FileText size={20} />, label: 'Articles', path: '/admin/articles' },
        { icon: <Tag size={20} />, label: 'Categories', path: '/admin/categories' },
        { icon: <User size={20} />, label: 'Users', path: '/admin/users' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
        { icon: <Home size={20} />, label: 'Home', path: '/' },
    ];

    return (
        <div className="admin-wrapper" style={{
            display: 'flex',
            backgroundColor: '#f8fafc',
            height: '100vh',
            width: '100%',
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
                style={{
                    width: isSidebarOpen ? '280px' : '80px',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flexShrink: 0,
                    zIndex: 50,
                    boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{
                    padding: '0 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarOpen ? 'space-between' : 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    height: '70px',
                    flexShrink: 0
                }}>
                    {isSidebarOpen && <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.025em', color: '#f8fafc' }}>CHRONICLE</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="icon-btn hover:bg-slate-700" style={{ color: 'white', padding: '8px' }}>
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0 }}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: isSidebarOpen ? '1rem' : '0',
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        color: isActive ? '#fff' : '#94a3b8',
                                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                                        textDecoration: 'none',
                                        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                                        transition: 'all 0.2s ease',
                                        fontWeight: isActive ? '600' : '400'
                                    })}
                                >
                                    <span style={{ transition: 'transform 0.2s', display: 'flex' }}>{item.icon}</span>
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: isSidebarOpen ? '1rem' : '0',
                            padding: '0.75rem',
                            width: '100%',
                            textAlign: 'left',
                            color: '#94a3b8',
                            backgroundColor: 'transparent',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            borderRadius: '0.75rem',
                            transition: 'all 0.2s'
                        }}
                        className="hover:bg-slate-700 hover:text-white"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}>
                {/* Top Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 2rem',
                    height: '70px',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    zIndex: 40,
                    flexShrink: 0
                }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1e293b' }}>Control Panel</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="icon-btn hover:bg-slate-50" style={{ position: 'relative', padding: '8px' }}>
                            <Bell size={20} color="#64748b" />
                            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '4px 12px', border: '1px solid #e2e8f0', borderRadius: '2rem', backgroundColor: '#f8fafc' }}>
                            <div style={{ width: '28px', height: '28px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                                <User size={16} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.813rem', fontWeight: '600', color: '#1e293b', lineHeight: 1 }}>{user?.name || 'Admin'}</span>
                                <span style={{ fontSize: '0.688rem', color: '#64748b' }}>Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <main style={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '2rem',
                    backgroundColor: '#f8fafc'
                }}>
                    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
