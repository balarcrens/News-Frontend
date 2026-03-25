import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import ArticleSidebarItem from '../components/ArticleSidebarItem';
import BreakingNews from '../components/BreakingNews';
import { Search, TrendingUp, Grid, List } from 'lucide-react';
import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import Skeleton from '../components/Skeleton';
import { getOptimizedImage } from '../utils/imageUtils';

const HomePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('search');

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [email, setEmail] = useState('');
    const [subLoading, setSubLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const params = {};
                if (filterType !== 'all') params.type = filterType;
                if (searchKeyword) params.keyword = searchKeyword;

                const [articlesRes, categoriesRes] = await Promise.all([
                    api.get('/api/articles', { params }),
                    api.get('/api/categories').catch(() => ({ data: [] })) // Resilient category fetch
                ]);

                setError(false);

                setCategories(categoriesRes.data || []);
                const { data } = articlesRes;
                const fetchedArticles = Array.isArray(data) ? data : (data.articles || []);

                if (fetchedArticles.length > 0) {
                    setArticles(fetchedArticles);
                } else {
                    setArticles([]);
                }
            } catch (error) {
                console.error('Failed to fetch articles', error);
                setError(true);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [filterType, searchKeyword]); // Added searchKeyword to dependencies

    const handleSubscription = async () => {
        if (!email) return alert('Please enter an email address');
        setSubLoading(true);
        try {
            const { data } = await api.post('/api/subscriptions', { email });
            alert(data.message || 'Thank you for subscribing!');
            setEmail('');
        } catch (err) {
            alert(err.response?.data?.message || 'Subscription failed. Please try again.');
        } finally {
            setSubLoading(false);
        }
    };

    /* Removed the full-page loader check to allow sectional skeletons */

    if (error) {
        return (
            <div className="container py-3xl">
                <SEO title="Error | NexoraNews" />
                <ErrorState
                    title="Unable to connect to news server"
                    description="We're having trouble reaching our servers. Please check your internet connection or try again."
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    const featuredArticle = Array.isArray(articles) && articles.length > 0 ? articles[0] : null;
    const trendingArticles = Array.isArray(articles) && articles.length > 1 ? articles.slice(1, 6) : [];
    const latestArticles = Array.isArray(articles) && articles.length > 6 ? articles.slice(6, 12) : [];
    const blogArticles = Array.isArray(articles) ? articles.filter(a => a.type === 'blog').slice(0, 4) : [];

    return (
        <>
            <SEO
                title="NexoraNews | Real-time Breaking News & Independent Journalism"
                description="Stay ahead with NexoraNews. We provide deep-dive analysis, breaking news, and premium insights on global events, technology, business, and culture. Your source for independent journalism."
                ogImage="https://nexoranews.dpdns.org/preview.jpg"
            />

            {!searchKeyword && <BreakingNews />}

            {/* Section 1: Hero & Trending Split */}
            <section className="mb-3xl mt-lg">
                <div className="grid lg:grid-cols-12 gap-xl">
                    {/* Main Featured Article (Left 2/3) */}
                    <div className="lg:col-span-8">
                        <div className="section-heading">
                            <h2 className="heading-text">
                                {searchKeyword ? `Search results for "${searchKeyword}"` : 'Top Stories'}
                            </h2>
                            {!searchKeyword && (
                                <div className="flex gap-xs flex-wrap">
                                    <button onClick={() => setFilterType('all')} className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}>All</button>
                                    <button onClick={() => setFilterType('news')} className={`filter-chip ${filterType === 'news' ? 'active' : ''}`}>News</button>
                                    <button onClick={() => setFilterType('blog')} className={`filter-chip ${filterType === 'blog' ? 'active' : ''}`}>Opinion</button>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-lg)', minHeight: '555px' }}>
                                <Skeleton height="100%" width="100%" />
                                <div className="absolute bottom-0 left-0 w-full p-xl z-2">
                                    <Skeleton width="40%" height="2rem" className="mb-md" />
                                    <Skeleton width="80%" height="3rem" className="mb-md" />
                                    <Skeleton width="60%" height="1.5rem" />
                                </div>
                            </div>
                        ) : featuredArticle ? (
                            <div className="animate-in fade-in relative overflow-hidden shadow-2xl group" style={{ borderRadius: 'var(--radius-lg)', minHeight: '430px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <Link to={`/article/${featuredArticle.slug}`} className="absolute inset-0 block group overflow-hidden" style={{ zIndex: 0 }}>
                                    <img
                                        src={getOptimizedImage(featuredArticle?.media?.featuredImage, { width: 1200 })}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="eager"
                                        fetchPriority="high"
                                    />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.5) 50%, transparent 100%)', zIndex: 1 }}></div>
                                </Link>

                                <div className="relative" style={{ zIndex: 2, padding: 'var(--spacing-xl)' }}>
                                    <span style={{ backgroundColor: 'var(--color-accent)', color: 'white', padding: '0.35rem 1rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: '800', marginBottom: '1rem', display: 'inline-block' }}>
                                        {featuredArticle.category?.name || 'Must Read'}
                                    </span>
                                    <Link to={`/article/${featuredArticle.slug}`} className="block">
                                        <h2 className="font-serif text-white hover:text-accent transition-colors mb-md" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: '1.1', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {featuredArticle.title}
                                        </h2>
                                    </Link>
                                    <p className="text-white opacity-95 hidden md:block mb-lg font-sans" style={{ fontSize: '1.125rem', maxWidth: '700px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {featuredArticle.summary}
                                    </p>
                                    <div className="flex items-center gap-md text-white opacity-80 text-sm font-sans">
                                        <span className="font-bold border-l-2 border-accent pl-sm" style={{ color: 'var(--color-accent)' }}>{featuredArticle.customAuthor?.name || 'Editorial Team'}</span>
                                        <span>{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <EmptyState icon={Search} title="No articles found" description="Try another search." />
                        )}
                    </div>

                    {/* Trending Sidebar (Right 1/3) */}
                    <div className="lg:col-span-4">
                        <div className="section-heading mb-md">
                            <TrendingUp size={20} className="text-accent" />
                            <h2 className="heading-text">Trending Now</h2>
                        </div>
                        <div className="flex flex-col gap-sm">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex gap-md p-sm">
                                        <Skeleton width="60px" height="60px" borderRadius="var(--radius-sm)" />
                                        <div className="flex-1">
                                            <Skeleton width="100%" height="1.2rem" className="mb-xs" />
                                            <Skeleton width="60%" height="0.8rem" />
                                        </div>
                                    </div>
                                ))
                            ) : trendingArticles.length > 0 ? (
                                trendingArticles.map((art, i) => (
                                    <ArticleSidebarItem key={`trending-${art._id}`} article={art} index={i} />
                                ))
                            ) : (
                                <p className="text-muted text-sm italic">Gathering popular stories...</p>
                            )}
                        </div>

                        <div className="mt-xl p-xl rounded-lg border-l-4 border-accent">
                            <h4 className="font-bold mb-xs">Stay Informed</h4>
                            <p className="text-xs text-muted mb-md">Sign up for our daily newsletter to get the top stories delivered to your inbox.</p>
                            <div className="flex gap-xs">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className="form-input text-xs" 
                                    style={{ padding: '8px' }} 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button 
                                    className="btn btn-primary" 
                                    style={{ padding: '8px 12px', fontSize: '10px' }}
                                    onClick={handleSubscription}
                                    disabled={subLoading}
                                >
                                    {subLoading ? '...' : 'Join'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Opinion/Blogs (Horizontal Highlight) */}
            {(blogArticles.length > 0 || loading) && (
                <section className="mb-3xl py-2xl overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-heading" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                            <h2 className="heading-text">The Opinion <span className="text-accent italic">&</span> Commentary</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i}>
                                        <Skeleton width="40%" height="1rem" className="mb-sm" />
                                        <Skeleton width="100%" height="1.5rem" className="mb-sm" />
                                        <Skeleton width="100%" height="1.5rem" className="mb-md" />
                                        <div className="flex items-center gap-sm">
                                            <Skeleton variant="circular" width="32px" height="32px" />
                                            <Skeleton width="50%" height="1rem" />
                                        </div>
                                    </div>
                                ))
                            ) : blogArticles.map(art => (
                                <Link key={art._id} to={`/article/${art.slug}`} className="group block">
                                    <div className="mb-md transition-opacity">
                                        <span className="text-xs uppercase font-bold tracking-widest text-accent">{art.category?.name || 'Opinion'}</span>
                                        <h3 className="font-serif mt-xs group-hover:underline text-lg" style={{ lineHeight: '1.3' }}>{art.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-sm mt-auto text-accent">
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                            {art?.author?.name?.charAt(0) || art.customAuthor?.name?.charAt(0) || 'E'}
                                        </div>
                                        <span className="text-sm">By {art?.author?.name || art.customAuthor?.name || 'Editorial Team'}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Section 3: Latest Briefing */}
            {(latestArticles.length > 0 || loading) && (
                <section className="mb-3xl">
                    <div className="section-heading">
                        <List size={20} className="text-accent" />
                        <h2 className="heading-text">Latest Briefing</h2>
                        <button className="view-all-link">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i}>
                                    <Skeleton height="200px" borderRadius="var(--radius-lg)" className="mb-md" />
                                    <Skeleton width="80%" height="1.5rem" className="mb-sm" />
                                    <Skeleton width="100%" height="1rem" className="mb-sm" />
                                    <Skeleton width="40%" height="0.8rem" />
                                </div>
                            ))
                        ) : latestArticles.map(article => (
                            <ArticleCard key={`latest-${article._id}`} article={article} />
                        ))}
                    </div>
                </section>
            )}

            {/* Section 4: Vertical Category Blocks */}
            {!searchKeyword && categories.length > 0 && (
                <section className="mb-3xl pt-2xl border-t">
                    <div className="flex items-center gap-sm mb-2xl">
                        <Grid size={24} className="text-accent" />
                        <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: '900' }}>Channel Browse</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-x-md gap-y-lg">
                        {categories.slice(0, 6).map(cat => {
                            const catArticles = articles.filter(a => a.category?._id === cat._id || a.category === cat._id).slice(0, 4);
                            if (catArticles.length === 0) return null;

                            return (
                                <div key={cat._id} className="cat-block">
                                    <div className="flex items-center justify-between mb-lg border-b-2 pb-xs" style={{ borderColor: 'var(--color-primary)' }}>
                                        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900', fontSize: '1.5rem' }}>{cat.name}</h3>
                                        <Link to={`/category/${cat.slug}`} style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent)' }}>Channel Home →</Link>
                                    </div>
                                    <div className="grid gap-xl">
                                        {/* Main card */}
                                        <ArticleCard article={catArticles[0]} />
                                        {/* Supporting list */}
                                        <div className="flex flex-col gap-xs">
                                            {catArticles.slice(1).map((art, i) => (
                                                <ArticleSidebarItem key={`cat-side-${art._id}`} article={art} index={i} showImage={false} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Section 5: Experience More (Category Explorer) */}
            {!searchKeyword && categories.length > 0 && (
                <section className="mb-4xl py-3xl" style={{
                    borderRadius: 'var(--radius-xl)',
                    padding: '4rem 2rem'
                }}>
                    <div className="text-center mb-3xl">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-md block">Discover Your Interests</span>
                        <h2 className="font-serif text-5xl md:text-6xl mb-md">Explore by Section</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Dive deep into the topics that matter most to you, from cutting-edge technology to global politics and beyond.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-md lg:gap-lg">
                        {categories.map((cat) => (
                            <Link
                                key={`explorer-${cat._id}`}
                                to={`/category/${cat.slug}`}
                                className="cat-explorer-card group"
                            >
                                <div className="card-inner">
                                    <div className="icon-wrapper">
                                        <Grid size={24} className="group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="cat-name">{cat.name}</h3>
                                    <span className="cat-stats">Latest stories →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </>
    );
};

export default HomePage;