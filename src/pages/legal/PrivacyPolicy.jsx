/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Lock,
    Database,
    UserCheck,
    FileText,
    Download,
    RefreshCcw,
    Trash2,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const SidebarLink = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="group flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-red-700 transition-all duration-300 py-3 border-b border-gray-50 last:border-0"
        >
            <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-red-700">
                <ChevronRight size={12} strokeWidth={3} />
            </span>
            {children}
        </a>
    </li>
);

const SectionHeader = ({ badge, title, subtitle }) => (
    <div className="mb-12">
        <span className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-bold uppercase tracking-[0.4em] mb-6">
            {badge}
        </span>
        <h2 className="text-4xl md:text-5xl font-black font-serif italic text-slate-900 tracking-tighter leading-tight mb-6">
            {title}
        </h2>
        {subtitle && (
            <p className="text-lg font-serif text-gray-500 italic leading-relaxed max-w-2xl">
                {subtitle}
            </p>
        )}
    </div>
);

const InfoCard = ({ icon: Icon, title, description, badge }) => (
    <div className="group bg-white border border-gray-100 p-8 md:p-10 hover:border-red-700 transition-all duration-700 shadow-sm hover:shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={80} strokeWidth={1} />
        </div>
        <div className="w-12 h-12 bg-red-50 flex items-center justify-center text-red-700 mb-8 group-hover:bg-red-700 group-hover:text-white transition-all duration-700">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-serif italic font-black text-slate-900 mb-4 tracking-tight uppercase">
            {title}
        </h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
            {description}
        </p>
        {badge && (
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 group-hover:bg-red-700 group-hover:text-white transition-colors">
                {badge}
            </span>
        )}
    </div>
);

