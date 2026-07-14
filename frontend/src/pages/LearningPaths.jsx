import React from 'react';
import { motion } from 'framer-motion';
import { Map, PenTool, CheckCircle2, Circle } from 'lucide-react';
import Button from '../components/common/Button';
import './LearningPaths.css';

const paths = [
  {
    id: 1,
    title: 'Cloud Native Architect',
    level: 'Advanced',
    duration: '12 Weeks',
    steps: ['Containers Basics', 'Kubernetes Ecosystem', 'Service Mesh', 'Cloud Patterns']
  },
  {
    id: 2,
    title: 'Frontend Engineering Lead',
    level: 'Expert',
    duration: '8 Weeks',
    steps: ['Advanced React Patterns', 'Performance Optimization', 'System Design', 'Team Leadership']
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    level: 'Beginner',
    duration: '10 Weeks',
    steps: ['Python Basics', 'Data Analysis with Pandas', 'Machine Learning 101', 'Data Viz']
  }
];

const LearningPaths = () => {
  return (
    <motion.div 
      className="page-container learning-paths-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-gradient">Learning Paths</span>
        </h1>
        <p className="page-subtitle">Structured journeys to achieve your career goals.</p>
      </header>

      <section className="prebuilt-paths-section">
        <h2 className="section-title"><Map size={24} className="accent-icon"/> Recommended Paths</h2>
        <div className="paths-grid">
          {paths.map((path, i) => (
            <motion.div 
              key={path.id} 
              className="path-card glass-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="path-header">
                <h3>{path.title}</h3>
                <div className="path-meta">
                  <span className="level-badge">{path.level}</span>
                  <span className="duration-text">{path.duration}</span>
                </div>
              </div>
              <div className="roadmap-visual">
                {path.steps.map((step, index) => (
                  <div key={index} className="roadmap-step">
                    <div className="step-icon-container">
                      {index === 0 ? <CheckCircle2 size={20} className="completed-icon"/> : <Circle size={20} className="pending-icon"/>}
                      {index < path.steps.length - 1 && <div className="step-line" />}
                    </div>
                    <span className="step-label">{step}</span>
                  </div>
                ))}
              </div>
              <div className="path-footer">
                <Button className="glass-button w-full">Continue Path</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="custom-path-builder glass-panel">
        <div className="builder-content">
          <div className="builder-text">
            <h2><PenTool size={24} className="accent-icon"/> Custom Path Builder</h2>
            <p>Design a learning journey tailored precisely to your unique skill gaps and career aspirations. AI will help you connect the dots.</p>
          </div>
          <div className="builder-action">
            <Button className="primary-glow-btn">Create Custom Path</Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LearningPaths;
