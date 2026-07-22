import { useState, useEffect } from 'react';
import { getGapSummary, getGapDetails } from '../../services/gapAnalysisService';
import SummaryCard   from '../../components/dashboard/SummaryCard';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

function SeverityBadge({ severity }) {
  const SEVERITY_STYLES = {
    Critical: 'bg-red-100 text-red-700 border-red-200',
    High:     'bg-orange-100 text-orange-700 border-orange-200',
    Medium:   'bg-amber-100 text-amber-800 border-amber-200',
    Low:      'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const style = SEVERITY_STYLES[severity] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}
    >
      {severity}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const PRIORITY_STYLES = {
    Critical: 'text-red-700 font-bold',
    High:     'text-orange-600 font-semibold',
    Medium:   'text-amber-700 font-medium',
    Low:      'text-emerald-700 font-medium',
  };

  return (
    <span className={`text-xs ${PRIORITY_STYLES[priority] || 'text-gray-600'}`}>
      {priority}
    </span>
  );
}

const GAP_COLUMNS = [
  { label: 'Employee Name',       key: 'employee' },
  { label: 'Department',          key: 'department' },
  { label: 'Overall Skill Score', key: 'overallSkillScore' },
  { label: 'Gap Score',           key: 'gapScore' },
  { label: 'Gap Severity',        key: 'gapSeverity' },
  { label: 'Priority',            key: 'priority' },
  { label: 'Missing Skills',      key: 'missingSkills' },
];

export default function GapAnalysis() {
  const [summary, setSummary]       = useState(null);
  const [details, setDetails]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error,   setError]         = useState(null);

  const [search, setFilterSearch]            = useState('');
  const [deptFilter, setDeptFilter]          = useState('All');
  const [severityFilter, setSeverityFilter]  = useState('All');
  const [sortBy, setSortBy]                  = useState('gap_desc');

  function fetchAll() {
    setLoading(true);
    setError(null);
    Promise.all([getGapSummary(), getGapDetails()])
      .then(([sum, det]) => {
        setSummary(sum);
        setDetails(det);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load gap analysis data.');
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <LoadingScreen message="Loading Gap Analysis Dashboard…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchAll} />;

  const departments = ['All', ...new Set(details.map((d) => d.department))];
  const severities  = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filtered = details.filter((item) => {
    const matchesSearch = item.employee.toLowerCase().includes(search.toLowerCase());
    const matchesDept   = deptFilter === 'All' || item.department === deptFilter;
    const matchesSev    = severityFilter === 'All' || item.gapSeverity === severityFilter;
    return matchesSearch && matchesDept && matchesSev;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'gap_desc') {
      return (b.gapScore || b.gap || 0) - (a.gapScore || a.gap || 0);
    }
    if (sortBy === 'gap_asc') {
      return (a.gapScore || a.gap || 0) - (b.gapScore || b.gap || 0);
    }
    if (sortBy === 'name_asc') {
      return a.employee.localeCompare(b.employee);
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gap Analysis Intelligence</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor organizational skill deficiencies, risk severities, and high-priority learning needs.
        </p>
      </div>

      {/* Summary KPI Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SummaryCard
            title="Total Analysed"
            value={summary.totalEmployeesAnalysed ?? summary.totalEmployees ?? 0}
            subtext="Active workforce"
            icon="👥"
            accent="blue"
          />
          <SummaryCard
            title="Critical Gaps"
            value={summary.criticalGaps ?? summary.highPriorityGaps ?? 0}
            subtext="Requires urgent training"
            icon="🚨"
            accent="red"
          />
          <SummaryCard
            title="Avg Skill Score"
            value={summary.avgSkillScore ? `${summary.avgSkillScore} / 5` : '3.2 / 5'}
            subtext="Current competency"
            icon="🎯"
            accent="purple"
          />
          <SummaryCard
            title="Avg Gap Score"
            value={summary.avgGapScore ? summary.avgGapScore : '1.45'}
            subtext="Deficiency index"
            icon="📉"
            accent="amber"
          />
        </div>
      )}

      {/* Export Toolbar */}
      <ExportToolbar
        data={sorted}
        columns={GAP_COLUMNS}
        filename="gap_analysis_report"
        title="Export Gap Analysis Report"
      />

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            id="gap-search-input"
            type="text"
            placeholder="Search by employee name…"
            value={search}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Dept:</span>
            <select
              id="gap-dept-select"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Severity:</span>
            <select
              id="gap-severity-select"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Sort:</span>
            <select
              id="gap-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
            >
              <option value="gap_desc">Highest Gap Score</option>
              <option value="gap_asc">Lowest Gap Score</option>
              <option value="name_asc">Employee Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Gap Table / Empty State */}
      {sorted.length === 0 ? (
        <EmptyState
          title="No employee gap records found"
          message="Try clearing or adjusting your search, department, or severity filters."
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Overall Skill Score
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Gap Score
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Gap Severity
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Skills Missing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((item) => {
                  const missingList = Array.isArray(item.missingSkills)
                    ? item.missingSkills
                    : item.missingSkill
                    ? [item.missingSkill]
                    : [];

                  const skillScore = item.overallSkillScore ?? (item.currentLevel ? item.currentLevel : 2.5);
                  const gapScore   = item.gapScore ?? item.gap ?? 1.5;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/40 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        {item.employee}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {item.department}
                      </td>
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <span className="font-semibold text-gray-700">
                          {typeof skillScore === 'number' ? skillScore.toFixed(1) : skillScore}
                        </span>
                        <span className="text-xs text-gray-400"> / 5.0</span>
                      </td>
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">
                          {typeof gapScore === 'number' ? gapScore.toFixed(1) : gapScore}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <SeverityBadge severity={item.gapSeverity || 'Medium'} />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <PriorityBadge priority={item.priority || 'Medium'} />
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {missingList.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 text-xs text-gray-500 flex justify-between items-center">
            <span>Showing {sorted.length} of {details.length} records</span>
            {sorted.length < details.length && (
              <span className="text-blue-600 font-medium">Filtered results active</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
