import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const CardLarge = ({ category, title, summary, image, slug }) => (
    <Link to={`/article/${slug}`} className="relative group cursor-pointer block overflow-hidden rounded-xl h-[450px] md:h-[600px] bg-gray-100">
        <OptimizedImage
            src={image}
            alt={title}
            priority={true}
            aspectRatio="h-full"
            className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-2xl">
            <span className="inline-block px-3 py-1 bg-red-700 text-[10px] font-bold text-white uppercase tracking-widest mb-4">
                {category}
            </span>
            <h2 className="text-2xl md:text-4xl font-black font-serif text-white mb-6 line-clamp-2 leading-[1.1]">
                {title}
            </h2>
            <p className="hidden md:line-clamp-2 text-gray-500 text-sm md:text-base mb-8 tracking-tighter">
                {summary}
            </p>
            <div className="flex items-center space-x-6">
                <div className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-none">
                    Read Full Report
                </div>
            </div>
        </div>
    </Link>
);

const CardSmall = ({ category, title, image, slug }) => (
    <Link to={`/article/${slug}`} className="relative group cursor-pointer block overflow-hidden rounded-xl h-[215px] md:h-[290px] bg-gray-100">
        <OptimizedImage
            src={image}
            alt={title}
            aspectRatio="h-full"
            className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                {category}
            </span>
            <h3 className="text-lg md:text-xl font-bold font-serif text-white leading-tight line-clamp-2">
                {title}
            </h3>
        </div>
    </Link>
);

const HeroSection = ({ articles = [], loading = false }) => {
    if (loading) return (
        <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[450px] md:h-[600px] bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                     <div className="w-full h-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"></div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="h-[215px] md:h-[290px] bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                         <div className="w-full h-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"></div>
                    </div>
                    <div className="h-[215px] md:h-[290px] bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                         <div className="w-full h-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 3);

    return (
        <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {mainArticle ? (
                        <CardLarge
                            category={mainArticle.category?.name || "Featured"}
                            title={mainArticle.title}
                            summary={mainArticle.summary}
                            image={mainArticle.media?.featuredImage}
                            slug={mainArticle.slug}
                        />
                    ) : (
                        <div className="h-[450px] md:h-[600px] bg-gray-50 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 uppercase text-xs font-bold tracking-widest text-gray-600">
                            Featured Spotlight
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-6">
                    {sideArticles.length > 0 ? (
                        sideArticles.map((article, i) => (
                            <CardSmall
                                key={article._id || i}
                                category={article.category?.name || "Hot Topic"}
                                title={article.title}
                                image={article.media?.featuredImage}
                                slug={article.slug}
                            />
                        ))
                    ) : (
                        <>
                            <div className="h-[215px] md:h-[290px] bg-gray-50 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 uppercase text-xs font-bold tracking-widest text-gray-600">
                                Trending Topic
                            </div>
                            <div className="h-[215px] md:h-[290px] bg-gray-50 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 uppercase text-xs font-bold tracking-widest text-gray-600">
                                Trending Topic
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

