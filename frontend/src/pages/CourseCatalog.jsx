import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Star, PlayCircle, BarChart, ExternalLink, CheckCircle } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useGapContext } from '../context/GapContext';
import './CourseCatalog.css';

const EXTENDED_COURSES = [
  { id: 1, title: 'Advanced React 19 Patterns', category: 'Frontend', difficulty: 'Advanced', provider: 'Coursera', providerType: 'External', format: 'Video', duration: '4h 30m', rating: 4.8, students: 1240, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400', url: 'https://www.coursera.org/' },
  { id: 2, title: 'AWS Cloud Architecture & Resilience', category: 'Backend', difficulty: 'Beginner', provider: 'AWS Skill Builder', providerType: 'External', format: 'Interactive', duration: '6h', rating: 4.9, students: 8500, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400', url: 'https://aws.amazon.com/training/' },
  { id: 3, title: 'LLMOps & RAG Engineering in Python', category: 'Data Science', difficulty: 'Intermediate', provider: 'Udemy', providerType: 'External', format: 'Video', duration: '8h 15m', rating: 4.9, students: 3200, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=400', url: 'https://www.udemy.com/' },
  { id: 4, title: 'Enterprise UI/UX Design Tokens', category: 'Design', difficulty: 'Intermediate', provider: 'Internal Catalog', providerType: 'Internal', format: 'Article', duration: '2h', rating: 4.7, students: 540, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400', url: '#' },
  { id: 5, title: 'Machine Learning & MLOps Pipelines', category: 'Data Science', difficulty: 'Beginner', provider: 'Internal Catalog', providerType: 'Internal', format: 'Video', duration: '12h', rating: 4.8, students: 1560, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400', url: '#' },
  { id: 6, title: 'Microservices with Spring Boot 3', category: 'Backend', difficulty: 'Advanced', provider: 'Pluralsight', providerType: 'External', format: 'Interactive', duration: '10h', rating: 4.8, students: 9200, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400', url: 'https://www.pluralsight.com/' },
];

const CourseCatalog = () => {
  const { enrolledCourseIds, enrollCourse } = useGapContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleDifficulty = (diff) => {
    setSelectedDifficulties(prev => 
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  };

  const toggleProvider = (prov) => {
    setSelectedProviders(prev => 
      prev.includes(prov) ? prev.filter(p => p !== prov) : [...prev, prov]
    );
  };

  const filteredCourses = EXTENDED_COURSES.filter(course => {
    const matchesSearch = !debouncedSearchQuery || 
      course.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    
    const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesDiff = selectedDifficulties.length === 0 || selectedDifficulties.includes(course.difficulty);
    const matchesProv = selectedProviders.length === 0 || selectedProviders.includes(course.providerType);

    return matchesSearch && matchesCat && matchesDiff && matchesProv;
  });

  return (
    <div className="course-catalog-container">
      <div className="catalog-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Integrated Course Catalog & External LMS
        </motion.h1>
        <p>Browse internal training & external platforms (Coursera, Udemy, AWS Skill Builder, Pluralsight, LinkedIn Learning).</p>
      </div>

      <div className="catalog-content">
        <aside className="catalog-sidebar glass-panel">
          <div className="sidebar-section">
            <h3><Filter size={18}/> Filters</h3>
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Category</h4>
            {['Frontend', 'Backend', 'Data Science', 'Design'].map(cat => (
              <label key={cat} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                /> {cat}
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <h4>Catalog Provider</h4>
            {['External', 'Internal'].map(prov => (
              <label key={prov} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedProviders.includes(prov)}
                  onChange={() => toggleProvider(prov)}
                /> {prov === 'External' ? 'External Catalogs' : 'Internal Courses'}
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <h4>Difficulty</h4>
            {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <label key={diff} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedDifficulties.includes(diff)}
                  onChange={() => toggleDifficulty(diff)}
                /> {diff}
              </label>
            ))}
          </div>
        </aside>

        <main className="courses-grid">
          {filteredCourses.map((course, index) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <motion.div 
                key={course.id}
                className="course-card glass-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
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
                    <span className="students-count">{course.students.toLocaleString()} enrolled</span>
                    
                    <div className="course-action-btns">
                      <button 
                        className={`start-btn ${isEnrolled ? 'enrolled' : 'btn-primary'}`}
                        onClick={() => enrollCourse(course.id)}
                      >
                        {isEnrolled ? <CheckCircle size={16}/> : <PlayCircle size={16} />}
                        {isEnrolled ? 'Enrolled' : 'Enroll'}
                      </button>

                      {course.providerType === 'External' && (
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ext-launch-link"
                          title="Open course on external platform"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default CourseCatalog;
