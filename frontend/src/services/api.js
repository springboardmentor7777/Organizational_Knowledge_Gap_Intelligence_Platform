/**
 * api.js — Reusable Axios instance with enterprise error formatting
 *
 * Base URL: http://localhost:8080 (root, NOT /api)
 * Standardizes HTTP headers, JWT authorization interceptor,
 * and user-friendly error messages (Network Error, 401, 403, 404, 500).
 */
import axios from 'axios';
import { getToken } from '../utils/token';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ── Request Interceptor: Attach Bearer JWT token if available ──────────────
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: User-friendly error message resolution ──────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle offline / connection refused / network error
    if (
      !error.response ||
      error.message === 'Network Error' ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNREFUSED'
    ) {
      const networkErr = new Error('Unable to connect to the backend server. Please ensure the backend is running.');
      networkErr.isNetworkError = true;
      return Promise.reject(networkErr);
    }

    const status = error.response.status;
    let customMessage = error.response.data?.message;

    if (!customMessage || typeof customMessage !== 'string') {
      if (status === 401) {
        customMessage = 'Invalid credentials or session expired. Please sign in again.';
      } else if (status === 403) {
        customMessage = 'Access denied. You do not have permission to perform this action.';
      } else if (status === 404) {
        customMessage = 'The requested resource was not found on the server.';
      } else if (status >= 500) {
        customMessage = 'Backend server error. Please try again later.';
      } else {
        customMessage = error.message || 'An unexpected error occurred.';
      }
    }

    const formattedErr = new Error(customMessage);
    formattedErr.status = status;
    formattedErr.response = error.response;
    return Promise.reject(formattedErr);
  }
);

export default api;
