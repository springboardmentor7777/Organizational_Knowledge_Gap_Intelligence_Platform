import React, { createContext, useContext, useState, useMemo } from 'react';
import toast from 'react-hot-toast';

const GapContext = createContext();

// Initial multi-dimensional gap data
const INITIAL_GAP_DATA = [
  { id: 1, skill: 'Advanced React', category: 'Engineering', current: 2, required: 5, department: 'Engineering', roleRequirement: 5, projectDemand: 4, strategicGoal: 5, futureForecast: 5, affectedEmployees: 14 },
  { id: 2, skill: 'Cloud Architecture & AWS', category: 'Engineering', current: 1, required: 5, department: 'Engineering', roleRequirement: 5, projectDemand: 5, strategicGoal: 5, futureForecast: 5, affectedEmployees: 22 },
  { id: 3, skill: 'Agile & Team Leadership', category: 'Management', current: 3, required: 4, department: 'Product', roleRequirement: 4, projectDemand: 4, strategicGoal: 5, futureForecast: 4, affectedEmployees: 8 },
  { id: 4, skill: 'Data Visualization & D3', category: 'Data Science', current: 2, required: 4, department: 'Data Science', roleRequirement: 4, projectDemand: 3, strategicGoal: 4, futureForecast: 5, affectedEmployees: 11 },
  { id: 5, skill: 'Machine Learning & LLM Ops', category: 'Data Science', current: 1, required: 5, department: 'Data Science', roleRequirement: 5, projectDemand: 4, strategicGoal: 5, futureForecast: 5, affectedEmployees: 19 },
  { id: 6, skill: 'UI/UX Design Systems', category: 'Design', current: 3, required: 5, department: 'Design', roleRequirement: 5, projectDemand: 4, strategicGoal: 4, futureForecast: 4, affectedEmployees: 6 },
  { id: 7, skill: 'DevOps & CI/CD Pipelines', category: 'Engineering', current: 2, required: 4, department: 'Engineering', roleRequirement: 4, projectDemand: 5, strategicGoal: 4, futureForecast: 5, affectedEmployees: 16 },
  { id: 8, skill: 'SEO & Growth Marketing', category: 'Marketing', current: 2, required: 4, department: 'Marketing', roleRequirement: 4, projectDemand: 3, strategicGoal: 4, futureForecast: 4, affectedEmployees: 7 },
  { id: 9, skill: 'Enterprise Sales Negotiation', category: 'Sales', current: 2, required: 5, department: 'Sales', roleRequirement: 5, projectDemand: 5, strategicGoal: 4, futureForecast: 4, affectedEmployees: 12 },
];

// Initial Course Recommendations (Internal + External Catalogs)
const INITIAL_COURSES = [
  {
    id: 101,
    title: 'AWS Certified Solutions Architect Masterclass',
    provider: 'AWS Skill Builder',
    providerType: 'External',
    url: 'https://aws.amazon.com/training/',
    category: 'Engineering',
    targetSkill: 'Cloud Architecture & AWS',
    matchScore: 98,
    difficulty: 'Advanced',
    duration: '14h 30m',
    rating: 4.9,
    students: 14200,
    format: 'Interactive',
    description: 'Master VPCs, EC2, IAM, Lambda, and multi-region resilience to eliminate critical cloud gaps.',
    reason: 'Directly addresses your 30-pt Cloud Architecture gap for Senior Architect benchmark.'
  },
  {
    id: 102,
    title: 'Advanced React 19 & Performance Optimization',
    provider: 'Coursera',
    providerType: 'External',
    url: 'https://www.coursera.org/',
    category: 'Engineering',
    targetSkill: 'Advanced React',
    matchScore: 95,
    difficulty: 'Advanced',
    duration: '8h 45m',
    rating: 4.8,
    students: 8900,
    format: 'Video',
    description: 'Learn Server Components, Compiler optimizations, and state management at enterprise scale.',
    reason: 'Recommended for Engineering department React skill elevation target.'
  },
  {
    id: 103,
    title: 'LLMOps: Deploying Production AI Systems',
    provider: 'Udemy',
    providerType: 'External',
    url: 'https://www.udemy.com/',
    category: 'Data Science',
    targetSkill: 'Machine Learning & LLM Ops',
    matchScore: 94,
    difficulty: 'Expert',
    duration: '12h 10m',
    rating: 4.9,
    students: 6300,
    format: 'Interactive',
    description: 'Fine-tuning, vector databases, RAG architecture, and monitoring for modern AI models.',
    reason: 'High strategic priority for Q4 Artificial Intelligence initiatives.'
  },
  {
    id: 104,
    title: 'Enterprise Design Systems & Tokens',
    provider: 'Internal Catalog',
    providerType: 'Internal',
    url: '#',
    category: 'Design',
    targetSkill: 'UI/UX Design Systems',
    matchScore: 89,
    difficulty: 'Intermediate',
    duration: '4h 00m',
    rating: 4.7,
    students: 420,
    format: 'Workshop',
    description: 'Internal guide to our Figma token library, accessibility compliance, and UI patterns.',
    reason: 'Required for cross-functional Design & Frontend harmonization.'
  },
  {
    id: 105,
    title: 'Agile Leadership & Cross-Functional Coaching',
    provider: 'LinkedIn Learning',
    providerType: 'External',
    url: 'https://www.linkedin.com/learning/',
    category: 'Management',
    targetSkill: 'Agile & Team Leadership',
    matchScore: 87,
    difficulty: 'Intermediate',
    duration: '5h 30m',
    rating: 4.6,
    students: 11200,
    format: 'Video',
    description: 'Empower autonomous teams, manage sprints, and remove systemic bottlenecks.',
    reason: 'Recommended based on Team Lead competency framework targets.'
  },
  {
    id: 106,
    title: 'Kubernetes & GitOps with ArgoCD',
    provider: 'Pluralsight',
    providerType: 'External',
    url: 'https://www.pluralsight.com/',
    category: 'Engineering',
    targetSkill: 'DevOps & CI/CD Pipelines',
    matchScore: 92,
    difficulty: 'Advanced',
    duration: '10h 15m',
    rating: 4.8,
    students: 9500,
    format: 'Interactive',
    description: 'Automate zero-downtime microservice deployments on Kubernetes using GitOps principles.',
    reason: 'Fulfills DevOps team capability requirements.'
  }
];

