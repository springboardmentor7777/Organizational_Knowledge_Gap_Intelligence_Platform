import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// List of public auth endpoints that do not require Authorization header
const PUBLIC_AUTH_ENDPOINTS = [
  '/auth/signin',
  '/auth/signup',
  '/auth/send-email-otp',
  '/auth/verify-email-otp',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-2fa',
  '/auth/google',
];

// Request interceptor to automatically attach authorization header
API.interceptors.request.use(
  (config) => {
    const isPublicAuth = PUBLIC_AUTH_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry / auto token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPublicAuth = PUBLIC_AUTH_ENDPOINTS.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    // Never redirect on public authentication operations
    if (isPublicAuth) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');
      const isPublicPage = window.location.pathname === '/login' || window.location.pathname === '/register';

      // If no refresh token available or request was already a refresh attempt
      if (!refreshToken || originalRequest.url.includes('/auth/refreshtoken')) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        if (!isPublicPage) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post('http://localhost:8080/api/auth/refreshtoken', {
          refreshToken: refreshToken,
        });

        if (res.status === 200) {
          const { accessToken, refreshToken: newRefreshToken } = res.data;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          API.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          processQueue(null, accessToken);
          isRefreshing = false;
          return API(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        if (!isPublicPage) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
