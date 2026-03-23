import SEO from '../components/SEO';
import { Shield, Eye, Lock, Globe, Bell, FileText, UserCheck, ShieldAlert } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="container py-3xl">
            <SEO 
                title="Privacy Policy" 
                description="Our commitment to transparency, security, and your right to privacy at NexoraNews." 
            />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className="inline-block p-lg bg-accent/5 text-accent rounded-2xl mb-xl">
                        <Shield size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl mb-md">Privacy Policy</h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        At NexoraNews, we value your trust above all else. This policy outlines our rigorous standards for data protection and transparency.
                    </p>
                    <div className="mt-xl border-t flex flex-wrap justify-center gap-xl text-xs font-bold uppercase tracking-widest text-muted" style={{ paddingTop: "10px" }}>
                        <span className="flex items-center gap-xs"><FileText size={14} /> Version 2.1</span>
                        <span className="flex items-center gap-xs"><Globe size={14} /> Global Standard</span>
                        <span className="flex items-center gap-xs"><Bell size={14} /> Updated: March 23, 2026</span>
                    </div>
                </header>

                <div className="flex flex-col gap-xl">
                    {/* Introduction */}
                    <section className="p-2xl rounded-3xl border border-white/20">
                        <h2 className="text-3xl font-serif mb-6 flex items-center gap-md">
                            <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-sans" style={{ padding: "5px 6px" }}>01</span>
                            Our Philosophy
                        </h2>
                        <div className="prose prose-lg text-slate-700 leading-relaxed">
                            <p className="mb-6">
                                We believe privacy is a fundamental human right. In an era of pervasive digital tracking, NexoraNews stands as a bastion for user agency. Our relationship with our global audience is built on the bedrock of editorial independence and ethical data handling.
                            </p>
                            <p>
                                We operate on a principle of **Data Minimalism**: we only collect what is strictly necessary to deliver high-quality journalism and a seamless user experience.
                            </p>
                        </div>
                    </section>

                    {/* Data Collection */}
                    <section className="p-xl md:p-2xl">
                        <h2 className="text-3xl font-serif mb-xl flex items-center gap-md">
                            <Globe className="text-accent" /> Information We Process
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-xl">
                            <div className="p-lg bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-lg">
                                    <UserCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-md">Active Input</h3>
                                <p className="text-muted text-sm leading-relaxed mb-lg">Information you explicitly share with our newsroom.</p>
                                <ul className="flex flex-col gap-sm text-sm font-medium">
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Account & Subscription Details
                                    </li>
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Newsletter Preferences
                                    </li>
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Commentary & Feedback
                                    </li>
                                </ul>
                            </div>

                            <div className="p-lg bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-lg">
                                    <Eye size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-md">Passive Metrics</h3>
                                <p className="text-muted text-sm leading-relaxed mb-lg">Technological metadata used to optimize delivery.</p>
                                <ul className="flex flex-col gap-sm text-sm font-medium">
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Anonymized Device Identifiers
                                    </li>
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Regional Localization (IP)
                                    </li>
                                    <li className="flex items-center gap-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                        Engagement Analytics
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Security Measures */}
                    <section className="p-2xl rounded-3xl border border-white/20 bg-gradient-to-br from-white to-slate-50">
                        <h2 className="text-3xl font-serif mb-xl flex items-center gap-md">
                            <Lock className="text-accent" /> Security Infrastructure
                        </h2>
                        <p className="mb-xl text-lg text-slate-700">
                            Our platform is fortified with enterprise-grade security protocols to ensure your data remains confidential and tamper-proof.
                        </p>
                        
                        <div className="grid sm:grid-cols-3 gap-lg">
                            <div className="text-center">
                                <div className="text-accent font-bold text-3xl mb-xs">AES-256</div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Encryption</p>
                            </div>
                            <div className="text-center">
                                <div className="text-accent font-bold text-3xl mb-xs">24/7</div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Monitoring</p>
                            </div>
                            <div className="text-center">
                                <div className="text-accent font-bold text-3xl mb-xs">SOC2</div>
                                <p className="text-xs uppercase tracking-widest text-muted font-bold">Compliance</p>
                            </div>
                        </div>
                    </section>

                    {/* Rights */}
                    <section className="p-xl md:p-2xl rounded-3xl">
                        <h2 className="text-3xl font-serif mb-xl flex items-center gap-md">
                            <ShieldAlert className="text-accent" /> Your Global Rights
                        </h2>
                        <p className="mb-xl text-slate-300">
                            Regardless of where you reside, NexoraNews provides a baseline of protection that aligns with current international standards (GDPR, CCPA).
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-xl">
                            <div className="flex gap-md">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <span className="font-bold">A</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-xs">Right to Access</h4>
                                    <p className="text-sm text-slate-400">Request a full export of your personal profile data.</p>
                                </div>
                            </div>
                            <div className="flex gap-md">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <span className="font-bold">E</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-xs">Right to Erasure</h4>
                                    <p className="text-sm text-slate-400">Request permanent deletion of your account and history.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="text-center py-xl">
                        <h2 className="text-2xl font-serif mb-lg text-primary">Need Clarification?</h2>
                        <p className="text-muted mb-xl">Direct any inquiries regarding this policy or your data rights to our dedicated privacy desk.</p>
                        <div className="flex flex-col items-center gap-sm p-xl border rounded-3xl">
                            <div className="text-left">
                                <p className="font-bold text-primary">Privacy Desk — NexoraNews</p>
                                <p className="text-sm text-muted">Email: nexoranews1@gmail.com</p>
                            </div>
                            <div className="h-px w-10 md:w-px md:h-10 bg-slate-200"></div>
                            <a href="mailto:nexoranews1@gmail.com" className="btn btn-primary px-2xl">
                                Contact Privacy Officer
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

