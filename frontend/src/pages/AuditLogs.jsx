import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, ShieldAlert, UserPlus, FileEdit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import './AuditLogs.css';

const mockLogs = [
  { id: 'AL-1049', user: 'Admin User', action: 'User Created', target: 'jane.doe@company.com', date: '2026-07-13 14:30:22', ip: '192.168.1.105', status: 'Success' },
  { id: 'AL-1048', user: 'System', action: 'Role Updated', target: 'John Smith -> MANAGER', date: '2026-07-13 13:15:10', ip: '127.0.0.1', status: 'Success' },
  { id: 'AL-1047', user: 'Elena Rodriguez', action: 'Course Added', target: 'Advanced Kubernetes Architecture', date: '2026-07-13 11:05:45', ip: '192.168.1.201', status: 'Success' },
  { id: 'AL-1046', user: 'Admin User', action: 'Failed Login', target: 'admin@company.com', date: '2026-07-13 09:22:11', ip: '45.22.109.11', status: 'Failed' },
  { id: 'AL-1045', user: 'HR System', action: 'Bulk Import', target: '50 new employees', date: '2026-07-12 16:45:00', ip: '10.0.0.5', status: 'Success' }
];

const getActionIcon = (action) => {
  if (action.includes('Created') || action.includes('Added')) return <UserPlus size={16} className="text-success" />;
  if (action.includes('Updated') || action.includes('Import')) return <FileEdit size={16} className="text-cyan" />;
  if (action.includes('Deleted')) return <Trash2 size={16} className="text-warning" />;
  if (action.includes('Failed')) return <ShieldAlert size={16} className="text-danger" />;
  return <Filter size={16} />;
};

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="audit-container">
      <div className="audit-header">
        <div className="header-text">
          <h1>System Audit Logs</h1>
          <p>Security and compliance event tracking</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" className="action-btn">
            <Filter size={16} style={{marginRight: '8px'}} /> Filters
          </Button>
          <Button variant="primary" className="action-btn">
            <Download size={16} style={{marginRight: '8px'}} /> Export CSV
          </Button>
        </div>
      </div>

      <div className="audit-controls glass-panel">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by ID, User, Action, or Target..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="date-filters">
          <input type="date" className="date-input" />
          <span>to</span>
          <input type="date" className="date-input" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="table-container glass-panel"
      >
        <table className="audit-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Date & Time</th>
              <th>User / System</th>
              <th>Action</th>
              <th>Target</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log, idx) => (
              <motion.tr 
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="log-id">{log.id}</td>
                <td className="log-date">{log.date}</td>
                <td className="log-user">{log.user}</td>
                <td>
                  <div className="log-action">
                    {getActionIcon(log.action)}
                    <span>{log.action}</span>
                  </div>
                </td>
                <td className="log-target">{log.target}</td>
                <td>
                  <span className={`status-badge ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
                <td>
                  <button className="more-btn">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AuditLogs;
