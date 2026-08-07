import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../api/client";
import Heatmap from "../components/Heatmap";
import { Loader, SectionTitle, SeverityBadge, Stat } from "../components/Ui";

export default function GapAnalysis() {
  const [summary, setSummary] = useState(null);
  const [cells, setCells] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    api.get("/api/gaps/me").then(({ data }) => setSummary(data));
  }, []);

  useEffect(() => {
    api
      .get("/api/gaps/heatmap", { params: department ? { department } : {} })
      .then(({ data }) => setCells(data));
  }, [department]);

  if (!summary) return <Loader label="Running gap analysis…" />;

  const chartData = summary.gaps.map((g) => ({
    skill: g.skillName,
    current: g.currentLevel === "UNAWARE" ? 0 : ["UNAWARE", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].indexOf(g.currentLevel),
    required: ["UNAWARE", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].indexOf(g.requiredLevel),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Knowledge gap analysis</h1>
        <p className="text-sm text-slate-500">
          Individual vs. role requirements, plus team and department aggregation with severity scoring.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Role readiness" value={summary.readinessPercent} suffix="%" />
        <Stat label="Critical gaps" value={summary.criticalGaps} tone="danger" />
        <Stat label="Open gaps" value={summary.totalGaps} tone="warn" />
      </div>

      <section className="card">
        <SectionTitle title="Current vs. required proficiency" subtitle="0 = Unaware, 4 = Expert" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="skill" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 4]} allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Current" fill="#0f766e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="required" name="Required" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card">
        <SectionTitle title="Gap detail" subtitle="Severity-scored and risk-flagged" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Skill</th>
                <th className="py-2">Category</th>
                <th className="py-2">Current</th>
                <th className="py-2">Required</th>
                <th className="py-2">Gap</th>
                <th className="py-2">Severity</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {summary.gaps.map((g) => (
                <tr key={g.skillId} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{g.skillName}</td>
                  <td className="py-2 text-slate-500">{g.category}</td>
                  <td className="py-2">{g.currentLevel}</td>
                  <td className="py-2">{g.requiredLevel}</td>
                  <td className="py-2 font-semibold">{g.gap}</td>
                  <td className="py-2"><SeverityBadge severity={g.severity} /></td>
                  <td className="py-2">{g.severityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <SectionTitle
          title="Organisational gap heatmap"
          subtitle="Average gap per skill, by department (or by employee when a department is selected)"
          action={
            <select className="input max-w-xs" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">All departments</option>
              {["Engineering", "Analytics", "Human Resources", "IT"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          }
        />
        <Heatmap cells={cells} />
      </section>
    </div>
  );
}
