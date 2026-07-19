import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[#1a202c] shadow-sm rounded-xl border border-slate-200 dark:border-white/5 p-6 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, subtext, icon, iconBg, iconColor }) => (
  <Card className="flex items-start gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</h3>
      <p className="text-slate-500 dark:text-slate-500 text-xs">{subtext}</p>
    </div>
  </Card>
);

const StarRating = ({ rating, size = 'w-4 h-4' }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={`${size} ${star <= rating ? 'text-yellow-400' : 'text-slate-200 dark:text-slate-700'}`}
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
        </svg>
      ))}
    </div>
  );
};

const SkillInventory = () => {
  const skillsList = [
    { name: 'React.js', desc: 'UI Library', cat: 'Frontend', catColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300', rating: 4, label: 'Advanced', percent: 80, yoe: '2.0 years' },
    { name: 'Java', desc: 'Programming Language', cat: 'Backend', catColor: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300', rating: 5, label: 'Expert', percent: 95, yoe: '2.5 years' },
    { name: 'Spring Boot', desc: 'Framework', cat: 'Backend', catColor: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300', rating: 4, label: 'Advanced', percent: 75, yoe: '1.8 years' },
    { name: 'MySQL', desc: 'Database', cat: 'Database', catColor: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300', rating: 4, label: 'Advanced', percent: 85, yoe: '2.0 years' },
    { name: 'Git', desc: 'Version Control', cat: 'Tools', catColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300', rating: 4, label: 'Advanced', percent: 70, yoe: '1.5 years' },
    { name: 'Communication', desc: 'Soft Skill', cat: 'Soft Skill', catColor: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300', rating: 5, label: 'Expert', percent: 90, yoe: '-' },
    { name: 'Problem Solving', desc: 'Soft Skill', cat: 'Soft Skill', catColor: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300', rating: 4, label: 'Advanced', percent: 75, yoe: '-' },
    { name: 'HTML', desc: 'Markup Language', cat: 'Frontend', catColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300', rating: 4, label: 'Advanced', percent: 70, yoe: '1.5 years' },
  ];

  const topSkills = [
    { name: 'Java', rating: 5, percent: 95 },
    { name: 'Communication', rating: 5, percent: 90 },
    { name: 'MySQL', rating: 4, percent: 85 },
    { name: 'React.js', rating: 4, percent: 80 },
    { name: 'Spring Boot', rating: 4, percent: 75 },
  ];

  const skillsToImprove = [
    { name: 'Docker', rating: 2, percent: 40 },
    { name: 'AWS', rating: 2, percent: 45 },
    { name: 'Kubernetes', rating: 3, percent: 50 },
    { name: 'Jenkins', rating: 3, percent: 55 },
    { name: 'Redux', rating: 3, percent: 60 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">Skill Inventory</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Skill Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">View, manage and track all your skills and proficiency levels.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Skill
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard 
          title="Total Skills" value="18" subtext="Skills added"
          iconBg="bg-indigo-100 dark:bg-indigo-500/20" iconColor="text-indigo-600 dark:text-indigo-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>}
        />
        <StatCard 
          title="Technical Skills" value="12" subtext="66.7% of total"
          iconBg="bg-green-100 dark:bg-green-500/20" iconColor="text-green-600 dark:text-green-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Soft Skills" value="6" subtext="33.3% of total"
          iconBg="bg-yellow-100 dark:bg-yellow-500/20" iconColor="text-yellow-600 dark:text-yellow-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
        />
        <StatCard 
          title="Avg. Proficiency" value="78%" subtext="Across all skills"
          iconBg="bg-cyan-100 dark:bg-cyan-500/20" iconColor="text-cyan-600 dark:text-cyan-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" /></svg>}
        />
        <StatCard 
          title="Skills to Improve" value="5" subtext="Below target level"
          iconBg="bg-purple-100 dark:bg-purple-500/20" iconColor="text-purple-600 dark:text-purple-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 0v2.25m0-2.25h2.25m-2.25 0H9.75m1.5-6a9 9 0 110 18 9 9 0 010-18z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Table Area */}
        <div className="xl:col-span-3">
          <Card className="p-0 overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-white/5 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50 dark:bg-[#151a23]">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:text-white"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                  <option>All Categories</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                  <option>All Levels</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                  <option>All Proficiency</option>
                </select>
                <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 focus:outline-none">
                  <option>Sort by: Recently Added</option>
                </select>
                <button className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
                </button>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/30 dark:bg-[#1a202c] text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-3">Skill</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Proficiency Level</div>
              <div className="col-span-3">Proficiency %</div>
              <div className="col-span-1">Years</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {skillsList.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      {/* Placeholder icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{skill.name}</h4>
                      <p className="text-xs text-slate-500">{skill.desc}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${skill.catColor}`}>
                      {skill.cat}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <StarRating rating={skill.rating} />
                    <p className="text-xs text-slate-500 mt-1">{skill.label}</p>
                  </div>
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                      <div className="bg-indigo-600 dark:bg-[#d9f95d] h-1.5 rounded-full" style={{ width: `${skill.percent}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-8">{skill.percent}%</span>
                  </div>
                  <div className="col-span-1 text-sm text-slate-700 dark:text-slate-300">
                    {skill.yoe}
                  </div>
                  <div className="col-span-1 flex items-center justify-center gap-3">
                    <button className="text-indigo-500 hover:text-indigo-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
              <span className="text-sm text-slate-500">Showing 1 to 8 of 18 skills</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">&lt;</button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-indigo-600 text-white font-medium">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">&gt;</button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Analytics Area */}
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Skill Category Distribution</h3>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-32 h-32 shrink-0 rounded-full" style={{
                background: `conic-gradient(
                  #8b5cf6 0% 33.3%, 
                  #10b981 33.3% 61.1%, 
                  #3b82f6 61.1% 72.2%, 
                  #eab308 72.2% 83.3%, 
                  #f43f5e 83.3% 100%
                )`
              }}>
                <div className="absolute inset-4 bg-white dark:bg-[#1a202c] rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">18</span>
                  <span className="text-xs text-slate-500 mt-1">Total</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Frontend <span className="text-slate-400 ml-1">6 (33.3%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Backend <span className="text-slate-400 ml-1">5 (27.8%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Database <span className="text-slate-400 ml-1">2 (11.1%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div> Tools <span className="text-slate-400 ml-1">2 (11.1%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div> Soft Skills <span className="text-slate-400 ml-1">3 (16.7%)</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Top Skills</h3>
            <div className="space-y-4">
              {topSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800"></div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={skill.rating} size="w-3 h-3" />
                    <span className="text-slate-500 text-xs w-8 text-right">{skill.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Skills to Improve</h3>
              <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {skillsToImprove.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800"></div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={skill.rating} size="w-3 h-3" />
                    <span className="text-slate-500 text-xs w-8 text-right">{skill.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default SkillInventory;
