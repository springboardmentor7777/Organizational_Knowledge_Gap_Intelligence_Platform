import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Target,
  Sparkles,
  Share2,
  GraduationCap,
  ClipboardCheck,
  BarChart3,
  FileText,
  Settings,
  AlertTriangle,
  Briefcase,
  ShieldCheck,
} from "lucide-react";const TOKENS = {
  light: {
    bg: "#F8FAFC",
    bgAlt: "#EEF2F9",
    surface: "rgba(255,255,255,0.72)",
    surfaceSolid: "#FFFFFF",
    border: "rgba(15,23,42,0.08)",
    text: "#0F172A",
    textMuted: "#64748B",

    inputBg: "#FFFFFF",          // ← ADD THIS

    shadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)",
    shadowLg: "0 12px 40px -12px rgba(37,99,235,0.25)",
  },

  dark: {
    bg: "#0F172A",
    bgAlt: "#0B1220",
    surface: "rgba(30,41,59,0.65)",
    surfaceSolid: "#1E293B",
    border: "rgba(255,255,255,0.08)",
    text: "#F1F5F9",
    textMuted: "#94A3B8",

    inputBg: "#1E293B",          // ← ADD THIS

    shadow: "0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -8px rgba(0,0,0,0.5)",
    shadowLg: "0 12px 40px -12px rgba(124,58,237,0.45)",
  },

  primary: "#2563EB",
  secondary: "#7C3AED",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

const FONT_STACK =
  "'Inter','Poppins',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif"; 
  const NAV_BY_ROLE = {
  Employee: [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "My Skills", icon: Target, key: "skillinventory" },
  { label: "Learning Path", icon: GraduationCap, key: "learningprogress" },
  { label: "Mentors", icon: Share2, key: "mentors" }, // only if you create this route
  { label: "Assessments", icon: ClipboardCheck, key: "assessment" },
],
 Manager: [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Gap Analysis", icon: AlertTriangle, key: "gapanalysis" },
  { label: "Reviews", icon: ClipboardCheck, key: "assessment" },
  { label: "Analytics", icon: BarChart3, key: "analytics" },
],
 HR: [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Gap Analysis", icon: AlertTriangle, key: "gapanalysis" },
  { label: "Reports", icon: FileText, key: "reports" },
  { label: "Analytics", icon: BarChart3, key: "analytics" },
],
  Admin: [
  {
    label: "User Management",
    icon: Users,
    key: "users",
  },
  {
    label: "Roles & Permissions",
    icon: ShieldCheck,
    key: "roles",
  },
  {
    label: "Departments",
    icon: Briefcase,
    key: "departments",
  },
  {
    label: "AI Configuration",
    icon: Sparkles,
    key: "ai-config",
  },
  {
    label: "System Logs",
    icon: FileText,
    key: "logs",
  },
  {
    label: "Settings",
    icon: Settings,
    key: "settings",
  },
],
};

export const AppCtx = createContext(null);

export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState("Employee");
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
  if (!NAV_BY_ROLE[role].find((i) => i.key === activePage)) {
    setActivePage("dashboard");
  }
}, [role, activePage]);

  const c = dark ? TOKENS.dark : TOKENS.light;

  const value = useMemo(
  () => ({
    dark,
    setDark,
    role,
    setRole,
    activePage,
    setActivePage,
    collapsed,
    setCollapsed,
    c,
    NAV_BY_ROLE,
  }),
  [dark, role, activePage, collapsed, c]
);
  return (
    <AppCtx.Provider value={value}>
      {children}
    </AppCtx.Provider>
  );
}

export { TOKENS, FONT_STACK, NAV_BY_ROLE };