import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { Stat, SectionTitle, SeverityBadge, Progress, Loader, Empty } from "../components/Ui";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/dashboard/employee").then(({ data }) => setData(data));
  }, []);

  if (!data) return <Loader label="Loading your gap intelligence…" />;
  const { gapSummary, recommendations, enrollments, attempts, mentorships } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My knowledge gap summary</h1>
        <p className="text-sm text-slate-500">
          {gapSummary.jobRole} · {gapSummary.department} — benchmarked against your role competency framework.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Role readiness" value={gapSummary.readinessPercent} suffix="%" />
        <Stat label="Critical gaps" value={gapSummary.criticalGaps} tone="danger" />
        <Stat label="Open gaps" value={gapSummary.totalGaps} tone="warn" />
        <Stat label="Active enrollments" value={enrollments.length} tone="slate" />
      </div>

      <section className="card">
        <SectionTitle
          title="Prioritised skill gaps"
          subtitle="Severity = gap size × business criticality"
          action={<Link className="btn-ghost" to="/gaps">Full analysis</Link>}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Skill</th>
                <th className="py-2">Current</th>
                <th className="py-2">Required</th>
                <th className="py-2">Gap</th>
                <th className="py-2">Severity</th>
              </tr>
            </thead>
            <tbody>
              {gapSummary.gaps.slice(0, 6).map((g) => (
                <tr key={g.skillId} className="border-t border-slate-100">
                  <td className="py-2 font-medium">
                    {g.skillName}
                    {g.critical && <span className="ml-2 badge bg-red-50 text-danger">critical</span>}
                  </td>
                  <td className="py-2">{g.currentLevel}</td>
                  <td className="py-2">{g.requiredLevel}</td>
                  <td className="py-2 font-semibold">{g.gap}</td>
                  <td className="py-2"><SeverityBadge severity={g.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <SectionTitle
            title="Recommended for you"
            subtitle="Ranked by gap severity and target level"
            action={<Link className="btn-ghost" to="/learning">Enroll</Link>}
          />
          {recommendations.length === 0 ? (
            <Empty label="No open gaps — nothing recommended right now." />
          ) : (
            <ul className="space-y-3">
              {recommendations.map((r) => (
                <li key={r.programId} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-xs text-slate-500">
                        {r.provider} · {r.skillName} · {r.durationHours}h
                      </p>
                    </div>
                    <span className="badge bg-brand-light text-brand-dark">{r.relevanceScore}% match</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{r.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <SectionTitle title="Learning progress" subtitle="Enrollment and completion tracking" />
          {enrollments.length === 0 ? (
            <Empty label="You are not enrolled in any training yet." />
          ) : (
            <ul className="space-y-4">
              {enrollments.map((e) => (
                <li key={e.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{e.programTitle}</span>
                    <span className="text-xs text-slate-500">{e.status.replace("_", " ")}</span>
                  </div>
                  <div className="mt-1"><Progress value={e.progressPercent} /></div>
                </li>
              ))}
            </ul>
          )}

          <SectionTitle title="Recent assessments" subtitle="Automated proficiency derivation" />
          {attempts.length === 0 ? (
            <Empty label="No assessment attempts yet." />
          ) : (
            <ul className="space-y-2 text-sm">
              {attempts.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center justify-between">
                  <span>{a.assessmentTitle}</span>
                  <span className="font-semibold">
                    {a.percent}% · {a.derivedLevel}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <SectionTitle title="Mentorship" subtitle="Peer knowledge sharing" />
          {mentorships.length === 0 ? (
            <Empty label="No mentorship connections yet." />
          ) : (
            <ul className="space-y-2 text-sm">
              {mentorships.map((m) => (
                <li key={m.id} className="flex items-center justify-between">
                  <span>
                    {m.mentorName} → {m.menteeName} ({m.skillName})
                  </span>
                  <span className="badge bg-slate-100 text-slate-700">{m.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
