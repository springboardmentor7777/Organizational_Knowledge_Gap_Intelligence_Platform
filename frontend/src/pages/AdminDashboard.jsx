import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import { exportToCSV } from '../utils/exportUtils';
import {
  Users,
  Layers,
  Award,
  TrendingUp,
  FileText,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Shield,
  Download,
  UserCheck,
  Terminal,
  Zap
} from 'lucide-react';

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
      style={{ background: iconColor.includes('rose') ? '#f43f5e' : iconColor.includes('cyan') ? '#06b6d4' : iconColor.includes('indigo') ? '#6366f1' : '#10b981' }} />
  </div>
);

const ACTION_TYPE_COLOR = (action) => {
  if (!action) return 'text-slate-400';
  const upper = action.toUpperCase();
  if (upper.includes('DELETE') || upper.includes('LOCK') || upper.includes('FAIL')) return 'text-rose-400';
  if (upper.includes('CREATE') || upper.includes('ADD'))  return 'text-emerald-400';
  if (upper.includes('UPDATE') || upper.includes('EDIT')) return 'text-amber-400';
  if (upper.includes('LOGIN')  || upper.includes('AUTH')) return 'text-cyan-400';
  return 'text-indigo-400';
};

export default function AdminDashboard() {
  const [stats, setStats]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [skillName, setSkillName] = useState('');
  const [category, setCategory]   = useState('Backend');
  const [description, setDescription] = useState('');
  const [success, setSuccess]     = useState('');
  const [error, setError]         = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchAdminData = async () => {
    try {
      const res = await API.get('/dashboard/stats');
      setStats(res.data);
    } catch (e) {
      console.error('Admin dashboard error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminData(); }, []);

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await API.post('/skills', { name: skillName, category, description });
      setSuccess(`Skill '${skillName}' added to the global taxonomy!`);
      setSkillName(''); setDescription('');
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data || 'Failed – skill name may already exist.');
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Command Center Hero ── */}
      <div className="relative rounded-2xl p-8 overflow-hidden border border-rose-500/20"
        style={{ background: 'linear-gradient(135deg, #1a0508 0%, #1c0608 50%, #130206 100%)' }}>
        {/* Animated scan line */}
        <div className="scan-line-anim" />

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-indigo-500/6 blur-2xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

        {/* Corner Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="animate-slide-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-500/12 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span>System Administrator – Command Center</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Platform Governance & Access Control
            </h1>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              Manage user roles, modify the competency taxonomy, inspect real-time security audit trails, and oversee platform configuration.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap animate-slide-right delay-200">
            <button
              onClick={() => {
                if (!stats?.recentLogs) return;
                exportToCSV(stats.recentLogs.map(l => ({
                  'ID': l.id, 'Action': l.action, 'Performed By': l.performedBy,
                  'Timestamp': l.timestamp, 'Details': l.details
                })), 'System_Audit_Logs');
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/6 border border-white/8 hover:bg-white/10 text-slate-300 transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Logs (CSV)</span>
            </button>
            <Link
              to="/admin/users"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', boxShadow: '0 4px 20px rgba(244,63,94,0.4)' }}
            >
              <UserCheck className="w-4 h-4" />
              <span>User & Role Management</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Members"    value={stats?.totalUsers}        sublabel="Registered platform users"       icon={Users}     gradient="card-gradient-cyan"   iconColor="bg-cyan-500/15 text-cyan-400"   delay="0.05s" />
        <StatCard label="Taxonomy Skills"  value={stats?.totalSkills}       sublabel="Total tracked competencies"      icon={Award}     gradient="card-gradient-indigo" iconColor="bg-indigo-500/15 text-indigo-400" delay="0.10s" />
        <StatCard label="Org Gap Count"    value={stats?.totalGaps}         sublabel="Deficits across all users"       icon={Layers}    gradient="card-gradient-rose"   iconColor="bg-rose-500/15 text-rose-400"   delay="0.15s" />
        <StatCard label="Active Mentorships" value={stats?.activeMentorships} sublabel="Inter-departmental matching"  icon={TrendingUp} gradient="card-gradient-emerald" iconColor="bg-emerald-500/15 text-emerald-400" delay="0.20s" />
      </div>

      {/* ── Tools + Audit Logs ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Skill Creator Form */}
        <div className="glass-panel rounded-2xl p-6 xl:col-span-1 h-fit animate-fade-up delay-300">
          <h3 className="text-base font-bold text-white flex items-center mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <PlusCircle className="w-4.5 h-4.5 mr-2 text-rose-400" style={{ width: '18px', height: '18px' }} />
            Add Skill to Taxonomy
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Extend the global competency framework with new skills.
          </p>

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start space-x-2 animate-fade-up">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start space-x-2 animate-fade-up">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateSkill} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skill Name</label>
              <input
                type="text"
                required
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g., Python, Kubernetes, TOGAF"
                className="w-full px-3.5 py-2.5 text-sm text-slate-200 glass-input rounded-xl transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-slate-200 glass-input rounded-xl transition cursor-pointer"
              >
                {['Backend', 'Frontend', 'Cloud & DB', 'Management', 'Soft Skills', 'Security', 'Data & AI'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief explanation of standard competencies in this skill..."
                className="w-full px-3.5 py-2.5 text-sm text-slate-200 glass-input rounded-xl transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', boxShadow: '0 4px 16px rgba(244,63,94,0.35)' }}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Create Skill</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Audit Log Table */}
        <div className="glass-panel rounded-2xl p-6 xl:col-span-2 animate-fade-up delay-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Terminal className="w-4.5 h-4.5 mr-2 text-rose-400" style={{ width: '18px', height: '18px' }} />
              System Audit Trail
            </h3>
            <span className="text-[10px] px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full font-bold">
              LIVE
              <span className="inline-block w-1.5 h-1.5 bg-rose-400 rounded-full ml-1.5 animate-pulse" />
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-white/3 border-b border-white/6">
                  <th className="p-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                  <th className="p-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  <th className="p-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performed By</th>
                  <th className="p-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {!stats?.recentLogs?.length ? (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-slate-500 italic">
                      No audit logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  stats.recentLogs.map((log, i) => (
                    <tr
                      key={log.id}
                      className="hover:bg-white/2 transition animate-fade-up"
                      style={{ animationDelay: `${0.35 + i * 0.04}s` }}
                    >
                      <td className="p-3 text-slate-500 font-mono text-[10px] whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className={`p-3 font-bold font-mono ${ACTION_TYPE_COLOR(log.action)}`}>
                        {log.action}
                      </td>
                      <td className="p-3 text-slate-300 font-medium">{log.performedBy}</td>
                      <td className="p-3 text-slate-500 max-w-[200px] truncate" title={log.details}>
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Shortcut Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-500">
        <Link to="/admin/users" className="p-4 rounded-2xl card-gradient-rose flex items-center space-x-3 hover:border-rose-500/40 transition group">
          <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 group-hover:scale-110 transition-transform">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-300">User & Role Access Management</p>
            <p className="text-xs text-slate-500 mt-0.5">Assign roles, lock accounts, manage permissions</p>
          </div>
        </Link>
        <Link to="/frameworks" className="p-4 rounded-2xl card-gradient-indigo flex items-center space-x-3 hover:border-indigo-500/40 transition group">
          <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-300">Competency Framework Builder</p>
            <p className="text-xs text-slate-500 mt-0.5">Create and manage skill frameworks by role</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
