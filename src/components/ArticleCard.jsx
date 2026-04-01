import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { getOptimizedImage } from '../utils/imageUtils';

const ArticleCard = memo(({ article, index = 0 }) => {
    const publishedText = article.publishedAt
        ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
        : 'Published';

    const rawImgUrl = article.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80`;
    const imgUrl = getOptimizedImage(rawImgUrl, { width: 800 });
    const categoryName = article.category?.name || 'News';
    const authorName = article.customAuthor?.name || article.author?.name || 'Editorial Team';
    const readingTime = Math.ceil((article.content?.length || 0) / 1000) || 5;

    return (
        <Link 
            to={`/article/${article.slug || 'artical'}`} 
            className={`premium-card animate-in stagger-${(index % 4) + 1}`}
        >
            <div className="article-card-image-wrap" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img 
                    src={imgUrl} 
                    alt={article.title} 
                    className="article-card-image" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    loading="lazy" 
                />
            </div>
            <div className="article-card-content" style={{ padding: 'var(--spacing-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex items-center justify-between mb-sm">
                    <span className="article-category" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-white)' }}>{categoryName}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{readingTime} min</span>
                </div>
                <h3 className="font-serif mb-sm" style={{ fontSize: '1.25rem', lineHeight: '1.3', color: 'var(--color-primary)', fontWeight: '800' }}>{article.title}</h3>
                <p className="article-excerpt" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.summary}</p>
                <div className="mt-auto pt-md flex items-center justify-between border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.85rem' }}>{authorName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{publishedText}</span>
                </div>
            </div>
        </Link>
    );
});

export default ArticleCard;
