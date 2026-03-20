import SEO from '../components/SEO';
import { BookOpen, Users, Globe, Award, Target, Shield } from 'lucide-react';
import aboutHero from '../assets/about-hero.png';

const AboutUsPage = () => {
    const stats = [
        { label: 'Years of Excellence', value: '95+', icon: <Award className="text-accent" size={24} /> },
        { label: 'Pulitzer Prizes', value: '120', icon: <Target className="text-accent" size={24} /> },
        { label: 'Monthly Readers', value: '50M+', icon: <Users className="text-accent" size={24} /> },
        { label: 'Global Bureaus', value: '50+', icon: <Globe className="text-accent" size={24} /> }
    ];

    const values = [
        {
            title: "Unwavering Integrity",
            description: "We operate independently of political or corporate interests, ensuring our reporting remains unbiased and truthful.",
            icon: <Shield size={32} />
        },
        {
            title: "Global Perspective",
            description: "With correspondents in over 50 countries, we bring you stories that shape our interconnected world.",
            icon: <Globe size={32} />
        },
        {
            title: "Deep Analysis",
            description: "We don't just report the news; we provide the vital context needed to understand complex global events.",
            icon: <BookOpen size={32} />
        }
    ];

    return (
        <div className="about-page">
            <SEO title="About Us" description="Learn about the mission and history of The Chronicle." />

            {/* Hero Section */}
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Our Story</h1>
                    <p className="page-description">
                        Delivering uncompromised journalism and breaking stories from around the world since 1928.
                    </p>
                </div>
            </header>

            <div className="container py-2xl">
                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-lg items-center mb-3xl">
                    <div>
                        <div className="article-category">Our Mission</div>
                        <h2 className="text-4xl font-serif mb-lg mt-md">Truth, Clarity, and Impact</h2>
                        <div className="article-body">
                            <p className="text-lg leading-relaxed mb-lg">
                                At The Chronicle, our mission is simple: to seek the truth and help people understand the world. We believe that great journalism has the power to make each reader's life richer and more fulfilling, and all of society stronger and more just.
                            </p>
                            <p className="text-muted">
                                Since our founding nearly a century ago, we have stood at the forefront of global events, documenting history as it happens with a commitment to accuracy that has never wavered.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-lg overflow-hidden shadow-2xl">
                            <img src={aboutHero} alt="Our Newsroom" className="w-full h-auto" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 p-xl bg-primary text-white hidden md:block rounded-lg shadow-lg max-w-xs">
                            <p className="font-serif italic text-lg">"Journalism is the first rough draft of history."</p>
                            <p className="text-sm mt-md opacity-70">— Philip Graham</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-3xl">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-xl bg-white border rounded-lg text-center shadow-sm hover:shadow-md transition-normal">
                            <div className="flex justify-center mb-md">{stat.icon}</div>
                            <h3 className="text-4xl font-serif mb-xs">{stat.value}</h3>
                            <p className="text-xs uppercase font-bold text-muted tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Values Section */}
                <div className="border-t pt-3xl">
                    <div className="text-center mb-2xl">
                        <h2 className="text-3xl font-serif mt-lg mb-md">Our Core Values</h2>
                        <p className="text-muted max-w-2xl mx-auto">The principles that guide our newsroom every single day.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-lg">
                        {values.map((v, i) => (
                            <div key={i} className="p-xl bg-accent-light rounded-lg">
                                <div className="text-accent mb-lg">{v.icon}</div>
                                <h3 className="text-xl mb-md">{v.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
