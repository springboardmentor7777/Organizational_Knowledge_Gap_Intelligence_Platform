/**
 * authService.js
 * Integration with backend Authentication (/api/auth/*) and User Profile (/api/profile/*) APIs.
 */

import api from './api';
import { saveToken, saveUser, getToken } from '../utils/token';

export async function login(usernameOrEmail, password) {
  const response = await api.post('/api/auth/login', {
    usernameOrEmail,
    password,
  });

  const { token, message } = response.data;

  if (token) {
    saveToken(token);
    // Fetch profile to get real user details from backend database
    const profile = await getProfile();
    const normalizedUser = {
      id: profile.id,
      username: profile.username,
      name: profile.username || profile.email || 'User',
      email: profile.email,
      role: profile.role || 'ROLE_EMPLOYEE',
    };
    saveUser(normalizedUser);
    return { token, user: normalizedUser, message };
  }

  throw new Error(message || 'Login failed.');
}

export async function register({ username, email, password, role = 'ROLE_EMPLOYEE' }) {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password,
    role,
  });

  const { token, message } = response.data;
  if (token) {
    saveToken(token);
  }
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/api/profile');
  return response.data;
}

export async function updateProfile(data) {
  const response = await api.put('/api/profile', data);
  return response.data;
}

export async function changePassword(oldPassword, newPassword) {
  const response = await api.post('/api/profile/change-password', {
    oldPassword,
    newPassword,
  });
  return response.data;
}

export async function forgotPassword(email) {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
}
