import React, { useState, useMemo, createContext, useContext, useEffect } from "react";
import { LayoutDashboard, Users, Target, Sparkles, Share2, GraduationCap, ClipboardCheck, Bell, BarChart3, FileText, Settings, Search, Moon, Sun, ChevronLeft, ChevronRight, Menu, X, ChevronDown, Award, Clock, Briefcase, Home, TrendingUp, Flame, Medal, CheckCircle2,Play, ChevronUp, ExternalLink, Building2, BookOpen, Download, Lock, Trophy, Zap, Shield, BookOpenCheck, Rocket, Star, } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from "recharts";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS } from "../context/AppContext";

/* ============================================================
   MOCK DATA
   ============================================================ */
// deterministic pseudo-activity for a 14-week x 7-day streak grid
function activityLevel(week, day) {
  const v = (week * 5 + day * 11) % 9;
  if (v === 0) return 0;
  if (v < 3) return 1;
  if (v < 6) return 2;
  if (v < 8) return 3;
  return 4;
}
const WEEKS = 14;
const DAY_LABELS = ["Mon", "Wed", "Fri"];
const LEVEL_COLOR = (dark) => ({
  0: dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
  1: "rgba(37,99,235,0.28)",
  2: "rgba(37,99,235,0.5)",
  3: "rgba(37,99,235,0.75)",
  4: TOKENS.primary,
});

function computeStreak() {
  let streak = 0;
  outer:
  for (let w = WEEKS - 1; w >= 0; w--) {
    for (let d = 6; d >= 0; d--) {
      if (activityLevel(w, d) > 0) streak++;
      else break outer;
    }
  }
  return streak;
}

const STATS = [
  { label: "Courses Completed", value: 17, icon: BookOpenCheck, color: "primary" },
  { label: "Hours Learned", value: 96, icon: Clock, color: "secondary" },
  { label: "Current Streak", value: computeStreak(), suffix: " days", icon: Flame, color: "warning" },
  { label: "Badges Earned", value: 6, icon: Medal, color: "success" },
];

const MONTHLY_HOURS = [
  { month: "Feb", hours: 6 }, { month: "Mar", hours: 9 }, { month: "Apr", hours: 5 },
  { month: "May", hours: 12 }, { month: "Jun", hours: 14 }, { month: "Jul", hours: 18 },
];

const TIMELINE = [
  { title: "Completed \u201cApplied Cloud Security\u201d", date: "Jul 24, 2026", type: "course" },
  { title: "Earned \u201cSecurity Sprinter\u201d badge", date: "Jul 24, 2026", type: "badge" },
  { title: "Completed \u201cGraphQL in Production\u201d", date: "Jul 10, 2026", type: "course" },
  { title: "Reached 90-day learning streak", date: "Jun 29, 2026", type: "milestone" },
  { title: "Completed \u201cSystem Design Foundations\u201d", date: "Jun 2, 2026", type: "course" },
];
const TIMELINE_META = {
  course: { icon: BookOpenCheck, color: TOKENS.primary },
  badge: { icon: Medal, color: TOKENS.warning },
  milestone: { icon: Rocket, color: TOKENS.secondary },
};

const BADGES = [
  { name: "Fast Starter", icon: Zap, earned: true, desc: "Completed your first course within a week of joining." },
  { name: "Security Sprinter", icon: Shield, earned: true, desc: "Completed 3 security courses in a single quarter." },
  { name: "Streak Keeper", icon: Flame, earned: true, desc: "Maintained a 30-day learning streak." },
  { name: "Mentor's Pick", icon: Star, earned: true, desc: "Recommended a resource that a mentor endorsed." },
  { name: "Certified", icon: Trophy, earned: true, desc: "Earned your first professional certification." },
  { name: "Team Player", icon: Users, earned: true, desc: "Completed a course alongside 3+ teammates." },
  { name: "Architect", icon: Award, earned: false, desc: "Complete the full Cloud Architecture learning path." },
  { name: "Century Club", icon: Medal, earned: false, desc: "Reach 100 total hours of completed training." },
];

const COMPLETED_COURSES = [
  { title: "Applied Cloud Security", date: "Jul 24, 2026", score: 94, hours: 6 },
  { title: "GraphQL in Production", date: "Jul 10, 2026", score: 88, hours: 5 },
  { title: "System Design Foundations", date: "Jun 2, 2026", score: 91, hours: 8 },
  { title: "Accessibility Standards 101", date: "May 14, 2026", score: 97, hours: 3 },
  { title: "Stakeholder Communication", date: "Apr 20, 2026", score: 85, hours: 4 },
];

