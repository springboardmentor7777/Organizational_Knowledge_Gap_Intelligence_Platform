import React, { useState, useMemo } from "react";
import { useApp, TOKENS } from "../context/AppContext";

import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";

import { TrendingUp, Sparkles, AlertTriangle, Download, Filter, Flame, ArrowRight, Zap, ShieldAlert, } from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, } from "recharts";
/* ============================================================
   MOCK DATA — gap matrix
   ============================================================ */
const DEPARTMENTS = ["Engineering", "Product", "Design", "Sales", "Support", "Data", "Marketing", "Finance"];
const SKILL_CATEGORIES = ["Cloud", "Security", "Leadership", "Data Analysis", "Communication", "Agile", "Compliance"];

// gap severity 0 (no gap) -> 100 (severe gap)
const GAP_MATRIX = {
  Engineering: [22, 58, 35, 28, 20, 15, 40],
  Product: [30, 42, 25, 33, 18, 20, 45],
  Design: [45, 20, 30, 55, 15, 25, 38],
  Sales: [60, 35, 22, 48, 12, 30, 50],
  Support: [50, 40, 45, 38, 22, 35, 42],
  Data: [18, 48, 40, 12, 28, 22, 55],
  Marketing: [55, 30, 28, 42, 20, 40, 48],
  Finance: [65, 25, 50, 30, 25, 45, 20],
};

const DEPT_COMPARISON = DEPARTMENTS.map((d) => {
  const row = GAP_MATRIX[d];
  const avgGap = row.reduce((a, b) => a + b, 0) / row.length;
  const current = Math.round(100 - avgGap);
  const required = 88;
  return { dept: d, current, required };
});

const GAP_CARDS = [
  { skill: "Cloud Security", dept: "Finance", priority: "Critical", current: 35, required: 90, people: 22 },
  { skill: "Cloud Architecture", dept: "Sales", priority: "Critical", current: 40, required: 85, people: 14 },
  { skill: "Data Analysis", dept: "Design", priority: "High", current: 45, required: 78, people: 9 },
  { skill: "Compliance", dept: "Data", priority: "High", current: 45, required: 82, people: 11 },
  { skill: "Leadership", dept: "Finance", priority: "High", current: 50, required: 80, people: 7 },
  { skill: "Cloud Fundamentals", dept: "Marketing", priority: "Medium", current: 45, required: 70, people: 18 },
  { skill: "Agile Practices", dept: "Marketing", priority: "Medium", current: 60, required: 78, people: 12 },
  { skill: "Communication", dept: "Design", priority: "Low", current: 85, required: 90, people: 4 },
];

