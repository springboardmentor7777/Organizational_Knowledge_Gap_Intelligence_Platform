import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import { LayoutDashboard, Users, Target, Sparkles, Share2, GraduationCap, ClipboardCheck,
  Bell, BarChart3, FileText, Settings, Search, Moon, Sun, ChevronLeft, ChevronRight,
  Menu, X, ChevronDown, Award, Briefcase, Home, Plus, MoreVertical, ShieldCheck,
  Building2, Terminal, Pencil, Trash2, Check, AlertTriangle, XCircle, Info,
  UserPlus, Globe, Lock, Clock3, Cpu, SlidersHorizontal,
} from "lucide-react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import {
  useApp,
  TOKENS,
  FONT_STACK,
  NAV_BY_ROLE,
} from "../context/AppContext";


/* ============================================================
   MOCK DATA
   ============================================================ */
const USERS = [
  { name: "Aisha Kumar", email: "aisha.kumar@company.com", role: "Employee", dept: "Engineering", status: "Active", lastActive: "2h ago" },
  { name: "Rohan Verma", email: "rohan.verma@company.com", role: "Manager", dept: "Engineering", status: "Active", lastActive: "10m ago" },
  { name: "Priya Nair", email: "priya.nair@company.com", role: "HR", dept: "People Ops", status: "Active", lastActive: "1d ago" },
  { name: "Daniel Osei", email: "daniel.osei@company.com", role: "Employee", dept: "Sales", status: "Invited", lastActive: "—" },
  { name: "Lin Chen", email: "lin.chen@company.com", role: "Manager", dept: "Design", status: "Active", lastActive: "3h ago" },
  { name: "Sara Ahmed", email: "sara.ahmed@company.com", role: "Employee", dept: "Data", status: "Suspended", lastActive: "14d ago" },
  { name: "Marcus Bell", email: "marcus.bell@company.com", role: "Admin", dept: "IT", status: "Active", lastActive: "5m ago" },
];

const STATUS_META = {
  Active: { color: TOKENS.success, bg: "rgba(16,185,129,0.12)" },
  Invited: { color: TOKENS.warning, bg: "rgba(245,158,11,0.12)" },
  Suspended: { color: TOKENS.danger, bg: "rgba(239,68,68,0.12)" },
};

const PERMISSIONS = [
  "View Dashboard", "Manage Users", "Edit Competency Framework",
  "View Analytics & Reports", "Configure AI Engine", "Approve Training Budget",
];
const ROLE_PERMISSIONS = {
  Employee: [true, false, false, false, false, false],
  Manager: [true, false, false, true, false, false],
  HR: [true, true, true, true, false, true],
  Admin: [true, true, true, true, true, true],
};
const ROLE_COLORS = { Employee: TOKENS.primary, Manager: TOKENS.secondary, HR: TOKENS.success, Admin: TOKENS.warning };

const DEPARTMENTS = [
  { name: "Engineering", head: "Rohan Verma", employees: 214, gapScore: 32 },
  { name: "Product", head: "Nina Osei", employees: 48, gapScore: 28 },
  { name: "Design", head: "Lin Chen", employees: 36, gapScore: 20 },
  { name: "Sales", head: "Marcus Bell", employees: 96, gapScore: 45 },
  { name: "Support", head: "Elena Petrova", employees: 62, gapScore: 38 },
  { name: "Data", head: "Sara Ahmed", employees: 29, gapScore: 25 },
];

const LOGS = [
  { time: "14:32:08", actor: "system", action: "AI model kgi-model-v3.2 completed nightly gap recalculation", status: "success" },
  { time: "14:12:41", actor: "marcus.bell@company.com", action: "updated role permissions for HR", status: "info" },
  { time: "13:58:03", actor: "system", action: "3 failed login attempts detected for sara.ahmed@company.com", status: "warning" },
  { time: "13:40:55", actor: "priya.nair@company.com", action: "exported Q2 analytics report (PDF)", status: "success" },
  { time: "12:55:19", actor: "system", action: "sync with HRIS provider failed — retrying in 15 min", status: "error" },
  { time: "12:10:02", actor: "marcus.bell@company.com", action: "added department \u201cData\u201d", status: "success" },
  { time: "11:44:37", actor: "system", action: "auto-flagged 4 new Critical gaps in Finance", status: "warning" },
];
const LOG_STATUS = {
  success: { color: "#4ADE80", icon: Check },
  info: { color: "#60A5FA", icon: Info },
  warning: { color: "#FBBF24", icon: AlertTriangle },
  error: { color: "#F87171", icon: XCircle },
};

