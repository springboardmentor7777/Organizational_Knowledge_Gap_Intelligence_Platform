import { useState } from "react";
import { NavLink } from "react-router-dom";

/* ── SVG icon helpers (Heroicons-style, 20×20) ── */
const icons = {
    dashboard: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-5h2v5h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
        </svg>
    ),
    knowledge: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5 8.445v4.722a1 1 0 00.553.894l4 2a1 1 0 00.894 0l4-2A1 1 0 0015 13.167V8.445l2.394-1.025a1 1 0 000-1.84l-7-3zM7 13.056l-1-.5V9.3l4 1.714a1 1 0 00.788 0L13 9.3v3.256l-3 1.5-3-1.5z" />
        </svg>
    ),
    mentorship: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18a4 4 0 00-8 0h8zM2 18a3 3 0 016 0H2z" />
        </svg>
    ),
    learning: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 0v14h10V3H5zm2 2h6v2H7V5zm0 4h6v2H7V9zm0 4h4v2H7v-2z" clipRule="evenodd" />
        </svg>
    ),
    assessment: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    ),
    analytics: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
    ),
    reports: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
        </svg>
    ),
    notifications: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
    ),
    hamburger: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd" />
        </svg>
    ),
    close: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    ),
};

/* ── Navigation items ── */
const navItems = [
    { label: "Dashboard", to: "/", icon: icons.dashboard },
    { label: "Knowledge Sharing", to: "/knowledge-sharing", icon: icons.knowledge },
    { label: "Mentorship", to: "/mentorship", icon: icons.mentorship },
    { label: "Learning Progress", to: "/learning-progress", icon: icons.learning },
    { label: "Assessment", to: "/assessment", icon: icons.assessment },
    { label: "Analytics", to: "/analytics", icon: icons.analytics },
    { label: "Reports", to: "/reports", icon: icons.reports },
    { label: "Notifications", to: "/notifications", icon: icons.notifications },
];

/* ── Link styling helper ── */
const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive
        ? "bg-primary/10 text-primary"
        : "text-secondary-400 hover:bg-secondary-800 hover:text-secondary-200"
    }`;

/* ── Sidebar content (shared between desktop & mobile) ── */
const SidebarContent = ({ onClose }) => (
    <>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-secondary-800">
            <span className="text-lg font-bold tracking-tight text-white">
                HR Dashboard
            </span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="lg:hidden text-secondary-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                >
                    {icons.close}
                </button>
            )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={linkClasses}
                    onClick={onClose}
                >
                    <span className="shrink-0">{item.icon}</span>
                    {item.label}
                </NavLink>
            ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-secondary-800 text-xs text-secondary-500">
            &copy; {new Date().getFullYear()} HR Dashboard
        </div>
    </>
);

/* ── Main Sidebar component ── */
const Sidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-40 lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-900 text-secondary-300 hover:text-white shadow-lg transition-colors"
                aria-label="Open menu"
            >
                {icons.hamburger}
            </button>

            {/* Mobile overlay + drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Drawer */}
                    <aside className="relative flex flex-col w-72 max-w-[85vw] h-full bg-secondary-900 text-secondary-100 shadow-2xl animate-slide-in">
                        <SidebarContent onClose={() => setMobileOpen(false)} />
                    </aside>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-secondary-900 text-secondary-100 min-h-screen shrink-0">
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar;
