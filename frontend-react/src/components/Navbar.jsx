import { useState, useRef, useEffect } from "react";

/* ── Icon helpers ── */
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
);

/* ── Notification dropdown item ── */
const NotificationItem = ({ title, description, time, isUnread }) => (
    <div className={`px-4 py-3 hover:bg-secondary-50 transition-colors cursor-pointer ${isUnread ? "bg-primary-50/50" : ""}`}>
        <div className="flex items-start gap-3">
            {isUnread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
            <div className={!isUnread ? "ml-5" : ""}>
                <p className="text-sm font-medium text-secondary">{title}</p>
                <p className="text-xs text-secondary-400 mt-0.5 line-clamp-2">{description}</p>
                <p className="text-[11px] text-secondary-300 mt-1">{time}</p>
            </div>
        </div>
    </div>
);

/* ── Sample notification data ── */
const notifications = [
    { id: 1, title: "New Leave Request", description: "John Doe submitted a leave request for Aug 10 – 14.", time: "5 min ago", isUnread: true },
    { id: 2, title: "Performance Review Due", description: "Q3 reviews for your team are due by Aug 15.", time: "1 hr ago", isUnread: true },
    { id: 3, title: "Training Completed", description: "Sarah completed the Compliance Training module.", time: "3 hrs ago", isUnread: false },
];

const Navbar = () => {
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    /* Close dropdowns on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const unreadCount = notifications.filter((n) => n.isUnread).length;

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-secondary-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            {/* ── Left: spacer for mobile hamburger + Search ── */}
            <div className="flex items-center gap-3 flex-1">
                {/* Spacer to avoid overlapping with the sidebar hamburger on mobile */}
                <div className="w-10 lg:hidden" />

                {/* Search bar */}
                <div className={`relative hidden sm:block transition-all duration-200 ${searchFocused ? "w-80" : "w-64"}`}>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-400 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search employees, reports…"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full h-9 pl-9 pr-3 text-sm rounded-lg bg-secondary-50 border border-secondary-200 text-secondary placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                </div>

                {/* Mobile search icon */}
                <button className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-secondary-400 hover:text-secondary hover:bg-secondary-100 transition-colors">
                    <SearchIcon />
                </button>
            </div>

            {/* ── Right: actions ── */}
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Notification bell */}
                <div ref={notifRef} className="relative">
                    <button
                        onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
                        className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-secondary-400 hover:text-secondary hover:bg-secondary-100 transition-colors"
                        aria-label="Notifications"
                    >
                        <BellIcon />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification dropdown */}
                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-secondary-200 shadow-lg overflow-hidden animate-fade-in">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-100">
                                <h4 className="text-sm font-semibold text-secondary">Notifications</h4>
                                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                            </div>
                            <div className="max-h-72 overflow-y-auto divide-y divide-secondary-100">
                                {notifications.map((n) => (
                                    <NotificationItem key={n.id} {...n} />
                                ))}
                            </div>
                            <div className="px-4 py-2.5 border-t border-secondary-100 text-center">
                                <span className="text-xs font-medium text-primary cursor-pointer hover:underline">View all notifications</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-secondary-200 mx-1" />

                {/* Profile */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            JD
                        </div>

                        {/* Name + Role badge (hidden on small screens) */}
                        <div className="hidden sm:flex flex-col items-start">
                            <span className="text-sm font-medium text-secondary leading-tight">Jane Doe</span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary-100 text-primary-700 leading-none mt-0.5">
                                HR Manager
                            </span>
                        </div>

                        <ChevronDownIcon />
                    </button>

                    {/* Profile dropdown */}
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-secondary-200 shadow-lg overflow-hidden animate-fade-in">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-secondary-100">
                                <p className="text-sm font-semibold text-secondary">Jane Doe</p>
                                <p className="text-xs text-secondary-400">jane.doe@company.com</p>
                            </div>

                            {/* Menu items */}
                            <div className="py-1">
                                {["My Profile", "Settings", "Help Center"].map((item) => (
                                    <button
                                        key={item}
                                        className="w-full text-left px-4 py-2 text-sm text-secondary-500 hover:bg-secondary-50 hover:text-secondary transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-secondary-100 py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 transition-colors">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