/* ============================================================
   TAB BAR (mirrors sidebar Admin items — clicking either syncs)
   ============================================================ */
   function PillButton({
  children,
  primary = false,
  onClick,
}) {
  const { c } = useApp();

  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 14px",
        borderRadius: 999,
        border: primary ? "none" : `1px solid ${c.border}`,
        background: primary
          ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`
          : c.surfaceSolid,
        color: primary ? "#fff" : c.text,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
}) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 46,
        height: 26,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        position: "relative",
        background: checked
          ? TOKENS.primary
          : "#CBD5E1",
        transition: "0.2s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transition: "0.2s",
        }}
      />
    </button>
  );
}
   function AdminTabs() {
  const { c, dark, activePage, setActivePage } = useApp();
  const tabs = NAV_BY_ROLE.Admin;
  return (
    <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4 }} className="kgi-fade-in">
      {tabs.map((t) => {
        const active = activePage === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setActivePage(t.key)}
            style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", borderRadius: 12,
              border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
              background: active ? (dark ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.09)") : "transparent",
              color: active ? TOKENS.primary : c.textMuted,
            }}
          >
            <t.icon size={15} /> {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   USER MANAGEMENT
   ============================================================ */
function UserManagement() {
  const { c, dark } = useApp();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filtered = useMemo(() => {
    return USERS.filter((u) =>
      (roleFilter === "All Roles" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, roleFilter]);

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer", outline: "none" };

  return (
    <GlassCard>
      <CardHeader
        title="User Management"
        subtitle={`${filtered.length} of ${USERS.length} users`}
        right={<PillButton primary><UserPlus size={14} /> Add User</PillButton>}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 12px" }}>
          <Search size={14} color={c.textMuted} />
          <input placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: c.text, fontSize: 12.5, fontFamily: FONT_STACK }} />
        </div>
        <select style={selectStyle} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option>All Roles</option>
          {["Employee", "Manager", "HR", "Admin"].map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.border}` }}>
              {["User", "Role", "Department", "Status", "Last Active", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 10px 10px", textTransform: "uppercase", letterSpacing: 0.3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => {
              const sm = STATUS_META[u.status];
              return (
                <tr key={u.email} className="kgi-table-row" style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11.5, fontWeight: 700, flexShrink: 0 }}>
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: c.textMuted }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, color: c.text }}>{u.role}</td>
                  <td style={{ padding: "12px 10px", fontSize: 12, color: c.text }}>{u.dept}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: sm.color, background: sm.bg }}>{u.status}</span>
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 11.5, color: c.textMuted }}>{u.lastActive}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>
                    <button style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><MoreVertical size={16} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   ROLES & PERMISSIONS
   ============================================================ */
