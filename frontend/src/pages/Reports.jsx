import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Card = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white dark:bg-[#1a202c] shadow-sm rounded-xl border border-slate-200 dark:border-white/5 transition-colors duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, action, actionText }) => (
  <div className="flex justify-between items-center mb-6">
    <h3 className="font-bold text-slate-800 dark:text-white text-[15px]">{title}</h3>
    {action && (
      <button className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline">
        {actionText || 'View All'}
      </button>
    )}
  </div>
);

const StatCard = ({ title, value, subtext, trend, trendUp, icon, iconBg, iconColor }) => (
  <Card className="flex flex-col p-5 h-full justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        {icon}
      </div>
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1 truncate">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{value}</h3>
      <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
        <span className="truncate">{subtext}</span>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[11px] font-bold mt-2 ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trendUp ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
          )}
          {trend}
        </div>
      )}
    </div>
  </Card>
);

// --- Data ---
const departmentReadinessData = [
  { name: 'Engineering', value: 78, fill: '#4f46e5' }, // indigo-600
  { name: 'Product', value: 72, fill: '#0ea5e9' }, // sky-500
  { name: 'QA', value: 65, fill: '#10b981' }, // emerald-500
  { name: 'Sales', value: 58, fill: '#f59e0b' }, // amber-500
  { name: 'HR', value: 48, fill: '#ef4444' }, // red-500
];

const skillSeverityData = [
  { name: 'Critical (81-100%)', value: 68, fill: '#ef4444', percent: '13%' }, // red-500
  { name: 'High (61-80%)', value: 142, fill: '#f97316', percent: '27%' }, // orange-500
  { name: 'Medium (41-60%)', value: 188, fill: '#eab308', percent: '35%' }, // yellow-500
  { name: 'Low (21-40%)', value: 92, fill: '#3b82f6', percent: '17%' }, // blue-500
  { name: 'No Gap (0-20%)', value: 42, fill: '#06b6d4', percent: '8%' }, // cyan-500
];

