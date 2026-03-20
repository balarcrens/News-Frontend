import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

// Premium Dummy Data for UI presentation
const DUMMY_ARTICLES = [
    {
        _id: '1',
        title: 'Global Markets Rally as Tech Sector Rebounds from Early Losses',
        slug: 'global-markets-rally-tech-sector',
        summary: 'A surge in major technology stocks lifted global markets today, recovering from a rocky start to the week amidst renewed investor confidence in AI developments and easing inflation fears.',
        category: { name: 'Business' },
        author: { name: 'Sarah Jenkins' },
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        media: { featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80' }
    },
    {
        _id: '2',
        title: 'Diplomatic Talks Resume in Geneva Over Climate Accords',
        slug: 'diplomatic-talks-geneva-climate',
        summary: 'Representatives from over 50 nations have gathered in Geneva to renegotiate key emissions targets ahead of the impending deadline next month.',
        category: { name: 'World' },
        author: { name: 'Michael Chang' },
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        media: { featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80' }
    },
    {
        _id: '3',
        title: 'Breakthrough in Quantum Computing Could Revolutionize Encryption',
        slug: 'breakthrough-quantum-computing-encryption',
        summary: 'Researchers at MIT have achieved a new benchmark in quantum stability, paving the way for systems that could instantly break current cryptographic standards while offering unbreakable new ones.',
        category: { name: 'Science' },
        author: { name: 'Dr. Elena Rostova' },
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        media: { featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80' }
    },
    {
        _id: '4',
        title: 'The Future of Urban Commuting: Electric Air Taxis Prepare for Launch',
        slug: 'future-urban-commuting-air-taxis',
        summary: 'Several startups are nearing FAA approval for autonomous passenger drones, promising to cut cross-city commute times by up to 80% in congested metropolitan areas.',
        category: { name: 'Tech' },
        author: { name: 'David Ortega' },
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        media: { featuredImage: 'https://imgproxy.divecdn.com/hzVYuAmeFREbq8O61xPJ6bpDrx7XrT_7nYVeT2ZCHMA/g:ce/rs:fill:1400:788:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9Kb2J5X1R3by1BaXJjcmFmdC0yMDI1XzIuanBn.webp' }
    },
    {
        _id: '5',
        title: 'Senate Passes Sweeping Infrastructure Bill After Marathon Session',
        slug: 'senate-passes-infrastructure-bill',
        summary: 'In a rare bipartisan move, lawmakers pushed through a $1.2 trillion package aimed at revitalizing bridges, roads, and broadband access across rural communities.',
        category: { name: 'Politics' },
        author: { name: 'Amanda Clarke' },
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        media: { featuredImage: 'https://thehill.com/wp-content/uploads/sites/2/2025/11/shutdown_111225gn02_w.jpg?strip=1' }
    }
];

const HomePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('search');
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const params = {};
                if (filterType !== 'all') params.type = filterType;
                if (searchKeyword) params.keyword = searchKeyword;

                const { data } = await api.get('/api/articles', { params });
                if (data && data.length > 0) {
                    setArticles(data);
                } else {
                    // Only use dummy data if it's NOT a search result
                    setArticles(searchKeyword ? [] : DUMMY_ARTICLES);
                }
            } catch (error) {
                console.error('Failed to fetch articles', error);
                setArticles(searchKeyword ? [] : DUMMY_ARTICLES);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [filterType, searchKeyword]); // Added searchKeyword to dependencies

    if (loading) {
        return <LoadingState message="Fetching top stories..." />;
    }

    const featuredArticle = articles.length > 0 ? articles[0] : null;
    const latestArticles = articles.length > 1 ? articles.slice(1, 10) : [];

    return (
        <>
            <SEO
                title="Global Breaking News & Independent Journalism"
                description="Stay ahead with The Chronicle. We provide deep-dive analysis, breaking news, and premium insights on global events, technology, and culture."
            />

            {/* Hero Section with Filter */}
            <section className="mb-3xl mt-lg">
                <div className="section-heading">
                    <h2 className="heading-text">
                        {searchKeyword ? `Search results for "${searchKeyword}"` : 'Featured Story'}
                    </h2>
                    <div className="flex gap-sm">
                        <button onClick={() => setFilterType('all')} className={`btn btn-outline ${filterType === 'all' ? 'bg-primary' : ''}`} style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }}>All</button>
                        <button onClick={() => setFilterType('news')} className={`btn btn-outline ${filterType === 'news' ? 'bg-primary' : ''}`} style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }}>News</button>
                        <button onClick={() => setFilterType('blog')} className={`btn btn-outline ${filterType === 'blog' ? 'bg-primary' : ''}`} style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }}>Blogs</button>
                    </div>
                </div>
                {featuredArticle ? (
                    <div className="glass p-lg animate-in fade-in" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <ArticleCard article={featuredArticle} featured={true} />
                    </div>
                ) : (
                    <EmptyState 
                        icon={Search}
                        title={searchKeyword ? "No results found" : "No articles found"}
                        description={searchKeyword ? `We couldn't find any articles matching "${searchKeyword}". Please try a different search term.` : "There are no featured articles at the moment. Please check back later."}
                        actionText="Clear Search"
                        actionLink="/"
                    />
                )}
            </section>


            {/* Latest News Grid */}
            {latestArticles.length > 0 && (
                <section className="mb-2xl">
                    <div className="section-heading" style={{ borderBottom: '2px solid var(--color-primary)', marginBottom: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xs)' }}>
                        <h2 className="heading-text" style={{ margin: 0 }}>Latest {filterType !== 'all' ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : ''} Updates</h2>
                        <button className="view-all-link">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {latestArticles.map(article => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default HomePage;