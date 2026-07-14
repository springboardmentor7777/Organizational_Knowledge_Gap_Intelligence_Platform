/* ============================================================
   NOTIFICATION BELL COMPONENT
   ============================================================ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck, AlertTriangle, BookOpen, Users, FileText, Award } from 'lucide-react';
import { useNotificationContext } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import './NotificationBell.css';

const TYPE_ICONS = {
  gap_alert: AlertTriangle,
  training: BookOpen,
  mentorship: Users,
  report: FileText,
  certificate: Award,
};

const TYPE_COLORS = {
  gap_alert: '#f43f5e',
  training: '#06b6d4',
  mentorship: '#7c3aed',
  report: '#10b981',
  certificate: '#f59e0b',
};

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationContext();
  const [open, setOpen] = useState(false);

  const recentNotifs = notifications.slice(0, 8);

  return (
    <div className="notif-bell-root">
      <motion.button
        className="notif-bell-btn"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <motion.span
            className="notif-bell-count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={unreadCount}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="notif-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="notif-panel"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className="notif-panel-header">
                <h3 className="notif-panel-title">Notifications</h3>
                <div className="notif-panel-actions">
                  {unreadCount > 0 && (
                    <button className="notif-mark-all" onClick={markAllAsRead}>
                      <CheckCheck size={14} /> Mark all read
                    </button>
                  )}
                  <button className="notif-close" onClick={() => setOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="notif-panel-list">
                {recentNotifs.length === 0 ? (
                  <div className="notif-empty">
                    <Bell size={32} />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  recentNotifs.map((notif, i) => {
                    const Icon = TYPE_ICONS[notif.type] || Bell;
                    const color = TYPE_COLORS[notif.type] || '#7c3aed';
                    return (
                      <motion.div
                        key={notif.id}
                        className={`notif-item ${!notif.read ? 'unread' : ''}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="notif-item-icon" style={{ background: `${color}20`, color }}>
                          <Icon size={16} />
                        </div>
                        <div className="notif-item-content">
                          <p className="notif-item-title">{notif.title}</p>
                          <p className="notif-item-msg">{notif.message}</p>
                          <span className="notif-item-time">
                            {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        {!notif.read && <div className="notif-item-dot" />}
                      </motion.div>
                    );
                  })
                )}
              </div>

              <Link to="/notifications" className="notif-view-all" onClick={() => setOpen(false)}>
                View all notifications
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
