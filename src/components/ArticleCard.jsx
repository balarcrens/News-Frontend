import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { getOptimizedImage } from '../utils/imageUtils';

const ArticleCard = memo(({ article, featured = false }) => {
    const publishedText = article.publishedAt
        ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
        : 'Published';

    const rawImgUrl = article.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80`;
    const imgUrl = getOptimizedImage(rawImgUrl, { width: featured ? 1200 : 800 });
    const categoryName = article.category?.name || 'News';
    const authorName = article.customAuthor?.name || article.author?.name || 'Editorial Team';
    const readingTime = Math.ceil((article.content?.length || 0) / 1000) || 5;

    if (featured) {
        return (
            <Link to={`/article/${article.slug || 'dummy-slug'}`} className="article-card article-card--featured" style={{ border: 'none', boxShadow: 'none' }}>
                <div className="article-card-image-wrap" style={{ borderRadius: 'var(--radius-lg)' }}>
                    <img src={imgUrl} alt={article.title} className="article-card-image" loading="lazy" />
                </div>
                <div className="article-card-content" style={{ paddingInline: 'var(--spacing-xl)' }}>
                    <div className="flex items-center gap-md mb-xs">
                        <span className="article-category" style={{ letterSpacing: '0.05em' }}>{categoryName}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{readingTime} min read</span>
                    </div>
                    <h2 className="article-title article-title-link" style={{ fontSize: '2.25rem', lineHeight: '1.1' }}>{article.title}</h2>
                    <p className="article-excerpt" style={{ fontSize: '1.125rem', color: 'var(--color-text-main)', opacity: 0.8 }}>{article.summary}</p>
                    <div className="article-meta">
                        <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{authorName}</span>
                        <span style={{ fontStyle: 'italic' }}>{publishedText}</span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link to={`/article/${article.slug || 'dummy-slug'}`} className="article-card glass">
            <div className="article-card-image-wrap">
                <img src={imgUrl} alt={article.title} className="article-card-image" loading="lazy" />
            </div>
            <div className="article-card-content">
                <div className="flex items-center justify-between mb-xs">
                    <span className="article-category" style={{ fontSize: '0.7rem' }}>{categoryName}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{readingTime} min</span>
                </div>
                <h3 className="article-title article-title-link" style={{ fontSize: '1.125rem' }}>{article.title}</h3>
                <p className="article-excerpt" style={{ fontSize: '0.875rem' }}>{article.summary}</p>
                <div className="article-meta">
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{authorName}</span>
                    <span>{publishedText}</span>
                </div>
            </div>
        </Link>
    );
});

export default ArticleCard;
