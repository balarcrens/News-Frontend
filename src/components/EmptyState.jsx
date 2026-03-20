import { Search, FileQuestion, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
    icon: Icon = Search, 
    title = "No results found", 
    description = "We couldn't find what you're looking for. Try adjusting your filters or search terms.",
    actionLink = "/",
    actionText = "Browse all news",
    onActionClick = null
}) => {
    return (
        <div className="empty-state glass animate-in fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-3xl) var(--spacing-xl)',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            maxWidth: '600px',
            margin: 'var(--spacing-2xl) auto'
        }}>
            <div style={{
                backgroundColor: 'rgba(190, 18, 60, 0.05)',
                color: 'var(--color-accent)',
                padding: 'var(--spacing-lg)',
                borderRadius: '50%',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <Icon size={48} strokeWidth={1.5} />
            </div>
            
            <h3 className="font-serif text-2xl mb-md" style={{ color: 'var(--color-primary)' }}>
                {title}
            </h3>
            
            <p className="text-muted mb-xl" style={{ maxWidth: '400px', fontSize: '1.125rem' }}>
                {description}
            </p>
            
            {onActionClick ? (
                <button onClick={onActionClick} className="btn btn-primary flex items-center gap-sm">
                    {actionText} <ArrowRight size={16} />
                </button>
            ) : (
                <Link to={actionLink} className="btn btn-primary flex items-center gap-sm">
                    {actionText} <ArrowRight size={16} />
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
