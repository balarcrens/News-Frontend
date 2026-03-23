import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import SEO from '../components/SEO';
import { Lock } from 'lucide-react';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      await api.put(`/api/auth/resetpassword/${token}`, { password });
      alert('Password reset successful! Please log in with your new password.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header" style={{ borderBottom: 'none' }}>
      <SEO
        title="Secure Reset Password | NexoraNews"
        description="Create a new secure password for your NexoraNews account."
      />
      
      <div className="form-container" style={{ textAlign: 'left', marginTop: 'var(--spacing-2xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
          <div style={{ backgroundColor: 'var(--color-hover-bg)', padding: 'var(--spacing-md)', borderRadius: '50%', color: 'var(--color-accent)' }}>
            <Lock size={32} />
          </div>
        </div>
        <h1 className="form-title">Set New Password</h1>
        <p className="form-subtitle">Choose a strong password for your account.</p>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
