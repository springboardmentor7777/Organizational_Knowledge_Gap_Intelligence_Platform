import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Star, Award, MessageSquare } from 'lucide-react';
import Button from '../components/common/Button';
import './ExpertDirectory.css';

const experts = [
  {
    id: 1,
    name: "Dr. Elena Rodriguez",
    title: "Principal Cloud Architect",
    department: "Infrastructure",
    skills: ["AWS", "Kubernetes", "System Design"],
    rating: 4.9,
    mentees: 12,
    avatar: "ER"
  },
  {
    id: 2,
    name: "James Chen",
    title: "Senior Frontend Engineer",
    department: "User Experience",
    skills: ["React", "Performance", "UI/UX"],
    rating: 4.8,
    mentees: 8,
    avatar: "JC"
  },
  {
    id: 3,
    name: "Sarah Williams",
    title: "DevOps Lead",
    department: "Operations",
    skills: ["CI/CD", "Terraform", "Security"],
    rating: 5.0,
    mentees: 5,
    avatar: "SW"
  },
  {
    id: 4,
    name: "Michael Chang",
    title: "Data Science Director",
    department: "Analytics",
    skills: ["Machine Learning", "Python", "SQL"],
    rating: 4.7,
    mentees: 15,
    avatar: "MC"
  }
];

const ExpertDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperts = experts.filter(expert => 
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="directory-container">
      <div className="directory-header">
        <h1>Expert Directory</h1>
        <p>Find and connect with internal mentors to close your knowledge gaps.</p>
      </div>

      <div className="search-section glass-panel">
        <Search className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by name or skill (e.g., 'React', 'AWS')..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="expert-search-input"
        />
      </div>

      <div className="experts-grid">
        <AnimatePresence>
          {filteredExperts.map((expert, idx) => (
            <motion.div
              key={expert.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="expert-card glass-panel"
            >
              <div className="expert-card-header">
                <div className="expert-avatar">
                  {expert.avatar}
                </div>
                <div className="expert-title-info">
                  <h3>{expert.name}</h3>
                  <span className="expert-role">{expert.title}</span>
                  <span className="expert-dept">{expert.department}</span>
                </div>
              </div>

              <div className="expert-stats">
                <div className="stat-item">
                  <Star className="text-warning" size={16} />
                  <span>{expert.rating}</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <Award className="text-cyan" size={16} />
                  <span>{expert.mentees} mentees</span>
                </div>
              </div>

              <div className="expert-skills">
                {expert.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>

              <div className="expert-actions">
                <Button variant="primary" className="action-btn">
                  <UserPlus size={16} /> Request Mentorship
                </Button>
                <Button variant="secondary" className="action-btn icon-only">
                  <MessageSquare size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredExperts.length === 0 && (
          <div className="no-results glass-panel">
            <p>No experts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDirectory;
