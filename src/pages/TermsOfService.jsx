import SEO from '../components/SEO';
import { Scale, CheckCircle, AlertCircle, FileText, ShieldCheck, Gavel, Hammer } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="container py-3xl">
            <SEO
                title="Terms of Service"
                description="The legal framework and community standards for accessing NexoraNews journalism."
            />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className="inline-block p-lg bg-accent/5 text-accent rounded-2xl mb-xl">
                        <Scale size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl mb-md">Terms of Service</h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Establishing a clear legal framework for our independent journalism and your engagement with our platform.
                    </p>
                    <div className="mt-xl pt-lg border-t flex flex-wrap justify-center gap-xl text-xs font-bold uppercase tracking-widest text-muted">
                        <span className="flex items-center gap-xs"><FileText size={14} /> Version 1.5</span>
                        <span className="flex items-center gap-xs"><ShieldCheck size={14} /> Verified Legal</span>
                        <span className="flex items-center gap-xs"><Hammer size={14} /> Updated: March 23, 2026</span>
                    </div>
                </header>

                <div className="flex flex-col gap-xl">
                    {/* Urgency/Notice */}
                    <div className="p-xl bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl flex gap-xl items-start shadow-sm">
                        <AlertCircle className="text-amber-600 shrink-0 mt-1" size={28} />
                        <div>
                            <h3 className="font-bold text-amber-900 mb-xs">Binding Agreement</h3>
                            <p className="text-amber-800 leading-relaxed text-sm">
                                By accessing or using NexoraNews, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must cease use of our services immediately.
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <section className="glass p-2xl rounded-3xl border border-white/20 shadow-xl">
                        <h2 className="text-3xl font-serif mb-6 flex items-center gap-md">
                            <Gavel className="text-accent" /> 1. Intellectual Property
                        </h2>
                        <div className="prose prose-lg text-slate-700 leading-relaxed">
                            <p className="mb-6">
                                All materials published on NexoraNews—including articles, photographs, videos, layout designs, and trademarks—are protected by international copyright and intellectual property laws.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-lg mt-8">
                                <div className="p-lg bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold mb-md flex items-center gap-sm">
                                        <CheckCircle size={18} className="text-green-600" /> Permitted Use
                                    </h4>
                                    <p className="text-xs text-muted leading-relaxed">
                                        Personal, non-commercial reading and sharing via standard social media tools provided on the site.
                                    </p>
                                </div>
                                <div className="p-lg bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold mb-md flex items-center gap-sm">
                                        <AlertCircle size={18} className="text-red-600" /> Prohibited Use
                                    </h4>
                                    <p className="text-xs text-muted leading-relaxed">
                                        Automated scraping, AI training, or commercial redistribution without written licensing agreements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* User Conduct */}
                    <section className="p-xl md:p-2xl bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-serif mb-lg">2. Community Standards</h2>
                        <p className="mb-lg text-slate-600 leading-relaxed">
                            We encourage vigorous debate but maintain a zero-tolerance policy for harassment, hate speech, or the spread of demonstrably false information.
                        </p>
                        <div className="flex flex-col gap-md">
                            <div className="flex gap-md items-center p-md bg-slate-50 rounded-xl">
                                <CheckCircle className="text-accent" size={20} />
                                <span className="text-sm font-medium">Respectful Discourse</span>
                            </div>
                            <div className="flex gap-md items-center p-md bg-slate-50 rounded-xl">
                                <CheckCircle className="text-accent" size={20} />
                                <span className="text-sm font-medium">Original Contributions</span>
                            </div>
                            <div className="flex gap-md items-center p-md bg-slate-50 rounded-xl">
                                <CheckCircle className="text-accent" size={20} />
                                <span className="text-sm font-medium">Account Security Responsibility</span>
                            </div>
                        </div>
                    </section>

                    {/* Liability */}
                    <section className="glass p-2xl rounded-3xl border border-white/20 shadow-xl bg-primary">
                        <h2 className="text-3xl font-serif mb-xl">3. Limitation of Liability</h2>
                        <p className="mb-lg text-slate-300 leading-relaxed">
                            NexoraNews provides journalism "as is." While our editorial team strives for absolute factual accuracy and integrity, we offer no warranties regarding the completeness or timeliness of information.
                        </p>
                        <p className="text-sm text-slate-400 italic">
                            In no event shall NexoraNews Media Group be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
                        </p>
                    </section>

                    {/* Legal Contact */}
                    <section className="text-center py-xl">
                        <h2 className="text-2xl font-serif mb-lg text-primary">Legal Inquiries</h2>
                        <p className="text-muted mb-xl">For licensing requests or formal legal notices, please reach out to our counsel.</p>
                        <div className="flex items-center justify-center gap-md p-md bg-slate-50 rounded-full pr-lg border border-slate-200">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center" style={{ padding: "5px" }}>
                                <Scale size={18} />
                            </div>
                            <span className="font-bold text-sm">nexoranews.dpdns.org</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;

