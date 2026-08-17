import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import {
  Users,
  Award,
  TrendingUp,
  Building2,
  BookOpen,
  Sparkles,
  Search,
  Download,
  BarChart2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Activity,
  Target,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a78bfa', '#34d399'];

const ROLE_COLOR = {
  EMPLOYEE:     'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',
  MANAGER:      'bg-amber-500/12 text-amber-400 border-amber-500/20',
  HR_SPECIALIST:'bg-violet-500/12 text-violet-400 border-violet-500/20',
  ADMIN:        'bg-rose-500/12 text-rose-400 border-rose-500/20',
};

const getCellColor = (level) => {
  const map = {
    0: 'bg-rose-950/40 text-rose-400 border-rose-500/30',
    1: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    2: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    3: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    4: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/30',
  };
  return map[level] ?? 'bg-slate-900 text-slate-500 border-slate-800';
};

const getLevelName = (level) =>
  ['Unaware (L0)', 'Beginner (L1)', 'Intermediate (L2)', 'Advanced (L3)', 'Expert (L4)'][level] ?? `Level ${level}`;

const StatCard = ({ label, value, sublabel, icon: Icon, gradient, iconColor, delay }) => (
  <div className={`relative rounded-2xl p-6 overflow-hidden metric-card glass-panel-hover animate-fade-up ${gradient}`} style={{ animationDelay: delay }}>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value ?? '—'}</h3>
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}><Icon className="w-5 h-5" /></div>
    </div>
    <p className="text-xs text-slate-500 mt-4 relative z-10">{sublabel}</p>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-15"
      style={{ background: iconColor.includes('indigo') ? '#6366f1' : iconColor.includes('violet') ? '#8b5cf6' : iconColor.includes('cyan') ? '#06b6d4' : '#10b981' }} />
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl p-3 shadow-xl">
      <p className="text-xs font-bold text-slate-200 mb-1">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-xs font-semibold" style={{ color: entry.color || entry.fill || '#a5b4fc' }}>
          {entry.name}: {entry.value} {entry.name === 'Headcount' ? 'members' : ''}
        </p>
      ))}
    </div>
  );
};

