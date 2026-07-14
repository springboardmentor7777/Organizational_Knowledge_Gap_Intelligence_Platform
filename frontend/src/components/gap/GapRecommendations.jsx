import React from 'react';
import { Lightbulb, Sparkles, TrendingUp, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './GapRecommendations.css';

const recommendations = [
  {
    id: 1,
    title: 'Launch Advanced React Bootcamp',
    desc: 'Critical gap identified in Engineering. A 4-week intensive can close 80% of the gap.',
    priority: 'high',
    impact: 'High Impact',
    actionText: 'Create Campaign'
  },
  {
    id: 2,
    title: 'Cross-train Management in Agile',
    desc: 'Medium gap in Management. Recommend pairing with Agile coaches for 2 weeks.',
    priority: 'medium',
    impact: 'Medium Impact',
    actionText: 'Assign Mentors'
  },
  {
    id: 3,
    title: 'Data Visualization Workshops',
    desc: 'Proactive measure for Data Science team before the Q4 reporting cycle.',
    priority: 'low',
    impact: 'Proactive',
    actionText: 'Schedule Workshop'
  }
];

const GapRecommendations = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h2 className="recommendations-title">
          <Lightbulb className="icon-gradient" size={24} />
          AI Action Plan
        </h2>
        <div className="ai-badge">
          <Sparkles size={14} /> AI Powered
        </div>
      </div>

      <motion.div 
        className="recommendations-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {recommendations.map((rec) => (
          <motion.div 
            key={rec.id} 
            className={`recommendation-card priority-${rec.priority}`}
            variants={itemVariants}
          >
            <div className="rec-content">
              <div className="rec-top">
                <h3 className="rec-title">{rec.title}</h3>
                <span className="rec-impact">
                  <TrendingUp size={12} /> {rec.impact}
                </span>
              </div>
              <p className="rec-desc">{rec.desc}</p>
              
              <div className="rec-actions">
                <button className="rec-btn primary">
                  <PlayCircle size={14} /> {rec.actionText}
                </button>
                <button className="rec-btn">
                  Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GapRecommendations;
