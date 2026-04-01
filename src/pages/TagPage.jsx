import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { Tag, Hash, BookOpen } from 'lucide-react';

const TagPage = () => {
    const { slug } = useParams();
    const [tag, setTag] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const [tagRes, articlesRes] = await Promise.all([
                api.get(`/api/tags/${slug}`),
                api.get(`/api/articles?tags=${slug}`)
            ]);
            setTag(tagRes.data);
            setArticles(Array.isArray(articlesRes.data) ? articlesRes.data : articlesRes.data.articles || []);
        } catch (err) {
            console.error('Failed to fetch tag data', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    if (error) {
        return (
            <div className="container py-3xl">
                <ErrorState 
                    title="Tag Not Found" 
                    description="The tag you're looking for doesn't exist or hasn't been used yet."
                    onRetry={fetchData}
                />
            </div>
        );
    }

    return (
        <div className="container py-2xl">
            <SEO 
                title={tag ? `#${tag.name} | NexoraNews` : 'Tag Discovery'} 
                description={tag?.description || `Explore stories, insights, and latest updates tagged with #${tag?.name || 'news'}.`}
            />

            {/* Tag Header */}
            <section className="animate-in fade-in mb-3xl">
                <div className="glass p-2xl rounded-2xl flex flex-col items-center text-center gap-md border border-slate-100 shadow-xl">
                    <div className="flex items-center justify-center bg-accent text-white rounded-2xl p-lg" style={{ width: '80px', height: '80px' }}>
                        <Hash size={48} />
                    </div>
                    {loading ? (
                        <>
                            <Skeleton width="200px" height="2.5rem" className="mb-sm" />
                            <Skeleton width="100%" height="1.2rem" className="mb-sm" />
                        </>
                    ) : (
                        <>
                            <h1 className="font-serif text-slate-800 text-5xl mb-sm">{tag?.name || 'Discover Stories'}</h1>
                            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto italic">
                                {tag?.description || `Everything you need to know about ${tag?.name || 'this topic'} in our curated news feed.`}
                            </p>
                            <div className="mt-md flex items-center gap-md text-slate-400 font-bold uppercase tracking-widest text-sm">
                                <span className="flex items-center gap-xs"><BookOpen size={16} /> {articles.length} Stories</span>
                                <span className="w-px h-4 bg-slate-200"></span>
                                <span>Curated Feed</span>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Articles List */}
            <section className="animate-in stagger-2">
                <div className="section-heading mb-xl">
                    <h2 className="heading-text">Latest Stories Tagged with #{tag?.name || "Discovery"}</h2>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i}>
                                <Skeleton height="200px" borderRadius="var(--radius-lg)" className="mb-md" />
                                <Skeleton width="80%" height="1.5rem" className="mb-sm" />
                                <Skeleton width="100%" height="1rem" />
                            </div>
                        ))}
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl">
                        {articles.map((art, i) => (
                            <ArticleCard key={art._id} article={art} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-3xl bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <Tag size={48} className="mx-auto text-slate-300 mb-md" />
                        <p className="text-slate-500 font-medium">No stories found with this tag.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default TagPage;