// Initial Learning Paths
const INITIAL_LEARNING_PATHS = [
  {
    id: 'path-1',
    title: 'Cloud Native Architect Acceleration',
    targetRole: 'Senior Cloud Architect',
    level: 'Advanced',
    duration: '10 Weeks',
    estimatedHours: '45 Hours',
    enrolledCount: 38,
    category: 'Engineering',
    progress: 40,
    steps: [
      { title: 'Docker Containers & Microservice Fundamentals', duration: '2 Weeks', status: 'completed', resource: 'AWS Skill Builder' },
      { title: 'Kubernetes Cluster Administration & Networking', duration: '3 Weeks', status: 'in_progress', resource: 'Pluralsight' },
      { title: 'AWS Cloud Infrastructure & Security Architecture', duration: '3 Weeks', status: 'pending', resource: 'AWS Skill Builder' },
      { title: 'Infrastructure as Code (Terraform & GitOps)', duration: '2 Weeks', status: 'pending', resource: 'Internal Workshop' }
    ]
  },
  {
    id: 'path-2',
    title: 'AI & Data Science Engineering Track',
    targetRole: 'AI Solutions Engineer',
    level: 'Expert',
    duration: '12 Weeks',
    estimatedHours: '60 Hours',
    enrolledCount: 52,
    category: 'Data Science',
    progress: 25,
    steps: [
      { title: 'Python for Enterprise Data Analysis', duration: '2 Weeks', status: 'completed', resource: 'Coursera' },
      { title: 'Machine Learning Models & Supervised Learning', duration: '3 Weeks', status: 'in_progress', resource: 'Udemy' },
      { title: 'LLM Prompt Engineering, RAG & Vector DBs', duration: '4 Weeks', status: 'pending', resource: 'Udemy' },
      { title: 'Production Model Monitoring & MLOps Pipelines', duration: '3 Weeks', status: 'pending', resource: 'Internal Catalog' }
    ]
  },
  {
    id: 'path-3',
    title: 'Frontend Architecture & Modern React Specialist',
    targetRole: 'Principal Frontend Engineer',
    level: 'Advanced',
    duration: '8 Weeks',
    estimatedHours: '35 Hours',
    enrolledCount: 29,
    category: 'Engineering',
    progress: 75,
    steps: [
      { title: 'Modern React 19 & Hooks Deep Dive', duration: '2 Weeks', status: 'completed', resource: 'Coursera' },
      { title: 'State Management & Web Vitals Optimization', duration: '2 Weeks', status: 'completed', resource: 'Coursera' },
      { title: 'Design System Integration & Web Components', duration: '2 Weeks', status: 'completed', resource: 'Internal Catalog' },
      { title: 'Micro-Frontend Architectures & Security', duration: '2 Weeks', status: 'in_progress', resource: 'Pluralsight' }
    ]
  }
];

