import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, Settings, User, LogOut, ChevronDown, Sun, Moon, Command } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { useThemeContext } from '../../context/ThemeContext';
import './Header.css';

const Header = ({ onMobileMenuToggle, sidebarCollapsed }) => {
  const { user, logout } = useAuthContext();
  const { unreadCount } = useNotificationContext();
  const { theme, toggleTheme } = useThemeContext();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="app-header">
      {/* Left side */}
      <div className="header-left">
        <button className="header-mobile-menu" onClick={onMobileMenuToggle} aria-label="Toggle menu">
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <motion.div className="header-search" layout>
          <button
            className="header-search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={16} />
            <span className="header-search-placeholder">Search anything...</span>
            <kbd className="header-search-kbd"><Command size={10} />K</kbd>
          </button>
        </motion.div>
      </div>

      {/* Right side */}
      <div className="header-right">
        {/* Theme toggle */}
        <motion.button
          className="header-icon-btn"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Notifications */}
        <Link to="/notifications">
          <motion.div
            className="header-icon-btn header-notif-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <motion.span
                className="header-notif-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </motion.div>
        </Link>

        {/* User menu */}
        <div className="header-user" ref={userMenuRef}>
          <button
            className="header-user-btn"
            onClick={() => setUserMenuOpen(o => !o)}
          >
            <div className="header-user-avatar">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="header-user-info">
              <span className="header-user-name">{user?.firstName} {user?.lastName}</span>
              <span className="header-user-role">{user?.department}</span>
            </div>
            <ChevronDown
              size={16}
              style={{
                transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                color: 'var(--color-text-tertiary)',
              }}
            />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                className="header-user-menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div className="user-menu-header">
                  <div className="user-menu-avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
                  <div>
                    <div className="user-menu-name">{user?.firstName} {user?.lastName}</div>
                    <div className="user-menu-email">{user?.email}</div>
                  </div>
                </div>
                <div className="user-menu-divider" />
                <button className="user-menu-item" onClick={() => { navigate('/profile'); setUserMenuOpen(false); }}>
                  <User size={15} /> Profile
                </button>
                <button className="user-menu-item" onClick={() => { navigate('/settings'); setUserMenuOpen(false); }}>
                  <Settings size={15} /> Settings
                </button>
                <div className="user-menu-divider" />
                <button className="user-menu-item user-menu-logout" onClick={logout}>
                  <LogOut size={15} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          >
            <motion.div
              className="search-modal"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="search-input-wrap">
                <Search size={18} className="search-icon" />
                <input
                  ref={searchRef}
                  autoFocus
                  type="text"
                  className="search-input"
                  placeholder="Search skills, training, gaps, reports..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <kbd className="search-esc">ESC</kbd>
              </div>
              {searchQuery && (
                <div className="search-results">
                  <div className="search-results-empty">
                    <Search size={32} />
                    <p>Search results for "<strong>{searchQuery}</strong>"</p>
                    <span>Connect backend API for full search functionality</span>
                  </div>
                </div>
              )}
              {!searchQuery && (
                <div className="search-suggestions">
                  <p className="search-suggestions-label">Quick Actions</p>
                  {[
                    { label: 'View Gap Analysis', path: '/gap-analysis' },
                    { label: 'Browse Courses', path: '/course-catalog' },
                    { label: 'Find a Mentor', path: '/mentorship' },
                    { label: 'Generate Report', path: '/reports' },
                  ].map(item => (
                    <button
                      key={item.path}
                      className="search-suggestion-item"
                      onClick={() => { navigate(item.path); setSearchOpen(false); setSearchQuery(''); }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
