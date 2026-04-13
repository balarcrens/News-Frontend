import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import Sidebar from '../components/home/Sidebar';
import { articleService } from '../api/articleService';
import SEO from '../components/common/SEO';

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
                // Fetch all data in ONE optimized call
                const homeData = await articleService.getHomeData();

                setData({
                    featured: homeData.featured,
                    categories: homeData.categories,
                    latest: homeData.latest.slice(0, 5),
                    popular: homeData.popular
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
            <SEO 
                title="Nexora News | Premium Global News Network"
                description="Stay ahead with Nexora News. Deep insights into world politics, business, technology, and culture. Experience journalism refined."
                keywords={['news', 'global news', 'politics', 'business', 'technology', 'editorial', 'Nexora']}
            />
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
