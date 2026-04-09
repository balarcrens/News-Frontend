import api from './axios';

export const categoryService = {
  // Get all categories with counts
  getAll: async () => {
    try {
      const { data } = await api.get('/api/categories');
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Get single category by slug
  getBySlug: async (slug) => {
    try {
      const { data } = await api.get(`/api/categories/slug/${slug}`);
      return data;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw error;
    }
  }
};
