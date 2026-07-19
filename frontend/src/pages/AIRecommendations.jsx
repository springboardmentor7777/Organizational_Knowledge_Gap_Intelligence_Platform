import React, { useState } from 'react';

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
    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{title}</h3>
    {action && (
      <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
        {actionText || 'View All'}
      </button>
    )}
  </div>
);

const StarRating = ({ rating, className = "w-3 h-3" }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={`${className} ${star <= rating ? 'text-yellow-400' : 'text-slate-200 dark:text-slate-700'}`}
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
  );
};

const topCourses = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" clipRule="evenodd" /><path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" /></svg>,
    iconBg: "bg-slate-900",
    title: "React.js Complete Guide from Beginner to Advanced",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Udemy",
    providerLogo: <span className="text-red-500 font-bold italic text-lg mr-1">u</span>,
    skills: [
      { name: 'React.js', color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' },
      { name: 'Frontend', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' }
    ],
    duration: "18h 45m",
    match: 95,
    rating: 5
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" /></svg>,
    iconBg: "bg-red-500",
    title: "Advanced Java Programming",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Coursera",
    providerLogo: <span className="text-blue-600 font-bold text-lg mr-1">C</span>,
    skills: [
      { name: 'Java', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
      { name: 'Backend', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' }
    ],
    duration: "20h 30m",
    match: 94,
    rating: 5
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" clipRule="evenodd" /></svg>,
    iconBg: "bg-emerald-500",
    title: "Spring Boot 3 Masterclass",
    level: "Intermediate",
    levelColor: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/20",
    provider: "Udemy",
    providerLogo: <span className="text-red-500 font-bold italic text-lg mr-1">u</span>,
    skills: [
      { name: 'Spring Boot', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' },
      { name: 'Backend', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' }
    ],
    duration: "15h 20m",
    match: 90,
    rating: 4
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" /></svg>,
    iconBg: "bg-slate-700",
    title: "SQL for Data Analysis and Reporting",
    level: "Intermediate",
    levelColor: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/20",
    provider: "Coursera",
    providerLogo: <span className="text-blue-600 font-bold text-lg mr-1">C</span>,
    skills: [
      { name: 'SQL', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' }
    ],
    duration: "12h 10m",
    match: 88,
    rating: 4
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" /></svg>,
    iconBg: "bg-blue-600",
    title: "Docker & Kubernetes The Complete Guide",
    level: "Advanced",
    levelColor: "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/20",
    provider: "Udemy",
    providerLogo: <span className="text-red-500 font-bold italic text-lg mr-1">u</span>,
    skills: [
      { name: 'Docker', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' },
      { name: 'Kubernetes', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' }
    ],
    duration: "16h 40m",
    match: 87,
    rating: 4
  }
];

const externalResources = [
  { title: 'Effective Communication for Developers', time: '2h 15m', level: 'Intermediate', rating: 4.8, reviews: '1.2K', bg: 'from-blue-500 to-indigo-600' },
  { title: 'Data Structures & Algorithms Essential Training', time: '1h 45m', level: 'Intermediate', rating: 4.7, reviews: '980', bg: 'from-slate-700 to-slate-900' },
  { title: 'Agile Project Management Fundamentals', time: '1h 30m', level: 'Beginner', rating: 4.6, reviews: '860', bg: 'from-emerald-500 to-teal-600' },
  { title: 'Cloud Computing Foundations', time: '2h 05m', level: 'Intermediate', rating: 4.7, reviews: '1.1K', bg: 'from-cyan-500 to-blue-500' },
];

const AIRecommendations = () => {
  const [activeTab, setActiveTab] = useState('Recommended Courses');
  const [activeSubTab, setActiveSubTab] = useState('LinkedIn Learning');
  const tabs = ['Recommended Courses', 'Learning Paths', 'External Resources', 'Certifications'];
  const subTabs = ['Coursera', 'Udemy', 'LinkedIn Learning', 'Documentation', 'Blogs & Articles'];

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-slate-50/50 dark:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">AI Recommendations</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">AI Recommendations</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Personalized learning recommendations to bridge your skill gaps and accelerate growth.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors shadow-sm">
            View My Gaps
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Recalculate Recommendations
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Recommended for You" value="8" subtext="Courses"
          iconBg="bg-purple-100 dark:bg-purple-500/20" iconColor="text-purple-600 dark:text-purple-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>}
        />
        <StatCard 
          title="Learning Paths" value="3" subtext="Active Paths"
          iconBg="bg-green-100 dark:bg-green-500/20" iconColor="text-green-600 dark:text-green-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
        />
        <StatCard 
          title="Total Learning Time" value="42h 30m" subtext="Estimated"
          iconBg="bg-orange-100 dark:bg-orange-500/20" iconColor="text-orange-600 dark:text-orange-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Recommendation Score" value="92%" subtext="Highly Relevant"
          iconBg="bg-blue-100 dark:bg-blue-500/20" iconColor="text-blue-600 dark:text-blue-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm13.5-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V9.75z" /></svg>}
        />
        <StatCard 
          title="Skills You Can Gain" value="12" subtext="New Skills"
          iconBg="bg-rose-100 dark:bg-rose-500/20" iconColor="text-rose-600 dark:text-rose-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
        />
      </div>

      {/* Nav and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-white/5 mb-8 gap-4">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab 
                  ? 'border-indigo-600 text-indigo-600 dark:border-[#d9f95d] dark:text-[#d9f95d]' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pb-2 md:pb-0">
          <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-500">
            <option>Sort by: Relevance</option>
          </select>
          <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:border-indigo-500">
            <option>Skill Gap Priority</option>
          </select>
          <button className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        
        {/* Left Main Area */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* Top Recommended Courses */}
          <Card className="p-0 overflow-hidden">
             <div className="p-6 border-b border-slate-200 dark:border-white/5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Top Recommended Courses</h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-slate-50/50 dark:bg-[#151a23] text-xs font-semibold text-slate-500 uppercase tracking-wider">
                     <th className="px-6 py-4 font-semibold">Course Details</th>
                     <th className="px-6 py-4 font-semibold">Provider</th>
                     <th className="px-6 py-4 font-semibold">Skill Gap Addressed</th>
                     <th className="px-6 py-4 font-semibold">Duration</th>
                     <th className="px-6 py-4 font-semibold text-center">Match Score</th>
                     <th className="px-6 py-4 font-semibold text-center">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                   {topCourses.map((course, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                       <td className="px-6 py-4">
                         <div className="flex items-start gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${course.iconBg}`}>
                             {course.icon}
                           </div>
                           <div className="max-w-[200px]">
                             <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1">{course.title}</h4>
                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${course.levelColor}`}>
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
                         <div className="flex flex-wrap gap-1.5">
                           {course.skills.map((skill, i) => (
                             <span key={i} className={`text-[10px] font-semibold px-2 py-1 rounded ${skill.color}`}>
                               {skill.name}
                             </span>
                           ))}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                         <div className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {course.duration}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-center">
                         <div className="flex flex-col items-center gap-1">
                           <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">{course.match}%</span>
                           <StarRating rating={course.rating} />
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center justify-center gap-3">
                           <button className="px-3 py-1.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded font-semibold text-xs transition-colors whitespace-nowrap">
                             View Course
                           </button>
                           <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             <div className="p-4 border-t border-slate-200 dark:border-white/5 text-center">
               <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-2 mx-auto px-4 py-2 border border-indigo-100 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors w-full md:w-auto">
                 View All Recommended Courses
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
               </button>
             </div>
          </Card>

          {/* Curated External Resources */}
          <div>
            <SectionTitle title="Curated External Resources" action={true} actionText="View All Resources" />
            <div className="flex border-b border-slate-200 dark:border-white/5 mb-6 overflow-x-auto hide-scrollbar">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    activeSubTab === tab 
                      ? 'border-indigo-600 text-indigo-600 dark:border-[#d9f95d] dark:text-[#d9f95d]' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
              {externalResources.map((resource, i) => (
                <div key={i} className="min-w-[240px] max-w-[240px] flex-shrink-0 group cursor-pointer">
                  <div className={`h-[140px] w-full rounded-xl mb-3 relative overflow-hidden bg-gradient-to-br ${resource.bg} p-4 flex flex-col justify-between`}>
                    {/* Fake LinkedIn Logo */}
                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm">
                       <span className="text-white font-bold text-xs">in</span>
                    </div>
                    {/* SVG abstract placeholder */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-40 transition-opacity" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon fill="white" points="0,100 100,0 100,100"/>
                    </svg>
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                      {resource.time}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-[#d9f95d] transition-colors">{resource.title}</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/10 px-1.5 py-0.5 rounded font-medium">{resource.level}</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-400"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" /></svg>
                      {resource.rating} <span className="text-slate-400 font-normal">({resource.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="min-w-[50px] flex items-center justify-center">
                 <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-[#d9f95d] shadow-sm transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                 </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-6">
          
          {/* Recommended Learning Path */}
          <Card>
            <SectionTitle title="Recommended Learning Path" action={true} actionText="View All Paths" />
            <div className="bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-100 dark:border-indigo-500/20 p-5">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">Full Stack Developer Path</h4>
              
              {/* Progress Bar */}
              <div className="mb-6">
                 <div className="flex justify-end text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">65% Complete</div>
                 <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-1.5">
                    <div className="bg-indigo-600 dark:bg-[#d9f95d] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                 </div>
              </div>

              {/* Timeline Stepper */}
              <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6 pb-2">
                
                {/* Completed Step */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1a202c] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-300">HTML, CSS & JavaScript</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">Completed</span>
                  </div>
                </div>

                {/* In Progress Step */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 dark:bg-[#d9f95d] border-2 border-white dark:border-[#1a202c] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">React.js Development</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded">In Progress</span>
                  </div>
                </div>

                {/* Next Step */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-500 flex items-center justify-center">
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Backend with Node.js</span>
                    <span className="text-[10px] text-slate-400">Next</span>
                  </div>
                </div>

                {/* Upcoming Steps */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  </div>
                  <div className="flex justify-between items-center text-sm opacity-60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">Database with MongoDB</span>
                    <span className="text-[10px] text-slate-400">Upcoming</span>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  </div>
                  <div className="flex justify-between items-center text-sm opacity-60">
                    <span className="font-medium text-slate-500 dark:text-slate-400">DevOps with Docker</span>
                    <span className="text-[10px] text-slate-400">Upcoming</span>
                  </div>
                </div>

              </div>

              <button className="w-full mt-6 py-2.5 border border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50 dark:bg-transparent dark:border-indigo-500/40 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-lg text-sm font-bold transition-colors">
                Continue Learning Path
              </button>
            </div>
          </Card>

          {/* Why These Recommendations? */}
          <Card>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-5">Why These Recommendations?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-purple-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 2.252.75.75 0 01-.272 1.471 47.621 47.621 0 00-8.13-1.895v2.246a4.5 4.5 0 01-1.353 8.351l-.316 2.054a1.5 1.5 0 01-1.485 1.272h-.292a1.5 1.5 0 01-1.485-1.272l-.316-2.054a4.5 4.5 0 01-1.353-8.351V5.584a47.621 47.621 0 00-8.13 1.895.75.75 0 01-.272-1.471 49.106 49.106 0 019.152-2.252V3a.75.75 0 01.75-.75zm-3 10.5a3 3 0 106 0 3 3 0 00-6 0z" clipRule="evenodd" /></svg></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Based on your skill gaps and role requirements</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.19 12l-1.47-1.47a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-3 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" /></svg></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">AI analysis of 1000+ learning resources</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-amber-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" /></svg></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Industry trends and in-demand skills</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.031 17.031a.75.75 0 01-1.061-1.061l12.22-12.22H15.75a.75.75 0 010-1.5zM4.5 6a2.25 2.25 0 00-2.25 2.25v11.25A2.25 2.25 0 004.5 21h11.25A2.25 2.25 0 0018 18.75V11.25a.75.75 0 00-1.5 0v7.5a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" /></svg></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Personalized for your career growth</span>
              </div>
            </div>
          </Card>

          {/* Top Skills You Will Gain */}
          <Card>
             <SectionTitle title="Top Skills You Will Gain" action={true} />
             <div className="space-y-4">
               {[
                 { name: 'React.js', color: 'bg-indigo-600 dark:bg-indigo-400', w: '95%', level: 'Advanced' },
                 { name: 'Java', color: 'bg-indigo-600 dark:bg-indigo-400', w: '94%', level: 'Advanced' },
                 { name: 'Spring Boot', color: 'bg-indigo-500 dark:bg-indigo-500', w: '90%', level: 'Intermediate' },
                 { name: 'SQL', color: 'bg-indigo-400 dark:bg-indigo-600', w: '88%', level: 'Intermediate' },
                 { name: 'Docker', color: 'bg-indigo-400 dark:bg-indigo-600', w: '87%', level: 'Intermediate' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                     </div>
                     <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs w-20 truncate">{item.name}</span>
                   </div>
                   <div className="flex items-center gap-2 flex-1 mx-2">
                      <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.w }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 w-6 text-right">{item.w}</span>
                   </div>
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded w-16 text-center ${item.level === 'Advanced' ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10' : 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/10'}`}>{item.level}</span>
                 </div>
               ))}
             </div>
             <div className="text-center mt-4">
                <span className="text-[10px] font-semibold text-indigo-500"> +7 more skills</span>
             </div>
          </Card>

        </div>
      </div>
      
    </div>
  );
};

export default AIRecommendations;
