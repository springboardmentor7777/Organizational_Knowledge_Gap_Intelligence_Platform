import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp, NAV_BY_ROLE, TOKENS } from "../context/AppContext";

export default function BottomNav() {
  const { c, dark, role, activePage, setActivePage } = useApp();
  const navigate = useNavigate();

  const items = NAV_BY_ROLE[role].slice(0, 5);

  const ROUTES = {
    dashboard: "/dashboard",
    skills: "/skill-inventory",
    gaps: "/gap-analysis",
    learning: "/learning-progress",
    mentors: "/knowledge-sharing",
    assessments: "/assessment",
    analytics: "/analytics",
    reports: "/reports",
    employees: "/admin",
    framework: "/admin",
    users: "/admin",
    departments: "/admin",
    "ai-config": "/admin",
    logs: "/admin",
    settings: "/admin",
  };

  return (
    <nav
      className="kgi-mobile-only"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0",
        borderTop: `1px solid ${c.border}`,
        background: dark
          ? "rgba(15,23,42,.95)"
          : "rgba(255,255,255,.95)",
        backdropFilter: "blur(14px)",
        zIndex: 40,
      }}
    >
      {items.map((item) => {
        const active = activePage === item.key;

        return (
          <button
            key={item.key}
            onClick={() => {
              setActivePage(item.key);
              navigate(ROUTES[item.key] || "/dashboard");
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: active ? TOKENS.primary : c.textMuted,
              fontSize: 10,
              gap: 3,
            }}
          >
            <item.icon size={18} />
            {item.label.split(" ")[0]}
          </button>
        );
      })}
    </nav>
  );
}