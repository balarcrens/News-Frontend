import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const BreakingNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchBreaking = async () => {
            try {
                // Fetch latest articles and filter locally for breaking news
                const { data } = await api.get('/api/articles?limit=50');
                const fetchedArticles = Array.isArray(data) ? data : (data.articles || []);

                const breakingItems = fetchedArticles.filter(art => art.isBreaking === true);

                if (breakingItems.length > 0) {
                    setNews(breakingItems);
                } else {
                    // Fallback headlines if no breaking news in database
                    setNews([
                        { _id: 'b1', title: 'Global Tech Conference set to begin next week in San Francisco', slug: '#' },
                        { _id: 'b2', title: 'New Economic Reports show steady growth in emerging markets', slug: '#' },
                        { _id: 'b3', title: 'Scientific Breakthrough: New method developed for sustainable water purification', slug: '#' }
                    ]);
                }
            } catch (err) {
                console.error('Failed to fetch breaking news', err);
            }
        };
        fetchBreaking();
    }, []);

    if (news.length === 0) return null;

    return (
        <div className="breaking-news-marquee glass" style={{
            marginTop: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            padding: '10px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderTop: '2px solid var(--color-accent)',
            borderBottom: '2px solid var(--color-accent)',
            position: 'relative'
        }}>
            <div className="flex items-center" style={{ animation: 'marquee 40s linear infinite', display: 'inline-flex' }}>
                <span style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    padding: '2px 10px',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    marginRight: '20px',
                    borderRadius: '2px'
                }}>Breaking News</span>
                {news.map((item, i) => (
                    <span key={item._id || i} style={{ marginRight: '50px', fontSize: '1rem', fontWeight: '600' }}>
                        <Link to={`/article/${item.slug}`} className="hover-text-accent transition-all">
                            {item.title}
                        </Link>
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default BreakingNews;
