import { useState, useEffect } from 'react';
import { getCompetencyMatrix } from '../../services/competencyService';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const STATUS_BADGE = {
  'Met':         'badge-success',
  'Low Gap':     'badge-info',
  'Medium Gap':  'badge-warning',
  'High Gap':    'badge-danger',
};

const DEPT_OPTIONS = [
  'All', 'Engineering', 'Data Science', 'Marketing', 'Finance', 'Human Resources', 'Operations',
];

export default function CompetencyMatrix() {
  const [matrix,     setMatrix]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  function fetchData() {
    setLoading(true);
    setError(null);
    getCompetencyMatrix()
      .then((data) => { setMatrix(data); setLoading(false); })
      .catch((err)  => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchData(); }, []);

  const filtered = matrix.filter((row) => {
    const matchDept   = deptFilter    === 'All' || row.department === deptFilter;
    const matchStatus = statusFilter  === 'All' || row.status     === statusFilter;
    return matchDept && matchStatus;
  });

  if (loading) return <LoadingScreen message="Loading departmental competency matrix…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div className="page-container">
      {/* ── Header ─────────────────────────────────── */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Competency Matrix</h1>
          <p className="page-header-subtitle">Department-level skill requirements vs. current workforce competency averages</p>
        </div>
        <span className="count-badge">{matrix.length} Matrix Matrix Entries</span>
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="filter-bar flex flex-wrap gap-3">
        <select
          id="comp-dept-filter"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="form-select w-auto"
        >
          {DEPT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          id="comp-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select w-auto"
        >
          {['All', 'Met', 'Low Gap', 'Medium Gap', 'High Gap'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState title="No entries found" message="Adjust the department or status filter." />
      ) : (
        <div className="data-table-wrapper">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th">Department</th>
                  <th className="table-th">Skill Name</th>
                  <th className="table-th-center">Target Level</th>
                  <th className="table-th-center">Current Avg</th>
                  <th className="table-th-center">Variance</th>
                  <th className="table-th">Status</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {filtered.map((row) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-td-primary whitespace-nowrap">
                      <span className="chip-slate">{row.department}</span>
                    </td>
                    <td className="table-td text-slate-900 font-semibold">{row.skill}</td>
                    <td className="table-td text-center text-slate-600 font-semibold">{row.requiredLevel}.0</td>
                    <td className="table-td text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-slate-800">{row.avgCurrentLevel.toFixed(1)}</span>
                        <div className="progress-track w-16">
                          <div
                            className={`progress-fill ${row.gap === 0 ? 'bg-emerald-500' : row.gap > 1 ? 'bg-red-500' : 'bg-amber-400'}`}
                            style={{ width: `${(row.avgCurrentLevel / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="table-td text-center">
                      <span className={`font-extrabold text-xs px-2 py-0.5 rounded ${
                        row.gap === 0 ? 'bg-emerald-50 text-emerald-700' : row.gap > 1 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {row.gap === 0 ? 'Optimal' : `−${row.gap.toFixed(2)}`}
                      </span>
                    </td>
                    <td className="table-td whitespace-nowrap">
                      <span className={STATUS_BADGE[row.status] ?? 'badge-neutral'}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing {filtered.length} of {matrix.length} entries</span>
            {filtered.length < matrix.length && (
              <span className="text-blue-600 font-semibold">Filter active</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