const PRIORITY_META = {
  Critical: { color: TOKENS.danger, bg: "rgba(239,68,68,0.12)" },
  High: { color: TOKENS.warning, bg: "rgba(245,158,11,0.12)" },
  Medium: { color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  Low: { color: TOKENS.success, bg: "rgba(16,185,129,0.12)" },
};
const PRIORITY_ORDER = ["Critical", "High", "Medium", "Low"];

const AI_INSIGHTS = [
  { icon: Flame, color: TOKENS.danger, text: "Cloud Security gap in Finance widened 9 points this quarter — the fastest-growing gap org-wide.", confidence: 94 },
  { icon: TrendingUp, color: TOKENS.success, text: "Design's Communication gap closed by 14 points after the Q2 workshop series — trend worth repeating.", confidence: 88 },
  { icon: ShieldAlert, color: TOKENS.warning, text: "6 departments now show Compliance readiness below 70%, ahead of the November audit window.", confidence: 91 },
  { icon: Zap, color: TOKENS.primary, text: "Cross-training Sales with Support's Cloud curriculum could close 2 gaps at once — shared skill overlap detected.", confidence: 82 },
];

const RECOMMENDATIONS = [
  { course: "Applied Cloud Security", targets: "Finance · Sales", difficulty: "Intermediate", hours: 6, impact: "Closes 60% of Critical gaps" },
  { course: "Leading Through Change", targets: "Finance", difficulty: "Beginner", hours: 4, impact: "Addresses Leadership gap" },
  { course: "Data Storytelling for Non-Analysts", targets: "Design · Marketing", difficulty: "Beginner", hours: 3, impact: "Improves Data Analysis scores" },
];

/* ============================================================
   SIGNATURE ELEMENT: interactive gap heatmap
   A custom SVG/div grid (not a generic chart-lib default) with
   a diverging green→amber→red scale, hover detail, and a
   staggered reveal — this IS the page's job made visible.
   ============================================================ */
function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
function mixColor(hexA, hexB, t) {
  const a = hexA.match(/\w\w/g).map((x) => parseInt(x, 16));
  const b = hexB.match(/\w\w/g).map((x) => parseInt(x, 16));
  const r = lerp(a[0], b[0], t), g = lerp(a[1], b[1], t), bl = lerp(a[2], b[2], t);
  return `rgb(${r},${g},${bl})`;
}
function gapColor(value) {
  // 0 = healthy (green) -> 50 = amber -> 100 = severe (red)
  if (value <= 50) return mixColor("10B981", "F59E0B", value / 50);
  return mixColor("F59E0B", "EF4444", (value - 50) / 50);
}

function Heatmap({ onSelect, selected }) {
  const { c, dark } = useApp();
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `120px repeat(${SKILL_CATEGORIES.length}, 1fr)`, gap: 4, minWidth: 640 }}>
        <div />
        {SKILL_CATEGORIES.map((s) => (
          <div key={s} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textAlign: "center", padding: "0 2px 6px", writingMode: "horizontal-tb" }}>
            {s}
          </div>
        ))}
        {DEPARTMENTS.map((d, rowIdx) => (
          <React.Fragment key={d}>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", paddingRight: 8 }}>
              {d}
            </div>
            {GAP_MATRIX[d].map((val, colIdx) => {
              const isSelected = selected && selected.dept === d && selected.skill === SKILL_CATEGORIES[colIdx];
              return (
                <button
                  key={colIdx}
                  onClick={() => onSelect({ dept: d, skill: SKILL_CATEGORIES[colIdx], value: val })}
                  className="kgi-heat-cell"
                  style={{
                    height: 40, borderRadius: 8, border: isSelected ? `2px solid ${c.text}` : "1px solid rgba(255,255,255,0.15)",
                    background: gapColor(val), color: val > 55 ? "#fff" : "#1a1a1a",
                    fontSize: 11.5, fontWeight: 700, cursor: "pointer",
                    animationDelay: `${(rowIdx * SKILL_CATEGORIES.length + colIdx) * 12}ms`,
                  }}
                >
                  {val}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <span style={{ fontSize: 11, color: c.textMuted }}>Healthy</span>
        <div style={{ flex: 1, maxWidth: 220, height: 8, borderRadius: 99, background: "linear-gradient(90deg, #10B981, #F59E0B, #EF4444)" }} />
        <span style={{ fontSize: 11, color: c.textMuted }}>Severe gap</span>
      </div>
    </div>
  );
}

/* ============================================================
   GAP CARD
   ============================================================ */
function GapCard({ item }) {
  const { c } = useApp();
  const meta = PRIORITY_META[item.priority];
  const pct = Math.round((item.current / item.required) * 100);
  return (
    <GlassCard className="kgi-fade-in" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: c.text }}>{item.skill}</div>
          <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>{item.dept} · {item.people} people affected</div>
        </div>
        <span style={{
          fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99,
          color: meta.color, background: meta.bg, whiteSpace: "nowrap",
        }}>
          {item.priority}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted, marginBottom: 5 }}>
        <span>Current: <strong style={{ color: c.text }}>{item.current}</strong></span>
        <span>Required: <strong style={{ color: c.text }}>{item.required}</strong></span>
      </div>
      <div style={{ height: 7, borderRadius: 99, background: c.border, overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, width: "100%", background: `${meta.color}33`,
        }} />
        <div className="kgi-bar-grow" style={{
          height: "100%", width: `${pct}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${meta.color}, ${meta.color}CC)`,
        }} />
      </div>
    </GlassCard>
  );
}

/* ============================================================
   GAP ANALYSIS PAGE
   ============================================================ */
function GapAnalysis() {
  const { c, dark } = useApp();
  const [dept, setDept] = useState("All Departments");
  const [priority, setPriority] = useState("All Priorities");
  const [range, setRange] = useState("This Quarter");
  const [selectedCell, setSelectedCell] = useState({ dept: "Finance", skill: "Cloud", value: 65 });

  const filteredCards = useMemo(() => {
    let list = [...GAP_CARDS];
    if (dept !== "All Departments") list = list.filter((g) => g.dept === dept);
    if (priority !== "All Priorities") list = list.filter((g) => g.priority === priority);
    return list.sort((a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority));
  }, [dept, priority]);

  const counts = useMemo(() => {
    const c0 = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    GAP_CARDS.forEach((g) => c0[g.priority]++);
    return c0;
  }, []);

  const selectStyle = {
    fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid,
    border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer",
    outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Knowledge Gap Analysis</h1>
          <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
            Where required competencies outpace current skill levels, by department and category.
          </p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 7, background: "transparent",
          border: `1px solid ${c.border}`, borderRadius: 10, padding: "9px 14px",
          color: c.text, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
        }}>
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: c.textMuted, fontWeight: 600 }}>
          <Filter size={13} /> Filters:
        </span>
        <select style={selectStyle} value={dept} onChange={(e) => setDept(e.target.value)}>
          <option>All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select style={selectStyle} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>All Priorities</option>
          {PRIORITY_ORDER.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select style={selectStyle} value={range} onChange={(e) => setRange(e.target.value)}>
          <option>This Quarter</option>
          <option>Last Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Priority overview strip */}
      <div className="kgi-priority-grid">
        {PRIORITY_ORDER.map((p, i) => {
          const meta = PRIORITY_META[p];
          return (
            <GlassCard key={p} className="kgi-fade-in" style={{ animationDelay: `${i * 60}ms`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center", background: meta.bg,
              }}>
                <AlertTriangle size={19} color={meta.color} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c.text, lineHeight: 1 }}>{counts[p]}</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, fontWeight: 600 }}>{p} priority</div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Heatmap + detail panel */}
      <div className="kgi-heat-grid">
        <GlassCard style={{ gridColumn: "span 2" }}>
          <CardHeader title="Department × Skill Gap Heatmap" subtitle="Click a cell for detail — darker red means a wider gap" />
          <Heatmap onSelect={setSelectedCell} selected={selectedCell} />
        </GlassCard>

        <GlassCard style={{
          background: dark
            ? "linear-gradient(160deg, rgba(37,99,235,0.14), rgba(124,58,237,0.10))"
            : "linear-gradient(160deg, rgba(37,99,235,0.06), rgba(124,58,237,0.05))",
        }}>
          <CardHeader title="Cell Detail" />
          {selectedCell ? (
            <div className="kgi-fade-in" key={`${selectedCell.dept}-${selectedCell.skill}`}>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{selectedCell.skill}</div>
              <div style={{ fontSize: 12.5, color: c.textMuted, marginBottom: 14 }}>{selectedCell.dept}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 700, color: gapColor(selectedCell.value) }}>{selectedCell.value}</span>
                <span style={{ fontSize: 12, color: c.textMuted }}>/ 100 gap severity</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: c.border, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ height: "100%", width: `${selectedCell.value}%`, background: gapColor(selectedCell.value), borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: 12.5, color: c.text, lineHeight: 1.5, margin: 0 }}>
                {selectedCell.value >= 55
                  ? `This is one of the widest gaps in ${selectedCell.dept}. Consider prioritizing a targeted learning path here first.`
                  : `${selectedCell.dept} is tracking reasonably well on ${selectedCell.skill} — keep monitoring, no urgent action needed.`}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: 12.5, color: c.textMuted }}>Select a cell to see detail.</p>
          )}
        </GlassCard>
      </div>

      {/* Department comparison chart */}
      <GlassCard>
        <CardHeader title="Department Comparison" subtitle="Current skill level vs. required level, averaged per department" />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={DEPT_COMPARISON} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
            <XAxis dataKey="dept" tick={{ fontSize: 10.5, fill: c.textMuted }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="current" name="Current level" fill={TOKENS.primary} radius={[6, 6, 0, 0]} />
            <Bar dataKey="required" name="Required level" fill={dark ? "#3f4f6b" : "#CBD5E1"} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* AI Insights */}
      <GlassCard>
        <CardHeader title="AI Insights" subtitle="Patterns detected automatically across the gap matrix" right={
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: TOKENS.secondary }}>
            <Sparkles size={13} /> AI-generated
          </span>
        } />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          {AI_INSIGHTS.map((ins, i) => (
            <div key={i} className="kgi-fade-in" style={{
              display: "flex", gap: 10, padding: 14, borderRadius: 14,
              background: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)",
              animationDelay: `${i * 70}ms`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center", background: `${ins.color}1A`,
              }}>
                <ins.icon size={16} color={ins.color} />
              </div>
              <div>
                <p style={{ fontSize: 12.5, color: c.text, lineHeight: 1.45, margin: 0 }}>{ins.text}</p>
                <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 6, fontWeight: 600 }}>{ins.confidence}% confidence</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Recommendations */}
      <GlassCard>
        <CardHeader title="Recommended Actions" subtitle="Targeted training that closes the most impactful gaps first" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {RECOMMENDATIONS.map((r, i) => (
            <div key={r.course} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
              padding: "14px 4px", borderBottom: i < RECOMMENDATIONS.length - 1 ? `1px solid ${c.border}` : "none",
            }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: c.text }}>{r.course}</div>
                <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>
                  {r.targets} · {r.difficulty} · {r.hours}h · <span style={{ color: TOKENS.success, fontWeight: 600 }}>{r.impact}</span>
                </div>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
                color: "#fff", border: "none", borderRadius: 10, padding: "8px 13px",
                fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0,
              }}>
                Assign <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Gap cards grid */}
      <div>
        <CardHeader title={`All Gaps (${filteredCards.length})`} subtitle="Sorted by priority" />
        <div className="kgi-cards-grid">
          {filteredCards.map((item) => <GapCard key={item.skill + item.dept} item={item} />)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function GapAnalysisPage() {
  return (
    <Layout>
      <GapAnalysis />
    </Layout>
  );
}
