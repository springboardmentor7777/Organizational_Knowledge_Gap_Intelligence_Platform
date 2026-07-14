import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, ChevronRight, Target, Users, TrendingUp } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './RoleBenchmarking.css';

const ROLES = [
  { id: 1, title: 'Senior Software Engineer', department: 'Engineering', count: 45 },
  { id: 2, title: 'Product Manager', department: 'Product', count: 12 },
  { id: 3, title: 'Data Scientist', department: 'Data', count: 18 },
  { id: 4, title: 'UX Designer', department: 'Design', count: 8 },
  { id: 5, title: 'DevOps Engineer', department: 'Engineering', count: 15 },
];

const SKILL_BENCHMARKS = [
  { name: 'System Design', required: 4.5, current: 3.8 },
  { name: 'React/Frontend', required: 4.0, current: 4.2 },
  { name: 'Backend/API', required: 4.0, current: 3.5 },
  { name: 'Cloud/AWS', required: 3.5, current: 3.0 },
  { name: 'Leadership', required: 3.0, current: 2.8 },
];

const RoleBenchmarking = () => {
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      className="benchmarking-container page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <div>
          <h1 className="page-title">Role Benchmarking</h1>
          <p className="page-subtitle">Define and analyze competency requirements by role</p>
        </div>
        <Button className="glass-btn primary">Create New Role</Button>
      </header>

      <div className="benchmarking-layout">
        {/* Left Pane - Role List */}
        <Card className="glass-card role-list-pane">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
            />
          </div>
          <div className="role-list">
            {ROLES.map(role => (
              <motion.div 
                key={role.id}
                className={`role-list-item ${activeRole.id === role.id ? 'active' : ''}`}
                onClick={() => setActiveRole(role)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="role-icon-box">
                  <Briefcase size={20} />
                </div>
                <div className="role-info">
                  <h4>{role.title}</h4>
                  <p>{role.department}</p>
                </div>
                <ChevronRight size={18} className="chevron" />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Right Pane - Benchmarks */}
        <Card className="glass-card benchmark-details-pane">
          <div className="benchmark-header">
            <div className="header-info">
              <h2>{activeRole.title}</h2>
              <span className="dept-badge">{activeRole.department}</span>
            </div>
            <div className="stats-row">
              <div className="stat-box">
                <Users size={18} />
                <span>{activeRole.count} Employees</span>
              </div>
              <div className="stat-box warning">
                <Target size={18} />
                <span>72% Avg Match</span>
              </div>
            </div>
          </div>

          <div className="radar-chart-placeholder">
            {/* Mocking a Radar Chart visual with CSS for now */}
            <div className="chart-center">
              <TrendingUp size={48} className="chart-icon" />
              <p>Competency Radar</p>
            </div>
            <svg className="mock-radar" viewBox="0 0 100 100">
              <polygon points="50,10 90,40 75,90 25,90 10,40" className="radar-bg" />
              <polygon points="50,25 75,45 65,75 35,75 25,45" className="radar-value" />
            </svg>
          </div>

          <div className="skills-breakdown">
            <h3>Required Competencies</h3>
            <div className="skills-list">
              {SKILL_BENCHMARKS.map((skill, index) => (
                <div key={index} className="skill-benchmark-item">
                  <div className="skill-benchmark-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-score">Req: {skill.required} | Avg: {skill.current}</span>
                  </div>
                  <div className="progress-track">
                    <motion.div 
                      className={`progress-fill ${skill.current >= skill.required ? 'good' : 'gap'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.current / 5) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <div 
                      className="requirement-marker" 
                      style={{ left: `${(skill.required / 5) * 100}%` }}
                      title={`Required: ${skill.required}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default RoleBenchmarking;
