/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Skeleton from '../components/Skeleton';
import { getOptimizedImage } from '../utils/imageUtils';

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [extraLoading, setExtraLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentData, setCommentData] = useState({ userName: '', email: '', comment: '' });
    const [submittingComment, setSubmittingComment] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [relatedArticles, setRelatedArticles] = useState([]);

    const fetchArticleData = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.get(`/api/articles/${slug}`);
            if (data) {
                setArticle(data);
                setLikes(data.engagement?.likes || 0);
                setIsLiked(data.isLiked || false);
                setLoading(false); // Article main content loaded

                // Fetch extra data in parallel
                setExtraLoading(true);
                const articleId = data._id;
                const categoryId = data.category?._id;

                const requests = [api.get(`/api/comments/article/${articleId}`)];
                if (categoryId) {
                    requests.push(api.get(`/api/articles?category=${categoryId}&limit=4`));
                }

                const results = await Promise.all(requests.map(p => p.catch(e => ({ data: [] }))));
                
                setComments(results[0].data || []);
                if (results[1]) {
                    const related = Array.isArray(results[1].data) ? results[1].data : (results[1].data.articles || []);
                    setRelatedArticles(related.filter(a => a._id !== articleId).slice(0, 3));
                }
                setExtraLoading(false);
            } else {
                setError('not_found');
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            if (err.response && err.response.status === 404) {
                setError('not_found');
            } else {
                setError('fetch_error');
            }
            setLoading(false);
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
            // Re-fetch comments
            const { data } = await api.get(`/api/comments/article/${article._id}`);
            setComments(data);
            alert('Comment posted successfully!');
        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Failed to post comment.');
        } finally {
            setSubmittingComment(false);
        }
    };

    useEffect(() => {
        fetchArticleData();

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [slug]);

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
                onRetry={fetchArticleData}
            />
        );
    }

    const imgUrl = article?.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80`;
    const metaTitle = article?.seo?.metaTitle || article?.title;
    const metaDesc = article?.seo?.metaDescription || article?.summary;
    const readingTime = article ? Math.ceil((article.content?.length || 0) / 1000) || 5 : 5;

    const shareOnSocial = (platform) => {
        if (!article) return;
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
        <article className="mt-md mb-2xl container" style={{ maxWidth: '1100px' }}>
            {/* Reading Progress Bar */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: `${scrollProgress}%`,
                    height: '4px',
                    backgroundColor: 'var(--color-accent)',
                    zIndex: 1000,
                    transition: 'width 0.1s ease-out',
                    boxShadow: '0 0 10px rgba(200, 16, 46, 0.4)'
                }}
            />

            <SEO
                title={metaTitle}
                description={metaDesc}
                ogTitle={article?.seo?.ogTitle}
                ogDescription={article?.seo?.ogDescription}
                ogImage={article?.seo?.ogImage || imgUrl}
                ogType="article"
                canonicalUrl={article?.seo?.canonicalUrl}
                keywords={article?.seo?.keywords || article?.tags?.map(t => t.name)}
                author={article?.customAuthor?.name || article?.author?.name}
                publishedDate={article?.publishedAt}
            />

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Breadcrumbs 
                    items={[
                        { label: article?.category?.name || 'News', link: article?.category?.slug ? `/category/${article.category.slug}` : '/' },
                        { label: article?.title || 'Article' }
                    ]} 
                />
            </div>

            <header className="article-header" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div className="flex items-center gap-md mb-md flex-wrap">
                    {loading ? (
                        <Skeleton width="100px" height="1.5rem" borderRadius="4px" />
                    ) : article?.category?.name && (
                        <span className="article-category" style={{ backgroundColor: 'var(--color-accent)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {article.category.name}
                        </span>
                    )}
                    <div className="flex items-center gap-md text-muted" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                        <span className="flex items-center gap-xs"><Clock size={14} /> {loading ? <Skeleton width="40px" height="1rem" /> : `${readingTime} min read`}</span>
                        <span className="flex items-center gap-xs"><Eye size={14} /> {loading ? <Skeleton width="40px" height="1rem" /> : `${article.engagement?.views || 0} views`}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col gap-sm mb-xl">
                        <Skeleton width="90%" height="3.5rem" />
                        <Skeleton width="70%" height="3.5rem" />
                    </div>
                ) : (
                    <h1 className="article-title font-serif" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: '1.1', marginBottom: 'var(--spacing-lg)', color: 'var(--color-primary)', fontWeight: '900' }}>
                        {article.title}
                    </h1>
                )}

                {loading ? (
                    <div className="flex flex-col gap-xs mb-xl">
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="80%" height="1.2rem" />
                    </div>
                ) : (
                    <div className="article-excerpt-container animate-in stagger-2" style={{ marginBottom: 'var(--spacing-2xl)', maxWidth: '900px' }}>
                        <p className="article-excerpt" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)', borderLeft: '4px solid var(--color-accent)', paddingLeft: 'var(--spacing-lg)', fontStyle: 'italic' }}>
                            {article.summary}
                        </p>
                        
                        {/* Quick Highlights for AdSense Contentability */}
                        <div className="glass p-lg rounded-lg border-l-4 border-accent bg-slate-50/50" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <h4 className="text-xs uppercase font-bold text-accent tracking-widest mb-sm">Key Takeaways</h4>
                            <ul className="flex flex-col gap-xs" style={{ listStyle: 'none', fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                                {article.content && typeof article.content === 'string' ? (
                                    article.content.split('.').slice(0, 3).map((sentence, i) => (
                                        sentence.trim() && <li key={i} className="flex gap-sm items-start"><span className="text-accent mt-1">•</span> {sentence.trim()}.</li>
                                    ))
                                ) : (
                                    <li className="flex gap-sm items-start"><span className="text-accent mt-1">•</span> Deep-dive analysis on the latest global developments.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-xl py-lg border-t border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-md">
                        <Link to={`/author/${article?.author?._id || '#'}`} style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-accent)', padding: '2px' }}>
                            {loading ? (
                                <Skeleton variant="circular" width="100%" height="100%" />
                            ) : (
                                <img src={article.author?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Journalist"} alt="Author" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            )}
                        </Link>
                        <div>
                            {loading ? (
                                <div className="flex flex-col gap-xs">
                                    <Skeleton width="120px" height="1.1rem" />
                                    <Skeleton width="100px" height="0.85rem" />
                                </div>
                            ) : (
                                <>
                                    <Link to={`/author/${article?.author?._id || '#'}`} className="hover:text-accent transition-colors" style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                                        {article.customAuthor?.name || article.author?.name || 'Editorial Board'}
                                    </Link>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                        {article.publishedAt ? format(new Date(article.publishedAt), 'MMMM d, yyyy • h:mm a') : 'Unpublished Draft'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-sm">
                        <div className="flex items-center gap-sm bg-gray-50 rounded-full p-1">
                            <button
                                onClick={handleLike}
                                disabled={loading}
                                className={`flex items-center gap-sm px-md py-sm rounded-full transition-all ${isLiked ? 'bg-accent' : 'hover:bg-gray-100'}`}
                                style={{
                                    border: 'none',
                                    outline: 'none'
                                }}
                            >
                                <Heart size={20} fill={isLiked ? "red" : "none"} />
                                <span style={{ fontWeight: '700' }}>{loading ? '0' : likes}</span>
                            </button>
                            <div className="w-px h-6 bg-gray-200 mx-xs"></div>
                            <div className="flex items-center gap-sm px-md py-sm text-muted">
                                <MessageCircle size={20} />
                                <span style={{ fontWeight: '700' }}>{loading || extraLoading ? '0' : comments.length}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-xs ml-md">
                            <button onClick={() => shareOnSocial('facebook')} className="icon-btn hover:bg-gray-100 rounded-full p-sm" title="Share on Facebook"><Facebook size={18} /></button>
                            <button onClick={() => shareOnSocial('twitter')} className="icon-btn hover:bg-gray-100 rounded-full p-sm" title="Share on Twitter"><Twitter size={18} /></button>
                            <button onClick={() => shareOnSocial('linkedin')} className="icon-btn hover:bg-gray-100 rounded-full p-sm" title="Share on LinkedIn"><Linkedin size={18} /></button>
                            <button onClick={() => shareOnSocial('native')} className="icon-btn hover:bg-gray-100 rounded-full p-sm" title="Copy Link"><Share2 size={18} /></button>
                        </div>
                    </div>
                </div>
            </header>

            <figure style={{ marginBottom: 'var(--spacing-3xl)', position: 'relative' }}>
                {loading ? (
                    <Skeleton width="100%" height="600px" borderRadius="var(--radius-lg)" />
                ) : (
                    <img
                        src={getOptimizedImage(article.media?.featuredImage, { width: 1200 })}
                        alt={article.title}
                        className="article-hero-image shadow-2xl"
                        style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '600px', objectFit: 'cover' }}
                        loading="eager"
                        fetchPriority="high"
                    />
                )}
                {!loading && article?.media?.imageAlt && (
                    <figcaption style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', fontSize: '0.75rem', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                        © {article.media.imageAlt}
                    </figcaption>
                )}
            </figure>

            <div
                className="article-body font-serif"
                style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.35rem)',
                    lineHeight: '1.8',
                    color: 'var(--color-text-main)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    hyphens: 'auto'
                }}
            >
                {loading ? (
                    <div className="flex flex-col gap-md">
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="90%" height="1.2rem" />
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="95%" height="1.2rem" />
                        <Skeleton width="100%" height="1.2rem" />
                        <Skeleton width="85%" height="1.2rem" />
                    </div>
                ) : Array.isArray(article?.content) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                        {article.content.map((block, index) => {
                            switch (block.type) {
                                case 'heading':
                                    return <h2 key={index} style={{ fontSize: '2rem', fontWeight: '900', marginTop: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)', lineHeight: '1.2' }}>{block.value}</h2>;
                                case 'image':
                                    return (
                                        <figure key={index} style={{ margin: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
                                            <img src={block.value} alt={block.caption || "Article image"} style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} loading="lazy" />
                                            {block.caption && <figcaption style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-md)', fontStyle: 'italic', maxWidth: '600px', marginInline: 'auto' }}>{block.caption}</figcaption>}
                                        </figure>
                                    );
                                case 'text':
                                default:
                                    return <p key={index} style={{ marginBottom: 'var(--spacing-lg)', whiteSpace: 'pre-wrap' }}>{block.value}</p>;
                            }
                        })}
                    </div>
                ) : (
                    <div className="prose" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: article?.content }}></div>
                )}
            </div>

            {/* Tags Section */}
            {!loading && article?.tags && article.tags.length > 0 && (
                <div style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0', padding: 'var(--spacing-xl) 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-sm flex-wrap">
                        <span style={{ fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>Filed Under:</span>
                        {article.tags.map((tag, i) => (
                            <Link key={tag._id || i} to={`/tag/${tag.slug || tag.name?.toLowerCase()}`} className="hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--color-hover-bg)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
                                #{tag.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Author Bio Card for AdSense E-E-A-T */}
            {!loading && article?.author && (
                <div className="animate-in fade-up" style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0' }}>
                    <div className="p-xl rounded-2xl flex flex-col md:flex-row items-center gap-lg border-2 border-accent/20">
                        <Link to={`/author/${article.author._id}`} style={{ flexShrink: 0 }}>
                            <img 
                                src={article.author.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Journalist"} 
                                alt={article.author.name} 
                                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid white' }} 
                            />
                        </Link>
                        <div className="text-center md:text-left">
                            <h4 className="font-bold text-lg mb-xs">Written by <Link to={`/author/${article.author._id}`} className="text-accent underline">{article.author.name}</Link></h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-md">
                                {article.author.bio || "NexoraNews senior editorial contributor specializing in global news and technological insights. Committed to delivering independent journalism."}
                            </p>
                            <Link to={`/author/${article.author._id}`} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.75rem', borderRadius: 'var(--radius-full)' }}>
                                All stories by {article.author.name.split(' ')[0]}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Related Articles Section */}
            {(extraLoading || relatedArticles.length > 0) && (
                <div style={{ maxWidth: '1100px', margin: 'var(--spacing-3xl) auto 0' }}>
                    <div className="flex items-center justify-between mb-xl">
                        <h3 className="font-serif" style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-primary)' }}>{loading ? <Skeleton width="200px" height="2rem" /> : `More from ${article?.category?.name || 'News'}`}</h3>
                        {!loading && <Link to="/" className="text-accent font-bold text-sm tracking-widest uppercase hover:underline">View All</Link>}
                    </div>
                    <div className="grid md:grid-cols-3 gap-xl">
                        {extraLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i}>
                                    <Skeleton width="100%" height="180px" borderRadius="var(--radius-lg)" className="mb-md" />
                                    <Skeleton width="100%" height="1.5rem" className="mb-sm" />
                                    <Skeleton width="50%" height="1rem" />
                                </div>
                            ))
                        ) : relatedArticles.map(rel => (
                            <Link key={rel._id} to={`/article/${rel.slug}`} className="group block">
                                <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-md)', boxShadow: 'var(--shadow-md)' }}>
                                    <img
                                        src={getOptimizedImage(rel.media?.featuredImage, { width: 400 })}
                                        alt={rel.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                        className="group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1.4', color: 'var(--color-primary)' }} className="group-hover:text-accent transition-colors">
                                    {rel.title}
                                </h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                                    {rel.publishedAt ? format(new Date(rel.publishedAt), 'MMM d, yyyy') : 'Recently'}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Comments Section */}
            <div id="comments" style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0' }}>
                <div className="flex items-center justify-between mb-xl pb-md border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="font-serif" style={{ fontSize: '2rem', fontWeight: '900' }}>Discussion {loading || extraLoading ? '(...) ' : `(${comments.length})`}</h3>
                    <div className="flex items-center gap-xs text-sm font-bold text-accent uppercase tracking-widest">
                        <MessageCircle size={18} /> Join the conversation
                    </div>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="glass p-xl mb-3xl shadow-xl" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <div className="grid md:grid-cols-2 gap-lg mb-lg">
                        <div className="flex flex-col gap-xs">
                            <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                value={commentData.userName}
                                onChange={(e) => setCommentData({ ...commentData, userName: e.target.value })}
                                style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.95rem', outline: 'none', background: "#fff", color: "#000" }}
                                placeholder="e.g. John Doe"
                                className="focus:border-accent"
                            />
                        </div>
                        <div className="flex flex-col gap-xs">
                            <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Email Address</label>
                            <input
                                type="email"
                                required
                                value={commentData.email}
                                onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                                style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.95rem', outline: 'none', background: "#fff", color: "#000" }}
                                placeholder="john@example.com"
                                className="focus:border-accent"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-xs mb-xl">
                        <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Your Thoughts</label>
                        <textarea
                            required
                            value={commentData.comment}
                            onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                            rows={5}
                            style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.95rem', outline: 'none', resize: 'vertical', background: "#fff", color: "#000" }}
                            placeholder="What do you think about this article?"
                            className="focus:border-accent"
                        />
                    </div>
                    <button type="submit" disabled={submittingComment || loading} className="btn btn-primary w-full py-md flex items-center justify-center gap-sm shadow-lg hover:shadow-accent/20">
                        {submittingComment ? 'Sending...' : <><Send size={18} /> Publish Comment</>}
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--spacing-md)' }}>Your email address will not be published.</p>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-xl">
                    {extraLoading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex gap-lg p-lg">
                                <Skeleton variant="circular" width="48px" height="48px" />
                                <div className="flex-1">
                                    <Skeleton width="150px" height="1.1rem" className="mb-xs" />
                                    <Skeleton width="100%" height="1.5rem" />
                                </div>
                            </div>
                        ))
                    ) : comments.length > 0 ? (
                        comments.map((c) => (
                            <div key={c._id} className="flex gap-lg p-lg hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontWeight: '900', fontSize: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                                    {c.userName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-sm">
                                    <div className="flex items-center gap-md">
                                        <span style={{ fontWeight: '800', color: 'var(--color-primary)' }}>{c.userName}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>{format(new Date(c.createdAt), 'MMMM d, yyyy')}</span>
                                    </div>
                                    <p style={{ fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>{c.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-3xl bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <MessageCircle size={48} className="mx-auto text-gray-300 mb-md" />
                            <p className="text-muted font-medium">No comments yet. Start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Structured Data for Google News */}
            {!loading && article && (
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
            )}
        </article>
    );
};

export default ArticlePage;