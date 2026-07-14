import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, PlayCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import './TrainingRecommendations.css';

const aiCourses = [
  { id: 1, title: 'Advanced Cloud Architecture', match: '98%', desc: 'Bridges your gap in Distributed Systems.', time: '4h 30m' },
  { id: 2, title: 'Machine Learning Fundamentals', match: '95%', desc: 'Highly requested skill in your department.', time: '6h 15m' }
];

const allCourses = [
  { id: 3, title: 'React Performance Tuning', category: 'Frontend', time: '2h' },
  { id: 4, title: 'Kubernetes for Beginners', category: 'DevOps', time: '5h' },
  { id: 5, title: 'Effective Communication', category: 'Soft Skills', time: '1h 30m' },
  { id: 6, title: 'System Design Interview Prep', category: 'Architecture', time: '8h' },
  { id: 7, title: 'Advanced TypeScript', category: 'Frontend', time: '3h 45m' },
  { id: 8, title: 'Agile Methodologies', category: 'Management', time: '2h 15m' }
];

const TrainingRecommendations = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Frontend', 'DevOps', 'Soft Skills', 'Architecture', 'Management'];

  const filteredCourses = filter === 'All' ? allCourses : allCourses.filter(c => c.category === filter);

  return (
    <motion.div 
      className="page-container training-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-gradient">Training Recommendations</span>
        </h1>
        <p className="page-subtitle">AI-curated learning paths to close your skill gaps.</p>
      </header>

      <section className="ai-picks-section">
        <h2 className="section-title"><Sparkles className="icon-glow" size={24}/> Top AI Picks For You</h2>
        <div className="ai-cards-grid">
          {aiCourses.map((course, i) => (
            <motion.div 
              key={course.id} 
              className="ai-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="ai-card-header">
                <span className="match-badge">{course.match} Match</span>
              </div>
              <div className="ai-card-body">
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <div className="card-meta">
                  <span className="meta-item"><Clock size={16}/> {course.time}</span>
                </div>
                <Button className="enroll-btn glass-button"><PlayCircle size={18}/> Start Now</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="explore-section">
        <div className="explore-header">
          <h2 className="section-title">Explore Courses</h2>
          <div className="filter-controls">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search courses..." className="glass-input" />
            </div>
            <div className="category-filters">
              {categories.map(c => (
                <button 
                  key={c} 
                  className={`filter-chip ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="courses-grid">
          <AnimatePresence>
            {filteredCourses.map(course => (
              <motion.div 
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="course-card small-glass-card"
              >
                <h4>{course.title}</h4>
                <div className="card-meta-small">
                  <span className="category-tag">{course.category}</span>
                  <span className="time-tag"><Clock size={14}/> {course.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default TrainingRecommendations;
