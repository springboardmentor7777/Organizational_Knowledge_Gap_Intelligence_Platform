import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Zap, Book } from 'lucide-react';
import SkillInventory from '../components/employee/SkillInventory';
import './Skills.css';

const Skills = () => {
  const stats = [
    { label: 'Total Skills', value: 42, icon: Book, color: '#3b82f6' },
    { label: 'Expert Level', value: 8, icon: Award, color: '#10b981' },
    { label: 'Advanced', value: 15, icon: Zap, color: '#f59e0b' },
    { label: 'Beginner', value: 19, icon: Target, color: '#8b5cf6' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="page-container skills-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-gradient">My Skills</span>
        </h1>
        <p className="page-subtitle">Track your capabilities and proficiency levels.</p>
      </header>

      <motion.div className="stats-grid" variants={containerVariants}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} className="stat-card glass-panel" variants={itemVariants}>
              <div className="stat-icon-wrapper" style={{ background: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="inventory-section glass-panel" variants={itemVariants}>
        <SkillInventory />
      </motion.div>
    </motion.div>
  );
};

export default Skills;
