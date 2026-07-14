import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, Star, MessageSquare, Calendar } from 'lucide-react';
import './Mentorship.css';

const MOCK_MENTORS = [
  { id: 1, name: 'Sarah Jenkins', role: 'Principal Engineer', department: 'Cloud Infrastructure', location: 'New York', rating: 4.9, skills: ['AWS', 'System Design', 'Go'], available: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'David Chen', role: 'Senior Data Scientist', department: 'AI Lab', location: 'San Francisco', rating: 4.8, skills: ['Python', 'Machine Learning', 'TensorFlow'], available: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Elena Rodriguez', role: 'UX Director', department: 'Product Design', location: 'London', rating: 5.0, skills: ['Figma', 'User Research', 'Design Systems'], available: false, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
];

const MOCK_MENTEES = [
  { id: 1, name: 'Alex Wong', role: 'Junior Frontend Dev', goal: 'Mastering React Performance', progress: 75, nextMeeting: 'Tomorrow, 2:00 PM', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Jessica Smith', role: 'Marketing Associate', goal: 'Data Analytics Transition', progress: 30, nextMeeting: 'Oct 15, 10:00 AM', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }
];

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState('find');

  return (
    <div className="mentorship-container">
      <div className="mentorship-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          Mentorship Network
        </motion.h1>
        <p>Connect with experts or guide the next generation of talent.</p>
        
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'find' ? 'active' : ''}`}
            onClick={() => setActiveTab('find')}
          >
            Find a Mentor
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mentees' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentees')}
          >
            My Mentees
          </button>
        </div>
      </div>

      <div className="mentorship-content">
        <AnimatePresence mode="wait">
          {activeTab === 'find' ? (
            <motion.div 
              key="find"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="find-mentor-section"
            >
              <div className="search-bar glass-panel">
                <Search className="search-icon" />
                <input type="text" placeholder="Search by name, role, or skill..." />
              </div>
              
              <div className="mentors-grid">
                {MOCK_MENTORS.map((mentor) => (
                  <motion.div 
                    key={mentor.id} 
                    className="mentor-card glass-panel"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mentor-header">
                      <img src={mentor.image} alt={mentor.name} className="mentor-avatar" />
                      <div className="mentor-info">
                        <h3>{mentor.name}</h3>
                        <p className="mentor-role"><Briefcase size={14}/> {mentor.role}</p>
                        <p className="mentor-location"><MapPin size={14}/> {mentor.location}</p>
                      </div>
                    </div>
                    
                    <div className="mentor-skills">
                      {mentor.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    
                    <div className="mentor-footer">
                      <div className="mentor-rating">
                        <Star size={16} className="text-warning"/>
                        <span>{mentor.rating}</span>
                      </div>
                      <button className={`btn ${mentor.available ? 'btn-primary' : 'btn-disabled'}`} disabled={!mentor.available}>
                        {mentor.available ? 'Request Mentorship' : 'Currently Full'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="mentees"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="my-mentees-section"
            >
              <div className="mentees-grid">
                {MOCK_MENTEES.map(mentee => (
                  <motion.div key={mentee.id} className="mentee-card glass-panel">
                    <div className="mentee-header">
                       <img src={mentee.image} alt={mentee.name} className="mentee-avatar" />
                       <div className="mentee-info">
                         <h3>{mentee.name}</h3>
                         <p>{mentee.role}</p>
                       </div>
                       <div className="mentee-actions">
                         <button className="icon-btn"><MessageSquare size={18}/></button>
                         <button className="icon-btn"><Calendar size={18}/></button>
                       </div>
                    </div>
                    
                    <div className="mentee-progress">
                      <div className="progress-header">
                        <span>Goal: {mentee.goal}</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <motion.div 
                          className="progress-bar-fill" 
                          initial={{ width: 0 }}
                          animate={{ width: `${mentee.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    
                    <div className="next-meeting">
                      <Calendar size={14}/> Next Meeting: <span>{mentee.nextMeeting}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Mentorship;
