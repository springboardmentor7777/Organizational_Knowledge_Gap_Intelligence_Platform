import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, John! 👋</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Here's your learning & development overview.</p>
      </div>
      
      {/* Placeholder for the complex dashboard grid from the image */}
      <div className="h-64 rounded-xl border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center bg-slate-50 dark:bg-white/5">
        <p className="text-slate-500 font-medium">Employee Dashboard Grid Content Will Go Here</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
