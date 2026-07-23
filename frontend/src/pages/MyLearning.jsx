import React, { useState, useEffect } from 'react';
import { learningPathService } from '../services/api';

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

const MyLearning = () => {
  const [learningPath, setLearningPath] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPath = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await learningPathService.getLearningPath(userId);
        setLearningPath(res.data || []);
      } catch (err) {
        console.error('Error loading learning paths:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPath();
  }, [userId]);

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
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Roadmap Steps" value={learningPath.length} subtext="Assigned tasks"
          iconBg="bg-indigo-100 dark:bg-indigo-500/20" iconColor="text-indigo-600 dark:text-indigo-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75" /></svg>}
        />
        <StatCard 
          title="Providers" value={[...new Set(learningPath.map(s => s.provider))].length} subtext="Unique resources"
          iconBg="bg-emerald-100 dark:bg-emerald-500/20" iconColor="text-emerald-600 dark:text-emerald-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25" /></svg>}
        />
        <StatCard 
          title="Targeted Skills" value={[...new Set(learningPath.map(s => s.skillName))].length} subtext="Gaps targeted"
          iconBg="bg-orange-100 dark:bg-orange-500/20" iconColor="text-orange-600 dark:text-orange-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5" /></svg>}
        />
        <StatCard 
          title="Platform Active" value="100%" subtext="Synced with Spring Boot"
          iconBg="bg-blue-100 dark:bg-blue-500/20" iconColor="text-blue-600 dark:text-blue-400"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25" /></svg>}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-[#d9f95d]"></div>
        </div>
      ) : (
        <Card>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Your Custom Learning Path Roadmap</h3>
          {learningPath.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6">No learning path assigned yet. Update your skills and check AI Recommendations!</p>
          ) : (
            <div className="space-y-6">
              {learningPath.map((step, idx) => (
                <div key={idx} className="p-4 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-sm">
                      {step.step || (idx + 1)}
                    </span>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{step.courseName}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Skill: <span className="font-semibold text-slate-700 dark:text-slate-300">{step.skillName}</span> | Provider: {step.provider} | Duration: {step.duration}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer">
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default MyLearning;
