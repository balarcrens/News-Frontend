import api from './axios';

export const userService = {
  // Get all users
  getUsers: async () => {
    try {
      const { data } = await api.get('/api/users');
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Update user role
  updateRole: async (id, role) => {
    try {
      const { data } = await api.put(`/api/users/${id}/role`, { role });
      return data;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const { data } = await api.delete(`/api/users/${id}`);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
};