const GOALS = [
  { title: "Complete AWS Certified Developer path", target: "Sep 30, 2026", progress: 45, status: "On Track" },
  { title: "Finish Advanced Threat Modeling", target: "Aug 15, 2026", progress: 15, status: "At Risk" },
  { title: "Reach 120 total learning hours", target: "Dec 31, 2026", progress: 80, status: "On Track" },
];
const GOAL_STATUS_COLOR = { "On Track": TOKENS.success, "At Risk": TOKENS.warning, Achieved: TOKENS.primary };

/* ============================================================
   CONTEXT + SHARED PRIMITIVES
   ============================================================ */

function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}



/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({ item, index }) {
  const { c } = useApp();
  const animated = useCountUp(item.value, 900 + index * 100);
  const colorMap = { primary: TOKENS.primary, secondary: TOKENS.secondary, success: TOKENS.success, warning: TOKENS.warning };
  const tint = colorMap[item.color];
  return (
    <GlassCard className="kgi-fade-in" style={{ animationDelay: `${index * 60}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 600 }}>{item.label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.text, marginTop: 6 }}>
            {Math.round(animated)}{item.suffix || ""}
          </div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${tint}1A` }}>
          <item.icon size={19} color={tint} />
        </div>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   SIGNATURE ELEMENT: Learning Streak Grid
   A contribution-graph style activity grid — reinforces the
   habit-building angle of "progress" in a way a plain line
   chart can't, and is visually distinct from every gauge/graph
   used in the other modules.
   ============================================================ */
function StreakGrid() {
  const { c, dark } = useApp();
  const colors = LEVEL_COLOR(dark);
  return (
    <div>
      <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 4 }}>
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {Array.from({ length: 7 }).map((_, d) => {
              const level = activityLevel(w, d);
              return (
                <div
                  key={d}
                  title={`${level} sessions`}
                  className="kgi-streak-cell"
                  style={{
                    width: 13, height: 13, borderRadius: 3, background: colors[level],
                    animationDelay: `${(w * 7 + d) * 6}ms`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <span style={{ fontSize: 11, color: c.textMuted }}>14 weeks ago</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10.5, color: c.textMuted }}>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} style={{ width: 10, height: 10, borderRadius: 3, background: colors[l] }} />
          ))}
          <span style={{ fontSize: 10.5, color: c.textMuted }}>More</span>
        </div>
        <span style={{ fontSize: 11, color: c.textMuted }}>Today</span>
      </div>
    </div>
  );
}

/* ============================================================
   BADGE
   ============================================================ */
function BadgeTile({ badge, index }) {
  const { c, dark } = useApp();
  return (
    <div className="kgi-fade-in" style={{
      animationDelay: `${index * 40}ms`, textAlign: "center", padding: "16px 10px",
      borderRadius: 16, border: `1px solid ${c.border}`,
      background: badge.earned ? (dark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.05)") : "transparent",
      opacity: badge.earned ? 1 : 0.55,
    }}
      title={badge.desc}
    >
      <div style={{
        width: 46, height: 46, borderRadius: "50%", margin: "0 auto 8px", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: badge.earned ? `linear-gradient(135deg, ${TOKENS.warning}, ${TOKENS.secondary})` : (dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"),
      }}>
        {badge.earned ? <badge.icon size={21} color="#fff" /> : <Lock size={18} color={c.textMuted} />}
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: c.text, lineHeight: 1.25 }}>{badge.name}</div>
    </div>
  );
}
/* ============================================================
   MOCK DATA
   ============================================================ */
const LEARNING_PATH = [
  { title: "Cloud Security Fundamentals", status: "completed", eta: "Completed" },
  { title: "Applied Cloud Security", status: "current", eta: "3 of 6h done" },
  { title: "AWS Certified Developer Prep", status: "upcoming", eta: "Starts next" },
  { title: "Advanced Threat Modeling", status: "upcoming", eta: "Week 5" },
  { title: "Cloud Architecture Capstone", status: "locked", eta: "Unlocks after step 4" },
];

const DIFFICULTY_COLOR = { Beginner: TOKENS.success, Intermediate: TOKENS.warning, Advanced: TOKENS.danger };

