import { useState, useEffect } from 'react';
import { getGapSummary, getGapDetails } from '../../services/gapAnalysisService';
import SummaryCard   from '../../components/dashboard/SummaryCard';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

function SeverityBadge({ severity }) {
  const SEVERITY_STYLES = {
    Critical: 'badge-danger',
    High:     'badge-orange',
    Medium:   'badge-warning',
    Low:      'badge-success',
  };

  return (
    <span className={SEVERITY_STYLES[severity] || 'badge-neutral'}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        severity === 'Critical' ? 'bg-red-500' : severity === 'High' ? 'bg-orange-500' : severity === 'Medium' ? 'bg-amber-400' : 'bg-emerald-500'
      }`}></span>
      {severity}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const PRIORITY_STYLES = {
    Critical: 'text-red-700 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]',
    High:     'text-orange-700 font-semibold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded text-[11px]',
    Medium:   'text-amber-700 font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px]',
    Low:      'text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]',
  };

  return (
    <span className={PRIORITY_STYLES[priority] || 'text-slate-600 font-medium text-xs'}>
      {priority} Priority
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

  if (loading) return <LoadingScreen message="Loading Gap Analysis Intelligence Dashboard…" />;
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

  // Calculate severity breakdown count
  const criticalCount = details.filter(d => d.gapSeverity === 'Critical').length;
  const highCount     = details.filter(d => d.gapSeverity === 'High').length;
  const mediumCount   = details.filter(d => d.gapSeverity === 'Medium').length;
  const lowCount      = details.filter(d => d.gapSeverity === 'Low').length;

  return (
    <div className="page-container">

      {/* ── Page Header ─────────────────────────────── */}
      <div className="page-header-row">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-header-title">Knowledge Gap Intelligence</h1>
            <span className="badge-danger text-[11px] font-bold">AI Diagnostics</span>
          </div>
          <p className="page-header-subtitle">
            Identify workforce skill deficiencies, risk severities, and high-priority learning interventions.
          </p>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────── */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <SummaryCard
            title="Analysed Workforce"
            value={summary.totalEmployeesAnalysed ?? summary.totalEmployees ?? 0}
            subtext="Active employee profiles"
            icon="👥"
            accent="blue"
          />
          <SummaryCard
            title="Critical Deficiencies"
            value={summary.criticalGaps ?? summary.highPriorityGaps ?? 0}
            subtext="Requires immediate action"
            icon="🚨"
            accent="red"
          />
          <SummaryCard
            title="Avg Competency Score"
            value={summary.avgSkillScore ? `${summary.avgSkillScore} / 5` : '3.2 / 5'}
            subtext="Target: 4.0 / 5.0"
            icon="🎯"
            accent="purple"
          />
          <SummaryCard
            title="Avg Deficiency Index"
            value={summary.avgGapScore ? summary.avgGapScore : '1.45'}
            subtext="Lower score is better"
            icon="📉"
            accent="amber"
          />
        </div>
      )}

      {/* ── Severity Risk Distribution Bar Card ─────────── */}
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="section-title">Organizational Risk Severity Distribution</h2>
            <p className="section-subtitle">Real-time breakdown of skill gaps by risk level</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{details.length} total records</span>
        </div>

        {/* Visual Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 mb-4">
          <div style={{ width: `${(criticalCount/details.length)*100}%` }} className="bg-red-500 h-full title='Critical'" />
          <div style={{ width: `${(highCount/details.length)*100}%` }} className="bg-orange-400 h-full title='High'" />
          <div style={{ width: `${(mediumCount/details.length)*100}%` }} className="bg-amber-400 h-full title='Medium'" />
          <div style={{ width: `${(lowCount/details.length)*100}%` }} className="bg-emerald-500 h-full title='Low'" />
        </div>

        {/* Legend pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-red-50/60 rounded-lg border border-red-100">
            <span className="flex items-center gap-1.5 font-semibold text-red-700">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical
            </span>
            <span className="font-extrabold text-red-900">{criticalCount} ({Math.round((criticalCount/details.length)*100)}%)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-orange-50/60 rounded-lg border border-orange-100">
            <span className="flex items-center gap-1.5 font-semibold text-orange-700">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span> High Risk
            </span>
            <span className="font-extrabold text-orange-900">{highCount} ({Math.round((highCount/details.length)*100)}%)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
            <span className="flex items-center gap-1.5 font-semibold text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Medium
            </span>
            <span className="font-extrabold text-amber-900">{mediumCount} ({Math.round((mediumCount/details.length)*100)}%)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low Gap
            </span>
            <span className="font-extrabold text-emerald-900">{lowCount} ({Math.round((lowCount/details.length)*100)}%)</span>
          </div>
        </div>
      </div>

      {/* ── Export Toolbar ───────────────────────────── */}
      <ExportToolbar
        data={sorted}
        columns={GAP_COLUMNS}
        filename="gap_analysis_report"
        title="Export Gap Analysis Report"
      />

      {/* ── Filters Bar ──────────────────────────────── */}
      <div className="filter-bar flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        <div className="search-input-wrapper flex-1 min-w-[200px]">
          <svg className="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="gap-search-input"
            type="text"
            placeholder="Search by employee name…"
            value={search}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>Dept:</span>
          <select
            id="gap-dept-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="form-select text-sm w-auto py-1.5"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>Severity:</span>
          <select
            id="gap-severity-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="form-select text-sm w-auto py-1.5"
          >
            {severities.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>Sort:</span>
          <select
            id="gap-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select text-sm w-auto py-1.5"
          >
            <option value="gap_desc">Highest Gap Score</option>
            <option value="gap_asc">Lowest Gap Score</option>
            <option value="name_asc">Employee Name</option>
          </select>
        </div>
      </div>

      {/* ── Table / Empty State ──────────────────────── */}
      {sorted.length === 0 ? (
        <EmptyState
          title="No employee gap records found"
          message="Try clearing or adjusting your search, department, or severity filters."
        />
      ) : (
        <div className="data-table-wrapper">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead className="table-head">
                <tr>
                  <th className="table-th">Employee Name</th>
                  <th className="table-th">Department</th>
                  <th className="table-th-center">Skill Competency</th>
                  <th className="table-th-center">Gap Score</th>
                  <th className="table-th">Severity</th>
                  <th className="table-th">Priority</th>
                  <th className="table-th">Missing Skills</th>
                </tr>
              </thead>
              <tbody className="table-tbody">
                {sorted.map((item) => {
                  const missingList = Array.isArray(item.missingSkills)
                    ? item.missingSkills
                    : item.missingSkill
                    ? [item.missingSkill]
                    : [];

                  const rawScore  = item.overallSkillScore ?? (item.currentLevel ? item.currentLevel : 2.5);
                  const numScore  = typeof rawScore === 'number' ? rawScore : parseFloat(rawScore) || 2.5;
                  const gapScore  = item.gapScore ?? item.gap ?? 1.5;

                  return (
                    <tr key={item.id} className={item.gapSeverity === 'Critical' ? 'table-row-highlight' : 'table-row'}>
                      <td className="table-td-primary whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="avatar-sm text-[10px]">
                            {item.employee.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <span>{item.employee}</span>
                        </div>
                      </td>
                      <td className="table-td whitespace-nowrap">
                        <span className="chip-slate">{item.department}</span>
                      </td>
                      <td className="table-td text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1 min-w-[100px]">
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                            <span>{numScore.toFixed(1)}</span>
                            <span className="text-slate-400 font-normal">/ 5.0</span>
                          </div>
                          <div className="progress-track w-20">
                            <div
                              className={`progress-fill ${numScore >= 4 ? 'bg-emerald-500' : numScore >= 3 ? 'bg-blue-500' : 'bg-amber-400'}`}
                              style={{ width: `${(numScore/5)*100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="table-td text-center whitespace-nowrap">
                        <span className={`font-extrabold px-2.5 py-1 rounded-lg text-xs ${
                          gapScore > 2 ? 'bg-red-100 text-red-800' : gapScore > 1 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {typeof gapScore === 'number' ? gapScore.toFixed(1) : gapScore}
                        </span>
                      </td>
                      <td className="table-td whitespace-nowrap">
                        <SeverityBadge severity={item.gapSeverity || 'Medium'} />
                      </td>
                      <td className="table-td whitespace-nowrap">
                        <PriorityBadge priority={item.priority || 'Medium'} />
                      </td>
                      <td className="table-td max-w-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {missingList.map((skill, idx) => (
                            <span key={idx} className="chip">{skill}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing {sorted.length} of {details.length} records</span>
            {sorted.length < details.length && (
              <span className="text-blue-600 font-semibold">Filter active</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
