import React, { useState, useEffect } from "react";
import { Sparkles, Share2, GraduationCap, Clock, ArrowUpRight, AlertTriangle, CheckCircle2, Briefcase,  Users,} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, CartesianGrid,
  AreaChart, Area} from "recharts";
import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";

/* ============================================================
   MOCK DATA
   ============================================================ */

const TRAINING_STATUS = [];

const ACTIVITY = [];

const UPCOMING = [];

/* ============================================================
   SMALL HOOK: animated count-up (no external animation lib
   available in this sandbox, so a lightweight rAF counter
   substitutes for the Framer Motion transitions the brief asks
   for elsewhere).
   ============================================================ */
function useCountUp(target, duration = 900, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return val;
}


/* ============================================================
   SIGNATURE ELEMENT: Knowledge Gap Score radial gauge
   ============================================================ */
function GapScoreGauge({ score = 77 }) {
  const { c, dark } = useApp();
  const animated = useCountUp(score, 1200);
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - animated / 100);

  return (
    <GlassCard
      hover={false}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: dark
          ? "linear-gradient(160deg, rgba(37,99,235,0.16), rgba(124,58,237,0.14))"
          : "linear-gradient(160deg, rgba(37,99,235,0.08), rgba(124,58,237,0.06))",
        boxShadow: c.shadowLg,
      }}
      className="kgi-fade-in"
    >
      <div style={{ position: "relative", width: 176, height: 176 }}>
        <svg width="176" height="176" viewBox="0 0 176 176">
          <defs>
            <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={TOKENS.primary} />
              <stop offset="100%" stopColor={TOKENS.secondary} />
            </linearGradient>
          </defs>
          <circle cx="88" cy="88" r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)"} strokeWidth="14" />
          <circle
            cx="88" cy="88" r={r} fill="none"
            stroke="url(#gapGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 88 88)"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: c.text, letterSpacing: -1, fontFamily: FONT_STACK }}>
            {Math.round(animated)}
          </span>
          <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, letterSpacing: 0.5 }}>READINESS</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, color: c.text, fontSize: 15 }}>Org Knowledge Gap Score</div>
        <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 2, maxWidth: 220 }}>
          Weighted across required vs. current competency levels org-wide
        </div>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({ item, index }) {
  const { c } = useApp();
  const animated = useCountUp(item.value, 900 + index * 120);
  const isUp = item.delta.startsWith("+");
  const colorMap = { primary: TOKENS.primary, secondary: TOKENS.secondary, success: TOKENS.success, warning: TOKENS.warning };
  const tint = colorMap[item.color];
  return (
    <GlassCard
      className="kgi-fade-in"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12.5, color: c.textMuted, fontWeight: 600 }}>{item.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: c.text, marginTop: 6, letterSpacing: -0.5 }}>
            {Math.round(animated)}
            {item.suffix || ""}
          </div>
        </div>
        <div
          style={{
            width: 42, height: 42, borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `${tint}1A`,
          }}
        >
          <item.icon size={20} color={tint} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12 }}>
        <ArrowUpRight
          size={14}
          color={isUp ? TOKENS.success : TOKENS.danger}
          style={{ transform: isUp ? "none" : "rotate(90deg)" }}
        />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: isUp ? TOKENS.success : TOKENS.danger }}>{item.delta}</span>
        <span style={{ fontSize: 12, color: c.textMuted }}>vs last quarter</span>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   SKELETON LOADER
   ============================================================ */
function Skeleton({ h = 16, w = "100%", radius = 8, style }) {
  const { dark } = useApp();
  return (
    <div
      className="kgi-skeleton"
      style={{
        height: h, width: w, borderRadius: radius,
        background: dark
          ? "linear-gradient(90deg,#1E293B 25%,#28374d 37%,#1E293B 63%)"
          : "linear-gradient(90deg,#E2E8F0 25%,#EDF1F7 37%,#E2E8F0 63%)",
        backgroundSize: "400% 100%",
        ...style,
      }}
    />
  );
}


/* ============================================================
   DASHBOARD CONTENT
   ============================================================ */
