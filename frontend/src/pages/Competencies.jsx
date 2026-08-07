import { useEffect, useState } from "react";
import api from "../api/client";
import { SectionTitle, Loader } from "../components/Ui";

export default function Competencies() {
  const [rows, setRows] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    api.get("/api/competencies").then(({ data }) => setRows(data));
  }, []);

  if (!rows) return <Loader />;

  const roles = [...new Set(rows.map((r) => r.jobRole))];
  const filtered = role ? rows.filter((r) => r.jobRole === role) : rows;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Competency framework</h1>
        <p className="text-sm text-slate-500">
          Required proficiency per role and department — the benchmark every gap calculation uses.
        </p>
      </div>

      <section className="card">
        <SectionTitle
          title="Role benchmarks"
          action={
            <select className="input max-w-xs" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          }
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Job role</th>
                <th className="py-2">Department</th>
                <th className="py-2">Skill</th>
                <th className="py-2">Required level</th>
                <th className="py-2">Business criticality</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{r.jobRole}</td>
                  <td className="py-2 text-slate-500">{r.department}</td>
                  <td className="py-2">{r.skill?.name}</td>
                  <td className="py-2 font-semibold">{r.requiredLevel}</td>
                  <td className="py-2">
                    {r.critical ? (
                      <span className="badge bg-red-50 text-danger">Critical</span>
                    ) : (
                      <span className="badge bg-slate-100 text-slate-600">Standard</span>
                    )}
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
