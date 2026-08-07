import { useEffect, useState } from "react";
import api from "../api/client";
import { Loader, Progress, SectionTitle, Stat } from "../components/Ui";

export default function Learning() {
  const [recs, setRecs] = useState(null);
  const [path, setPath] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [busy, setBusy] = useState(null);
  const [toast, setToast] = useState("");

  const load = () =>
    Promise.all([
      api.get("/api/recommendations/me"),
      api.get("/api/recommendations/me/learning-path"),
      api.get("/api/learning/catalog"),
      api.get("/api/learning/enrollments"),
    ]).then(([a, b, c, d]) => {
      setRecs(a.data);
      setPath(b.data);
      setCatalog(c.data);
      setEnrollments(d.data);
    });

  useEffect(() => {
    load();
  }, []);

  const enroll = async (programId, title) => {
    setBusy(programId);
    try {
      await api.post(`/api/learning/programs/${programId}/enroll`);
      setToast(`Enrolled in "${title}". Target completion in 30 days.`);
      await load();
    } finally {
      setBusy(null);
      setTimeout(() => setToast(""), 4000);
    }
  };

  const setProgress = async (id, progressPercent) => {
    await api.patch(`/api/learning/enrollments/${id}/progress`, { progressPercent });
    load();
  };

  const complete = async (id) => {
    await api.patch(`/api/learning/enrollments/${id}/progress`, {
      progressPercent: 100,
      status: "COMPLETED",
    });
    setToast("Training completed — your proficiency and gap analysis were recalculated.");
    setTimeout(() => setToast(""), 4000);
    load();
  };

  const unenroll = async (id) => {
    await api.delete(`/api/learning/enrollments/${id}`);
    load();
  };

  if (!recs) return <Loader label="Generating learning recommendations…" />;

  const enrolledIds = new Set(enrollments.map((e) => e.programId));
  const completed = enrollments.filter((e) => e.status === "COMPLETED" || e.status === "CERTIFIED").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Learning & training</h1>
        <p className="text-sm text-slate-500">
          Personalised learning paths, internal and external catalog, enrollment and progress tracking.
        </p>
      </div>

      {toast && (
        <div className="rounded-lg border border-brand bg-brand-light px-4 py-3 text-sm font-medium text-brand-dark">
          {toast}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Enrollments" value={enrollments.length} />
        <Stat label="Completed" value={completed} tone="slate" />
        <Stat label="Recommendations" value={recs.length} tone="warn" />
      </div>

      <section className="card">
        <SectionTitle
          title="My generated learning path"
          subtitle="Sequenced by gap severity — one step per prioritised skill"
        />
        {path.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">No open gaps, so no learning path is required.</p>
        ) : (
          <ol className="space-y-3">
            {path.map((s) => (
              <li key={s.step} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                  {s.step}
                </span>
                <div className="flex-1">
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-xs text-slate-500">
                    {s.skillName} · {s.provider} · {s.durationHours}h — {s.objective}
                  </p>
                </div>
                <button
                  className="btn-primary"
                  disabled={enrolledIds.has(s.programId) || busy === s.programId}
                  onClick={() => enroll(s.programId, s.title)}
                >
                  {enrolledIds.has(s.programId) ? "Enrolled" : "Enroll"}
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="card">
        <SectionTitle title="Recommended programs" subtitle="Relevance-scored against your gap profile" />
        <div className="grid gap-4 md:grid-cols-2">
          {recs.map((r) => (
            <article key={r.programId} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-slate-500">
                    {r.provider} · {r.skillName} · target {r.targetLevel} · {r.durationHours}h
                  </p>
                </div>
                <span className="badge bg-brand-light text-brand-dark">{r.relevanceScore}% match</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{r.description}</p>
              <p className="mt-2 text-xs text-slate-500">{r.reason}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  className="btn-primary"
                  disabled={enrolledIds.has(r.programId) || busy === r.programId}
                  onClick={() => enroll(r.programId, r.title)}
                >
                  {enrolledIds.has(r.programId) ? "Enrolled" : busy === r.programId ? "Enrolling…" : "Enroll"}
                </button>
                {r.url && (
                  <a className="btn-ghost" href={r.url} target="_blank" rel="noreferrer">
                    View course
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <SectionTitle title="My enrollments" subtitle="Update progress; completion re-evaluates your skill level" />
        {enrollments.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">You are not enrolled in any program yet.</p>
        ) : (
          <ul className="space-y-4">
            {enrollments.map((e) => (
              <li key={e.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{e.programTitle}</p>
                    <p className="text-xs text-slate-500">
                      {e.provider} · {e.skillName} · {e.status.replace("_", " ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost" onClick={() => setProgress(e.id, Math.min(100, e.progressPercent + 25))}>
                      +25%
                    </button>
                    <button className="btn-primary" onClick={() => complete(e.id)}>
                      Mark complete
                    </button>
                    <button className="btn-ghost" onClick={() => unenroll(e.id)}>
                      Leave
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={e.progressPercent} />
                  <span className="w-12 text-right text-xs font-semibold">{e.progressPercent}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <SectionTitle title="Full training catalog" subtitle="Internal academy + Coursera, Udemy, LinkedIn Learning" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Program</th>
                <th className="py-2">Provider</th>
                <th className="py-2">Skill</th>
                <th className="py-2">Target</th>
                <th className="py-2">Hours</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{p.title}</td>
                  <td className="py-2 text-slate-500">{p.provider}</td>
                  <td className="py-2">{p.skill?.name}</td>
                  <td className="py-2">{p.targetLevel}</td>
                  <td className="py-2">{p.durationHours}</td>
                  <td className="py-2 text-right">
                    <button
                      className="btn-primary"
                      disabled={enrolledIds.has(p.id) || busy === p.id}
                      onClick={() => enroll(p.id, p.title)}
                    >
                      {enrolledIds.has(p.id) ? "Enrolled" : "Enroll"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
