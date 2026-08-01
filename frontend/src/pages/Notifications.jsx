import React, { useState } from "react";

import {
  Users,
  Bell,
  GraduationCap as GradIcon,
  AlertTriangle,
  Smartphone,
  CheckCheck,
  Mail,
  MailOpen,
  MailX,
  Info,
  X,
} from "lucide-react";

import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS } from "../context/AppContext";

/* ============================================================
   MOCK DATA
   ============================================================ */
const NOTIF_TYPE_META = {
  training: { label: "Training Reminder", icon: GradIcon, color: TOKENS.primary },
  skill: { label: "Skill Alert", icon: AlertTriangle, color: TOKENS.warning },
  system: { label: "System", icon: Info, color: TOKENS.secondary },
  mention: { label: "Mention", icon: Users, color: TOKENS.success },
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: "training", title: "Applied Cloud Security starts in 2 hours", body: "Don't forget your scheduled session at 3:00 PM today.", time: "10 min ago", group: "Today", unread: true },
  { id: 2, type: "skill", title: "New Critical gap flagged: Compliance", body: "Finance department Compliance score dropped below threshold.", time: "1 hour ago", group: "Today", unread: true },
  { id: 3, type: "mention", title: "Rohan Verma mentioned you", body: "\u201cCan Aisha take a look at the design system gap?\u201d", time: "3 hours ago", group: "Today", unread: true },
  { id: 4, type: "training", title: "Reminder: Self-assessment due Friday", body: "Your Q3 self-assessment hasn't been submitted yet.", time: "Yesterday, 4:12 PM", group: "Yesterday", unread: false },
  { id: 5, type: "system", title: "Competency Framework updated to v2.3", body: "HR published updated role requirements for Engineering.", time: "Yesterday, 11:00 AM", group: "Yesterday", unread: false },
  { id: 6, type: "skill", title: "Your Cloud Security score improved", body: "Up 9 points since last assessment — nice progress.", time: "2 days ago", group: "This Week", unread: false },
  { id: 7, type: "training", title: "New course match: Advanced Threat Modeling", body: "96% AI match based on your current skill gaps.", time: "3 days ago", group: "This Week", unread: false },
];

const CHANNEL_CATEGORIES = ["Training Reminders", "Skill Alerts", "Mentions", "Weekly Digest"];
const CHANNELS = ["Push", "Email", "SMS"];
const INITIAL_PREFS = {
  "Training Reminders": [true, true, false],
  "Skill Alerts": [true, true, true],
  "Mentions": [true, false, false],
  "Weekly Digest": [false, true, false],
};

const EMAIL_HISTORY = [
  { subject: "Your Q3 self-assessment is due Friday", sent: "Jul 29, 2026", status: "Opened" },
  { subject: "New Critical gap flagged in your department", sent: "Jul 28, 2026", status: "Opened" },
  { subject: "Weekly Digest: 3 new course matches for you", sent: "Jul 27, 2026", status: "Delivered" },
  { subject: "Your certificate for GraphQL in Production", sent: "Jul 10, 2026", status: "Opened" },
  { subject: "Mentor session confirmed with Marcus Bell", sent: "Jul 5, 2026", status: "Bounced" },
];
const EMAIL_STATUS = {
  Opened: { color: TOKENS.success, icon: MailOpen },
  Delivered: { color: TOKENS.primary, icon: Mail },
  Bounced: { color: TOKENS.danger, icon: MailX },
};

const SMS_HISTORY = [
  { preview: "Reminder: Applied Cloud Security starts in 2 hours.", sent: "Today, 1:00 PM", status: "Delivered" },
  { preview: "Your training session with Lin Chen is confirmed for Thu 2pm.", sent: "Jul 26, 2026", status: "Delivered" },
  { preview: "Critical skill gap alert: check the app for details.", sent: "Jul 20, 2026", status: "Failed" },
];
const SMS_STATUS = { Delivered: TOKENS.success, Failed: TOKENS.danger };

/* ============================================================
   CONTEXT + PRIMITIVES
   ============================================================ */


function StatMini({ label, value, icon: Icon, color }) {
  const { c } = useApp();
  return (
    <GlassCard className="kgi-fade-in" style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, color: c.text, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, marginTop: 3 }}>{label}</div>
      </div>
    </GlassCard>
  );
}
function Toggle({ checked, onChange }) {
  return (
    <button onClick={onChange} style={{
      width: 38, height: 22, borderRadius: 99, border: "none", cursor: "pointer", flexShrink: 0,
      background: checked ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : "rgba(148,163,184,0.35)",
      position: "relative", transition: "background 0.2s ease",
    }}>
      <span style={{ position: "absolute", top: 3, left: checked ? 19 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
    </button>
  );
}

/* ============================================================
   SIGNATURE ELEMENT: Notification feed with dismiss interaction
   Each item can be marked read (click) or dismissed (X, with a
   real removal animation) — grouped by recency, with a pulsing
   unread dot. This is the page's core action made tactile,
   rather than a static list.
   ============================================================ */
function NotificationItem({ item, onDismiss, onToggleRead }) {
  const { c, dark } = useApp();
  const meta = NOTIF_TYPE_META[item.type];
  const [leaving, setLeaving] = useState(false);

  return (
    <div
      className={leaving ? "kgi-notif-leave" : "kgi-fade-in"}
      onAnimationEnd={() => { if (leaving) onDismiss(item.id); }}
      style={{
        display: "flex", gap: 12, padding: "13px 6px", borderRadius: 14, cursor: "pointer",
        background: item.unread ? (dark ? "rgba(37,99,235,0.08)" : "rgba(37,99,235,0.05)") : "transparent",
      }}
      onClick={() => onToggleRead(item.id)}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <meta.icon size={17} color={meta.color} />
        </div>
        {item.unread && <span className="kgi-unread-pulse" style={{ position: "absolute", top: -2, right: -2, width: 9, height: 9, borderRadius: "50%", background: TOKENS.danger, border: `2px solid ${dark ? "#1E293B" : "#fff"}` }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: item.unread ? 700 : 600, color: c.text }}>{item.title}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setLeaving(true); }}
            style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer", flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        </div>
        <p style={{ fontSize: 12, color: c.textMuted, margin: "3px 0 6px", lineHeight: 1.4 }}>{item.body}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, color: meta.color, background: `${meta.color}14` }}>{meta.label}</span>
          <span style={{ fontSize: 11, color: c.textMuted }}>{item.time}</span>
        </div>
      </div>
    </div>
  );
}

