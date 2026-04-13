import api from './axios';

export const adminService = {
  getStats: async () => {
    try {
      const { data } = await api.get('/api/admin/stats');
      return data;
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  }
};
