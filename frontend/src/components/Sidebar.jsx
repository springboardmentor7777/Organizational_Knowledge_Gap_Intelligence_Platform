import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp, NAV_BY_ROLE, TOKENS } from "../context/AppContext";
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const {
    c,
    dark,
    role,
    activePage,
    setActivePage,
    collapsed,
    setCollapsed,
  } = useApp();

  const items = NAV_BY_ROLE[role];
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (key) => {
    setActivePage(key);

    switch (key) {
      case "dashboard":
        navigate("/dashboard");
        break;

      case "skillinventory":
        navigate("/skillinventory");
        break;

      case "gapanalysis":
        navigate("/gapanalysis");
        break;

      case "learningprogress":
        navigate("/learningprogress");
        break;

      case "assessment":
        navigate("/assessment");
        break;

      case "mentors":
        navigate("/mentors");
        break;

      case "reports":
        navigate("/reports");
        break;

      case "analytics":
        navigate("/analytics");
        break;

      case "notifications":
        navigate("/notifications");
        break;

      // Admin Console
      case "users":
      case "roles":
      case "departments":
      case "ai-config":
      case "logs":
      case "settings":
        navigate("/admin");
        break;

      default:
        navigate("/dashboard");
    }

    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="kgi-fade-in"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        className={`kgi-sidebar ${
          mobileOpen
            ? "kgi-sidebar-mobile-open"
            : "kgi-sidebar-mobile-closed"
        }`}
        style={{
          width: collapsed ? 78 : 248,
          background: dark
            ? "rgba(15,23,42,0.92)"
            : "rgba(255,255,255,0.9)",
          borderRight: `1px solid ${c.border}`,
          backdropFilter: "blur(16px)",
          transition: "width .25s ease, transform .25s ease",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transform: mobileOpen ? "translateX(0)" : undefined,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "20px 18px",
            height: 68,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              flexShrink: 0,
              background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={17} color="#fff" />
          </div>

          {!collapsed && (
            <span
              style={{
                fontWeight: 700,
                fontSize: 14.5,
                color: c.text,
                lineHeight: 1.15,
              }}
            >
              Knowledge Gap
              <br />
              Intelligence
            </span>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="kgi-mobile-only"
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: c.textMuted,
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px 12px",
          }}
        >
          {items.map((item) => {
            const active =
              role === "Admin"
                ? activePage === item.key
                : location.pathname === `/${item.key}`;

            return (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                title={collapsed ? item.label : undefined}
                className="kgi-nav-item"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  marginBottom: 4,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  background: active
                    ? dark
                      ? "rgba(37,99,235,.18)"
                      : "rgba(37,99,235,.09)"
                    : "transparent",
                  color: active ? TOKENS.primary : c.textMuted,
                  fontWeight: active ? 600 : 500,
                  fontSize: 13.5,
                  transition: "background .18s ease,color .18s ease",
                }}
              >
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: -12,
                      top: "20%",
                      height: "60%",
                      width: 3,
                      borderRadius: 4,
                      background: `linear-gradient(${TOKENS.primary}, ${TOKENS.secondary})`,
                    }}
                  />
                )}

                <item.icon size={19} style={{ flexShrink: 0 }} />

                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse */}
        <div
          style={{
            padding: 12,
            borderTop: `1px solid ${c.border}`,
          }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="kgi-desktop-only"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 0",
              borderRadius: 10,
              border: `1px solid ${c.border}`,
              background: "transparent",
              color: c.textMuted,
              cursor: "pointer",
              fontSize: 12.5,
            }}
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                Collapse
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}