/**
 * departmentService.js
 * Integrated with GET /departments and provides normalized department skill matrix & heatmap insights.
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

const MOCK_DEPT_MATRIX = [
  {
    id: 1,
    department: 'Engineering',
    name: 'Engineering',
    category: 'Technical',
    employeeCount: 14,
    avgSkillScore: 3.9,
    avgGapScore: 1.1,
    competencyScore: 78,
    healthStatus: 'Excellent',
    trainingPriority: 'Medium',
    criticalSkills: ['Docker', 'React Architecture', 'System Design', 'Kubernetes'],
    missingSkill: 'Docker',
    manager: 'Sarah Jenkins',
    description: 'Core software development and platform engineering team.',
  },
  {
    id: 2,
    department: 'Data Science',
    name: 'Data Science',
    category: 'Data Science',
    employeeCount: 9,
    avgSkillScore: 3.5,
    avgGapScore: 1.4,
    competencyScore: 70,
    healthStatus: 'Good',
    trainingPriority: 'High',
    criticalSkills: ['TensorFlow', 'Power BI', 'Machine Learning', 'SQL'],
    missingSkill: 'Power BI',
    manager: 'Dr. Aris Thorne',
    description: 'Advanced analytics, predictive modeling, and AI research.',
  },
  {
    id: 3,
    department: 'Finance',
    name: 'Finance',
    category: 'Finance',
    employeeCount: 7,
    avgSkillScore: 3.4,
    avgGapScore: 1.3,
    competencyScore: 68,
    healthStatus: 'Good',
    trainingPriority: 'Medium',
    criticalSkills: ['Financial Modeling', 'Excel Macros', 'Power BI'],
    missingSkill: 'Financial Modeling',
    manager: 'Frank Thompson',
    description: 'Financial forecasting, budgeting, and corporate audit.',
  },
  {
    id: 4,
    department: 'Human Resources',
    name: 'Human Resources',
    category: 'Management',
    employeeCount: 6,
    avgSkillScore: 3.0,
    avgGapScore: 1.7,
    competencyScore: 60,
    healthStatus: 'Needs Improvement',
    trainingPriority: 'Medium',
    criticalSkills: ['Project Management', 'HR Analytics', 'Leadership'],
    missingSkill: 'Project Management',
    manager: 'Carol Williams',
    description: 'Talent acquisition, employee success, and organizational development.',
  },
  {
    id: 5,
    department: 'Marketing',
    name: 'Marketing',
    category: 'Marketing',
    employeeCount: 8,
    avgSkillScore: 2.8,
    avgGapScore: 1.9,
    competencyScore: 56,
    healthStatus: 'Needs Improvement',
    trainingPriority: 'High',
    criticalSkills: ['Technical SEO', 'Google Analytics 4', 'Brand Strategy'],
    missingSkill: 'Technical SEO',
    manager: 'Eva Patel',
    description: 'Brand positioning, digital marketing, and growth acquisition.',
  },
  {
    id: 6,
    department: 'Operations',
    name: 'Operations',
    category: 'Operations',
    employeeCount: 5,
    avgSkillScore: 2.3,
    avgGapScore: 2.4,
    competencyScore: 46,
    healthStatus: 'Critical',
    trainingPriority: 'High',
    criticalSkills: ['Lean Six Sigma', 'Process Automation', 'ERP Systems'],
    missingSkill: 'Process Automation',
    manager: 'Irene Lopez',
    description: 'Supply chain management, logistics, and process automation.',
  },
];

const MOCK_HEATMAP_CELLS = [
  // Engineering
  { department: 'Engineering', skill: 'React', category: 'Technical', competencyScore: 92, employeesCovered: 14 },
  { department: 'Engineering', skill: 'Java', category: 'Technical', competencyScore: 82, employeesCovered: 12 },
  { department: 'Engineering', skill: 'SQL', category: 'Technical', competencyScore: 78, employeesCovered: 14 },
  { department: 'Engineering', skill: 'AWS', category: 'Cloud', competencyScore: 68, employeesCovered: 9 },
  { department: 'Engineering', skill: 'Docker', category: 'Cloud', competencyScore: 48, employeesCovered: 6 },
  { department: 'Engineering', skill: 'Power BI', category: 'Data', competencyScore: 55, employeesCovered: 5 },
  { department: 'Engineering', skill: 'Python', category: 'Technical', competencyScore: 74, employeesCovered: 10 },

  // Data Science
  { department: 'Data Science', skill: 'React', category: 'Technical', competencyScore: 35, employeesCovered: 2 },
  { department: 'Data Science', skill: 'Java', category: 'Technical', competencyScore: 50, employeesCovered: 4 },
  { department: 'Data Science', skill: 'SQL', category: 'Data', competencyScore: 90, employeesCovered: 9 },
  { department: 'Data Science', skill: 'AWS', category: 'Cloud', competencyScore: 62, employeesCovered: 5 },
  { department: 'Data Science', skill: 'Docker', category: 'Cloud', competencyScore: 58, employeesCovered: 4 },
  { department: 'Data Science', skill: 'Power BI', category: 'Data', competencyScore: 52, employeesCovered: 4 },
  { department: 'Data Science', skill: 'Python', category: 'Data', competencyScore: 96, employeesCovered: 9 },

  // Finance
  { department: 'Finance', skill: 'React', category: 'Technical', competencyScore: 22, employeesCovered: 1 },
  { department: 'Finance', skill: 'Java', category: 'Technical', competencyScore: 30, employeesCovered: 2 },
  { department: 'Finance', skill: 'SQL', category: 'Data', competencyScore: 76, employeesCovered: 6 },
  { department: 'Finance', skill: 'AWS', category: 'Cloud', competencyScore: 42, employeesCovered: 3 },
  { department: 'Finance', skill: 'Docker', category: 'Cloud', competencyScore: 28, employeesCovered: 1 },
  { department: 'Finance', skill: 'Power BI', category: 'Data', competencyScore: 78, employeesCovered: 7 },
  { department: 'Finance', skill: 'Python', category: 'Data', competencyScore: 64, employeesCovered: 4 },

  // Human Resources
  { department: 'Human Resources', skill: 'React', category: 'Technical', competencyScore: 15, employeesCovered: 0 },
  { department: 'Human Resources', skill: 'Java', category: 'Technical', competencyScore: 18, employeesCovered: 0 },
  { department: 'Human Resources', skill: 'SQL', category: 'Data', competencyScore: 45, employeesCovered: 2 },
  { department: 'Human Resources', skill: 'AWS', category: 'Cloud', competencyScore: 25, employeesCovered: 1 },
  { department: 'Human Resources', skill: 'Docker', category: 'Cloud', competencyScore: 20, employeesCovered: 0 },
  { department: 'Human Resources', skill: 'Power BI', category: 'Data', competencyScore: 68, employeesCovered: 5 },
  { department: 'Human Resources', skill: 'Python', category: 'Data', competencyScore: 32, employeesCovered: 1 },

  // Marketing
  { department: 'Marketing', skill: 'React', category: 'Technical', competencyScore: 28, employeesCovered: 2 },
  { department: 'Marketing', skill: 'Java', category: 'Technical', competencyScore: 20, employeesCovered: 1 },
  { department: 'Marketing', skill: 'SQL', category: 'Data', competencyScore: 52, employeesCovered: 4 },
  { department: 'Marketing', skill: 'AWS', category: 'Cloud', competencyScore: 34, employeesCovered: 2 },
  { department: 'Marketing', skill: 'Docker', category: 'Cloud', competencyScore: 25, employeesCovered: 1 },
  { department: 'Marketing', skill: 'Power BI', category: 'Data', competencyScore: 72, employeesCovered: 6 },
  { department: 'Marketing', skill: 'Python', category: 'Data', competencyScore: 46, employeesCovered: 3 },

  // Operations
  { department: 'Operations', skill: 'React', category: 'Technical', competencyScore: 18, employeesCovered: 0 },
  { department: 'Operations', skill: 'Java', category: 'Technical', competencyScore: 25, employeesCovered: 1 },
  { department: 'Operations', skill: 'SQL', category: 'Data', competencyScore: 60, employeesCovered: 3 },
  { department: 'Operations', skill: 'AWS', category: 'Cloud', competencyScore: 30, employeesCovered: 1 },
  { department: 'Operations', skill: 'Docker', category: 'Cloud', competencyScore: 38, employeesCovered: 2 },
  { department: 'Operations', skill: 'Power BI', category: 'Data', competencyScore: 64, employeesCovered: 4 },
  { department: 'Operations', skill: 'Python', category: 'Data', competencyScore: 40, employeesCovered: 2 },
];

export function normalizeDepartment(dept) {
  const name = dept.departmentName || dept.department || dept.name || 'Department';
  const competency = dept.competencyScore ?? dept.coverage ?? 65;

  let health = dept.healthStatus;
  if (!health) {
    if (competency >= 75) health = 'Excellent';
    else if (competency >= 65) health = 'Good';
    else if (competency >= 50) health = 'Needs Improvement';
    else health = 'Critical';
  }

  return {
    id: dept.id,
    department: name,
    name: name,
    category: dept.category || 'General',
    employeeCount: dept.employeeCount || 8,
    avgSkillScore: dept.avgSkillScore || parseFloat((competency / 20).toFixed(1)),
    avgGapScore: dept.avgGapScore || parseFloat(((100 - competency) / 20).toFixed(1)),
    competencyScore: competency,
    healthStatus: health,
    trainingPriority: dept.trainingPriority || (competency < 60 ? 'High' : competency < 70 ? 'Medium' : 'Low'),
    criticalSkills: Array.isArray(dept.criticalSkills || dept.requiredSkills)
      ? (dept.criticalSkills || dept.requiredSkills)
      : ['Core Skill'],
    missingSkill: dept.missingSkill || 'Core Skill Upgrade',
    manager: dept.manager || '—',
    description: dept.description || '',
  };
}

export function normalizeHeatmapCell(cell) {
  const comp = typeof cell.competencyScore === 'number'
    ? cell.competencyScore
    : typeof cell.score === 'number'
    ? (cell.score <= 1 ? Math.round(cell.score * 100) : Math.round(cell.score))
    : 50;

  const gap = 100 - comp;
  let tier = 'below_40';
  let tierName = 'Below 40% (Red)';

  if (comp >= 90) {
    tier = '90_100';
    tierName = '90-100% (Dark Green)';
  } else if (comp >= 75) {
    tier = '75_89';
    tierName = '75-89% (Light Green)';
  } else if (comp >= 60) {
    tier = '60_74';
    tierName = '60-74% (Yellow)';
  } else if (comp >= 40) {
    tier = '40_59';
    tierName = '40-59% (Orange)';
  }

  return {
    department: cell.department || 'Department',
    skill: cell.skill || 'Skill',
    category: cell.category || 'General',
    competencyScore: comp,
    gapScore: gap,
    tier,
    tierName,
    employeesCovered: cell.employeesCovered ?? 5,
    trainingRequired: comp < 60 ? 'Yes - High Priority' : comp < 75 ? 'Yes - Medium Priority' : 'No - Met',
  };
}

export function getDepartments() {
  return fetchWithFallback({
    request: () => api.get('/departments'),
    mockData: MOCK_DEPT_MATRIX,
    normalize: normalizeDepartment,
    moduleName: 'Departments',
  });
}

export function getDepartmentSkillMatrix() {
  return fetchWithFallback({
    request: () => api.get('/departments'),
    mockData: MOCK_DEPT_MATRIX,
    normalize: normalizeDepartment,
    moduleName: 'Department Skill Matrix',
  });
}

export function getSkillHeatmapData() {
  return fetchWithFallback({
    request: () => api.get('/api/analytics/heatmap'),
    mockData: MOCK_HEATMAP_CELLS,
    normalize: normalizeHeatmapCell,
    moduleName: 'Skill Heatmap',
  });
}
