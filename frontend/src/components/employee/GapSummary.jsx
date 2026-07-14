import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './GapSummary.css';

// Mock data for the gap chart
const gapData = [
  { name: 'Cloud', gap: 45, color: 'var(--color-brand-cyan, #06b6d4)' },
  { name: 'AI/ML', gap: 70, color: 'var(--color-brand-purple, #a855f7)' },
  { name: 'DevOps', gap: 25, color: 'var(--color-brand-emerald, #10b981)' },
  { name: 'Security', gap: 60, color: '#f59e0b' },
  { name: 'Data', gap: 35, color: '#ec4899' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip glass-panel-tooltip">
        <p className="tooltip-label">{`${payload[0].payload.name} Gap`}</p>
        <p className="tooltip-value" style={{ color: payload[0].payload.color }}>
          {`${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const GapSummary = () => {
  return (
    <div className="gap-summary-container glass-panel">
      <div className="gs-header">
        <h2 className="gs-title">Skills Gap Analysis</h2>
        <p className="gs-subtitle">Overview of areas requiring attention</p>
      </div>

      <div className="gs-metrics-grid">
        <motion.div 
          className="metric-card glass-panel-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="metric-icon-wrapper score-wrapper">
            <Target size={24} className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Overall Gap Score</p>
            <h3 className="metric-value">42<span className="metric-unit">/100</span></h3>
          </div>
        </motion.div>

        <motion.div 
          className="metric-card glass-panel-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="metric-icon-wrapper critical-wrapper">
            <AlertTriangle size={24} className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Critical Gaps</p>
            <h3 className="metric-value">2</h3>
          </div>
        </motion.div>

        <motion.div 
          className="metric-card glass-panel-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="metric-icon-wrapper improve-wrapper">
            <TrendingUp size={24} className="metric-icon" />
          </div>
          <div className="metric-content">
            <p className="metric-label">Skills to Improve</p>
            <h3 className="metric-value">5</h3>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="gs-chart-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3 className="chart-title">Gap by Category</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={gapData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
              <Bar dataKey="gap" radius={[0, 4, 4, 0]} barSize={20}>
                {gapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      <motion.div 
        className="gs-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button className="action-button primary">
          View Detailed Report
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </div>
  );
};

export default GapSummary;
