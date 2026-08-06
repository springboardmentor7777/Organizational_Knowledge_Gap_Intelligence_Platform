import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import ManagerDashboard from './ManagerDashboard';
import HrDashboard from './HrDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  switch (user.role) {
    case 'EMPLOYEE':
      return <EmployeeDashboard />;
    case 'MANAGER':
      return <ManagerDashboard />;
    case 'HR_SPECIALIST':
      return <HrDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return <div className="p-8 text-center text-slate-400">Invalid Role Access</div>;
  }
}
