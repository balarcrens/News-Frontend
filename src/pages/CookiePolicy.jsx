import SEO from '../components/SEO';
import { Info, Settings, PieChart, ShieldCheck, Cookie, Fingerprint, EyeOff, Search } from 'lucide-react';

const CookiePolicy = () => {
    return (
        <div className="container py-3xl">
            <SEO 
                title="Cookie Policy" 
                description="Understanding how NexoraNews uses cookies and tracking technologies to enhance your journalism experience." 
            />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className="inline-block p-lg bg-accent/5 text-accent rounded-2xl mb-xl">
                        <Cookie size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl mb-md">Cookie Policy</h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Explaining our use of tracking technologies and how you can manage your digital footprint on our platform.
                    </p>
                    <div className="mt-xl border-t flex flex-wrap justify-center gap-xl text-xs font-bold uppercase tracking-widest text-muted" style={{ paddingTop: "10px" }}>
                        <span className="flex items-center gap-xs"><Info size={14} /> Version 1.2</span>
                        <span className="flex items-center gap-xs"><Fingerprint size={14} /> Privacy First</span>
                        <span className="flex items-center gap-xs"><Settings size={14} /> Revised: March 23, 2026</span>
                    </div>
                </header>

                <div className="flex flex-col gap-xl">
                    {/* Definition */}
                    <section className="p-2xl rounded-3xl border border-white/20">
                        <h2 className="text-3xl font-serif mb-6 flex items-center gap-md">
                            <Search className="text-accent" /> What are Cookies?
                        </h2>
                        <div className="prose prose-lg text-slate-700 leading-relaxed">
                            <p>
                                Cookies are small text files stored on your device that help us recognize you and remember your preferences. They act as a "memory" for the website, allowing it to provide a more personalized and efficient experience.
                            </p>
                        </div>
                    </section>

                    {/* How We Use Them */}
                    <section className="p-xl md:p-2xl">
                        <h2 className="text-3xl font-serif mb-xl flex items-center gap-md">
                            <PieChart className="text-accent" /> Categories of Use
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-xl">
                            <div className="p-lg bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-lg">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-md">Essential</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Strictly necessary for the website to function. These handle authentication, security, and basic navigation. They cannot be disabled.
                                </p>
                            </div>

                            <div className="p-lg bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-lg">
                                    <PieChart size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-md">Analytics</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Help us understand how users interact with our journalism, which articles are trending, and where we can improve performance.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Control */}
                    <section className="p-2xl rounded-3xl border border-white/20">
                        <h2 className="text-3xl font-serif mb-xl flex items-center gap-md">
                            <Settings className="text-accent" /> Your Preferences
                        </h2>
                        <p className="mb-lg text-slate-300 leading-relaxed">
                            You have the absolute right to control your data. While some cookies are essential, you can manage your preferences through your browser settings or our integrated privacy tools.
                        </p>
                        <div className="p-lg bg-white/5 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-lg items-center justify-between">
                            <div className="flex gap-md items-center">
                                <EyeOff className="text-slate-400" size={24} />
                                <span className="text-sm font-medium">Blocking Third-Party Cookies</span>
                            </div>
                            <div className="text-xs text-slate-400 max-w-xs md:text-right">
                                Most modern browsers (Chrome, Safari, Firefox) allow you to block cookies entirely via their Privacy settings.
                            </div>
                        </div>
                    </section>

                    {/* Updates */}
                    <section className="text-center py-xl">
                        <h2 className="text-2xl font-serif mb-lg text-primary">Policy Evolution</h2>
                        <p className="text-muted max-w-2xl mx-auto leading-relaxed">
                            We may update this policy to reflect changes in our practices or for legal reasons. We encourage you to review this page periodically to stay informed about our use of tracking technologies.
                        </p>
                        <div className="mt-xl border-t border-slate-100" style={{ paddingTop: "10px" }}>
                            <p className="text-sm font-bold text-accent uppercase tracking-widest">Global Compliance</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;

