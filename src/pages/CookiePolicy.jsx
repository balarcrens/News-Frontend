import SEO from '../components/SEO';
import { Info, Settings, PieChart, ShieldCheck } from 'lucide-react';

const CookiePolicy = () => {
    return (
        <div className="container py-3xl">
            <SEO title="Cookie Policy" description="How and why we use cookies to improve your experience on NexoraNews." />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className='flex items-center justify-center gap-sm'>
                        <div className="inline-block p-md bg-accent/10 text-accent rounded-full mb-md" style={{ backgroundColor: 'rgba(190, 18, 60, 0.05)', color: 'var(--color-accent)', borderRadius: '10px' }}>
                            <PieChart size={48} />
                        </div>
                        <h1 className="font-serif text-5xl mb-md">Cookie Policy</h1>
                    </div>
                    <p className="text-xl text-muted">Transparency regarding how we use tracking technologies.</p>
                    <div className="mt-lg pt-lg border-t border-border flex justify-center gap-xl text-sm font-bold uppercase tracking-widest text-muted">
                        <span>Version 1.1</span>
                        <span>Revised: March 20, 2026</span>
                    </div>
                </header>

                <div className="glass p-2xl mb-2xl" style={{ borderRadius: 'var(--radius-lg)', lineHeight: '1.8' }}>
                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Info className="text-accent" /> What are Cookies?
                        </h2>
                        <p>
                            Cookies are small data files that are stored on your computer or mobile device when you visit a website.
                            They are widely used by website owners to make their websites work, or to work more efficiently,
                            as well as to provide reporting information.
                        </p>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Settings className="text-accent" /> How We Use Cookies
                        </h2>
                        <div className="grid md:grid-cols-2 gap-lg">
                            <div className="p-lg border border-border rounded-lg bg-white/50">
                                <h3 className="font-bold flex items-center gap-sm mb-sm">
                                    <ShieldCheck size={18} className="text-green-600" /> Essential Cookies
                                </h3>
                                <p className="text-sm text-muted">These are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
                            </div>
                            <div className="p-lg border border-border rounded-lg bg-white/50">
                                <h3 className="font-bold flex items-center gap-sm mb-sm">
                                    <PieChart size={18} className="text-blue-600" /> Analytics Cookies
                                </h3>
                                <p className="text-sm text-muted">These cookies collect information that is used in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="text-2xl font-serif mb-lg">Cookie Preferences</h2>
                        <p className="mb-md">
                            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to refuse cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                        </p>
                        <p>
                            Most browsers allow you to block cookies via settings. For example, in Google Chrome, you can go to <code>Settings &gt; Privacy and Security &gt; Cookies and other site data</code>.
                        </p>
                    </section> section

                    <section>
                        <h2 className="text-2xl font-serif mb-lg">Updates to this Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
