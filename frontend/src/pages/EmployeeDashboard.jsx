import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  Award,
  TrendingUp,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  User,
  Zap,
  Target,
  CheckCircle
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

const StatCard = ({ label, value, sublabel, icon: Icon, gradient, iconColor, delay }) => (
  <div
    className={`relative rounded-2xl p-6 overflow-hidden metric-card glass-panel-hover animate-fade-up ${gradient}`}
    style={{ animationDelay: delay }}
  >
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {value ?? '—'}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-xs text-slate-500 mt-4 relative z-10">{sublabel}</p>
    {/* Glow orb */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20"
      style={{ background: iconColor.includes('indigo') ? '#6366f1' : iconColor.includes('cyan') ? '#06b6d4' : iconColor.includes('emerald') ? '#10b981' : '#f43f5e' }} />
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-2xl p-6 bg-white/3 border border-white/5 space-y-4">
    <div className="skeleton h-3 w-20 rounded" />
    <div className="skeleton h-10 w-16 rounded" />
    <div className="skeleton h-3 w-32 rounded" />
  </div>
);

export default function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats]             = useState(null);
  const [learningPath, setLearningPath] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, pathRes] = await Promise.all([
          API.get('/dashboard/stats'),
          API.get('/recommendations/learning-path'),
        ]);
        setStats(statsRes.data);
        setLearningPath(pathRes.data);
      } catch (e) {
        console.error('Error fetching employee dashboard:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const chartData = stats?.activeGaps?.map(g => ({
    subject: g.skill.name,
    Current: g.currentLevel,
    Required: g.requiredLevel,
    fullMark: 4,
  })) || [];

  const severityColor = (s) =>
    s === 'HIGH'   ? { bg: 'bg-rose-500/10',   text: 'text-rose-400',   bar: 'progress-bar-fill-rose' }  :
    s === 'MEDIUM' ? { bg: 'bg-amber-500/10',   text: 'text-amber-400',  bar: 'progress-bar-fill-amber' } :
                    { bg: 'bg-emerald-500/10',  text: 'text-emerald-400', bar: '' };

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="rounded-2xl h-40 skeleton" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl p-8 overflow-hidden border border-indigo-500/20 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #090d16 0%, #0d1222 50%, #110d2e 100%)', color: '#ffffff' }}>
        {/* Animated orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" style={{ animation: 'orb-2 12s ease-in-out infinite' }} />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="animate-slide-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Employee Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ color: '#ffffff', fontFamily: "'Space Grotesk', sans-serif" }}>
              Welcome back, {user?.fullName?.split(' ')[0] || user?.username}! 👋
            </h1>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color: '#94a3b8' }}>
              Track your competencies and close skill gaps for{' '}
              <span className="font-bold" style={{ color: '#a5b4fc' }}>{user?.title || 'your role'}</span>{' '}
              in the <span className="font-bold" style={{ color: '#a5b4fc' }}>{user?.department || 'Engineering'}</span> department.
            </p>
          </div>

          {stats?.isProfileComplete && (
            <div className="animate-slide-right delay-200">
              <Link
                to="/assessment"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span style={{ color: '#ffffff' }}>Rate Skills & Resume</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Onboarding Banner ── */}
      {!stats?.isProfileComplete && (
        <div className="relative rounded-2xl p-8 overflow-hidden border border-amber-500/20 animate-fade-up"
          style={{ background: 'linear-gradient(135deg, #1a1200 0%, #1c1400 50%, #120d00 100%)' }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/12 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>Setup Required</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Complete Your Profile & Rate Your Skills
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                To unlock AI-powered gap analysis, personalized learning roadmaps, and peer mentorship recommendations, complete your profile and submit initial skill ratings.
              </p>
            </div>
            <Link
              to="/assessment"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#000', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Skill Gaps"
          value={stats?.gapCount}
          sublabel="Skills below target level"
          icon={Target}
          gradient="card-gradient-rose"
          iconColor="bg-rose-500/15 text-rose-400"
          delay="0.05s"
        />
        <StatCard
          label="In Progress"
          value={stats?.coursesInProgress}
          sublabel="Active training enrollments"
          icon={TrendingUp}
          gradient="card-gradient-cyan"
          iconColor="bg-cyan-500/15 text-cyan-400"
          delay="0.10s"
        />
        <StatCard
          label="Completed"
          value={stats?.coursesCompleted}
          sublabel="Successfully finished courses"
          icon={CheckCircle}
          gradient="card-gradient-emerald"
          iconColor="bg-emerald-500/15 text-emerald-400"
          delay="0.15s"
        />
        <StatCard
          label="Mentorships"
          value={stats?.activeMentorships}
          sublabel="Active peer partnerships"
          icon={Users}
          gradient="card-gradient-indigo"
          iconColor="bg-indigo-500/15 text-indigo-400"
          delay="0.20s"
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Skill Gap Analysis + Learning Path */}
        <div className="xl:col-span-2 space-y-6">

          {/* Skill Gap Radar Panel */}
          <div className="glass-panel rounded-2xl p-6 animate-fade-up delay-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Award className="w-4.5 h-4.5 mr-2 text-indigo-400" style={{ width: '18px', height: '18px' }} />
                  Skill Gap Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Your current vs required proficiency levels</p>
              </div>
              {chartData.length > 0 && (
                <span className="text-xs px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full font-semibold">
                  {stats?.activeGaps?.length} gaps found
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Gap List */}
              <div className="space-y-3">
                {stats?.activeGaps?.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-60" />
                    <p className="text-sm text-slate-500">No skill gaps detected!</p>
                    <p className="text-xs text-slate-600 mt-1">Complete self-assessment to see your radar.</p>
                  </div>
                ) : (
                  stats?.activeGaps?.map((gap, i) => {
                    const sc = severityColor(gap.severity);
                    const pct = Math.round((gap.currentLevel / gap.requiredLevel) * 100);
                    return (
                      <div
                        key={gap.skill.id}
                        className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/10 transition-all animate-fade-up"
                        style={{ animationDelay: `${0.3 + i * 0.07}s` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm text-slate-100">{gap.skill.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                            {gap.severity}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                          <span>Level {gap.currentLevel} current</span>
                          <span>Level {gap.requiredLevel} required</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className={`progress-bar-fill ${sc.bar}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Radar Chart */}
              {chartData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid stroke="rgba(148, 163, 184, 0.15)" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 4]} stroke="rgba(148, 163, 184, 0.15)" tickCount={5} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar name="Current" dataKey="Current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} strokeWidth={2} />
                      <Radar name="Required" dataKey="Required" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} strokeWidth={2} strokeDasharray="4 2" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '11px' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                      <Award className="w-7 h-7 text-indigo-400 opacity-50" />
                    </div>
                    <p className="text-sm text-slate-500">Complete assessment to see radar</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Learning Path */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-fade-up delay-400">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <h3 className="text-base font-bold text-white flex items-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <Sparkles className="w-4.5 h-4.5 mr-2 text-indigo-400" style={{ width: '18px', height: '18px' }} />
                  AI Personalized Learning Path
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Courses tailored to close your active skill gaps</p>
              </div>
              <Link to="/courses" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center transition">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="space-y-3 relative z-10">
              {learningPath.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3 opacity-60" />
                  <p className="text-sm text-slate-400 font-medium">You're all caught up!</p>
                  <p className="text-xs text-slate-600 mt-1">Your skills meet or exceed all target requirements.</p>
                </div>
              ) : (
                learningPath.slice(0, 3).map((item, i) => (
                  <div
                    key={item.stepNumber}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-indigo-500/25 hover:bg-indigo-500/5 transition-all duration-200 group animate-fade-up"
                    style={{ animationDelay: `${0.45 + i * 0.08}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/25 text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {String(item.stepNumber).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition">{item.recommendedCourse?.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/6 text-slate-400 border border-white/8">
                            {item.recommendedCourse?.provider}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/12 text-emerald-400 border border-emerald-500/20">
                            FREE
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Skill: <strong className="text-slate-300">{item.skillName}</strong> · Est. {item.timelineEstimate}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/courses"
                      className="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/15 hover:border-indigo-500/50"
                    >
                      View Course →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-5">
          <div className="glass-panel rounded-2xl p-5 animate-fade-up delay-400">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              {[
                { to: '/assessment', icon: Award,   label: 'Rate My Skills',   sub: 'Update self-evaluations', color: 'indigo' },
                { to: '/mentorship', icon: Users,   label: 'Find Peer Mentor',  sub: 'Match with expert peers', color: 'violet' },
                { to: '/training',   icon: BookOpen, label: 'Learning Catalog', sub: 'Browse all courses',      color: 'cyan'   },
              ].map(({ to, icon: Icon, label, sub, color }) => (
                <Link
                  key={to}
                  to={to}
                  className="w-full p-3.5 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 flex items-center justify-between group transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${color}-500/12 text-${color}-400`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200 group-hover:text-white">{label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Progress Summary Card */}
          <div className="relative rounded-2xl p-5 overflow-hidden border border-emerald-500/15 animate-fade-up delay-500"
            style={{ background: 'linear-gradient(135deg, #031210 0%, #041a14 100%)' }}>
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Progress</h3>
            {stats?.coursesCompleted != null ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Courses Completed</span>
                    <span className="text-emerald-400 font-bold">{stats.coursesCompleted}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill progress-bar-fill-emerald" style={{ width: `${Math.min((stats.coursesCompleted / 10) * 100, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Gaps Remaining</span>
                    <span className="text-rose-400 font-bold">{stats.gapCount || 0}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill progress-bar-fill-rose" style={{ width: `${Math.min((stats.gapCount / 10) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Complete your assessment to track progress.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