const COURSES = [
  {
    title: "Applied Cloud Security", provider: "Internal Academy", type: "Internal",
    difficulty: "Intermediate", hours: 6, match: 96, progress: 50,
    tag: "Closes Critical Gap", reason: "Your Cloud Security score is 35 vs. a required 90 — the widest gap on your profile. This course targets exactly that delta.",
  },
  {
    title: "AWS Certified Developer – Associate Prep", provider: "Coursera", type: "External",
    difficulty: "Advanced", hours: 18, match: 89, progress: 0,
    tag: "Certification path", reason: "Builds directly on Applied Cloud Security and leads to an industry-recognized certification your role requires within 2 quarters.",
  },
  {
    title: "System Design Foundations", provider: "Internal Academy", type: "Internal",
    difficulty: "Intermediate", hours: 8, match: 81, progress: 100,
    tag: "Completed", reason: "Matched to your System Design gap (62 vs. 85 required) — you've already completed this one.",
  },
  {
    title: "Leading Distributed Teams", provider: "LinkedIn Learning", type: "External",
    difficulty: "Beginner", hours: 4, match: 74, progress: 0,
    tag: "Leadership track", reason: "You're being considered for a tech-lead track; this closes part of the Leadership gap flagged in your last review.",
  },
  {
    title: "Advanced Threat Modeling", provider: "Udemy", type: "External",
    difficulty: "Advanced", hours: 10, match: 88, progress: 0,
    tag: "Closes Critical Gap", reason: "A natural follow-on to Cloud Security fundamentals; addresses the Security category which is your lowest-scoring area org-wide.",
  },
  {
    title: "GraphQL in Production", provider: "Internal Academy", type: "Internal",
    difficulty: "Intermediate", hours: 5, match: 68, progress: 0,
    tag: "Skill refresh", reason: "Your GraphQL score (70) is solid but slightly below the Senior Engineer benchmark of 80.",
  },
];

const PLATFORMS = [
  { name: "Internal Academy", type: "Internal", courses: 42, color: TOKENS.primary },
  { name: "Coursera", type: "External", courses: 1200, color: "#0056D3" },
  { name: "LinkedIn Learning", type: "External", courses: 890, color: "#0A66C2" },
  { name: "Udemy", type: "External", courses: 3400, color: "#A435F0" },
];

/* ============================================================
   SIGNATURE ELEMENT: Learning Path Roadmap
   A connected node-path (journey/roadmap motif) rather than a
   generic stepper — completed/current/upcoming/locked states
   with a fill line that visually "travels" along the path.
   Distinct from prior modules' gauge/graph/heatmap/rings/console.
   ============================================================ */
