import api from './axios';

export const commentService = {
  // Get all approved comments for an article
  getByArticle: async (articleId) => {
    try {
      const { data } = await api.get(`/api/comments/article/${articleId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching comments for article ${articleId}:`, error.message);
      throw error;
    }
  },

  // Add a new comment
  add: async (commentData) => {
    try {
      const { data } = await api.post('/api/comments', commentData);
      return data;
    } catch (error) {
      console.error("Error adding comment:", error.message);
      throw error;
    }
  },

  // Delete a comment
  delete: async (commentId) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      throw error;
    }
  },

  // Like / Unlike a comment
  like: async (commentId) => {
    try {
      const { data } = await api.put(`/api/comments/${commentId}/like`);
      return data;
    } catch (error) {
      console.error("Error liking comment:", error.message);
      throw error;
    }
  }
};
