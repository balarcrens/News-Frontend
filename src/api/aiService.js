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
   * Suggests catching headlines from a hint
   * @param {string} hint
   * @returns {Promise<Object>} Suggestions object
   */
  suggestTitles: async (hint) => {
    try {
      const { data } = await api.post('/api/ai/suggest-titles', { hint });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Generates a full news article based on a topic or hint
   * @param {string} topic The selected topic/title
   * @param {string} hint Custom instructions
   * @returns {Promise<Object>} The generated article data
   */
  generateArticle: async (topic, hint) => {
    try {
      const { data } = await api.post('/api/ai/generate-article', { topic, hint });
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
