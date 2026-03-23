import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/api/categories');
                setCategories(data.filter(c => c.isActive !== false).slice(0, 10));
            } catch (err) {
                console.error('Footer category fetch failed', err);
            }
        };
        fetchCategories();
    }, []);

    const handleJoin = async () => {
        if (!email) return alert('Please enter an email address');
        setLoading(true);
        try {
            const { data } = await api.post('/api/subscriptions', { email });
            alert(data.message || 'Thank you for subscribing!');
            setEmail('');
        } catch (err) {
            alert(err.response?.data?.message || 'Subscription failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="footer" style={{
            background: '#0f172a',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '5rem 0 2rem'
        }}>
            <div className="container">
                <div className="footer-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Brand Section */}
                    <div className="footer-brand-col">
                        <h3 className="font-serif italic text-3xl text-white mb-md" style={{ letterSpacing: '-0.02em' }}>NexoraNews</h3>
                        <p className="text-slate-400 mb-lg leading-relaxed" style={{ fontSize: '0.95rem' }}>
                            Delivering high-impact journalism and real-time insights to a global audience. Stay informed with NexoraNews.
                        </p>
                        <div className="flex gap-md">
                            <a href="#" className="social-link-circle flex" style={{ alignItems: "center" }}><Facebook size={18} /></a>
                            <a href="#" className="social-link-circle flex" style={{ alignItems: "center" }}><Twitter size={18} /></a>
                            <a href="#" className="social-link-circle flex" style={{ alignItems: "center" }}><Instagram size={18} /></a>
                            <a href="#" className="social-link-circle flex" style={{ alignItems: "center" }}><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Dynamic Categories Section */}
                    <div>
                        <h4 className="footer-heading" style={{ color: 'white', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Trending Sections</h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.75rem'
                        }}>
                            {categories.length > 0 ? categories.map(cat => (
                                <Link key={cat._id} to={`/category/${cat.slug}`} className="footer-link-modern">
                                    {cat.name}
                                </Link>
                            )) : (
                                <>
                                    <Link to="/category/World" className="footer-link-modern">World</Link>
                                    <Link to="/category/Politics" className="footer-link-modern">Politics</Link>
                                    <Link to="/category/Tech" className="footer-link-modern">Tech</Link>
                                    <Link to="/category/Business" className="footer-link-modern">Business</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-heading" style={{ color: 'white', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>The Newsroom</h4>
                        <ul className="footer-links-list">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy">Cookies</Link></li>
                            <li><Link to="/disclaimer">Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h4 className="footer-heading" style={{ color: 'white', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Subscribe</h4>
                        <p className="text-slate-500 text-sm mb-md">Get the daily briefing in your inbox.</p>
                        <div className="newsletter-box">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="footer-input" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="footer-btn" onClick={handleJoin} disabled={loading}>
                                {loading ? '...' : 'Join'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div className="flex gap-xl flex-wrap justify-center">
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>© {new Date().getFullYear()} NexoraNews Media Group. All rights reserved.</span>
                    </div>
                </div>
            </div>

            <style>{`
        .footer-link-modern {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          display: block;
        }
        .footer-link-modern:hover {
          color: var(--color-accent);
          transform: translateX(4px);
        }
        .social-link-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          alignItems: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.3s ease;
        }
        .social-link-circle:hover {
          background: var(--color-accent);
          color: white;
          transform: translateY(-3px);
        }
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links-list a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: 0.2s;
        }
        .footer-links-list a:hover {
          color: white;
        }
        .newsletter-box {
          display: flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .footer-input {
          background: transparent;
          border: none;
          padding: 0.75rem 1rem;
          color: white;
          width: 100%;
          font-size: 0.85rem;
        }
        .footer-input:focus { outline: none; }
        .footer-btn {
          background: var(--color-accent);
          color: white;
          border: none;
          padding: 0 1.25rem;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          cursor: pointer;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
