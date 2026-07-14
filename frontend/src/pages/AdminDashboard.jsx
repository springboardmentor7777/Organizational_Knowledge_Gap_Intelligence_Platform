import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Cpu, Activity, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './AdminDashboard.css';

const performanceData = [
  { time: '00:00', cpu: 45, memory: 60 },
  { time: '04:00', cpu: 30, memory: 55 },
  { time: '08:00', cpu: 85, memory: 75 },
  { time: '12:00', cpu: 92, memory: 82 },
  { time: '16:00', cpu: 78, memory: 80 },
  { time: '20:00', cpu: 55, memory: 65 },
];

const integrations = [
  { name: 'Workday HRIS', status: 'connected', latency: '45ms', lastSync: '2 mins ago' },
  { name: 'SAP SuccessFactors', status: 'connected', latency: '120ms', lastSync: '5 mins ago' },
  { name: 'Active Directory', status: 'error', latency: '-', lastSync: '1 hour ago' },
  { name: 'Slack Bot', status: 'connected', latency: '22ms', lastSync: 'Just now' },
];

const auditLogs = [
  { id: 'AL-9921', user: 'admin@okgip.com', action: 'API Key Rotated', target: 'Workday HRIS', time: '10:42 AM' },
  { id: 'AL-9920', user: 'system', action: 'DB Backup Completed', target: 'Primary DB Cluster', time: '02:00 AM' },
  { id: 'AL-9919', user: 'hr_lead@okgip.com', action: 'Role Permissions Modified', target: 'Manager Group', time: 'Yesterday' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <motion.div 
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="admin-title">Platform Administration</h1>
          <p className="admin-subtitle">System health, integrations, and security monitoring.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary">View Logs</Button>
          <Button variant="primary">System Settings</Button>
        </div>
      </motion.div>

      <motion.div 
        className="admin-stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="admin-stat-card">
            <div className="stat-header">
              <Server size={20} className="text-blue" />
              <span className="status-indicator online"></span>
            </div>
            <h3>API Uptime</h3>
            <p className="stat-val">99.99%</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="admin-stat-card">
            <div className="stat-header">
              <Cpu size={20} className="text-purple" />
              <span className="status-indicator warning"></span>
            </div>
            <h3>Compute Load</h3>
            <p className="stat-val">78%</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="admin-stat-card">
            <div className="stat-header">
              <Shield size={20} className="text-green" />
              <span className="status-indicator online"></span>
            </div>
            <h3>Security Score</h3>
            <p className="stat-val">A+</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="admin-stat-card">
            <div className="stat-header">
              <Activity size={20} className="text-orange" />
              <span className="status-indicator online"></span>
            </div>
            <h3>Active Sessions</h3>
            <p className="stat-val">3,492</p>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="admin-main-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="system-health-section">
          <Card className="admin-glass-card">
            <h2 className="admin-section-title">System Performance (24h)</h2>
            <div className="admin-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="memory" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="integrations-section">
          <Card className="admin-glass-card">
            <h2 className="admin-section-title">Active Integrations</h2>
            <div className="integrations-list">
              {integrations.map((int, idx) => (
                <div key={idx} className="integration-item">
                  <div className="int-info">
                    {int.status === 'connected' ? (
                      <CheckCircle size={20} className="text-green" />
                    ) : (
                      <XCircle size={20} className="text-red" />
                    )}
                    <div>
                      <h4>{int.name}</h4>
                      <p>Last sync: {int.lastSync}</p>
                    </div>
                  </div>
                  <div className="int-meta">
                    <span className="latency">{int.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="audit-logs-section">
          <Card className="admin-glass-card">
            <h2 className="admin-section-title">Recent Audit Logs</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>User / Service</th>
                    <th>Action</th>
                    <th>Target</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td><span className="log-id">{log.id}</span></td>
                      <td>{log.user}</td>
                      <td>{log.action}</td>
                      <td>{log.target}</td>
                      <td>{log.time}</td>
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

export default AdminDashboard;
