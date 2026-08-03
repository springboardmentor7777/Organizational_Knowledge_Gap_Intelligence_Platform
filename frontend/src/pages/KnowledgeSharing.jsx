import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Users, Target, Sparkles, Share2, GraduationCap, ClipboardCheck,
  Bell, BarChart3, FileText, Settings, Search, Moon, Sun, ChevronLeft, ChevronRight,
  Menu, X, ChevronDown, Award, Clock, Briefcase, Home, Star, MessageCircle,
  ThumbsUp, CalendarDays, CheckCircle2, ArrowRight, BookOpen, Loader2, Quote,
} from "lucide-react";
import Layout from "../components/Layout";
import GlassCard from "../components/GlassCard";
import CardHeader from "../components/CardHeader";

import { useApp, TOKENS, FONT_STACK } from "../context/AppContext";

/* ============================================================
   MOCK DATA
   ============================================================ */
const MENTORS = [
  {
    name: "Lin Chen", initials: "LC", title: "Principal Design Engineer", dept: "Design",
    expertise: ["Design Systems", "Accessibility", "Figma"], rating: 4.9, sessions: 62,
    bio: "12 years building enterprise design systems. Loves helping engineers bridge the design-dev gap.",
  },
  {
    name: "Rohan Verma", initials: "RV", title: "Engineering Manager", dept: "Engineering",
    expertise: ["System Design", "Cloud Architecture", "Leadership"], rating: 4.8, sessions: 84,
    bio: "Leads the platform team. Focuses on pragmatic system design and growing senior engineers into leads.",
  },
  {
    name: "Sara Ahmed", initials: "SA", title: "Staff Data Scientist", dept: "Data",
    expertise: ["Data Analysis", "ML Pipelines", "Python"], rating: 4.7, sessions: 41,
    bio: "Works across analytics and ML infra. Enjoys demystifying data science for non-specialists.",
  },
  {
    name: "Marcus Bell", initials: "MB", title: "Security Architect", dept: "IT",
    expertise: ["Cloud Security", "Compliance", "Threat Modeling"], rating: 5.0, sessions: 37,
    bio: "Owns org-wide security posture. Runs the internal Cloud Security curriculum.",
  },
  {
    name: "Priya Nair", initials: "PN", title: "Head of People Ops", dept: "People Ops",
    expertise: ["Career Coaching", "Feedback", "Performance Reviews"], rating: 4.9, sessions: 103,
    bio: "13 years in HR leadership. Specializes in career-pathing conversations and manager coaching.",
  },
  {
    name: "Daniel Osei", initials: "DO", title: "Senior Sales Engineer", dept: "Sales",
    expertise: ["Stakeholder Comms", "Enterprise Sales", "Negotiation"], rating: 4.6, sessions: 29,
    bio: "Helps technical staff translate their work into business impact conversations.",
  },
];

const DEPARTMENTS = ["All Departments", ...Array.from(new Set(MENTORS.map((m) => m.dept)))];
const ALL_EXPERTISE = ["All Expertise", ...Array.from(new Set(MENTORS.flatMap((m) => m.expertise)))];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:30 PM"];
// deterministic pseudo-availability so it looks realistic but is stable
function isAvailable(mentorIdx, dayIdx, timeIdx) {
  return (mentorIdx * 7 + dayIdx * 3 + timeIdx * 5) % 4 !== 0;
}

