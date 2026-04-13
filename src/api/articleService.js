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

  // Fetch all home data in one unified call (Optimized)
  getHomeData: async () => {
    const { data } = await api.get('/api/articles/home');
    return data;
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
  },

  // Like or unlike an article
  likeArticle: async (id) => {
    try {
      const { data } = await api.post(`/api/articles/${id}/like`);
      return data;
    } catch (error) {
      console.error(`Error liking article with id ${id}:`, error);
      throw error;
    }
  },

  // Admin: Fetch article by ID
  getArticleById: async (id) => {
    try {
      const { data } = await api.get(`/api/articles/id/${id}`);
      return data; 
    } catch (error) {
      console.error(`Error fetching article with ID ${id}:`, error);
      throw error;
    }
  },

  // Admin: Create new article
  createArticle: async (articleData) => {
    try {
      const { data } = await api.post('/api/articles', articleData);
      return data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  // Admin: Update existing article
  updateArticle: async (id, articleData) => {
    try {
      const { data } = await api.put(`/api/articles/${id}`, articleData);
      return data;
    } catch (error) {
      console.error(`Error updating article with ID ${id}:`, error);
      throw error;
    }
  },

  // Admin: Delete article
  deleteArticle: async (id) => {
    try {
      const { data } = await api.delete(`/api/articles/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting article with ID ${id}:`, error);
      throw error;
    }
  },

  // Record a unique view for an article
  recordView: async (id) => {
    try {
      const { data } = await api.post(`/api/views/${id}`);
      return data;
    } catch (error) {
      console.error(`Error recording view for article with id ${id}:`, error);
      // We don't throw here to avoid interrupting the user's reading experience
      return null;
    }
  }
};

