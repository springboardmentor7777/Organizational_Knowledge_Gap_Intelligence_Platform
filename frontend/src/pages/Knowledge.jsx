import { useEffect, useState } from "react";
import api from "../api/client";
import { Loader, SectionTitle } from "../components/Ui";

export default function Knowledge() {
  const [mentors, setMentors] = useState(null);
  const [mine, setMine] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [toast, setToast] = useState("");

  const load = () =>
    Promise.all([
      api.get("/api/knowledge/mentors/suggestions"),
      api.get("/api/knowledge/mentorships/me"),
      api.get("/api/knowledge/sessions"),
      api.get("/api/knowledge/articles"),
    ]).then(([a, b, c, d]) => {
      setMentors(a.data);
      setMine(b.data);
      setSessions(c.data);
      setArticles(d.data);
    });

  useEffect(() => {
    load();
  }, []);

  const request = async (mentorId, skillId, name) => {
    await api.post("/api/knowledge/mentorships", { mentorId, skillId });
    setToast(`Mentorship request sent to ${name}.`);
    setTimeout(() => setToast(""), 4000);
    load();
  };

  const register = async (id, title) => {
    await api.post(`/api/knowledge/sessions/${id}/register`);
    setToast(`Registered for "${title}".`);
    setTimeout(() => setToast(""), 4000);
    load();
  };

  if (!mentors) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Knowledge sharing & mentorship</h1>
        <p className="text-sm text-slate-500">
          Skill-complementarity matching, expert directory, sessions and shared knowledge articles.
        </p>
      </div>

      {toast && (
        <div className="rounded-lg border border-brand bg-brand-light px-4 py-3 text-sm font-medium text-brand-dark">
          {toast}
        </div>
      )}

      <section className="card">
        <SectionTitle title="Matched mentors" subtitle="Internal experts who exceed your required level" />
        {mentors.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">No matches — you have no open gaps with an internal expert.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {mentors.map((m, i) => (
              <article key={`${m.mentorId}-${m.skillId}-${i}`} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{m.mentorName}</p>
                    <p className="text-xs text-slate-500">
                      {m.jobRole} · {m.department}
                    </p>
                  </div>
                  <span className="badge bg-brand-light text-brand-dark">{m.matchScore}% match</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {m.skillName}: mentor at <b>{m.mentorLevel}</b>, you at <b>{m.myLevel}</b>.
                </p>
                <button
                  className="btn-primary mt-3"
                  onClick={() => request(m.mentorId, m.skillId, m.mentorName)}
                >
                  Request mentorship
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <SectionTitle title="My mentorship connections" />
        {mine.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">No connections yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {mine.map((m) => (
              <li key={m.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span>
                  <b>{m.skillName}</b> — mentor {m.mentorName}, mentee {m.menteeName}
                </span>
                <span className="badge bg-slate-100 text-slate-700">{m.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <SectionTitle title="Knowledge-sharing sessions" subtitle="Internal sessions you can register for" />
        <div className="grid gap-4 md:grid-cols-3">
          {sessions.map((s) => (
            <article key={s.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold">{s.title}</p>
              <p className="text-xs text-slate-500">
                {s.hostName} · {s.skillName} ·{" "}
                {s.scheduledAt ? new Date(s.scheduledAt).toLocaleDateString() : "TBD"}
              </p>
              <p className="mt-2 text-sm text-slate-600">{s.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                {s.registered}/{s.seats} seats filled
              </p>
              <button className="btn-primary mt-3" onClick={() => register(s.id, s.title)}>
                Register
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <SectionTitle title="Knowledge articles" subtitle="Community of practice resources" />
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold">{a.title}</p>
              <p className="text-xs text-slate-500">
                {a.authorName} · {a.skillName}
              </p>
              <p className="mt-2 text-sm text-slate-600">{a.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
