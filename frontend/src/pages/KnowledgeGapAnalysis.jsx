import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[#1a202c] shadow-sm rounded-xl border border-slate-200 dark:border-white/5 p-6 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, subtext, icon, iconBg, iconColor }) => (
  <Card className="flex items-start gap-4 p-5">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{value}</h3>
      <p className="text-slate-500 dark:text-slate-500 text-xs">{subtext}</p>
    </div>
  </Card>
);

const SectionTitle = ({ title, action, actionText }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2">
      <h3 className="font-bold text-slate-800 dark:text-white text-lg">{title}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    </div>
    {action && (
      <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
        {actionText || 'View All'}
      </button>
    )}
  </div>
);

const trendData = [
  { name: 'Dec \'24', gap: 45 },
  { name: 'Jan \'25', gap: 46 },
  { name: 'Feb \'25', gap: 42 },
  { name: 'Mar \'25', gap: 38 },
  { name: 'Apr \'25', gap: 35 },
  { name: 'May \'25', gap: 32 },
];

const gapSummaryData = [
  { name: 'No Gap (81-100%)', value: 6, color: '#10b981' },
  { name: 'Low Gap (61-80%)', value: 8, color: '#34d399' },
  { name: 'Medium Gap (41-60%)', value: 7, color: '#fbbf24' },
  { name: 'High Gap (21-40%)', value: 4, color: '#f97316' },
  { name: 'Critical Gap (0-20%)', value: 3, color: '#ef4444' },
];

