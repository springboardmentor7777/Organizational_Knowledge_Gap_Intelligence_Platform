import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertCircle, BookOpen, UserCheck, Settings, Check, X } from 'lucide-react';
import './Notifications.css';

const initialNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Skill Gap Detected',
    message: 'Your recent project requires advanced Kubernetes knowledge which is currently marked as a gap.',
    time: '2 hours ago',
    read: false,
    icon: <AlertCircle className="text-warning" />
  },
  {
    id: 2,
    type: 'recommendation',
    title: 'New Course Recommended',
    message: 'Based on your learning path, we recommend "Advanced Kubernetes Architecture".',
    time: '3 hours ago',
    read: false,
    icon: <BookOpen className="text-cyan" />
  },
  {
    id: 3,
    type: 'mentorship',
    title: 'Mentorship Accepted',
    message: 'Dr. Elena Rodriguez has accepted your mentorship request.',
    time: '1 day ago',
    read: true,
    icon: <UserCheck className="text-success" />
  },
  {
    id: 4,
    type: 'system',
    title: 'System Update',
    message: 'The AI engine has been updated. Your skill profile might reflect new automated inferences.',
    time: '2 days ago',
    read: true,
    icon: <Settings className="text-muted" />
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-title">
          <h1>Notifications</h1>
          {unreadCount > 0 && <span className="unread-badge">{unreadCount} New</span>}
        </div>
        <button className="mark-all-btn" onClick={markAllAsRead}>
          <Check size={16} /> Mark all as read
        </button>
      </div>

      <div className="notifications-list">
        <AnimatePresence>
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`notification-card glass-panel ${notif.read ? 'read' : 'unread'}`}
            >
              <div className="notif-icon-wrapper">
                {notif.icon}
              </div>
              <div className="notif-content">
                <div className="notif-header">
                  <h3>{notif.title}</h3>
                  <span className="notif-time">{notif.time}</span>
                </div>
                <p>{notif.message}</p>
              </div>
              <div className="notif-actions">
                {!notif.read && (
                  <button className="action-icon check" onClick={() => markAsRead(notif.id)} title="Mark as read">
                    <Check size={18} />
                  </button>
                )}
                <button className="action-icon remove" onClick={() => removeNotification(notif.id)} title="Dismiss">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {notifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="empty-state"
          >
            <Bell size={48} className="text-muted" />
            <p>You're all caught up!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
