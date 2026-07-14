import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Star, PlayCircle, BarChart } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import './CourseCatalog.css';

// TODO(Vineet): Replace these mock courses once the learning management system (LMS) API integration is complete.
const MOCK_COURSES = [
  { id: 1, title: 'Advanced React Patterns', category: 'Frontend', difficulty: 'Advanced', provider: 'Internal', format: 'Video', duration: '4h 30m', rating: 4.8, students: 1240, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Cloud Architecture Basics', category: 'Backend', difficulty: 'Beginner', provider: 'AWS', format: 'Interactive', duration: '6h', rating: 4.6, students: 850, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Data Structures in Python', category: 'Data Science', difficulty: 'Intermediate', provider: 'Coursera', format: 'Video', duration: '8h 15m', rating: 4.9, students: 3200, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'UI/UX Design Systems', category: 'Design', difficulty: 'Intermediate', provider: 'Internal', format: 'Article', duration: '2h', rating: 4.7, students: 540, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'Machine Learning Fundamentals', category: 'Data Science', difficulty: 'Beginner', provider: 'Internal', format: 'Video', duration: '12h', rating: 4.8, students: 1560, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400' },
  { id: 6, title: 'Microservices with Spring Boot', category: 'Backend', difficulty: 'Advanced', provider: 'Udemy', format: 'Interactive', duration: '10h', rating: 4.5, students: 920, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400' },
];

const CourseCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Implement rate-limiting (debouncing) to prevent API spam when searching
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log(`[Rate-Limit Protected] Fetching courses for: ${debouncedSearchQuery}`);
      // fetchCourses(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="course-catalog-container">
      <div className="catalog-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Learning Hub
        </motion.h1>
        <p>Discover courses to bridge your knowledge gaps and advance your career.</p>
      </div>

      <div className="catalog-content">
        <aside className="catalog-sidebar glass-panel">
          <div className="sidebar-section">
            <h3><Filter size={18}/> Filters</h3>
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Category</h4>
            <label className="checkbox-label"><input type="checkbox"/> Frontend</label>
            <label className="checkbox-label"><input type="checkbox"/> Backend</label>
            <label className="checkbox-label"><input type="checkbox"/> Data Science</label>
            <label className="checkbox-label"><input type="checkbox"/> Design</label>
          </div>

          <div className="sidebar-section">
            <h4>Difficulty</h4>
            <label className="checkbox-label"><input type="checkbox"/> Beginner</label>
            <label className="checkbox-label"><input type="checkbox"/> Intermediate</label>
            <label className="checkbox-label"><input type="checkbox"/> Advanced</label>
          </div>
          
          <div className="sidebar-section">
            <h4>Format</h4>
            <label className="checkbox-label"><input type="checkbox"/> Video</label>
            <label className="checkbox-label"><input type="checkbox"/> Interactive</label>
            <label className="checkbox-label"><input type="checkbox"/> Article</label>
          </div>
        </aside>

        <main className="courses-grid">
          {MOCK_COURSES.map((course, index) => (
            <motion.div 
              key={course.id}
              className="course-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}>
                <div className="course-difficulty badge">
                  <BarChart size={14} /> {course.difficulty}
                </div>
              </div>
              <div className="course-details">
                <span className="course-category">{course.category} • {course.provider}</span>
                <h3 className="course-title">{course.title}</h3>
                
                <div className="course-meta">
                  <span className="meta-item"><Clock size={14}/> {course.duration}</span>
                  <span className="meta-item"><Star size={14} className="text-warning"/> {course.rating}</span>
                  <span className="meta-item"><BookOpen size={14}/> {course.format}</span>
                </div>
                
                <div className="course-footer">
                  <span className="students-count">{course.students.toLocaleString()} students</span>
                  <button className="btn-primary start-btn">
                    <PlayCircle size={16} /> Start
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default CourseCatalog;
