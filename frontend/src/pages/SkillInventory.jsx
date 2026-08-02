import React, { useState, useMemo, useEffect, useRef } from "react";

import {
  X,
  Clock,
  Pencil,
  Upload,
  Calendar,
  MapPin,
  Mail,
  FileBadge,
  Plus,
  UploadCloud,
  Trash2,
  Building2,
} from "lucide-react";

import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";
import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";

/* ============================================================
   MOCK DATA
   ============================================================ */
const PROFILE = {
  name: "Asad Pathan", title: "Senior Frontend Engineer", dept: "Engineering",
  location: "Mumbai, IN", email: "asad.pathan2002@gmail.com", tenure: "3.2 yrs",
  manager: "Rohan Verma", initials: "AP",
};

const CATEGORIES = [
  { key: "technical", label: "Technical", color: TOKENS.primary, mastery: 78 },
  { key: "leadership", label: "Leadership", color: TOKENS.secondary, mastery: 54 },
  { key: "domain", label: "Domain", color: TOKENS.success, mastery: 66 },
  { key: "communication", label: "Communication", color: TOKENS.warning, mastery: 82 },
];

const PROFICIENCY = (v) => (v >= 85 ? "Expert" : v >= 65 ? "Advanced" : v >= 40 ? "Intermediate" : "Beginner");

const SKILLS = [
  { name: "React & TypeScript", category: "technical", level: 88, assessed: "2 weeks ago" },
  { name: "System Design", category: "technical", level: 62, assessed: "1 month ago" },
  { name: "Cloud (AWS)", category: "technical", level: 45, assessed: "3 months ago" },
  { name: "GraphQL", category: "technical", level: 70, assessed: "1 month ago" },
  { name: "Team Mentoring", category: "leadership", level: 58, assessed: "2 months ago" },
  { name: "Project Planning", category: "leadership", level: 50, assessed: "2 months ago" },
  { name: "Product Domain Knowledge", category: "domain", level: 72, assessed: "3 weeks ago" },
  { name: "Accessibility Standards", category: "domain", level: 60, assessed: "1 month ago" },
  { name: "Stakeholder Communication", category: "communication", level: 85, assessed: "2 weeks ago" },
];

const CERTIFICATES = [
  { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", date: "Mar 2026", color: TOKENS.warning },
  { title: "Certified Scrum Master", issuer: "Scrum Alliance", date: "Nov 2025", color: TOKENS.primary },
  { title: "Advanced React Patterns", issuer: "Internal Academy", date: "Jan 2026", color: TOKENS.secondary },
];

const TIMELINE = [
  { role: "Senior Frontend Engineer", period: "2024 — Present", desc: "Leading the design system rebuild and mentoring 3 junior engineers." },
  { role: "Frontend Engineer II", period: "2022 — 2024", desc: "Shipped the customer analytics dashboard used by 40+ enterprise accounts." },
  { role: "Frontend Engineer I", period: "2021 — 2022", desc: "Joined the platform team; built the internal component library." },
];




/* ============================================================
   SIGNATURE ELEMENT: Skill Mastery Rings
   Concentric activity-ring style gauges, one per skill category —
   a personal "skill fingerprint" rather than a single generic
   progress bar. Distinct from the dashboard's single gauge and
   the gap page's heatmap, but built from the same visual grammar.
   ============================================================ */
function MasteryRings() {
  const { c } = useApp();
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);
  const baseR = 78;
  const gap = 16;
  const size = 200;
  const center = size / 2;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {CATEGORIES.map((cat, i) => {
            const r = baseR - i * gap;
            const circ = 2 * Math.PI * r;
            const offset = circ * (1 - (animated ? cat.mastery : 0) / 100);
            return (
              <g key={cat.key}>
                <circle cx={center} cy={center} r={r} fill="none" stroke={c.border} strokeWidth="11" />
                <circle
                  cx={center} cy={center} r={r} fill="none" stroke={cat.color} strokeWidth="11"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                  transform={`rotate(-90 ${center} ${center})`}
                  style={{ transition: `stroke-dashoffset 1s ease ${i * 0.12}s` }}
                />
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: c.text }}>
            {Math.round(CATEGORIES.reduce((a, b) => a + b.mastery, 0) / CATEGORIES.length)}%
          </span>
          <span style={{ fontSize: 10, color: c.textMuted, fontWeight: 600 }}>OVERALL</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 160 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: cat.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: c.text, fontWeight: 600, flex: 1 }}>{cat.label}</span>
            <span style={{ fontSize: 12.5, color: c.textMuted, fontWeight: 700 }}>{cat.mastery}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SKILL CARD
   ============================================================ */
function SkillCard({ skill, index }) {
  const { c } = useApp();
  const cat = CATEGORIES.find((c2) => c2.key === skill.category);
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(skill.level), 80 + index * 40); return () => clearTimeout(t); }, [skill.level, index]);

  return (
    <GlassCard className="kgi-fade-in" style={{ animationDelay: `${index * 40}ms`, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: c.text }}>{skill.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: cat.color }} />
            <span style={{ fontSize: 11, color: c.textMuted }}>{cat.label}</span>
          </div>
        </div>
        <span style={{
          fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99,
          color: cat.color, background: `${cat.color}1A`, whiteSpace: "nowrap",
        }}>
          {PROFICIENCY(skill.level)}
        </span>
      </div>
      <div style={{ height: 7, borderRadius: 99, background: c.border, overflow: "hidden", marginBottom: 6 }}>
        <div style={{ height: "100%", width: `${width}%`, borderRadius: 99, background: cat.color, transition: "width 0.9s ease" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted }}>
        <span>{skill.level}/100</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {skill.assessed}</span>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   CERTIFICATE CARD + UPLOAD MODAL
   ============================================================ */