export const GapProvider = ({ children }) => {
  const [gapData, setGapData] = useState(INITIAL_GAP_DATA);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [learningPaths, setLearningPaths] = useState(INITIAL_LEARNING_PATHS);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([101, 104]);
  const [activeDimension, setActiveDimension] = useState('individualVsRole');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Multi-dimensional view helper
  const getDimensionValue = (item, dimension) => {
    switch (dimension) {
      case 'teamVsProject':
        return { current: item.current, required: item.projectDemand };
      case 'deptVsOrg':
        return { current: item.current, required: item.strategicGoal };
      case 'currentVsFuture':
        return { current: item.current, required: item.futureForecast };
      case 'individualVsRole':
      default:
        return { current: item.current, required: item.roleRequirement };
    }
  };

  // Recalculate AI Recommendations
  const refreshAiRecommendations = (filterPreference = 'All') => {
    toast.loading('AI Engine analyzing skill gaps & career profiles...', { id: 'ai-gen' });
    setTimeout(() => {
      setCourses(prev => {
        return prev.map(course => ({
          ...course,
          matchScore: Math.min(99, Math.max(80, course.matchScore + Math.floor(Math.random() * 5) - 2))
        })).sort((a, b) => b.matchScore - a.matchScore);
      });
      toast.success('AI Training Recommendations updated successfully!', { id: 'ai-gen' });
    }, 1000);
  };

  // Enroll in Course
  const enrollCourse = (courseId) => {
    if (enrolledCourseIds.includes(courseId)) {
      toast.error('You are already enrolled in this course.');
      return;
    }
    setEnrolledCourseIds(prev => [...prev, courseId]);
    const course = courses.find(c => c.id === courseId);
    toast.success(`Enrolled in "${course?.title || 'Course'}"! Track progress in Learning Hub.`);
  };

  // Toggle milestone in learning path
  const toggleMilestone = (pathId, stepIndex) => {
    setLearningPaths(prevPaths => {
      return prevPaths.map(path => {
        if (path.id !== pathId) return path;

        const updatedSteps = [...path.steps];
        const currentStatus = updatedSteps[stepIndex].status;
        updatedSteps[stepIndex] = {
          ...updatedSteps[stepIndex],
          status: currentStatus === 'completed' ? 'pending' : 'completed'
        };

        const completedCount = updatedSteps.filter(s => s.status === 'completed').length;
        const newProgress = Math.round((completedCount / updatedSteps.length) * 100);

        return {
          ...path,
          steps: updatedSteps,
          progress: newProgress
        };
      });
    });
    toast.success('Milestone status updated!');
  };

  // Add Custom Learning Path
  const createCustomPath = (newPath) => {
    const created = {
      id: `path-${Date.now()}`,
      title: newPath.title,
      targetRole: newPath.targetRole || 'Custom Role',
      level: newPath.level || 'Intermediate',
      duration: `${newPath.steps.length * 2} Weeks`,
      estimatedHours: `${newPath.steps.length * 10} Hours`,
      enrolledCount: 1,
      category: newPath.category || 'General',
      progress: 0,
      steps: newPath.steps.map(s => ({
        title: s.title,
        duration: s.duration || '2 Weeks',
        status: 'pending',
        resource: s.resource || 'Self-Paced'
      }))
    };
    setLearningPaths(prev => [created, ...prev]);
    toast.success(`Custom Learning Path "${newPath.title}" created successfully!`);
  };

  // AI Auto-Generate Path
  const generateAiPath = (targetRole, targetSkill) => {
    toast.loading(`AI Engine building custom path for ${targetRole}...`, { id: 'path-gen' });
    setTimeout(() => {
      const generatedPath = {
        id: `path-ai-${Date.now()}`,
        title: `AI-Accelerated ${targetSkill} Mastery`,
        targetRole: targetRole,
        level: 'Advanced',
        duration: '6 Weeks',
        estimatedHours: '28 Hours',
        enrolledCount: 1,
        category: 'AI Recommended',
        progress: 0,
        steps: [
          { title: `${targetSkill} Diagnostics & Fundamentals`, duration: '1 Week', status: 'pending', resource: 'Coursera' },
          { title: `Core Enterprise Applications of ${targetSkill}`, duration: '2 Weeks', status: 'pending', resource: 'Udemy' },
          { title: `Hands-on Project & Gap Remediation Workshop`, duration: '2 Weeks', status: 'pending', resource: 'Internal Catalog' },
          { title: `Final Competency Assessment & Certification`, duration: '1 Week', status: 'pending', resource: 'Platform Evaluation' }
        ]
      };
      setLearningPaths(prev => [generatedPath, ...prev]);
      toast.success(`AI Learning Path generated for ${targetRole}!`, { id: 'path-gen' });
    }, 1200);
  };

  // Value provided by context
  const value = useMemo(() => ({
    gapData,
    setGapData,
    courses,
    learningPaths,
    enrolledCourseIds,
    activeDimension,
    setActiveDimension,
    selectedDeptFilter,
    setSelectedDeptFilter,
    getDimensionValue,
    refreshAiRecommendations,
    enrollCourse,
    toggleMilestone,
    createCustomPath,
    generateAiPath
  }), [gapData, courses, learningPaths, enrolledCourseIds, activeDimension, selectedDeptFilter]);

  return <GapContext.Provider value={value}>{children}</GapContext.Provider>;
};

export const useGapContext = () => {
  const context = useContext(GapContext);
  if (!context) {
    throw new Error('useGapContext must be used within a GapProvider');
  }
  return context;
};

export default GapContext;
