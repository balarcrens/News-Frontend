import { FileSearch, Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage = () => {
    return (
        <div className="not-found-page container py-3xl text-center">
            <SEO 
                title="404 - Page Not Found" 
                description="The page you are looking for doesn't exist or has been moved."
            />
            
            <div className="animate-in fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                    fontSize: '8rem',
                    fontWeight: '900',
                    lineHeight: '1',
                    color: 'rgba(190, 18, 60, 0.1)',
                    position: 'relative',
                    marginBottom: 'var(--spacing-xl)',
                    fontFamily: 'var(--font-serif)'
                }}>
                    404
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'var(--color-accent)',
                        fontSize: '3rem'
                    }}>
                        <FileSearch size={80} strokeWidth={1} />
                    </div>
                </div>
                
                <h1 className="page-title" style={{ marginBottom: "10px" }}>Page Not Found</h1>
                <p className="page-description" style={{ marginBottom: "20px" }}>
                    We're sorry, but the page you are looking for doesn't exist, has been removed, or the name has changed.
                </p>
                
                <div className="flex justify-center gap-lg">
                    <Link to="/" className="btn btn-primary flex items-center gap-sm">
                        <Home size={18} /> Back to Homepage
                    </Link>
                    <button onClick={() => window.history.back()} className="btn btn-outline flex items-center gap-sm">
                        <ChevronLeft size={18} /> Go Back
                    </button>
                </div>
                
                <div className="mt-xl border-t" style={{ borderColor: 'var(--color-border)', paddingTop: "20px" }}>
                    <p className="text-muted mb-lg">Looking for something specific?</p>
                    <div className="flex justify-center gap-lg" style={{ flexWrap: 'wrap' }}>
                        <Link to="/category/world" className="footer-link" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>World News</Link>
                        <Link to="/category/tech" className="footer-link" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Technology</Link>
                        <Link to="/category/business" className="footer-link" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Business</Link>
                        <Link to="/contact" className="footer-link" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
