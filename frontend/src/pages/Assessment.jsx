import React, { useState, } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";
import { Users,
  Target,
  Sparkles,
  Clock,
  Star,
  Send,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Download,
  Quote,
  Plus,
  X,
} from "lucide-react";

import {
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
const SKILLS = [
  { name: "React & TypeScript", self: 90, manager: 84, peer: 82 },
  { name: "System Design", self: 55, manager: 62, peer: 65 },
  { name: "Cloud (AWS)", self: 50, manager: 45, peer: 42 },
  { name: "Team Mentoring", self: 45, manager: 60, peer: 65 },
  { name: "Stakeholder Communication", self: 88, manager: 80, peer: 78 },
  { name: "Project Planning", self: 62, manager: 50, peer: 48 },
];

function othersAvg(s) { return Math.round((s.manager + s.peer) / 2); }
function perceptionTag(s) {
  const diff = s.self - othersAvg(s);
  if (diff >= 12) return { label: "Blind spot", color: TOKENS.danger, desc: "You rate this higher than others do" };
  if (diff <= -12) return { label: "Hidden strength", color: TOKENS.success, desc: "Others rate this higher than you do" };
  return { label: "Aligned", color: TOKENS.primary, desc: "Your view matches others closely" };
}

const REVIEWERS = [
  { name: "Rohan Verma", role: "Manager", status: "Submitted" },
  { name: "Lin Chen", role: "Peer", status: "Submitted" },
  { name: "Daniel Osei", role: "Peer", status: "Pending" },
  { name: "Priya Nair", role: "Skip-level", status: "Pending" },
];
const REVIEWER_STATUS = {
  Submitted: { color: TOKENS.success, icon: CheckCircle2 },
  Pending: { color: TOKENS.warning, icon: AlertCircle },
};

const PERFORMANCE_TREND = [
  { cycle: "Q3 '25", score: 68 }, { cycle: "Q4 '25", score: 72 },
  { cycle: "Q1 '26", score: 75 }, { cycle: "Q2 '26", score: 79 },
];

const MANAGER_REVIEW = {
  cycle: "Q2 2026 Mid-Year Review", overall: 4.3, status: "Finalized",
  competencies: [
    { name: "Technical Execution", score: 88 },
    { name: "Collaboration", score: 82 },
    { name: "Ownership", score: 76 },
    { name: "Growth Mindset", score: 90 },
  ],
  comment: "Aisha consistently ships high-quality frontend work and has become the go-to person for design-system questions. The main growth area for next cycle is delegating more of the day-to-day so she can take on system design ownership.",
};

/* ============================================================
   CONTEXT + SHARED PRIMITIVES
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

/* ============================================================
   SELF ASSESSMENT — interactive sliders
   ============================================================ */
function SelfAssessment({ scores, setScores }) {
  const { c, dark } = useApp();
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <GlassCard>
      <CardHeader title="Self-Assessment" subtitle="Rate your own proficiency — this feeds into the perception-gap comparison below" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SKILLS.map((s, i) => (
          <div key={s.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{s.name}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: TOKENS.primary }}>{scores[i]}</span>
            </div>
            <input
              type="range" min="0" max="100" value={scores[i]}
              onChange={(e) => {
                const next = [...scores]; next[i] = Number(e.target.value); setScores(next); setSubmitted(false);
              }}
              className="kgi-slider"
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "block", marginBottom: 6 }}>Comments (optional)</label>
        <textarea
          value={comment} onChange={(e) => setComment(e.target.value)} rows={3}
          placeholder="Anything you'd like your manager to know before the review..."
          style={{
            width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`,
            background: c.inputBg, color: c.text, fontSize: 13, outline: "none", fontFamily: FONT_STACK, resize: "vertical",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
        <button
          onClick={() => setSubmitted(true)}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
            border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          }}
        >
          <Send size={14} /> Submit Self-Assessment
        </button>
        {submitted && (
          <span className="kgi-fade-in" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: TOKENS.success, fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Saved
          </span>
        )}
      </div>
    </GlassCard>
  );
}

/* ============================================================
   SIGNATURE ELEMENT: Perception Gap dumbbell chart
   Two-point "dumbbell" per skill (self vs. others' average) —
   a real 360-feedback pattern, distinct from every gauge/graph/
   heatmap/radar used elsewhere in the app, and it makes blind
   spots and hidden strengths visible at a glance.
   ============================================================ */
function PerceptionGapChart({ scores }) {
  const { c, dark } = useApp();
  const data = SKILLS.map((s, i) => ({ ...s, self: scores[i] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {data.map((s, i) => {
        const others = othersAvg(s);
        const tag = perceptionTag(s);
        const min = Math.min(s.self, others), max = Math.max(s.self, others);
        return (
          <div key={s.name} className="kgi-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{s.name}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 99, color: tag.color, background: `${tag.color}1A` }}>
                {tag.label}
              </span>
            </div>
            <div style={{ position: "relative", height: 24 }}>
              <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 3, borderRadius: 3, background: c.border }} />
              <div style={{
                position: "absolute", top: 11, height: 3, borderRadius: 3, background: `${tag.color}55`,
                left: `${min}%`, width: `${max - min}%`,
              }} />
              <div title={`Self: ${s.self}`} style={{
                position: "absolute", top: 4, left: `calc(${s.self}% - 8px)`, width: 16, height: 16, borderRadius: "50%",
                background: TOKENS.primary, border: `2px solid ${dark ? "#1E293B" : "#fff"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }} />
              <div title={`Others avg: ${others}`} style={{
                position: "absolute", top: 4, left: `calc(${others}% - 8px)`, width: 16, height: 16, borderRadius: "50%",
                background: TOKENS.secondary, border: `2px solid ${dark ? "#1E293B" : "#fff"}`, boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }} />
            </div>
            <div style={{ fontSize: 10.5, color: c.textMuted, marginTop: 3 }}>{tag.desc}</div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: 16, fontSize: 11, color: c.textMuted, marginTop: 4 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: TOKENS.primary }} /> Self</span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: TOKENS.secondary }} /> Others' average</span>
      </div>
    </div>
  );
}

