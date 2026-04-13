import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleService } from '../api/articleService';
import { commentService } from '../api/commentService';
import ArticleHero from '../components/article/ArticleHero';
import ArticleSidebar from '../components/article/ArticleSidebar';
import FloatingActions from '../components/article/FloatingActions';
import DiscussionSection from '../components/article/DiscussionSection';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

const RelatedArticleCard = ({ article }) => (
    <div className="group cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-gray-50">
            <img
                src={article.media?.featuredImage || 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
        </div>
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            {article.category?.name || 'Editorial'}
        </p>
        <h3 className="text-xl font-black font-serif italic tracking-tight text-slate-900 leading-tight group-hover:text-red-700 transition-colors line-clamp-2">
            <Link to={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
    </div>
);

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const viewRecordedRef = useRef(null);

    useEffect(() => {
        const fetchArticleData = async () => {
            setLoading(true);

            try {
                const data = await articleService.getArticleBySlug(slug);
                setArticle(data);

                const [commentsData, relatedData] = await Promise.all([
                    commentService.getByArticle(data._id),
                    articleService.getArticles({
                        category: data.category?._id,
                        limit: 3
                    })
                ]);

                setComments(commentsData);
                setRelated(
                    relatedData.articles
                        .filter(a => a._id !== data._id)
                        .slice(0, 3)
                );

                if (viewRecordedRef.current !== data._id) {
                    viewRecordedRef.current = data._id;
                    await articleService.recordView(data._id);
                    console.log('view called once');
                }

                window.scrollTo(0, 0);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticleData();
    }, [slug]);

    if (loading && !article) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-40 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-serif italic text-gray-400">Loading editorial briefing...</p>
            </div>
        );
    }

    if (!article) return <div className="py-40 text-center font-serif text-2xl">Article not found.</div>;

    return (
        <article className="bg-white">
            <SEO 
                title={article.seo?.metaTitle || article.title}
                description={article.seo?.metaDescription || article.summary}
                keywords={article.seo?.keywords || article.tags}
                ogTitle={article.seo?.ogTitle || article.title}
                ogDescription={article.seo?.ogDescription || article.summary}
                ogImage={article.seo?.ogImage || article.media?.featuredImage}
                ogType="article"
                author={article.author?.name || article.customAuthor?.name}
                publishedTime={article.publishedAt || article.createdAt}
                modifiedTime={article.updatedAt}
                category={article.category?.name}
                canonicalUrl={article.seo?.canonicalUrl}
            />
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
                <Breadcrumbs 
                    items={[
                        { label: article.category?.name || 'News', link: `/category/${article.category?.slug}` },
                        { label: article.title }
                    ]} 
                />
                <ArticleHero article={article} />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:mb-16">
                <div className="relative aspect-[15/10] sm:aspect-[21/9] overflow-hidden shadow-2xl">
                    <img
                        src={article.media?.featuredImage || 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                        alt={article.title}
                        loading='lazy'
                        className="w-full h-full object-cover blur-md transition-all duration-600 will-change-transform"
                        onLoad={(e) => e.currentTarget.classList.remove('blur-md')}
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                    />
                </div>
                <p className="mt-4 text-[9px] font-medium text-gray-400 uppercase tracking-widest text-center">
                    The Hall of Mirror, Versailles. ARCHIVES OF HUMAN INGENUITY / PHOTOGRAPHY BY NEXORA NEWS AGENCY.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row lg:gap-16 relative pb-20">
                <FloatingActions
                    articleId={article._id}
                    commentCount={comments.length}
                    articleTitle={article.title}
                    initialLikes={article.engagement?.likes || 0}
                    initialIsLiked={article.isLiked}
                />

                <div className="flex-1 max-w-2xl mx-auto lg:mx-0 article-content">
                    <div className="prose prose-slate max-w-none">
                        {article.content && Array.isArray(article.content) ? (
                            article.content.map((block, index) => {
                                const firstTextBlockIndex = article.content.findIndex(b => b.type === 'text');
                                const isFirstTextBlock = index === firstTextBlockIndex;

                                if (block.type === 'heading') {
                                    return (
                                        <h2 key={index} className="text-2xl md:text-4xl font-black font-serif italic tracking-tight text-slate-900 mb-8 mt-16 leading-tight">
                                            {block.value}
                                        </h2>
                                    );
                                }

                                if (block.type === 'text') {
                                    return (
                                        <p
                                            key={index}
                                            className={`${isFirstTextBlock ? 'drop-cap' : ''} text-md md:text-xl font-serif text-slate-700 leading-9 sm:leading-10 mb-10`}
                                        >
                                            {block.value}
                                        </p>
                                    );
                                }

                                if (block.type === 'image') {
                                    return (
                                        <figure key={index} className="my-16 space-y-4">
                                            <div className="relative overflow-hidden shadow-xl aspect-video bg-gray-50 border border-gray-100">
                                                <img
                                                    src={block.value}
                                                    alt={block.caption || 'Article media'}
                                                    className="w-full h-full object-cover will-change-transform transition-all duration-700 hover:scale-105 blur-sm"
                                                    onLoad={(e) => {
                                                        e.currentTarget.classList.remove('blur-sm');
                                                    }}
                                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                                                />
                                            </div>
                                            {block.caption && (
                                                <figcaption className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest italic leading-relaxed max-w-lg mx-auto">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                }

                                if (block.type === 'quote') {
                                    return (
                                        <blockquote key={index} className="my-16 border-l-4 border-red-700 pl-8 relative">
                                            <span className="absolute -left-3 -top-10 text-8xl text-red-700/10 font-serif leading-none select-none">“</span>
                                            <p className="text-3xl md:text-4xl font-black font-serif italic text-slate-900 tracking-tight leading-[1.15]">
                                                {block.value}
                                            </p>
                                        </blockquote>
                                    );
                                }

                                return null;
                            })
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-xl">
                                <p className="text-xl font-serif text-gray-400 italic">
                                    This immersive briefing is currently being processed...
                                </p>
                            </div>
                        )}

                        {/* Gallery Section */}
                        {article.media?.gallery && article.media.gallery.length > 0 && (
                            <div className="mt-20 pt-20 border-t border-gray-100">
                                <h3 className="text-[10px] font-bold text-red-700 uppercase tracking-[0.3em] mb-10">Extended Visual Report</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {article.media.gallery.map((img, i) => (
                                        <div key={i} className={`relative overflow-hidden bg-gray-50 ${i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all blur-sm duration-700"
                                                alt={`Gallery ${i}`}
                                                onLoad={(e) => {
                                                    e.currentTarget.classList.remove('blur-sm');
                                                }}
                                                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right - Insights Sidebar */}
                <div className="lg:w-80 shrink-0">
                    <ArticleSidebar article={article} />
                </div>
            </div>

            {/* More From Grid */}
            {related.length > 0 && (
                <div className="bg-[#FBFBFB] py-24 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between mb-16 px-2">
                            <div>
                                <p className="text-red-700 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">CURATED READING</p>
                                <h2 className="text-3xl md:text-5xl font-black font-serif italic tracking-tighter text-slate-900">
                                    More from The Daily Pulse
                                </h2>
                            </div>
                            <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-red-700 transition-colors border-b-2 border-transparent hover:border-red-700 pb-1">
                                View All Stories
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {related.map(a => <RelatedArticleCard key={a._id} article={a} />)}
                        </div>
                    </div>
                </div>
            )}

            {/* Discussion Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
                <DiscussionSection comments={comments} />
            </div>

            <style>{`
                .drop-cap::first-letter {
                    float: left;
                    font-size: 8rem;
                    line-height: 0.65;
                    padding-top: 0.5rem;
                    padding-right: 1.2rem;
                    padding-left: 0.3rem;
                    font-weight: 900;
                    color: #B91C1C;
                    font-family: 'Playfair Display', serif;
                    font-style: thin;
                }
                .article-content p {
                    text-align: justify;
                }
            `}</style>
        </article>
    );
};

export default ArticlePage;
