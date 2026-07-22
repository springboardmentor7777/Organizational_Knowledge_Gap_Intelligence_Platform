import { useState, useEffect } from 'react';
import { getCompetencyMatrix } from '../../services/competencyService';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const STATUS_BADGE = {
  'Met':         'bg-green-100  text-green-700',
  'Low Gap':     'bg-blue-100   text-blue-700',
  'Medium Gap':  'bg-yellow-100 text-yellow-700',
  'High Gap':    'bg-red-100    text-red-700',
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

  if (loading) return <LoadingScreen message="Loading competency matrix…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Competency Matrix</h1>
        <span className="text-sm text-gray-400">{matrix.length} entries</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          id="comp-dept-filter"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {DEPT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          id="comp-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {['All', 'Met', 'Low Gap', 'Medium Gap', 'High Gap'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No entries found" message="Adjust the department or status filter." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Department', 'Skill', 'Required Level', 'Avg Current Level', 'Gap', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{row.department}</td>
                  <td className="px-4 py-3 text-gray-700">{row.skill}</td>
                  <td className="px-4 py-3 text-gray-600 text-center">{row.requiredLevel}</td>
                  <td className="px-4 py-3 text-gray-600 text-center">{row.avgCurrentLevel.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${row.gap === 0 ? 'text-green-600' : row.gap > 1 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {row.gap === 0 ? '—' : `−${row.gap.toFixed(2)}`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[row.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {row.status}
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
