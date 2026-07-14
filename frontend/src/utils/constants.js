// ============================================================
// CONSTANTS — Application-wide constants
// ============================================================

export const APP_NAME = 'OrgKnow';
export const APP_FULL_NAME = 'Organizational Knowledge Gap Intelligence Platform';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Roles
export const ROLES = {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  HR: 'HR',
  ADMIN: 'ADMIN',
};

// Proficiency levels
export const PROFICIENCY_LEVELS = {
  BEGINNER: { label: 'Beginner', value: 1, color: '#f43f5e' },
  ELEMENTARY: { label: 'Elementary', value: 2, color: '#f59e0b' },
  INTERMEDIATE: { label: 'Intermediate', value: 3, color: '#06b6d4' },
  ADVANCED: { label: 'Advanced', value: 4, color: '#7c3aed' },
  EXPERT: { label: 'Expert', value: 5, color: '#10b981' },
};

// Gap severities
export const GAP_SEVERITIES = {
  CRITICAL: { label: 'Critical', color: '#f43f5e', bgColor: 'rgba(244, 63, 94, 0.15)' },
  HIGH: { label: 'High', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
  MEDIUM: { label: 'Medium', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
  LOW: { label: 'Low', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' },
};

// Training statuses
export const TRAINING_STATUS = {
  NOT_STARTED: { label: 'Not Started', color: '#94a3b8' },
  IN_PROGRESS: { label: 'In Progress', color: '#06b6d4' },
  COMPLETED: { label: 'Completed', color: '#10b981' },
  OVERDUE: { label: 'Overdue', color: '#f43f5e' },
};

// Skill categories
export const SKILL_CATEGORIES = [
  'Technical', 'Leadership', 'Communication', 'Project Management',
  'Data Analysis', 'Design', 'Marketing', 'Finance', 'Operations', 'HR',
];

// Navigation items by role
export const NAV_ITEMS = {
  EMPLOYEE: [
    { path: '/employee-dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/skills', icon: 'Zap', label: 'My Skills' },
    { path: '/skill-assessment', icon: 'ClipboardCheck', label: 'Assessment' },
    { path: '/gap-analysis', icon: 'TrendingDown', label: 'Gap Analysis' },
    { path: '/training-recommendations', icon: 'BookOpen', label: 'Training' },
    { path: '/learning-paths', icon: 'Map', label: 'Learning Paths' },
    { path: '/mentorship', icon: 'Users', label: 'Mentorship' },
    { path: '/knowledge-sharing', icon: 'Share2', label: 'Knowledge Sharing' },
    { path: '/notifications', icon: 'Bell', label: 'Notifications' },
    { path: '/profile', icon: 'User', label: 'Profile' },
  ],
  MANAGER: [
    { path: '/manager-dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/gap-analysis', icon: 'TrendingDown', label: 'Gap Analysis' },
    { path: '/gap-visualization', icon: 'BarChart3', label: 'Gap Visualization' },
    { path: '/training-recommendations', icon: 'BookOpen', label: 'Training' },
    { path: '/reports', icon: 'FileText', label: 'Reports' },
    { path: '/mentorship', icon: 'Users', label: 'Mentorship' },
    { path: '/knowledge-sharing', icon: 'Share2', label: 'Knowledge Sharing' },
    { path: '/notifications', icon: 'Bell', label: 'Notifications' },
    { path: '/profile', icon: 'User', label: 'Profile' },
  ],
  HR: [
    { path: '/hr-dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/gap-analysis', icon: 'TrendingDown', label: 'Gap Analysis' },
    { path: '/gap-visualization', icon: 'BarChart3', label: 'Visualization' },
    { path: '/training-recommendations', icon: 'BookOpen', label: 'Training' },
    { path: '/course-catalog', icon: 'Library', label: 'Course Catalog' },
    { path: '/learning-paths', icon: 'Map', label: 'Learning Paths' },
    { path: '/mentorship', icon: 'Users', label: 'Mentorship' },
    { path: '/reports', icon: 'FileText', label: 'Reports' },
    { path: '/user-management', icon: 'UserCog', label: 'Users' },
    { path: '/competency-framework', icon: 'Target', label: 'Competency' },
    { path: '/notifications', icon: 'Bell', label: 'Notifications' },
  ],
  ADMIN: [
    { path: '/admin-dashboard', icon: 'LayoutDashboard', label: 'Dashboard' },
    { path: '/user-management', icon: 'UserCog', label: 'User Management' },
    { path: '/competency-framework', icon: 'Target', label: 'Competency' },
    { path: '/role-benchmarking', icon: 'Sliders', label: 'Role Benchmarking' },
    { path: '/reports', icon: 'FileText', label: 'Reports' },
    { path: '/audit-logs', icon: 'Shield', label: 'Audit Logs' },
    { path: '/settings', icon: 'Settings', label: 'Settings' },
    { path: '/notifications', icon: 'Bell', label: 'Notifications' },
  ],
};

// Chart colors
export const CHART_COLORS = {
  primary: ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#6366f1', '#ec4899', '#8b5cf6'],
  gradient: {
    purple: ['#7c3aed', '#5b21b6'],
    cyan: ['#06b6d4', '#0891b2'],
    emerald: ['#10b981', '#059669'],
  },
};

// Mock departments
export const DEPARTMENTS = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Legal', 'Customer Success',
];
