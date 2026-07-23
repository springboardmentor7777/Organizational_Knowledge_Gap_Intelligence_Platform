import { useState, useEffect } from 'react';
import { getOrganizationTrendAnalytics } from '../../services/analyticsService';
import SummaryCard   from '../../components/dashboard/SummaryCard';
import LineChart     from '../../components/charts/LineChart';
import AreaChart     from '../../components/charts/AreaChart';
import BarChart      from '../../components/charts/BarChart';
import PieChart      from '../../components/charts/PieChart';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

export default function Dashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Filters
  const [deptFilter, setDeptFilter]         = useState('All');
  const [timePeriod, setTimePeriod]         = useState('Monthly');
  const [categoryFilter, setCategoryFilter] = useState('All');

  function fetchData() {
    setLoading(true);
    setError(null);
    getOrganizationTrendAnalytics({ department: deptFilter, period: timePeriod, category: categoryFilter })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load organization trend analytics.');
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [deptFilter, timePeriod, categoryFilter]);

  if (loading) return <LoadingScreen message="Loading Organization Trend Analytics Dashboard…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchData} />;
  if (!data)   return <EmptyState title="No analytics data available" />;

  const { summary, skillImprovement, gapReduction, deptTraining, skillDistribution, insights } = data;

  const departments = ['All', 'Engineering', 'Data Science', 'Finance', 'Human Resources', 'Marketing', 'Operations'];
  const categories  = ['All', 'Technical', 'Data Science', 'Management', 'Finance', 'Marketing', 'Operations'];

  return (
    <div className="page-container">

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="page-header-row">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-header-title">Executive Analytics</h1>
            <span className="badge-info py-0.5 px-2.5 text-[11px] font-bold uppercase tracking-wider">Live System</span>
          </div>
          <p className="page-header-subtitle">
            Real-time workforce skill development, training completion rates, and organizational gap reduction trends.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-card text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Updated just now
          </div>
        </div>
      </div>

      {/* ── Metric Bar (Executive Summary) ─────────────── */}
      <div className="metric-row">
        <div className="metric-cell">
          <span className="metric-label">Organization Health</span>
          <div className="flex items-baseline justify-between">
            <span className="metric-value text-emerald-600">{summary.healthScore}%</span>
            <span className="metric-trend-up">↑ 4.2%</span>
          </div>
        </div>
        <div className="metric-cell">
          <span className="metric-label">Skill Growth Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="metric-value text-blue-600">+{summary.skillImprovementRate}%</span>
            <span className="metric-trend-up">↑ 2.1%</span>
          </div>
        </div>
        <div className="metric-cell">
          <span className="metric-label">Gap Reduction Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="metric-value text-indigo-600">-{summary.gapReductionRate}%</span>
            <span className="metric-trend-up">↓ 5.4%</span>
          </div>
        </div>
        <div className="metric-cell">
          <span className="metric-label">Course Pass Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="metric-value text-amber-600">{summary.trainingCompletionRate}%</span>
            <span className="metric-trend-up">↑ 1.8%</span>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <SummaryCard
          title="Organization Health"
          value={`${summary.healthScore}%`}
          subtext="+4.2% vs last period"
          icon="🛡️"
          accent="emerald"
        />
        <SummaryCard
          title="Skill Improvement Rate"
          value={`+${summary.skillImprovementRate}%`}
          subtext="MoM competency growth"
          icon="📈"
          accent="blue"
        />
        <SummaryCard
          title="Gap Reduction Rate"
          value={`-${summary.gapReductionRate}%`}
          subtext="Deficiency drop index"
          icon="📉"
          accent="purple"
        />
        <SummaryCard
          title="Training Completion"
          value={`${summary.trainingCompletionRate}%`}
          subtext="Active course pass rate"
          icon="🎓"
          accent="amber"
        />
      </div>

      {/* ── AI Insights Panel ────────────────────────────── */}
      <div className="insights-panel">
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-base">✨</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">AI Workforce Intelligence</h2>
              <p className="text-xs text-indigo-200">Automated organizational recommendations &amp; highlights</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/20">
            AI Engine v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
          <div className="insight-tile">
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-1">Top Dept</span>
            <p className="text-sm font-extrabold text-emerald-400 truncate">{insights.bestPerformingDept}</p>
          </div>
          <div className="insight-tile">
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-1">Fastest Growth</span>
            <p className="text-sm font-extrabold text-blue-300 truncate">{insights.fastestSkillGrowth}</p>
          </div>
          <div className="insight-tile">
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-1">Needs Training</span>
            <p className="text-sm font-extrabold text-red-400 truncate">{insights.deptNeedingTraining}</p>
          </div>
          <div className="insight-tile">
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-1">Most Improved</span>
            <p className="text-sm font-extrabold text-amber-300 truncate">{insights.mostImprovedSkill}</p>
          </div>
          <div className="insight-tile">
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-1">Highest Gap</span>
            <p className="text-sm font-extrabold text-purple-300 truncate">{insights.highestRemainingGap}</p>
          </div>
        </div>
      </div>

      {/* ── Filters Bar ──────────────────────────────────── */}
      <div className="filter-bar-grid">
        <div>
          <label className="form-label" htmlFor="dash-dept-filter">Department</label>
          <select
            id="dash-dept-filter"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="form-select text-sm py-2"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="dash-period-filter">Time Period</label>
          <select
            id="dash-period-filter"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="form-select text-sm py-2"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>

        <div>
          <label className="form-label" htmlFor="dash-cat-filter">Skill Category</label>
          <select
            id="dash-cat-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select text-sm py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── 2×2 Trend Charts Grid ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 hover:shadow-card-hover transition-all">
          <LineChart data={skillImprovement} title="1. Monthly Skill Improvement Trend (%)" />
        </div>
        <div className="card p-5 hover:shadow-card-hover transition-all">
          <AreaChart data={gapReduction} title="2. Critical Gap Reduction Trend" />
        </div>
        <div className="card p-5 hover:shadow-card-hover transition-all">
          <BarChart data={deptTraining} title="3. Training Completion by Department (%)" />
        </div>
        <div className="card p-5 hover:shadow-card-hover transition-all">
          <PieChart data={skillDistribution} title="4. Skill Distribution by Category (%)" />
        </div>
      </div>
    </div>
  );
}
