import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import { Loader2, Filter } from 'lucide-react';

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
        return (
            <div className="loader-container">
                <Loader2 className="loader-icon" size={48} />
            </div>
        );
    }

    if (!category) {
        return (
            <div className="container py-2xl text-center">
                <h2 className="font-serif text-2xl">Category not found</h2>
                <Link to="/" className="btn btn-outline mt-lg">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="category-page">
            <SEO
                title={category.seo?.metaTitle || `${category.name} News`}
                description={category.seo?.metaDescription || category.description}
            />

            <header className="page-header glass mb-2xl" style={{ borderRadius: 'var(--radius-lg)' }}>
                <div className="container">
                    <h1 className="page-title">{category.name}</h1>
                    {category.description && <p className="page-description">{category.description}</p>}

                    <div className="flex justify-center mt-xl gap-md">
                        <button
                            className={`btn ${filterType === 'all' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('all')}
                        > All </button>
                        <button
                            className={`btn ${filterType === 'news' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('news')}
                        > News </button>
                        <button
                            className={`btn ${filterType === 'blog' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilterType('blog')}
                        > Blogs </button>
                    </div>
                </div>
            </header>

            <section className="container mb-3xl">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sm">
                        {articles.map(article => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-2xl border bg-white rounded-lg">
                        <p className="text-muted">No {filterType !== 'all' ? filterType : ''} articles found in this category.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CategoryPage;
