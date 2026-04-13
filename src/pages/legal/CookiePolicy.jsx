/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    ShieldCheck,
    PieChart,
    Target,
    Check,
    ChevronRight,
    ArrowRight,
    Info,
    FileText,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="group flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-red-700 transition-all duration-300 py-3 border-b border-gray-50 last:border-0"
        >
            <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-red-700">
                <ChevronRight size={12} strokeWidth={3} />
            </span>
            {children}
        </a>
    </li>
);

const ClassificationCard = ({ icon: Icon, title, description, badge, status, onToggle, mandatory = false }) => (
    <div className="bg-white border border-gray-100 p-8 mb-6 group hover:border-red-700 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-slate-900 group-hover:bg-red-700 group-hover:text-white transition-all duration-500 shrink-0">
                    <Icon size={20} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-serif italic font-black text-slate-900 tracking-tight uppercase">
                            {title}
                        </h3>
                        {mandatory && (
                            <span className="text-[8px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 uppercase tracking-widest">Mandatory</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xl">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex items-center self-end md:self-auto">
                {mandatory ? (
                    <div className="flex items-center space-x-2 text-red-700">
                        <Check size={16} strokeWidth={3} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Active</span>
                    </div>
                ) : (
                    <div
                        onClick={() => onToggle(!status)}
                        className={`w-12 h-6 rounded-full relative transition-all duration-500 p-1 cursor-pointer ${status ? 'bg-red-700' : 'bg-gray-200'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-sm ${status ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const CookiePolicy = () => {
    const [preferences, setPreferences] = useState({
        analytics: true,
        marketing: false
    });

    const togglePreference = (key, val) => {
        setPreferences(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="bg-white min-h-screen pt-14 md:pt-32 pb-20">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-700 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-950 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-40">
                            <p className="text-[10px] font-bold text-red-700 uppercase tracking-[0.4em] mb-10 pb-4 border-b-2 border-red-700 inline-block">
                                Table of Contents
                            </p>
                            <nav className="mb-16">
                                <ul className="space-y-0">
                                    <SidebarLink href="#what-are-cookies">What are Cookies</SidebarLink>
                                    <SidebarLink href="#how-we-use">How we use them</SidebarLink>
                                    <SidebarLink href="#choices">Your Choices</SidebarLink>
                                    <SidebarLink href="#list">Detailed Cookie List</SidebarLink>
                                </ul>
                            </nav>

                            {/* Quote block */}
                            <div className="p-8 bg-gray-50 border border-gray-100 relative group">
                                <div className="absolute top-0 left-0 w-1 h-0 bg-red-700 group-hover:h-full transition-all duration-700"></div>
                                <p className="text-sm font-serif italic text-gray-500 leading-relaxed mb-8">
                                    "Our commitment to privacy is as rigorous as our commitment to investigative journalism."
                                </p>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                                        alt="Eleanor Vance"
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                    <div>
                                        <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">Eleanor Vance</h5>
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Legal Counsel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <header className="mb-10">
                            <span className="inline-block px-4 py-1.5 bg-red-700 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-10">
                                Legal Transparency
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black font-serif italic text-slate-900 tracking-tighter leading-none mb-12">
                                Cookie Policy
                            </h1>
                            <p className="text-xl md:text-2xl font-serif text-slate-700 italic leading-relaxed mb-12 max-w-4xl">
                                The Daily Pulse uses cookies and similar technologies to help provide, protect, and improve our services. This policy explains how and why we use these technologies and the choices you have.
                            </p>
                            <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-t border-b border-gray-100 py-6">
                                <div className="flex items-center">
                                    <FileText size={14} className="mr-2 text-red-700" />
                                    <span>Effective Date: May 14, 2026</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={14} className="mr-2 text-red-700" />
                                    <span>8 Minute Read</span>
                                </div>
                            </div>
                        </header>

                        <section id="what-are-cookies" className="mb-32 scroll-mt-40">
                            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                                When you visit our digital property, we and certain third parties may use cookies and related technologies to store or retrieve information on your browser. This information might be about you, your preferences, or your device and is mostly used to make the site work as you expect it to.
                            </p>
                        </section>

                        <section id="how-we-use" className="mb-32 scroll-mt-40">
                            <div className="mb-16">
                                <h2 className="text-4xl font-serif italic font-black text-slate-900 tracking-tight uppercase mb-8">
                                    Classification of Technologies
                                </h2>
                                <div className="w-16 h-1 bg-red-700 mb-12"></div>
                            </div>

                            <div className="space-y-6">
                                <ClassificationCard
                                    icon={ShieldCheck}
                                    title="Strictly Necessary"
                                    description="These cookies are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services."
                                    mandatory={true}
                                />
                                <ClassificationCard
                                    icon={PieChart}
                                    title="Analytics & Performance"
                                    description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular."
                                    status={preferences.analytics}
                                    onToggle={(val) => togglePreference('analytics', val)}
                                />
                                <ClassificationCard
                                    icon={Target}
                                    title="Targeting & Marketing"
                                    description="These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites."
                                    status={preferences.marketing}
                                    onToggle={(val) => togglePreference('marketing', val)}
                                />
                            </div>
                        </section>

                        <section id="choices" className="mb-32 scroll-mt-40">
                            <div className="bg-slate-950 p-12 md:p-16 relative overflow-hidden text-center group">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-red-700/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-red-700/20 transition-all duration-1000"></div>
                                <h3 className="text-3xl md:text-5xl font-black font-serif italic text-white mb-6 relative z-10">Take Control of Your Data</h3>
                                <p className="text-gray-400 font-serif italic text-lg max-w-2xl mx-auto mb-12 relative z-10">
                                    You can change your cookie preferences at any time. Clicking "Save Preferences" will update your consent status immediately across all our platforms.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                                    <button className="w-full sm:w-auto bg-white text-slate-950 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-red-700 hover:text-white transition-all duration-500">
                                        Save All Preferences
                                    </button>
                                    <button className="w-full sm:w-auto border border-white/20 text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all duration-500">
                                        Reject Non-Essential
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section id="list" className="scroll-mt-40">
                            <div className="mb-16">
                                <h2 className="text-4xl font-serif italic font-black text-slate-900 tracking-tight uppercase mb-8">
                                    Detailed Cookie List
                                </h2>
                                <div className="w-16 h-1 bg-red-700"></div>
                            </div>

                            <div className="overflow-x-auto border border-gray-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Cookie Name</th>
                                            <th className="text-left py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Provider</th>
                                            <th className="text-left py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Purpose</th>
                                            <th className="text-left py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { name: '_ga', provider: 'Google Analytics', purpose: 'Used to distinguish users', duration: '2 Years' },
                                            { name: '_pulse_auth', provider: 'The Daily Pulse', purpose: 'Maintains secure session for subscribers', duration: 'Session' },
                                            { name: 'ad_retarget_id', provider: 'DoubleClick', purpose: 'Tracks marketing conversion rates', duration: '3 Months' },
                                            { name: 'opt_consent', provider: 'OneTrust', purpose: 'Stores user consent preferences', duration: '1 Year' }
                                        ].map((cookie, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-6 px-8 text-[11px] font-bold text-slate-900 font-mono">{cookie.name}</td>
                                                <td className="py-6 px-8 text-[11px] font-medium text-gray-600">{cookie.provider}</td>
                                                <td className="py-6 px-8 text-[11px] font-medium text-gray-600 font-serif italic">{cookie.purpose}</td>
                                                <td className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{cookie.duration}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <style>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default CookiePolicy;
