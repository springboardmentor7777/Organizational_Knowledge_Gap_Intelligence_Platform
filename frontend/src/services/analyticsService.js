/**
 * analyticsService.js
 * Integrated with fetchWithFallback for Organization Trend Analytics & Dashboard statistics.
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

const MOCK_ANALYTICS_PAYLOAD = {
  summary: {
    healthScore: 74.8,
    skillImprovementRate: 18.5,
    gapReductionRate: 24.2,
    trainingCompletionRate: 86.4,
  },
  skillImprovement: [
    { label: 'Jan', value: 58, target: 60 },
    { label: 'Feb', value: 62, target: 63 },
    { label: 'Mar', value: 65, target: 67 },
    { label: 'Apr', value: 71, target: 70 },
    { label: 'May', value: 75, target: 74 },
    { label: 'Jun', value: 78, target: 78 },
  ],
  gapReduction: [
    { label: 'Jan', criticalGaps: 42, totalGaps: 85 },
    { label: 'Feb', criticalGaps: 36, totalGaps: 74 },
    { label: 'Mar', criticalGaps: 29, totalGaps: 61 },
    { label: 'Apr', criticalGaps: 22, totalGaps: 48 },
    { label: 'May', criticalGaps: 16, totalGaps: 35 },
    { label: 'Jun', criticalGaps: 12, totalGaps: 26 },
  ],
  deptTraining: [
    { department: 'Engineering', completionRate: 92, activeCourses: 14 },
    { department: 'Data Science', completionRate: 88, activeCourses: 9 },
    { department: 'Finance', completionRate: 84, activeCourses: 7 },
    { department: 'Marketing', completionRate: 76, activeCourses: 8 },
    { department: 'HR', completionRate: 72, activeCourses: 6 },
    { department: 'Operations', completionRate: 64, activeCourses: 5 },
  ],
  skillDistribution: [
    { category: 'Technical', percentage: 35, color: '#3B82F6' },
    { category: 'Data Science', percentage: 25, color: '#10B981' },
    { category: 'Management', percentage: 15, color: '#8B5CF6' },
    { category: 'Finance', percentage: 13, color: '#F59E0B' },
    { category: 'Marketing', percentage: 12, color: '#EC4899' },
  ],
  insights: {
    bestPerformingDept: 'Engineering (78% Health, 92% Training Completion)',
    fastestSkillGrowth: 'Data Science (+22.4% MoM Score Growth)',
    deptNeedingTraining: 'Operations (46% Health, High Training Demand)',
    mostImprovedSkill: 'React & Cloud Containerization (+35% Proficiency Boost)',
    highestRemainingGap: 'DevOps & Kubernetes Automation (2.4 Avg Deficit)',
  },
};

export function normalizeAnalyticsSummary(data) {
  if (!data) return MOCK_ANALYTICS_PAYLOAD.summary;
  return {
    healthScore: data.healthScore ?? data.overallHealth ?? 74.8,
    skillImprovementRate: data.skillImprovementRate ?? data.growthRate ?? 18.5,
    gapReductionRate: data.gapReductionRate ?? data.reductionRate ?? 24.2,
    trainingCompletionRate: data.trainingCompletionRate ?? data.completionRate ?? 86.4,
  };
}

export function getOrganizationTrendAnalytics(filters = {}) {
  return fetchWithFallback({
    request: () => api.get('/api/analytics/trends', { params: filters }),
    mockData: MOCK_ANALYTICS_PAYLOAD,
    normalize: (payload) => ({
      summary: normalizeAnalyticsSummary(payload.summary || payload),
      skillImprovement: payload.skillImprovement || MOCK_ANALYTICS_PAYLOAD.skillImprovement,
      gapReduction: payload.gapReduction || MOCK_ANALYTICS_PAYLOAD.gapReduction,
      deptTraining: payload.deptTraining || MOCK_ANALYTICS_PAYLOAD.deptTraining,
      skillDistribution: payload.skillDistribution || MOCK_ANALYTICS_PAYLOAD.skillDistribution,
      insights: payload.insights || MOCK_ANALYTICS_PAYLOAD.insights,
    }),
    moduleName: 'Organization Trend Analytics',
  });
}
