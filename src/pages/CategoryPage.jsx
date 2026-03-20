import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';
import { Newspaper, Layers, Layout } from 'lucide-react';
import LoadingState from '../components/LoadingState';

const CategoryPage = () => {
    const { slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); // all, news, blog

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                // 1. Fetch category details to get ID and SEO info
                const { data: categories } = await api.get('/api/categories');
                const currentCat = categories.find(c => c.slug === slug);

                if (currentCat) {
                    setCategory(currentCat);

                    // 2. Fetch articles for this category
                    const params = { category: currentCat._id };
                    if (filterType !== 'all') params.type = filterType;

                    const { data: articlesData } = await api.get('/api/articles', { params });
                    setArticles(articlesData);
                } else {
                    setCategory(null);
                }
            } catch (error) {
                console.error('Failed to fetch category articles', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug, filterType]);

    if (loading) {
        return <LoadingState message={`Opening ${slug} section...`} />;
    }

    if (!category) {
        return (
            <EmptyState
                icon={Layers}
                title="Category Not Found"
                description="The category you are looking for doesn't exist or has been removed from our records."
                actionText="Explore all categories"
                actionLink="/"
            />
        );
    }

    return (
        <div className="category-page animate-in fade-in">
            <SEO
                title={category.seo?.metaTitle || `${category.name} News`}
                description={category.seo?.metaDescription || category.description}
            />

            <header className="page-header glass mb-2xl" style={{ borderRadius: 'var(--radius-lg)' }}>
                <div className="container">
                    <span className="article-category mx-auto mb-md" style={{ display: 'table' }}>Exploring Category</span>
                    <h1 className="page-title">{category.name}</h1>
                    {category.description && <p className="page-description">{category.description}</p>}
                </div>
            </header>

            {/* Redesigned Filter - Centered and Big */}
            <section className="container mb-2xl">
                <div className="flex justify-center">
                    <div className="glass p-sm flex gap-sm" style={{
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-white)',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <button
                            className={`btn flex items-center gap-sm ${filterType === 'all' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('all')}
                            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.75rem' }}
                        >
                            <Layers size={18} /> All
                        </button>
                        <button
                            className={`btn flex items-center gap-sm ${filterType === 'news' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('news')}
                            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.75rem' }}
                        >
                            <Newspaper size={18} /> News
                        </button>
                        <button
                            className={`btn flex items-center gap-sm ${filterType === 'blog' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('blog')}
                            style={{ borderRadius: 'var(--radius-full)', padding: '0.6rem 1.75rem' }}
                        >
                            <Layout size={18} /> Blogs
                        </button>
                    </div>
                </div>
            </section>

            <section className="container mb-3xl">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {articles.map(article => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={filterType === 'news' ? Newspaper : filterType === 'blog' ? Layout : Layers}
                        title={`No ${filterType !== 'all' ? filterType : ''} articles`}
                        description={`We don't have any ${filterType !== 'all' ? filterType : 'articles'} in the ${category.name} category at the moment.`}
                        actionText="Clear Filter"
                        onActionClick={() => setFilterType('all')}
                    />
                )}
            </section>
        </div>
    );
};

export default CategoryPage;


