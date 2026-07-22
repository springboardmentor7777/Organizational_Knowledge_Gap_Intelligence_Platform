import { createContext, useContext, useState } from 'react';
import {
  saveToken, getToken, removeToken,
  saveUser,  getUser,  removeUser,
} from '../utils/token';

// ── Context creation ──────────────────────────────────
const AuthContext = createContext(null);

// ── Provider ──────────────────────────────────────────
export function AuthProvider({ children }) {
  // Initialise from localStorage so state survives page refreshes
  const [token, setToken] = useState(getToken);
  const [user,  setUser]  = useState(getUser);

  const isAuthenticated = !!token;

  /**
   * Call on successful login.
   * Persists token + user to localStorage and updates React state.
   */
  function login(userData, authToken) {
    saveToken(authToken);
    saveUser(userData);
    setToken(authToken);
    setUser(userData);
  }

  /**
   * Call on logout.
   * Clears localStorage and resets React state.
   */
  function logout() {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  }

  const value = { user, token, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Custom hook ───────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}

export default AuthContext;
