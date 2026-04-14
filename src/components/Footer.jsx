import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
    <footer className="bg-[#111111] text-white pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <h2 className="text-2xl font-black font-serif italic tracking-tighter">Nexora News</h2>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Elevating the standard of digital journalism through deep analysis and aesthetic clarity.
                    </p>
                    <div className="flex space-x-5 text-gray-500">
                        <a href="https://www.linkedin.com/in/nexora-news" target='_blank' className="hover:text-white transition-colors"><Linkedin size={18} /></a>
                        <a href="https://x.com/Nexora_News" target='_blank' className="hover:text-white transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={18} /></a>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Sections</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><Link to="/category/world" className="hover:text-white transition-colors">World</Link></li>
                        <li><Link to="/category/politics" className="hover:text-white transition-colors">Politics</Link></li>
                        <li><Link to="/category/economy" className="hover:text-white transition-colors">Economy</Link></li>
                        <li><Link to="/category/technology" className="hover:text-white transition-colors">Technology</Link></li>
                        <li><Link to="/category/culture" className="hover:text-white transition-colors">Culture</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Company</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
                        <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-500">Legal</h3>
                    <ul className="space-y-4 text-sm text-gray-400 font-medium">
                        <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        <li className="pt-4 text-xs tracking-wide">
                            © 2024 Nexora News. All rights reserved. High-End Editorial Standards.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;