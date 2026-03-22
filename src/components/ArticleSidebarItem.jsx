import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ArticleSidebarItem = ({ article, index, showImage = true }) => {
    const publishedText = article.publishedAt
        ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
        : 'Recently';

    const imgUrl = article.media?.featuredImage || `https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&q=80`;

    return (
        <Link
            to={`/article/${article.slug}`}
            className="flex gap-md py-sm border-b hover-bg transition-all"
            style={{
                borderColor: 'var(--color-border)',
                textDecoration: 'none',
                alignItems: 'center'
            }}
        >
            <div style={{
                fontSize: '1.25rem',
                fontWeight: '900',
                color: 'var(--color-border)',
                minWidth: '25px',
                textAlign: 'center'
            }}>
                {index + 1}
            </div>

            {showImage && (
                <div style={{ width: '80px', height: '60px', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            <div className="flex flex-col gap-xs flex-1">
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {article.category?.name || 'News'}
                </span>
                <h4 className="font-serif" style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.25', color: 'var(--color-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.title}
                </h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', gap: 'xs' }}>
                    <span>{publishedText}</span>
                </div>
            </div>
        </Link>
    );
};

export default ArticleSidebarItem;
