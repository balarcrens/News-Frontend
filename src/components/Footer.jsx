import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" style={{ borderTop: '4px solid var(--color-accent)' }}>
      <div className="container">
        <div className="footer-grid">
          <div style={{ gridColumn: 'span 2' }}>
            <h3 className="font-serif italic text-3xl text-white mb-md">The Chronicle</h3>
            <p className="text-md mb-xl leading-relaxed" style={{ color: '#94a3b8', maxWidth: '400px' }}>
              Exceptional journalism for a digital world. Delivering breaking news, 
              deep-dive analysis, and global perspectives with integrity.
            </p>
            
            <div className="newsletter-mini mb-xl">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-sm">Subscribe to our Briefing</h4>
              <div className="flex gap-xs" style={{ maxWidth: '350px' }}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    flexGrow: 1,
                    color: 'white',
                    fontSize: '0.875rem'
                  }} 
                />
                <button className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>Join</button>
              </div>
            </div>

            <div className="flex space-x-6 gap-md">
              <Facebook size={22} className="footer-link cursor-pointer hover:text-white transition-colors" />
              <Twitter size={22} className="footer-link cursor-pointer hover:text-white transition-colors" />
              <Instagram size={22} className="footer-link cursor-pointer hover:text-white transition-colors" />
              <Linkedin size={22} className="footer-link cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="footer-heading" style={{ color: 'white', opacity: 0.5 }}>Sections</h4>
            <ul className="footer-links">
              <li><Link to="/category/world" className="footer-link">World News</Link></li>
              <li><Link to="/category/politics" className="footer-link">Politics</Link></li>
              <li><Link to="/category/business" className="footer-link">Business & Finance</Link></li>
              <li><Link to="/category/tech" className="footer-link">Technology</Link></li>
              <li><Link to="/category/science" className="footer-link">Science & Environment</Link></li>
              <li><Link to="/category/culture" className="footer-link">Culture & Lifestyle</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="footer-heading" style={{ color: 'white', opacity: 0.5 }}>The Chronicle</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><span className="footer-link cursor-pointer">Editorial Board</span></li>
              <li><span className="footer-link cursor-pointer">Ethics Policy</span></li>
              <li><span className="footer-link cursor-pointer">Fact Checking</span></li>
              <li><span className="footer-link cursor-pointer">Newsroom</span></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-md">
            <span style={{ color: '#64748b' }}>© {new Date().getFullYear()} The Chronicle Media Group. All rights reserved.</span>
            <div className="flex gap-lg">
              <Link to="/privacy-policy" className="footer-link text-xs">Privacy Policy</Link>
              <Link to="/terms-of-service" className="footer-link text-xs">Terms of Service</Link>
              <Link to="/cookie-policy" className="footer-link text-xs">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
