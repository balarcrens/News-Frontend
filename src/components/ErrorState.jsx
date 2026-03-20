import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorState = ({ 
    title = "Something went wrong", 
    description = "We encountered an unexpected error while fetching the content. Please try again later or return to the homepage.",
    onRetry = null,
    showHome = true
}) => {
    return (
        <div className="error-state glass animate-in fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-3xl) var(--spacing-xl)',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-white)',
            border: '1px solid #fee2e2', // Light red border
            maxWidth: '600px',
            margin: 'var(--spacing-2xl) auto'
        }}>
            <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red light
                color: '#ef4444', // Red-500
                padding: 'var(--spacing-lg)',
                borderRadius: '50%',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <AlertCircle size={48} strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-2xl mb-md" style={{ color: 'var(--color-primary)' }}>
                {title}
            </h3>
            
            <p className="text-muted mb-xl" style={{ maxWidth: '400px', fontSize: '1.125rem' }}>
                {description}
            </p>
            
            <div className="flex gap-md">
                {onRetry && (
                    <button onClick={onRetry} className="btn btn-primary flex items-center gap-sm">
                        <RotateCcw size={16} /> Try Again
                    </button>
                )}
                
                {showHome && (
                    <Link to="/" className="btn btn-outline flex items-center gap-sm">
                        <Home size={16} /> Go Home
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ErrorState;