function NotificationFeed() {
  const { c } = useApp();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);
  const groups = ["Today", "Yesterday", "This Week"].filter((g) => filtered.some((n) => n.group === g));

  const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const toggleRead = (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <GlassCard>
      <CardHeader
        title="Notifications"
        subtitle={`${notifications.filter((n) => n.unread).length} unread`}
        right={
          <button onClick={markAllRead} style={{
            display: "flex", alignItems: "center", gap: 6, background: "transparent",
            border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px",
            color: c.text, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
          }}>
            <CheckCheck size={13} /> Mark all read
          </button>
        }
      />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {["all", "training", "skill", "system", "mention"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontSize: 11, fontWeight: 600, padding: "5px 11px", borderRadius: 99, cursor: "pointer",
            border: `1px solid ${filter === f ? "transparent" : c.border}`,
            background: filter === f ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : "transparent",
            color: filter === f ? "#fff" : c.text,
          }}>
            {f === "all" ? "All" : NOTIF_TYPE_META[f].label}
          </button>
        ))}
      </div>
      {groups.length === 0 && <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 20 }}>You're all caught up.</p>}
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: 0.4, margin: "10px 6px 2px" }}>{g}</div>
          {filtered.filter((n) => n.group === g).map((item) => (
            <NotificationItem key={item.id} item={item} onDismiss={dismiss} onToggleRead={toggleRead} />
          ))}
        </div>
      ))}
    </GlassCard>
  );
}

/* ============================================================
   CHANNEL PREFERENCES MATRIX
   ============================================================ */
function ChannelPreferences() {
  const { c } = useApp();
  const [prefs, setPrefs] = useState(INITIAL_PREFS);
  const toggle = (cat, idx) => setPrefs((prev) => {
    const next = { ...prev, [cat]: [...prev[cat]] };
    next[cat][idx] = !next[cat][idx];
    return next;
  });

  return (
    <GlassCard>
      <CardHeader title="Notification Preferences" subtitle="Choose how you're notified for each category" />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 8px 10px" }}>Category</th>
              {CHANNELS.map((ch) => (
                <th key={ch} style={{ textAlign: "center", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 8px 10px" }}>{ch}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHANNEL_CATEGORIES.map((cat) => (
              <tr key={cat} style={{ borderTop: `1px solid ${c.border}` }}>
                <td style={{ padding: "12px 8px", fontSize: 12.5, color: c.text, fontWeight: 500 }}>{cat}</td>
                {CHANNELS.map((ch, i) => (
                  <td key={ch} style={{ textAlign: "center", padding: "12px 8px" }}>
                    <Toggle checked={prefs[cat][i]} onChange={() => toggle(cat, i)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   EMAIL / SMS HISTORY
   ============================================================ */
function EmailHistory() {
  const { c } = useApp();
  return (
    <GlassCard>
      <CardHeader title="Email History" subtitle={`${EMAIL_HISTORY.length} sent recently`} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {EMAIL_HISTORY.map((e, i) => {
          const meta = EMAIL_STATUS[e.status];
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < EMAIL_HISTORY.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <meta.icon size={14} color={meta.color} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.subject}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{e.sent}</div>
                </div>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: meta.color, background: `${meta.color}14`, flexShrink: 0 }}>{e.status}</span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function SmsHistory() {
  const { c } = useApp();
  return (
    <GlassCard>
      <CardHeader title="SMS History" subtitle={`${SMS_HISTORY.length} sent recently`} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SMS_HISTORY.map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < SMS_HISTORY.length - 1 ? `1px solid ${c.border}` : "none" }}>
            <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `${TOKENS.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Smartphone size={14} color={TOKENS.primary} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>{s.preview}</div>
                <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{s.sent}</div>
              </div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: SMS_STATUS[s.status], background: `${SMS_STATUS[s.status]}14`, flexShrink: 0 }}>{s.status}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ============================================================
   NOTIFICATIONS PAGE
   ============================================================ */
function NotificationsPage() {
  const { c } = useApp();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Notifications</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Training reminders, skill alerts, and delivery history across every channel.
        </p>
      </div>

      <div className="kgi-stat-grid">
        <StatMini label="Unread" value={3} icon={Bell} color={TOKENS.danger} />
        <StatMini label="Training Reminders" value={2} icon={GradIcon} color={TOKENS.primary} />
        <StatMini label="Active Skill Alerts" value={1} icon={AlertTriangle} color={TOKENS.warning} />
        <StatMini label="Email Open Rate" value="80%" icon={MailOpen} color={TOKENS.success} />
      </div>

      <div className="kgi-top-grid">
        <NotificationFeed />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <ChannelPreferences />
        </div>
      </div>

      <div className="kgi-top-grid">
        <EmailHistory />
        <SmsHistory />
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Notifications() {
  return (
    <Layout>
      <NotificationsPage />
    </Layout>
  );
}
