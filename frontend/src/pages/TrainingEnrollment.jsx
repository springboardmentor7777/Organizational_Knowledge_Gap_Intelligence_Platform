import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar, CheckCircle, PlayCircle, ExternalLink } from 'lucide-react';
import Button from '../components/common/Button';
import './TrainingEnrollment.css';

const activeCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    progress: 65,
    dueDate: "2026-08-01",
    status: "In Progress",
    thumbnail: "react-thumb.png"
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    provider: "A Cloud Guru",
    progress: 30,
    dueDate: "2026-08-15",
    status: "In Progress",
    thumbnail: "aws-thumb.png"
  }
];

const completedCourses = [
  {
    id: 3,
    title: "UI/UX Foundations for Developers",
    provider: "Coursera",
    progress: 100,
    completionDate: "2026-06-20",
    status: "Completed",
    thumbnail: "ui-thumb.png"
  }
];

const CourseCard = ({ course, isCompleted }) => {
  return (
    <motion.div 
      className="course-card glass-panel"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="course-thumbnail-placeholder">
        <BookOpen size={48} className="placeholder-icon" />
      </div>
      <div className="course-info">
        <span className="course-provider">{course.provider}</span>
        <h3>{course.title}</h3>
        
        <div className="course-meta">
          {isCompleted ? (
            <span className="meta-item success"><CheckCircle size={16}/> Completed {course.completionDate}</span>
          ) : (
            <span className="meta-item warning"><Calendar size={16}/> Due {course.dueDate}</span>
          )}
        </div>

        <div className="course-progress">
          <div className="progress-header">
            <span>{isCompleted ? 'Completed' : 'Progress'}</span>
            <span>{course.progress}%</span>
          </div>
          <div className="progress-track">
            <motion.div 
              className={`progress-fill ${isCompleted ? 'completed-fill' : ''}`}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>

        <div className="course-actions">
          {isCompleted ? (
            <Button variant="secondary" className="full-width">View Certificate <ExternalLink size={16} style={{marginLeft: '8px'}} /></Button>
          ) : (
            <Button variant="primary" className="full-width">Continue Learning <PlayCircle size={16} style={{marginLeft: '8px'}} /></Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TrainingEnrollment = () => {
  return (
    <div className="training-container">
      <div className="training-header">
        <h1>My Learning Path</h1>
        <p>Track your active enrollments and learning progress</p>
      </div>

      <div className="section-container">
        <h2 className="section-title">
          <Clock className="section-icon text-cyan" /> 
          In Progress ({activeCourses.length})
        </h2>
        <div className="courses-grid">
          {activeCourses.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <CourseCard course={course} isCompleted={false} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-container mt-4">
        <h2 className="section-title">
          <CheckCircle className="section-icon text-success" /> 
          Completed ({completedCourses.length})
        </h2>
        <div className="courses-grid">
          {completedCourses.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
            >
              <CourseCard course={course} isCompleted={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingEnrollment;