function CertificateCard({ cert, onRemove }) {
  const { c } = useApp();
  return (
    <GlassCard className="kgi-fade-in" style={{ padding: 16, display: "flex", gap: 12 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "flex",
        alignItems: "center", justifyContent: "center", background: `${cert.color}1A`,
      }}>
        <FileBadge size={20} color={cert.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: c.text, lineHeight: 1.3 }}>{cert.title}</div>
        <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>{cert.issuer} · {cert.date}</div>
      </div>
      {onRemove && (
        <button onClick={onRemove} style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer", flexShrink: 0 }}>
          <Trash2 size={14} />
        </button>
      )}
    </GlassCard>
  );
}

function UploadModal({ onClose, onAdd }) {
  const { c, dark } = useApp();
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const inputRef = useRef(null);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} className="kgi-fade-in" />
      <div className="kgi-pop-in" style={{
        position: "relative", width: "100%", maxWidth: 420, background: c.surfaceSolid,
        border: `1px solid ${c.border}`, borderRadius: 20, padding: 22, boxShadow: c.shadow,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: c.text }}>Upload Certificate</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><X size={18} /></button>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: `1.5px dashed ${c.border}`, borderRadius: 14, padding: "26px 14px",
            textAlign: "center", cursor: "pointer", marginBottom: 16,
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.02)",
          }}
        >
          <UploadCloud size={26} color={TOKENS.primary} style={{ margin: "0 auto 8px" }} />
          <div style={{ fontSize: 12.5, color: c.text, fontWeight: 600 }}>
            {fileName || "Click to choose a file, or drag it here"}
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 3 }}>PDF, PNG or JPG · up to 10MB</div>
          <input ref={inputRef} type="file" style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
        </div>

        <input
          placeholder="Certificate title" value={title} onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)", color: c.text, fontSize: 13, outline: "none", fontFamily: FONT_STACK }}
        />
        <input
          placeholder="Issuing organization" value={issuer} onChange={(e) => setIssuer(e.target.value)}
          style={{ width: "100%", marginBottom: 18, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)", color: c.text, fontSize: 13, outline: "none", fontFamily: FONT_STACK }}
        />

        <button
          disabled={!title || !issuer}
          onClick={() => { onAdd({ title, issuer, date: "Just now", color: TOKENS.success }); onClose(); }}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
            border: "none", borderRadius: 12, padding: "11px 16px", fontSize: 13.5, fontWeight: 600,
            cursor: title && issuer ? "pointer" : "not-allowed", opacity: title && issuer ? 1 : 0.5,
          }}
        >
          <Upload size={15} /> Add Certificate
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE HEADER
   ============================================================ */
