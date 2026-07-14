import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'gap_alert', title: 'New Skill Gap Detected', message: 'Python Advanced has been flagged as a critical gap for your role', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5), severity: 'high' },
  { id: '2', type: 'training', title: 'Course Enrolled Successfully', message: 'You have been enrolled in "React Advanced Patterns"', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30), severity: 'low' },
  { id: '3', type: 'mentorship', title: 'Mentorship Match Found', message: 'Sarah Chen has been matched as your mentor for Cloud Architecture', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), severity: 'medium' },
  { id: '4', type: 'report', title: 'Monthly Report Ready', message: 'Your July skill gap analysis report is available for download', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), severity: 'low' },
  { id: '5', type: 'certificate', title: 'Certificate Expiring Soon', message: 'AWS Solutions Architect certification expires in 30 days', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), severity: 'medium' },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [unreadCount, setUnreadCount] = useState(
    MOCK_NOTIFICATIONS.filter(n => !n.read).length
  );

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotif = { ...notification, id: Date.now().toString(), createdAt: new Date(), read: false };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => {
      const notif = prev.find(n => n.id === id);
      if (notif && !notif.read) setUnreadCount(c => Math.max(0, c - 1));
      return prev.filter(n => n.id !== id);
    });
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount, markAsRead, markAllAsRead, addNotification, removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider');
  return ctx;
};

export default NotificationContext;
