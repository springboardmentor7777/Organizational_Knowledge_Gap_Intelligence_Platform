import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token if it exists in local storage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.warn("Backend API call failed, falling back to mock authentication:", error);
      // Simulate mock backend login for Milestone 1 demonstration
      if (email && password) {
        let role = 'Employee';
        const emailLower = email.toLowerCase();
        if (emailLower.includes('admin')) {
          role = 'System Administrator';
        } else if (emailLower.includes('manager') || emailLower.includes('lead')) {
          role = 'Team Lead / Manager';
        } else if (emailLower.includes('hr')) {
          role = 'HR Specialist';
        } else if (emailLower.includes('dept') || emailLower.includes('head')) {
          role = 'Department Head';
        } else if (emailLower.includes('ld')) {
          role = 'L&D Admin';
        }

        return {
          token: 'mock-jwt-token-xyz-123',
          user: {
            email,
            role,
            name: email.split('@')[0].toUpperCase(),
          }
        };
      }
      throw error;
    }
  },

  loginWithGoogle: async (credential) => {
    try {
      const response = await apiClient.post('/auth/oauth2/google', { credential });
      return response.data;
    } catch (error) {
      console.warn("Backend Google OAuth API call failed, falling back to mock Google OAuth login:", error);
      return {
        token: 'mock-google-jwt-token-xyz-123',
        user: {
          email: 'google.user@example.com',
          role: 'Employee',
          name: 'GOOGLE USER',
        }
      };
    }
  },

  requestPasswordReset: async (email) => {
    try {
      const response = await apiClient.post('/auth/reset-password/request', { email });
      return response.data;
    } catch (error) {
      console.warn("Backend reset request failed, falling back to mock success response:", error);
      return { message: 'Password reset link sent successfully to ' + email };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/auth/reset-password/confirm', { token, newPassword });
      return response.data;
    } catch (error) {
      console.warn("Backend reset confirm failed, falling back to mock success response:", error);
      return { message: 'Password has been reset successfully!' };
    }
  }
};
