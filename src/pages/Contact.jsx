/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Shield, Instagram, Twitter, Linkedin } from 'lucide-react';
import contactHero from "/assets/nexoranews_contact_hero.png";
import SEO from '../components/common/SEO';

const InquiryCard = ({ icon: Icon, title, description, email }) => (
    <div className="group border-b border-gray-100 py-10 hover:bg-gray-50/50 transition-all duration-500 px-6">
        <div className="flex items-start space-x-6">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:bg-red-700 transition-colors">
                <Icon size={18} />
            </div>
            <div>
                <h3 className="text-lg font-serif italic font-black text-slate-900 mb-2 uppercase tracking-tight">
                    {title}
                </h3>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4 leading-relaxed">
                    {description}
                </p>
                <a href={`mailto:${email}`} className="text-sm font-serif italic text-red-700 hover:text-red-800 transition-colors">
                    {email}
                </a>
            </div>
        </div>
    </div>
);

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log("Form Submitted:", formState);
    };

    return (
        <div className="bg-white">
            <SEO 
                title="Contact Our Newsroom"
                description="Connect with Nexora News. Submit tips, inquiries, or feedback to our editorial team."
            />
            {/* Direct Channel Hero */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <img
                    src={contactHero}
                    alt="Nexora News Communications"
                    className="absolute inset-0 w-full h-full object-cover object-[50%_25%] blur-sm scale-105 transition-all duration-[1000ms] will-change-transform"
                    loading='lazy'
                    fetchPriority='high'
                    onLoad={(e) => {
                        e.currentTarget.classList.remove('blur-sm', 'scale-105');
                    }}
                />
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]"></div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full text-center">
                    <span className="inline-block px-4 py-1.5 bg-red-700 text-white text-xs font-bold uppercase tracking-[0.4em] mb-8">
                        The Intelligence Bridge
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black font-serif italic text-white tracking-widest leading-tight mb-8">
                        Direct <br className="md:hidden" /> Conversations
                    </h1>
                    <p className="text-lg font-serif text-gray-600 italic max-w-2xl mx-auto opacity-80">
                        Bridging global narratives with direct editorial access. Reach our bureaus across the world.
                    </p>
                </div>
            </section>

            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                        {/* Inquiry Matrix */}
                        <div className="lg:col-span-5">
                            <div className="mb-12">
                                <p className="text-red-700 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Inquiry Matrix</p>
                                <h2 className="text-4xl font-black font-serif italic text-slate-900 leading-tight">
                                    Categorized <br /> Access
                                </h2>
                            </div>

                            <div className="border-t border-gray-100">
                                <InquiryCard
                                    icon={MessageSquare}
                                    title="Editorial Desk"
                                    description="STORY TIPS, PRESS RELEASES, AND EDITORIAL INQUIRIES."
                                    email="editorial@nexoranews.com"
                                />
                                <InquiryCard
                                    icon={Globe}
                                    title="Partnerships"
                                    description="GLOBAL COLLABORATIONS, SPONSORSHIPS, AND ADVERTISING."
                                    email="partners@nexoranews.com"
                                />
                                <InquiryCard
                                    icon={Shield}
                                    title="Press Office"
                                    description="MEDIA REQUESTS AND OFFICIAL STATEMENTS."
                                    email="press@nexoranews.com"
                                />
                                <InquiryCard
                                    icon={Mail}
                                    title="General"
                                    description="FOR ALL OTHER INQUIRIES AND FEEDBACK."
                                    email="hello@nexoranews.com"
                                />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-1 lg:flex items-center justify-center hidden">
                            <div className="w-px h-full bg-gray-100"></div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="bg-[#FBFBFB] p-8 md:p-16 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-12">Authorized Communication Portal</p>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">IDENTITY / NAME</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-white border-b border-gray-200 p-4 text-xs font-bold uppercase tracking-widest focus:border-red-700 focus:ring-0 outline-none transition-all placeholder:text-gray-500"
                                                placeholder="FULL NAME"
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">COMMUNICATION / EMAIL</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-white border-b border-gray-200 p-4 text-xs font-bold uppercase tracking-widest focus:border-red-700 focus:ring-0 outline-none transition-all placeholder:text-gray-500"
                                                placeholder="EMAIL ADDRESS"
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">SUBJECT / PURPOSE</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white border-b border-gray-200 p-4 text-xs font-bold uppercase tracking-widest focus:border-red-700 focus:ring-0 outline-none transition-all placeholder:text-gray-500"
                                            placeholder="GIVE BRIEF ABOUT YOUR PURPOSE"
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">DISCOURSE / MESSAGE</label>
                                        <textarea
                                            required
                                            rows="5"
                                            className="w-full bg-white border border-gray-100 p-6 text-sm font-serif italic text-slate-900 focus:border-red-700/30 focus:ring-0 outline-none transition-all placeholder:text-gray-500"
                                            placeholder="EXPLAIN FURTHER..."
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer bg-slate-900 hover:bg-red-700 text-white py-6 text-[11px] font-bold uppercase tracking-[0.4em] transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center space-x-3"
                                    >
                                        <Send size={14} />
                                        <span>Authorize Transaction</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Bureaus */}
            <section className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-20 md:mb-32">
                        <p className="text-red-700 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 italic">Global Reach</p>
                        <h2 className="text-4xl md:text-6xl font-black font-serif italic tracking-tighter leading-tight">
                            International Hubs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="space-y-8">
                            <div className="w-12 h-0.5 bg-red-700"></div>
                            <h3 className="text-2xl font-serif italic font-bold">New York</h3>
                            <div className="space-y-4 text-gray-600 text-sm font-serif italic">
                                <p className="flex items-center space-x-4">
                                    <MapPin size={16} className="text-red-700" />
                                    <span>Financial District, NY 10005, USA</span>
                                </p>
                                <p className="flex items-center space-x-4">
                                    <Phone size={16} className="text-red-700" />
                                    <span>+1 (212) 555-0198</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="w-12 h-0.5 bg-red-700"></div>
                            <h3 className="text-2xl font-serif italic font-bold">London</h3>
                            <div className="space-y-4 text-gray-600 text-sm font-serif italic">
                                <p className="flex items-center space-x-4">
                                    <MapPin size={16} className="text-red-700" />
                                    <span>Fleet Street, London EC4Y, UK</span>
                                </p>
                                <p className="flex items-center space-x-4">
                                    <Phone size={16} className="text-red-700" />
                                    <span>+44 20 7946 0123</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 border-t border-white/5 md:border-t-0 pt-16 md:pt-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-8">Follow The Pulse</p>
                            <div className="flex space-x-8">
                                <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-red-700 transition-all group">
                                    <Instagram size={20} className="text-gray-600 group-hover:text-white" />
                                </a>
                                <a href="https://x.com/Nexora_News" target='_blank' className="p-4 rounded-full border border-white/10 hover:bg-red-700 transition-all group">
                                    <Twitter size={20} className="text-gray-600 group-hover:text-white" />
                                </a>
                                <a href="https://www.linkedin.com/in/nexora-news" target='_blank' className="p-4 rounded-full border border-white/10 hover:bg-red-700 transition-all group">
                                    <Linkedin size={20} className="text-gray-600 group-hover:text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-700/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            </section>
        </div>
    );
};

export default Contact;

