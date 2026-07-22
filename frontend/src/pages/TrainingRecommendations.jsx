import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, PlayCircle, Clock, Star, ExternalLink, RefreshCw, CheckCircle, Award, BookOpen } from 'lucide-react';
import { useGapContext } from '../context/GapContext';
import Button from '../components/common/Button';
import './TrainingRecommendations.css';

const TrainingRecommendations = () => {
  const { courses, enrolledCourseIds, enrollCourse, refreshAiRecommendations } = useGapContext();
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterProvider, setFilterProvider] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  const categories = ['All', 'Engineering', 'Data Science', 'Design', 'Management', 'Marketing'];
  const providers = ['All', 'External', 'Internal'];

  const filteredCourses = courses.filter(course => {
    const matchesCat = filterCategory === 'All' || course.category === filterCategory;
    const matchesProv = filterProvider === 'All' || course.providerType === filterProvider;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.targetSkill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesProv && matchesSearch;
  });

  const aiTopPicks = courses.filter(c => c.matchScore >= 90).slice(0, 3);

  return (
    <motion.div 
      className="page-container training-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header training-header">
        <div>
          <h1 className="page-title">
            <span className="title-gradient">AI Training Recommendation Engine</span>
          </h1>
          <p className="page-subtitle">Adaptive AI recommendations tailored to your exact skill gaps and career trajectory.</p>
        </div>

        <button 
          className="refresh-ai-btn glass-button"
          onClick={() => refreshAiRecommendations(filterCategory)}
        >
          <RefreshCw size={16} /> Recalculate AI Picks
        </button>
      </header>

      {/* Top AI Picks Section */}
      <section className="ai-picks-section">
        <div className="section-header-row">
          <h2 className="section-title">
            <Sparkles className="icon-glow" size={24}/> Top AI Recommended Interventions
          </h2>
          <span className="ai-badge-header">
            <Award size={14} /> Ranked by Skill Gap Priority & ROI
          </span>
        </div>

        <div className="ai-cards-grid">
          {aiTopPicks.map((course, i) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <motion.div 
                key={course.id} 
                className="ai-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="ai-card-header">
                  <span className="match-badge">{course.matchScore}% Match</span>
                  <span className="provider-tag">{course.provider}</span>
                </div>
                <div className="ai-card-body">
                  <h3>{course.title}</h3>
                  <div className="target-skill-tag">Target Skill: {course.targetSkill}</div>
                  <p className="ai-reason-text">💡 <strong>Why Recommended:</strong> {course.reason}</p>
                  
                  <div className="card-meta">
                    <span className="meta-item"><Clock size={16}/> {course.duration}</span>
                    <span className="meta-item"><Star size={16} className="text-warning"/> {course.rating}</span>
                    <span className="meta-item"><BookOpen size={16}/> {course.format}</span>
                  </div>

                  <div className="ai-card-actions">
                    <Button 
                      className={`enroll-btn ${isEnrolled ? 'enrolled-btn' : 'glass-button'}`}
                      onClick={() => enrollCourse(course.id)}
                    >
                      {isEnrolled ? <CheckCircle size={18}/> : <PlayCircle size={18}/>}
                      {isEnrolled ? 'Enrolled' : 'Start Course'}
                    </Button>
                    <button 
                      className="preview-btn"
                      onClick={() => setSelectedCourseModal(course)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Course Catalog & External Linking Section */}
      <section className="explore-section">
        <div className="explore-header">
          <div>
            <h2 className="section-title">Explore Internal & External Catalog</h2>
            <p className="section-subtext">Directly integrated with Coursera, Udemy, LinkedIn Learning, AWS Skill Builder, & Pluralsight</p>
          </div>

          <div className="filter-controls">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search courses, skills..." 
                className="glass-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Category & Provider Chips */}
        <div className="filter-chips-row">
          <div className="chip-group">
            <span className="chip-label">Category:</span>
            {categories.map(c => (
              <button 
                key={c} 
                className={`filter-chip ${filterCategory === c ? 'active' : ''}`}
                onClick={() => setFilterCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="chip-group">
            <span className="chip-label">Catalog Type:</span>
            {providers.map(p => (
              <button 
                key={p} 
                className={`filter-chip ${filterProvider === p ? 'active' : ''}`}
                onClick={() => setFilterProvider(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="courses-grid">
          <AnimatePresence>
            {filteredCourses.map(course => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <motion.div 
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="course-card small-glass-card"
                >
                  <div className="course-card-top">
                    <span className="category-tag">{course.category}</span>
                    <span className="provider-badge-sm">{course.provider}</span>
                  </div>
                  <h4>{course.title}</h4>
                  <p className="course-short-desc">{course.description}</p>
                  
                  <div className="card-meta-small">
                    <span className="time-tag"><Clock size={14}/> {course.duration}</span>
                    <span className="time-tag"><Star size={14} className="text-warning"/> {course.rating}</span>
                  </div>

                  <div className="course-card-footer">
                    <Button 
                      className={`btn-sm ${isEnrolled ? 'btn-enrolled' : 'btn-primary'}`}
                      onClick={() => enrollCourse(course.id)}
                    >
                      {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                    </Button>

                    {course.providerType === 'External' ? (
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="external-link-btn"
                        title="Launch in External Catalog"
                      >
                        <ExternalLink size={14} /> Platform
                      </a>
                    ) : (
                      <button 
                        className="external-link-btn"
                        onClick={() => setSelectedCourseModal(course)}
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourseModal && (
          <div className="modal-backdrop" onClick={() => setSelectedCourseModal(null)}>
            <motion.div 
              className="course-modal glass-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="provider-badge">{selectedCourseModal.provider}</span>
                  <h3>{selectedCourseModal.title}</h3>
                </div>
                <button className="close-btn" onClick={() => setSelectedCourseModal(null)}>✕</button>
              </div>

              <div className="modal-body">
                <div className="ai-explanation-box">
                  <strong>💡 AI Recommendation Impact:</strong>
                  <p>{selectedCourseModal.reason}</p>
                </div>

                <div className="modal-meta-row">
                  <div><strong>Difficulty:</strong> {selectedCourseModal.difficulty}</div>
                  <div><strong>Duration:</strong> {selectedCourseModal.duration}</div>
                  <div><strong>Rating:</strong> ⭐ {selectedCourseModal.rating}</div>
                  <div><strong>Students:</strong> {selectedCourseModal.students.toLocaleString()}</div>
                </div>

                <div className="modal-desc">
                  <strong>Course Overview:</strong>
                  <p>{selectedCourseModal.description}</p>
                </div>

                <div className="modal-actions-bar">
                  <Button 
                    className="primary-glow-btn w-full"
                    onClick={() => {
                      enrollCourse(selectedCourseModal.id);
                      setSelectedCourseModal(null);
                    }}
                  >
                    <PlayCircle size={18} /> Confirm Enrollment
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrainingRecommendations;
