import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { exportToCSV } from '../utils/exportUtils';
import {
  Users,
  Award,
  TrendingUp,
  Building2,
  BookOpen,
  Sparkles,
  Search,
  Download,
  BarChart2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a78bfa', '#34d399'];

const ROLE_COLOR = {
  EMPLOYEE:     'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',
  MANAGER:      'bg-amber-500/12 text-amber-400 border-amber-500/20',
  HR_SPECIALIST:'bg-violet-500/12 text-violet-400 border-violet-500/20',
  ADMIN:        'bg-rose-500/12 text-rose-400 border-rose-500/20',
};

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
      <p className="text-sm font-bold text-indigo-400">{payload[0].value} members</p>
    </div>
  );
};

export default function HrDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats]         = useState(null);
  const [allUsers, setAllUsers]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          API.get('/dashboard/stats'),
          API.get('/users'),
        ]);
        setStats(statsRes.data);
        setAllUsers(usersRes.data || []);
      } catch (e) {
        console.error('HR dashboard error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        <StatCard label="Active Mentorships" value={stats?.activeTeamMentorships || 0} sublabel="Peer pairings org-wide"          icon={Sparkles}    gradient="card-gradient-emerald" iconColor="bg-emerald-500/15 text-emerald-400" delay="0.20s" />
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
