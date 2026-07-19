import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Card = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white dark:bg-[#1a202c] shadow-sm rounded-xl border border-slate-200 dark:border-white/5 transition-colors duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
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
  <div className="flex justify-between items-center mb-6 px-6 pt-6">
    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{title}</h3>
    {action && (
      <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
        {actionText || 'View All'}
      </button>
    )}
  </div>
);

const timeCategoryData = [
  { name: 'Technical Skills', value: 18.33, formatted: '18h 20m', color: '#8b5cf6' },
  { name: 'Soft Skills', value: 12.16, formatted: '12h 10m', color: '#3b82f6' },
  { name: 'Leadership', value: 7.5, formatted: '7h 30m', color: '#10b981' },
  { name: 'Others', value: 4.5, formatted: '4h 30m', color: '#f59e0b' }
];

const enrolledCourses = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" clipRule="evenodd" /><path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" /></svg>,
    iconBg: "bg-slate-900",
    title: "React.js Advanced Concepts",
    subtitle: "Build modern web applications",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Udemy",
    providerLogo: <span className="text-red-500 font-bold italic text-lg mr-1">u</span>,
    progress: 75,
    lastAccessed: "12 May 2025"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" /></svg>,
    iconBg: "bg-red-500",
    title: "Advanced Java Programming",
    subtitle: "Master core Java concepts",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Coursera",
    providerLogo: <span className="text-blue-600 font-bold text-lg mr-1">C</span>,
    progress: 60,
    lastAccessed: "11 May 2025"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" /></svg>,
    iconBg: "bg-slate-700",
    title: "SQL for Data Analysis",
    subtitle: "Analyze data with SQL",
    level: "Intermediate",
    levelColor: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/20",
    provider: "LinkedIn Learning",
    providerLogo: <span className="bg-blue-700 text-white font-bold text-xs px-1 py-0.5 rounded mr-1 leading-none">in</span>,
    progress: 40,
    lastAccessed: "10 May 2025"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" /></svg>,
    iconBg: "bg-blue-600",
    title: "Docker & Kubernetes",
    subtitle: "Containerization basics",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Udemy",
    providerLogo: <span className="text-red-500 font-bold italic text-lg mr-1">u</span>,
    progress: 30,
    lastAccessed: "09 May 2025"
  }
];

