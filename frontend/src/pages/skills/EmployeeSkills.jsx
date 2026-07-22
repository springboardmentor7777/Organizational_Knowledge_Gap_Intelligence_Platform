import { useState, useEffect } from 'react';
import { LEVEL_LABELS } from '../../services/skillService';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

// ── Mock employee-skill records ────────────────────────────────────────────────
const MOCK_EMPLOYEE_SKILLS = [
  { id:  1, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'React',             currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id:  2, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'Node.js',           currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id:  3, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'Docker',            currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id:  4, employee: 'David Chen',     department: 'Engineering',     skill: 'React',             currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
  { id:  5, employee: 'David Chen',     department: 'Engineering',     skill: 'Docker',            currentLevel: 1, requiredLevel: 3, gapStatus: 'High Gap' },
  { id:  6, employee: 'David Chen',     department: 'Engineering',     skill: 'Node.js',           currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id:  7, employee: 'Grace Kim',      department: 'Engineering',     skill: 'React',             currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id:  8, employee: 'Grace Kim',      department: 'Engineering',     skill: 'TypeScript',        currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id:  9, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Python',            currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 10, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Machine Learning',  currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id: 11, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Power BI',          currentLevel: 1, requiredLevel: 3, gapStatus: 'High Gap' },
  { id: 12, employee: 'Henry Brown',    department: 'Data Science',    skill: 'TensorFlow',        currentLevel: 4, requiredLevel: 3, gapStatus: 'Met' },
  { id: 13, employee: 'Henry Brown',    department: 'Data Science',    skill: 'Python',            currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id: 14, employee: 'Eva Patel',      department: 'Marketing',       skill: 'SEO',               currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id: 15, employee: 'James Wilson',   department: 'Marketing',       skill: 'Brand Strategy',    currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id: 16, employee: 'Frank Thompson', department: 'Finance',         skill: 'Excel',             currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 17, employee: 'Frank Thompson', department: 'Finance',         skill: 'Financial Modeling',currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 18, employee: 'Carol Williams', department: 'Human Resources', skill: 'Communication',     currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id: 19, employee: 'Carol Williams', department: 'Human Resources', skill: 'Leadership',        currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id: 20, employee: 'Carol Williams', department: 'Human Resources', skill: 'Project Management',currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
  { id: 21, employee: 'Irene Lopez',    department: 'Operations',      skill: 'Process Management',currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
];

function getEmployeeSkills() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_EMPLOYEE_SKILLS]), 500);
  });
}

// ── Derived filter lists ──────────────────────────────
const ALL_DEPARTMENTS = ['All', ...new Set(MOCK_EMPLOYEE_SKILLS.map((r) => r.department))];
const ALL_SKILLS      = ['All', ...new Set(MOCK_EMPLOYEE_SKILLS.map((r) => r.skill))];

const GAP_BADGE = {
  'Met':      'bg-green-100  text-green-700',
  'Gap':      'bg-yellow-100 text-yellow-700',
  'High Gap': 'bg-red-100    text-red-700',
};

export default function EmployeeSkills() {
  const [records,    setRecords]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [search,     setSearch]     = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [skillFilter,setSkillFilter]= useState('All');

  function fetchData() {
    setLoading(true);
    setError(null);
    getEmployeeSkills()
      .then((data) => { setRecords(data); setLoading(false); })
      .catch((err)  => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = records.filter((r) => {
    const matchSearch = r.employee.toLowerCase().includes(search.toLowerCase());
    const matchDept   = deptFilter   === 'All' || r.department === deptFilter;
    const matchSkill  = skillFilter  === 'All' || r.skill      === skillFilter;
    return matchSearch && matchDept && matchSkill;
  });

  if (loading) return <LoadingScreen message="Loading employee skills…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Employee Skills</h1>
        <span className="text-sm text-gray-400">{records.length} records</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          id="emp-skill-search"
          type="text"
          placeholder="Search by employee…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-52 transition"
        />
        <select
          id="emp-dept-filter"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {ALL_DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          id="emp-skill-filter"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {ALL_SKILLS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No records found" message="Try adjusting your search or filters." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Employee', 'Department', 'Skill', 'Current Level', 'Required Level', 'Gap Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{r.employee}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.department}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.skill}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {LEVEL_LABELS[r.currentLevel]} ({r.currentLevel})
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {LEVEL_LABELS[r.requiredLevel]} ({r.requiredLevel})
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${GAP_BADGE[r.gapStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                      {r.gapStatus}
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
