import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp, NAV_BY_ROLE, TOKENS, FONT_STACK } from "../context/AppContext";
import {
  Search,
  Moon,
  Sun, Bell,Menu, ChevronDown, Home,} from "lucide-react";

export default function Navbar({ setMobileOpen }) {
  const {
    c,
    dark,
    setDark,
    role,
    setRole,
    activePage, setActivePage,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  // Page titles
  const pageTitles = {
  dashboard: "Dashboard",
  skillinventory: "My Skills",
  gapanalysis: "Gap Analysis",
  learningprogress: "Learning Path",
  assessment: "Assessments",
  mentors: "Mentors",
  analytics: "Analytics",
  reports: "Reports",
  notifications: "Notifications",
  admin: "Admin Console",
};

const currentRoute = location.pathname.split("/")[1];
const currentPage = pageTitles[currentRoute] || "Dashboard";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 20px",
        background: dark
          ? "rgba(15,23,42,0.85)"
          : "rgba(248,250,252,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      {/* Mobile menu */}
      <button
        onClick={() => setMobileOpen(true)}
        className="kgi-mobile-only"
        style={{
          background: "none",
          border: "none",
          color: c.text,
          cursor: "pointer",
        }}
      >
        <Menu size={22} />
      </button>

      {/* Breadcrumb */}
      <div
        className="kgi-desktop-only"
        style={{
          fontSize: 12.5,
          color: c.textMuted,
          display: "flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <Home size={13} />
        <span>/</span>
        <span
          style={{
            color: c.text,
            fontWeight: 600,
          }}
        >
          {currentPage}
        </span>
      </div>

      {/* Search */}
      <div
        className="kgi-search"
        style={{
          flex: 1,
          maxWidth: 420,
          marginLeft: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: dark
            ? "rgba(255,255,255,0.05)"
            : "rgba(15,23,42,0.04)",
          border: `1px solid ${c.border}`,
          borderRadius: 12,
          padding: "8px 12px",
        }}
      >
        <Search size={16} color={c.textMuted} />

        <input
          placeholder="Search employees, skills, reports..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: c.text,
            fontSize: 13,
            fontFamily: FONT_STACK,
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Role Switcher */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setRoleOpen(!roleOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 10px",
            borderRadius: 10,
            border: `1px solid ${c.border}`,
            background: "transparent",
            color: c.text,
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {role}
          <ChevronDown size={14} />
        </button>

        {roleOpen && (
          <div
            className="kgi-fade-in"
            style={{
              position: "absolute",
              right: 0,
              top: 42,
              background: c.surfaceSolid,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              boxShadow: c.shadow,
              overflow: "hidden",
              zIndex: 50,
              minWidth: 140,
            }}
          >
            {Object.keys(NAV_BY_ROLE).map((r) => (
              <div
                key={r}
                onClick={() => {
  setRole(r);

  const firstPage = NAV_BY_ROLE[r][0].key;
  setActivePage(firstPage);

  if (r === "Admin") {
    navigate("/admin");
  } else {
    navigate(`/${firstPage}`);
  }

  setRoleOpen(false);
}}
                style={{
                  padding: "9px 14px",
                  fontSize: 13,
                  color: c.text,
                  cursor: "pointer",
                  background:
                    r === role
                      ? dark
                        ? "rgba(37,99,235,0.15)"
                        : "rgba(37,99,235,0.08)"
                      : "transparent",
                }}
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Theme */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          border: `1px solid ${c.border}`,
          background: "transparent",
          color: c.text,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      {/* Notifications */}
      <button
        onClick={() => navigate("/notifications")}
        style={{
          position: "relative",
          width: 38,
          height: 38,
          borderRadius: 10,
          border: `1px solid ${c.border}`,
          background: "transparent",
          color: c.text,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bell size={17} />
        <span
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 7,
            height: 7,
            borderRadius: 99,
            background: TOKENS.danger,
            border: `2px solid ${dark ? "#0F172A" : "#F8FAFC"}`,
          }}
        />
      </button>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 2,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            AP
          </div>
        </button>

        {profileOpen && (
          <div
            className="kgi-fade-in"
            style={{
              position: "absolute",
              right: 0,
              top: 44,
              background: c.surfaceSolid,
              border: `1px solid ${c.border}`,
              borderRadius: 12,
              boxShadow: c.shadow,
              width: 180,
              padding: 8,
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "8px 10px",
                fontSize: 13,
                fontWeight: 600,
                color: c.text,
              }}
            >
              Asad Pathan
            </div>

            <div
              style={{
                padding: "0 10px 8px",
                fontSize: 11.5,
                color: c.textMuted,
              }}
            >
              {role} · Engineering
            </div>

            <div
              style={{
                borderTop: `1px solid ${c.border}`,
                margin: "4px 0",
              }}
            />

            {["Profile Settings", "Notifications", "Log out"].map(
              (label) => (
                <div
                  key={label}
                  onClick={() => {
                    if (label === "Notifications") {
                      navigate("/notifications");
                      setProfileOpen(false);
                    }

                    if (label === "Profile Settings") {
                      setProfileOpen(false);
                    }

                    if (label === "Log out") {
                      navigate("/auth");
                    }
                  }}
                  style={{
                    padding: "8px 10px",
                    fontSize: 13,
                    color: c.text,
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(15,23,42,0.04)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {label}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}