function LearningPathRoadmap() {
  const { c, dark } = useApp();
  const completedCount = LEARNING_PATH.filter((s) => s.status === "completed").length;
  const currentIdx = LEARNING_PATH.findIndex((s) => s.status === "current");
  const fillPct = ((completedCount + 0.5) / LEARNING_PATH.length) * 100;

  const statusStyle = (status) => {
    if (status === "completed") return { bg: TOKENS.success, icon: CheckCircle2, ring: TOKENS.success };
    if (status === "current") return { bg: TOKENS.primary, icon: Play, ring: TOKENS.primary };
    if (status === "locked") return { bg: dark ? "#334155" : "#E2E8F0", icon: Lock, ring: c.border };
    return { bg: dark ? "#334155" : "#E2E8F0", icon: null, ring: c.border };
  };

  return (
    <div style={{ position: "relative", padding: "8px 4px 4px" }}>
      <div className="kgi-roadmap" style={{ display: "flex", position: "relative" }}>
        <div style={{
          position: "absolute", top: 19, left: "10%", right: "10%", height: 3,
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)", borderRadius: 3,
        }} />
        <div style={{
          position: "absolute", top: 19, left: "10%", height: 3, borderRadius: 3,
          width: `${fillPct * 0.8}%`,
          background: `linear-gradient(90deg, ${TOKENS.success}, ${TOKENS.primary})`,
          transition: "width 1s ease",
        }} />
        {LEARNING_PATH.map((step, i) => {
          const s = statusStyle(step.status);
          const Icon = s.icon;
          return (
            <div key={step.title} className="kgi-roadmap-node kgi-fade-in" style={{ animationDelay: `${i * 90}ms` }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: s.bg, display: "flex",
                alignItems: "center", justifyContent: "center", margin: "0 auto",
                boxShadow: step.status === "current" ? `0 0 0 5px ${TOKENS.primary}26` : "none",
                position: "relative", zIndex: 2,
              }} className={step.status === "current" ? "kgi-pulse-ring" : ""}>
                {Icon ? <Icon size={17} color={step.status === "locked" ? c.textMuted : "#fff"} /> : (
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.textMuted }}>{i + 1}</span>
                )}
              </div>
              <div style={{ textAlign: "center", marginTop: 10, maxWidth: 130, marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: c.text, lineHeight: 1.3 }}>{step.title}</div>
                <div style={{ fontSize: 10.5, color: step.status === "current" ? TOKENS.primary : c.textMuted, fontWeight: 600, marginTop: 3 }}>
                  {step.eta}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   COURSE CARD
   ============================================================ */
function CourseCard({ course, index }) {
  const { c, dark } = useApp();
  const [expanded, setExpanded] = useState(false);
  const platform = PLATFORMS.find((p) => p.name === course.provider);

  return (
    <GlassCard className="kgi-fade-in" style={{ animationDelay: `${index * 50}ms`, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: "flex", alignItems: "center",
            justifyContent: "center", background: `${platform?.color || TOKENS.primary}1A`,
          }}>
            {course.type === "Internal"
              ? <Building2 size={17} color={platform?.color} />
              : <ExternalLink size={16} color={platform?.color} />}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: c.text, lineHeight: 1.3 }}>{course.title}</div>
            <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>{course.provider}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <Sparkles size={12} color={TOKENS.secondary} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: TOKENS.secondary }}>{course.match}%</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: DIFFICULTY_COLOR[course.difficulty], background: `${DIFFICULTY_COLOR[course.difficulty]}1A` }}>
          {course.difficulty}
        </span>
        <span style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 99, color: c.textMuted, background: dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)", display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={10} /> {course.hours}h
        </span>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: TOKENS.primary, background: `${TOKENS.primary}1A` }}>
          {course.tag}
        </span>
      </div>

      {course.progress > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 6, borderRadius: 99, background: c.border, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${course.progress}%`, borderRadius: 99, background: course.progress === 100 ? TOKENS.success : TOKENS.primary }} />
          </div>
          <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 4 }}>{course.progress}% complete</div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", gap: 5, background: "none", border: "none",
          color: TOKENS.primary, fontSize: 11.5, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: expanded ? 8 : 0,
        }}
      >
        <Sparkles size={11} /> Why this course? {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {expanded && (
        <p className="kgi-fade-in" style={{ fontSize: 11.5, color: c.textMuted, lineHeight: 1.5, margin: "0 0 12px", padding: 10, borderRadius: 10, background: dark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.05)" }}>
          {course.reason}
        </p>
      )}

      <div style={{ flex: 1 }} />
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12,
        background: course.progress === 100 ? "transparent" : `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
        color: course.progress === 100 ? TOKENS.success : "#fff",
        border: course.progress === 100 ? `1px solid ${TOKENS.success}` : "none",
        borderRadius: 10, padding: "9px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", width: "100%",
      }}>
        {course.progress === 100 ? <><CheckCircle2 size={14} /> Completed</> : course.progress > 0 ? <><Play size={13} /> Continue</> : <><Play size={13} /> Start Course</>}
      </button>
    </GlassCard>
  );
}

/* ============================================================
   AI TRAINING RECOMMENDATION PAGE
   ============================================================ */
