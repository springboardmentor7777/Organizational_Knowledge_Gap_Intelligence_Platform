import { createContext, useContext, useState, useEffect } from 'react';
import {
  saveToken, getToken, removeToken,
  saveUser,  getUser,  removeUser,
} from '../utils/token';
import { getProfile } from '../services/authService';

// ── Context creation ──────────────────────────────────
const AuthContext = createContext(null);

// ── Provider ──────────────────────────────────────────
export function AuthProvider({ children }) {
  // Initialise from localStorage so state survives page refreshes
  const [token, setToken] = useState(getToken);
  const [user,  setUser]  = useState(getUser);

  const isAuthenticated = !!token;

  // On mount or token change, sync user state with backend profile if token exists
  useEffect(() => {
    if (token) {
      getProfile()
        .then((profile) => {
          const normalizedUser = {
            id: profile.id,
            username: profile.username,
            name: profile.username || profile.email || 'User',
            email: profile.email,
            role: profile.role || 'ROLE_EMPLOYEE',
          };
          saveUser(normalizedUser);
          setUser(normalizedUser);
        })
        .catch((err) => {
          // If token is invalid or expired (401/403), logout
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logout();
          }
        });
    }
  }, [token]);

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

  const value = { user, token, isAuthenticated, login, logout, setUser };

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

