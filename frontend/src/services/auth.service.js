import api from './api';

// Mock mode — returns mock data when backend is unavailable
const MOCK_MODE = true;

const MOCK_USER = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@orgknow.com',
  role: 'EMPLOYEE',
  department: 'Engineering',
  jobTitle: 'Senior Software Engineer',
  avatar: null,
  joinDate: '2022-03-15',
};

const authService = {
  login: async (credentials) => {
    if (MOCK_MODE) {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 1000));
      if (credentials.email && credentials.password) {
        const roles = {
          'admin@orgknow.com': 'ADMIN',
          'hr@orgknow.com': 'HR',
          'manager@orgknow.com': 'MANAGER',
        };
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            ...MOCK_USER,
            email: credentials.email,
            role: roles[credentials.email] || 'EMPLOYEE',
            firstName: roles[credentials.email] === 'ADMIN' ? 'Super' : 
                       roles[credentials.email] === 'HR' ? 'Jane' :
                       roles[credentials.email] === 'MANAGER' ? 'Mike' : 'Alex',
            lastName: roles[credentials.email] === 'ADMIN' ? 'Admin' :
                      roles[credentials.email] === 'HR' ? 'Smith' :
                      roles[credentials.email] === 'MANAGER' ? 'Chen' : 'Johnson',
          }
        };
      }
      throw new Error('Invalid credentials');
    }
    return api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 1000));
      return { message: 'Registration successful' };
    }
    return api.post('/auth/register', userData);
  },

  forgotPassword: async (email) => {
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 800));
      return { message: 'Password reset email sent' };
    }
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token, password) => {
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 800));
      return { message: 'Password reset successful' };
    }
    return api.post('/auth/reset-password', { token, password });
  },

  refreshToken: async () => {
    return api.post('/auth/refresh-token');
  },

  logout: async () => {
    return api.post('/auth/logout');
  },
};

export default authService;
