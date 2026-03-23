import { useState } from 'react';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, ChevronUp, Newspaper, HelpCircle, Briefcase } from 'lucide-react';
import contactHero from '../assets/contact-hero.png';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactMethods = [
        {
            title: "Newsroom Tips",
            description: "Have a breaking story or a tip? Our investigative team is ready to listen.",
            icon: <Newspaper size={24} />,
            email: "tips@nexoranews.com"
        },
        {
            title: "Advertising",
            description: "Partner with us for high-impact campaigns.",
            icon: <Briefcase size={24} />,
            email: "ads@nexoranews.com"
        },
        {
            title: "Support",
            description: "Account help and subscription services.",
            icon: <HelpCircle size={24} />,
            email: "support@nexoranews.com"
        }
    ];

    const faqs = [
        {
            q: "How do I pitch a story to NexoraNews?",
            a: "We welcome pitches from freelance journalists. Please send a brief outline of your story idea, any relevant experience, and why it's a fit for us to pitches@nexoranews.com."
        },
        {
            q: "Can I cancel my subscription anytime?",
            a: "You can manage your subscription through your account profile. For group or corporate rates, please contact our sales team at corporate@nexoranews.com."
        },
        {
            q: "How do I report a factual error?",
            a: "We strive for absolute accuracy. If you spot an error, please email corrections@nexoranews.com with the article URL and details of the mistake."
        }
    ];

    return (
        <div className="page-container bg-slate-900 min-h-screen pt-24 pb-12">
            <SEO title="Contact Us" description="Get in touch with the NexoraNews newsroom." />

            {/* Hero Section */}
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-description">
                        We value your feedback and tips. Reach out to our team through any of the channels below.
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden mt-sm">
                    <img src={contactHero} alt="Our Office" className="w-full" style={{ height: '50vh', objectFit: 'cover' }} />
                </div>
            </header>

            <div className="container py-2xl">
                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-lg mb-3xl">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="p-xl bg-white border rounded-lg shadow-sm hover:shadow-md transition-normal">
                            <div className="text-accent mb-lg">{method.icon}</div>
                            <h3 className="text-xl mb-sm">{method.title}</h3>
                            <p className="text-muted text-sm mb-lg leading-relaxed">{method.description}</p>
                            <a href={`mailto:${method.email}`} className="text-accent font-bold text-sm hover:underline">
                                {method.email}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-lg mb-3xl">
                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-2xl border rounded-lg shadow-sm">
                            <h2 className="text-2xl font-serif mb-xl">Send us a Message</h2>
                            {sent ? (
                                <div className="text-center py-2xl animate-in fade-in duration-500">
                                    <div className="inline-flex text-green-600 mb-md p-md bg-green-50 rounded-full">
                                        <Send size={48} />
                                    </div>
                                    <h3 className="text-2xl font-serif mb-sm">Message Received</h3>
                                    <p className="text-muted">Thank you for reaching out. A member of our team will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
                                    <div className="grid md:grid-cols-2 gap-sm">
                                        <div className="form-group mb-0">
                                            <label className="form-label" htmlFor="name">Full Name</label>
                                            <input id="name" type="text" className="form-input" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label className="form-label" htmlFor="email">Email Address</label>
                                            <input id="email" type="email" className="form-input" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label" htmlFor="subject">Subject</label>
                                        <input id="subject" type="text" className="form-input" placeholder="How can we help?" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label" htmlFor="message">Message</label>
                                        <textarea id="message" className="form-input" style={{ height: '150px' }} placeholder="Your message here..." required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary py-lg mt-md">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Info & FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-2xl">
                            <h2 className="text-2xl font-serif mb-xl">Our Offices</h2>
                            <div className="flex flex-col gap-sm">
                                <div className="flex gap-md">
                                    <div className="p-sm bg-accent-light text-accent rounded-md h-fit">
                                        <MapPin size={20} />
                                    </div>
                                    <p className="text-muted leading-relaxed">
                                        <span className="font-bold text-primary block mb-xs">Headquarters</span>
                                        1280 Avenue of the Americas,<br />New York, NY 10019
                                    </p>
                                </div>
                                <div className="flex gap-md">
                                    <div className="p-sm bg-accent-light text-accent rounded-md h-fit">
                                        <Phone size={20} />
                                    </div>
                                    <p className="text-muted leading-relaxed">
                                        <span className="font-bold text-primary block mb-xs">Contact Number</span>
                                        +1 (212) 555-0198<br />Mon-Fri, 9am - 6pm EST
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div>
                            <h2 className="text-2xl font-serif mb-xl">Frequent Questions</h2>
                            <div className="flex flex-col gap-md">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-lg text-left hover:bg-gray-50 transition-normal"
                                        >
                                            <span className="font-bold text-sm">{faq.q}</span>
                                            {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        {openFaq === idx && (
                                            <div className="p-lg pt-0 text-sm text-muted leading-relaxed border-t bg-gray-50">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
