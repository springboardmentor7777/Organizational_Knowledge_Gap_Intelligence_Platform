import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, PieChart, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Reports.css';

const REPORT_TEMPLATES = [
  {
    id: 1,
    title: 'Compliance Tracking',
    description: 'Overview of mandatory training completion rates across all departments.',
    icon: ShieldCheck,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 2,
    title: 'Training ROI',
    description: 'Financial and performance analysis of recent learning initiatives.',
    icon: TrendingUp,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 3,
    title: 'Organizational Gap Trends',
    description: 'Historical data on skill gaps and resolution speed by role.',
    icon: BarChart3,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 4,
    title: 'Department Skill Distribution',
    description: 'High-level breakdown of competency levels per business unit.',
    icon: PieChart,
    color: 'from-orange-400 to-red-500'
  }
];

const Reports = () => {
  const handleGenerate = (title) => {
    // Stub for generation logic
    console.log(`Generating report: ${title}`);
  };

  return (
    <motion.div 
      className="reports-container page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate comprehensive insights into organizational learning</p>
        </div>
      </header>

      <div className="reports-grid">
        {REPORT_TEMPLATES.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="glass-card report-card">
              <div className="report-icon-wrapper">
                <div className={`report-icon-bg bg-gradient-to-br ${report.color}`} />
                <report.icon size={28} className="report-icon" />
              </div>
              <h3 className="report-title">{report.title}</h3>
              <p className="report-desc">{report.description}</p>
              
              <div className="report-actions">
                <Button 
                  className="glass-btn outline full-width"
                  onClick={() => handleGenerate(report.title)}
                >
                  <FileText size={16} /> Preview
                </Button>
                <Button 
                  className="glass-btn primary full-width"
                  onClick={() => handleGenerate(report.title)}
                >
                  <Download size={16} /> Export
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;
