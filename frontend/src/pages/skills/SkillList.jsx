import { useState, useEffect } from 'react';
import { getSkills, LEVEL_LABELS } from '../../services/skillService';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const CATEGORIES = ['All', 'Technical', 'Data Science', 'Soft Skills', 'Management', 'Finance', 'Marketing'];

const LEVEL_BADGE = {
  1: 'bg-gray-100   text-gray-600',
  2: 'bg-slate-100  text-slate-600',
  3: 'bg-blue-100   text-blue-700',
  4: 'bg-purple-100 text-purple-700',
  5: 'bg-amber-100  text-amber-700',
};

const SKILL_COLUMNS = [
  { label: 'Skill Name',     key: 'name' },
  { label: 'Category',       key: 'category' },
  { label: 'Description',    key: 'description' },
  { label: 'Required Level', key: 'requiredLevel' },
];

export default function SkillList() {
  const [skills,   setSkills]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  function fetchSkills() {
    setLoading(true);
    setError(null);
    getSkills()
      .then((data) => { setSkills(data); setLoading(false); })
      .catch((err)  => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchSkills(); }, []);

  const filtered = skills.filter((s) => {
    const matchSearch   = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || s.category === category;
    return matchSearch && matchCategory;
  });

  if (loading) return <LoadingScreen message="Loading skills…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchSkills} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Skills Catalog</h1>
        <span className="text-sm text-gray-400">{skills.length} total</span>
      </div>

      {/* Export Toolbar */}
      <ExportToolbar
        data={filtered}
        columns={SKILL_COLUMNS}
        filename="skills_catalog_report"
        title="Export Skills Catalog"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="skill-search"
          type="text"
          placeholder="Search by skill name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition"
        />
        <select
          id="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No skills found" message="Adjust your search or category filter." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Skill Name', 'Category', 'Description', 'Required Level'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{skill.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs">{skill.description}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_BADGE[skill.requiredLevel] ?? 'bg-gray-100 text-gray-600'}`}>
                      {LEVEL_LABELS[skill.requiredLevel]} ({skill.requiredLevel})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
