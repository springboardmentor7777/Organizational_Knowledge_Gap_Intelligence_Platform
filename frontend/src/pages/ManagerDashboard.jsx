import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, TrendingDown, Activity, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './ManagerDashboard.css';

const gapTrendData = [
  { name: 'Jan', score: 85 },
  { name: 'Feb', score: 78 },
  { name: 'Mar', score: 82 },
  { name: 'Apr', score: 70 },
  { name: 'May', score: 65 },
  { name: 'Jun', score: 55 },
];

const teamGaps = [
  { id: 1, name: 'Alice Chen', role: 'Frontend Dev', gap: 'High', area: 'GraphQL' },
  { id: 2, name: 'Bob Smith', role: 'Backend Dev', gap: 'Medium', area: 'System Design' },
  { id: 3, name: 'Charlie Davis', role: 'Full Stack', gap: 'Low', area: 'AWS' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ManagerDashboard = () => {
  return (
    <div className="manager-dashboard-container">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="dashboard-title">Team Overview Dashboard</h1>
          <p className="dashboard-subtitle">Monitor your team's skill progression and critical knowledge gaps.</p>
        </div>
        <Button variant="primary">Generate Report</Button>
      </motion.div>

      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="stat-card">
            <div className="stat-icon-wrapper blue">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>Team Size</h3>
              <p className="stat-value">12 Members</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="stat-card">
            <div className="stat-icon-wrapper green">
              <Activity size={24} />
            </div>
            <div className="stat-content">
              <h3>Avg Gap Score</h3>
              <p className="stat-value">72 / 100</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="stat-card">
            <div className="stat-icon-wrapper red">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-content">
              <h3>Critical Gaps</h3>
              <p className="stat-value">3 Identified</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="main-content-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="chart-section">
          <Card className="glass-card">
            <h2 className="section-title">Team Gap Trend</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={gapTrendData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#a0a0a5" />
                  <YAxis stroke="#a0a0a5" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="alerts-section">
          <Card className="glass-card">
            <h2 className="section-title">Risk Alerts</h2>
            <div className="alerts-list">
              <div className="alert-item red-alert">
                <AlertTriangle size={20} />
                <div>
                  <h4>Project Alpha Risk</h4>
                  <p>Missing senior cloud architecture skills.</p>
                </div>
              </div>
              <div className="alert-item yellow-alert">
                <TrendingDown size={20} />
                <div>
                  <h4>Retention Warning</h4>
                  <p>Training budget underutilized this quarter.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="table-section">
          <Card className="glass-card">
            <h2 className="section-title">Team Gap Heatmap</h2>
            <div className="table-container">
              <table className="heatmap-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Role</th>
                    <th>Knowledge Area</th>
                    <th>Gap Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamGaps.map(gap => (
                    <tr key={gap.id}>
                      <td>{gap.name}</td>
                      <td>{gap.role}</td>
                      <td>{gap.area}</td>
                      <td>
                        <span className={`badge badge-${gap.gap.toLowerCase()}`}>
                          {gap.gap}
                        </span>
                      </td>
                      <td>
                        <button className="icon-btn"><ChevronRight size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;