const recommendedCourses = [
  { title: 'TypeScript Fundamentals', time: '3h 45m', level: 'Intermediate', rating: 4.6, reviews: '1.2K', bg: 'from-blue-500 to-indigo-600' },
  { title: 'System Design Basics', time: '2h 00m', level: 'Advanced', rating: 4.7, reviews: '2.1K', bg: 'from-slate-700 to-slate-900' },
  { title: 'Effective Communication', time: '1h 30m', level: 'Beginner', rating: 4.5, reviews: '980', bg: 'from-emerald-500 to-teal-600' },
];

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('In Progress (4)');
  const tabs = ['In Progress (4)', 'Completed (3)', 'Wishlist (2)'];

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-slate-50/50 dark:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">My Learning</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">My Learning</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track your learning progress, continue courses and achieve your goals.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
          Browse Courses
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Enrolled Courses" value="7" subtext="Active"
          iconBg="bg-indigo-100 dark:bg-indigo-500/20" iconColor="text-indigo-600 dark:text-indigo-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
        />
        <StatCard 
          title="Courses Completed" value="3" subtext="This Year"
          iconBg="bg-emerald-100 dark:bg-emerald-500/20" iconColor="text-emerald-600 dark:text-emerald-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Learning Hours" value="42h 30m" subtext="Total Time"
          iconBg="bg-orange-100 dark:bg-orange-500/20" iconColor="text-orange-600 dark:text-orange-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Overall Progress" value="68%" subtext="Across all courses"
          iconBg="bg-blue-100 dark:bg-blue-500/20" iconColor="text-blue-600 dark:text-blue-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
        />
        <StatCard 
          title="Certificates Earned" value="4" subtext="View all"
          iconBg="bg-purple-100 dark:bg-purple-500/20" iconColor="text-purple-600 dark:text-purple-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.29 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        
        {/* Left Main Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Learning Progress */}
            <Card className="flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-6">My Learning Progress</h3>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-8">Great job! You are ahead of <span className="font-bold">65%</span> of learners.</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white mb-2">
                   <span>Overall</span>
                   <span className="text-xl">68%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                  <div className="bg-indigo-600 dark:bg-[#d9f95d] h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Keep going! You are doing excellent.</p>
            </Card>

            {/* Time Spent by Category */}
            <Card>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Time Spent by Category</h3>
              <div className="flex items-center">
                <div className="w-[140px] h-[140px] relative shrink-0 -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timeCategoryData}
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {timeCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${props.payload.formatted}`, name]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Inner Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">42h</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mt-1">30m</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  {timeCategoryData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        {item.name}
                      </div>
                      <div className="text-slate-500 font-medium">
                        {item.formatted} <span className="text-slate-400 ml-1">({Math.round((item.value/42.5)*100)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* My Enrolled Courses */}
          <Card noPadding>
            <div className="px-6 pt-6 mb-4 border-b border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">My Enrolled Courses</h3>
              
              <div className="flex overflow-x-auto hide-scrollbar gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === tab 
                        ? 'border-indigo-600 text-indigo-600 dark:border-[#d9f95d] dark:text-[#d9f95d]' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[700px]">
                 <thead>
                   <tr className="bg-transparent text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                     <th className="px-6 py-3">Course</th>
                     <th className="px-6 py-3">Provider</th>
                     <th className="px-6 py-3">Progress</th>
                     <th className="px-6 py-3">Last Accessed</th>
                     <th className="px-6 py-3 text-center">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                   {enrolledCourses.map((course, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                       <td className="px-6 py-4">
                         <div className="flex items-start gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${course.iconBg}`}>
                             {course.icon}
                           </div>
                           <div className="max-w-[200px]">
                             <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1">{course.title}</h4>
                             <p className="text-[11px] text-slate-500 mb-1.5">{course.subtitle}</p>
                             <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${course.levelColor}`}>
                               {course.level}
                             </span>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                           {course.providerLogo}
                           {course.provider}
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex flex-col gap-1.5">
                           <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{course.progress}%</span>
                           <div className="w-24 bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                             <div className="bg-indigo-600 dark:bg-[#d9f95d] h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                         {course.lastAccessed}
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center justify-center gap-3">
                           <button className="px-4 py-1.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap">
                             Continue
                           </button>
                           <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             <div className="p-4 border-t border-slate-200 dark:border-white/5 text-center">
               <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-2 mx-auto px-4 py-2 border border-indigo-100 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                 View All Enrolled Courses
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
               </button>
             </div>
          </Card>

          {/* Bottom Split Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Learning Streak */}
             <Card>
                <SectionTitle title="Learning Streak" />
                <div className="flex items-end gap-3 mb-6">
                  <div className="text-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-none">12</h3>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Days in a row</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2 px-1">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                <div className="flex justify-between items-center px-1 mb-6">
                   {[1,2,3,4,5].map((d) => (
                     <div key={d} className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                     </div>
                   ))}
                   <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center relative">
                     <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent"></div>
                </div>

                <p className="text-[11px] font-medium text-slate-500">Keep it up! Your next milestone is 15 days.</p>
             </Card>

             {/* Recommended for You */}
             <Card>
                <SectionTitle title="Recommended for You" action={true} />
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {recommendedCourses.map((resource, i) => (
                    <div key={i} className="min-w-[200px] max-w-[200px] flex-shrink-0 group cursor-pointer">
                      <div className={`h-[110px] w-full rounded-xl mb-3 relative overflow-hidden bg-gradient-to-br ${resource.bg} p-3 flex flex-col justify-between`}>
                        <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                           <span className="text-white font-bold text-[10px]">in</span>
                        </div>
                        <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-40 transition-opacity" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <polygon fill="white" points="0,100 100,0 100,100"/>
                        </svg>
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {resource.time}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-2 line-clamp-1">{resource.title}</h4>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/10 px-1.5 py-0.5 rounded font-medium">{resource.level}</span>
                        <div className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                          <span className="text-yellow-400">★</span>
                          {resource.rating} <span className="text-slate-400 font-normal">({resource.reviews})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-6">
          
          {/* Upcoming Deadlines */}
          <Card>
            <SectionTitle title="Upcoming Deadlines" action={true} />
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                 <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" /></svg>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">React.js Advanced Concepts</h4>
                    <p className="text-xs text-slate-500 mb-1">Assignment 3</p>
                    <div className="flex items-center text-[10px] font-semibold text-slate-400 gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      15 May 2025
                    </div>
                 </div>
                 <div className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">3 days left</div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                 <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">SQL for Data Analysis</h4>
                    <p className="text-xs text-slate-500 mb-1">Quiz</p>
                    <div className="flex items-center text-[10px] font-semibold text-slate-400 gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      18 May 2025
                    </div>
                 </div>
                 <div className="text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded">6 days left</div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                 <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Agile Project Management</h4>
                    <p className="text-xs text-slate-500 mb-1">Peer Review</p>
                    <div className="flex items-center text-[10px] font-semibold text-slate-400 gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      20 May 2025
                    </div>
                 </div>
                 <div className="text-[10px] font-bold text-yellow-600 bg-yellow-50 dark:text-yellow-500 dark:bg-yellow-500/10 px-2 py-1 rounded">8 days left</div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">Cybersecurity Fundamentals</h4>
                    <p className="text-xs text-slate-500 mb-1 mt-0.5">Assessment</p>
                    <div className="flex items-center text-[10px] font-semibold text-slate-400 gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      25 May 2025
                    </div>
                 </div>
                 <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 px-2 py-1 rounded">13 days left</div>
              </div>
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <SectionTitle title="Recent Achievements" action={true} />
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-500/30">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Course Completed</h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 mb-1">JavaScript Essentials</p>
                    <p className="text-[10px] text-slate-500">Completed on 05 May 2025</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/30">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Certificate Earned</h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 mb-1">Agile Fundamentals</p>
                    <p className="text-[10px] text-slate-500">Earned on 03 May 2025</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-500/30">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Milestone Achieved</h4>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 mb-1">20 Hours of Learning</p>
                    <p className="text-[10px] text-slate-500">Achieved on 01 May 2025</p>
                  </div>
               </div>
            </div>
          </Card>

          {/* Learning Goals */}
          <Card>
            <SectionTitle title="Learning Goals" action={true} actionText="Edit Goals" />
            <div className="space-y-5">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-rose-50 text-rose-500 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Complete 10 courses this year</span>
                     <span className="text-[10px] font-bold text-slate-500">7 / 10</span>
                   </div>
                   <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-blue-50 text-blue-500 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Earn 5 certifications</span>
                     <span className="text-[10px] font-bold text-slate-500">4 / 5</span>
                   </div>
                   <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }}></div>
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-purple-50 text-purple-500 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Learn 50 hours this year</span>
                     <span className="text-[10px] font-bold text-slate-500">42 / 50</span>
                   </div>
                   <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: '84%' }}></div>
                   </div>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Improve React.js skills</span>
                     <span className="text-[10px] font-bold text-slate-500">80%</span>
                   </div>
                   <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                     <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </Card>

        </div>
      </div>
      
    </div>
  );
};

export default MyLearning;
