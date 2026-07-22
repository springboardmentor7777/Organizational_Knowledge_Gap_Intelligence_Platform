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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Organization Trend Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Workforce skill development, training completion rates, and organizational gap reduction trends over time.
        </p>
      </div>

      {/* Top KPI Cards (Reusing SummaryCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Analytics Insights Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-5 text-white shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">✨</span>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            AI Workforce Insights & Growth Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <span className="text-indigo-300 font-medium block mb-1">Best Performing Dept</span>
            <p className="text-xs font-bold text-emerald-400">{insights.bestPerformingDept}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <span className="text-indigo-300 font-medium block mb-1">Fastest Skill Growth</span>
            <p className="text-xs font-bold text-blue-300">{insights.fastestSkillGrowth}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <span className="text-indigo-300 font-medium block mb-1">Immediate Training Need</span>
            <p className="text-xs font-bold text-red-400">{insights.deptNeedingTraining}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <span className="text-indigo-300 font-medium block mb-1">Most Improved Skill</span>
            <p className="text-xs font-bold text-amber-300">{insights.mostImprovedSkill}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <span className="text-indigo-300 font-medium block mb-1">Highest Remaining Gap</span>
            <p className="text-xs font-bold text-purple-300">{insights.highestRemainingGap}</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Department
          </label>
          <select
            id="dash-dept-filter"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Time Period Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Time Period
          </label>
          <select
            id="dash-period-filter"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>

        {/* Skill Category Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Skill Category
          </label>
          <select
            id="dash-cat-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2x2 Trend Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Monthly Skill Improvement (Line Chart) */}
        <LineChart data={skillImprovement} title="1. Monthly Skill Improvement Trend (%)" />

        {/* 2. Gap Reduction Trend (Area Chart) */}
        <AreaChart data={gapReduction} title="2. Critical Gap Reduction Trend" />

        {/* 3. Training Completion by Department (Bar Chart) */}
        <BarChart data={deptTraining} title="3. Training Completion by Department (%)" />

        {/* 4. Skill Distribution by Category (Pie Chart) */}
        <PieChart data={skillDistribution} title="4. Skill Distribution by Category (%)" />
      </div>
    </div>
  );
}
