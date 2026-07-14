import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout from '../components/ui/Layout';
import Spinner from '../components/common/Spinner';

// Lazy load pages
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const EmployeeDashboard = lazy(() => import('../pages/EmployeeDashboard'));
const ManagerDashboard = lazy(() => import('../pages/ManagerDashboard'));
const HRDashboard = lazy(() => import('../pages/HRDashboard'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Skills = lazy(() => import('../pages/Skills'));
const SkillAssessment = lazy(() => import('../pages/SkillAssessment'));
const GapAnalysis = lazy(() => import('../pages/GapAnalysis'));
const GapVisualization = lazy(() => import('../pages/GapVisualization'));
const TrainingRecommendations = lazy(() => import('../pages/TrainingRecommendations'));
const LearningPaths = lazy(() => import('../pages/LearningPaths'));
const CourseCatalog = lazy(() => import('../pages/CourseCatalog'));
const TrainingEnrollment = lazy(() => import('../pages/TrainingEnrollment'));
const Mentorship = lazy(() => import('../pages/Mentorship'));
const KnowledgeSharing = lazy(() => import('../pages/KnowledgeSharing'));
const ExpertDirectory = lazy(() => import('../pages/ExpertDirectory'));
const CommunityGroups = lazy(() => import('../pages/CommunityGroups'));
const Reports = lazy(() => import('../pages/Reports'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Settings = lazy(() => import('../pages/Settings'));
const CompetencyFramework = lazy(() => import('../pages/CompetencyFramework'));
const RoleBenchmarking = lazy(() => import('../pages/RoleBenchmarking'));
const UserManagement = lazy(() => import('../pages/UserManagement'));
const AuditLogs = lazy(() => import('../pages/AuditLogs'));
const Help = lazy(() => import('../pages/Help'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--color-bg-primary)' }}>
    <Spinner size="xl" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Protected routes with layout */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-dashboard" element={<PrivateRoute allowedRoles={['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN']}><EmployeeDashboard /></PrivateRoute>} />
          <Route path="/manager-dashboard" element={<PrivateRoute allowedRoles={['MANAGER', 'HR', 'ADMIN']}><ManagerDashboard /></PrivateRoute>} />
          <Route path="/hr-dashboard" element={<PrivateRoute allowedRoles={['HR', 'ADMIN']}><HRDashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={['ADMIN']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
          <Route path="/gap-analysis" element={<GapAnalysis />} />
          <Route path="/gap-visualization" element={<GapVisualization />} />
          <Route path="/training-recommendations" element={<TrainingRecommendations />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/course-catalog" element={<CourseCatalog />} />
          <Route path="/training-enrollment" element={<TrainingEnrollment />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/knowledge-sharing" element={<KnowledgeSharing />} />
          <Route path="/expert-directory" element={<ExpertDirectory />} />
          <Route path="/community-groups" element={<CommunityGroups />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/competency-framework" element={<CompetencyFramework />} />
          <Route path="/role-benchmarking" element={<RoleBenchmarking />} />
          <Route path="/user-management" element={<PrivateRoute allowedRoles={['HR', 'ADMIN']}><UserManagement /></PrivateRoute>} />
          <Route path="/audit-logs" element={<PrivateRoute allowedRoles={['ADMIN']}><AuditLogs /></PrivateRoute>} />
          <Route path="/help" element={<Help />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
