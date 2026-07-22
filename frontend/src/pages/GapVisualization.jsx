import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Target, AlertTriangle, TrendingUp, Filter, Sparkles, Zap } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useGapContext } from '../context/GapContext';
import Button from '../components/common/Button';
import './GapVisualization.css';

const radarDatasets = {
  'individualVsRole': [
    { subject: 'React 19', current: 50, required: 90 },
    { subject: 'Cloud / AWS', current: 30, required: 90 },
    { subject: 'Agile Coaching', current: 70, required: 80 },
    { subject: 'System Architecture', current: 55, required: 85 },
    { subject: 'UI/UX Tokens', current: 90, required: 75 },
    { subject: 'LLMOps & AI', current: 25, required: 85 },
  ],
  'teamVsProject': [
    { subject: 'React 19', current: 60, required: 80 },
    { subject: 'Cloud / AWS', current: 40, required: 95 },
    { subject: 'Agile Coaching', current: 80, required: 80 },
    { subject: 'System Architecture', current: 65, required: 75 },
    { subject: 'UI/UX Tokens', current: 85, required: 70 },
    { subject: 'LLMOps & AI', current: 35, required: 90 },
  ],
  'currentVsFuture': [
    { subject: 'React 19', current: 50, required: 95 },
    { subject: 'Cloud / AWS', current: 30, required: 95 },
    { subject: 'Agile Coaching', current: 70, required: 85 },
    { subject: 'System Architecture', current: 55, required: 90 },
    { subject: 'UI/UX Tokens', current: 90, required: 85 },
    { subject: 'LLMOps & AI', current: 25, required: 100 },
  ]
};

const historicalTrendData = [
  { month: 'May', gapIndex: 65, velocity: 12 },
  { month: 'Jun', gapIndex: 58, velocity: 18 },
  { month: 'Jul', gapIndex: 48, velocity: 26 },
  { month: 'Aug', gapIndex: 38, velocity: 34 },
  { month: 'Sep (Forecast)', gapIndex: 25, velocity: 45 },
  { month: 'Oct (Forecast)', gapIndex: 12, velocity: 58 },
];

const GapVisualization = () => {
  const { generateAiPath } = useGapContext();
  const [selectedDimension, setSelectedDimension] = useState('individualVsRole');

  const currentRadar = radarDatasets[selectedDimension] || radarDatasets['individualVsRole'];

  return (
    <div className="gap-viz-container">
      <div className="viz-header">
        <div>
          <h1>Multi-Dimensional Skill Gap Intelligence</h1>
          <p>Interactive radar charts & historical progression forecasting across workforce benchmarks</p>
        </div>

        <div className="viz-dimension-selector">
          <button 
            className={`dim-btn ${selectedDimension === 'individualVsRole' ? 'active' : ''}`}
            onClick={() => setSelectedDimension('individualVsRole')}
          >
            Individual vs Role
          </button>
          <button 
            className={`dim-btn ${selectedDimension === 'teamVsProject' ? 'active' : ''}`}
            onClick={() => setSelectedDimension('teamVsProject')}
          >
            Team vs Project
          </button>
          <button 
            className={`dim-btn ${selectedDimension === 'currentVsFuture' ? 'active' : ''}`}
            onClick={() => setSelectedDimension('currentVsFuture')}
          >
            Current vs Future AI Skills
          </button>
        </div>
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
            <h3>Competency Radar Benchmark</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={currentRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Current Capability" dataKey="current" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.45} />
                <Radar name="Target Requirement" dataKey="required" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="side-panels">
          <motion.div 
            className="viz-card glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="card-header">
              <AlertTriangle className="card-icon text-warning" />
              <h3>Critical Skill Deficits</h3>
            </div>
            <ul className="gap-list">
              <li>
                <div className="gap-item-header">
                  <span className="gap-name">LLMOps & RAG Vector Systems</span>
                  <span className="gap-badge critical">65 pt gap</span>
                </div>
                <div className="gap-bar-container">
                  <div className="gap-bar-fill critical" style={{ width: '25%' }}></div>
                  <div className="gap-bar-target" style={{ left: '90%' }}></div>
                </div>
              </li>
              <li>
                <div className="gap-item-header">
                  <span className="gap-name">AWS Cloud Infrastructure</span>
                  <span className="gap-badge warning">60 pt gap</span>
                </div>
                <div className="gap-bar-container">
                  <div className="gap-bar-fill warning" style={{ width: '30%' }}></div>
                  <div className="gap-bar-target" style={{ left: '90%' }}></div>
                </div>
              </li>
              <li>
                <div className="gap-item-header">
                  <span className="gap-name">Advanced React 19 Compiler</span>
                  <span className="gap-badge warning">40 pt gap</span>
                </div>
                <div className="gap-bar-container">
                  <div className="gap-bar-fill" style={{ width: '50%' }}></div>
                  <div className="gap-bar-target" style={{ left: '90%' }}></div>
                </div>
              </li>
            </ul>

            <button 
              className="ai-remediate-btn"
              onClick={() => generateAiPath('Senior Tech Lead', 'LLMOps & RAG Systems')}
            >
              <Zap size={15} /> Generate Remediation Plan
            </button>
          </motion.div>

          <motion.div 
            className="viz-card glass-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="card-header">
              <TrendingUp className="card-icon text-success" />
              <h3>Gap Progression & Forecasting</h3>
            </div>
            <div className="chart-container small-chart">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={historicalTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px' }} />
                  <Bar dataKey="gapIndex" fill="rgba(249, 115, 22, 0.75)" radius={[4, 4, 0, 0]} name="Skill Gap Index" />
                  <Bar dataKey="velocity" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Learning Velocity" />
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
