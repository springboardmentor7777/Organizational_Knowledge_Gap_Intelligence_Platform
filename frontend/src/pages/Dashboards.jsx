import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="glass-panel sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-bold text-white">
            K
          </div>
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Knowledge Gap Platform
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-xs text-indigo-400 uppercase">
              {user?.name?.slice(0, 2) || 'US'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-none">{user?.name}</div>
              <div className="text-[10px] text-brand-400 mt-1.5 font-medium leading-none">{user?.role}</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-red-950/20 hover:border-red-900/30 hover:text-red-300 text-xs font-medium transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Body */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{user?.role} Space</span>
          <h1 className="text-3xl font-extrabold text-white mt-1 tracking-tight">{title}</h1>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {children}
          </div>

          {/* Metrics Sidebar */}
          <div className="glass-card rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">System Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Connection Status</span>
                <span className="flex items-center text-emerald-400 font-semibold space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Active Session</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Environment</span>
                <span className="text-slate-350 font-medium">Staging-V1.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Auth Method</span>
                <span className="text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px] font-mono">
                  JWT Bearer
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-500 leading-relaxed font-mono">
                Platform instance: ready. User credentials verified. Role-based routes enforced.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// 1. Employee Dashboard
export const EmployeeDashboard = () => (
  <DashboardLayout title="Employee Workspace">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">My Skills & Onboarding</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Welcome to your workspace. Here you can start self-assessments, view your current skill gap profiles, and explore learning tracks.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Self Assessment</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Skill Tagging</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">My Learning Path</span>
      </div>
    </div>
  </DashboardLayout>
);

// 2. Team Lead / Manager Dashboard
export const ManagerDashboard = () => (
  <DashboardLayout title="Manager Console">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Team Performance & Gaps</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Oversee your team's skill distributions, approve learning requests, and perform peer skill assessments.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Team Matrices</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Peer Assessments</span>
      </div>
    </div>
  </DashboardLayout>
);

// 3. HR Specialist Dashboard
export const HRDashboard = () => (
  <DashboardLayout title="HR Analytics & Onboarding">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Talent Development</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Track onboarding completions, export organizational competencies, and analyze enterprise-wide training gaps.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Onboarding Progress</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Talent Reports</span>
      </div>
    </div>
  </DashboardLayout>
);

// 4. Department Head Dashboard
export const DeptHeadDashboard = () => (
  <DashboardLayout title="Department Head Space">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Department Competency Overview</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Review departmental capabilities, manage training budgets, and align resource gaps with business needs.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Department Audits</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Strategic Planning</span>
      </div>
    </div>
  </DashboardLayout>
);

// 5. L&D Admin Dashboard
export const LDAdminDashboard = () => (
  <DashboardLayout title="L&D Administration">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Curriculum & Course Management</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Configure courses, organize competency levels (Beginner to Expert), and assign targeted training modules.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Curriculum Configurator</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Competency Mapping</span>
      </div>
    </div>
  </DashboardLayout>
);

// 6. System Administrator Dashboard
export const AdminConsole = () => (
  <DashboardLayout title="System Administration">
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">System Settings & RBAC Profiles</h2>
      <p className="text-slate-300 text-sm leading-relaxed">
        Configure integration endpoints, review logs, verify user credentials, and manage role permission matrices.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Access Policies</span>
        <span className="bg-slate-900 border border-slate-800 text-xs text-indigo-400 px-3 py-1.5 rounded-lg">Platform Logs</span>
      </div>
    </div>
  </DashboardLayout>
);

// Unauthorized View
export const Unauthorized = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-950/50 border border-red-500/20 text-red-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-slate-400 text-sm">
            You do not have permission to view the requested page. Please contact your administrator.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-2 px-4 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-sm font-medium transition-all"
          >
            Go Back
          </button>
          <button
            onClick={logout}
            className="flex-1 py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-500/20 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
