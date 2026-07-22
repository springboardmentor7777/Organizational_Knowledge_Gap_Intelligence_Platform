/**
 * skillService.js
 * Integrated with fetchWithFallback for backend API ready skills endpoints.
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
