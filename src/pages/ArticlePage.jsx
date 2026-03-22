import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import {
    ArrowLeft,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    BookOpen,
    Heart,
    MessageCircle,
    Eye,
    Send,
    Clock
} from 'lucide-react';
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
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentData, setCommentData] = useState({ userName: '', email: '', comment: '' });
    const [submittingComment, setSubmittingComment] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [relatedArticles, setRelatedArticles] = useState([]);

    const fetchArticle = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/api/articles/${slug}`);
            if (data) {
                setArticle(data);
                setLikes(data.engagement?.likes || 0);
                setIsLiked(data.isLiked || false);
                fetchComments(data._id);
                if (data.category?._id) {
                    fetchRelatedArticles(data.category._id, data._id);
                }
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

    const fetchRelatedArticles = async (categoryId, currentArticleId) => {
        try {
            const { data } = await api.get(`/api/articles?category=${categoryId}`);
            const fetchedArticles = Array.isArray(data) ? data : (data.articles || []);
            setRelatedArticles(fetchedArticles.filter(a => a._id !== currentArticleId).slice(0, 3));
        } catch (err) {
            console.error('Error fetching related articles:', err);
        }
    };

    const fetchComments = async (articleId) => {
        try {
            const { data } = await api.get(`/api/comments/article/${articleId}`);
            setComments(data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await api.post(`/api/articles/${article._id}/like`);
            setLikes(data.likes);
            setIsLiked(data.isLiked);
        } catch (err) {
            console.error('Error liking article:', err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setSubmittingComment(true);
        try {
            await api.post('/api/comments', { ...commentData, articleId: article._id });
            setCommentData({ userName: '', email: '', comment: '' });
            fetchComments(article._id);
            alert('Comment posted successfully!');
        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Failed to post comment.');
        } finally {
            setSubmittingComment(false);
        }
    };

    useEffect(() => {
        fetchArticle();

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            {/* Reading Progress Bar */}
            <div 
                style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: `${scrollProgress}%`, 
                    height: '4px', 
                    backgroundColor: 'var(--color-accent)', 
                    zIndex: 100,
                    transition: 'width 0.1s ease-out'
                }} 
            />

            <SEO
                title={metaTitle}
                description={metaDesc}
                ogImage={imgUrl}
                ogType="article"
                keywords={article.seo?.keywords || article.tags?.map(t => t.name)}
                author={article.customAuthor?.name || article.author?.name}
                publishedDate={article.publishedAt}
            />

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Link to="/" className="btn btn-outline flex items-center gap-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'fit-content' }}>
                    <ArrowLeft size={16} /> Back to News
                </Link>
            </div>

            <header className="article-header">
                <div className="flex items-center gap-md mb-sm flex-wrap">
                    {article.category?.name && (
                        <span className="article-category">
                            {article.category.name}
                        </span>
                    )}
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {readingTime} min read
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={14} /> {article.engagement?.views || 0} views
                    </span>
                </div>
                <h1 className="article-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: 'var(--spacing-md)' }}>
                    {article.title}
                </h1>
                <p className="article-excerpt" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: 'var(--spacing-xl)', WebkitLineClamp: 'unset' }}>
                    {article.summary}
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-md py-md border-t border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-sm flex-wrap">
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

                    <div className="flex items-center gap-sm flex-wrap">
                        <button
                            onClick={handleLike}
                            className={`icon-btn flex items-center gap-xs ${isLiked ? 'text-accent' : ''}`}
                            style={{ 
                                width: 'auto', 
                                padding: '0 12px', 
                                borderRadius: '20px',
                                transform: isLiked ? 'scale(1.05)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                        >
                            <Heart size={18} fill={isLiked ? "var(--color-accent)" : "none"} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{likes}</span>
                        </button>
                        <div className="flex items-center gap-xs px-md border-l" style={{ height: '24px', borderColor: 'var(--color-border)' }}>
                            <MessageCircle size={18} className="text-muted" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>{comments.length}</span>
                        </div>
                        <div className="w-px h-6 bg-gray-200 mx-sm lg:block hidden"></div>
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

            <div 
                className="article-body font-serif" 
                style={{ 
                    fontSize: '1.25rem', 
                    lineHeight: '1.8', 
                    color: 'var(--color-text-main)',
                    maxWidth: '800px',
                    margin: '0 auto'
                }} 
            >
                {Array.isArray(article.content) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        {article.content.map((block, index) => {
                            switch (block.type) {
                                case 'heading':
                                    return <h2 key={index} style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>{block.value}</h2>;
                                case 'image':
                                    return (
                                        <figure key={index} style={{ margin: 'var(--spacing-xl) 0' }}>
                                            <img src={block.value} alt={block.caption || "Article image"} style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }} />
                                            {block.caption && <figcaption style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--spacing-sm)', fontStyle: 'italic' }}>{block.caption}</figcaption>}
                                        </figure>
                                    );
                                case 'text':
                                default:
                                    return <p key={index} style={{ marginBottom: 'var(--spacing-md)' }}>{block.value}</p>;
                            }
                        })}
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                )}
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
                <div style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: 'var(--spacing-xl)', borderBottom: '2px solid var(--color-accent)', display: 'inline-block' }}>Related Stories</h3>
                    <div className="grid md:grid-cols-3 gap-md">
                        {relatedArticles.map(rel => (
                            <Link key={rel._id} to={`/article/${rel.slug}`} className="group">
                                <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-sm)' }}>
                                    <img 
                                        src={rel.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80`} 
                                        alt={rel.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                        className="group-hover:scale-110"
                                    />
                                </div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.4', color: 'var(--color-primary)' }} className="group-hover:text-accent line-clamp-2">
                                    {rel.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

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

            {/* Comments Section */}
            <div style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0' }}>
                <div className="flex items-center justify-between mb-xl pb-sm border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Comments ({comments.length})</h3>
                    <div className="flex items-center gap-xs text-sm font-semibold text-accent">
                        <MessageCircle size={18} /> Community Discussion
                    </div>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="glass p-xl mb-3xl" style={{ borderRadius: 'var(--radius-xl)' }}>
                    <div className="grid md:grid-cols-2 gap-md mb-md">
                        <div className="flex flex-col gap-xs">
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Name</label>
                            <input
                                type="text"
                                required
                                value={commentData.userName}
                                onChange={(e) => setCommentData({ ...commentData, userName: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                placeholder="Your full name"
                            />
                        </div>
                        <div className="flex flex-col gap-xs">
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={commentData.email}
                                onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-xs mb-lg">
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Your Comment</label>
                        <textarea
                            required
                            value={commentData.comment}
                            onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                            rows={4}
                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', resize: 'vertical' }}
                            placeholder="Share your thoughts on this story..."
                        />
                    </div>
                    <button type="submit" disabled={submittingComment} className="btn btn-primary w-full flex items-center justify-center gap-sm">
                        {submittingComment ? 'Posting...' : <><Send size={18} /> Post Comment</>}
                    </button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-xl">
                    {comments.length > 0 ? (
                        comments.map((c) => (
                            <div key={c._id} className="flex gap-md">
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontWeight: 'bold' }}>
                                    {c.userName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-xs">
                                    <div className="flex items-center gap-md">
                                        <span style={{ fontWeight: '700' }}>{c.userName}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{format(new Date(c.createdAt), 'MMM d, yyyy')}</span>
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>{c.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-xl bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-muted">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ArticlePage;
