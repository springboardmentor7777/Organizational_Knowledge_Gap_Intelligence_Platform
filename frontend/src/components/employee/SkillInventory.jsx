import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar } from 'lucide-react';
import './SkillInventory.css';

const skills = [
  { id: 1, name: 'React.js', category: 'Frontend', proficiency: 4, lastAssessed: '2026-06-15' },
  { id: 2, name: 'Node.js', category: 'Backend', proficiency: 3, lastAssessed: '2026-05-20' },
  { id: 3, name: 'UI/UX Design', category: 'Design', proficiency: 5, lastAssessed: '2026-07-01' },
  { id: 4, name: 'Python', category: 'Backend', proficiency: 2, lastAssessed: '2026-04-10' },
  { id: 5, name: 'GraphQL', category: 'API', proficiency: 4, lastAssessed: '2026-06-28' },
  { id: 6, name: 'Figma', category: 'Design', proficiency: 4, lastAssessed: '2026-07-05' },
];

const renderStars = (level) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={16}
        className={`star-icon ${i <= level ? 'filled' : 'empty'}`}
        fill={i <= level ? 'currentColor' : 'none'}
      />
    );
  }
  return stars;
};

const SkillInventory = () => {
  return (
    <div className="skill-inventory-container">
      <div className="skill-header">
        <h2 className="skill-title">Skill Inventory</h2>
        <p className="skill-subtitle">Your current proficiencies across different domains</p>
      </div>
      
      <motion.div 
        className="skill-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.id}
            className="skill-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="skill-card-header">
              <h3 className="skill-name">{skill.name}</h3>
              <span className={`skill-badge category-${skill.category.toLowerCase()}`}>
                {skill.category}
              </span>
            </div>
            
            <div className="skill-proficiency">
              <div className="stars-container">
                {renderStars(skill.proficiency)}
              </div>
              <span className="proficiency-text">{skill.proficiency}/5</span>
            </div>
            
            <div className="skill-footer">
              <Calendar size={14} className="calendar-icon" />
              <span>Assessed: {skill.lastAssessed}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillInventory;