const topSkillGaps = [
  { name: 'Kubernetes', percent: 85, color: 'bg-red-500', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>, iconColor: 'text-red-500' },
  { name: 'Data Science', percent: 72, color: 'bg-indigo-500', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0119.5 16.5h-2.25m-9 0h9l-4.5 5.25L9 16.5z" /></svg>, iconColor: 'text-indigo-500' },
  { name: 'Machine Learning', percent: 68, color: 'bg-orange-500', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M5.25 12h13.5m-13.5 3h13.5m-12 3h10.5m-14.25-12h16.5A2.25 2.25 0 0122.5 8.25v10.5a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18.75V8.25A2.25 2.25 0 013.75 6z" /></svg>, iconColor: 'text-orange-500' },
  { name: 'AWS', percent: 60, color: 'bg-yellow-500', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>, iconColor: 'text-yellow-500' },
  { name: 'Cybersecurity', percent: 45, color: 'bg-blue-500', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, iconColor: 'text-blue-500' },
];

const learningProgressData = [
  { name: 'Dec \'24', percent: 48 },
  { name: 'Jan \'25', percent: 52 },
  { name: 'Feb \'25', percent: 56 },
  { name: 'Mar \'25', percent: 61 },
  { name: 'Apr \'25', percent: 65 },
  { name: 'May \'25', percent: 68 },
];

const trainingCompletionData = [
  { name: 'Completed', value: 1248, fill: '#4f46e5', percent: '64%' }, // indigo-600
  { name: 'In Progress', value: 468, fill: '#0ea5e9', percent: '24%' }, // sky-500
  { name: 'Not Started', value: 234, fill: '#e2e8f0', percent: '12%' }, // slate-200
];

const recentReports = [
  { name: 'Monthly Skill Gap Analysis', type: 'Skill Gap', typeColor: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10', creator: 'Bhargav', date: 'May 31, 2025 10:30 AM', format: 'PDF', formatColor: 'text-red-500' },
  { name: 'Department Readiness Report', type: 'Department', typeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10', creator: 'Rohit Singh', date: 'May 30, 2025 04:15 PM', format: 'Excel', formatColor: 'text-emerald-500' },
  { name: 'Learning Progress Report', type: 'Learning', typeColor: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10', creator: 'Bhargav', date: 'May 29, 2025 11:45 AM', format: 'PDF', formatColor: 'text-red-500' },
  { name: 'Employee Skill Summary', type: 'Summary', typeColor: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10', creator: 'Neha Gupta', date: 'May 28, 2025 03:20 PM', format: 'Excel', formatColor: 'text-emerald-500' },
];

const quickReports = [
  { title: 'Skill Gap Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, bg: 'bg-indigo-50 dark:bg-indigo-500/10', color: 'text-indigo-600 dark:text-indigo-400' },
  { title: 'Department Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>, bg: 'bg-blue-50 dark:bg-blue-500/10', color: 'text-blue-600 dark:text-blue-400' },
  { title: 'Learning Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>, bg: 'bg-emerald-50 dark:bg-emerald-500/10', color: 'text-emerald-600 dark:text-emerald-400' },
  { title: 'Individual Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>, bg: 'bg-orange-50 dark:bg-orange-500/10', color: 'text-orange-600 dark:text-orange-400' },
  { title: 'Performance Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm13.5-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V9.75z" /></svg>, bg: 'bg-yellow-50 dark:bg-yellow-500/10', color: 'text-yellow-600 dark:text-yellow-400' },
  { title: 'Custom Report', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>, bg: 'bg-sky-50 dark:bg-sky-500/10', color: 'text-sky-600 dark:text-sky-400' },
];

const Reports = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-slate-50/50 dark:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">Reports</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Reports</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Comprehensive insights and analytics to drive data-driven decisions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
            Schedule Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Export Report
          </button>
          <button className="px-4 py-2 bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
            Filters
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Total Employees" value="248" subtext="Across all departments" trend="8.5% vs last month" trendUp={true}
          iconBg="bg-indigo-100 dark:bg-indigo-500/20" iconColor="text-indigo-600 dark:text-indigo-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
        />
        <StatCard 
          title="Skills Tracked" value="532" subtext="Active skills" trend="12.3% vs last month" trendUp={true}
          iconBg="bg-blue-100 dark:bg-blue-500/20" iconColor="text-blue-600 dark:text-blue-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm13.5-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V9.75z" /></svg>}
        />
        <StatCard 
          title="Avg. Skill Score" value="72%" subtext="Overall average" trend="6.7% vs last month" trendUp={true}
          iconBg="bg-rose-100 dark:bg-rose-500/20" iconColor="text-rose-600 dark:text-rose-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>}
        />
        <StatCard 
          title="Readiness Score" value="68%" subtext="Workforce readiness" trend="5.2% vs last month" trendUp={true}
          iconBg="bg-emerald-100 dark:bg-emerald-500/20" iconColor="text-emerald-600 dark:text-emerald-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
        />
        <StatCard 
          title="Learning Hours" value="1,248" subtext="This month" trend="14.6% vs last month" trendUp={true}
          iconBg="bg-orange-100 dark:bg-orange-500/20" iconColor="text-orange-600 dark:text-orange-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
        />
      </div>

      {/* Tabs & Date Picker */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-200 dark:border-white/10 pb-2">
        <div className="flex gap-6 overflow-x-auto w-full md:w-auto hide-scrollbar">
          <button className="text-sm font-bold text-indigo-600 dark:text-[#d9f95d] border-b-2 border-indigo-600 dark:border-[#d9f95d] pb-2 whitespace-nowrap">Overview</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap transition-colors">Skills</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap transition-colors">Learning</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap transition-colors">Performance</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap transition-colors">Departments</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap transition-colors">Custom Reports</button>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
          May 1 - May 31, 2025
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
      </div>

      {/* Main Charts Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Skill Readiness by Department */}
        <Card className="flex flex-col h-[320px]">
          <SectionTitle title="Skill Readiness by Department" />
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentReadinessData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} width={75} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {departmentReadinessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-4 mt-2">
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
        </Card>

        {/* Skill Gap Severity Distribution */}
        <Card className="flex flex-col h-[320px]">
          <SectionTitle title="Skill Gap Severity Distribution" />
          <div className="flex-1 flex items-center justify-between">
            <div className="relative w-[140px] h-[140px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillSeverityData}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {skillSeverityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff'}} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900 dark:text-white">532</span>
                <span className="text-[9px] text-slate-500 font-medium">Total Skills</span>
              </div>
            </div>
            
            <div className="flex-1 pl-6 space-y-3">
              {skillSeverityData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-800 dark:text-white w-6 text-right">{item.value}</span>
                    <span className="text-slate-400 w-8 text-right font-medium">({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Skill Gaps */}
        <Card className="flex flex-col h-[320px]">
          <SectionTitle title="Top Skill Gaps" action={true} />
          <div className="flex flex-col justify-between flex-1">
            {topSkillGaps.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 ${skill.iconColor}`}>
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{skill.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-1.5 rounded-full ${skill.color}`} style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Main Charts Grid Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Learning Progress Trend */}
        <Card className="flex flex-col h-[320px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white text-[15px]">Learning Progress Trend</h3>
            <select className="px-2 py-1 bg-transparent border-none text-xs font-semibold text-slate-500 focus:outline-none cursor-pointer">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex-1 w-full min-h-0 -ml-4 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningProgressData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 500}} tickFormatter={(val) => `${val}%`} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff', fontWeight: 'bold'}} labelStyle={{color: '#94a3b8', fontSize: '12px'}} formatter={(value) => [`${value}%`, 'Progress']} />
                <Area type="monotone" dataKey="percent" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorPercent)" activeDot={{r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Training Completion Rate */}
        <Card className="flex flex-col h-[320px]">
          <SectionTitle title="Training Completion Rate" />
          <div className="flex-1 flex items-center justify-between">
            <div className="relative w-[150px] h-[150px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trainingCompletionData}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {trainingCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff'}} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">64%</span>
                <span className="text-[10px] text-slate-500 font-medium">Completed</span>
              </div>
            </div>
            
            <div className="flex-1 pl-4 space-y-4">
              {trainingCompletionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-800 dark:text-white">{item.percent}</span>
                    <span className="text-slate-400 font-medium">({item.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-500">Total Training Assigned</span>
            <span className="font-bold text-slate-900 dark:text-white">1,950</span>
          </div>
        </Card>

        {/* Report Highlights */}
        <Card className="flex flex-col h-[320px]">
          <SectionTitle title="Report Highlights" />
          <div className="flex flex-col justify-between flex-1">
            
            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">Overall skill readiness improved by <span className="text-emerald-500">5.2%</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">Compared to last month</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">Learning hours increased by <span className="text-blue-500">14.6%</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">Great job! Keep it up.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded flex items-center justify-center bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">Engineering department has highest readiness</p>
                <p className="text-[11px] text-slate-500 mt-0.5"><span className="font-semibold">78%</span> average score</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">Kubernetes skill gap is critical</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Immediate attention required</p>
              </div>
            </div>

          </div>
        </Card>

      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Reports Table */}
        <Card noPadding className="lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 pb-2">
            <SectionTitle title="Recent Reports" action={true} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created By</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created On</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {recentReports.map((report, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800 dark:text-white text-[13px] hover:text-indigo-600 dark:hover:text-[#d9f95d] cursor-pointer transition-colors">{report.name}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${report.typeColor}`}>{report.type}</span>
                    </td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600 dark:text-slate-300">
                      {report.creator}
                    </td>
                    <td className="px-4 py-4 text-[12px] text-slate-500">
                      {report.date}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        {report.format === 'PDF' ? (
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${report.formatColor}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${report.formatColor}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        )}
                        <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">{report.format}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button className="hover:text-indigo-600 dark:hover:text-[#d9f95d] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                        <button className="hover:text-indigo-600 dark:hover:text-[#d9f95d] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg></button>
                        <button className="hover:text-indigo-600 dark:hover:text-[#d9f95d] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg></button>
                        <button className="hover:text-indigo-600 dark:hover:text-[#d9f95d] transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Reports */}
        <Card className="flex flex-col">
          <SectionTitle title="Quick Reports" />
          <div className="grid grid-cols-2 gap-4 flex-1">
            {quickReports.map((qr, idx) => (
              <button key={idx} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-white/5 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-md transition-all group bg-white dark:bg-slate-800/40">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${qr.bg} ${qr.color}`}>
                  {qr.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-[#d9f95d] transition-colors text-center leading-tight">
                  {qr.title}
                </span>
              </button>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Reports;
