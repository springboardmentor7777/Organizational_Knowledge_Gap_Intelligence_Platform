import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { Link } from 'react-router-dom';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Download,
  BarChart2,
  FileText
} from 'lucide-react';

const getCellColor = (level) => {
  const map = {
    0: 'bg-slate-900/80 text-slate-600 border-slate-700/40',
    1: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    2: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    3: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    4: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/30',
  };
  return map[level] ?? 'bg-slate-900 text-slate-500 border-slate-800';
};

const getLevelName = (level) =>
  ['Unaware', 'Beginner', 'Intermediate', 'Advanced', 'Expert'][level] ?? 'Unknown';

const StatCard = ({ label, value, sublabel, icon: Icon, gradient, iconColor, delay }) => (
  <div className={`relative rounded-2xl p-6 overflow-hidden metric-card glass-panel-hover animate-fade-up ${gradient}`} style={{ animationDelay: delay }}>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value ?? '—'}</h3>
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-xs text-slate-500 mt-4 relative z-10">{sublabel}</p>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-15"
      style={{ background: iconColor.includes('amber') ? '#f59e0b' : iconColor.includes('cyan') ? '#06b6d4' : iconColor.includes('rose') ? '#f43f5e' : '#6366f1' }} />
  </div>
);

export default function ManagerDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats]     = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [statsRes, heatmapRes] = await Promise.all([
          API.get('/dashboard/stats'),
          API.get(`/gaps/heatmap?department=${user.department}`),
        ]);
        setStats(statsRes.data);
        setHeatmap(heatmapRes.data);
      } catch (e) {
        console.error('Error fetching manager dashboard:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="rounded-2xl h-40 skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl p-6 bg-white/3 border border-white/5 space-y-4">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-10 w-16 rounded" />
              <div className="skeleton h-3 w-32 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleExport = () => {
    if (!heatmap?.matrix) { alert('No heatmap data available'); return; }
    const formatted = heatmap.matrix.map(row => {
      const entry = { 'Employee': row.fullName, 'Role Title': row.role };
      (heatmap.skillsList || []).forEach(s => { entry[s] = row.skills[s] !== undefined ? `Level ${row.skills[s]}` : 'Level 0'; });
      return entry;
    });
    exportToCSV(formatted, `${user?.department || 'Department'}_Team_Skill_Matrix`);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl p-8 overflow-hidden border border-amber-500/15"
        style={{ background: 'linear-gradient(135deg, #1a0f00 0%, #1c1100 50%, #130a00 100%)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-orange-500/8 blur-2xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="animate-slide-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/12 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Manager Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Welcome, {user?.fullName?.split(' ')[0] || user?.username}! 📊
            </h1>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              Monitor team competencies and high-risk gaps for the{' '}
              <span className="text-amber-300 font-semibold">{user?.department || 'Engineering'}</span> department.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap animate-slide-right delay-200">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/6 border border-white/8 hover:bg-white/10 text-slate-300 transition"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                if (!heatmap?.matrix) return;
                const skills = heatmap.skillsList || [];
                const headers = ['Employee', 'Role', ...skills];
                const rows = heatmap.matrix.map(r => [r.fullName, r.role, ...skills.map(s => `Level ${r.skills[s] || 0}`)]);
                exportToPDF(`Skill Matrix – ${user?.department}`, 'Department Competency & Gap Heatmap', headers, rows, 'Team_Heatmap_Report');
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-300 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF Report</span>
            </button>
            <Link
              to="/assessment"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#000', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}
            >
              <Award className="w-4 h-4" />
              <span>Evaluate Team Member</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Team Size"        value={stats?.teamSize || 0}              sublabel={`Members in ${user?.department}`}     icon={Users}         gradient="card-gradient-cyan"   iconColor="bg-cyan-500/15 text-cyan-400"   delay="0.05s" />
        <StatCard label="Total Gaps"       value={stats?.totalTeamGaps || 0}         sublabel="Unresolved skill deficits"            icon={Layers}        gradient="card-gradient-amber"  iconColor="bg-amber-500/15 text-amber-400" delay="0.10s" />
        <StatCard label="High Risk Gaps"   value={stats?.highRiskTeamGaps || 0}      sublabel="Critical gaps (3+ levels behind)"     icon={AlertTriangle} gradient="card-gradient-rose"   iconColor="bg-rose-500/15 text-rose-400"   delay="0.15s" />
        <StatCard label="Active Pairings"  value={stats?.activeTeamMentorships || 0} sublabel="Mentorship matches active"            icon={TrendingUp}    gradient="card-gradient-indigo" iconColor="bg-indigo-500/15 text-indigo-400" delay="0.20s" />
      </div>

      {/* ── Skill Heatmap ── */}
      <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-300">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <BarChart2 className="w-4.5 h-4.5 mr-2 text-amber-400" style={{ width: '18px', height: '18px' }} />
              Department Skill Heatmap Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Actual vs target competencies for{' '}
              <span className="font-bold text-amber-400">{user?.department}</span>
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            {[
              { label: 'Unaware',      dot: 'bg-slate-700' },
              { label: 'Beginner',     dot: 'bg-rose-500/60' },
              { label: 'Intermediate', dot: 'bg-amber-500/60' },
              { label: 'Advanced',     dot: 'bg-cyan-500/60' },
              { label: 'Expert',       dot: 'bg-emerald-500/60' },
            ].map(({ label, dot }) => (
              <div key={label} className="flex items-center space-x-1.5 px-2 py-1 bg-white/3 rounded-lg border border-white/5">
                <div className={`w-2.5 h-2.5 rounded-sm ${dot}`} />
                <span className="text-slate-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/6 bg-white/3">
                <th className="p-3 text-left text-xs font-semibold text-slate-400 border-r border-white/5 min-w-[140px]">Employee</th>
                <th className="p-3 text-left text-xs font-semibold text-slate-400 border-r border-white/5 min-w-[120px]">Role</th>
                {heatmap?.skillsList?.map((sn) => (
                  <th key={sn} className="p-3 text-center text-xs font-semibold text-slate-400 min-w-[90px] border-r border-white/5">
                    {sn}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {!heatmap?.matrix?.length ? (
                <tr>
                  <td colSpan={20} className="p-10 text-center text-slate-500 text-sm italic">
                    No team members evaluated yet. Click{' '}
                    <Link to="/assessment" className="text-amber-400 hover:underline">Evaluate Team Member</Link>{' '}
                    to get started.
                  </td>
                </tr>
              ) : (
                heatmap.matrix.map((row, ri) => (
                  <tr key={row.userId} className="hover:bg-white/2 transition animate-fade-up" style={{ animationDelay: `${0.35 + ri * 0.05}s` }}>
                    <td className="p-3 text-xs font-bold text-slate-100 border-r border-white/4 truncate max-w-[140px]">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500/40 to-orange-500/40 text-amber-300 flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                          {row.fullName?.charAt(0) || '?'}
                        </div>
                        <span className="truncate">{row.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-slate-400 border-r border-white/4 truncate max-w-[120px]">{row.role}</td>
                    {heatmap.skillsList?.map((sn) => {
                      const level = row.skills[sn] || 0;
                      return (
                        <td key={sn} className="p-2 border-r border-white/4">
                          <div
                            className={`w-full py-2 rounded-lg border text-center text-[11px] font-bold transition-all duration-200 cursor-help hover:scale-105 ${getCellColor(level)}`}
                            title={`${row.fullName} – ${sn}: Level ${level} (${getLevelName(level)})`}
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
      </div>

      {/* Quick tips bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: AlertTriangle, color: 'rose',    label: 'High Risk',    desc: 'Gaps of 3+ skill levels need immediate action' },
          { icon: Sparkles,      color: 'indigo',  label: 'AI Recommend', desc: 'View AI-matched courses for your team members' },
          { icon: ArrowRight,    color: 'emerald', label: 'Export CSV',   desc: 'Download the full team matrix for reports' },
        ].map(({ icon: Icon, color, label, desc }) => (
          <div key={label} className={`p-4 rounded-xl card-gradient-${color} flex items-start space-x-3 animate-fade-up delay-400`}>
            <div className={`p-2 rounded-lg bg-${color}-500/15 text-${color}-400 flex-shrink-0 mt-0.5`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className={`text-xs font-bold text-${color}-300 mb-0.5`}>{label}</p>
              <p className="text-[11px] text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
