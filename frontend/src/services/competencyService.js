/**
 * competencyService.js
 * Integrated with fetchWithFallback for /competencies backend API.
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

function deriveStatus(gap) {
  if (gap === 0)    return 'Met';
  if (gap <= 0.75)  return 'Low Gap';
  if (gap <= 1.25)  return 'Medium Gap';
  return 'High Gap';
}

const RAW = [
  { department: 'Engineering',      skill: 'React',            requiredLevel: 4, avgCurrentLevel: 3.0 },
  { department: 'Engineering',      skill: 'Node.js',          requiredLevel: 3, avgCurrentLevel: 2.5 },
  { department: 'Engineering',      skill: 'Docker',           requiredLevel: 3, avgCurrentLevel: 1.5 },
  { department: 'Engineering',      skill: 'TypeScript',       requiredLevel: 3, avgCurrentLevel: 2.7 },
  { department: 'Data Science',     skill: 'Python',           requiredLevel: 4, avgCurrentLevel: 3.5 },
  { department: 'Data Science',     skill: 'Machine Learning', requiredLevel: 3, avgCurrentLevel: 2.0 },
  { department: 'Data Science',     skill: 'TensorFlow',       requiredLevel: 3, avgCurrentLevel: 3.5 },
  { department: 'Data Science',     skill: 'Power BI',         requiredLevel: 3, avgCurrentLevel: 2.2 },
  { department: 'Marketing',        skill: 'SEO',              requiredLevel: 3, avgCurrentLevel: 2.0 },
  { department: 'Marketing',        skill: 'Brand Strategy',   requiredLevel: 3, avgCurrentLevel: 3.0 },
  { department: 'Finance',          skill: 'Excel',            requiredLevel: 4, avgCurrentLevel: 3.0 },
  { department: 'Finance',          skill: 'Financial Modeling', requiredLevel: 4, avgCurrentLevel: 3.0 },
  { department: 'Finance',          skill: 'Power BI',         requiredLevel: 3, avgCurrentLevel: 2.5 },
  { department: 'Human Resources',  skill: 'Communication',    requiredLevel: 4, avgCurrentLevel: 4.0 },
  { department: 'Human Resources',  skill: 'Leadership',       requiredLevel: 3, avgCurrentLevel: 3.0 },
  { department: 'Human Resources',  skill: 'Project Management', requiredLevel: 4, avgCurrentLevel: 2.5 },
  { department: 'Operations',       skill: 'Process Management', requiredLevel: 4, avgCurrentLevel: 2.5 },
  { department: 'Operations',       skill: 'Excel',            requiredLevel: 3, avgCurrentLevel: 2.5 },
];

const MOCK_COMPETENCY = RAW.map((row, idx) => {
  const gap = parseFloat((row.requiredLevel - row.avgCurrentLevel).toFixed(2));
  return {
    id: idx + 1,
    ...row,
    gap: gap < 0 ? 0 : gap,
    status: deriveStatus(gap < 0 ? 0 : gap),
  };
});

export function normalizeCompetencyRow(row, idx) {
  const req = row.requiredLevel ?? 3;
  const curr = row.avgCurrentLevel ?? 2.5;
  const rawGap = req - curr;
  const gap = rawGap < 0 ? 0 : parseFloat(rawGap.toFixed(2));

  const deptName = typeof row.department === 'string'
    ? row.department
    : row.department?.departmentName ?? 'Engineering';

  const skillName = row.competencyName
    || (typeof row.skill === 'string' ? row.skill : (row.skill?.skillName || row.skill?.name || 'Skill'));

  return {
    id: row.id ?? (idx !== undefined ? idx + 1 : 1),
    department: deptName,
    skill: skillName,
    requiredLevel: req,
    avgCurrentLevel: curr,
    gap: row.gap ?? gap,
    status: row.status ?? deriveStatus(gap),
  };
}

export function getCompetencyMatrix() {
  return fetchWithFallback({
    request: () => api.get('/competencies'),
    mockData: MOCK_COMPETENCY,
    normalize: normalizeCompetencyRow,
    moduleName: 'Competency Matrix',
  });
}

export async function addCompetency(data) {
  const res = await api.post('/competencies', data);
  return normalizeCompetencyRow(res.data);
}

export async function updateCompetency(id, data) {
  const res = await api.put(`/competencies/${id}`, data);
  return normalizeCompetencyRow(res.data);
}

export async function deleteCompetency(id) {
  await api.delete(`/competencies/${id}`);
  return true;
}