export default function HrDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats]               = useState(null);
  const [allUsers, setAllUsers]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Competency Intelligence & Heatmap State
  const [selectedAnalyticsDept, setSelectedAnalyticsDept] = useState('Engineering');
  const [heatmapData, setHeatmapData]                     = useState(null);
  const [requirementsData, setRequirementsData]           = useState([]);
  const [heatmapLoading, setHeatmapLoading]               = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          API.get('/dashboard/stats'),
          API.get('/users'),
        ]);
        setStats(statsRes.data);
        const usersList = usersRes.data || [];
        setAllUsers(usersList);

        // Pick initial analytics department
        const depts = [...new Set(usersList.map(u => u.department).filter(Boolean))];
        if (depts.length > 0) {
          setSelectedAnalyticsDept(depts[0]);
        }
      } catch (e) {
        console.error('HR dashboard initial fetch error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Fetch department heatmap and role requirements when selected analytics department changes
  useEffect(() => {
    if (!selectedAnalyticsDept) return;
    (async () => {
      setHeatmapLoading(true);
      try {
        const [hmRes, reqRes] = await Promise.all([
          API.get(`/gaps/heatmap?department=${encodeURIComponent(selectedAnalyticsDept)}`),
          API.get(`/skills/requirements?department=${encodeURIComponent(selectedAnalyticsDept)}`).catch(() => ({ data: [] }))
        ]);
        setHeatmapData(hmRes.data);
        setRequirementsData(reqRes.data || []);
      } catch (e) {
        console.error(`Error fetching heatmap for department '${selectedAnalyticsDept}':`, e);
      } finally {
        setHeatmapLoading(false);
      }
    })();
  }, [selectedAnalyticsDept]);

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="rounded-2xl h-40 skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white/3 border border-white/5 space-y-4">
              <div className="skeleton h-3 w-20 rounded" /><div className="skeleton h-10 w-16 rounded" /><div className="skeleton h-3 w-32 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredUsers = allUsers.filter(u => {
    const q = searchTerm.toLowerCase();
    const matchSearch = (u.fullName || '').toLowerCase().includes(q)
      || (u.email || '').toLowerCase().includes(q)
      || (u.title || '').toLowerCase().includes(q);
    const matchDept = selectedDept === 'ALL' || u.department === selectedDept;
    return matchSearch && matchDept;
  });

  const deptCounts = {};
  allUsers.forEach(u => { const d = u.department || 'General'; deptCounts[d] = (deptCounts[d] || 0) + 1; });
  const chartData = Object.keys(deptCounts).map(d => ({ department: d, Headcount: deptCounts[d] }));
  const uniqueDepts = [...new Set(allUsers.map(u => u.department).filter(Boolean))];
  const getInitials = (name) => name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';

  // Compute Skill Intelligence Metrics for Selected Department
  const matrix = heatmapData?.matrix || [];
  const skillsList = heatmapData?.skillsList || [];

  // Skill target requirement lookup (average required benchmark for this skill in this department)
  const skillTargetMap = {};
  requirementsData.forEach(req => {
    if (req.skill?.name) {
      if (!skillTargetMap[req.skill.name]) {
        skillTargetMap[req.skill.name] = [];
      }
      skillTargetMap[req.skill.name].push(req.requiredLevel);
    }
  });

  let totalLevelsSum = 0;
  let totalLevelCount = 0;
  let criticalDeficitCount = 0;

  const skillAnalyticsList = skillsList.map(skillName => {
    let skillSum = 0;
    let skillMembers = 0;
    let criticalCount = 0;
    let expertCount = 0;

    matrix.forEach(row => {
      const lvl = row.skills ? (row.skills[skillName] || 0) : 0;
      skillSum += lvl;
      skillMembers += 1;
      totalLevelsSum += lvl;
      totalLevelCount += 1;

      if (lvl <= 1) {
        criticalCount += 1;
        criticalDeficitCount += 1;
      }
      if (lvl >= 4) {
        expertCount += 1;
      }
    });

    const avgActual = skillMembers > 0 ? parseFloat((skillSum / skillMembers).toFixed(1)) : 0;
    const reqList = skillTargetMap[skillName] || [3];
    const avgTarget = parseFloat((reqList.reduce((a, b) => a + b, 0) / reqList.length).toFixed(1));
    const gapDiff = parseFloat((avgTarget - avgActual).toFixed(1));

    return {
      skillName,
      avgActual,
      avgTarget,
      gapDiff: Math.max(0, gapDiff),
      criticalCount,
      expertCount,
      isDeficit: avgActual < avgTarget || criticalCount > 0
    };
  });

  const departmentAvgIndex = totalLevelCount > 0
    ? (totalLevelsSum / totalLevelCount).toFixed(1)
    : '0.0';

  const criticalSkills = skillAnalyticsList.filter(s => s.criticalCount > 0 || s.avgActual < 2.0);

  const handleExportMatrixCSV = () => {
    if (!matrix.length) {
      alert('No matrix data available to export for this department.');
      return;
    }
    const formatted = matrix.map(row => {
      const entry = {
        'Employee Name': row.fullName || row.username,
        'Username': row.username,
        'Role Title': row.role,
        'Department': selectedAnalyticsDept
      };
      skillsList.forEach(s => {
        const lvl = row.skills && row.skills[s] !== undefined ? row.skills[s] : 0;
        entry[s] = `L${lvl} (${getLevelName(lvl)})`;
      });
      return entry;
    });
    exportToCSV(formatted, `${selectedAnalyticsDept}_Competency_Heatmap_Matrix`);
  };

  const handleExportMatrixPDF = () => {
    if (!matrix.length) {
      alert('No matrix data available to export.');
      return;
    }
    const headers = ['Employee', 'Role', ...skillsList];
    const rows = matrix.map(r => [
      r.fullName || r.username,
      r.role,
      ...skillsList.map(s => `L${r.skills ? (r.skills[s] || 0) : 0}`)
    ]);
    exportToPDF(
      `Competency & Skill Gap Report – ${selectedAnalyticsDept}`,
      `Workforce Skill Distribution & Benchmark Compliance (${matrix.length} Evaluated Staff)`,
      headers,
      rows,
      `HR_Competency_Report_${selectedAnalyticsDept}`
    );
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl p-8 overflow-hidden border border-violet-500/15"
        style={{ background: 'linear-gradient(135deg, #0d0520 0%, #100628 50%, #07021a 100%)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-indigo-500/8 blur-2xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="animate-slide-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-violet-500/12 border border-violet-500/25 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>HR Specialist Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Workforce Intelligence Center
            </h1>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              Monitor headcount, department distributions, upskilling health, and talent strategy across all{' '}
              <span className="text-violet-300 font-semibold">{uniqueDepts.length} departments</span>.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap animate-slide-right delay-200">
            <button
              onClick={() => {
                const formatted = allUsers.map(u => ({
                  'Full Name': u.fullName, 'Username': u.username, 'Email': u.email,
                  'Title': u.title, 'Department': u.department, 'Role': u.role
                }));
                exportToCSV(formatted, 'Workforce_Talent_Directory');
              }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff', boxShadow: '0 4px 20px rgba(139,92,246,0.4)' }}
            >
              <Download className="w-4 h-4" />
              <span>Export Directory (CSV)</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-right">
              <p className="text-[9px] text-slate-500 font-bold uppercase">Total Staff</p>
              <p className="text-2xl font-bold text-violet-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{allUsers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Headcount"   value={allUsers.length}                  sublabel="Across all departments"            icon={Users}       gradient="card-gradient-indigo" iconColor="bg-indigo-500/15 text-indigo-400" delay="0.05s" />
        <StatCard label="Departments"        value={uniqueDepts.length}               sublabel="Active operational units"          icon={Building2}   gradient="card-gradient-violet" iconColor="bg-violet-500/15 text-violet-400" delay="0.10s" />
        <StatCard label="Upskilling Courses" value={stats?.totalCourses || 8}         sublabel="Catalog training offerings"        icon={BookOpen}    gradient="card-gradient-cyan"   iconColor="bg-cyan-500/15 text-cyan-400"    delay="0.15s" />
        <StatCard label="Active Mentorships" value={stats?.activeMentorships || stats?.activeTeamMentorships || 0} sublabel="Peer pairings org-wide"          icon={Sparkles}    gradient="card-gradient-emerald" iconColor="bg-emerald-500/15 text-emerald-400" delay="0.20s" />
      </div>

      {/* ── Bar Chart ── */}
      <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-300">
        <h3 className="text-base font-bold text-white flex items-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <BarChart2 className="w-4.5 h-4.5 mr-2 text-violet-400" style={{ width: '18px', height: '18px' }} />
          Departmental Headcount Breakdown
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="department" stroke="#475569" fontSize={11} tick={{ fill: '#64748b' }} />
              <YAxis stroke="#334155" fontSize={11} tick={{ fill: '#475569' }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="Headcount" radius={[8, 8, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={BAR_COLORS[i % BAR_COLORS.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── HR Department Competency & Skill Gap Intelligence (NEW CONTRIBUTION) ── */}
      <div className="space-y-6 pt-2">
        {/* Section Header & Department Selector */}
        <div className="glass-panel rounded-2xl p-6 border border-indigo-500/20 relative overflow-hidden bg-gradient-to-r from-[#0d0724] via-[#10092c] to-[#0a051d]">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>Competency & Gap Intelligence</span>
              </div>
              <h2 className="text-2xl font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Multi-Department Skill Analytics
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Inspect organizational skill proficiencies, target benchmark variances, and low-proficiency deficits across company units.
              </p>
            </div>

            {/* Department Selector & Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center space-x-2 bg-white/4 border border-white/8 rounded-xl p-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">Unit:</span>
                <select
                  value={selectedAnalyticsDept}
                  onChange={(e) => setSelectedAnalyticsDept(e.target.value)}
                  className="bg-[#120e2e] text-indigo-300 font-bold text-xs px-3 py-2 rounded-lg border border-indigo-500/30 outline-none cursor-pointer focus:border-indigo-400 transition"
                >
                  {uniqueDepts.map(d => (
                    <option key={d} value={d} className="bg-slate-900 text-slate-200">
                      {d} Department
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportMatrixCSV}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-white/6 border border-white/8 hover:bg-white/10 text-slate-300 transition"
                  title="Export Department Matrix as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Matrix (CSV)</span>
                </button>
                <button
                  onClick={handleExportMatrixPDF}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-300 transition"
                  title="Export Department Gap Report as PDF"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Report (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Department Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel rounded-2xl p-5 border border-white/6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Staff</p>
                <h4 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {matrix.length}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Active evaluated members</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracked Skills</p>
                <h4 className="text-2xl font-bold text-violet-400 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {skillsList.length}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-violet-500/15 text-violet-400">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Framework competencies</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Critical Deficits (L0/L1)</p>
                <h4 className="text-2xl font-bold text-rose-400 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {criticalDeficitCount}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Proficiency ratings ≤ 1</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-white/6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Proficiency</p>
                <h4 className="text-2xl font-bold text-emerald-400 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {departmentAvgIndex} <span className="text-xs text-slate-500 font-normal">/ 4.0</span>
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Overall department index</p>
          </div>
        </div>

        {/* Critical Alerts Banner if deficits found */}
        {criticalSkills.length > 0 && (
          <div className="glass-panel rounded-2xl p-5 border border-rose-500/20 bg-rose-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-up">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-200">
                  Priority Upskilling Recommended for {selectedAnalyticsDept}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detected <span className="text-rose-400 font-bold">{criticalSkills.length} competencies</span> with critical gap deficits (ratings at Beginner or Unaware level).
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {criticalSkills.map(s => (
                    <span key={s.skillName} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {s.skillName} ({s.criticalCount} staff ≤ L1)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competency Variance Chart (Actual vs Target Benchmark) */}
        {skillAnalyticsList.length > 0 && (
          <div className="glass-panel rounded-2xl p-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <TrendingUp className="w-4.5 h-4.5 mr-2 text-indigo-400" style={{ width: '18px', height: '18px' }} />
                  Competency Proficiency vs Benchmark Target ({selectedAnalyticsDept})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compare actual department average proficiency against required benchmark levels (0-4)
                </p>
              </div>

              {/* Legend Badges */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded bg-indigo-500" />
                  <span className="text-slate-400 text-[11px]">Actual Average</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded bg-cyan-400" />
                  <span className="text-slate-400 text-[11px]">Target Benchmark</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillAnalyticsList.map(s => ({
                    skill: s.skillName,
                    'Actual Average': s.avgActual,
                    'Target Benchmark': s.avgTarget
                  }))}
                  barGap={4}
                  barCategoryGap="25%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="skill" stroke="#475569" fontSize={11} tick={{ fill: '#64748b' }} />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} stroke="#334155" fontSize={11} tick={{ fill: '#475569' }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="Actual Average" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Target Benchmark" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed Department Heatmap Table */}
        <div className="glass-panel rounded-2xl p-6 animate-fade-up">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <BarChart2 className="w-4.5 h-4.5 mr-2 text-violet-400" style={{ width: '18px', height: '18px' }} />
                {selectedAnalyticsDept} Skill Heatmap Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Individual employee competency levels across required skills
              </p>
            </div>

            {/* Proficiency Level Legend */}
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              {[
                { label: 'Unaware (L0)',      dot: 'bg-rose-950 text-rose-400 border border-rose-500/30' },
                { label: 'Beginner (L1)',     dot: 'bg-rose-500/20 text-rose-300 border border-rose-500/30' },
                { label: 'Intermediate (L2)', dot: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
                { label: 'Advanced (L3)',     dot: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' },
                { label: 'Expert (L4)',       dot: 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/30' },
              ].map(({ label, dot }) => (
                <div key={label} className={`px-2 py-1 rounded-lg ${dot}`}>
                  <span className="font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {heatmapLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/6 bg-white/3">
                    <th className="p-3 text-left text-xs font-semibold text-slate-400 border-r border-white/5 min-w-[140px]">Employee</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-400 border-r border-white/5 min-w-[120px]">Role</th>
                    {skillsList.map((sn) => (
                      <th key={sn} className="p-3 text-center text-xs font-semibold text-slate-400 min-w-[90px] border-r border-white/5">
                        {sn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {!matrix.length ? (
                    <tr>
                      <td colSpan={skillsList.length + 2} className="p-10 text-center text-slate-500 text-sm italic">
                        No evaluated team members found in the {selectedAnalyticsDept} department.
                      </td>
                    </tr>
                  ) : (
                    matrix.map((row, ri) => (
                      <tr key={row.userId || ri} className="hover:bg-white/2 transition animate-fade-up" style={{ animationDelay: `${0.2 + ri * 0.04}s` }}>
                        <td className="p-3 text-xs font-bold text-slate-100 border-r border-white/4 truncate max-w-[140px]">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/40 text-violet-300 flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                              {row.fullName?.charAt(0) || row.username?.charAt(0) || '?'}
                            </div>
                            <span className="truncate">{row.fullName || row.username}</span>
                          </div>
                        </td>
                        <td className="p-3 text-xs text-slate-400 border-r border-white/4 truncate max-w-[120px]">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ROLE_COLOR[row.role] || 'bg-slate-500/12 text-slate-400 border-slate-500/20'}`}>
                            {row.role}
                          </span>
                        </td>
                        {skillsList.map((sn) => {
                          const level = row.skills ? (row.skills[sn] || 0) : 0;
                          return (
                            <td key={sn} className="p-2 border-r border-white/4">
                              <div
                                className={`w-full py-2 rounded-lg border text-center text-[11px] font-bold transition-all duration-200 cursor-help hover:scale-105 ${getCellColor(level)}`}
                                title={`${row.fullName || row.username} – ${sn}: ${getLevelName(level)}`}
                              >
                                L{level}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Employee Directory ── */}
      <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-400">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Users className="w-4.5 h-4.5 mr-2 text-cyan-400" style={{ width: '18px', height: '18px' }} />
              Employee Directory
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing <span className="text-white font-semibold">{filteredUsers.length}</span> of {allUsers.length} employees
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, title..."
                className="w-full pl-9 pr-4 py-2.5 bg-white/4 border border-white/8 rounded-xl text-slate-200 text-xs focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
              />
            </div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2.5 bg-white/4 border border-white/8 rounded-xl text-slate-300 text-xs focus:border-violet-500 outline-none transition cursor-pointer"
            >
              <option value="ALL">All Depts</option>
              {uniqueDepts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/3 border-b border-white/6">
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500 italic">
                    No employees found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, i) => (
                  <tr key={u.id} className="hover:bg-white/2 transition animate-fade-up" style={{ animationDelay: `${0.45 + i * 0.03}s` }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border"
                          style={{
                            background: `linear-gradient(135deg, ${BAR_COLORS[i % BAR_COLORS.length]}40, ${BAR_COLORS[(i + 2) % BAR_COLORS.length]}30)`,
                            borderColor: `${BAR_COLORS[i % BAR_COLORS.length]}40`,
                            color: BAR_COLORS[i % BAR_COLORS.length],
                          }}
                        >
                          {getInitials(u.fullName)}
                        </div>
                        <span className="font-bold text-slate-100">{u.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{u.email}</td>
                    <td className="px-4 py-3 text-slate-300">{u.title}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/12 text-violet-400 border border-violet-500/20">
                        {u.department}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ROLE_COLOR[u.role] || 'bg-slate-500/12 text-slate-400 border-slate-500/20'}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
