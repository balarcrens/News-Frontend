/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { User, BookOpen } from 'lucide-react';

const AuthorPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const [authorRes, articlesRes] = await Promise.all([
                api.get(`/api/authors/${id}`),
                api.get(`/api/articles?author=${id}`)
            ]);
            setAuthor(authorRes.data);
            setArticles(Array.isArray(articlesRes.data) ? articlesRes.data : articlesRes.data.articles || []);
        } catch (err) {
            console.error('Failed to fetch author data', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (error) {
        return (
            <div className="container py-3xl">
                <ErrorState
                    title="Profile Not Found"
                    description="We couldn't find the author you're looking for. It might have been removed or the link is broken."
                    onRetry={fetchData}
                />
            </div>
        );
    }

    return (
        <div className="container py-2xl">
            <SEO
                title={author ? `${author.name} | NexoraNews` : 'Author Profile'}
                description={author?.bio || 'Read articles and insights from our team of independent journalists.'}
            />

            {/* Author Header */}
            <section className="animate-in fade-in mb-3xl">
                <div className="p-2xl rounded-2xl flex flex-col md:flex-row items-center gap-xl text-center md:text-left">
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--color-accent)', boxShadow: 'var(--shadow-xl)' }}>
                        {loading ? (
                            <Skeleton variant="circular" width="100%" height="100%" />
                        ) : (
                            <img
                                src={author?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Journalist"}
                                alt={author?.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        {loading ? (
                            <>
                                <Skeleton width="200px" height="2.5rem" className="mb-sm" />
                                <Skeleton width="100%" height="1.2rem" className="mb-sm" />
                                <Skeleton width="80%" height="1.2rem" />
                            </>
                        ) : (
                            <>
                                <h1 className="font-serif text-4xl mb-sm">{author?.name}</h1>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                                    {author?.bio || 'NexoraNews Editorial Team contributor. Passionate about delivering high-impact journalism and real-time insights to a global audience.'}
                                </p>
                                <div className="mt-lg flex items-center justify-center md:justify-start gap-md text-accent font-bold uppercase tracking-widest text-sm">
                                    <span className="flex items-center gap-xs"><BookOpen size={16} /> {articles.length} Stories Published</span>
                                    <span className="w-px h-4 bg-slate-700"></span>
                                    <span>Verified Author</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Articles List */}
            <section className="animate-in stagger-2">
                <div className="section-heading mb-xl">
                    <h2 className="heading-text">Stories by {author?.name || 'this Author'}</h2>
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
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-md" />
                        <p className="text-slate-500 font-medium">This author hasn't published any stories yet.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AuthorPage;
