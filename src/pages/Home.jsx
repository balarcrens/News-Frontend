import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import Sidebar from '../components/home/Sidebar';
import { articleService } from '../api/articleService';

const Home = () => {
    const [data, setData] = useState({
        featured: [],
        categories: [], // Array of { name: string, articles: [] }
        latest: [],
        popular: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            setLoading(true);
            try {
                // Fetch basic global data
                const [allCategories, featured, latest, popular] = await Promise.all([
                    articleService.getCategories(),
                    articleService.getFeaturedArticles(3),
                    articleService.getLatestNews(10),
                    articleService.getPopularNews(5)
                ]);

                // For each category, fetch its latest 2 articles
                // This ensures we show "all news not only blogs" for each category
                const categorySectionsData = await Promise.all(
                    allCategories.map(async (cat) => {
                        const articles = await articleService.getArticlesByCategory(cat._id, 2);
                        return {
                            id: cat._id,
                            name: cat.name,
                            articles: articles
                        };
                    })
                );

                // Filter out categories with no articles to keep the home page clean
                const activeCategories = categorySectionsData.filter(section => section.articles.length > 0);

                setData({
                    featured,
                    categories: activeCategories,
                    latest: latest.slice(0, 5),
                    popular
                });
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
            <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    <HeroSection articles={data.featured} loading={loading} />
                    <NewsSection 
                        categoriesData={data.categories} 
                        loading={loading} 
                    />
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                    <Sidebar 
                        latestArticles={data.latest} 
                        popularArticles={data.popular} 
                        loading={loading} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
