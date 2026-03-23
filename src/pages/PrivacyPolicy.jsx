import SEO from '../components/SEO';
import { Shield, Eye, Lock, Globe, Bell } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="container py-3xl">
            <SEO title="Privacy Policy" description="Detailed privacy practices and commitment to user data protection at NexoraNews." />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className='flex items-center justify-center gap-sm'>
                        <div className="inline-block p-md bg-accent/10 text-accent rounded-full mb-md" style={{ backgroundColor: 'rgba(190, 18, 60, 0.05)', color: 'var(--color-accent)', borderRadius: '10px' }}>
                            <Shield size={48} />
                        </div>
                        <h1 className="font-serif text-5xl mb-md">Privacy Policy</h1>
                    </div>
                    <p className="text-xl text-muted">A commitment to transparency, security, and your right to privacy.</p>
                    <div className="mt-lg pt-lg border-t border-border flex justify-center gap-sm text-sm font-bold uppercase tracking-widest text-muted">
                        <span>Version 2.0</span>
                        <span>Effective: March 20, 2026</span>
                    </div>
                </header>

                <div className="glass p-2xl mb-2xl" style={{ borderRadius: 'var(--radius-lg)', lineHeight: '1.8' }}>
                    <section className="mb-2xl">
                        <h2 className="text-3xl font-serif mb-6">Introduction</h2>
                        <p className="mb-6">
                            At NexoraNews, we believe that privacy is a fundamental human right. As a leading news organization, our relationship with our audience is built on trust. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website, newsletters, and mobile applications.
                        </p>
                        <p>
                            We are committed to minimizing data collection and ensuring that the information we do process is handled with the highest standards of security and ethical responsibility.
                        </p>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Globe className="text-accent" /> 2. Information We Collect
                        </h2>
                        <h3 className="text-lg font-bold mb-sm">A. Information You Provide Directly</h3>
                        <p className="mb-md text-muted italic">Example: Creating an account, subscribing to a newsletter, or contacting our desk.</p>
                        <ul className="list-disc pl-lg mb-lg flex flex-col gap-sm">
                            <li><strong>Account Credentials:</strong> Your name, email address, and encrypted password.</li>
                            <li><strong>Subscription Data:</strong> Billing information and delivery preferences.</li>
                            <li><strong>Communications:</strong> Any feedback, tips, or messages sent to our editorial or support teams.</li>
                        </ul>

                        <h3 className="text-lg font-bold mb-sm">B. Information Collected Automatically</h3>
                        <p className="mb-md text-muted italic">Example: How you navigate our journalism and your technical environment.</p>
                        <ul className="list-disc pl-lg flex flex-col gap-sm">
                            <li><strong>Log Data:</strong> IP address, browser type, and time spent on specific articles.</li>
                            <li><strong>Device Metrics:</strong> Operating system, screen resolution, and language settings.</li>
                            <li><strong>Interactions:</strong> Shares, likes, and comment history.</li>
                        </ul>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Lock className="text-accent" /> 3. Data Protection Measures
                        </h2>
                        <p className="mb-md font-medium text-primary">We employ industry-leading encryption and security protocols to safeguard your data:</p>
                        <div className="grid md:grid-cols-2 gap-lg mt-md">
                            <div className="p-md border border-border rounded-lg bg-white/50">
                                <h4 className="font-bold mb-xs">End-to-End Encryption</h4>
                                <p className="text-sm text-muted">Sensitive communications and personal data are encrypted both at rest and in transit.</p>
                            </div>
                            <div className="p-md border border-border rounded-lg bg-white/50">
                                <h4 className="font-bold mb-xs">Regular Security Audits</h4>
                                <p className="text-sm text-muted">Our infrastructure undergoes quarterly independent testing to identify and patch vulnerabilities.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Bell className="text-accent" /> 4. Your Privacy Rights
                        </h2>
                        <p className="mb-md">Depending on your location (such as if you are a resident of the EEU or California), you may have specific rights regarding your data:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-md p-0 list-none">
                            <li className="flex items-start gap-sm">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                                <span><strong>Access:</strong> Request a copy of the data we hold about you.</span>
                            </li>
                            <li className="flex items-start gap-sm">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                                <span><strong>Erasure:</strong> Request the deletion of your account and personal history.</span>
                            </li>
                            <li className="flex items-start gap-sm">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                                <span><strong>Portability:</strong> Transfer your data to another service provider.</span>
                            </li>
                            <li className="flex items-start gap-sm">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                                <span><strong>Correction:</strong> Update or fix any inaccurate data we possess.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-lg">5. Contact Our Privacy Office</h2>
                        <p className="mb-md">
                            Direct any inquiries regarding this policy or your data rights to our dedicated privacy desk:
                        </p>
                        <div className="p-lg bg-primary text-white rounded-lg inline-block">
                            <p className="font-bold">Privacy Desk — NexoraNews</p>
                            <p className="opacity-80">Email: help@nexoranews.com</p>
                            <p className="opacity-80">Phone: +1 (212) 555-0198</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
