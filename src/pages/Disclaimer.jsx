import SEO from '../components/SEO';
import { AlertCircle, Scale, Globe, Info } from 'lucide-react';

const Disclaimer = () => {
    return (
        <div className="container py-3xl">
            <SEO
                title="Disclaimer"
                description="Legal disclaimers regarding the information accuracy, external links, and professional advice on NexoraNews."
            />

            <div className="max-w-4xl mx-auto">
                <header className="mb-3xl text-center">
                    <div className='flex items-center justify-center gap-sm'>
                        <div className="inline-block p-md bg-accent/10 text-accent rounded-full mb-md" style={{ backgroundColor: 'rgba(190, 18, 60, 0.05)', color: 'var(--color-accent)', borderRadius: '10px' }}>
                            <AlertCircle size={48} />
                        </div>
                        <h1 className="font-serif text-5xl mb-md">Disclaimer</h1>
                    </div>
                    <p className="text-xl text-muted">Important information about how we provide journalism and content.</p>
                    <div className="mt-lg border-t border-border flex justify-center gap-xl text-sm font-bold uppercase tracking-widest text-muted" style={{ paddingTop: "10px" }}>
                        <span>Version 1.0</span>
                        <span>Effective: March 23, 2026</span>
                    </div>
                </header>

                <div className="p-2xl mb-2xl" style={{ borderRadius: 'var(--radius-lg)', lineHeight: '1.8' }}>
                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Info className="text-accent" /> 1. General Information
                        </h2>
                        <p className="mb-6">
                            The information provided by <b>NexoraNews</b> ("we", "us", or "our") on nexoranews.dpdns.org (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>
                        <p>
                            **UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE.**
                        </p>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Globe className="text-accent" /> 2. External Links Disclaimer
                        </h2>
                        <p className="mb-md">
                            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                        </p>
                        <ul className="list-disc pl-lg flex flex-col gap-sm">
                            <li>We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.</li>
                            <li>We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.</li>
                        </ul>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="flex items-center gap-sm mb-lg text-2xl font-serif">
                            <Scale className="text-accent" /> 3. Professional Advice Disclaimer
                        </h2>
                        <div className="p-md bg-yellow-50 border-l-4 border-yellow-400 mb-xl flex gap-md items-start" style={{ backgroundColor: '#fffbeb', borderColor: '#fbbf24', borderLeftWidth: '4px' }}>
                            <p className="text-sm text-yellow-800">
                                <b>The Site cannot and does not contain legal/financial/medical/etc. advice.</b> The journalism and commentary provided are for general educational and informational purposes only and are not a substitute for professional advice.
                            </p>
                        </div>
                        <p>
                            Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk.
                        </p>
                    </section>

                    <section className="mb-2xl">
                        <h2 className="text-2xl font-serif mb-lg">4. Errors and Omissions Disclaimer</h2>
                        <p>
                            While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, NexoraNews is not responsible for any errors or omissions, or for the results obtained from the use of this information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-lg">5. Contact Us</h2>
                        <p className="mb-md">
                            Should you have any feedback, comments, requests for technical support, or other inquiries, please contact us by email:
                        </p>
                        <div className="p-lg bg-primary text-white rounded-lg inline-block">
                            <p className="font-bold">Legal Desk — NexoraNews</p>
                            <p className="opacity-80">Email: nexoranews1@gmail.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