const CookieToggle = ({ label, description, status, alwaysActive = false }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-gray-100 bg-white mb-4 group hover:border-red-700 transition-all duration-500">
        <div className="mb-4 sm:mb-0">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1">{label}</h4>
            <p className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">{description}</p>
        </div>
        <div className="flex items-center">
            {alwaysActive ? (
                <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Always Active</span>
            ) : (
                <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 p-1 cursor-pointer ${status ? 'bg-red-700' : 'bg-gray-200'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 ${status ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
            )}
        </div>
    </div>
);

const PrivacyPolicy = () => {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <SEO 
                title="Privacy Policy"
                description="Our commitment to your data security and privacy at Nexora News."
            />
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-700 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-950 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-40">
                            <p className="text-[10px] font-bold text-red-700 uppercase tracking-[0.4em] mb-10 pb-4 border-b-2 border-red-700 inline-block">
                                Contents
                            </p>
                            <nav>
                                <ul className="space-y-0">
                                    <SidebarLink href="#introduction">Introduction</SidebarLink>
                                    <SidebarLink href="#collection">Information We Collect</SidebarLink>
                                    <SidebarLink href="#usage">How We Use Your Data</SidebarLink>
                                    <SidebarLink href="#cookies">Cookies Policy</SidebarLink>
                                    <SidebarLink href="#rights">Your Rights</SidebarLink>
                                    <SidebarLink href="#contact">Contact Us</SidebarLink>
                                </ul>
                            </nav>

                            <div className="mt-16 p-8 bg-gray-50 border border-gray-100">
                                <h4 className="text-xs font-serif font-black italic text-slate-900 uppercase tracking-widest mb-4">Need Help?</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed mb-6">
                                    If you have specific questions about how Nexora News protects your data, our privacy officer is available.
                                </p>
                                <Link to="/contact" className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">
                                    Contact Support <ArrowRight size={12} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-9">

                        <header className="mb-20">
                            <span className="inline-block px-4 py-1.5 bg-red-700 text-white text-xs font-bold uppercase tracking-[0.4em] mb-10">
                                Legal Document
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black font-serif italic text-slate-900 tracking-tighter leading-none mb-12">
                                Privacy Policy
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 border-t border-b border-gray-100 py-6">
                                <div className="flex items-center">
                                    <FileText size={14} className="mr-2 text-red-700" />
                                    <span>Last Updated: October 24, 2024</span>
                                </div>
                                <div className="flex items-center">
                                    <RefreshCcw size={14} className="mr-2 text-red-700" />
                                    <span>12 Minute Read</span>
                                </div>
                            </div>
                        </header>

                        <section id="introduction" className="mb-32 scroll-mt-40">
                            <p className="text-2xl md:text-3xl font-serif text-slate-700 italic leading-relaxed mb-12">
                                At Nexora News, your privacy is a cornerstone of our editorial integrity. This policy outlines how we handle your digital footprint with the same care we apply to our journalism.
                            </p>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                                This Privacy Policy describes how we collect, use, and handle your personal information when you use our website, mobile applications, and other online services. We are committed to ensuring that your personal data is protected and used in accordance with the highest ethical standards.
                            </p>
                        </section>

                        <section id="collection" className="mb-32 scroll-mt-40">
                            <SectionHeader
                                badge="Data Sources"
                                title="Information We Collect"
                                subtitle="In order to provide the most relevant intelligence reports, we collect information through several channels."
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <InfoCard
                                    icon={UserCheck}
                                    title="Directly Provided"
                                    description="Account information, newsletter subscriptions, comments, and communication when you reach out to our editorial desk."
                                    badge="User Initiated"
                                />
                                <InfoCard
                                    icon={Database}
                                    title="Automatically Collected"
                                    description="IP addresses, browser types, device identifiers, and patterns of engagement with our articles and features."
                                    badge="System Generated"
                                />
                            </div>

                            <div className="bg-slate-900 p-8 md:p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-red-700/20 transition-colors duration-1000"></div>
                                <div className="relative z-10">
                                    <p className="text-xl font-serif text-gray-500 leading-relaxed text-center italic">
                                        "We never collect sensitive personal data such as political affiliations, religious beliefs, or health information without your explicit, separate consent for specific investigative features."
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="usage" className="mb-32 scroll-mt-40">
                            <SectionHeader
                                badge="Processing"
                                title="How We Use Your Data"
                                subtitle="We process your information to deliver a personalized reading experience and to maintain the technical health of our platform."
                            />

                            <div className="space-y-12">
                                {[
                                    { id: '01', title: 'Personalization', desc: 'Tailoring the "For You" news feed based on your reading history and topical interests.' },
                                    { id: '02', title: 'Communication', desc: 'Sending morning briefings, breaking news alerts, and administrative notifications regarding your account.' },
                                    { id: '03', title: 'Analytics', desc: 'Understanding which investigative series resonate most with our audience to guide our future reporting.' }
                                ].map((item) => (
                                    <div key={item.id} className="flex gap-8 group">
                                        <span className="text-4xl font-serif italic font-black text-gray-100 group-hover:text-red-700 transition-colors duration-500">{item.id}</span>
                                        <div>
                                            <h4 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-20 relative h-[400px] overflow-hidden group cursor-default">
                                <div className="absolute inset-0 bg-slate-950">
                                    <img
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                                        alt="Security"
                                        className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-[2000ms]"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                                <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
                                    <div className="w-16 h-1 bg-red-700 mb-8 animate-pulse"></div>
                                    <h3 className="text-4xl md:text-5xl font-black font-serif italic text-white mb-6">Encryption by Design</h3>
                                    <p className="text-gray-600 font-serif italic text-lg max-w-md leading-relaxed">
                                        Every byte of reader data is encrypted using military-grade AES-256 standards, ensuring your reading habits remain your business alone.
                                    </p>
                                    <div className="mt-8 flex items-center space-x-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border border-slate-900 bg-red-700/20 flex items-center justify-center backdrop-blur-sm">
                                                    <Lock size={12} className="text-white" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">End-to-End Secure Platform</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 p-8">
                                    <div className="w-[200px] h-[200px] border border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
                                        <div className="w-[150px] h-[150px] border border-red-700/20 rounded-full flex items-center justify-center animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="cookies" className="mb-32 scroll-mt-40">
                            <SectionHeader
                                badge="Tracking"
                                title="Cookies Policy"
                                subtitle="We use cookies and similar technologies to enhance your navigation, analyze site usage, and assist in our marketing efforts."
                            />

                            <div className="bg-[#FBFBFB] p-2 md:p-1 border border-gray-100">
                                <CookieToggle
                                    label="Essential Cookies"
                                    description="Required for basic site functionality and security."
                                    status={true}
                                    alwaysActive={true}
                                />
                                <CookieToggle
                                    label="Performance Cookies"
                                    description="Help us measure audience traffic and optimize performance."
                                    status={true}
                                />
                                <CookieToggle
                                    label="Marketing Cookies"
                                    description="Used to deliver more relevant advertisements to you."
                                    status={false}
                                />
                            </div>
                        </section>

                        <section id="rights" className="mb-32 scroll-mt-40">
                            <SectionHeader
                                badge="Governance"
                                title="Your Rights"
                                subtitle="Under various global data protection regulations (including GDPR and CCPA), you have significant rights regarding your data."
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
                                <div className="p-10 text-center border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors group">
                                    <Download size={24} className="mx-auto mb-6 text-red-700 group-hover:scale-110 transition-transform" />
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2">Export</h5>
                                    <p className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">Request a copy of all data we hold about you.</p>
                                </div>
                                <div className="p-10 text-center border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors group">
                                    <RefreshCcw size={24} className="mx-auto mb-6 text-red-700 group-hover:scale-110 transition-transform" />
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2">Correct</h5>
                                    <p className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">Update or rectify any inaccurate personal data.</p>
                                </div>
                                <div className="p-10 text-center hover:bg-gray-50 transition-colors group">
                                    <Trash2 size={24} className="mx-auto mb-6 text-red-700 group-hover:scale-110 transition-transform" />
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2">Delete</h5>
                                    <p className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">Request permanent deletion of your profile.</p>
                                </div>
                            </div>
                        </section>

                        <section id="contact" className="scroll-mt-40">
                            <div className="bg-red-700 p-12 md:p-20 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                                <div className="relative z-10 max-w-xl mb-10 md:mb-0">
                                    <h2 className="text-2xl md:text-3xl font-black font-serif italic mb-6">Have questions about your data?</h2>
                                    <p className="text-red-100 font-medium">
                                        Our legal and data protection team is here to provide clarity and ensure your rights are respected.
                                    </p>
                                </div>
                                <div className="relative z-10">
                                    <a
                                        href="mailto:privacy@nexoranews.com"
                                        className="inline-block bg-white text-red-700 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all duration-500 mb-4"
                                    >
                                        Email Our DPO
                                    </a>
                                    <p className="text-xs font-bold uppercase tracking-widest text-red-200">Response within 24 hours</p>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <style>{`
                html {
                    scroll-behavior: smooth;
                }
                .animate-spin-slow {
                    animation: spin 30s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PrivacyPolicy;

