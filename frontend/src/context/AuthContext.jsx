import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (responseData) => {
    const { token, refreshToken, ...userData } = responseData;
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (username, password, mfaCode = null) => {
    try {
      const response = await API.post('/auth/signin', { username, password, mfaCode });
      if (response.data.mfaRequired) {
        return { success: true, mfaRequired: true, username: response.data.username };
      }
      handleAuthSuccess(response.data);
      return { success: true, mfaRequired: false };
    } catch (error) {
      let message = error.response?.data?.message || 'Invalid username or password';
      if (message.includes('Full authentication') || message.includes('Unauthorized')) {
        message = 'Invalid username or password. Please check your credentials or register an account.';
      }
      return { success: false, error: message };
    }
  };

  const verify2FA = async (username, code) => {
    try {
      const response = await API.post('/auth/verify-2fa', { username, code });
      handleAuthSuccess(response.data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || '2FA verification failed';
      return { success: false, error: message };
    }
  };

  const register = async (username, email, password, role, department, fullName, title, phone = null, location = null, bio = null, linkedinUrl = null) => {
    try {
      const res = await API.post('/auth/signup', {
        username,
        email,
        password,
        role,
        department,
        fullName,
        title,
        phone,
        location,
        bio,
        linkedinUrl,
      });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const sendEmailOtp = async (email, purpose = 'Email Verification') => {
    try {
      const res = await API.post('/auth/send-email-otp', { email, purpose });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP to email';
      return { success: false, error: message };
    }
  };

  const verifyEmailOtp = async (email, code) => {
    try {
      const res = await API.post('/auth/verify-email-otp', { email, code });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid or expired OTP code';
      return { success: false, error: message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await API.post('/auth/forgot-password', { email });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to request password reset';
      return { success: false, error: message };
    }
  };

  const resetPassword = async (tokenStr, newPassword) => {
    try {
      const res = await API.post('/auth/reset-password', { token: tokenStr, newPassword });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      return { success: false, error: message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await API.post('/auth/change-password', { currentPassword, newPassword });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password';
      return { success: false, error: message };
    }
  };

  const setup2FA = async () => {
    try {
      const res = await API.get('/auth/setup-2fa');
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to setup 2FA';
      return { success: false, error: message };
    }
  };

  const verifySetup2FA = async (username, code) => {
    try {
      const res = await API.post('/auth/verify-setup-2fa', { username, code });
      updateUser({ is2faEnabled: true });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      return { success: false, error: message };
    }
  };

  const disable2FA = async () => {
    try {
      const res = await API.post('/auth/disable-2fa');
      updateUser({ is2faEnabled: false });
      return { success: true, message: res.data?.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to disable 2FA';
      return { success: false, error: message };
    }
  };

  const fetchSecurityLogs = async () => {
    try {
      const res = await API.get('/auth/security-logs');
      return { success: true, logs: res.data };
    } catch (error) {
      return { success: false, logs: [] };
    }
  };

  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };

  const deleteAccount = async () => {
    try {
      await API.delete('/users/me');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/signout');
    } catch (e) {
      // Ignore network errors on signout
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        verify2FA,
        register,
        sendEmailOtp,
        verifyEmailOtp,
        forgotPassword,
        resetPassword,
        changePassword,
        setup2FA,
        verifySetup2FA,
        disable2FA,
        fetchSecurityLogs,
        deleteAccount,
        updateUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
