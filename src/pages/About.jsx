/* eslint-disable no-unused-vars */
import React from 'react';
import { Globe, Shield, Zap, Target, BookOpen, Users } from 'lucide-react';
import SEO from '../components/common/SEO';
import intelligenceMap from "/assets/nexoranews_intelligence_map.png";
import nexoraNewsAboutHero from "/assets/nexoranews_about_hero.png";

const ValueCard = ({ icon: Icon, title, description }) => (
    <div className="group border border-gray-100 p-8 md:p-10 hover:border-red-700 transition-all duration-700 bg-white shadow-sm hover:shadow-2xl">
        <div className="w-12 h-12 bg-red-50 flex items-center justify-center text-red-700 mb-8 group-hover:bg-red-700 group-hover:text-white transition-all duration-700">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-serif italic font-black text-slate-900 mb-4 tracking-tight uppercase">
            {title}
        </h3>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
            {description}
        </p>
    </div>
);

const About = () => {
    return (
        <div className="bg-white">
            <SEO 
                title="About Us"
                description="Learn about Nexora News, our mission for editorial excellence, and the team behind the pulse of global journalism."
            />
            <section className="relative h-[70vh] md:h-[85vh] flex items-center overflow-hidden">
                <img
                    src={nexoraNewsAboutHero}
                    alt="Nexora News Global Headquarters"
                    className="absolute inset-0 w-full h-full object-cover object-[50%_25%] grayscale blur-sm scale-110 transition-all duration-[1000ms] will-change-transform"
                    loading='lazy'
                    fetchPriority='high'
                    onLoad={(e) => {
                        e.currentTarget.classList.remove('blur-sm', 'grayscale', 'scale-110');
                    }}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1.5 bg-red-700 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-10 animate-in fade-in slide-in-from-left-4 duration-1000">
                            The Architecture of Intelligence
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black font-serif italic text-white tracking-widest leading-none mb-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                            Nexora <br /> News
                        </h1>
                        <p className="text-xl md:text-2xl font-serif text-gray-300 italic leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000 delay-500">
                            Beyond the immediacy of the digital stream, we build the frameworks of global understanding.
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-2 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em] vertical-text animate-bounce">Explore</span>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-red-700 to-transparent"></div>
                </div>
            </section>

            <section className="py-12 md:py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <p className="text-red-700 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Our Manifesto</p>
                            <h2 className="text-4xl md:text-6xl font-black font-serif italic text-slate-900 tracking-tighter leading-tight mb-12">
                                In an era of velocity, we prioritize <span className="text-gray-300">depth.</span>
                            </h2>
                        </div>
                        <div className="space-y-10">
                            <p className="text-2xl font-serif text-slate-700 leading-relaxed italic">
                                "The modern headline is a signal, but information requires intent. Nexora News was founded on the principle that data without context is mere noise."
                            </p>
                            <div className="flex items-center space-x-6 pt-10 border-t border-gray-100">
                                <div className="text-center">
                                    <p className="text-3xl font-black font-serif italic text-red-700">12M+</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Monthly Intelligence</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black font-serif italic text-red-700">140+</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Global Contributors</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black font-serif italic text-red-700">5</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">International Hubs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 bg-[#FBFBFB]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                        <p className="text-red-700 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">The Pillars of Operation</p>
                        <h2 className="text-4xl md:text-6xl font-black font-serif italic text-slate-900 tracking-tighter leading-tight">
                            The Framework of Our Narrative
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <ValueCard
                            icon={Shield}
                            title="Integrity"
                            description="Unwavering commitment to objective reportage and verified intelligence."
                        />
                        <ValueCard
                            icon={Globe}
                            title="Ubiquity"
                            description="A global perspective, localized for maximum resonance and relevance."
                        />
                        <ValueCard
                            icon={Zap}
                            title="Velocity"
                            description="Real-time reporting without sacrificing the depth of archival truth."
                        />
                        <ValueCard
                            icon={Target}
                            title="Precision"
                            description="Surgical accuracy in every briefing, analysis, and visual report."
                        />
                        <ValueCard
                            icon={BookOpen}
                            title="Education"
                            description="Empowering our readers to decode the complex systems of our world."
                        />
                        <ValueCard
                            icon={Users}
                            title="Humanity"
                            description="Stories at the intersection of technological shift and human spirit."
                        />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="bg-slate-950 p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-700/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter leading-tight mb-10">
                                    Join the Global <br /> <span className="text-red-700">Intelligence Briefing.</span>
                                </h2>
                                <p className="text-lg font-serif text-gray-400 italic leading-relaxed mb-12 max-w-md">
                                    Subscribe to our weekly editorial digest and receive the most significant reports directly to your desk.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        placeholder="PROFESSIONAL EMAIL"
                                        className="bg-white/5 border border-white/10 p-5 font-bold text-[10px] text-white tracking-widest uppercase focus:ring-1 focus:ring-red-700 outline-none flex-1"
                                    />
                                    <button className="bg-red-700 hover:bg-red-800 text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all">
                                        Authorize
                                    </button>
                                </div>
                            </div>
                            <div className="hidden lg:block relative">
                                <div className="aspect-square w-full max-w-md mx-auto relative group">
                                    <div className={`absolute inset-0 border border-white/10 ${!intelligenceMap && 'rounded-full'} scale-110`}></div>
                                    <div className={`absolute inset-0 border border-red-700/20 ${!intelligenceMap && 'rounded-full'} scale-125 animate-pulse-slow`}></div>

                                    <div className="relative w-full h-full overflow-hidden border border-white/10 p-2 bg-slate-900/50 backdrop-blur-3xl shadow-2xl shadow-red-700/10">
                                        <img
                                            src={intelligenceMap}
                                            alt="Global Intelligence Network"
                                            className={`w-full h-full ${!intelligenceMap && 'rounded-full'} opacity-60 group-hover:opacity-100 transition-opacity duration-1000 object-contain object-[center_top] grayscale hover:grayscale-0`}
                                            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                                            loading='lazy'
                                            fetchPriority='high'
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
                                            }}
                                        />

                                        {/* Scanner Beam Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-700/20 to-transparent h-1/2 w-full animate-scan pointer-events-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
                .animate-spin-slow {
                    animation: spin 60s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200%); opacity: 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scale(1.25); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default About;
