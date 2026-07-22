/**
 * api.js — Reusable Axios instance
 *
 * Base URL: http://localhost:8080 (root, NOT /api)
 * Reason: EmployeeController → /employees (no /api prefix)
 *          DepartmentController → /departments (no /api prefix)
 *          AuthController → /api/auth/...
 *          RecommendationController → /api/recommendations/...
 *
 * Each service uses the full path relative to this root.
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

// ── Request interceptor — attach JWT token if present ──────────────────────
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

// ── Response interceptor — extract meaningful error messages ───────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export default api;
