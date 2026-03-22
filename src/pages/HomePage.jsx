import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import ArticleSidebarItem from '../components/ArticleSidebarItem';
import BreakingNews from '../components/BreakingNews';
import { Search, TrendingUp, Grid, List } from 'lucide-react';
import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

const HomePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchKeyword = searchParams.get('search');

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filterType, setFilterType] = useState('all');

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

    if (loading) {
        return <LoadingState message="Fetching top stories..." />;
    }

    if (error) {
        return (
            <div className="container py-3xl">
                <SEO title="Error | The Chronicle" />
                <ErrorState 
                    title="Unable to connect to news server"
                    description="We're having trouble reaching our servers. Please check your internet connection or try again."
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    const featuredArticle = Array.isArray(articles) && articles.length > 0 ? articles[0] : null;
    const trendingArticles = Array.isArray(articles) && articles.length > 1 ? articles.slice(1, 5) : [];
    const latestArticles = Array.isArray(articles) && articles.length > 5 ? articles.slice(5, 11) : [];
    const blogArticles = Array.isArray(articles) ? articles.filter(a => a.type === 'blog').slice(0, 4) : [];

    return (
        <>
            <SEO
                title="Global Breaking News & Independent Journalism"
                description="Stay ahead with The Chronicle. We provide deep-dive analysis, breaking news, and premium insights on global events, technology, and culture."
                keywords="breaking news, world events, tech analysis, business insights, unbiased journalism"
                ogImage="https://thechronicle.qzz.io/preview.jpg"
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

                        {featuredArticle ? (
                            <div className="animate-in fade-in relative overflow-hidden shadow-2xl group" style={{ borderRadius: 'var(--radius-lg)', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <img
                                    src={featuredArticle.media?.featuredImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80'}
                                    alt={featuredArticle.title}
                                    className="absolute top-0 right-0 bottom-0 left-0 transition-all duration-700"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div className="absolute top-0 right-0 bottom-0 left-0" style={{ background: 'linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.5) 50%, transparent 100%)', zIndex: 1 }}></div>

                                <div className="relative" style={{ zIndex: 2, padding: 'var(--spacing-xl)' }}>
                                    <span style={{ backgroundColor: 'var(--color-accent)', color: 'white', padding: '0.35rem 1rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: '800', marginBottom: '1rem', display: 'inline-block' }}>
                                        {featuredArticle.category?.name || 'Must Read'}
                                    </span>
                                    <a href={`/article/${featuredArticle.slug}`} className="block">
                                        <h2 className="font-serif text-white hover:text-accent transition-colors mb-md" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: '1.1', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                            {featuredArticle.title}
                                        </h2>
                                    </a>
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
                            {trendingArticles.length > 0 ? (
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
                                <input type="email" placeholder="Email" className="form-input text-xs" style={{ padding: '8px' }} />
                                <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '10px' }}>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Opinion/Blogs (Horizontal Highlight) */}
            {blogArticles.length > 0 && (
                <section className="mb-3xl py-2xl text-white overflow-hidden -mx-lg px-lg sm:-mx-xl sm:px-xl md:-mx-4xl md:px-4xl">
                    <div className="max-w-7xl mx-auto">
                        <div className="section-heading" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                            <h2 className="heading-text text-white">The Opinion <span className="text-accent italic">&</span> Commentary</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
                            {blogArticles.map(art => (
                                <Link key={art._id} to={`/article/${art.slug}`} className="group block">
                                    <div className="mb-md transition-opacity">
                                        <span className="text-xs uppercase font-bold tracking-widest text-accent">{art.category?.name || 'Opinion'}</span>
                                        <h3 className="font-serif mt-xs group-hover:underline text-lg" style={{ lineHeight: '1.3' }}>{art.title}</h3>
                                    </div>
                                    {(<div className="flex items-center gap-sm mt-auto text-accent">
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                            {art?.author?.name || art.customAuthor?.name?.[0] || 'A'}
                                        </div>
                                        <span className="text-sm">By {art?.author?.name || art.customAuthor?.name || 'Editorial Team'}</span>
                                    </div>)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Section 3: Latest Briefing (The existing Latest Grid) */}
            {latestArticles.length > 0 && (
                <section className="mb-3xl">
                    <div className="section-heading">
                        <List size={20} className="text-accent" />
                        <h2 className="heading-text">Latest Briefing</h2>
                        <button className="view-all-link">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {latestArticles.map(article => (
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
                        {categories.slice(0, 4).map(cat => {
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

        </>
    );
};

export default HomePage;