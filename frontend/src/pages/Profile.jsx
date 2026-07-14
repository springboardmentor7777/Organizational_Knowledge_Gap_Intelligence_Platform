import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit2, MapPin, Building, Calendar, Activity, BookOpen, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = {
    name: "Alex Johnson",
    role: "Senior UX Designer",
    department: "Product Design",
    location: "San Francisco, CA",
    joined: "March 2024",
    bio: "Passionate about creating intuitive and visually stunning user experiences. Expert in bridging the gap between user needs and business goals.",
    skills: [
      { name: 'UI/UX Design', level: 90 },
      { name: 'Framer Motion', level: 85 },
      { name: 'React', level: 75 },
      { name: 'User Research', level: 80 },
      { name: 'Prototyping', level: 95 }
    ]
  };

  const activities = [
    { id: 1, action: "Completed course", target: "Advanced React Patterns", date: "2 days ago", icon: <BookOpen size={16} /> },
    { id: 2, action: "Earned badge", target: "Design Systems Expert", date: "1 week ago", icon: <Star size={16} /> },
    { id: 3, action: "Updated skills", target: "Added Framer Motion", date: "2 weeks ago", icon: <Activity size={16} /> }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header-banner">
        <div className="banner-overlay"></div>
      </div>
      
      <div className="profile-content-wrapper">
        <div className="profile-sidebar">
          <Card className="profile-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-avatar" />
                <button className="avatar-edit-btn">
                  <Camera size={16} />
                </button>
              </div>
              <h2>{user.name}</h2>
              <p className="user-role">{user.role}</p>
              <p className="user-department">{user.department}</p>
            </div>
            
            <div className="user-details">
              <div className="detail-item">
                <MapPin size={18} />
                <span>{user.location}</span>
              </div>
              <div className="detail-item">
                <Building size={18} />
                <span>Product Design</span>
              </div>
              <div className="detail-item">
                <Calendar size={18} />
                <span>Joined {user.joined}</span>
              </div>
            </div>

            <Button className="edit-profile-btn" variant="secondary">
              <Edit2 size={16} /> Edit Profile
            </Button>
          </Card>
        </div>
        
        <div className="profile-main">
          <div className="profile-tabs">
            {['overview', 'skills', 'activity'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="active-tab-indicator" />
                )}
              </button>
            ))}
          </div>

          <motion.div 
            className="tab-content"
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="overview-section">
                <Card className="content-card mb-4">
                  <h3>About Me</h3>
                  <p className="bio-text">{user.bio}</p>
                </Card>
                
                <div className="stats-grid">
                  <Card className="stat-card">
                    <h4>Knowledge Gap</h4>
                    <div className="stat-value text-gradient-1">12%</div>
                    <p>Below company average</p>
                  </Card>
                  <Card className="stat-card">
                    <h4>Courses Completed</h4>
                    <div className="stat-value text-gradient-2">8</div>
                    <p>This quarter</p>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <Card className="content-card">
                <div className="skills-header">
                  <h3>Skills & Expertise</h3>
                  <Button variant="secondary" className="add-skill-btn">Add Skill</Button>
                </div>
                <div className="skills-list">
                  {user.skills.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <motion.div 
                          className="skill-bar-fill" 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'activity' && (
              <Card className="content-card">
                <h3>Recent Activity</h3>
                <div className="timeline">
                  {activities.map((activity, idx) => (
                    <div key={activity.id} className="timeline-item">
                      <div className="timeline-icon">
                        {activity.icon}
                      </div>
                      <div className="timeline-content">
                        <p><strong>{activity.action}</strong> {activity.target}</p>
                        <span className="timeline-date">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
