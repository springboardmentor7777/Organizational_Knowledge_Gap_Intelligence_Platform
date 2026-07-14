import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, BarChart2, Download } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './HRDashboard.css';

const radarData = [
  { subject: 'Leadership', A: 120, B: 110, fullMark: 150 },
  { subject: 'Technical', A: 98, B: 130, fullMark: 150 },
  { subject: 'Communication', A: 86, B: 130, fullMark: 150 },
  { subject: 'Problem Solving', A: 99, B: 100, fullMark: 150 },
  { subject: 'Agile', A: 85, B: 90, fullMark: 150 },
  { subject: 'Domain Knowledge', A: 65, B: 85, fullMark: 150 },
];

const deptData = [
  { name: 'Engineering', gap: 65, target: 85 },
  { name: 'Sales', gap: 40, target: 75 },
  { name: 'Marketing', gap: 55, target: 80 },
  { name: 'Support', gap: 30, target: 70 },
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

const HRDashboard = () => {
  return (
    <div className="hr-dashboard-container">
      <motion.div 
        className="hr-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="hr-title">Organizational Intelligence Hub</h1>
          <p className="hr-subtitle">Strategic overview of enterprise-wide skills and knowledge health.</p>
        </div>
        <Button variant="secondary" className="export-btn">
          <Download size={18} /> Export Data
        </Button>
      </motion.div>

      <motion.div 
        className="hr-stats-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="hr-stat-card">
            <div className="hr-stat-icon purple">
              <Users size={24} />
            </div>
            <div>
              <h3>Total Employees</h3>
              <p className="hr-stat-val">1,248</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hr-stat-card">
            <div className="hr-stat-icon teal">
              <BarChart2 size={24} />
            </div>
            <div>
              <h3>Avg Org Gap Score</h3>
              <p className="hr-stat-val">68.5</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="hr-stat-card">
            <div className="hr-stat-icon orange">
              <Briefcase size={24} />
            </div>
            <div>
              <h3>Departments</h3>
              <p className="hr-stat-val">8 Active</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hr-charts-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="radar-section">
          <Card className="hr-glass-card">
            <h2 className="hr-section-title">Organization-Wide Skill Radar</h2>
            <div className="hr-chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0a5', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Current" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                  <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="bar-section">
          <Card className="hr-glass-card">
            <h2 className="hr-section-title">Department Gap Comparison</h2>
            <div className="hr-chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={deptData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#a0a0a5" />
                  <YAxis dataKey="name" type="category" stroke="#a0a0a5" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                  <Bar dataKey="gap" name="Current Score" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="target" name="Target Score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HRDashboard;
