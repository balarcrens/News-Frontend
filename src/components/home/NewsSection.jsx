import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const ArticleCard = ({ category, title, summary, image, slug, type }) => (
    <Link to={`/article/${slug}`} className="group cursor-pointer block">
        <div className="overflow-hidden rounded-xl h-52 md:h-64 mb-4 md:mb-6 bg-gray-100">
            <OptimizedImage
                src={image}
                alt={title}
                aspectRatio="h-full"
                className="w-full h-full"
            />
        </div>
        <div className="flex items-center space-x-2 mb-2 md:mb-3">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest">{category}</span>
            {type === 'blog' && (
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-widest">Blog</span>
            )}
        </div>
        <h3 className="text-lg md:text-xl font-bold font-serif mb-2 md:mb-3 leading-tight group-hover:text-red-700 transition-colors line-clamp-2">
            {title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {summary}
        </p>
    </Link>
);

const CategoryRow = ({ title, articles = [], loading = false }) => (
    <div className="mb-16 md:mb-20">
        <div className="flex items-center justify-between mb-6 md:mb-8 pb-3 md:pb-4 border-b-2 border-slate-900">
            <h2 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight">{title}</h2>
            <Link to={`/category/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 hover:opacity-70 transition-opacity">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {loading ? (
                <>
                    <div className="animate-pulse h-72 md:h-80 bg-gray-100 rounded-xl"></div>
                    <div className="animate-pulse h-72 md:h-80 bg-gray-100 rounded-xl"></div>
                </>
            ) : (
                articles.length > 0 ? (
                    articles.map((article, i) => (
                        <ArticleCard
                            key={article._id || i}
                            category={article.category?.name || title}
                            title={article.title}
                            summary={article.summary}
                            image={article.media?.featuredImage}
                            slug={article.slug}
                            type={article.type}
                        />
                    ))
                ) : (
                    <div className="col-span-2 py-10 md:py-20 text-center border-2 border-dashed border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600">
                        Initial content coming soon to {title}
                    </div>
                )
            )}
        </div>
    </div>
);

const NewsSection = ({ categoriesData = [], loading = false }) => (
    <div>
        {categoriesData.map((section, idx) => (
            <CategoryRow
                key={section.id || idx}
                title={section.name}
                articles={section.articles}
                loading={loading}
            />
        ))}
    </div>
);

export default NewsSection;

