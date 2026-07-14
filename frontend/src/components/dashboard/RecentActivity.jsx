import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  BookOpen,
  AlertTriangle,
  Users,
  CheckCircle,
  Star,
} from 'lucide-react';
import './RecentActivity.css';

const typeConfig = {
  assessment: {
    icon: ClipboardList,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    border: '#a855f7',
    label: 'Assessment',
  },
  enrollment: {
    icon: BookOpen,
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.12)',
    border: '#22d3ee',
    label: 'Enrollment',
  },
  alert: {
    icon: AlertTriangle,
    color: '#fb7185',
    bg: 'rgba(251,113,133,0.12)',
    border: '#fb7185',
    label: 'Gap Alert',
  },
  mentorship: {
    icon: Users,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    border: '#34d399',
    label: 'Mentorship',
  },
  completion: {
    icon: CheckCircle,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: '#f59e0b',
    label: 'Completion',
  },
  achievement: {
    icon: Star,
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    border: '#a855f7',
    label: 'Achievement',
  },
};

const activities = [
  {
    type: 'assessment',
    title: 'Skill Assessment Completed',
    desc: 'Priya Sharma completed the Advanced Python assessment with 92% score.',
    time: '2 min ago',
  },
  {
    type: 'alert',
    title: 'Critical Gap Detected',
    desc: 'Engineering team shows a significant gap in Cloud Architecture knowledge.',
    time: '18 min ago',
  },
  {
    type: 'enrollment',
    title: 'Course Enrollment',
    desc: '14 employees enrolled in "Data Storytelling with Power BI" program.',
    time: '45 min ago',
  },
  {
    type: 'mentorship',
    title: 'Mentorship Match',
    desc: 'Rohan Mehta matched with Sarah Chen for Leadership Development mentoring.',
    time: '1 hr ago',
  },
  {
    type: 'completion',
    title: 'Course Completed',
    desc: 'Agile & Scrum Certification completed by Operations Department (89%).',
    time: '3 hrs ago',
  },
  {
    type: 'achievement',
    title: 'Badge Earned',
    desc: 'Ananya Patel earned the "Data Champion" badge after closing 3 skill gaps.',
    time: '5 hrs ago',
  },
  {
    type: 'assessment',
    title: 'Team Assessment Scheduled',
    desc: 'Leadership assessment scheduled for Marketing team next Monday.',
    time: '8 hrs ago',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const RecentActivity = () => (
  <motion.div
    className="recent-activity"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    <div className="recent-activity__header">
      <div>
        <h3 className="recent-activity__title">Recent Activity</h3>
        <p className="recent-activity__subtitle">Live feed of platform events</p>
      </div>
      <button className="recent-activity__view-all">View All</button>
    </div>

    <motion.ul
      className="recent-activity__list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {activities.map((act, i) => {
        const cfg = typeConfig[act.type];
        const Icon = cfg.icon;

        return (
          <motion.li
            key={i}
            className="activity-item"
            style={{ '--border-color': cfg.border }}
            variants={item}
            whileHover={{ x: 4 }}
          >
            <div
              className="activity-item__icon-wrap"
              style={{ background: cfg.bg }}
            >
              <Icon size={15} color={cfg.color} strokeWidth={2} />
            </div>

            <div className="activity-item__body">
              <div className="activity-item__top">
                <span className="activity-item__title">{act.title}</span>
                <span className="activity-item__badge" style={{ color: cfg.color, background: cfg.bg }}>
                  {cfg.label}
                </span>
              </div>
              <p className="activity-item__desc">{act.desc}</p>
              <span className="activity-item__time">{act.time}</span>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  </motion.div>
);

export default RecentActivity;
