import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/skills", label: "My Skill Profile" },
  { to: "/competencies", label: "Competency Framework" },
  { to: "/gaps", label: "Gap Analysis" },
  { to: "/learning", label: "Learning & Training" },
  { to: "/assessments", label: "Assessments" },
  { to: "/knowledge", label: "Knowledge Sharing" },
  { to: "/analytics", label: "Analytics" },
  { to: "/notifications", label: "Notifications" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api
      .get("/api/notifications")
      .then(({ data }) => setUnread(data.filter((n) => !n.read).length))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
        <div className="p-5">
          <Link to="/dashboard" className="block">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">OKGIP</p>
            <h1 className="mt-1 text-base font-bold leading-tight">
              Knowledge Gap Intelligence Platform
            </h1>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-brand-light text-brand-dark" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
              {item.to === "/notifications" && unread > 0 && (
                <span className="ml-2 badge bg-danger text-white">{unread}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <div>
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-xs text-slate-500">
              {user?.jobRole} · {user?.department} · {user?.role}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {user?.avatarInitials || "U"}
            </span>
            <button
              className="btn-ghost"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
