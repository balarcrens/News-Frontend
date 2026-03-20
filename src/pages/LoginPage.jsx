import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header" style={{ borderBottom: 'none' }}>
      <Helmet>
        <title>Sign In | The Chronicle</title>
      </Helmet>

      <div className="form-container" style={{ textAlign: 'left', marginTop: 'var(--spacing-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
          <div style={{ backgroundColor: 'var(--color-hover-bg)', padding: 'var(--spacing-md)', borderRadius: '50%', color: 'var(--color-accent)' }}>
            <LogIn size={32} />
          </div>
        </div>
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Sign in to access exclusive news and manage your reading list.</p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center mb-sm">
              <label className="form-label" style={{ marginBottom: 0 }} htmlFor="password">Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '600' }}>Forgot password?</a>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-xl text-muted" style={{ fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
