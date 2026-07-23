import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/** Derive up-to-2 uppercase initials from a name string */
function getInitials(name = '') {
  return name
    .split(/[\s@]+/)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const displayName = user ? (user.name || user.username || user.email || 'User') : '';

  return (
    <header className="bg-white border-b border-slate-200 shadow-nav sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between gap-4">

        {/* ── Brand ─────────────────────────────────────────── */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Go to dashboard"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-800 hidden sm:block group-hover:text-blue-600 transition-colors">
            KnowledgeGap <span className="font-light text-slate-400">Platform</span>
          </span>
        </Link>

        {/* ── Right section ──────────────────────────────────── */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Notification placeholder */}
          <button
            type="button"
            aria-label="Notifications"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200 hidden sm:block" />

          {/* User info + avatar */}
          {user && (
            <Link
              to="/profile"
              className="flex items-center gap-2.5 group rounded-xl px-2 py-1.5 hover:bg-slate-50 transition-all duration-150"
              aria-label="View profile"
            >
              <div className="avatar-md text-[13px]">
                {getInitials(displayName)}
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                  {displayName}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{user.role || 'ROLE_EMPLOYEE'}</p>
              </div>
            </Link>
          )}

          {/* Logout */}
          <button
            type="button"
            id="navbar-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 transition-all duration-150"
            aria-label="Sign out"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
