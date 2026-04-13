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
  },

  // Admin: Create new category
  createCategory: async (categoryData) => {
    try {
      const { data } = await api.post('/api/categories', categoryData);
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Admin: Update existing category
  updateCategory: async (id, categoryData) => {
    try {
      const { data } = await api.put(`/api/categories/${id}`, categoryData);
      return data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  },

  // Admin: Delete category
  deleteCategory: async (id) => {
    try {
      const { data } = await api.delete(`/api/categories/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  }
};

