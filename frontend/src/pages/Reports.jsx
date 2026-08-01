import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS } from "../context/AppContext";
import {
  Sparkles,
  GraduationCap,
  AlertTriangle,
  Building2,
  ShieldCheck,
  User,
  FileDown,
  Printer,
  Loader2,
  Calendar,
  Mail,
  FileText,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
/* ============================================================
   MOCK DATA
   ============================================================ */
const TEMPLATES = [
  { key: "gap-summary", name: "Knowledge Gap Summary", icon: AlertTriangle, desc: "Org-wide gap severity by department and skill category.", color: TOKENS.danger },
  { key: "dept-comparison", name: "Department Comparison", icon: Building2, desc: "Side-by-side completion and gap metrics across departments.", color: TOKENS.primary },
  { key: "training-completion", name: "Training Completion", icon: GraduationCap, desc: "Completion rates and hours logged across active courses.", color: TOKENS.success },
  { key: "individual-skill", name: "Individual Skill Report", icon: User, desc: "Full skill breakdown, certifications, and progress for one employee.", color: TOKENS.secondary },
  { key: "compliance-audit", name: "Compliance Audit", icon: ShieldCheck, desc: "Compliance-relevant training status ahead of scheduled audits.", color: TOKENS.warning },
];

const DEPARTMENTS = ["Engineering", "Product", "Design", "Sales", "Support", "Data"];

const REPORT_DATA = {
  "gap-summary": {
    chartType: "bar", dataKey: "gap", xKey: "dept", color: TOKENS.danger,
    chart: [
      { dept: "Engineering", gap: 32 }, { dept: "Product", gap: 28 }, { dept: "Design", gap: 20 },
      { dept: "Sales", gap: 45 }, { dept: "Support", gap: 38 }, { dept: "Data", gap: 25 },
    ],
    columns: ["Department", "Avg Gap Score", "Priority"],
    rows: [
      ["Sales", "45%", "Critical"], ["Support", "38%", "High"], ["Engineering", "32%", "High"],
      ["Product", "28%", "Medium"], ["Data", "25%", "Medium"], ["Design", "20%", "Low"],
    ],
  },
  "dept-comparison": {
    chartType: "bar", dataKey: "completion", xKey: "dept", color: TOKENS.primary,
    chart: [
      { dept: "Design", completion: 88 }, { dept: "Data", completion: 76 }, { dept: "Engineering", completion: 82 },
      { dept: "Product", completion: 71 }, { dept: "Support", completion: 65 }, { dept: "Sales", completion: 58 },
    ],
    columns: ["Department", "Completion", "Headcount"],
    rows: [
      ["Design", "88%", "36"], ["Engineering", "82%", "214"], ["Data", "76%", "29"],
      ["Product", "71%", "48"], ["Support", "65%", "62"], ["Sales", "58%", "96"],
    ],
  },
  "training-completion": {
    chartType: "line", dataKey: "completion", xKey: "month", color: TOKENS.success,
    chart: [
      { month: "Feb", completion: 62 }, { month: "Mar", completion: 66 }, { month: "Apr", completion: 68 },
      { month: "May", completion: 71 }, { month: "Jun", completion: 74 }, { month: "Jul", completion: 78 },
    ],
    columns: ["Course", "Completion Rate", "Enrolled"],
    rows: [
      ["Applied Cloud Security", "84%", "142"], ["System Design Foundations", "77%", "98"],
      ["Leading Distributed Teams", "69%", "56"], ["GraphQL in Production", "88%", "40"],
    ],
  },
  "individual-skill": {
    chartType: "bar", dataKey: "level", xKey: "skill", color: TOKENS.secondary,
    chart: [
      { skill: "React/TS", level: 88 }, { skill: "System Design", level: 62 }, { skill: "Cloud", level: 45 },
      { skill: "GraphQL", level: 70 }, { skill: "Comms", level: 85 },
    ],
    columns: ["Skill", "Level", "Last Assessed"],
    rows: [
      ["React & TypeScript", "88", "2 weeks ago"], ["System Design", "62", "1 month ago"],
      ["Cloud (AWS)", "45", "3 months ago"], ["GraphQL", "70", "1 month ago"], ["Communication", "85", "2 weeks ago"],
    ],
  },
  "compliance-audit": {
    chartType: "bar", dataKey: "score", xKey: "dept", color: TOKENS.warning,
    chart: [
      { dept: "Engineering", score: 72 }, { dept: "Finance", score: 54 }, { dept: "Sales", score: 61 },
      { dept: "Data", score: 68 }, { dept: "Support", score: 75 },
    ],
    columns: ["Department", "Compliance Score", "Status"],
    rows: [
      ["Finance", "54%", "At Risk"], ["Sales", "61%", "At Risk"], ["Data", "68%", "Pass"],
      ["Engineering", "72%", "Pass"], ["Support", "75%", "Pass"],
    ],
  },
};

const INITIAL_HISTORY = [
  { name: "Knowledge Gap Summary — Q2 2026", type: "gap-summary", date: "Jul 24, 2026", by: "Priya Nair", format: "PDF", status: "Ready" },
  { name: "Department Comparison — Jul 2026", type: "dept-comparison", date: "Jul 15, 2026", by: "Priya Nair", format: "Excel", status: "Ready" },
  { name: "Training Completion — Q2 2026", type: "training-completion", date: "Jul 1, 2026", by: "Marcus Bell", format: "PDF", status: "Ready" },
  { name: "Compliance Audit — Pre-Q3 Review", type: "compliance-audit", date: "Jun 20, 2026", by: "Priya Nair", format: "Excel", status: "Ready" },
];

const SCHEDULED_REPORTS = [
  { name: "Weekly Gap Summary", frequency: "Weekly · Mondays", recipients: 4, enabled: true },
  { name: "Monthly Department Comparison", frequency: "Monthly · 1st", recipients: 8, enabled: true },
  { name: "Quarterly Compliance Audit", frequency: "Quarterly", recipients: 3, enabled: false },
];

/* ============================================================
   CONTEXT + SHARED PRIMITIVES
   ============================================================ */

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
function exportCSV(filename, columns, rows) {
  const body = [columns.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([body], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ============================================================
   SIGNATURE ELEMENT: Live document-style report preview
   Styled as an actual page (not a chart card) that reassembles
   itself as the template/filters change — makes "generating a
   report" feel like building a real document rather than
   filling out a form.
   ============================================================ */
function ReportPreview({ template, dept, range }) {
  const { c, dark } = useApp();
  const data = REPORT_DATA[template.key];
  const printRef = useRef(null);

  const printPreview = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "_blank", "width=800,height=900");
    win.document.write(`<html><head><title>${template.name}</title></head><body style="font-family:sans-serif;padding:32px;">${printContents}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <GlassCard hover={false} style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${c.border}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>Live Preview</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => exportCSV(`${template.key}.csv`, data.columns, data.rows)} style={{
            display: "flex", alignItems: "center", gap: 6, background: "transparent",
            border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px",
            color: c.text, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
          }}>
            <FileDown size={13} /> Export Excel/CSV
          </button>
          <button onClick={printPreview} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
            border: "none", borderRadius: 10, padding: "7px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer",
          }}>
            <Printer size={13} /> Export PDF
          </button>
        </div>
      </div>

      <div style={{ padding: 24, background: dark ? "#0B1220" : "#EEF2F9" }}>
        <div ref={printRef} className="kgi-fade-in" key={template.key + dept + range} style={{
          background: "#FFFFFF", color: "#0F172A", borderRadius: 4, padding: "28px 26px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)", maxWidth: 560, margin: "0 auto",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 7, background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={13} color="#fff" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#64748B" }}>Knowledge Gap Intelligence</span>
            </div>
            <span style={{ fontSize: 10.5, color: "#94A3B8" }}>Generated {new Date().toLocaleDateString()}</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "14px 0 2px" }}>{template.name}</h2>
          <p style={{ fontSize: 11.5, color: "#64748B", margin: "0 0 18px" }}>
            {dept} · {range}
          </p>

          <ResponsiveContainer width="100%" height={160}>
            {data.chartType === "line" ? (
              <LineChart data={data.chart} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey={data.xKey} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey={data.dataKey} stroke={data.color} strokeWidth={2.5} dot={{ r: 3, fill: data.color }} />
              </LineChart>
            ) : (
              <BarChart data={data.chart} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey={data.xKey} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} interval={0} angle={-12} textAnchor="end" height={38} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Bar dataKey={data.dataKey} fill={data.color} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 14, fontSize: 11.5 }}>
            <thead>
              <tr>
                {data.columns.map((col) => (
                  <th key={col} style={{ textAlign: "left", padding: "6px 4px", borderBottom: "2px solid #E2E8F0", color: "#475569", fontWeight: 700 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "6px 4px", borderBottom: "1px solid #F1F5F9", color: "#1E293B" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 9.5, color: "#94A3B8", marginTop: 16, textAlign: "center" }}>
            Page 1 of 1 · Confidential — internal use only
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   REPORTS PAGE
   ============================================================ */
function ReportsPage() {
  const { c, dark } = useApp();
  const [selected, setSelected] = useState(TEMPLATES[0]);
  const [dept, setDept] = useState("All Departments");
  const [range, setRange] = useState("This Quarter");
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [generating, setGenerating] = useState(false);
  const [schedules, setSchedules] = useState(SCHEDULED_REPORTS);

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer", outline: "none" };

  const generate = () => {
    setGenerating(true);
    const entry = { name: `${selected.name} — ${range}`, type: selected.key, date: "Just now", by: "You", format: "PDF", status: "Processing" };
    setHistory([entry, ...history]);
    setTimeout(() => {
      setHistory((prev) => prev.map((h, i) => (i === 0 ? { ...h, status: "Ready" } : h)));
      setGenerating(false);
    }, 1400);
  };

  const toggleSchedule = (i) => setSchedules((prev) => prev.map((s, idx) => (idx === i ? { ...s, enabled: !s.enabled } : s)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Reports</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Generate, preview, and export reports across gaps, training, and compliance.
        </p>
      </div>

      <GlassCard>
        <CardHeader title="Choose a Report Template" />
        <div className="kgi-template-grid">
          {TEMPLATES.map((t) => {
            const active = selected.key === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setSelected(t)}
                style={{
                  textAlign: "left", padding: 14, borderRadius: 14, cursor: "pointer",
                  border: active ? `1.5px solid ${t.color}` : `1px solid ${c.border}`,
                  background: active ? `${t.color}0F` : "transparent",
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${t.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <t.icon size={16} color={t.color} />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: c.text, marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: c.textMuted, lineHeight: 1.4 }}>{t.desc}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 18 }}>
          <select style={selectStyle} value={dept} onChange={(e) => setDept(e.target.value)}>
            <option>All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select style={selectStyle} value={range} onChange={(e) => setRange(e.target.value)}>
            <option>This Quarter</option><option>Last Quarter</option><option>Year to Date</option>
          </select>
          <button onClick={generate} disabled={generating} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
            border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12.5, fontWeight: 600,
            cursor: generating ? "default" : "pointer", opacity: generating ? 0.7 : 1,
          }}>
            {generating ? <Loader2 size={14} className="kgi-spin" /> : <FileText size={14} />}
            {generating ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </GlassCard>

      <ReportPreview template={selected} dept={dept} range={range} />

      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Report History" subtitle={`${history.length} generated`} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 4px", borderBottom: i < history.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{h.date} · {h.by} · {h.format}</div>
                </div>
                {h.status === "Processing" ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: TOKENS.warning, flexShrink: 0 }}>
                    <Loader2 size={12} className="kgi-spin" /> Processing
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      const data = REPORT_DATA[h.type];
                      if (data) exportCSV(`${h.type}.csv`, data.columns, data.rows);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 5, background: "transparent",
                      border: `1px solid ${c.border}`, borderRadius: 9, padding: "6px 10px",
                      color: c.text, fontSize: 11, fontWeight: 600, cursor: "pointer", flexShrink: 0,
                    }}
                  >
                    <FileDown size={12} /> Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <CardHeader title="Scheduled Reports" subtitle="Recurring deliveries by email" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {schedules.map((s, i) => (
              <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 4px", borderBottom: i < schedules.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={11} /> {s.frequency}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Mail size={11} /> {s.recipients} recipients</span>
                  </div>
                </div>
                <Toggle checked={s.enabled} onChange={() => toggleSchedule(i)} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Reports() {
  return (
    <Layout>
      <ReportsPage />
    </Layout>
  );
}