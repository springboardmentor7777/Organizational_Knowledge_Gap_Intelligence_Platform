import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[#1a202c] shadow-sm rounded-xl border border-slate-200 dark:border-white/5 p-6 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, action, actionText }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-[#d9f95d]">
        {/* Generic icon placeholder */}
        <div className="w-3 h-3 bg-current rounded-sm"></div>
      </div>
      <h3 className="font-bold text-slate-800 dark:text-white text-lg">{title}</h3>
    </div>
    {action && (
      <button className="text-cyan-600 dark:text-[#d9f95d] text-sm font-medium hover:underline">
        {actionText || 'View All'}
      </button>
    )}
  </div>
);

const ProgressBar = ({ label, percentage }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <span className="text-slate-500 dark:text-slate-400">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
      <div 
        className="bg-cyan-500 dark:bg-[#d9f95d] h-2 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const MyProfile = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-sm text-slate-500 mb-2">
            Dashboard &gt; <span className="font-semibold text-slate-800 dark:text-white">My Profile</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">My Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">View and manage your personal information</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Left Profile Card */}
        <Card className="flex flex-col items-center text-center relative">
          <div className="absolute top-4 right-4 bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            Online
          </div>
          <div className="relative mb-4 mt-4">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-[#1a202c] shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 p-1.5 rounded-full shadow-md text-slate-400 hover:text-cyan-600 dark:hover:text-[#d9f95d]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bhargav</h2>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-1">Software Engineer</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Engineering Department</p>
          
          <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg px-4 py-2 flex items-center justify-center gap-3 w-full mb-6">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold flex items-center gap-1">
              ★ Skill Score
            </span>
            <span className="text-slate-800 dark:text-white font-bold">82%</span>
          </div>
          
          <button className="w-full py-2.5 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors flex justify-center items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
            Edit Profile
          </button>
        </Card>

        {/* Right Info Card */}
        <Card className="lg:col-span-2 flex flex-col justify-center">
          <SectionTitle title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            {[
              { label: 'Employee ID', value: 'KG12345' },
              { label: 'Department', value: 'Engineering' },
              { label: 'Email', value: 'bhargav@knowledgegap.com' },
              { label: 'Role', value: 'Software Engineer' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Manager', value: 'Rahul Sharma' },
              { label: 'Date of Joining', value: '15 Jan 2024' },
              { label: 'Location', value: 'Bengaluru, India' },
            ].map((info, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  {/* Generic icon placeholder */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  {info.label}
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm text-right">{info.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid Rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <Card>
            <SectionTitle title="Education" />
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">B.E Computer Science</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">XYZ University</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">CGPA: 8.9</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Graduation: 2027</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002c-.39.16-.836.16-1.227 0a50.125 50.125 0 00-9.906-3.916.75.75 0 01-.23-1.337A60.65 60.65 0 0111.7 2.805z" /><path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 01-.46.711 47.87 47.87 0 00-8.105 4.342.75.75 0 01-.832 0 47.87 47.87 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 00.551-1.607 1.5 1.5 0 00.14-2.67v-.645a40.543 40.543 0 007.152 3.02z" /></svg>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Certifications" action={true} />
            <div className="space-y-3 relative">
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center opacity-20 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-indigo-500"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">✓</div>
                Java Programming
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">✓</div>
                React Developer
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">✓</div>
                SQL (Advanced)
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Achievements" />
            <div className="space-y-4 relative">
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center opacity-20 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-yellow-500"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">🏆</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">Employee of the Month - May 2024</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">🏆</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">Top Performer - Q1 2024</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">🏆</span>
                <span className="text-sm text-slate-700 dark:text-slate-300">React Certification Achiever</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <Card>
            <SectionTitle title="Work Experience" />
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">Frontend Developer</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Experience: 2 Years</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Current Project:</p>
                <p className="text-sm font-medium text-slate-800 dark:text-white">Organizational Knowledge Platform</p>
              </div>
              <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.36-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Languages" />
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-[#d9f95d]"></div>
                  English
                </div>
                <span className="text-slate-500 dark:text-slate-400">Native</span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-[#d9f95d]"></div>
                  Kannada
                </div>
                <span className="text-slate-500 dark:text-slate-400">Native</span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-[#d9f95d]"></div>
                  Hindi
                </div>
                <span className="text-slate-500 dark:text-slate-400">Intermediate</span>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col">
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Profile Completion</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Your profile is 85% complete.</p>
            
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100 dark:text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-indigo-600 dark:text-[#d9f95d]" strokeDasharray="85, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">85%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 flex-1">
                {['Personal Info', 'Skills', 'Education', 'Certifications', 'Work Exp', 'Documents'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center ${i < 5 ? 'bg-green-500 text-white' : 'bg-yellow-400'}`}>
                      {i < 5 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2 h-2"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <Card>
            <SectionTitle title="Skill Inventory" action={true} />
            <div className="space-y-4">
              <ProgressBar label="Java" percentage={90} />
              <ProgressBar label="React" percentage={80} />
              <ProgressBar label="Spring Boot" percentage={65} />
              <ProgressBar label="SQL" percentage={85} />
              <ProgressBar label="Communication" percentage={95} />
            </div>
          </Card>

          <Card>
            <SectionTitle title="Documents" action={true} />
            <div className="space-y-4">
              {['Resume.pdf', 'Degree Certificate.pdf', 'Experience Letter.pdf'].map((doc, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    {doc}
                  </div>
                  <button className="text-slate-400 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-500/20 flex flex-col justify-center items-start relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-4 translate-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-indigo-500"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Complete your profile</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-[200px]">Add more details to get better AI recommendations.</p>
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              Update Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
