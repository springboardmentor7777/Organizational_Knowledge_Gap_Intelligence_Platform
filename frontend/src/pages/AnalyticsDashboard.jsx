import React, { useState, useMemo } from "react";

import {
  TrendingUp,
  TrendingDown,
  Download,
  FileDown,
  ArrowUpDown,
  Sparkles as SparkIcon,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";

import { useApp, TOKENS } from "../context/AppContext";

/* ============================================================
   MOCK DATA
   ============================================================ */
const EMP_TREND = [{ m: "Feb", score: 58 }, { m: "Mar", score: 61 }, { m: "Apr", score: 63 }, { m: "May", score: 68 }, { m: "Jun", score: 72 }, { m: "Jul", score: 77 }];
const EMP_TIME_SPLIT = [
  { name: "Technical", value: 46, color: TOKENS.primary },
  { name: "Leadership", value: 18, color: TOKENS.secondary },
  { name: "Domain", value: 20, color: TOKENS.success },
  { name: "Communication", value: 16, color: TOKENS.warning },
];
const EMP_COMPARISON = [
  { cat: "Technical", you: 78, team: 71, org: 68 },
  { cat: "Leadership", you: 54, team: 58, org: 55 },
  { cat: "Domain", you: 66, team: 62, org: 60 },
  { cat: "Comms", you: 82, team: 75, org: 70 },
];

const TEAM_MEMBERS = [
  { name: "Aisha Kumar", role: "Sr. Engineer", score: 82, gap: 18, trend: 6 },
  { name: "Tom Reilly", role: "Engineer", score: 64, gap: 36, trend: -3 },
  { name: "Neha Joshi", role: "Engineer", score: 71, gap: 29, trend: 4 },
  { name: "Carlos Diaz", role: "Sr. Engineer", score: 88, gap: 12, trend: 2 },
  { name: "Wei Zhang", role: "Engineer", score: 58, gap: 42, trend: -1 },
];
const TEAM_COVERAGE = [
  { cat: "Cloud", team: 62 }, { cat: "Security", team: 48 }, { cat: "Leadership", team: 56 },
  { cat: "Design Systems", team: 74 }, { cat: "Testing", team: 69 },
];
const TEAM_GAP_TREND = [{ q: "Q3 '25", gap: 38 }, { q: "Q4 '25", gap: 34 }, { q: "Q1 '26", gap: 30 }, { q: "Q2 '26", gap: 26 }];

const DEPT_LEADERBOARD = [
  { dept: "Design", completion: 88, gap: 20, headcount: 36 },
  { dept: "Data", completion: 76, gap: 25, headcount: 29 },
  { dept: "Engineering", completion: 82, gap: 32, headcount: 214 },
  { dept: "Product", completion: 71, gap: 28, headcount: 48 },
  { dept: "Support", completion: 65, gap: 38, headcount: 62 },
  { dept: "Sales", completion: 58, gap: 45, headcount: 96 },
];
const ORG_TREND = [{ q: "Q3 '25", completion: 62 }, { q: "Q4 '25", completion: 67 }, { q: "Q1 '26", completion: 71 }, { q: "Q2 '26", completion: 75 }];

const BENCHMARK = [
  { cat: "Cloud & Security", org: 58, industry: 64 },
  { cat: "Leadership", org: 61, industry: 57 },
  { cat: "Data Fluency", org: 66, industry: 60 },
  { cat: "Compliance", org: 54, industry: 68 },
];
const TOP_MOVERS = [
  { name: "Design", type: "Department", change: "+14 pts", positive: true },
  { name: "Lin Chen", type: "Mentor impact", change: "+9 mentee avg", positive: true },
  { name: "Sales", type: "Department", change: "-3 pts", positive: false },
  { name: "Cloud Security curriculum", type: "Course", change: "+22% completion", positive: true },
];

function sparkFor(seed) {
  const arr = [];
  let v = 50 + (seed % 20);
  for (let i = 0; i < 8; i++) { v += ((seed * (i + 1)) % 9) - 3; arr.push({ i, v: Math.max(20, Math.min(95, v)) }); }
  return arr;
}
const ROLE_LABEL = {
  Employee: "Employee Analytics",
  Manager: "Manager Analytics",
  HR: "HR Analytics",
  Admin: "Executive Analytics",
};
const KPIS_BY_ROLE = {
  Employee: [
    { label: "Skill Growth", value: "+18%", positive: true, seed: 3 },
    { label: "Learning Hours", value: "96h", positive: true, seed: 7 },
    { label: "Gap Closed", value: "12 pts", positive: true, seed: 11 },
    { label: "Team Percentile", value: "72nd", positive: true, seed: 5 },
  ],
  Manager: [
    { label: "Team Size", value: "12", positive: null, seed: 2 },
    { label: "Avg Gap Score", value: "28%", positive: false, seed: 9 },
    { label: "Training Completion", value: "74%", positive: true, seed: 13 },
    { label: "At-Risk Members", value: "2", positive: false, seed: 6 },
  ],
  HR: [
    { label: "Total Employees", value: "1,284", positive: null, seed: 4 },
    { label: "Org Avg Gap", value: "23%", positive: true, seed: 8 },
    { label: "Critical Gaps", value: "10", positive: false, seed: 12 },
    { label: "Budget Utilization", value: "68%", positive: null, seed: 1 },
  ],
  Admin: [
    { label: "Readiness Index", value: "77%", positive: true, seed: 14 },
    { label: "YoY Gap Reduction", value: "-15%", positive: true, seed: 10 },
    { label: "Training ROI (est.)", value: "3.2x", positive: true, seed: 16 },
    { label: "Retention Correlation", value: "+0.41", positive: true, seed: 15 },
  ],
};

/* ============================================================
   SIGNATURE ELEMENT: KPI cards with embedded sparklines
   Every KPI carries its own micro-trend inline — a compact,
   analytics-native pattern distinct from the full-size charts
   used elsewhere, and it works identically across all 4 role
   views without needing 4 different signature elements.
   ============================================================ */
function Sparkline({ data, color }) {
  return (
    <ResponsiveContainer width={72} height={30}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
function KpiCard({ kpi, index }) {
  const { c } = useApp();
  const color = kpi.positive === false ? TOKENS.danger : kpi.positive === true ? TOKENS.success : TOKENS.primary;
  const data = sparkFor(kpi.seed);
  return (
    <GlassCard className="kgi-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11.5, color: c.textMuted, fontWeight: 600 }}>{kpi.label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: c.text, marginTop: 5 }}>{kpi.value}</div>
        </div>
        <Sparkline data={data} color={color} />
      </div>
    </GlassCard>
  );
}

/* ============================================================
   SORTABLE TABLE HEADER
   ============================================================ */
function SortHeader({ label, sortKey, sort, setSort }) {
  const { c } = useApp();
  const active = sort.key === sortKey;
  return (
    <th
      onClick={() => setSort({ key: sortKey, dir: active && sort.dir === "desc" ? "asc" : "desc" })}
      style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 10px 10px", cursor: "pointer", userSelect: "none" }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 4, color: active ? TOKENS.primary : c.textMuted }}>
        {label} <ArrowUpDown size={11} />
      </span>
    </th>
  );
}

function exportCSV(filename, rows) {
  const header = Object.keys(rows[0]).join(",");
  const body = rows.map((r) => Object.values(r).join(",")).join("\n");
  const blob = new Blob([header + "\n" + body], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ============================================================
   ROLE-SPECIFIC VIEWS
   ============================================================ */
function EmployeeView() {
  const { c, dark } = useApp();
  return (
    <>
      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Competency Score Trend" subtitle="Last 6 months" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={EMP_TREND} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke={TOKENS.primary} strokeWidth={2.5} dot={{ r: 4, fill: TOKENS.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <CardHeader title="Learning Time by Category" subtitle="This quarter" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={EMP_TIME_SPLIT} innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={3}>
                {EMP_TIME_SPLIT.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: -4 }}>
            {EMP_TIME_SPLIT.map((t) => (
              <span key={t.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: c.textMuted }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: t.color }} /> {t.name}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <CardHeader title="You vs. Team vs. Org" subtitle="Average score by category" />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={EMP_COMPARISON} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
            <XAxis dataKey="cat" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="you" name="You" fill={TOKENS.primary} radius={[6, 6, 0, 0]} />
            <Bar dataKey="team" name="Team avg" fill={TOKENS.secondary} radius={[6, 6, 0, 0]} />
            <Bar dataKey="org" name="Org avg" fill={dark ? "#3f4f6b" : "#CBD5E1"} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </>
  );
}

function ManagerView() {
  const { c, dark } = useApp();
  const [sort, setSort] = useState({ key: "gap", dir: "desc" });
  const sorted = useMemo(() => {
    const arr = [...TEAM_MEMBERS];
    arr.sort((a, b) => (sort.dir === "desc" ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]));
    return arr;
  }, [sort]);

  return (
    <>
      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Team Skill Coverage" subtitle="Average score by category" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TEAM_COVERAGE} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 10.5, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="team" fill={TOKENS.primary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <CardHeader title="Team Gap Trend" subtitle="Average gap score, last 4 quarters" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TEAM_GAP_TREND} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="gap" stroke={TOKENS.danger} strokeWidth={2.5} dot={{ r: 4, fill: TOKENS.danger }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <CardHeader
          title="Team Members"
          subtitle="Click a column to sort"
          right={
            <button onClick={() => exportCSV("team-members.csv", TEAM_MEMBERS)} style={{
              display: "flex", alignItems: "center", gap: 6, background: "transparent",
              border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px",
              color: c.text, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
            }}>
              <FileDown size={13} /> Export CSV
            </button>
          }
        />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 10px 10px" }}>Name</th>
                <SortHeader label="Score" sortKey="score" sort={sort} setSort={setSort} />
                <SortHeader label="Gap" sortKey="gap" sort={sort} setSort={setSort} />
                <SortHeader label="Trend" sortKey="trend" sort={sort} setSort={setSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => (
                <tr key={m.name} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ padding: "10px", fontSize: 12.5, color: c.text }}>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: c.textMuted }}>{m.role}</div>
                  </td>
                  <td style={{ padding: "10px", fontSize: 12.5, color: c.text }}>{m.score}</td>
                  <td style={{ padding: "10px", fontSize: 12.5, color: m.gap > 35 ? TOKENS.danger : m.gap > 20 ? TOKENS.warning : TOKENS.success, fontWeight: 700 }}>{m.gap}%</td>
                  <td style={{ padding: "10px", fontSize: 12.5 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: m.trend >= 0 ? TOKENS.success : TOKENS.danger, fontWeight: 700 }}>
                      {m.trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {m.trend > 0 ? "+" : ""}{m.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}

function HrView() {
  const { c, dark } = useApp();
  const [sort, setSort] = useState({ key: "gap", dir: "desc" });
  const sorted = useMemo(() => {
    const arr = [...DEPT_LEADERBOARD];
    arr.sort((a, b) => (sort.dir === "desc" ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]));
    return arr;
  }, [sort]);

  return (
    <>
      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Department Completion" subtitle="Training completion rate" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DEPT_LEADERBOARD} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: c.textMuted }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="completion" fill={TOKENS.success} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <CardHeader title="Org-wide Completion Trend" subtitle="Last 4 quarters" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ORG_TREND} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="completion" stroke={TOKENS.primary} strokeWidth={2.5} dot={{ r: 4, fill: TOKENS.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
      <GlassCard>
        <CardHeader
          title="Department Leaderboard"
          subtitle="Click a column to sort"
          right={
            <button onClick={() => exportCSV("department-leaderboard.csv", DEPT_LEADERBOARD)} style={{
              display: "flex", alignItems: "center", gap: 6, background: "transparent",
              border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px",
              color: c.text, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
            }}>
              <FileDown size={13} /> Export CSV
            </button>
          }
        />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontSize: 11, color: c.textMuted, fontWeight: 700, padding: "0 10px 10px" }}>Department</th>
                <SortHeader label="Completion" sortKey="completion" sort={sort} setSort={setSort} />
                <SortHeader label="Avg Gap" sortKey="gap" sort={sort} setSort={setSort} />
                <SortHeader label="Headcount" sortKey="headcount" sort={sort} setSort={setSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map((d) => (
                <tr key={d.dept} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ padding: "10px", fontSize: 12.5, fontWeight: 600, color: c.text }}>{d.dept}</td>
                  <td style={{ padding: "10px", fontSize: 12.5, color: c.text }}>{d.completion}%</td>
                  <td style={{ padding: "10px", fontSize: 12.5, fontWeight: 700, color: d.gap > 40 ? TOKENS.danger : d.gap > 25 ? TOKENS.warning : TOKENS.success }}>{d.gap}%</td>
                  <td style={{ padding: "10px", fontSize: 12.5, color: c.textMuted }}>{d.headcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}

function AdminView() {
  const { c, dark } = useApp();
  return (
    <>
      <GlassCard style={{
        background: dark
          ? "linear-gradient(160deg, rgba(37,99,235,0.16), rgba(124,58,237,0.12))"
          : "linear-gradient(160deg, rgba(37,99,235,0.07), rgba(124,58,237,0.05))",
      }} hover={false}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SparkIcon size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 3 }}>Workforce readiness is trending up</div>
            <p style={{ fontSize: 12.5, color: c.text, lineHeight: 1.5, margin: 0 }}>
              The organization closed 15% of its aggregate skill gap year-over-year, outperforming the Compliance
              category benchmark set for this cycle. Cloud &amp; Security remains the largest lag versus industry.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Org vs. Industry Benchmark" subtitle="Average competency score by category" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BENCHMARK} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 10.5, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="org" name="This org" fill={TOKENS.primary} radius={[6, 6, 0, 0]} />
              <Bar dataKey="industry" name="Industry avg" fill={dark ? "#3f4f6b" : "#CBD5E1"} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard>
          <CardHeader title="Top Movers" subtitle="Biggest changes this quarter" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {TOP_MOVERS.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 4px", borderBottom: i < TOP_MOVERS.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: c.textMuted }}>{m.type}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: m.positive ? TOKENS.success : TOKENS.danger }}>{m.change}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}

/* ============================================================
   ANALYTICS PAGE
   ============================================================ */
function AnalyticsPage() {
  const { c, role } = useApp();
  const [range, setRange] = useState("This Quarter");
  const [dept, setDept] = useState("All Departments");
  const kpis = KPIS_BY_ROLE[role];

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer", outline: "none" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>{ROLE_LABEL[role]}</h1>
          <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
            Switch roles in the top bar to see how this view adapts — the same page serves Employee, Manager, HR, and Executive analytics.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select style={selectStyle} value={range} onChange={(e) => setRange(e.target.value)}>
            <option>This Quarter</option><option>Last Quarter</option><option>Year to Date</option>
          </select>
          {(role === "HR" || role === "Admin") && (
            <select style={selectStyle} value={dept} onChange={(e) => setDept(e.target.value)}>
              <option>All Departments</option>
              {DEPT_LEADERBOARD.map((d) => <option key={d.dept}>{d.dept}</option>)}
            </select>
          )}
          <button style={{
            display: "flex", alignItems: "center", gap: 6, background: "transparent",
            border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 13px",
            color: c.text, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            <Download size={13} /> Export PDF
          </button>
        </div>
      </div>

      <div className="kgi-stat-grid">
        {kpis.map((k, i) => <KpiCard key={k.label} kpi={k} index={i} />)}
      </div>

      {role === "Employee" && <EmployeeView />}
      {role === "Manager" && <ManagerView />}
      {role === "HR" && <HrView />}
      {role === "Admin" && <AdminView />}
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function AnalyticsDashboard() {
  return (
    <Layout>
      <AnalyticsPage />
    </Layout>
  );
}