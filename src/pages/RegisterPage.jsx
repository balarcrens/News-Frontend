import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header" style={{borderBottom: 'none'}}>
      <Helmet>
        <title>Subscribe | The Chronicle</title>
      </Helmet>

      <div className="form-container" style={{textAlign: 'left', marginTop: 'var(--spacing-2xl)'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)'}}>
          <div style={{backgroundColor: 'var(--color-hover-bg)', padding: 'var(--spacing-md)', borderRadius: '50%', color: 'var(--color-accent)'}}>
            <UserPlus size={32} />
          </div>
        </div>
        <h1 className="form-title">Join The Chronicle</h1>
        <p className="form-subtitle">Create an account to get unlimited access to our award-winning journalism.</p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              className="form-input" 
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              className="form-input" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className="form-input" 
              placeholder="Create a strong password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-xl text-muted" style={{fontSize: '0.875rem'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--color-primary)', fontWeight: '700'}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
