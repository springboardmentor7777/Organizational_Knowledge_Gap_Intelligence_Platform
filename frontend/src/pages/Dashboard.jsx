import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    // Role-based routing
    const timer = setTimeout(() => {
      switch (user.role?.toUpperCase()) {
        case 'ADMIN':
          navigate('/admin-dashboard');
          break;
        case 'HR':
          navigate('/hr-dashboard');
          break;
        case 'MANAGER':
          navigate('/manager-dashboard');
          break;
        case 'EMPLOYEE':
        default:
          navigate('/employee-dashboard');
          break;
      }
    }, 1500); // Artificial delay to show the beautiful loader

    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  return (
    <div className="dashboard-routing-container">
      <motion.div 
        className="loader-wrapper glass-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="spinner-rings">
          <div className="ring ring1"></div>
          <div className="ring ring2"></div>
          <div className="ring ring3"></div>
        </div>
        
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyzing Profile...
        </motion.h2>
        <p>Routing to your personalized intelligence center.</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
