import { useState } from 'react';
import api from '../api/axios';
import SEO from '../components/SEO';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingState from '../components/LoadingState';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await api.post('/api/auth/forgotpassword', { email });
      setMessage(data.message || 'Check your email for reset link');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header" style={{ borderBottom: 'none' }}>
            <SEO
                title="Reset Password | NexoraNews Account Recovery"
                description="Recover your NexoraNews account. Enter your email address to receive a password reset link and regain access to your membership."
            />
      <div className="form-container" style={{ textAlign: 'left', marginTop: 'var(--spacing-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
          <div style={{ backgroundColor: 'var(--color-hover-bg)', padding: 'var(--spacing-md)', borderRadius: '50%', color: 'var(--color-accent)' }}>
            <Mail size={32} />
          </div>
        </div>
        <h1 className="form-title">Forgot Password?</h1>
        <p className="form-subtitle">No worries, we'll send you reset instructions.</p>

        {message && (
          <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
            {message}
          </div>
        )}

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
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-xl">
          <Link to="/login" className="flex items-center justify-center gap-xs" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: '600' }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