function TrainingRecommendationPage() {
  const { c, dark } = useApp();
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All Levels");

  const filtered = useMemo(() => {
    return COURSES.filter((cr) =>
      (typeFilter === "All" || cr.type === typeFilter) &&
      (difficultyFilter === "All Levels" || cr.difficulty === difficultyFilter)
    );
  }, [typeFilter, difficultyFilter]);

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer", outline: "none" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      

      {/* AI summary banner */}
      <GlassCard className="kgi-fade-in" style={{
        background: dark
          ? "linear-gradient(160deg, rgba(37,99,235,0.16), rgba(124,58,237,0.12))"
          : "linear-gradient(160deg, rgba(37,99,235,0.07), rgba(124,58,237,0.05))",
      }} hover={false}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 3 }}>Your path is optimized for Cloud Security</div>
            <p style={{ fontSize: 12.5, color: c.text, lineHeight: 1.5, margin: 0 }}>
              This is your widest gap (35 vs. 90 required) and the fastest-growing risk area in Engineering. Completing the
              next two steps closes roughly 60% of it within one quarter.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Roadmap */}
      <GlassCard>
        <CardHeader title="Your Learning Path" subtitle="5 steps · sequenced by dependency and impact" />
        <LearningPathRoadmap />
      </GlassCard>

      {/* Filters */}
      <div className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: c.text }}>Recommended Courses ({filtered.length})</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select style={selectStyle} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>All</option><option>Internal</option><option>External</option>
          </select>
          <select style={selectStyle} value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <option>All Levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="kgi-cards-grid">
        {filtered.map((course, i) => <CourseCard key={course.title} course={course} index={i} />)}
      </div>

      {/* External / internal platforms */}
      <GlassCard>
        <CardHeader title="Learning Platforms" subtitle="Internal training plus your organization's connected external platforms" />
        <div className="kgi-platform-grid">
          {PLATFORMS.map((p) => (
            <div key={p.name} style={{
              display: "flex", alignItems: "center", gap: 10, padding: 14, borderRadius: 14,
              border: `1px solid ${c.border}`, background: dark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.02)",
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: `${p.color}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.type === "Internal" ? <BookOpen size={16} color={p.color} /> : <ExternalLink size={15} color={p.color} />}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: c.text }}>{p.name}</div>
                <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 1 }}>{p.courses.toLocaleString()} courses · {p.type}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
/* ============================================================
   LEARNING PROGRESS PAGE
   ============================================================ */
function LearningProgressPage() {
  const { c, dark } = useApp();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>My Learning Progress</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Your training history, momentum, and what's still ahead.
        </p>
      </div>

      <div className="kgi-stat-grid">
        {STATS.map((s, i) => <StatCard key={s.label} item={s} index={i} />)}
      </div>

      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Learning Streak" subtitle={`${computeStreak()}-day active streak — keep it going`} />
          <StreakGrid />
        </GlassCard>
        <GlassCard>
          <CardHeader title="Monthly Learning Hours" subtitle="Last 6 months" />
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY_HOURS} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TOKENS.primary} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={TOKENS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="hours" stroke={TOKENS.primary} fill="url(#progressGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Activity Timeline" subtitle="Recent milestones" />
          <div style={{ position: "relative", paddingLeft: 22 }}>
            <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: c.border }} />
            {TIMELINE.map((item, i) => {
              const meta = TIMELINE_META[item.type];
              return (
                <div key={i} className="kgi-fade-in" style={{ animationDelay: `${i * 80}ms`, position: "relative", marginBottom: i < TIMELINE.length - 1 ? 18 : 0 }}>
                  <span style={{
                    position: "absolute", left: -22, top: 1, width: 20, height: 20, borderRadius: "50%",
                    background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <meta.icon size={11} color={meta.color} />
                  </span>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{item.date}</div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <CardHeader title="Badges" subtitle="6 of 8 earned" />
          <div className="kgi-badge-grid">
            {BADGES.map((b, i) => <BadgeTile key={b.name} badge={b} index={i} />)}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader title="Completed Courses" subtitle={`${COMPLETED_COURSES.length} finished`} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {COMPLETED_COURSES.map((course, i) => (
            <div key={course.title} style={{
              display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10,
              padding: "13px 4px", borderBottom: i < COMPLETED_COURSES.length - 1 ? `1px solid ${c.border}` : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${TOKENS.success}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={16} color={TOKENS.success} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{course.title}</div>
                  <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{course.date} · {course.hours}h · Score {course.score}%</div>
                </div>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: 6, background: "transparent",
                border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px",
                color: c.text, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
              }}>
                <Download size={13} /> Certificate
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <CardHeader title="Upcoming Goals" subtitle="Self-set and manager-assigned targets" />
        <div className="kgi-goal-grid">
          {GOALS.map((g) => (
            <div key={g.title} style={{ border: `1px solid ${c.border}`, borderRadius: 14, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: c.text, lineHeight: 1.3 }}>{g.title}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 99, color: GOAL_STATUS_COLOR[g.status], background: `${GOAL_STATUS_COLOR[g.status]}1A`, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {g.status}
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: c.border, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ height: "100%", width: `${g.progress}%`, borderRadius: 99, background: GOAL_STATUS_COLOR[g.status] }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted }}>
                <span>{g.progress}% complete</span>
                <span>Due {g.target}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <TrainingRecommendationPage />
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function LearningProgress() {
  return (
    <Layout>
      <LearningProgressPage />
    </Layout>
  );
}