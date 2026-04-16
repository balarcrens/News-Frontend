import React, { useState, useEffect } from 'react';
import { 
    Trash2, 
    Search, 
    Mail,
    Calendar,
    AlertCircle
} from 'lucide-react';
import { userService } from '../../api/userService';
import useAuth from '../../context/useAuth';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { confirmDestructive } from '../../utils/swal';

const RoleBadge = ({ role }) => {
    const styles = {
        admin: 'bg-red-50 text-red-700 ring-red-700/10',
        editor: 'bg-amber-50 text-amber-700 ring-amber-700/10',
        author: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
        user: 'bg-slate-50 text-slate-500 ring-slate-500/10'
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-black uppercase tracking-widest ring-1 ring-inset ${styles[role] || styles.user}`}>
            {role}
        </span>
    );
};

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const { user: currentUser } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to access personnel database.');
        } finally {

            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (userId === currentUser?._id) {
            toast.warning("Security Protocol: You cannot demote your own account.");
            return;
        }

        try {
            await userService.updateRole(userId, newRole);
            toast.success(`Clearance level updated to ${newRole.toUpperCase()}.`);
            fetchUsers();
        } catch (err) {
            toast.error('Failed to update clearance level: ' + err.message);
        }
    };

    const handleDelete = async (userId) => {
        if (userId === currentUser?._id) {
            toast.warning("Security Protocol: Self-termination is not permitted.");
            return;
        }

        const result = await confirmDestructive(
            'Revoke Access',
            "Are you sure you want to permanently revoke this user's access to the Nexora Network?"
        );

        if (result.isConfirmed) {
            try {
                await userService.deleteUser(userId);
                toast.success('Personnel record successfully terminated.');
                fetchUsers();
            } catch (err) {
                toast.error('Failure during account termination: ' + err.message);
            }
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === '' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <header className="mb-12">
                <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.4em] mb-4">Personnel Intelligence</p>
                <h1 className="text-5xl md:text-6xl font-black font-serif text-slate-900 tracking-tighter leading-none mb-4">
                    User Command
                </h1>
                <p className="text-lg font-serif text-slate-500">Manage site clearance and personnel credentials.</p>
            </header>

            {/* Matrix Search & Filter */}
            <div className="bg-white border border-slate-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-700 transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by identity or email..." 
                        className="w-full bg-slate-50 border-none pl-12 pr-4 py-3 text-[11px] font-bold uppercase tracking-wider placeholder:text-slate-500 focus:ring-1 focus:ring-red-100 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex bg-slate-50 p-1 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['', 'admin', 'user'].map((role) => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={`flex-1 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                                roleFilter === role 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-600 hover:text-slate-600'
                            }`}
                        >
                            {role || 'All Personnel'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Matrix */}
            <div className="bg-white border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">Identity</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">Clearance (Role)</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">Status</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">Enrolled Date</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-600 uppercase tracking-widest whitespace-nowrap text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="py-8 px-8"><div className="h-4 bg-slate-100 w-3/4"></div></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => (
                                    <tr key={u._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white ring-4 ring-slate-50 overflow-hidden mr-4">
                                                    {u.avatar ? (
                                                        <img src={u.avatar} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <span className="font-serif font-black text-xs">{(u.name?.[0] || 'U').toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.05em] mb-0.5">
                                                        {u.name} {u._id === currentUser?._id && <span className="text-xs text-red-700 ml-1">(YOU)</span>}
                                                    </p>
                                                    <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-widest">
                                                        <Mail size={10} className="mr-1.5" /> {u.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center space-x-3">
                                                <RoleBadge role={u.role} />
                                                <select
                                                    className="bg-slate-50 border-none px-2 py-1 text-xs font-black uppercase tracking-widest focus:ring-1 focus:ring-red-100 outline-none cursor-pointer"
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                    disabled={u._id === currentUser?._id}
                                                >
                                                    <option value="admin">ADMIN</option>
                                                    <option value="user">USER</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center">
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${u.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    {u.isActive !== false ? 'Verified' : 'Suspended'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-widest tabular-nums">
                                                <Calendar size={12} className="mr-2" />
                                                {format(new Date(u.createdAt), 'MMM dd, yyyy')}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button 
                                                onClick={() => handleDelete(u._id)}
                                                disabled={u._id === currentUser?._id}
                                                className="p-2.5 text-slate-500 cursor-pointer hover:text-red-700 hover:bg-red-50 transition-all disabled:opacity-0"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <AlertCircle size={48} strokeWidth={1} className="mb-4" />
                                            <p className="text-lg font-serif">Identity not found in network databases.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;

