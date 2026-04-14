import api from './axios';

export const aiService = {
  /**
   * Generates a list of trending news topics
   * @returns {Promise<Array>} List of topics
   */
  generateTopics: async () => {
    try {
      const { data } = await api.post('/api/ai/generate-topics');
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Generates a full news article based on a topic
   * @param {string} topic The selected topic/title
   * @returns {Promise<Object>} The generated article data
   */
  generateArticle: async (topic) => {
    try {
      const { data } = await api.post('/api/ai/generate-article', { topic });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
