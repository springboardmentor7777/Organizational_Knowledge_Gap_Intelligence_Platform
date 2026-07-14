import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, UserPlus, MoreVertical, Shield, X, Mail } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './UserManagement.css';

const USERS_DATA = [
  { id: 1, name: 'Alice Freeman', email: 'alice.f@company.com', role: 'Employee', dept: 'Engineering', lastLogin: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob.s@company.com', role: 'Manager', dept: 'Product', lastLogin: '1 day ago', status: 'Active' },
  { id: 3, name: 'Charlie Davis', email: 'charlie.d@company.com', role: 'System Admin', dept: 'IT', lastLogin: 'Just now', status: 'Active' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@company.com', role: 'Employee', dept: 'Design', lastLogin: '5 days ago', status: 'Inactive' },
  { id: 5, name: 'Evan Wright', email: 'evan.w@company.com', role: 'Employee', dept: 'Engineering', lastLogin: '3 hours ago', status: 'Active' },
];

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      className="user-management-container page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage employee accounts, roles, and access permissions</p>
        </div>
        <Button className="glass-btn primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> Add User
        </Button>
      </header>

      <Card className="glass-card full-width">
        <div className="table-controls">
          <div className="search-bar inline">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
            />
          </div>
          <Button className="glass-btn secondary"><Filter size={18} /> Filter</Button>
        </div>

        <div className="table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS_DATA.map(user => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <td>
                    <div className="user-cell">
                      <div className="avatar">{user.name.charAt(0)}</div>
                      <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-badge">
                      {user.role === 'System Admin' && <Shield size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td>{user.dept}</td>
                  <td>
                    <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                    {user.status}
                  </td>
                  <td><span className="text-muted">{user.lastLogin}</span></td>
                  <td>
                    <button className="icon-btn"><MoreVertical size={18} /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal Stub */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="glass-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header">
                <h3>Add New User</h3>
                <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="glass-input modal-input" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={16} />
                    <input type="email" className="glass-input modal-input" placeholder="user@company.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select className="glass-select">
                      <option>Employee</option>
                      <option>Manager</option>
                      <option>System Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select className="glass-select">
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Product</option>
                      <option>HR</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="glass-btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="glass-btn primary" onClick={() => setIsModalOpen(false)}>Create User</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagement;