function Dashboard() {
  const { c, dark,user } = useApp();
  const [loading, setLoading] = useState(true);

  const [skills, setSkills] = useState([]);
const [dashboardError, setDashboardError] = useState("");

useEffect(() => {
  const fetchDashboardData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setDashboardError("");

      const response = await fetch(
        `http://localhost:8080/api/employee-skills/employee/email/${encodeURIComponent(user.email)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();

      const formattedSkills = data.map((item) => ({
  name: item.skill.skillName,
  category:
    item.skill.category === "Soft Skills"
      ? "Communication"
      : item.skill.category,
  proficiency: item.proficiencyLevel * 20,
  level: item.skill.level,
  priority: item.skill.priority,
  status: item.status,
}));

      setSkills(formattedSkills);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      setDashboardError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, [user?.email]);

const averageSkill =
  skills.length > 0
    ? Math.round(
        skills.reduce((sum, skill) => sum + skill.proficiency, 0) /
          skills.length
      )
    : 0;

const knowledgeGap = 100 - averageSkill;

const STAT_CARDS = [
  {
    label: "Employees Tracked",
    value: skills.length > 0 ? 1 : 0,
    delta: "0%",
    icon: Users,
    color: "primary",
  },
  {
    label: "Skill Completion",
    value: averageSkill,
    suffix: "%",
    delta: "0%",
    icon: CheckCircle2,
    color: "success",
  },
  {
    label: "Avg. Knowledge Gap",
    value: knowledgeGap,
    suffix: "%",
    delta: "0%",
    icon: AlertTriangle,
    color: "warning",
  },
  {
    label: "Training Progress",
    value: 0,
    suffix: "%",
    delta: "0%",
    icon: GraduationCap,
    color: "secondary",
  },
];

const departmentAverage = averageSkill;

const DEPT_SKILL_DATA =
  skills.length > 0
    ? [
        {
          dept: user?.department || "General",
          completion: departmentAverage,
        },
      ]
    : [];

    const COMPETENCY_RADAR = skills.map((skill) => {
  const requiredLevels = {
    Beginner: 40,
    Intermediate: 60,
    Advanced: 80,
    Expert: 100,
  };

  const required = requiredLevels[skill.level] || 60;

  return {
    skill: skill.name,
    required,
    current: skill.proficiency,
  };
});

const biggestGap = skills.reduce((largest, skill) => {
  const requiredLevels = {
    Beginner: 40,
    Intermediate: 60,
    Advanced: 80,
    Expert: 100,
  };

  const required = requiredLevels[skill.level] || 60;
  const current = skill.proficiency;
  const gap = required - current;

  if (!largest || gap > largest.gap) {
    return {
      name: skill.name,
      required,
      current,
      gap,
    };
  }

  return largest;
}, null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const axisColor = c.textMuted;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome */}
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>
  Good Evening, {user?.name || "User"} 👋
</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Here's how skill readiness is trending across your organization today.
        </p>
      </div>
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <GlassCard key={i} hover={false}><Skeleton h={70} /></GlassCard>
          ))}
        </div>
      ) : (
        <>
          {/* Top row: stat cards + gauge */}
          <div className="kgi-top-grid">
            <div className="kgi-stat-grid">
              {STAT_CARDS.map((item, i) => (
                <StatCard key={item.label} item={item} index={i} />
              ))}
            </div>
            <GapScoreGauge score={averageSkill} />
          </div>

          {/* Charts row */}
          <div className="kgi-chart-grid">
            <GlassCard
  style={{
    maxWidth: "650px",
    width: "100%",
    margin: "0 auto",
  }}
>
              <CardHeader title="Skill Completion by Department" subtitle="% of required competencies met" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={DEPT_SKILL_DATA} margin={{ left: -20 } }>
                  <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
                  <XAxis dataKey="dept" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }}
                  />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={TOKENS.primary} />
                      <stop offset="100%" stopColor={TOKENS.secondary} />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="completion" radius={[8, 8, 0, 0]} fill="url(#barGrad)" />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard>
  <CardHeader title="Training Status" subtitle="No training data" />

  <div
    style={{
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: c.textMuted,
      fontSize: 13,
    }}
  >
    No training data available
  </div>
</GlassCard>
          </div>

          <div className="kgi-chart-grid">
            <GlassCard>
              <CardHeader title="Competency Radar" subtitle="Required vs. current level" />
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={COMPETENCY_RADAR}>
                  <PolarGrid stroke={dark ? "#1E293B" : "#E2E8F0"} />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10.5, fill: axisColor }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar name="Required" dataKey="required" stroke={TOKENS.secondary} fill={TOKENS.secondary} fillOpacity={0.12} />
                  <Radar name="Current" dataKey="current" stroke={TOKENS.primary} fill={TOKENS.primary} fillOpacity={0.28} />
                  <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard
  style={{
    background: dark
      ? "linear-gradient(160deg, rgba(124,58,237,0.16), rgba(37,99,235,0.10))"
      : "linear-gradient(160deg, rgba(124,58,237,0.07), rgba(37,99,235,0.05))",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    }}
  >
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
      }}
    >
      <Sparkles size={15} color="#fff" />
    </div>

    <span
      style={{
        fontWeight: 700,
        fontSize: 14,
        color: c.text,
      }}
    >
      AI Recommendation
    </span>
  </div>

  <p
    style={{
      fontSize: 13,
      color: c.text,
      lineHeight: 1.5,
      margin: "0 0 12px",
    }}
  >
    {biggestGap ? (
      biggestGap.gap > 0 ? (
        <>
          <strong>{biggestGap.name}</strong> shows the widest
          competency gap at{" "}
          <strong>
            {biggestGap.current}% current vs. {biggestGap.required}% required
          </strong>
          . Consider targeted training to improve this skill by{" "}
          <strong>{biggestGap.gap} percentage points</strong>.
        </>
      ) : (
        <>
          Your tracked skills currently meet or exceed their
          defined competency levels. Keep building consistency
          through continued assessment and learning.
        </>
      )
    ) : (
      "No skill data is available yet. Add skills to generate personalized recommendations."
    )}
  </p>

  <button
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "9px 14px",
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    View Full Analysis <ArrowUpRight size={14} />
  </button>
</GlassCard>
          </div>

          {/* Bottom row: activity + upcoming */}
          <div className="kgi-chart-grid">
            <GlassCard>
              <CardHeader title="Recent Activity" subtitle="Live feed" />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {ACTIVITY.map((a, i) => {
                  const colorMap = { success: TOKENS.success, warning: TOKENS.warning, primary: TOKENS.primary, secondary: TOKENS.secondary };
                  return (
                    <div key={i} style={{ display: "flex", gap: 12, padding: "10px 4px", borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${c.border}` : "none" }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${colorMap[a.color]}1A`,
                      }}>
                        <a.icon size={15} color={colorMap[a.color]} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: c.text }}>
                          <strong>{a.who}</strong> {a.what}
                        </div>
                        <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={11} /> {a.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            
              <GlassCard>
  <CardHeader title="Upcoming Training" subtitle="No training data" />

  <div
    style={{
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: c.textMuted,
      fontSize: 13,
    }}
  >
    No upcoming training available
  </div>
</GlassCard>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function DashboardPage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
