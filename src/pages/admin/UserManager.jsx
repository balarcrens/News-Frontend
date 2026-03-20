import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  User, 
  Trash2, 
  Shield, 
  Mail, 
  Calendar,
  Loader2,
  Search,
  UserPlus
} from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/users');
      setUsers(data || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    setActionLoading(userId);
    try {
      await api.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    setActionLoading(userId);
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loader-container"><Loader2 className="loader-icon" /></div>;

  return (
    <div className="user-manager">
      <div className="flex items-center justify-between mb-xl">
        <h1 className="font-serif" style={{ fontSize: '2rem', fontWeight: 'bold' }}>User Management</h1>
        <div className="flex items-center gap-md">
           <div className="flex items-center gap-sm px-md py-sm glass" style={{ borderRadius: 'var(--radius-md)' }}>
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                placeholder="Find users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.875rem' }}
              />
           </div>
        </div>
      </div>

      <div className="glass overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>User</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Role</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Joined</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-md)' }}>
                  <div className="flex items-center gap-md">
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} className="text-muted" />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: 'var(--spacing-md)' }}>
                  <select 
                    value={u.role} 
                    onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                    disabled={actionLoading === u._id}
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      border: '1px solid var(--color-border)',
                      fontSize: '0.875rem',
                      backgroundColor: u.role === 'admin' ? '#fdf2f2' : 'white',
                      color: u.role === 'admin' ? '#991b1b' : 'inherit'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <div className="flex items-center gap-xs">
                    <Calendar size={14} />
                    {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDeleteUser(u._id)}
                    disabled={actionLoading === u._id}
                    className="icon-btn text-accent"
                    title="Delete User"
                    style={{ color: '#dc2626' }}
                  >
                    {actionLoading === u._id ? <Loader2 size={18} className="spin" /> : <Trash2 size={18} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;