/* ============================================================
   360 FEEDBACK PANEL
   ============================================================ */
function FeedbackPanel() {
  const { c, dark } = useApp();
  const [reviewers, setReviewers] = useState(REVIEWERS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const submittedCount = reviewers.filter((r) => r.status === "Submitted").length;

  return (
    <GlassCard>
      <CardHeader
        title="360° Feedback"
        subtitle={`${submittedCount} of ${reviewers.length} responses in`}
        right={
          <button onClick={() => setShowModal(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
            border: "none", borderRadius: 10, padding: "8px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            <UserPlus size={14} /> Request Feedback
          </button>
        }
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {reviewers.map((r, i) => {
          const meta = REVIEWER_STATUS[r.status];
          return (
            <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 4px", borderBottom: i < reviewers.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: c.textMuted }}>{r.role}</div>
                </div>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: meta.color }}>
                <meta.icon size={13} /> {r.status}
              </span>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={() => setShowModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} className="kgi-fade-in" />
          <div className="kgi-pop-in" style={{ position: "relative", width: "100%", maxWidth: 380, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 20, padding: 22, boxShadow: c.shadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: c.text }}>Request Feedback</span>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><X size={18} /></button>
            </div>
            <input
              placeholder="Colleague's name" value={name} onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: 14, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.inputBg, color: c.text, fontSize: 13, outline: "none", fontFamily: FONT_STACK }}
            />
            <button
              disabled={!name}
              onClick={() => { setReviewers([...reviewers, { name, role: "Peer", status: "Pending" }]); setName(""); setShowModal(false); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff", border: "none",
                borderRadius: 12, padding: "10px 16px", fontSize: 13, fontWeight: 600,
                cursor: name ? "pointer" : "not-allowed", opacity: name ? 1 : 0.5,
              }}
            >
              <Plus size={15} /> Send Request
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

/* ============================================================
   ASSESSMENT PAGE
   ============================================================ */
function AssessmentPage() {
  const { c, dark } = useApp();
  const [scores, setScores] = useState(SKILLS.map((s) => s.self));
  const avgSelf = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const avgOthers = Math.round(SKILLS.reduce((a, s) => a + othersAvg(s), 0) / SKILLS.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Assessments</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Self-assessment, 360° feedback, and manager reviews for the current cycle.
        </p>
      </div>

      <div className="kgi-stat-grid">
        <StatMini label="Avg. Self Score" value={avgSelf} icon={Target} color={TOKENS.primary} />
        <StatMini label="Avg. Others' Score" value={avgOthers} icon={Users} color={TOKENS.secondary} />
        <StatMini label="Feedback Received" value="2 of 4" icon={CheckCircle2} color={TOKENS.success} />
        <StatMini label="Next Review" value="Sep 15" icon={Clock} color={TOKENS.warning} />
      </div>

      <div className="kgi-top-grid">
        <SelfAssessment scores={scores} setScores={setScores} />
        <GlassCard>
          <CardHeader title="Perception Gap" subtitle="Self-rating vs. the average of manager + peer scores" />
          <PerceptionGapChart scores={scores} />
        </GlassCard>
      </div>

      <div className="kgi-top-grid">
        <FeedbackPanel />

        <GlassCard>
          <CardHeader
            title="Manager Review"
            subtitle={MANAGER_REVIEW.cycle}
            right={
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, color: TOKENS.success, background: `${TOKENS.success}1A` }}>
                {MANAGER_REVIEW.status}
              </span>
            }
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill={i <= Math.round(MANAGER_REVIEW.overall) ? TOKENS.warning : "none"} color={TOKENS.warning} />
            ))}
            <span style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{MANAGER_REVIEW.overall} / 5</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {MANAGER_REVIEW.competencies.map((cmp) => (
              <div key={cmp.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: c.text }}>{cmp.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{cmp.score}</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: c.border, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${cmp.score}%`, borderRadius: 99, background: `linear-gradient(90deg, ${TOKENS.primary}, ${TOKENS.secondary})` }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, padding: 12, borderRadius: 12, background: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)", marginBottom: 14 }}>
            <Quote size={15} color={c.textMuted} style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: c.text, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>{MANAGER_REVIEW.comment}</p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, background: "transparent",
            border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 13px",
            color: c.text, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            <Download size={13} /> Download Review PDF
          </button>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader title="Performance Trend" subtitle="Overall review score across recent cycles" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={PERFORMANCE_TREND} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#1E293B" : "#E2E8F0"} vertical={false} />
            <XAxis dataKey="cycle" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
            <Line type="monotone" dataKey="score" stroke={TOKENS.primary} strokeWidth={2.5} dot={{ r: 4, fill: TOKENS.primary }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Assessment() {
  return (
    <Layout>
      <AssessmentPage />
    </Layout>
  );
}