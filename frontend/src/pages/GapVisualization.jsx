import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Card from '../components/common/Card';
import './GapVisualization.css';

const radarData = [
  { subject: 'React', current: 75, required: 90, fullMark: 100 },
  { subject: 'Node.js', current: 60, required: 80, fullMark: 100 },
  { subject: 'AWS', current: 40, required: 70, fullMark: 100 },
  { subject: 'System Design', current: 65, required: 85, fullMark: 100 },
  { subject: 'UI/UX', current: 95, required: 70, fullMark: 100 },
  { subject: 'DevOps', current: 50, required: 65, fullMark: 100 },
];

const barData = [
  { name: 'Jan', gap: 40, improvement: 10 },
  { name: 'Feb', gap: 30, improvement: 15 },
  { name: 'Mar', gap: 15, improvement: 25 },
  { name: 'Apr', gap: 5, improvement: 35 },
];

const GapVisualization = () => {
  return (
    <div className="gap-viz-container">
      <div className="viz-header">
        <h1>Skill Gap Intelligence</h1>
        <p>Interactive visualization of your current capabilities versus role requirements</p>
      </div>

      <div className="viz-grid">
        <motion.div 
          className="viz-card radar-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-header">
            <BrainCircuit className="card-icon text-cyan" />
            <h3>Competency Radar</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0aec0', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Current Skill" dataKey="current" stroke="#4facfe" fill="#4facfe" fillOpacity={0.5} />
                <Radar name="Required Role Skill" dataKey="required" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.2} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(20,20,40,0.9)', border: '1px solid #333', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="side-panels">
          <motion.div 
            className="viz-card glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-header">
              <AlertTriangle className="card-icon text-warning" />
              <h3>Critical Gaps Identified</h3>
            </div>
            <ul className="gap-list">
              <li>
                <div className="gap-item-header">
                  <span className="gap-name">AWS Cloud Infrastructure</span>
                  <span className="gap-badge warning">30 pt gap</span>
                </div>
                <div className="gap-bar-container">
                  <div className="gap-bar-fill" style={{ width: '40%' }}></div>
                  <div className="gap-bar-target" style={{ left: '70%' }}></div>
                </div>
              </li>
              <li>
                <div className="gap-item-header">
                  <span className="gap-name">Node.js Microservices</span>
                  <span className="gap-badge warning">20 pt gap</span>
                </div>
                <div className="gap-bar-container">
                  <div className="gap-bar-fill" style={{ width: '60%' }}></div>
                  <div className="gap-bar-target" style={{ left: '80%' }}></div>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className="viz-card glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card-header">
              <TrendingUp className="card-icon text-success" />
              <h3>Gap Reduction Trend</h3>
            </div>
            <div className="chart-container small-chart">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} tickLine={false} />
                  <YAxis stroke="#a0aec0" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(20,20,40,0.9)', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="gap" fill="rgba(251, 191, 36, 0.6)" radius={[4, 4, 0, 0]} name="Skill Gap" />
                  <Bar dataKey="improvement" fill="#4facfe" radius={[4, 4, 0, 0]} name="Improvement" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GapVisualization;
