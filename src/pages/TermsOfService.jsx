import SEO from '../components/SEO';
import { Scale, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="container py-3xl">
            <SEO title="Terms of Service" description="Terms and conditions for accessing and using The Chronicle's journalism." />

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
                            All materials published on The Chronicle, including but not limited to articles, photographs, videos, graphics, and trademarks, are protected by international copyright laws. These materials are the property of The Chronicle Media Group or its licensors.
                        </p>
                        <ul className="list-disc pl-lg flex flex-col gap-sm">
                            <li><strong>Personal Use:</strong> You may download or print individual articles for personal, non-commercial use only.</li>
                            <li><strong>Prohibited Actions:</strong> You may not republish, distribute, or create derivative works from our content without explicit written permission.</li>
                            <li><strong>AI training:</strong> Use of our content for training large language models or machine learning algorithms is strictly prohibited without a commercial license.</li>
                        </ul>
                    </section> section

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <FileText className="text-accent" /> 2. User Submissions & Comments
                        </h2>
                        <p className="mb-md">
                            When you post comments or submit "Tips" to our desk, you grant The Chronicle a perpetual, irrevocable, worldwide license to use, reproduce, and distribute that material in across all platforms.
                        </p>
                        <p className="mb-md font-bold">Community Rules:</p>
                        <ul className="list-disc pl-lg flex flex-col gap-xs text-muted">
                            <li>No hate speech or targeted harassment.</li>
                            <li>No unauthorized promotion or advertisements.</li>
                            <li>No spreading of demonstrably false disinformation.</li>
                        </ul>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="text-2xl font-serif mb-lg">3. Subscriptions & Billing</h2>
                        <p className="mb-md">
                            Premium subscriptions are billed in advance on a recurring monthly or annual basis. You may cancel at any time through your account dashboard or by contacting our support desk.
                        </p>
                        <p>
                            Refunds are processed solely at our discretion, typically within 7 business days of a verified request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-lg">4. Limitation of Liability</h2>
                        <p className="mb-md italic">
                            The Chronicle provides journalism "as is." While we strive for absolute factual accuracy, we are not liable for any losses arising from errors, omissions, or delays in publishing content.
                        </p>
                        <p>
                            For further legal inquiries, please contact our counsel: <span className="font-bold">legal@thechronicle.com</span>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
