import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users2, 
  GraduationCap, 
  LogOut, 
  Bell, 
  User,
  Menu,
  X,
  FileSpreadsheet,
  Palette,
  Shield,
  ChevronRight,
  Zap
} from 'lucide-react';

const ROLE_COLORS = {
  EMPLOYEE:     { label: 'Employee',     cls: 'role-badge-employee', gradient: 'from-cyan-500/20 to-blue-500/10'    },
  MANAGER:      { label: 'Manager',      cls: 'role-badge-manager',  gradient: 'from-amber-500/20 to-orange-500/10' },
  HR_SPECIALIST:{ label: 'HR Specialist',cls: 'role-badge-hr',       gradient: 'from-violet-500/20 to-purple-500/10'},
  ADMIN:        { label: 'Administrator',cls: 'role-badge-admin',     gradient: 'from-rose-500/20 to-red-500/10'    },
};

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const { notifications, unreadCount, markAsRead } = useContext(NotificationContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState(() => {
    const saved = localStorage.getItem('okgip-bg-theme');
    if (saved === 'light' || saved === 'charcoal' || saved === 'black') return saved;
    return 'black';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const roleInfo = ROLE_COLORS[user?.role] || ROLE_COLORS.EMPLOYEE;

  const handleThemeChange = (themeName) => {
    localStorage.setItem('okgip-bg-theme', themeName);
    setBackgroundTheme(themeName);
    setShowThemeSelector(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  let navLinks = [];
  if (user?.role === 'ADMIN') {
    navLinks = [
      { name: 'Admin Center',          path: '/',                  icon: LayoutDashboard },
      { name: 'Executive Heatmap & SPOF', path: '/executive-analytics', icon: LayoutDashboard },
      { name: 'User & Role Access',     path: '/admin/users',       icon: Shield },
      { name: 'Expert Directory',       path: '/expert-directory',  icon: Users2 },
      { name: '360 Evaluations',        path: '/360-evaluations',   icon: UserCheck },
      { name: 'Framework Builder',     path: '/frameworks',        icon: FileSpreadsheet },
      { name: 'My Profile',            path: '/profile',           icon: User },
    ];
  } else if (user?.role === 'HR_SPECIALIST') {
    navLinks = [
      { name: 'HR Portal',             path: '/',                  icon: LayoutDashboard },
      { name: 'Executive Heatmap & SPOF', path: '/executive-analytics', icon: LayoutDashboard },
      { name: 'Expert Directory',       path: '/expert-directory',  icon: Users2 },
      { name: '360 Evaluations',        path: '/360-evaluations',   icon: UserCheck },
      { name: 'Competency Frameworks', path: '/frameworks',        icon: FileSpreadsheet },
      { name: 'Course Catalog',        path: '/training',          icon: GraduationCap },
      { name: 'Mentorship Matches',    path: '/mentorship',        icon: Users2 },
      { name: 'My Profile',            path: '/profile',           icon: User },
    ];
  } else if (user?.role === 'MANAGER') {
    navLinks = [
      { name: 'Team Dashboard',        path: '/',                  icon: LayoutDashboard },
      { name: 'Executive Heatmap & SPOF', path: '/executive-analytics', icon: LayoutDashboard },
      { name: 'Evaluate Direct Reports',path: '/assessment',        icon: UserCheck },
      { name: '360 Peer Evaluations',  path: '/360-evaluations',   icon: UserCheck },
      { name: 'Expert Directory',       path: '/expert-directory',  icon: Users2 },
      { name: 'Team Mentorship',       path: '/mentorship',        icon: Users2 },
      { name: 'Learning Catalog',      path: '/training',          icon: GraduationCap },
      { name: 'My Profile',           path: '/profile',           icon: User },
    ];
  } else {
    navLinks = [
      { name: 'My Dashboard',          path: '/',                  icon: LayoutDashboard },
      { name: 'Executive Heatmap & SPOF', path: '/executive-analytics', icon: LayoutDashboard },
      { name: 'Skill Assessment',      path: '/assessment',        icon: UserCheck },
      { name: '360 Peer Evaluations',  path: '/360-evaluations',   icon: UserCheck },
      { name: 'Expert Directory',       path: '/expert-directory',  icon: Users2 },
      { name: 'Find Peer Mentor',      path: '/mentorship',        icon: Users2 },
      { name: 'Learning Paths',        path: '/training',          icon: GraduationCap },
      { name: 'My Profile',           path: '/profile',           icon: User },
    ];
  }

  const currentPage = navLinks.find(l => l.path === location.pathname);

  const SidebarContent = ({ onLinkClick }) => (
    <>
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 mb-10 px-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-base shadow-lg animate-glow-pulse">
            KG
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-zinc-950 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Knowledge Gap
          </h1>
          <p className="text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">Intelligence Platform</p>
        </div>
      </div>

      {/* Role Badge */}
      <div className={`mb-6 px-3 py-2 rounded-xl flex items-center space-x-2 bg-gradient-to-r ${roleInfo.gradient}`}>
        <Zap className="w-3.5 h-3.5 opacity-70" />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${roleInfo.cls.includes('employee') ? 'text-cyan-400' : roleInfo.cls.includes('manager') ? 'text-amber-400' : roleInfo.cls.includes('hr') ? 'text-violet-400' : 'text-rose-400'}`}>
          {roleInfo.label}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1">
        {navLinks.map((link, idx) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onLinkClick}
              style={{ animationDelay: `${idx * 60}ms` }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium group animate-slide-left ${
                active
                  ? 'nav-active'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} style={{ width: '18px', height: '18px' }} />
                <span className="text-sm">{link.name}</span>
              </div>
              {active && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Bottom */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center space-x-3 mb-4 px-1">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm border-2 border-indigo-500/30 shadow-lg flex-shrink-0`}>
            {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">{user?.fullName}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.title || user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-200 font-medium group"
        >
          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className={`min-h-screen flex relative overflow-hidden transition-colors duration-300 ${
      backgroundTheme === 'light'   ? 'theme-light bg-slate-50 text-slate-900' :
      backgroundTheme === 'charcoal'? 'bg-[#0d0d14] text-zinc-100' :
      'bg-[#050508] text-zinc-100'
    }`}>
      {/* Background Mesh */}
      {backgroundTheme !== 'light' && (
        <>
          <div className="absolute inset-0 cyber-grid pointer-events-none z-0 opacity-40" />
          <div className="absolute top-0 left-64 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none z-0" />
        </>
      )}

      {/* ── Desktop Sidebar ── */}
      <aside className={`hidden lg:flex lg:flex-col lg:w-64 p-6 flex-shrink-0 z-20 border-r relative ${
        backgroundTheme === 'light'
          ? 'bg-white border-slate-200'
          : 'bg-[#08080f]/95 border-white/5'
      }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Gradient accent line at top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />
        <SidebarContent onLinkClick={undefined} />
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header */}
        <header className={`h-16 border-b flex items-center justify-between px-6 z-20 relative ${
          backgroundTheme === 'light'
            ? 'bg-white/95 border-slate-200'
            : 'bg-[#050508]/90 border-white/5'
        }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          {/* Bottom accent line */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title with breadcrumb */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">OKGIP</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <h2 className="text-sm font-bold text-slate-100" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {currentPage?.name || 'Platform'}
            </h2>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Theme Chooser */}
            <div className="relative">
              <button
                onClick={() => { setShowThemeSelector(!showThemeSelector); setShowNotifications(false); }}
                className="p-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition border border-white/5"
                title="Change Theme"
              >
                <Palette className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
              </button>

              {showThemeSelector && (
                <div className="absolute right-0 mt-3 w-52 bg-[#0d0d18] border border-white/8 rounded-2xl shadow-2xl overflow-hidden z-30 animate-fade-up">
                  <div className="p-3 border-b border-white/6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Appearance</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {[
                      { id: 'black',    name: 'Obsidian',         desc: 'Pitch black – deep focus', dot: 'bg-slate-800' },
                      { id: 'charcoal', name: 'Graphite',         desc: 'Dark slate – softer dark',  dot: 'bg-zinc-700' },
                      { id: 'light',    name: 'Snow White',       desc: 'Light mode – clean & crisp', dot: 'bg-slate-200 border border-slate-300' },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-center space-x-3 ${
                          backgroundTheme === theme.id
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${theme.dot}`} />
                        <div>
                          <p className="font-semibold">{theme.name}</p>
                          <p className="text-[9px] opacity-60 mt-0.5">{theme.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowThemeSelector(false); }}
                className="p-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white relative transition"
              >
                <Bell className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#050508] min-w-[18px] min-h-[18px]">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0d0d18] border border-white/8 rounded-2xl shadow-2xl overflow-hidden z-30 animate-fade-up">
                  <div className="p-4 border-b border-white/6 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-100">Notifications</p>
                    <span className="text-[10px] px-2 py-0.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-white/4">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">All caught up!</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => { if (!notif.read) markAsRead(notif.id); }}
                          className={`p-4 text-xs cursor-pointer transition ${
                            notif.read ? 'hover:bg-white/3' : 'bg-indigo-500/5 hover:bg-indigo-500/10'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-1" />}
                            <div>
                              <p className={`font-medium ${notif.read ? 'text-slate-400' : 'text-slate-200'}`}>{notif.message}</p>
                              <p className="text-slate-600 mt-1 text-[10px]">
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-white/8 mx-1" />

            {/* User avatar */}
            <Link to="/profile" className="flex items-center space-x-2.5 hover:opacity-80 transition group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-200 leading-tight">{user?.fullName}</p>
                <p className={`text-[9px] font-bold uppercase tracking-wider ${roleInfo.cls.includes('employee') ? 'text-cyan-400' : roleInfo.cls.includes('manager') ? 'text-amber-400' : roleInfo.cls.includes('hr') ? 'text-violet-400' : 'text-rose-400'}`}>
                  {roleInfo.label}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500/30 group-hover:scale-105 transition-transform shadow-lg">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </Link>
          </div>
        </header>

        {/* Main workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-xs bg-[#08080f] border-r border-white/5 p-6 z-10 animate-slide-left">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
