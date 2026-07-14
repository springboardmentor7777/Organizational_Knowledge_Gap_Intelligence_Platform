import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart2, AlertCircle, Lightbulb, LayoutDashboard } from 'lucide-react';
import { GapHeatmap, GapAnalysisTable, GapSeverityIndicator, GapRecommendations } from '../components/gap';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './GapAnalysis.css';

const tabConfig = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'heatmap', label: 'Heatmap', icon: Activity },
  { id: 'table', label: 'Detailed Table', icon: BarChart2 },
  { id: 'severity', label: 'Severity', icon: AlertCircle },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
];

const GapAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'heatmap':
        return <GapHeatmap />;
      case 'table':
        return <GapAnalysisTable />;
      case 'severity':
        return <GapSeverityIndicator />;
      case 'recommendations':
        return <GapRecommendations />;
      case 'overview':
      default:
        return (
          <div className="gap-overview-grid">
            <div className="overview-card heatmap-card"><GapHeatmap /></div>
            <div className="overview-card severity-card"><GapSeverityIndicator /></div>
            <div className="overview-card table-card"><GapAnalysisTable /></div>
            <div className="overview-card recs-card"><GapRecommendations /></div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="page-container gap-analysis-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-gradient">Gap Analysis</span>
        </h1>
        <p className="page-subtitle">Identify and address skill gaps across the organization.</p>
      </header>

      <div className="tabs-container">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`glass-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div className="active-indicator" layoutId="activeTab" />
              )}
            </button>
          );
        })}
      </div>

      <motion.div 
        className="tab-content"
        key={activeTab}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
};

export default GapAnalysis;
