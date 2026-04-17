import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import Newsletter from './home/Newsletter';

const Footer = () => (
    <footer className="w-full">
        {/* Newsletter Section Integrated Into Footer Area */}
        <Newsletter />

        <div className="bg-[#111111] text-white pt-20 pb-10 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black font-serif italic tracking-tighter">Nexora News</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Elevating the standard of digital journalism through deep analysis and aesthetic clarity.
                        </p>
                        <div className="flex -ml-3 text-gray-400">
                            <a href="https://www.linkedin.com/in/nexora-news" target='_blank' className="p-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-full" aria-label="Visit Nexora News on LinkedIn"><Linkedin size={22} /></a>
                            <a href="https://x.com/Nexora_News" target='_blank' className="p-3 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-full" aria-label="Visit Nexora News on Twitter"><Twitter size={22} /></a>
                            <span className="p-3 text-gray-500 cursor-not-allowed" aria-label="Instagram (Coming Soon)"><Instagram size={22} /></span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-400">Sections</h3>
                        <ul className="space-y-4 text-sm text-gray-400 font-medium">
                            <li><Link to="/category/world" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">World</Link></li>
                            <li><Link to="/category/politics" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Politics</Link></li>
                            <li><Link to="/category/economy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Economy</Link></li>
                            <li><Link to="/category/technology" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Technology</Link></li>
                            <li><Link to="/category/culture" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Culture</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-400">Company</h3>
                        <ul className="space-y-4 text-sm text-gray-400 font-medium">
                            <li><Link to="/about" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Contact</Link></li>
                            <li><Link to="/newsletter" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Newsletter</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-400">Legal</h3>
                        <ul className="space-y-4 text-sm text-gray-400 font-medium">
                            <li><Link to="/privacy-policy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-700">Cookie Policy</Link></li>
                            <li className="pt-4 text-xs tracking-wide">
                                © 2024 Nexora News. All rights reserved. High-End Editorial Standards.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
