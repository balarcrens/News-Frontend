/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import { Loader2, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';

// Premium Dummy Article for Fallback
const DUMMY_ARTICLE = {
    _id: 'dummy',
    title: 'The Unprecedented Rise of Artificial Intelligence in Modern Journalism',
    slug: 'rise-of-ai-journalism',
    summary: 'A deep dive into how newsrooms across the globe are adopting AI to automate reports, analyze vast datasets, and sometimes, replace standard reporting entirely.',
    content: '<p>The integration of artificial intelligence in newsrooms is no longer a futuristic concept—it is a present reality. Major publications have quietly shifted toward algorithmic generation for sports summaries, financial earnings reports, and weather updates.</p><h2>The Core Benefits</h2><p>Advocates argue that AI frees journalists from mundane, repetitive tasks, allowing them to focus on investigative reporting and deep-dive analysis. The efficiency gains are undeniable. A system can parse through thousands of pages of court documents in minutes, identifying key phrases and anomalies that might take a human team weeks to uncover.</p><h2>Ethical Dilemmas</h2><p>However, the ethical implications are profound. Who is responsible when an algorithm hallucinates a fact? How do we maintain the essential human empathy required to cover sensitive topics? These questions remain largely unanswered as media conglomerates race to cut costs and increase output.</p><p>Ultimately, the successful newsroom of the future will likely treat AI not as a replacement for reporters, but as an incredibly powerful assistant. The human element—the instinct to ask the tough questions—remains irreplaceable.</p>',
    category: { name: 'Technology' },
    author: { name: 'Alex Sterling', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
    publishedAt: new Date().toISOString(),
    media: { featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80' },
    tags: [{ _id: '1', name: 'AI' }, { _id: '2', name: 'Journalism' }, { _id: '3', name: 'Future' }]
};

import SEO from '../components/SEO';

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data } = await api.get(`/api/articles/${slug}`);
                if (data) {
                    setArticle(data);
                } else {
                    setArticle(DUMMY_ARTICLE);
                }
            } catch (_) {
                console.warn('API error fetching article, using dummy data');
                setArticle(DUMMY_ARTICLE);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="loader-container">
                <Loader2 className="loader-icon" size={48} />
            </div>
        );
    }

    if (error && !article) {
        return (
            <div className="page-header" style={{ marginTop: 'var(--spacing-xl)' }}>
                <h2 className="page-title">Article Not Found</h2>
                <p className="page-description mb-lg">The story you are looking for does not exist or has been removed.</p>
                <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', gap: '8px' }}>
                    <ArrowLeft size={16} /> Return Home
                </Link>
            </div>
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