const HeatmapCell = ({ text, type }) => {
  if (!text) return <div className="p-2 border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#151a23] text-center text-slate-400">-</div>;
  
  let bgClass = '';
  switch(type) {
    case 'critical': bgClass = 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'; break;
    case 'high': bgClass = 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'; break;
    case 'medium': bgClass = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'; break;
    case 'low': bgClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'; break;
    case 'none': bgClass = 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'; break;
    default: bgClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
  return (
    <div className={`p-2 border border-slate-100 dark:border-white/5 text-center text-[11px] font-semibold flex items-center justify-center min-h-[44px] ${bgClass}`}>
      {text}
    </div>
  );
};

const CustomProgressBar = ({ name, current, required }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="w-24 text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{name}</div>
    <div className="flex-1 relative h-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center px-1">
       {/* Required outline dashed */}
       <div 
         className="absolute left-0 top-1/2 -translate-y-1/2 h-4 border-2 border-dashed border-indigo-300 dark:border-indigo-500/40 rounded-md pointer-events-none"
         style={{ width: `${required}%` }}
       ></div>
       {/* Current fill */}
       <div 
         className="h-1.5 bg-indigo-600 dark:bg-[#d9f95d] rounded-full relative z-10"
         style={{ width: `${current}%` }}
       ></div>
    </div>
    <div className="w-10 text-right text-xs font-bold text-slate-800 dark:text-white">{current}%</div>
  </div>
);

const KnowledgeGapAnalysis = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white/50 dark:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">Knowledge Gap Analysis</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Knowledge Gap Analysis</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Identify skill gaps between your current skills and role requirements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
            Filters
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Report
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-4 flex-1">
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">View</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
              <option>My Gaps</option>
            </select>
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Role</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
              <option>Software Engineer</option>
            </select>
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
              <option>Engineering</option>
            </select>
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Compare With</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none">
              <option>Role Requirements</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-5">
          Last Updated: <span className="font-semibold text-slate-800 dark:text-slate-200">12 May 2025</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Total Skills" value="28" subtext="Assessed"
          iconBg="bg-purple-100 dark:bg-purple-500/20" iconColor="text-purple-600 dark:text-purple-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>}
        />
        <StatCard 
          title="Skills with Gap" value="14" subtext="50% of total"
          iconBg="bg-orange-100 dark:bg-orange-500/20" iconColor="text-orange-600 dark:text-orange-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>}
        />
        <StatCard 
          title="Critical Gaps" value="3" subtext="Require immediate focus"
          iconBg="bg-red-100 dark:bg-red-500/20" iconColor="text-red-600 dark:text-red-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m-1.72 5.7c-.1.252-.356.399-.636.399H3.904c-.394 0-.74-.296-.807-.68a18.25 18.25 0 01.12-5.466M8.118 6.467c.189-.252.482-.416.797-.416h6.17c.315 0 .608.164.797.416.732.983 1.258 2.128 1.543 3.35m-5.462-1.396a.75.75 0 00-1.06 1.06l1.59 1.59-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59 1.59 1.59a.75.75 0 001.06-1.06l-1.59-1.59 1.59-1.59a.75.75 0 00-1.06-1.06l-1.59 1.59-1.59-1.59z" /></svg>}
        />
        <StatCard 
          title="Average Gap" value="32%" subtext="Across all skills"
          iconBg="bg-blue-100 dark:bg-blue-500/20" iconColor="text-blue-600 dark:text-blue-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
        />
        <StatCard 
          title="Overall Readiness" value="68%" subtext="Good"
          iconBg="bg-emerald-100 dark:bg-emerald-500/20" iconColor="text-emerald-600 dark:text-emerald-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Left Main Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Skill Gap Heatmap */}
          <Card>
            <SectionTitle title="Skill Gap Heatmap" />
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header Row */}
                <div className="grid grid-cols-6 gap-1 mb-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 pb-2">Skill Category</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pb-2">Very Low<br/><span className="text-[10px] font-normal">(0-20%)</span></div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pb-2">Low<br/><span className="text-[10px] font-normal">(21-40%)</span></div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pb-2">Medium<br/><span className="text-[10px] font-normal">(41-60%)</span></div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pb-2">High<br/><span className="text-[10px] font-normal">(61-80%)</span></div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center pb-2">Very High<br/><span className="text-[10px] font-normal">(81-100%)</span></div>
                </div>

                {/* Rows */}
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Programming Languages</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="high" text="JavaScript" />
                  <HeatmapCell type="medium" text="Python" />
                  <HeatmapCell type="low" text="Java" />
                  <HeatmapCell type="none" text="" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Frontend Development</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="medium" text="React" />
                  <HeatmapCell type="low" text="HTML/CSS" />
                  <HeatmapCell type="none" text="" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Backend Development</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="high" text="Spring Boot" />
                  <HeatmapCell type="medium" text="Node.js" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Databases</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="high" text="MongoDB" />
                  <HeatmapCell type="medium" text="SQL" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">DevOps / Tools</div>
                  <HeatmapCell type="critical" text="Docker" />
                  <HeatmapCell type="high" text="Kubernetes" />
                  <HeatmapCell type="medium" text="AWS" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-1 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Soft Skills</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="medium" text="Communication" />
                  <HeatmapCell type="low" text="Teamwork" />
                  <HeatmapCell type="none" text="Leadership" />
                </div>
                <div className="grid grid-cols-6 gap-1 mb-4 items-center">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 pr-2">Others</div>
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="none" text="" />
                  <HeatmapCell type="medium" text="Problem Solving" />
                  <HeatmapCell type="low" text="Algorithm" />
                  <HeatmapCell type="none" text="System Design" />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-500"></div> Critical Gap (0-20%)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-orange-500"></div> High Gap (21-40%)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-yellow-400"></div> Medium Gap (41-60%)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-400"></div> Low Gap (61-80%)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-green-500"></div> No Gap (81-100%)</div>
            </div>
          </Card>

          {/* Lower Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Current vs Required Proficiency */}
            <Card>
              <SectionTitle title="Current vs Required Proficiency" />
              <div className="flex gap-4 mb-6 justify-end text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2"><div className="w-3 h-1.5 bg-indigo-600 dark:bg-[#d9f95d] rounded-full"></div> Current Level</div>
                <div className="flex items-center gap-2"><div className="w-3 h-1 border-t-2 border-dashed border-indigo-300 dark:border-indigo-500/40 rounded"></div> Required Level</div>
              </div>
              
              <div className="space-y-1">
                <CustomProgressBar name="Java" current={75} required={90} />
                <CustomProgressBar name="React" current={65} required={85} />
                <CustomProgressBar name="Python" current={40} required={75} />
                <CustomProgressBar name="SQL" current={70} required={85} />
                <CustomProgressBar name="System Design" current={20} required={80} />
                <CustomProgressBar name="AWS" current={35} required={75} />
              </div>

              {/* Axis */}
              <div className="flex justify-between pl-28 pr-14 mt-2 text-[10px] text-slate-400 font-semibold">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </Card>

            {/* Gap Trend Over Time */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Gap Trend Over Time</h3>
                </div>
                <select className="px-2 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <option>Last 6 Months</option>
                </select>
              </div>
              
              <div className="h-[220px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} className="dark:fill-slate-400" />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} className="dark:fill-slate-400" domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="gap" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} label={{ position: 'top', fill: '#64748b', fontSize: 10, dy: -5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                Gap reduced by 13% in last 6 months
              </div>
            </Card>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          
          {/* Gap Summary Donut */}
          <Card>
            <SectionTitle title="Gap Summary" />
            <div className="flex items-center">
              <div className="w-[140px] h-[140px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gapSummaryData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {gapSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Inner Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">28</span>
                  <span className="text-[10px] text-slate-500">Total Skills</span>
                </div>
              </div>
              
              <div className="flex-1 pl-4 space-y-2">
                {gapSummaryData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </div>
                    <div className="text-slate-800 dark:text-white font-bold">
                      {item.value} <span className="text-slate-400 font-normal ml-1">({Math.round((item.value/28)*100)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Critical Gaps List */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-lg">Critical Gaps</h3>
                <span className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded">3</span>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {[
                { name: 'System Design', cat: 'Architecture & Design', gap: '12%' },
                { name: 'Kubernetes', cat: 'DevOps', gap: '15%' },
                { name: 'Advanced Algorithms', cat: 'Problem Solving', gap: '18%' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="text-red-500 bg-red-50 dark:bg-red-500/10 p-1.5 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m-1.72 5.7c-.1.252-.356.399-.636.399H3.904c-.394 0-.74-.296-.807-.68a18.25 18.25 0 01.12-5.466M8.118 6.467c.189-.252.482-.416.797-.416h6.17c.315 0 .608.164.797.416.732.983 1.258 2.128 1.543 3.35m-5.462-1.396a.75.75 0 00-1.06 1.06l1.59 1.59-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59 1.59 1.59a.75.75 0 001.06-1.06l-1.59-1.59 1.59-1.59a.75.75 0 00-1.06-1.06l-1.59 1.59-1.59-1.59z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                      <p className="text-[10px] text-slate-500">{item.cat}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-red-500 border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">Critical</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.gap}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Skills to Focus */}
          <Card>
             <SectionTitle title="Top Skills to Focus" action={true} />
             <div className="space-y-4">
               {[
                 { name: 'System Design', color: 'bg-red-500', w: '88%' },
                 { name: 'Kubernetes', color: 'bg-red-400', w: '85%' },
                 { name: 'Advanced Algorithms', color: 'bg-orange-500', w: '82%' },
                 { name: 'Microservices', color: 'bg-indigo-500', w: '65%' },
                 { name: 'CI/CD', color: 'bg-indigo-400', w: '60%' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        {/* generic icon placeholder */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                     </div>
                     <span className="font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                   </div>
                   <div className="flex items-center gap-3 w-32 justify-end">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex justify-end">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.w }}></div>
                      </div>
                      <span className={`text-[10px] font-bold ${item.color.replace('bg-', 'text-')}`}>{item.w} gap</span>
                   </div>
                 </div>
               ))}
             </div>
          </Card>

          {/* Gap Severity Cards */}
          <Card>
            <SectionTitle title="Gap Severity" action={true} actionText="View Details" />
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg p-2 text-center">
                <div className="text-xl font-bold text-red-600 dark:text-red-400">3</div>
                <div className="text-[10px] font-semibold text-red-500">Critical</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-lg p-2 text-center">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">4</div>
                <div className="text-[10px] font-semibold text-orange-500">High</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 rounded-lg p-2 text-center">
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-500">7</div>
                <div className="text-[10px] font-semibold text-yellow-600 dark:text-yellow-500">Medium</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg p-2 text-center">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">8</div>
                <div className="text-[10px] font-semibold text-emerald-500">Low</div>
              </div>
            </div>
            <div className="text-center mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Skills with Gap: <span className="text-slate-900 dark:text-white">22 / 28</span>
            </div>
          </Card>

        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-4">
        <SectionTitle title="AI Recommendations" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col border border-indigo-100 dark:border-indigo-500/20 shadow-md shadow-indigo-100/50 dark:shadow-indigo-500/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Learn System Design</h4>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">High impact skill for your role</p>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-500/30">High Priority</span>
              </div>
            </div>
            <button className="w-full mt-auto py-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-lg text-sm font-semibold transition-colors">
              View Learning Path
            </button>
          </Card>
          
          <Card className="flex flex-col border border-red-100 dark:border-red-500/20 shadow-md shadow-red-100/50 dark:shadow-red-500/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-100 dark:border-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Master Kubernetes</h4>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">Critical for DevOps & Cloud roles</p>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-500/20 dark:text-red-400 px-2 py-1 rounded border border-red-200 dark:border-red-500/30">Critical</span>
              </div>
            </div>
            <button className="w-full mt-auto py-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-lg text-sm font-semibold transition-colors">
              View Learning Path
            </button>
          </Card>

          <Card className="flex flex-col border border-orange-100 dark:border-orange-500/20 shadow-md shadow-orange-100/50 dark:shadow-orange-500/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Advanced Algorithms</h4>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">Improve problem solving skills</p>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-500/20 dark:text-orange-400 px-2 py-1 rounded border border-orange-200 dark:border-orange-500/30">High Priority</span>
              </div>
            </div>
            <button className="w-full mt-auto py-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-lg text-sm font-semibold transition-colors">
              View Learning Path
            </button>
          </Card>
        </div>
        <div className="text-center mt-6">
          <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-2 mx-auto">
            View All Recommendations
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default KnowledgeGapAnalysis;
