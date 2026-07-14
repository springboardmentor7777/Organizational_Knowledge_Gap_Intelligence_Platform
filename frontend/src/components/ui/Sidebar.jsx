import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Zap, ClipboardCheck, TrendingDown, BookOpen,
  Map, Users, Share2, Bell, User, BarChart3, FileText, UserCog,
  Target, Sliders, Shield, Settings, Library, ChevronLeft, ChevronRight,
  LogOut, HelpCircle, Building2
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { NAV_ITEMS } from '../../utils/constants';
import './Sidebar.css';

const ICON_MAP = {
  LayoutDashboard, Zap, ClipboardCheck, TrendingDown, BookOpen,
  Map, Users, Share2, Bell, User, BarChart3, FileText, UserCog,
  Target, Sliders, Shield, Settings, Library
};

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose, isMobile }) => {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const navItems = NAV_ITEMS[user?.role] || NAV_ITEMS.EMPLOYEE;

  const sidebarVariants = {
    expanded: { width: 260, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
    collapsed: { width: 72, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
  };

  const sidebarClass = isMobile
    ? `sidebar sidebar-mobile ${mobileOpen ? 'sidebar-mobile-open' : ''}`
    : `sidebar ${collapsed ? 'sidebar-collapsed' : ''}`;

  return (
    <>
      <motion.aside
        className={sidebarClass}
        variants={!isMobile ? sidebarVariants : undefined}
        animate={!isMobile ? (collapsed ? 'collapsed' : 'expanded') : undefined}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Building2 size={20} strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                className="sidebar-logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="sidebar-logo-name">OrgKnow</span>
                <span className="sidebar-logo-sub">Intelligence Platform</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!isMobile && (
            <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* User card */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                className="sidebar-user-info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <span className="sidebar-user-name">{user?.firstName} {user?.lastName}</span>
                <span className="sidebar-user-role badge badge-purple">{user?.role}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
              >
                <NavLink
                  to={item.path}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={isMobile ? onMobileClose : undefined}
                  title={collapsed && !isMobile ? item.label : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="sidebar-active-indicator"
                      layoutId="sidebar-active"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="sidebar-nav-icon">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                  </span>

                  <AnimatePresence>
                    {(!collapsed || isMobile) && (
                      <motion.span
                        className="sidebar-nav-label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="sidebar-bottom">
          <div className="sidebar-divider" />
          <NavLink to="/help" className="sidebar-nav-item" title={collapsed ? 'Help' : undefined}>
            <span className="sidebar-nav-icon"><HelpCircle size={18} /></span>
            {(!collapsed || isMobile) && <span className="sidebar-nav-label">Help</span>}
          </NavLink>
          <button className="sidebar-nav-item sidebar-logout" onClick={logout} title={collapsed ? 'Logout' : undefined}>
            <span className="sidebar-nav-icon"><LogOut size={18} /></span>
            {(!collapsed || isMobile) && <span className="sidebar-nav-label">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
