import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../api/client";
import Heatmap from "../components/Heatmap";
import { Loader, SectionTitle, Stat } from "../components/Ui";

const COLORS = ["#0f766e", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Analytics() {
  const [manager, setManager] = useState(null);
  const [org, setOrg] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/dashboard/manager").then(({ data }) => setManager(data)).catch(() => {});
    api
      .get("/api/dashboard/organization")
      .then(({ data }) => setOrg(data))
      .catch(() => setError("Organisation analytics unavailable for your role."));
  }, []);

  if (!manager && !org) return <Loader label="Aggregating workforce analytics…" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics & reports</h1>
        <p className="text-sm text-slate-500">
          Team gap heatmaps, training adoption, completion rates and organisation-wide gap intelligence.
        </p>
      </div>

      {manager && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label={`${manager.department} readiness`} value={manager.departmentReadiness} suffix="%" />
            <Stat label="Critical gaps" value={manager.criticalGaps} tone="danger" />
            <Stat label="Training adoption" value={manager.trainingAdoptionPercent} suffix="%" tone="warn" />
            <Stat label="Team size" value={manager.members.length} tone="slate" />
          </div>

          <section className="card">
            <SectionTitle title="Team gap heatmap" subtitle="Average gap per employee and skill" />
            <Heatmap cells={manager.heatmap} />
          </section>

          <section className="card">
            <SectionTitle title="Individual progress snapshots" />
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2">Employee</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Readiness</th>
                  <th className="py-2">Critical gaps</th>
                  <th className="py-2">Courses in progress</th>
                </tr>
              </thead>
              <tbody>
                {manager.members.map((m) => (
                  <tr key={m.userId} className="border-t border-slate-100">
                    <td className="py-2 font-medium">{m.fullName}</td>
                    <td className="py-2 text-slate-500">{m.jobRole}</td>
                    <td className="py-2 font-semibold">{m.readinessPercent}%</td>
                    <td className="py-2">{m.criticalGaps}</td>
                    <td className="py-2">{m.coursesInProgress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {error && <p className="text-sm text-slate-500">{error}</p>}

      {org && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Employees" value={org.totalEmployees} tone="slate" />
            <Stat label="Org readiness" value={org.orgReadiness} suffix="%" />
            <Stat label="Completion rate" value={org.completionRate} suffix="%" tone="warn" />
            <Stat label="Avg assessment score" value={org.avgSkillImprovement} suffix="%" tone="slate" />
          </div>

          <section className="card">
            <SectionTitle title="Top organisational skill gaps" subtitle="Average gap across all employees" />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={org.topSkillGaps.slice(0, 8)} margin={{ bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="skill" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="averageGap" name="Average gap" fill="#0f766e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="card">
              <SectionTitle title="Department readiness" />
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2">Department</th>
                    <th className="py-2">Readiness</th>
                    <th className="py-2">Critical gaps</th>
                  </tr>
                </thead>
                <tbody>
                  {org.departments.map((d) => (
                    <tr key={d.department} className="border-t border-slate-100">
                      <td className="py-2 font-medium">{d.department}</td>
                      <td className="py-2 font-semibold">{d.readinessPercent}%</td>
                      <td className="py-2">{d.criticalGaps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="card">
              <SectionTitle title="Training effectiveness by provider" />
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={org.trainingEffectiveness}
                      dataKey="enrollments"
                      nameKey="provider"
                      outerRadius={90}
                      label
                    >
                      {org.trainingEffectiveness.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {org.trainingEffectiveness.map((t) => (
                  <li key={t.provider}>
                    {t.provider}: {t.completions}/{t.enrollments} completed ({t.completionRate}%)
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
