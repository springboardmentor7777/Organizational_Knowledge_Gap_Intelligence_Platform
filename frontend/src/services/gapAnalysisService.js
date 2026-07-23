/**
 * gapAnalysisService.js
 * Integrated with fetchWithFallback for Gap Analysis (/gap-analysis/* and /api/employees/{id}/skill-gaps).
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

const MOCK_GAP_SUMMARY = {
  totalEmployeesAnalysed: 42,
  criticalGaps: 8,
  avgSkillScore: 3.2,
  avgGapScore: 1.45,
  totalEmployees: 42,
  employeesWithGaps: 28,
  highPriorityGaps: 15,
  departmentsAffected: 6,
};

const MOCK_GAP_DETAILS = [
  {
    id: 1,
    employee: 'David Chen',
    department: 'Engineering',
    overallSkillScore: 2.1,
    gapScore: 2.4,
    gapSeverity: 'Critical',
    priority: 'Critical',
    missingSkills: ['Docker', 'Kubernetes', 'React Architecture'],
    currentLevel: 1,
    requiredLevel: 4,
    gap: 2.4,
  },
  {
    id: 2,
    employee: 'Bob Martinez',
    department: 'Data Science',
    overallSkillScore: 2.3,
    gapScore: 2.2,
    gapSeverity: 'Critical',
    priority: 'High',
    missingSkills: ['Power BI', 'TensorFlow', 'Machine Learning'],
    currentLevel: 1,
    requiredLevel: 3,
    gap: 2.2,
  },
  {
    id: 3,
    employee: 'Irene Lopez',
    department: 'Operations',
    overallSkillScore: 2.5,
    gapScore: 2.0,
    gapSeverity: 'Critical',
    priority: 'High',
    missingSkills: ['Process Management', 'Lean Six Sigma', 'ERP'],
    currentLevel: 2,
    requiredLevel: 4,
    gap: 2.0,
  },
  {
    id: 4,
    employee: 'Carol Williams',
    department: 'Human Resources',
    overallSkillScore: 2.7,
    gapScore: 1.8,
    gapSeverity: 'High',
    priority: 'High',
    missingSkills: ['Project Management', 'HR Analytics'],
    currentLevel: 2,
    requiredLevel: 4,
    gap: 1.8,
  },
  {
    id: 5,
    employee: 'Alice Johnson',
    department: 'Engineering',
    overallSkillScore: 3.4,
    gapScore: 1.5,
    gapSeverity: 'High',
    priority: 'Medium',
    missingSkills: ['Docker', 'System Design'],
    currentLevel: 2,
    requiredLevel: 3,
    gap: 1.5,
  },
  {
    id: 6,
    employee: 'Grace Kim',
    department: 'Engineering',
    overallSkillScore: 3.1,
    gapScore: 1.3,
    gapSeverity: 'Medium',
    priority: 'Medium',
    missingSkills: ['React', 'TypeScript'],
    currentLevel: 2,
    requiredLevel: 3,
    gap: 1.3,
  },
  {
    id: 7,
    employee: 'Frank Thompson',
    department: 'Finance',
    overallSkillScore: 3.3,
    gapScore: 1.2,
    gapSeverity: 'Medium',
    priority: 'Medium',
    missingSkills: ['Excel Modeling', 'Financial Analytics'],
    currentLevel: 3,
    requiredLevel: 4,
    gap: 1.2,
  },
  {
    id: 8,
    employee: 'Eva Patel',
    department: 'Marketing',
    overallSkillScore: 3.0,
    gapScore: 1.0,
    gapSeverity: 'Medium',
    priority: 'Low',
    missingSkills: ['SEO Optimization', 'Google Analytics'],
    currentLevel: 2,
    requiredLevel: 3,
    gap: 1.0,
  },
  {
    id: 9,
    employee: 'James Wilson',
    department: 'Marketing',
    overallSkillScore: 3.8,
    gapScore: 0.7,
    gapSeverity: 'Low',
    priority: 'Low',
    missingSkills: ['Brand Strategy'],
    currentLevel: 3,
    requiredLevel: 4,
    gap: 0.7,
  },
  {
    id: 10,
    employee: 'Henry Brown',
    department: 'Data Science',
    overallSkillScore: 4.2,
    gapScore: 0.4,
    gapSeverity: 'Low',
    priority: 'Low',
    missingSkills: ['Apache Spark'],
    currentLevel: 4,
    requiredLevel: 5,
    gap: 0.4,
  },
  {
    id: 11,
    employee: 'Sarah Jenkins',
    department: 'Engineering',
    overallSkillScore: 2.2,
    gapScore: 2.3,
    gapSeverity: 'Critical',
    priority: 'Critical',
    missingSkills: ['Go', 'Microservices', 'Kubernetes'],
    currentLevel: 1,
    requiredLevel: 4,
    gap: 2.3,
  },
  {
    id: 12,
    employee: 'Michael Chang',
    department: 'Finance',
    overallSkillScore: 2.6,
    gapScore: 1.7,
    gapSeverity: 'High',
    priority: 'High',
    missingSkills: ['SAP', 'Financial Modeling'],
    currentLevel: 2,
    requiredLevel: 4,
    gap: 1.7,
  },
];

export function normalizeGapDetail(item, idx) {
  const gap = item.gapScore ?? item.gap ?? item.gapSize ?? 1.5;
  let severity = item.gapSeverity;
  if (!severity) {
    if (gap >= 2.0) severity = 'Critical';
    else if (gap >= 1.5) severity = 'High';
    else if (gap >= 1.0) severity = 'Medium';
    else severity = 'Low';
  }

  const empName = typeof item.employee === 'string' ? item.employee : item.employee?.name || item.employeeName || 'Employee';
  const deptName = typeof item.department === 'string' ? item.department : item.employee?.department?.departmentName || item.department?.departmentName || 'Department';

  let missing = [];
  if (Array.isArray(item.missingSkills)) {
    missing = item.missingSkills;
  } else if (item.skillName || item.name) {
    missing = [item.skillName || item.name];
  } else if (item.missingSkill) {
    missing = [item.missingSkill];
  } else {
    missing = ['Required Training'];
  }

  return {
    id: item.id ?? (idx !== undefined ? idx + 1 : 1),
    employee: empName,
    department: deptName,
    overallSkillScore: item.overallSkillScore ?? item.actualLevel ?? item.currentLevel ?? 2.5,
    gapScore: gap,
    gapSeverity: severity,
    priority: item.priority || severity,
    missingSkills: missing,
    currentLevel: item.actualLevel ?? item.currentLevel ?? 2,
    requiredLevel: item.requiredLevel ?? 4,
    gap: gap,
  };
}

export function getGapSummary() {
  return fetchWithFallback({
    request: () => api.get('/api/gap-analysis/summary'),
    mockData: MOCK_GAP_SUMMARY,
    normalize: (data) => ({
      totalEmployeesAnalysed: data.totalEmployeesAnalysed ?? data.totalEmployees ?? 42,
      criticalGaps: data.criticalGaps ?? data.highPriorityGaps ?? 8,
      avgSkillScore: data.avgSkillScore ?? 3.2,
      avgGapScore: data.avgGapScore ?? 1.45,
      totalEmployees: data.totalEmployees ?? 42,
      employeesWithGaps: data.employeesWithGaps ?? 28,
      highPriorityGaps: data.highPriorityGaps ?? 15,
      departmentsAffected: data.departmentsAffected ?? 6,
    }),
    moduleName: 'Gap Analysis Summary',
  });
}

export function getGapDetails(employeeId) {
  const requestFn = employeeId
    ? () => api.get(`/gap-analysis/${employeeId}`)
    : () => api.get('/gap-analysis/1');

  return fetchWithFallback({
    request: requestFn,
    mockData: MOCK_GAP_DETAILS,
    normalize: normalizeGapDetail,
    moduleName: 'Gap Analysis Details',
  });
}

export async function generateGapAnalysis(employeeId) {
  const res = await api.post(`/gap-analysis/${employeeId}`);
  return Array.isArray(res.data) ? res.data.map(normalizeGapDetail) : normalizeGapDetail(res.data);
}

export async function getSkillGaps(employeeId) {
  const res = await api.get(`/api/employees/${employeeId}/skill-gaps`);
  return res.data;
}
