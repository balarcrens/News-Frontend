import api from './axios';

export const articleService = {
  // Fetch breaking news
  getBreakingNews: async (limit = 5) => {
    const { data } = await api.get(`/api/articles?isBreaking=true&limit=${limit}`);
    return data.articles;
  },

  // Fetch featured articles for Hero
  getFeaturedArticles: async (limit = 3) => {
    const { data } = await api.get(`/api/articles?isFeatured=true&limit=${limit}`);
    return data.articles;
  },

  // Fetch articles by category
  getArticlesByCategory: async (categoryId, limit = 4) => {
    const { data } = await api.get(`/api/articles?category=${categoryId}&limit=${limit}`);
    return data.articles;
  },

  // Get articles by category or other filters (Generic)
  getArticles: async (params = {}) => {
    try {
      const { data } = await api.get('/api/articles', { params });
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // Fetch popular news
  getPopularNews: async (limit = 5) => {
    const { data } = await api.get(`/api/articles?sortBy=views&limit=${limit}`);
    return data.articles;
  },

  // Fetch latest news
  getLatestNews: async (limit = 5) => {
    const { data } = await api.get(`/api/articles?limit=${limit}`);
    return data.articles;
  },

  // Fetch article by slug for detail page
  getArticleBySlug: async (slug) => {
    try {
      const { data } = await api.get(`/api/articles/${slug}`);
      return data;
    } catch (error) {
      console.error(`Error fetching article with slug ${slug}:`, error);
      throw error;
    }
  },

  // Fetch all categories
  getCategories: async () => {
    const { data } = await api.get('/api/categories');
    return data;
  }
};
