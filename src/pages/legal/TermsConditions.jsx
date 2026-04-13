import React from 'react';
import { 
    Gavel, 
    ShieldAlert, 
    FileSignature, 
    Scale, 
    UserPlus, 
    AlertTriangle, 
    Clock, 
    CheckCircle2,
    ArrowRight,
    ChevronRight,
    Globe,
    Cpu
} from 'lucide-react';

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

const SectionHeader = ({ badge, title, subtitle }) => (
    <div className="mb-12">
        <span className="inline-block px-3 py-1 bg-red-700 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-6">
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

const TermsCard = ({ icon: Icon, title, description }) => (
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
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {description}
        </p>
    </div>
);

const TermsConditions = () => {
    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            {/* Background Aesthetic Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-700 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-950 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Sticky Sidebar Navigation */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-40">
                            <p className="text-[10px] font-bold text-red-700 uppercase tracking-[0.4em] mb-10 pb-4 border-b-2 border-red-700 inline-block">
                                Clauses
                            </p>
                            <nav>
                                <ul className="space-y-0">
                                    <SidebarLink href="#agreement">Agreement</SidebarLink>
                                    <SidebarLink href="#usage">Usage License</SidebarLink>
                                    <SidebarLink href="#disclaimer">Disclaimer</SidebarLink>
                                    <SidebarLink href="#limitations">Limitations</SidebarLink>
                                    <SidebarLink href="#modifications">Modifications</SidebarLink>
                                    <SidebarLink href="#governing-law">Governing Law</SidebarLink>
                                </ul>
                            </nav>
                            
                            <div className="mt-16 p-8 bg-slate-900 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 bg-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <h4 className="text-xs font-serif font-black italic uppercase tracking-widest mb-4">Legal Notice</h4>
                                <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
                                    Nexora News operates under strict global editorial and legal frameworks.
                                </p>
                                <div className="w-10 h-1 bg-red-700"></div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-9">
                        
                        {/* Header Section */}
                        <header className="mb-20">
                            <span className="inline-block px-4 py-1.5 bg-red-700 text-white text-[9px] font-bold uppercase tracking-[0.4em] mb-10 animate-in fade-in slide-in-from-left-4 duration-1000">
                                Binding Contract
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black font-serif italic text-slate-900 tracking-tighter leading-none mb-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                                Terms & <br /> Conditions
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-t border-b border-gray-100 py-6 animate-in fade-in slide-in-from-left-12 duration-1000 delay-500">
                                <div className="flex items-center">
                                    <Clock size={14} className="mr-2 text-red-700" />
                                    <span>Effective Date: April 09, 2024</span>
                                </div>
                                <div className="flex items-center">
                                    <Scale size={14} className="mr-2 text-red-700" />
                                    <span>Global Jurisdiction</span>
                                </div>
                            </div>
                        </header>

                        {/* Agreement to Terms */}
                        <section id="agreement" className="mb-32 scroll-mt-40">
                            <p className="text-2xl md:text-3xl font-serif text-slate-700 italic leading-relaxed mb-12">
                                By accessing Nexora News, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms govern your interaction with our intelligence platform.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 border border-gray-100 bg-gray-50/50">
                                    <h4 className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-4">Digital Consent</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                        Use of our services constitutes automated agreement to the latest version of these terms. If you do not agree to these terms, please discontinue use immediately.
                                    </p>
                                </div>
                                <div className="p-8 border border-gray-100 bg-gray-50/50">
                                    <h4 className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-4">Account Integrity</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                        Users are responsible for maintaining the confidentiality of their credentials and for all activities that occur under their intelligence briefing account.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Usage License */}
                        <section id="usage" className="mb-32 scroll-mt-40">
                            <SectionHeader 
                                badge="Intellectual Property"
                                title="Usage License" 
                                subtitle="The architectural framework and investigative content of Nexora News are protected by international copyright laws."
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <TermsCard 
                                    icon={Globe}
                                    title="Personal Use"
                                    description="Permission is granted to temporarily download one copy of the materials on Nexora News for personal, non-commercial transitory viewing only."
                                />
                                <TermsCard 
                                    icon={Cpu}
                                    title="Prohibited Acts"
                                    description="Automation of data extraction (scraping), reverse engineering of our algorithms, or unauthorized redistribution of premium reports is strictly forbidden."
                                />
                            </div>

                            <div className="bg-red-700 p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="text-white">
                                        <h4 className="text-xl font-serif font-black italic mb-4">Commercial Licensing</h4>
                                        <p className="text-red-100 text-sm leading-relaxed max-w-md">
                                            For institutional access, syndicated content, or corporate intelligence distribution, a separate Commercial License is required.
                                        </p>
                                    </div>
                                    <a href="/contact" className="ml-auto bg-white text-red-700 px-8 py-4 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap hover:bg-slate-900 hover:text-white transition-all duration-500">
                                        Request Quote
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <section id="disclaimer" className="mb-32 scroll-mt-40">
                            <SectionHeader 
                                badge="Advisory"
                                title="Disclaimer" 
                                subtitle="The content provided by Nexora News is for informational purposes only and does not constitute financial, legal, or professional advice."
                            />

                            <div className="space-y-8">
                                {[
                                    { icon: AlertTriangle, title: 'No Warranties', text: 'The materials on Nexora News are provided "as is". Nexora News makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability.' },
                                    { icon: ShieldAlert, title: 'Accuracy of Materials', text: 'While we strive for precision, the materials appearing on Nexora News could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete or current.' }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-8 p-8 border border-gray-100 hover:border-red-700 transition-colors duration-500">
                                        <div className="shrink-0 text-red-700">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Limitations */}
                        <section id="limitations" className="mb-32 scroll-mt-40">
                            <SectionHeader 
                                badge="Liability"
                                title="Limitations" 
                                subtitle="Nexora News and its contributors shall not be held liable for any damages arising out of the use or inability to use the materials."
                            />

                            <div className="bg-slate-900 p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-700/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 text-sm italic font-serif leading-relaxed">
                                    <p>
                                        In no event shall Nexora News or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) even if Nexora News or a Nexora News authorized representative has been notified orally or in writing of the possibility of such damage.
                                    </p>
                                    <p>
                                        Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Governance */}
                        <section id="governing-law" className="scroll-mt-40">
                            <SectionHeader 
                                badge="Compliance"
                                title="Governing Law" 
                                subtitle="These terms and conditions are governed by and construed in accordance with the laws of international editorial standards."
                            />

                            <div className="flex flex-col md:flex-row gap-8 items-stretch mb-20">
                                <div className="flex-1 p-10 border border-gray-100 text-center flex flex-col items-center group hover:bg-gray-50 transition-colors">
                                    <Gavel size={32} className="text-red-700 mb-6 group-hover:scale-110 transition-transform duration-500" />
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Jurisdiction</h5>
                                    <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest italic">
                                        Any claim relating to Nexora News' website shall be governed by global digital rights laws without regard to its conflict of law provisions.
                                    </p>
                                </div>
                                <div className="flex-1 p-10 border border-gray-100 text-center flex flex-col items-center group hover:bg-gray-50 transition-colors">
                                    <FileSignature size={32} className="text-red-700 mb-6 group-hover:scale-110 transition-transform duration-500" />
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Updates</h5>
                                    <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest italic">
                                        Nexora News may revise these terms at any time without notice. By using this website you are agreeing to be bound by the then current version.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-950 p-12 md:p-20 relative overflow-hidden text-center">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center grayscale"></div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-black font-serif italic text-white mb-8">Ready to proceed with integrity?</h3>
                                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                                        <button className="bg-red-700 hover:bg-red-800 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all">
                                            Return Home
                                        </button>
                                        <a href="mailto:legal@nexoranews.com" className="bg-white/5 border border-white/10 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center">
                                            Legal Desk <ArrowRight size={12} className="ml-3" />
                                        </a>
                                    </div>
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
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
            `}</style>
        </div>
    );
};

export default TermsConditions;
