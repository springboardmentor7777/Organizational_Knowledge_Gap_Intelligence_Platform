import React, { useState , useEffect } from "react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";
import {
  Users,
  Target,
  Sparkles,
  Clock,
  Star,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Download,
  Quote,
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
/* ============================================================
   MOCK DATA
   ============================================================ */
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
  { cycle: "Q3 '25", score: 68 },
  { cycle: "Q4 '25", score: 72 },
  { cycle: "Q1 '26", score: 75 },
  { cycle: "Q2 '26", score: 79 },
];

const MANAGER_REVIEW = {
  cycle: "Q2 2026 Mid-Year Review",
  overall: 4.3,
  status: "Finalized",
  competencies: [
    { name: "Technical Execution", score: 88 },
    { name: "Collaboration", score: 82 },
    { name: "Ownership", score: 76 },
    { name: "Growth Mindset", score: 90 },
  ],
  comment:
    "Aisha consistently ships high-quality frontend work and has become the go-to person for design-system questions. The main growth area for next cycle is delegating more of the day-to-day so she can take on system design ownership.",
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
/* ============================================================
   SELF ASSESSMENT — interactive sliders
   ============================================================ */
/* ============================================================
   SELF ASSESSMENT — interactive questions
   ============================================================ */
const KNOWLEDGE_QUESTIONS = [
  { question: "Which approach helps identify where a team lacks domain experience?", options: ["Knowledge gap analysis", "Performance appraisal", "Budget review", "Stakeholder mapping"], answer: 0, topic: "Gap analysis" },
  { question: "A weak area in knowledge assessment is best addressed by:", options: ["Building a learning plan", "Ignoring the gap", "Increasing meeting frequency", "Reducing documentation"], answer: 0, topic: "Learning and development" },
  { question: "Which outcome is most important for knowledge gap reporting?", options: ["Recommended training", "Holiday scheduling", "Office seating plans", "Expense forecasts"], answer: 0, topic: "Training recommendation" },
  { question: "The best way to measure knowledge proficiency is to use:", options: ["Objective MCQs and scenario questions", "Manager guesswork", "Self opinion only", "Random surveys"], answer: 0, topic: "Assessment design" },
  { question: "A Knowledge Level of 60% usually means the individual is:", options: ["Developing and needs targeted practice", "Expert in every area", "Ready for promotion without support", "Completely unprepared"], answer: 0, topic: "Proficiency level" },
];

function getKnowledgeLevel(score) {
  if (score >= 85) return "Advanced";
  if (score >= 70) return "Proficient";
  if (score >= 50) return "Developing";
  return "Needs improvement";
}

function KnowledgeGapResult({ report }) {
  const { c } = useApp();
  if (!report) return null;
  return (
    <GlassCard style={{ marginTop: 18 }}>
      <CardHeader title="Knowledge Gap Result" subtitle="Your assessment summary" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
        <div style={{ padding: 18, borderRadius: 18, background: `${TOKENS.primary}0F` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, marginBottom: 8 }}>Score</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: c.text }}>{report.score}%</div>
        </div>
        <div style={{ padding: 18, borderRadius: 18, background: `${TOKENS.warning}0F` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, marginBottom: 8 }}>Knowledge Gap</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: c.text }}>{report.gap}%</div>
        </div>
        <div style={{ padding: 18, borderRadius: 18, background: `${TOKENS.secondary}0F` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, marginBottom: 8 }}>Knowledge Level</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: c.text }}>{report.level}</div>
        </div>
      </div>
    </GlassCard>
  );
}

function KnowledgeAssessment({ questions, answers, setAnswers, currentQuestion, setCurrentQuestion, assessmentStarted, setAssessmentStarted, report, onSubmit, submitted }) {
  const { c } = useApp();
  const question = questions[currentQuestion];
  const allAnswered = answers.every((a) => a !== null);
  return (
    <GlassCard>
      <CardHeader title="Knowledge Assessment" subtitle="One question at a time" />
      {!assessmentStarted ? (
        <div style={{ padding: 12 }}>
          <p style={{ margin: 0, color: c.textMuted }}>Take a short assessment to generate a personal learning recommendation.</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setAssessmentStarted(true)} style={{ padding: "8px 12px", borderRadius: 10, background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff", border: "none" }}>
              <BookOpen size={14} style={{ marginRight: 8 }} /> Start Assessment
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: 12 }}>
          <div style={{ marginBottom: 10, fontWeight: 700 }}>{`Question ${currentQuestion + 1} of ${questions.length}`}</div>
          <div style={{ marginBottom: 12, fontSize: 15 }}>{question.question}</div>
          <div style={{ display: "grid", gap: 8 }}>
            {question.options.map((opt, i) => {
              const selected = answers[currentQuestion] === i;
              return (
                <button key={opt} onClick={() => { const next = [...answers]; next[currentQuestion] = i; setAnswers(next); }} style={{ textAlign: "left", padding: 12, borderRadius: 10, border: `1px solid ${selected ? TOKENS.primary : c.border}`, background: selected ? `${TOKENS.primary}10` : c.surfaceSolid }}>
                  {opt}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))} disabled={currentQuestion === 0} style={{ padding: "8px 10px" }}>Previous</button>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1))} style={{ padding: "8px 10px" }}>Next</button>
            ) : (
              <button onClick={onSubmit} disabled={!allAnswered} style={{ padding: "8px 10px" }}>Submit</button>
            )}
          </div>
          {submitted && report && <KnowledgeGapResult report={report} />}
        </div>
      )}
    </GlassCard>
  );
}

