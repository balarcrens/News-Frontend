import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import SEO from '../components/SEO';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticle = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/api/articles/${slug}`);
            if (data) {
                setArticle(data);
            } else {
                setError('not_found');
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            if (err.response && err.response.status === 404) {
                setError('not_found');
            } else {
                setError('fetch_error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [slug]);

    if (loading) {
        return <LoadingState message="Loading article..." />;
    }

    if (error === 'not_found' || (!article && !loading)) {
        return (
            <EmptyState 
                icon={BookOpen}
                title="Article Not Found"
                description="The story you are looking for does not exist or has been removed from our archives."
                actionText="Return to News"
                actionLink="/"
            />
        );
    }

    if (error === 'fetch_error') {
        return (
            <ErrorState 
                title="Failed to load article"
                description="There was a problem communicating with our servers. Please check your connection and try again."
                onRetry={fetchArticle}
            />
        );
    }

    const imgUrl = article.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80`;

    const metaTitle = article.seo?.metaTitle || article.title;
    const metaDesc = article.seo?.metaDescription || article.summary;

    const readingTime = Math.ceil((article.content?.length || 0) / 1000) || 5;

    const shareOnSocial = (platform) => {
        const url = window.location.href;
        const title = article.title;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            default:
                if (navigator.share) {
                    navigator.share({ title, url }).catch(console.error);
                } else {
                    navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                }
                return;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <article className="mt-md mb-2xl">
            <SEO
                title={metaTitle}
                description={metaDesc}
                ogImage={imgUrl}
                ogType="article"
                keywords={article.seo?.keywords || article.tags?.map(t => t.name)}
            />

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Link to="/" className="btn btn-outline flex items-center gap-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'fit-content' }}>
                    <ArrowLeft size={16} /> Back to News
                </Link>
            </div>

            <header className="article-header">
                <div className="flex items-center gap-md mb-sm">
                    {article.category?.name && (
                        <span className="article-category">
                            {article.category.name}
                        </span>
                    )}
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{readingTime} min read</span>
                </div>
                <h1 className="article-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>
                    {article.title}
                </h1>
                <p className="article-excerpt" style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xl)', WebkitLineClamp: 'unset' }}>
                    {article.summary}
                </p>

                <div className="flex items-center justify-between py-md border-t border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-md">
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src={article.author?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Journalist"} alt="Author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                                {article.customAuthor?.name || article.author?.name || 'Editorial Board'}
                            </p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                {article.publishedAt ? format(new Date(article.publishedAt), 'MMMM d, yyyy • h:mm a') : 'Unpublished Draft'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-sm">
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'none' }}>Share</span>
                        <button onClick={() => shareOnSocial('facebook')} className="icon-btn" title="Share on Facebook"><Facebook size={18} /></button>
                        <button onClick={() => shareOnSocial('twitter')} className="icon-btn" title="Share on Twitter"><Twitter size={18} /></button>
                        <button onClick={() => shareOnSocial('linkedin')} className="icon-btn" title="Share on LinkedIn"><Linkedin size={18} /></button>
                        <button onClick={() => shareOnSocial('native')} className="icon-btn" title="Copy Link"><Share2 size={18} /></button>
                    </div>
                </div>
            </header>

            <figure style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <img src={imgUrl} alt={article.title} className="article-hero-image" />
            </figure>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }}>
            </div>

            {/* Structured Data for Google News */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": article.title,
                    "image": [imgUrl],
                    "datePublished": article.publishedAt || article.createdAt,
                    "dateModified": article.updatedAt || article.publishedAt || article.createdAt,
                    "author": [{
                        "@type": "Person",
                        "name": article.customAuthor?.name || article.author?.name || "Editorial Team",
                        "url": "#"
                    }]
                })}
            </script>

            {article.customAuthor?.bio && (
                <div style={{ maxWidth: '800px', margin: 'var(--spacing-2xl) auto 0', padding: 'var(--spacing-lg)', backgroundColor: '#f9fafb', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xs)' }}>About the Author</h4>
                    <p style={{ fontWeight: '600', color: 'var(--color-primary)', marginBottom: 'var(--spacing-xs)' }}>{article.customAuthor.name}</p>
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>{article.customAuthor.bio}</p>
                </div>
            )}

            {article.tags && article.tags.length > 0 && (
                <div style={{ maxWidth: '800px', margin: 'var(--spacing-2xl) auto 0', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>Tags</h4>
                    <div className="flex" style={{ flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                        {article.tags.map((tag, i) => (
                            <span key={tag._id || i} style={{ backgroundColor: 'var(--color-border)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '500' }}>#{tag.name}</span>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
};

export default ArticlePage;