function ProfileHeader() {
  const { c } = useApp();
  return (
    <GlassCard className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
      <div style={{
        width: 68, height: 68, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff", fontSize: 22, fontWeight: 700,
      }}>
        {PROFILE.initials}
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{PROFILE.name}</div>
        <div style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>{PROFILE.title} · {PROFILE.dept}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 }}>
          {[
            [MapPin, PROFILE.location], [Mail, PROFILE.email], [Building2, `Reports to ${PROFILE.manager}`], [Calendar, `${PROFILE.tenure} tenure`],
          ].map(([Icon, text], i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: c.textMuted }}>
              <Icon size={12.5} /> {text}
            </span>
          ))}
        </div>
      </div>
      <button style={{
        display: "flex", alignItems: "center", gap: 7, background: "transparent",
        border: `1px solid ${c.border}`, borderRadius: 10, padding: "9px 14px",
        color: c.text, fontSize: 12.5, fontWeight: 600, cursor: "pointer", flexShrink: 0,
      }}>
        <Pencil size={14} /> Edit Profile
      </button>
    </GlassCard>
  );
}

/* ============================================================
   EXPERIENCE TIMELINE
   ============================================================ */
function ExperienceTimeline() {
  const { c } = useApp();
  return (
    <div style={{ position: "relative", paddingLeft: 22 }}>
      <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: c.border }} />
      {TIMELINE.map((item, i) => (
        <div key={i} className="kgi-fade-in" style={{ animationDelay: `${i * 90}ms`, position: "relative", marginBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
          <span style={{
            position: "absolute", left: -22, top: 3, width: 11, height: 11, borderRadius: "50%",
            background: i === 0 ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : c.border,
            border: `2px solid ${c.surfaceSolid}`,
          }} />
          <div style={{ fontSize: 13.5, fontWeight: 700, color: c.text }}>{item.role}</div>
          <div style={{ fontSize: 11.5, color: TOKENS.primary, fontWeight: 600, marginTop: 1 }}>{item.period}</div>
          <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 4, lineHeight: 1.45 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SKILL INVENTORY PAGE
   ============================================================ */
function SkillInventoryPage() {
  const { c } = useApp();
  const [filter, setFilter] = useState("all");
  const [certs, setCerts] = useState(CERTIFICATES);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? SKILLS : SKILLS.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>My Skill Inventory</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Your tracked competencies, certifications, and career history.
        </p>
      </div>

      <ProfileHeader />

      <div className="kgi-top-grid">
        <GlassCard>
          <CardHeader title="Skill Mastery" subtitle="Weighted average by category" />
          <MasteryRings />
        </GlassCard>
        <GlassCard>
          <CardHeader title="Experience Timeline" subtitle="Role history at this company" />
          <ExperienceTimeline />
        </GlassCard>
      </div>

      {/* Skill category filter + cards */}
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: c.text }}>Skills ({filtered.length})</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["all", ...CATEGORIES.map((c2) => c2.key)].map((key) => {
              const active = filter === key;
              const cat = CATEGORIES.find((c2) => c2.key === key);
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 99,
                    border: `1px solid ${active ? "transparent" : c.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600,
                    background: active ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : "transparent",
                    color: active ? "#fff" : c.text,
                  }}
                >
                  {cat && <span style={{ width: 7, height: 7, borderRadius: 99, background: active ? "#fff" : cat.color }} />}
                  {key === "all" ? "All" : cat.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="kgi-cards-grid">
          {filtered.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
        </div>
      </div>

      {/* Certificates */}
      <GlassCard>
        <CardHeader
          title="Certificates"
          subtitle={`${certs.length} earned`}
          right={
            <button
              onClick={() => setShowUpload(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
                color: "#fff", border: "none", borderRadius: 10, padding: "8px 13px",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              <Plus size={14} /> Upload
            </button>
          }
        />
        <div className="kgi-cards-grid">
          {certs.map((cert, i) => (
            <CertificateCard key={cert.title + i} cert={cert} onRemove={() => setCerts(certs.filter((_, idx) => idx !== i))} />
          ))}
        </div>
      </GlassCard>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onAdd={(c2) => setCerts([c2, ...certs])} />
      )}
    </div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function SkillInventory() {
  return (
    <Layout>
      <SkillInventoryPage />
    </Layout>
  );
}