import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, PlayCircle } from 'lucide-react';
import './LearningProgress.css';

const milestones = [
  { id: 1, title: 'Introduction to GraphQL', date: 'June 10, 2026', status: 'completed', type: 'Course' },
  { id: 2, title: 'Advanced React Patterns', date: 'June 25, 2026', status: 'completed', type: 'Workshop' },
  { id: 3, title: 'System Design Fundamentals', date: 'Current', status: 'in-progress', type: 'Certification', progress: 65 },
  { id: 4, title: 'Cloud Architecture AWS', date: 'Upcoming - August 2026', status: 'upcoming', type: 'Course' },
  { id: 5, title: 'Leadership & Management', date: 'Upcoming - Sept 2026', status: 'upcoming', type: 'Training' },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return <CheckCircle2 size={24} className="status-icon completed" />;
    case 'in-progress': return <PlayCircle size={24} className="status-icon in-progress" />;
    case 'upcoming': return <Circle size={24} className="status-icon upcoming" />;
    default: return <Circle size={24} className="status-icon" />;
  }
};

const LearningProgress = () => {
  return (
    <div className="learning-progress-container glass-panel">
      <div className="lp-header">
        <h2 className="lp-title">Learning Journey</h2>
        <p className="lp-subtitle">Track your educational milestones and goals</p>
      </div>

      <div className="timeline-container">
        {milestones.map((milestone, index) => (
          <motion.div 
            key={milestone.id}
            className={`timeline-item ${milestone.status}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            <div className="timeline-connector-wrapper">
              <div className="timeline-icon">
                {getStatusIcon(milestone.status)}
              </div>
              {index < milestones.length - 1 && (
                <div className={`timeline-line ${milestone.status === 'completed' ? 'line-active' : ''}`}></div>
              )}
            </div>
            
            <div className="timeline-content glass-panel-inner">
              <div className="timeline-content-header">
                <h3 className="milestone-title">{milestone.title}</h3>
                <span className="milestone-type">{milestone.type}</span>
              </div>
              
              <div className="milestone-meta">
                <Clock size={14} />
                <span>{milestone.date}</span>
              </div>
              
              {milestone.status === 'in-progress' && milestone.progress && (
                <div className="progress-bar-container">
                  <div className="progress-bar-info">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${milestone.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningProgress;
