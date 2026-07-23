/**
 * skillService.js
 * Integrated with fetchWithFallback for /skills and /employee-skills backend APIs.
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

export const LEVEL_LABELS = {
  1: 'Beginner',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const MOCK_SKILLS = [
  { id: 1, name: 'React', category: 'Technical', description: 'Frontend JavaScript library for building component-based UIs.', requiredLevel: 4 },
  { id: 2, name: 'Node.js', category: 'Technical', description: 'Server-side JavaScript runtime built on Chrome V8 engine.', requiredLevel: 3 },
  { id: 3, name: 'Python', category: 'Technical', description: 'General-purpose programming language widely used in data science and backend.', requiredLevel: 4 },
  { id: 4, name: 'Docker', category: 'Technical', description: 'Container platform for packaging and deploying applications consistently.', requiredLevel: 3 },
  { id: 5, name: 'SQL', category: 'Technical', description: 'Structured Query Language for relational database management.', requiredLevel: 3 },
  { id: 6, name: 'TypeScript', category: 'Technical', description: 'Statically typed superset of JavaScript for large-scale applications.', requiredLevel: 3 },
  { id: 7, name: 'Machine Learning', category: 'Data Science', description: 'Building and training predictive models from structured data.', requiredLevel: 3 },
  { id: 8, name: 'TensorFlow', category: 'Data Science', description: 'Open-source deep learning framework developed by Google.', requiredLevel: 3 },
  { id: 9, name: 'Power BI', category: 'Data Science', description: 'Microsoft business intelligence tool for data visualisation and reporting.', requiredLevel: 3 },
  { id: 10, name: 'Communication', category: 'Soft Skills', description: 'Effective verbal and written communication across all levels.', requiredLevel: 4 },
  { id: 11, name: 'Leadership', category: 'Management', description: 'Inspiring and guiding teams toward organisational goals.', requiredLevel: 3 },
  { id: 12, name: 'Project Management', category: 'Management', description: 'Planning, executing, and closing projects within scope and budget.', requiredLevel: 4 },
  { id: 13, name: 'Financial Modeling', category: 'Finance', description: 'Building quantitative models to represent financial performance.', requiredLevel: 4 },
  { id: 14, name: 'Excel', category: 'Finance', description: 'Advanced spreadsheet analysis, formulas, and data modelling.', requiredLevel: 4 },
  { id: 15, name: 'SEO', category: 'Marketing', description: 'Optimising content and websites for search engine ranking.', requiredLevel: 3 },
  { id: 16, name: 'Brand Strategy', category: 'Marketing', description: 'Developing and maintaining a consistent brand identity and positioning.', requiredLevel: 3 },
];

const MOCK_EMPLOYEE_SKILLS = [
  { id:  1, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'React',             currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id:  2, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'Node.js',           currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id:  3, employee: 'Alice Johnson',  department: 'Engineering',     skill: 'Docker',            currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id:  4, employee: 'David Chen',     department: 'Engineering',     skill: 'React',             currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
  { id:  5, employee: 'David Chen',     department: 'Engineering',     skill: 'Docker',            currentLevel: 1, requiredLevel: 3, gapStatus: 'High Gap' },
  { id:  6, employee: 'David Chen',     department: 'Engineering',     skill: 'Node.js',           currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id:  7, employee: 'Grace Kim',      department: 'Engineering',     skill: 'React',             currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id:  8, employee: 'Grace Kim',      department: 'Engineering',     skill: 'TypeScript',        currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id:  9, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Python',            currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 10, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Machine Learning',  currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id: 11, employee: 'Bob Martinez',   department: 'Data Science',    skill: 'Power BI',          currentLevel: 1, requiredLevel: 3, gapStatus: 'High Gap' },
  { id: 12, employee: 'Henry Brown',    department: 'Data Science',    skill: 'TensorFlow',        currentLevel: 4, requiredLevel: 3, gapStatus: 'Met' },
  { id: 13, employee: 'Henry Brown',    department: 'Data Science',    skill: 'Python',            currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id: 14, employee: 'Eva Patel',      department: 'Marketing',       skill: 'SEO',               currentLevel: 2, requiredLevel: 3, gapStatus: 'Gap' },
  { id: 15, employee: 'James Wilson',   department: 'Marketing',       skill: 'Brand Strategy',    currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id: 16, employee: 'Frank Thompson', department: 'Finance',         skill: 'Excel',             currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 17, employee: 'Frank Thompson', department: 'Finance',         skill: 'Financial Modeling',currentLevel: 3, requiredLevel: 4, gapStatus: 'Gap' },
  { id: 18, employee: 'Carol Williams', department: 'Human Resources', skill: 'Communication',     currentLevel: 4, requiredLevel: 4, gapStatus: 'Met' },
  { id: 19, employee: 'Carol Williams', department: 'Human Resources', skill: 'Leadership',        currentLevel: 3, requiredLevel: 3, gapStatus: 'Met' },
  { id: 20, employee: 'Carol Williams', department: 'Human Resources', skill: 'Project Management',currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
  { id: 21, employee: 'Irene Lopez',    department: 'Operations',      skill: 'Process Management',currentLevel: 2, requiredLevel: 4, gapStatus: 'High Gap' },
];

export function mapSkill(skill) {
  if (!skill) return null;
  return {
    id: skill.id,
    name: skill.name || skill.skillName || `Skill #${skill.id}`,
    category: skill.category || 'Technical',
    description: skill.description || 'Core organizational competency skill.',
    requiredLevel: skill.requiredLevel ?? 3,
  };
}

export function normalizeEmployeeSkill(item, idx) {
  const empName = typeof item.employee === 'string' ? item.employee : item.employee?.name || `Employee #${item.employee?.id || (idx !== undefined ? idx + 1 : 1)}`;
  const deptName = typeof item.department === 'string' ? item.department : item.employee?.department?.departmentName || item.department?.departmentName || 'Engineering';
  const skillName = typeof item.skill === 'string' ? item.skill : item.skill?.skillName || item.skill?.name || 'Skill';
  const currentLvl = item.level ?? item.currentLevel ?? 2;
  const requiredLvl = item.requiredLevel ?? 3;
  const gap = requiredLvl - currentLvl;
  const status = item.gapStatus || (gap <= 0 ? 'Met' : gap > 1 ? 'High Gap' : 'Gap');

  return {
    id: item.id ?? (idx !== undefined ? idx + 1 : 1),
    employee: empName,
    department: deptName,
    skill: skillName,
    currentLevel: currentLvl,
    requiredLevel: requiredLvl,
    gapStatus: status,
  };
}

export function getSkills() {
  return fetchWithFallback({
    request: () => api.get('/skills'),
    mockData: MOCK_SKILLS,
    normalize: mapSkill,
    moduleName: 'Skills Catalog',
  });
}

export function getSkillById(id) {
  return fetchWithFallback({
    request: () => api.get(`/skills/${id}`),
    mockData: () => MOCK_SKILLS.find((s) => s.id === Number(id)) || MOCK_SKILLS[0],
    normalize: mapSkill,
    moduleName: 'Skill Details',
  });
}

export function getEmployeeSkills() {
  return fetchWithFallback({
    request: () => api.get('/employee-skills'),
    mockData: MOCK_EMPLOYEE_SKILLS,
    normalize: normalizeEmployeeSkill,
    moduleName: 'Employee Skills',
  });
}

export async function addSkill(skillData) {
  const res = await api.post('/skills', skillData);
  return mapSkill(res.data);
}

export async function updateSkill(id, skillData) {
  const res = await api.put(`/skills/${id}`, skillData);
  return mapSkill(res.data);
}

export async function deleteSkill(id) {
  await api.delete(`/skills/${id}`);
  return true;
}

export async function addEmployeeSkill(data) {
  const res = await api.post('/employee-skills', data);
  return normalizeEmployeeSkill(res.data);
}

export async function updateEmployeeSkill(id, data) {
  const res = await api.put(`/employee-skills/${id}`, data);
  return normalizeEmployeeSkill(res.data);
}

export async function deleteEmployeeSkill(id) {
  await api.delete(`/employee-skills/${id}`);
  return true;
}
