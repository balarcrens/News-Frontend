import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import ArticleSidebarItem from '../components/ArticleSidebarItem';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';
import { Newspaper, Layers, Layout, TrendingUp } from 'lucide-react';
import LoadingState from '../components/LoadingState';

const CategoryPage = () => {
    const { slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ totalPages: 1 });
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            setError(false);
            try {
                // 1. Fetch category details
                const { data: categories } = await api.get('/api/categories');
                const currentCat = categories.find(c => c.slug === slug);

                if (currentCat) {
                    setCategory(currentCat);

                    // 2. Fetch articles for this category with pagination
                    const params = {
                        category: currentCat._id,
                        page: currentPage,
                        limit: 10
                    };
                    if (filterType !== 'all') params.type = filterType;

                    const { data } = await api.get('/api/articles', { params });
                    setArticles(data.articles || []);
                    setPagination(data.pagination || { totalPages: 1 });
                } else {
                    setCategory(null);
                }
            } catch (error) {
                console.error('Failed to fetch category articles', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug, filterType, currentPage]);

    // Reset to page 1 when filter or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [slug, filterType]);

    if (loading) {
        return <LoadingState message={`Opening ${category?.name || slug} section...`} />;
    }

    if (error) {
        return (
            <div className="container py-3xl">
                <SEO title="Error | NexoraNews" />
                <ErrorState
                    title="Channel Access Error"
                    description="We couldn't load the articles for this channel. Our editorial team has been notified."
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    if (!category) {
        return (
            <EmptyState
                icon={Layers}
                title="Category Not Found"
                description="The category you are looking for doesn't exist or has been removed."
                actionText="Go Home"
                actionLink="/"
            />
        );
    }

    const sidebarArticles = articles.slice(0, 5); // Reuse some for trending sidebar

    return (
        <div className="category-page animate-in fade-in">
            <SEO
                title={category.seo?.metaTitle || `${category.name} News & Analysis`}
                description={category.seo?.metaDescription || category.description}
                keywords={category.seo?.keywords || `${category.name}, news, ${category.name} reports, latest stories`}
                ogImage={articles?.media?.featuredImage}
            />

            {/* Premium Category Header */}
            <header className="py-2xl border-b mb-3xl">
                <div className="container">
                    <Breadcrumbs items={[{ label: category.name }]} />
                    <div className="flex flex-col items-center text-center">
                        <span style={{ color: 'var(--color-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            The Archive
                        </span>
                        <h1 className="page-title text-black font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{category.name}</h1>
                        {category.description && (
                            <p className="max-w-2xl opacity-80 leading-relaxed text-sm">
                                {category.description}
                            </p>
                        )}
                        <div className="mt-xl flex gap-md">
                            <button onClick={() => setFilterType('all')} className={`filter-chip ${filterType === 'all' ? 'active' : ''}`} style={{ borderColor: 'gray', color: filterType === 'all' ? 'white' : 'black' }}>All Stories</button>
                            <button onClick={() => setFilterType('news')} className={`filter-chip ${filterType === 'news' ? 'active' : ''}`} style={{ borderColor: 'gray', color: filterType === 'news' ? 'white' : 'black' }}>News Briefs</button>
                            <button onClick={() => setFilterType('blog')} className={`filter-chip ${filterType === 'blog' ? 'active' : ''}`} style={{ borderColor: 'gray', color: filterType === 'blog' ? 'white' : 'black' }}>Opinion</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="grid lg:grid-cols-12 gap-2xl">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        {articles.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-xl">
                                {articles.map(article => (
                                    <ArticleCard key={article._id} article={article} />
                                ))}
                            </div>
                        ) : (
                            !articles && (
                                <EmptyState
                                    icon={Newspaper}
                                    title="No articles found"
                                    description="Adjust your filters or check back later for updates."
                                    actionText="View All"
                                    onActionClick={() => setFilterType('all')}
                                />
                            )
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={(p) => {
                                setCurrentPage(p);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                            }}
                        />
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <div className="section-heading mb-xl">
                                <TrendingUp size={20} className="text-accent" />
                                <h2 className="heading-text" style={{ paddingLeft: '10px' }}>Trending in {category.name}</h2>
                            </div>
                            <div className="flex flex-col">
                                {sidebarArticles.map((art, i) => (
                                    <ArticleSidebarItem key={`side-${art._id}`} article={art} index={i} />
                                ))}
                            </div>

                            <div className="mt-xl p-xl rounded-lg" style={{ borderTop: "4px solid var(--color-accent)" }}>
                                <h3 className="font-serif text-xl mb-md">Newsletter</h3>
                                <p className="text-sm text-muted mb-lg">Get the latest {category.name} updates in your inbox.</p>
                                <input type="email" placeholder="Email" className="form-input mb-sm" />
                                <button className="btn btn-primary w-full">Join Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;