function EmployeeAssessmentSummary({ results }) {
  const { c } = useApp();
  return (
    <GlassCard>
      <CardHeader title="Employee Assessment Summary" subtitle="Team results (manager view)" />
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {results.map((r) => (
          <div key={r.id} style={{ padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.surfaceSolid }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.employee}</div>
                <div style={{ fontSize: 12, color: c.textMuted }}>{r.role}</div>
              </div>
              <div style={{ fontWeight: 700 }}>{r.score}/{r.total}</div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function FeedbackPanel() {
  const { c } = useApp();
  const [reviewers, setReviewers] = useState(REVIEWERS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const submittedCount = reviewers.filter((r) => r.status === "Submitted").length;
  return (
    <GlassCard>
      <CardHeader title="360° Feedback" subtitle={`${submittedCount} of ${reviewers.length} responses`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {reviewers.map((r) => (
          <div key={r.name} style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: c.textMuted }}>{r.role}</div>
            </div>
            <div style={{ color: REVIEWER_STATUS[r.status].color }}>{r.status}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
function AssessmentPage() {
  const {
  c,
  dark,
  role,
  assessmentResults,
  setAssessmentResults,
} = useApp();
 const [answers, setAnswers] = useState(
  Array(KNOWLEDGE_QUESTIONS.length).fill(null)
);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [assessmentStarted, setAssessmentStarted] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [report, setReport] = useState(null);

const [databaseAssessments, setDatabaseAssessments] = useState([]);
const [assessmentLoading, setAssessmentLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:8080/api/assessments/employee/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch assessment data");
      }
      return response.json();
    })
    .then((data) => {
      setDatabaseAssessments(data);
      setAssessmentLoading(false);
    })
    .catch((error) => {
      console.error("Assessment API error:", error);
      setAssessmentLoading(false);
    });
}, []);

const completedCount = databaseAssessments.filter(
  (r) => r.status === "Completed"
).length;

const pendingCount = databaseAssessments.filter(
  (r) => r.status === "Pending"
).length;

const answeredCount = databaseAssessments.length;

const progressPercent = Math.round(
  (answeredCount / KNOWLEDGE_QUESTIONS.length) * 100
);

const databaseStatus =
  databaseAssessments.length > 0
    ? databaseAssessments[databaseAssessments.length - 1].status
    : null;

const isEmployee = role === "Employee";

  const handleSubmit = () => {
  const score = answers.reduce(
    (acc, answer, index) =>
      acc + (answer === KNOWLEDGE_QUESTIONS[index].answer ? 20 : 0),
    0
  );

  const gap = 100 - score;

  const weakAreas = KNOWLEDGE_QUESTIONS.filter(
    (q, index) => answers[index] !== q.answer
  ).map((q) => q.topic);

  const result = {
    id: Date.now(),

    employee: "Asad Pathan",

    department: "Engineering",

    role: "Frontend Developer",

    skill: "Knowledge Assessment",

    score,

    total: 100,

    gap,

    level: getKnowledgeLevel(score),

    weakAreas,

    reviewer: "Self",

    status: "Completed",

    submittedOn: new Date().toLocaleDateString(),
  };

  setAssessmentResults((prev) => {
    const filtered = prev.filter(
      (r) => r.employee !== result.employee
    );

    return [...filtered, result];
  });

  setReport({
    score,
    gap,
    level: result.level,
    weakAreas,
  });

  setSubmitted(true);
};
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Assessments</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Self-assessment, 360° feedback, and manager reviews for the current cycle.
        </p>
      </div>

      <div className="kgi-stat-grid">
        {isEmployee ? (
          <>
            <StatMini
  label="Questions Answered"
  value={`${answeredCount}/${KNOWLEDGE_QUESTIONS.length}`}
  icon={BookOpen}
  color={TOKENS.primary}
/>

<StatMini
  label="Assessment Progress"
  value={`${progressPercent}%`}
  icon={Target}
  color={TOKENS.warning}
/>

<StatMini
  label="Status"
  value={
    databaseStatus ||
    (submitted
      ? "Completed"
      : assessmentStarted
        ? "In progress"
        : "Not started")
  }
  icon={Sparkles}
  color={TOKENS.success}
/>
            <StatMini label="Next Review" value="Sep 15" icon={Clock} color={TOKENS.warning} />
          </>
        ) : (
          <>
            <StatMini label="Completed Assessments" value={completedCount} icon={CheckCircle2} color={TOKENS.success} />
            <StatMini label="Pending Assessments" value={pendingCount} icon={AlertCircle} color={TOKENS.warning} />
            <StatMini label="Feedback Received" value="2 of 4" icon={CheckCircle2} color={TOKENS.success} />
            <StatMini label="Next Review" value="Sep 15" icon={Clock} color={TOKENS.warning} />
          </>
        )}
      </div>

      <div className="kgi-top-grid">
        {isEmployee ? (
          <KnowledgeAssessment
            questions={KNOWLEDGE_QUESTIONS}
            answers={answers}
            setAnswers={setAnswers}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            assessmentStarted={assessmentStarted}
            setAssessmentStarted={setAssessmentStarted}
            report={report}
            onSubmit={handleSubmit}
            submitted={submitted}
          />
        ) : (
          <EmployeeAssessmentSummary results={assessmentResults} />
        )}

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