function RolesPermissions() {
  const { c } = useApp();
  const [matrix, setMatrix] = useState(ROLE_PERMISSIONS);
  const roles = Object.keys(matrix);

  const toggle = (role, idx) => {
    setMatrix((prev) => {
      const next = { ...prev, [role]: [...prev[role]] };
      next[role][idx] = !next[role][idx];
      return next;
    });
  };

  return (
    <GlassCard>
      <CardHeader title="Roles & Permissions" subtitle="Control what each role can see and do across the platform" />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 10px 12px" }}>Permission</th>
              {roles.map((r) => (
                <th key={r} style={{ textAlign: "center", padding: "0 10px 12px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, color: ROLE_COLORS[r], background: `${ROLE_COLORS[r]}1A` }}>{r}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((perm, pIdx) => (
              <tr key={perm} style={{ borderTop: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 10px", fontSize: 12.5, color: c.text, fontWeight: 500 }}>{perm}</td>
                {roles.map((r) => (
                  <td key={r} style={{ textAlign: "center", padding: "12px 10px" }}>
                    <button
                      onClick={() => toggle(r, pIdx)}
                      disabled={r === "Admin"}
                      style={{
                        width: 22, height: 22, borderRadius: 7, border: `1.5px solid ${matrix[r][pIdx] ? ROLE_COLORS[r] : c.border}`,
                        background: matrix[r][pIdx] ? ROLE_COLORS[r] : "transparent",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        cursor: r === "Admin" ? "default" : "pointer", opacity: r === "Admin" ? 0.85 : 1,
                      }}
                    >
                      {matrix[r][pIdx] && <Check size={13} color="#fff" />}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: c.textMuted, marginTop: 14 }}>Admin permissions are fixed and cannot be revoked from this screen.</p>
    </GlassCard>
  );
}

/* ============================================================
   DEPARTMENTS
   ============================================================ */
function DepartmentsPanel() {
  const { c, dark } = useApp();
  return (
    <GlassCard>
      <CardHeader
        title="Departments"
        subtitle={`${DEPARTMENTS.length} departments configured`}
        right={<PillButton primary><Plus size={14} /> Add Department</PillButton>}
      />
      <div className="kgi-dept-grid">
        {DEPARTMENTS.map((d) => (
          <div key={d.name} className="kgi-fade-in" style={{
            border: `1px solid ${c.border}`, borderRadius: 16, padding: 16,
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.02)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `${TOKENS.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={18} color={TOKENS.primary} />
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><Pencil size={14} /></button>
                <button style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: c.text, marginTop: 12 }}>{d.name}</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>Head: {d.head}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 11.5 }}>
              <span style={{ color: c.textMuted }}>{d.employees} employees</span>
              <span style={{ color: d.gapScore > 40 ? TOKENS.danger : d.gapScore > 25 ? TOKENS.warning : TOKENS.success, fontWeight: 700 }}>
                {d.gapScore}% avg gap
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ============================================================
   AI CONFIGURATION
   ============================================================ */
function AiConfigPanel() {
  const { c, dark } = useApp();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoFlag, setAutoFlag] = useState(true);
  const [confidence, setConfidence] = useState(75);
  const [model, setModel] = useState("KGI Model v3.2 (recommended)");

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.inputBg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "9px 11px", cursor: "pointer", outline: "none", width: "100%" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <GlassCard>
        <CardHeader title="AI Configuration" subtitle="Control how the recommendation engine analyzes and surfaces gaps" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { label: "Enable AI recommendations", desc: "Power the dashboard insights and course suggestions", val: aiEnabled, set: setAiEnabled },
            { label: "Auto-flag critical gaps", desc: "Automatically raise alerts when a gap crosses the Critical threshold", val: autoFlag, set: setAutoFlag },
          ].map((row, i) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 4px", borderBottom: i === 0 ? `1px solid ${c.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{row.label}</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>{row.desc}</div>
              </div>
              <Toggle checked={row.val} onChange={() => row.set(!row.val)} />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <CardHeader title="Model & Sensitivity" />
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "block", marginBottom: 6 }}>Active model</label>
          <select style={selectStyle} value={model} onChange={(e) => setModel(e.target.value)}>
            <option>KGI Model v3.2 (recommended)</option>
            <option>KGI Model v2.1 (legacy)</option>
            <option>KGI Model v3.2-lite (faster, lower cost)</option>
          </select>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: c.text }}>Recommendation confidence threshold</label>
            <span style={{ fontSize: 12, fontWeight: 700, color: TOKENS.primary }}>{confidence}%</span>
          </div>
          <input
            type="range" min="40" max="99" value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="kgi-slider"
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>
            <span>More suggestions</span><span>Higher precision only</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ============================================================
   SYSTEM LOGS — terminal-styled console (signature element)
   Rendered as a monospace console panel regardless of theme —
   this is the one bold visual for the admin module, and it
   literally matches the section's name.
   ============================================================ */
function SystemLogs() {
  const { c } = useApp();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? LOGS : LOGS.filter((l) => l.status === filter);

  return (
    <GlassCard>
      <CardHeader
        title="System Logs"
        subtitle="Live feed of platform events"
        right={
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "success", "warning", "error"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 99, cursor: "pointer",
                border: `1px solid ${filter === f ? "transparent" : c.border}`,
                background: filter === f ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : "transparent",
                color: filter === f ? "#fff" : c.text, textTransform: "capitalize",
              }}>
                {f}
              </button>
            ))}
          </div>
        }
      />
      <div style={{
        background: "#0B1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
        padding: "14px 16px", fontFamily: "'SF Mono','Fira Code',ui-monospace,monospace",
        fontSize: 12, maxHeight: 320, overflowY: "auto",
      }}>
        {filtered.map((log, i) => {
          const meta = LOG_STATUS[log.status];
          return (
            <div key={i} className="kgi-fade-in" style={{ display: "flex", gap: 10, padding: "5px 0", animationDelay: `${i * 40}ms` }}>
              <span style={{ color: "#64748B", flexShrink: 0 }}>{log.time}</span>
              <meta.icon size={13} color={meta.color} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "#94A3B8", flexShrink: 0 }}>{log.actor}</span>
              <span style={{ color: "#E2E8F0" }}>{log.action}</span>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: "#4ADE80" }}>
          <span className="kgi-cursor-blink">▍</span>
          <span style={{ color: "#64748B" }}>watching for new events...</span>
        </div>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   ORG SETTINGS
   ============================================================ */
function OrgSettings() {
  const { c, dark } = useApp();
  const [orgName, setOrgName] = useState("Acme Global Inc.");
  const [twoFA, setTwoFA] = useState(true);
  const [saved, setSaved] = useState(false);

  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.inputBg, color: c.text, fontSize: 13, outline: "none", fontFamily: FONT_STACK };
  const selectStyle = { ...inputStyle, cursor: "pointer" };

  const save = () => {
    setSaved(false);
    setTimeout(() => setSaved(true), 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <GlassCard>
        <CardHeader title="Organization" subtitle="General workspace details" />
        <div className="kgi-settings-grid">
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "block", marginBottom: 6 }}>Organization name</label>
            <input style={inputStyle} value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "block", marginBottom: 6 }}>
              <Globe size={12} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} /> Timezone
            </label>
            <select style={selectStyle} defaultValue="IST (UTC+5:30)">
              <option>IST (UTC+5:30)</option>
              <option>PST (UTC-8:00)</option>
              <option>EST (UTC-5:00)</option>
              <option>CET (UTC+1:00)</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <CardHeader title="Security" subtitle="Workspace-wide access controls" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 4px", borderBottom: `1px solid ${c.border}` }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", gap: 6 }}><Lock size={13} /> Require two-factor authentication</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>Applies to all Admin and HR accounts</div>
          </div>
          <Toggle checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 4px 4px" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", gap: 6 }}><Clock3 size={13} /> Session timeout</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>Automatically sign out inactive sessions</div>
          </div>
          <select style={{ ...selectStyle, width: 140 }} defaultValue="30 minutes">
            <option>15 minutes</option><option>30 minutes</option><option>1 hour</option><option>4 hours</option>
          </select>
        </div>
      </GlassCard>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <PillButton primary onClick={save}>Save Changes</PillButton>
        {saved && (
          <span className="kgi-fade-in" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TOKENS.success, fontWeight: 600 }}>
            <Check size={14} /> Settings saved
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ADMIN CONSOLE PAGE
   ============================================================ */
function AdminConsolePage() {
  const { c, activePage } = useApp();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Admin Console</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Manage users, permissions, departments, AI behavior, and workspace settings.
        </p>
      </div>
      <AdminTabs />
      {activePage === "users" && <UserManagement />}
      {activePage === "roles" && <RolesPermissions />}
      {activePage === "departments" && <DepartmentsPanel />}
      {activePage === "ai-config" && <AiConfigPanel />}
      {activePage === "logs" && <SystemLogs />}
      {activePage === "settings" && <OrgSettings />}
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function AdminConsole() {
  return (
    <Layout>
      <AdminConsolePage />
    </Layout>
  );
}