const ARTICLES = [
  { type: "Article", title: "5 Patterns for Reviewing Cloud Security in PRs", author: "Marcus Bell", tags: ["Security", "Best Practice"], readTime: "6 min read", upvotes: 48, replies: 9 },
  { type: "Discussion", title: "How should we structure the new design system tokens?", author: "Lin Chen", tags: ["Design Systems"], readTime: "Active thread", upvotes: 31, replies: 22 },
  { type: "Article", title: "A Practical Intro to Feature Stores for Non-ML Engineers", author: "Sara Ahmed", tags: ["Data", "ML"], readTime: "9 min read", upvotes: 27, replies: 5 },
  { type: "Discussion", title: "Best way to run a 1:1 when a report is underperforming?", author: "Priya Nair", tags: ["Leadership", "Feedback"], readTime: "Active thread", upvotes: 39, replies: 17 },
  { type: "Article", title: "System Design Interview Notes, Internal Edition", author: "Rohan Verma", tags: ["System Design"], readTime: "11 min read", upvotes: 56, replies: 12 },
];

/* ============================================================
   MENTOR CARD
   ============================================================ */
   function Avatar({ initials, size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}

   function Stars({ rating }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Star
        size={14}
        fill={TOKENS.warning}
        color={TOKENS.warning}
      />
      <span style={{ fontSize: 12 }}>
        {rating}
      </span>
    </div>
  );
}
   function MentorCard({ mentor, index, onOpen }) {
  const { c } = useApp();
  return (
    <GlassCard className="kgi-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Avatar initials={mentor.initials} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: c.text }}>{mentor.name}</div>
          <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 1 }}>{mentor.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
            <Stars rating={mentor.rating} />
            <span style={{ fontSize: 11, color: c.textMuted }}>{mentor.sessions} sessions</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {mentor.expertise.map((tag) => (
          <span key={tag} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 99, color: TOKENS.primary, background: `${TOKENS.primary}14` }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onOpen(mentor, "profile")} style={{
          flex: 1, background: "transparent", border: `1px solid ${c.border}`, borderRadius: 10,
          padding: "9px 10px", color: c.text, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          View Profile
        </button>
        <button onClick={() => onOpen(mentor, "book")} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff",
          border: "none", borderRadius: 10, padding: "9px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          <CalendarDays size={13} /> Book
        </button>
      </div>
    </GlassCard>
  );
}

/* ============================================================
   SIGNATURE ELEMENT: Session booking slot grid
   A real interactive week x time grid (not a generic form) —
   click a slot to select it, then confirm. This mirrors how an
   actual scheduling tool behaves, tying the module's action
   ("book a session") directly to its visual centerpiece.
   ============================================================ */
function SlotGrid({ mentorIdx, selected, onSelect }) {
  const { c, dark } = useApp();
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `70px repeat(${DAYS.length}, 1fr)`, gap: 6, minWidth: 420 }}>
        <div />
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: c.textMuted }}>{d}</div>
        ))}
        {TIMES.map((t, tIdx) => (
          <React.Fragment key={t}>
            <div style={{ fontSize: 10.5, color: c.textMuted, display: "flex", alignItems: "center" }}>{t}</div>
            {DAYS.map((d, dIdx) => {
              const available = isAvailable(mentorIdx, dIdx, tIdx);
              const isSelected = selected && selected.dIdx === dIdx && selected.tIdx === tIdx;
              return (
                <button
                  key={d + t}
                  disabled={!available}
                  onClick={() => onSelect({ dIdx, tIdx, day: d, time: t })}
                  style={{
                    height: 34, borderRadius: 8, border: isSelected ? "none" : `1px solid ${c.border}`,
                    background: isSelected
                      ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`
                      : available ? (dark ? "rgba(16,185,129,0.10)" : "rgba(16,185,129,0.08)") : "transparent",
                    cursor: available ? "pointer" : "not-allowed",
                    opacity: available ? 1 : 0.25,
                  }}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 10.5, color: c.textMuted }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "rgba(16,185,129,0.4)" }} /> Available</span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: c.border }} /> Unavailable</span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` }} /> Selected</span>
      </div>
    </div>
  );
}

function MentorModal({ mentor, mode, mentorIdx, onClose }) {
  const { c, dark } = useApp();
  const [tab, setTab] = useState(mode);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("idle"); // idle | booking | booked

  const confirm = () => {
    setStatus("booking");
    setTimeout(() => setStatus("booked"), 1100);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} className="kgi-fade-in" />
      <div className="kgi-pop-in" style={{
        position: "relative", width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto",
        background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 20, padding: 22, boxShadow: c.shadow,
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", color: c.textMuted, cursor: "pointer" }}><X size={18} /></button>

        <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
          <Avatar initials={mentor.initials} size={54} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: c.text }}>{mentor.name}</div>
            <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 1 }}>{mentor.title} · {mentor.dept}</div>
            <div style={{ marginTop: 6 }}><Stars rating={mentor.rating} /></div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {["profile", "book"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600,
              background: tab === t ? `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})` : (dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)"),
              color: tab === t ? "#fff" : c.text,
            }}>
              {t === "profile" ? "Profile" : "Book a Session"}
            </button>
          ))}
        </div>

        {tab === "profile" ? (
          <div className="kgi-fade-in">
            <p style={{ fontSize: 13, color: c.text, lineHeight: 1.55, margin: "0 0 16px" }}>{mentor.bio}</p>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 8 }}>Areas of expertise</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {mentor.expertise.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99, color: TOKENS.primary, background: `${TOKENS.primary}14` }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: c.textMuted }}>
              <span>{mentor.sessions} sessions completed</span>
              <span>{mentor.rating} average rating</span>
            </div>
          </div>
        ) : status === "booked" ? (
          <div className="kgi-fade-in" style={{ textAlign: "center", padding: "12px 0" }}>
            <div className="kgi-pop-in" style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px", background: `${TOKENS.success}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={26} color={TOKENS.success} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 4 }}>Session requested</div>
            <p style={{ fontSize: 12.5, color: c.textMuted, marginBottom: 4 }}>
              {selectedSlot?.day} at {selectedSlot?.time} with {mentor.name}. You'll get a calendar invite once they confirm.
            </p>
          </div>
        ) : (
          <div className="kgi-fade-in">
            <div style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 10 }}>Pick a time this week</div>
            <SlotGrid mentorIdx={mentorIdx} selected={selectedSlot} onSelect={setSelectedSlot} />
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: c.text, display: "block", marginBottom: 6 }}>What do you want to talk about?</label>
              <textarea
                value={topic} onChange={(e) => setTopic(e.target.value)} rows={3}
                placeholder="e.g. Reviewing my cloud security learning plan"
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${c.border}`,
                  background: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)", color: c.text,
                  fontSize: 13, outline: "none", fontFamily: FONT_STACK, resize: "vertical",
                }}
              />
            </div>
            <button
              disabled={!selectedSlot || status === "booking"}
              onClick={confirm}
              style={{
                width: "100%", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: `linear-gradient(135deg, ${TOKENS.primary}, ${TOKENS.secondary})`, color: "#fff", border: "none",
                borderRadius: 12, padding: "11px 16px", fontSize: 13.5, fontWeight: 600,
                cursor: selectedSlot ? "pointer" : "not-allowed", opacity: selectedSlot ? 1 : 0.5,
              }}
            >
              {status === "booking" ? <Loader2 size={15} className="kgi-spin" /> : <CalendarDays size={15} />}
              {status === "booking" ? "Requesting..." : selectedSlot ? `Confirm ${selectedSlot.day} · ${selectedSlot.time}` : "Select a time slot"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   KNOWLEDGE ARTICLES / DISCUSSIONS
   ============================================================ */
function ArticleRow({ item, index }) {
  const { c, dark } = useApp();
  return (
    <div className="kgi-fade-in" style={{
      display: "flex", gap: 14, padding: "14px 4px", animationDelay: `${index * 40}ms`,
      borderBottom: `1px solid ${c.border}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: item.type === "Article" ? `${TOKENS.primary}1A` : `${TOKENS.secondary}1A`,
      }}>
        {item.type === "Article" ? <BookOpen size={16} color={TOKENS.primary} /> : <MessageCircle size={16} color={TOKENS.secondary} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: c.text }}>{item.title}</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, color: item.type === "Article" ? TOKENS.primary : TOKENS.secondary, background: item.type === "Article" ? `${TOKENS.primary}14` : `${TOKENS.secondary}14` }}>
            {item.type}
          </span>
        </div>
        <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 3 }}>by {item.author} · {item.readTime}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {item.tags.map((t) => (
            <span key={t} style={{ fontSize: 10, color: c.textMuted, background: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)", padding: "2px 8px", borderRadius: 99 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0, fontSize: 11.5, color: c.textMuted }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><ThumbsUp size={12} /> {item.upvotes}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={12} /> {item.replies}</span>
      </div>
    </div>
  );
}

/* ============================================================
   KNOWLEDGE SHARING PAGE
   ============================================================ */
function KnowledgeSharingContent() {
  const { c } = useApp();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [expertise, setExpertise] = useState("All Expertise");
  const [modal, setModal] = useState(null); // { mentor, mode, index }

  const filtered = useMemo(() => {
    return MENTORS.filter((m) =>
      (dept === "All Departments" || m.dept === dept) &&
      (expertise === "All Expertise" || m.expertise.includes(expertise)) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) || m.expertise.some((e) => e.toLowerCase().includes(query.toLowerCase())))
    );
  }, [query, dept, expertise]);

  const selectStyle = { fontSize: 12.5, fontWeight: 600, color: c.text, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 10px", cursor: "pointer", outline: "none" };
  const openModal = (mentor, mode) => setModal({ mentor, mode, index: MENTORS.indexOf(mentor) });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="kgi-fade-in">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: c.text, margin: 0, letterSpacing: -0.5 }}>Knowledge Sharing</h1>
        <p style={{ fontSize: 13.5, color: c.textMuted, margin: "4px 0 0" }}>
          Find a mentor, book time with them, or browse what your colleagues have written.
        </p>
      </div>

      {/* Search + filters */}
      <div className="kgi-fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: 8, background: c.surfaceSolid, border: `1px solid ${c.border}`, borderRadius: 10, padding: "9px 12px" }}>
          <Search size={15} color={c.textMuted} />
          <input placeholder="Search mentors or expertise..." value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: c.text, fontSize: 12.5, fontFamily: FONT_STACK }} />
        </div>
        <select style={selectStyle} value={dept} onChange={(e) => setDept(e.target.value)}>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select style={selectStyle} value={expertise} onChange={(e) => setExpertise(e.target.value)}>
          {ALL_EXPERTISE.map((e) => <option key={e}>{e}</option>)}
        </select>
      </div>

      {/* Mentor grid */}
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: c.text, marginBottom: 14 }}>Mentor Directory ({filtered.length})</div>
        <div className="kgi-cards-grid">
          {filtered.map((m, i) => <MentorCard key={m.name} mentor={m} index={i} onOpen={openModal} />)}
        </div>
        {filtered.length === 0 && (
          <p style={{ fontSize: 13, color: c.textMuted, textAlign: "center", padding: 20 }}>No mentors match those filters.</p>
        )}
      </div>

      {/* Knowledge articles / discussions */}
      <GlassCard hover={false}>
        <CardHeader title="Knowledge Articles & Discussions" subtitle="Written by mentors and shared across the organization" />
        <div>
          {ARTICLES.map((item, i) => <ArticleRow key={item.title} item={item} index={i} />)}
        </div>
      </GlassCard>

      {modal && (
        <MentorModal mentor={modal.mentor} mode={modal.mode} mentorIdx={modal.index} onClose={() => setModal(null)} />
      )}
    </div>
  );
}


/* ============================================================
   ROOT
   ============================================================ */
export default function KnowledgeSharingPage() {
  return (
    <Layout>
      <KnowledgeSharingContent />
    </Layout>
  );
}