import { useState, useEffect } from 'react';
import { LEVEL_LABELS, getEmployeeSkills } from '../../services/skillService';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const GAP_BADGE = {
  'Met':      'badge-success',
  'Gap':      'badge-warning',
  'High Gap': 'badge-danger',
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

  const allDepartments = ['All', ...new Set(records.map((r) => r.department))];
  const allSkills      = ['All', ...new Set(records.map((r) => r.skill))];

  return (
    <div className="page-container">
      {/* ── Header ─────────────────────────────────── */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Employee Skills</h1>
          <p className="page-header-subtitle">Skill assignments, levels, and gap status by employee</p>
        </div>
        <span className="count-badge">{records.length} records</span>
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="filter-bar flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="emp-skill-search"
            type="text"
            placeholder="Search by employee…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>
        <select
          id="emp-dept-filter"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="form-select w-auto"
        >
          {allDepartments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          id="emp-skill-filter"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="form-select w-auto"
        >
          {allSkills.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState title="No records found" message="Try adjusting your search or filters." />
      ) : (
        <div className="data-table-wrapper">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-head">
                <tr>
                  {['Employee', 'Department', 'Skill', 'Current Level', 'Required Level', 'Gap Status'].map((h) => (
                    <th key={h} className="table-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-tbody">
                {filtered.map((r) => (
                  <tr key={r.id} className="table-row">
                    <td className="table-td-primary whitespace-nowrap">{r.employee}</td>
                    <td className="table-td whitespace-nowrap">
                      <span className="chip-slate">{r.department}</span>
                    </td>
                    <td className="table-td text-slate-700 whitespace-nowrap">{r.skill}</td>
                    <td className="table-td text-slate-600">
                      {LEVEL_LABELS[r.currentLevel]} ({r.currentLevel})
                    </td>
                    <td className="table-td text-slate-600">
                      {LEVEL_LABELS[r.requiredLevel]} ({r.requiredLevel})
                    </td>
                    <td className="table-td">
                      <span className={GAP_BADGE[r.gapStatus] ?? 'badge-neutral'}>
                        {r.gapStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing {filtered.length} of {records.length} records</span>
            {filtered.length < records.length && (
              <span className="text-blue-600 font-semibold">Filter active</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
