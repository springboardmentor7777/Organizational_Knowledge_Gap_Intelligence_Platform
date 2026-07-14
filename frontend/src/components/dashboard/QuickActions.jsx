import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  AlertCircle,
  BookMarked,
  UserSearch,
  BarChart3,
  Share2,
} from 'lucide-react';
import './QuickActions.css';

const actions = [
  {
    id: 'take-assessment',
    icon: ClipboardCheck,
    label: 'Take Assessment',
    description: 'Evaluate your current skill level across key areas.',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    glow: 'rgba(168,85,247,0.4)',
    bg: 'rgba(168,85,247,0.1)',
    border: 'rgba(168,85,247,0.2)',
  },
  {
    id: 'view-gaps',
    icon: AlertCircle,
    label: 'View Gaps',
    description: 'Identify and prioritize critical knowledge gaps.',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
    glow: 'rgba(251,113,133,0.4)',
    bg: 'rgba(251,113,133,0.1)',
    border: 'rgba(251,113,133,0.2)',
  },
  {
    id: 'browse-courses',
    icon: BookMarked,
    label: 'Browse Courses',
    description: 'Explore curated learning paths tailored to your gaps.',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
    glow: 'rgba(34,211,238,0.4)',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.2)',
  },
  {
    id: 'find-mentor',
    icon: UserSearch,
    label: 'Find Mentor',
    description: 'Connect with expert mentors matched to your goals.',
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    glow: 'rgba(52,211,153,0.4)',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'view-reports',
    icon: BarChart3,
    label: 'View Reports',
    description: 'Analyze team performance and progress analytics.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glow: 'rgba(245,158,11,0.4)',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    id: 'share-knowledge',
    icon: Share2,
    label: 'Share Knowledge',
    description: 'Contribute expertise and mentor peers across teams.',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)',
    glow: 'rgba(168,85,247,0.4)',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.2)',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const QuickActions = () => (
  <motion.div
    className="quick-actions"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="quick-actions__header">
      <h3 className="quick-actions__title">Quick Actions</h3>
      <p className="quick-actions__subtitle">Jump-start your learning journey</p>
    </div>

    <motion.div
      className="quick-actions__grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            id={`quick-action-${action.id}`}
            className="qa-card"
            style={{
              '--glow': action.glow,
              '--bg': action.bg,
              '--border': action.border,
            }}
            variants={cardVariant}
            whileHover={{
              y: -6,
              scale: 1.03,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="qa-card__icon-wrap"
              style={{ background: action.gradient, boxShadow: `0 0 20px ${action.glow}` }}
            >
              <Icon size={22} color="#fff" strokeWidth={2} />
            </div>

            <span className="qa-card__label">{action.label}</span>
            <p className="qa-card__desc">{action.description}</p>

            <div className="qa-card__arrow">→</div>
            <div className="qa-card__glow" />
          </motion.button>
        );
      })}
    </motion.div>
  </motion.div>
);

export default QuickActions;
