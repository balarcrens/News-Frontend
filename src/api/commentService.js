import api from './axios';

export const commentService = {
  // Get all approved comments for an article
  getByArticle: async (articleId) => {
    try {
      const { data } = await api.get(`/api/comments/article/${articleId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error);
      throw error;
    }
  },

  // Add a new comment
  add: async (commentData) => {
    try {
      const { data } = await api.post('/api/comments', commentData);
      return data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }
};
