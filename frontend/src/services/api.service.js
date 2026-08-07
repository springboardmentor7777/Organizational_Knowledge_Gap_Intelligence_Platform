import api from './api';

export const apiService = {
  // Profile
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getUserSkills: () => api.get('/profile/skills'),
  addOrUpdateUserSkill: (skillId, level) => api.post('/profile/skills', { skillId, proficiencyLevel: level }),
  deleteUserSkill: (id) => api.delete(`/profile/skills/${id}`),

  // Gaps
  getGaps: () => api.get('/gaps'),
  recalculateGaps: () => api.post('/gaps/recalculate'),
  getHeatmap: () => api.get('/gaps/heatmap'),
  getTrends: () => api.get('/gaps/trends'),

  // Courses
  getCourses: () => api.get('/courses'),
  getRecommendations: () => api.get('/courses/recommendations'),
  recalculateRecommendations: () => api.post('/courses/recommendations/recalculate'),
  getEnrolledCourses: () => api.get('/courses/enrolled'),
  enrollInCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),

  // Learning Paths
  getLearningPaths: () => api.get('/learning-paths'),
  createCustomPath: (pathData) => api.post('/learning-paths', pathData),
  toggleMilestone: (pathId, milestoneIndex) => api.post(`/learning-paths/${pathId}/milestones/${milestoneIndex}`),
  generateAiPath: (targetRole, targetSkill) => api.post('/learning-paths/generate', { targetRole, targetSkill }),

  // Mentorship
  getMentors: () => api.get('/mentorship/mentors'),
  getMentees: () => api.get('/mentorship/mentees'),
  requestMentorship: (mentorId, goal) => api.post('/mentorship/request', { mentorId, goal }),

  // Knowledge Sharing
  getPosts: () => api.get('/knowledge-sharing/posts'),
  createPost: (postData) => api.post('/knowledge-sharing/posts', postData),
  likePost: (postId) => api.post(`/knowledge-sharing/posts/${postId}/like`),

  // Notifications
  getNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),

  // Reports
  getReports: () => api.get('/reports'),
  generateReport: (reportData) => api.post('/reports/generate', reportData),

  // Admin / HR
  getAdminUsers: () => api.get('/admin/users'),
  getAuditLogs: () => api.get('/admin/audit-logs'),
  getFrameworks: () => api.get('/admin/frameworks'),
  createFramework: (fwData) => api.post('/admin/frameworks', fwData),
};

export default apiService;
