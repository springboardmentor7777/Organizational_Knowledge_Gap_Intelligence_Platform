import { useEffect, useState } from "react";
import api from "../api/client";
import { SectionTitle, Loader } from "../components/Ui";

const LEVELS = ["UNAWARE", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

export default function SkillProfile() {
  const [skills, setSkills] = useState([]);
  const [mine, setMine] = useState([]);
  const [saving, setSaving] = useState(null);

  const load = () => {
    Promise.all([api.get("/api/skills"), api.get("/api/me/skills")]).then(([a, b]) => {
      setSkills(a.data);
      setMine(b.data);
    });
  };

  useEffect(load, []);

  const levelOf = (skillId) => mine.find((m) => m.skillId === skillId)?.level || "UNAWARE";
  const sourceOf = (skillId) => mine.find((m) => m.skillId === skillId)?.source;

  const update = async (skillId, level) => {
    setSaving(skillId);
    await api.put("/api/me/skills", { skillId, level, source: "SELF" });
    setSaving(null);
    load();
  };

  if (!skills.length) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My skill inventory</h1>
        <p className="text-sm text-slate-500">
          Self-assess your proficiency. Assessment results and completed training override these values automatically.
        </p>
      </div>

      <section className="card">
        <SectionTitle title="Skill self-assessment" subtitle="Unaware → Beginner → Intermediate → Advanced → Expert" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-2">Skill</th>
                <th className="py-2">Category</th>
                <th className="py-2">Proficiency</th>
                <th className="py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{s.name}</td>
                  <td className="py-2 text-slate-500">{s.category}</td>
                  <td className="py-2">
                    <select
                      className="input max-w-[180px]"
                      value={levelOf(s.id)}
                      disabled={saving === s.id}
                      onChange={(e) => update(s.id, e.target.value)}
                    >
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 text-xs text-slate-500">{sourceOf(s.id) || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
