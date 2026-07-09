import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 overflow-y-auto relative">
        {/* subtle background glow for dashboard */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 dark:bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
