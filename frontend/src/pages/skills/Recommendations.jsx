import { useState, useEffect } from 'react';
import { getRecommendations, getLearningPaths } from '../../services/recommendationService';
import SummaryCard   from '../../components/dashboard/SummaryCard';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const PROVIDER_CONFIG = {
  'Coursera':          { icon: '📘', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Udemy':             { icon: '🟣', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  'LinkedIn Learning': { icon: '🔗', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  'Internal LMS':      { icon: '🏢', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  'Google':            { icon: '🌐', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Google Cloud':      { icon: '☁️', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Linux Foundation':  { icon: '🐧', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  'PMI':               { icon: '📊', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

function PriorityBadge({ priority }) {
  const STYLES = {
    High:   'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Low:    'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STYLES[priority] || 'bg-gray-100 text-gray-700'}`}>
      {priority} Priority
    </span>
  );
}

function StepStatusBadge({ status }) {
  const CONFIG = {
    Completed:   { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '✓' },
    'In Progress':{ bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: '⏳' },
    Pending:     { bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: '🕒' },
    Locked:      { bg: 'bg-gray-100 text-gray-500 border-gray-200', icon: '🔒' },
  };

  const info = CONFIG[status] || CONFIG.Locked;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${info.bg}`}>
      <span>{info.icon}</span>
      <span>{status}</span>
    </span>
  );
}

function DifficultyBadge({ difficulty }) {
  const STYLES = {
    Beginner:     'bg-slate-100 text-slate-700',
    Intermediate: 'bg-indigo-100 text-indigo-700',
    Advanced:     'bg-violet-100 text-violet-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STYLES[difficulty] || 'bg-gray-100 text-gray-600'}`}>
      {difficulty}
    </span>
  );
}

function RecommendationCard({ rec }) {
  const providerInfo = PROVIDER_CONFIG[rec.provider] || { icon: '🎓', badge: 'bg-gray-100 text-gray-700 border-gray-200' };

  return (
    <div className="card-hover flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${providerInfo.badge}`}>
            <span>{providerInfo.icon}</span>
            <span>{rec.provider}</span>
          </span>
          <PriorityBadge priority={rec.priority} />
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-800 leading-snug hover:text-blue-600 transition-colors cursor-pointer">
            {rec.course}
          </h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Assigned to: <span className="text-gray-800 font-semibold">{rec.employee}</span> ({rec.department})
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-gray-600 flex items-center gap-1">
              <span>✨ AI Match Score</span>
            </span>
            <span className="font-extrabold text-blue-600">{rec.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                rec.score >= 90
                  ? 'bg-emerald-500'
                  : rec.score >= 75
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${rec.score}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <span>⏱️ Duration:</span>
            <span className="font-semibold text-gray-800">{rec.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Difficulty:</span>
            <DifficultyBadge difficulty={rec.difficulty} />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Target Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {rec.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5 text-emerald-800 font-medium flex items-start gap-1.5">
          <span className="shrink-0 text-sm">📈</span>
          <div>
            <span className="font-semibold block text-emerald-900 mb-0.5">Expected Impact</span>
            <span>{rec.expectedImprovement}</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 bg-slate-50 border border-slate-100 rounded-lg p-3 italic leading-relaxed">
          "{rec.reason}"
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-400">Status</span>
        <span
          className={`font-semibold px-2 py-0.5 rounded ${
            rec.status === 'Completed'
              ? 'text-emerald-700 bg-emerald-100'
              : rec.status === 'In Progress'
              ? 'text-blue-700 bg-blue-100'
              : 'text-gray-600 bg-gray-100'
          }`}
        >
          {rec.status}
        </span>
      </div>
    </div>
  );
}

function LearningPathCard({ path }) {
  return (
    <div className="card p-6 space-y-6 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{path.employee}</h3>
            <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-medium">
              {path.department}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Path Horizon: <span className="font-semibold text-gray-700">{path.currentLevel}</span> →{' '}
            <span className="font-semibold text-emerald-700">{path.targetLevel}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block">Est. Completion</span>
            <span className="text-sm font-bold text-gray-800">{path.estimatedTime}</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block">Overall Progress</span>
            <span className="text-sm font-extrabold text-blue-600">{path.progress}%</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${path.progress}%` }}
        />
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
        {path.steps.map((step, idx) => {
          const providerInfo = PROVIDER_CONFIG[step.provider] || { icon: '📖', badge: 'bg-gray-100 text-gray-700' };

          return (
            <div key={idx} className="relative group">
              <div
                className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all shadow-sm ${
                  step.status === 'Completed'
                    ? 'bg-emerald-500 ring-4 ring-emerald-50'
                    : step.status === 'In Progress'
                    ? 'bg-blue-500 ring-4 ring-blue-50 animate-pulse'
                    : step.status === 'Pending'
                    ? 'bg-amber-400 ring-4 ring-amber-50'
                    : 'bg-gray-300 ring-4 ring-gray-50'
                }`}
              >
                {step.status === 'Completed' ? '✓' : step.status === 'Locked' ? '🔒' : step.stepNumber}
              </div>

              <div className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-4 space-y-2 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {step.title}
                    </span>
                    <StepStatusBadge status={step.status} />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">⏱️ {step.duration}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-sm font-bold text-gray-800">{step.courseName}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded border ${providerInfo.badge}`}>
                    {providerInfo.icon} {step.provider}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const REC_COLUMNS = [
  { label: 'Employee Name',        key: 'employee' },
  { label: 'Department',           key: 'department' },
  { label: 'Recommended Course',   key: 'course' },
  { label: 'Provider',             key: 'provider' },
  { label: 'AI Match Score (%)',   key: 'score' },
  { label: 'Priority',             key: 'priority' },
  { label: 'Duration',             key: 'duration' },
  { label: 'Difficulty',           key: 'difficulty' },
  { label: 'Expected Improvement', key: 'expectedImprovement' },
];

export default function Recommendations() {
  const [recs, setRecs]                 = useState([]);
  const [learningPaths, setLearningPaths]= useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const [search, setSearch]             = useState('');
  const [empFilter, setEmpFilter]       = useState('All');
  const [deptFilter, setDeptFilter]     = useState('All');
  const [priorityFilter, setPriority]   = useState('All');
  const [providerFilter, setProvider]   = useState('All');
  const [difficultyFilter, setDiff]     = useState('All');
  const [sortBy, setSortBy]             = useState('score_desc');

  const [pathStatusFilter, setPathStatusFilter] = useState('All');

  function fetchData() {
    setLoading(true);
    setError(null);
    Promise.all([getRecommendations(), getLearningPaths()])
      .then(([recData, pathData]) => {
        setRecs(Array.isArray(recData) ? recData : recData ? [recData] : []);
        setLearningPaths(Array.isArray(pathData) ? pathData : pathData ? [pathData] : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load recommendations and learning paths.');
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingScreen message="Building AI Learning Recommendations & Personalized Roadmaps…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchData} />;

  const employees   = ['All', ...new Set(recs.map((r) => r.employee))];
  const departments = ['All', ...new Set(recs.map((r) => r.department))];
  const priorities  = ['All', 'High', 'Medium', 'Low'];
  const providers   = ['All', 'Coursera', 'Udemy', 'LinkedIn Learning', 'Internal LMS'];
  const difficulties= ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredRecs = recs.filter((r) => {
    const query = search.toLowerCase();
    const matchSearch =
      r.employee.toLowerCase().includes(query) ||
      r.course.toLowerCase().includes(query) ||
      r.department.toLowerCase().includes(query);

    const matchEmp   = empFilter === 'All' || r.employee === empFilter;
    const matchDept  = deptFilter === 'All' || r.department === deptFilter;
    const matchPrio  = priorityFilter === 'All' || r.priority === priorityFilter;
    const matchProv  = providerFilter === 'All' || r.provider === providerFilter;
    const matchDiff  = difficultyFilter === 'All' || r.difficulty === difficultyFilter;

    return matchSearch && matchEmp && matchDept && matchPrio && matchProv && matchDiff;
  });

  const PRIO_RANK = { High: 3, Medium: 2, Low: 1 };
  const parseWeeks = (str) => {
    const num = parseInt(str, 10);
    return isNaN(num) ? 99 : num;
  };

  const sortedRecs = [...filteredRecs].sort((a, b) => {
    if (sortBy === 'score_desc') return b.score - a.score;
    if (sortBy === 'priority_desc') return (PRIO_RANK[b.priority] || 0) - (PRIO_RANK[a.priority] || 0);
    if (sortBy === 'duration_asc') return parseWeeks(a.duration) - parseWeeks(b.duration);
    if (sortBy === 'name_asc') return a.employee.localeCompare(b.employee);
    return 0;
  });

  const filteredPaths = learningPaths.filter((path) => {
    const query = search.toLowerCase();
    const matchSearch =
      path.employee.toLowerCase().includes(query) ||
      path.department.toLowerCase().includes(query);

    const matchEmp   = empFilter === 'All' || path.employee === empFilter;
    const matchDept  = deptFilter === 'All' || path.department === deptFilter;
    const matchStatus= pathStatusFilter === 'All' || path.status === pathStatusFilter;
    const matchDiff  = difficultyFilter === 'All' || path.difficulty === difficultyFilter;

    return matchSearch && matchEmp && matchDept && matchStatus && matchDiff;
  });

  const totalRecs = recs.length;
  const highPrioCount = recs.filter((r) => r.priority === 'High').length;
  const uniqueEmployeesCount = new Set(recs.map((r) => r.employee)).size;
  const totalWeeks = recs.reduce((acc, curr) => acc + parseWeeks(curr.duration), 0);
  const avgCompletionTime = totalRecs > 0 ? `${(totalWeeks / totalRecs).toFixed(1)} weeks` : 'N/A';

  const activeLearningPathsCount = learningPaths.filter((p) => p.status === 'In Progress').length;
  const totalCompletedCourses = learningPaths.reduce((acc, p) => {
    return acc + p.steps.filter((s) => s.status === 'Completed').length;
  }, 0);
  const avgPathProgress = learningPaths.length > 0
    ? `${(learningPaths.reduce((acc, p) => acc + p.progress, 0) / learningPaths.length).toFixed(0)}%`
    : '0%';
  const certsPendingCount = learningPaths.reduce((acc, p) => {
    return acc + p.steps.filter((s) => s.title.includes('Certification') && s.status !== 'Completed').length;
  }, 0);

  return (
    <div className="page-container space-y-12">
      {/* ── SECTION 1: AI LEARNING RECOMMENDATIONS ────────────────────── */}
      <div className="space-y-6">
        <div>
          <h1 className="page-header-title">AI Learning Recommendations</h1>
          <p className="page-header-subtitle">
            Targeted course recommendations generated by AI to eliminate organizational knowledge gaps.
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SummaryCard
            title="Total Recommendations"
            value={totalRecs}
            subtext="Active assignments"
            icon="🎓"
            accent="blue"
          />
          <SummaryCard
            title="High Priority"
            value={highPrioCount}
            subtext="Urgent skill gaps"
            icon="🔥"
            accent="red"
          />
          <SummaryCard
            title="Employees Covered"
            value={uniqueEmployeesCount}
            subtext="Workforce reach"
            icon="👥"
            accent="emerald"
          />
          <SummaryCard
            title="Avg Completion Time"
            value={avgCompletionTime}
            subtext="Estimated duration"
            icon="⏱️"
            accent="purple"
          />
        </div>

        {/* Export Toolbar */}
        <ExportToolbar
          data={sortedRecs}
          columns={REC_COLUMNS}
          filename="ai_recommendations_report"
          title="Export Recommendations"
        />

        {/* Filter and Search Bar */}
        <div className="filter-bar space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="rec-search-input"
              type="text"
              placeholder="Search by employee name, course, or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input flex-1"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Sort By:</span>
              <select
                id="rec-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select text-sm"
              >
                <option value="score_desc">Highest Recommendation Score</option>
                <option value="priority_desc">Highest Priority</option>
                <option value="duration_asc">Shortest Duration</option>
                <option value="name_asc">Employee Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Employee
              </label>
              <select
                id="rec-emp-filter"
                value={empFilter}
                onChange={(e) => setEmpFilter(e.target.value)}
                className="form-select text-xs w-full"
              >
                {employees.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                id="rec-dept-filter"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                id="rec-prio-filter"
                value={priorityFilter}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Provider
              </label>
              <select
                id="rec-prov-filter"
                value={providerFilter}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
              >
                {providers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Difficulty
              </label>
              <select
                id="rec-diff-filter"
                value={difficultyFilter}
                onChange={(e) => setDiff(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recommendation Grid / Empty State */}
        {sortedRecs.length === 0 ? (
          <EmptyState
            title="No training recommendations found"
            message="Try broadening your search term or adjusting filter options."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecs.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 2: PERSONALIZED LEARNING PATH ROADMAPS ────────────── */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h2 className="page-header-title">Personalized Learning Paths</h2>
          </div>
          <p className="page-header-subtitle">
            Multi-step competency progression roadmaps guiding employees from current to target skill levels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SummaryCard
            title="Active Learning Paths"
            value={activeLearningPathsCount}
            subtext="In-progress roadmaps"
            icon="🚀"
            accent="blue"
          />
          <SummaryCard
            title="Courses Completed"
            value={totalCompletedCourses}
            subtext="Milestones achieved"
            icon="✅"
            accent="emerald"
          />
          <SummaryCard
            title="Average Progress"
            value={avgPathProgress}
            subtext="Across all paths"
            icon="📈"
            accent="purple"
          />
          <SummaryCard
            title="Certifications Pending"
            value={certsPendingCount}
            subtext="Upcoming proctored exams"
            icon="📜"
            accent="amber"
          />
        </div>

        <div className="filter-bar flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Filter Roadmaps ({filteredPaths.length} visible)
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span>Status:</span>
              <select
                id="path-status-filter"
                value={pathStatusFilter}
                onChange={(e) => setPathStatusFilter(e.target.value)}
                className="form-select text-xs"
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {filteredPaths.length === 0 ? (
          <EmptyState
            title="No learning path roadmaps found"
            message="Try clearing or adjusting filters to view active employee roadmaps."
          />
        ) : (
          <div className="space-y-6">
            {filteredPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
