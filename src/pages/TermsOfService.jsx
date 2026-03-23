import SEO from '../components/SEO';
import { Scale, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="container py-3xl">
            <SEO title="Terms of Service" description="Terms and conditions for accessing and using NexoraNews's journalism." />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className='flex items-center justify-center gap-sm'>
                        <div className="inline-block p-md bg-accent/10 text-accent rounded-full mb-md" style={{ backgroundColor: 'rgba(190, 18, 60, 0.05)', color: 'var(--color-accent)', borderRadius: '10px' }}>
                            <Scale size={48} />
                        </div>
                        <h1 className="font-serif text-5xl mb-md">Terms of Service</h1>
                    </div>
                    <p className="text-xl text-muted">Legal guidelines for the pursuit of independent journalism.</p>
                    <div className="mt-lg pt-lg border-t border-border flex justify-center gap-xl text-sm font-bold uppercase tracking-widest text-muted">
                        <span>Version 1.4</span>
                        <span>Updated: March 20, 2026</span>
                    </div>
                </header>

                <div className="glass p-2xl mb-2xl" style={{ borderRadius: 'var(--radius-lg)', lineHeight: '1.8' }}>
                    <div className="p-md bg-yellow-50 border-l-4 border-yellow-400 mb-xl flex gap-md items-start" style={{ backgroundColor: '#fffbeb', borderColor: '#fbbf24', borderLeftWidth: '4px' }}>
                        <AlertCircle className="text-yellow-700 shrink-0 mt-1" size={20} />
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> By continuing to use The Chronicle, you agree to these legally binding terms.
                            If you do not accept these conditions, you should cease use of the platform immediately.
                        </p>
                    </div>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <CheckCircle className="text-accent" /> 1. Intellectual Property
                        </h2>
                        <p className="mb-md">
                            All materials published on NexoraNews, including but not limited to articles, photographs, videos, graphics, and trademarks, are protected by international copyright laws. These materials are the property of NexoraNews Media Group or its licensors.
                        </p>
                        <ul className="list-disc pl-lg flex flex-col gap-sm">
                            <li><strong>Personal Use:</strong> You may download or print individual articles for personal, non-commercial use only.</li>
                            <li><strong>Prohibited Actions:</strong> You may not republish, distribute, or create derivative works from our content without explicit written permission.</li>
                            <li><strong>AI training:</strong> Use of our content for training large language models or machine learning algorithms is strictly prohibited without a commercial license.</li>
                        </ul>
                    </section> section
                    <h2 className="text-3xl font-serif mb-6">1. Acceptance of Terms</h2>
                    <p className="mb-6">
                    By accessing or using NexoraNews, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                    <strong className="text-white">Note:</strong> By continuing to use NexoraNews, you agree to these legally binding terms.
                    </div>

                    <h2 className="text-2xl font-serif mb-4">2. Intellectual Property</h2>
                    <p className="mb-6">
                    All materials published on NexoraNews, including but not limited to articles, photographs, videos, graphics, and trademarks, are protected by international copyright laws. These materials are the property of NexoraNews Media Group or its licensors.
                    </p>

                    <h2 className="text-2xl font-serif mb-4">3. User Content</h2>
                    <p className="mb-6">
                    When you post comments or submit "Tips" to our desk, you grant NexoraNews a perpetual, irrevocable, worldwide license to use, reproduce, and distribute that material across all platforms.
                    </p>

                    <h2 className="text-2xl font-serif mb-4">4. Limitation of Liability</h2>
                    <p className="mb-6">
                    NexoraNews provides journalism "as is." While we strive for absolute factual accuracy, we are not liable for any losses arising from errors, omissions, or delays in publishing content.
                    </p>

                    <h2 className="text-2xl font-serif mb-4">5. Contact</h2>
                    <p className="mb-6">
                    For further legal inquiries, please contact our counsel: <span className="font-bold">legal@nexoranews.com</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
