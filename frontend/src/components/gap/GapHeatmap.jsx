import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Filter, Info, X, Zap, Users, ShieldAlert } from 'lucide-react';
import { useGapContext } from '../../context/GapContext';
import Button from '../common/Button';
import './GapHeatmap.css';

const departmentsList = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Data Science'];
const skillsList = ['React 19', 'Cloud Architecture', 'UI/UX Tokens', 'SEO Analytics', 'Sales Negotiation', 'Agile Leadership', 'LLMOps & AI'];

// Extended Matrix: Severity score (0-4), impacted employees, required level, current level
const HEATMAP_MATRIX = {
  'Engineering': [
    { severity: 3, current: 2, required: 5, affected: 14, desc: 'High React gap in senior team.' },
    { severity: 4, current: 1, required: 5, affected: 22, desc: 'Critical AWS Cloud deficit for production scaling.' },
    { severity: 1, current: 3, required: 4, affected: 5, desc: 'Minor UI/UX gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 2, current: 3, required: 5, affected: 9, desc: 'Intermediate Agile coaching needed.' },
    { severity: 3, current: 2, required: 5, affected: 16, desc: 'High AI/LLM deployment gap.' }
  ],
  'Product': [
    { severity: 1, current: 3, required: 4, affected: 4, desc: 'Basic React understanding needed.' },
    { severity: 2, current: 2, required: 4, affected: 8, desc: 'Medium Cloud Architecture overview needed.' },
    { severity: 3, current: 2, required: 5, affected: 12, desc: 'High UX wireframing gap for PMs.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 1, current: 4, required: 5, affected: 6, desc: 'Minor Agile alignment gap.' },
    { severity: 3, current: 1, required: 4, affected: 15, desc: 'High AI Product Strategy gap.' }
  ],
  'Design': [
    { severity: 2, current: 2, required: 4, affected: 7, desc: 'Medium CSS/React integration gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 4, current: 1, required: 5, affected: 18, desc: 'Critical Design Tokens & Systems gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 1, current: 3, required: 4, affected: 4, desc: 'Minor GenAI Design Tools gap.' }
  ],
  'Marketing': [
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 1, current: 3, required: 4, affected: 5, desc: 'Minor Design layout gap.' },
    { severity: 3, current: 2, required: 5, affected: 11, desc: 'High Technical SEO & Analytics gap.' },
    { severity: 2, current: 3, required: 5, affected: 8, desc: 'Medium B2B Sales collateral gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 3, current: 1, required: 4, affected: 14, desc: 'High Marketing Automation AI gap.' }
  ],
  'Sales': [
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 1, current: 3, required: 4, affected: 4, desc: 'Basic Cloud terminology gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 4, current: 1, required: 5, affected: 25, desc: 'Critical Enterprise Closing & Contract Negotiation gap.' },
    { severity: 2, current: 3, required: 5, affected: 10, desc: 'Medium Sales Lead Coaching gap.' },
    { severity: 1, current: 3, required: 4, affected: 6, desc: 'Minor AI CRM automation gap.' }
  ],
  'Data Science': [
    { severity: 2, current: 2, required: 4, affected: 9, desc: 'Medium React dashboard integration gap.' },
    { severity: 3, current: 2, required: 5, affected: 15, desc: 'High Cloud Data Pipeline gap.' },
    { severity: 1, current: 3, required: 4, affected: 5, desc: 'Minor Data Viz UI gap.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 0, current: 4, required: 4, affected: 0, desc: 'On track.' },
    { severity: 1, current: 3, required: 4, affected: 4, desc: 'Minor Team Collaboration gap.' },
    { severity: 4, current: 1, required: 5, affected: 28, desc: 'Critical LLMOps, RAG & Vector Search gap.' }
  ]
};

const getSeverityClass = (val) => {
  if (val >= 4) return 'severity-critical';
  if (val === 3) return 'severity-high';
  if (val === 2) return 'severity-medium';
  if (val === 1) return 'severity-low';
  return 'severity-none';
};

const getSeverityLabel = (val) => {
  if (val >= 4) return 'Critical Risk';
  if (val === 3) return 'High Gap';
  if (val === 2) return 'Medium Gap';
  if (val === 1) return 'Low Gap';
  return 'No Gap';
};

const GapHeatmap = () => {
  const { generateAiPath } = useGapContext();
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeCellModal, setActiveCellModal] = useState(null);

  const activeDepartments = selectedDept === 'All' 
    ? Object.keys(HEATMAP_MATRIX) 
    : Object.keys(HEATMAP_MATRIX).filter(d => d === selectedDept);

  const handleCellClick = (dept, skill, data) => {
    if (data.severity === 0) return;
    setActiveCellModal({ dept, skill, data });
  };

  return (
    <div className="gap-heatmap-container">
      <div className="heatmap-header">
        <h2 className="heatmap-title">
          <LayoutGrid className="icon-gradient" size={24} />
          Cross-Department Skill Gap Heatmap
        </h2>

        <div className="heatmap-controls">
          <div className="filter-select-wrapper">
            <Filter size={15} className="select-icon" />
            <select 
              value={selectedDept} 
              onChange={(e) => setSelectedDept(e.target.value)}
              className="dept-select-input"
            >
              {departmentsList.map(d => (
                <option key={d} value={d}>Dept: {d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="heatmap-grid" style={{ gridTemplateColumns: `auto repeat(${skillsList.length}, 1fr)` }}>
        {/* Header Row */}
        <div className="heatmap-row">
          <div className="heatmap-cell header-cell">Department</div>
          {skillsList.map((skill, i) => (
            <div key={`header-${i}`} className="heatmap-cell col-header">
              {skill}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <motion.div 
          className="heatmap-row-wrapper" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
          style={{ display: 'contents' }}
        >
          {activeDepartments.map((dept) => {
            const rowData = HEATMAP_MATRIX[dept] || [];
            return (
              <div key={`row-${dept}`} className="heatmap-row">
                <div className="heatmap-cell header-cell">{dept}</div>
                {rowData.map((item, colIndex) => (
                  <motion.div
                    key={`cell-${dept}-${colIndex}`}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className={`heatmap-cell data-cell ${getSeverityClass(item.severity)}`}
                    onClick={() => handleCellClick(dept, skillsList[colIndex], item)}
                  >
                    {item.severity > 0 && (
                      <span className="cell-value-badge">{item.severity}</span>
                    )}
                    <div className="heatmap-tooltip">
                      <strong>{dept} • {skillsList[colIndex]}</strong>
                      <div>{getSeverityLabel(item.severity)} ({item.affected} employees)</div>
                      <div className="tooltip-sub">Click for details & AI intervention</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="heatmap-legend">
        <div className="legend-item"><div className="legend-color severity-none"></div> No Gap (Lvl 4+)</div>
        <div className="legend-item"><div className="legend-color severity-low"></div> Low (Minor)</div>
        <div className="legend-item"><div className="legend-color severity-medium"></div> Medium</div>
        <div className="legend-item"><div className="legend-color severity-high"></div> High Risk</div>
        <div className="legend-item"><div className="legend-color severity-critical"></div> Critical Risk</div>
      </div>

      {/* Detail Drilldown Modal */}
      <AnimatePresence>
        {activeCellModal && (
          <div className="modal-backdrop" onClick={() => setActiveCellModal(null)}>
            <motion.div 
              className="gap-modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-box">
                  <ShieldAlert className="text-warning" size={22} />
                  <div>
                    <h3>{activeCellModal.dept} — {activeCellModal.skill}</h3>
                    <p className="modal-subtitle">Detailed Skill Gap Assessment</p>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setActiveCellModal(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-label">Gap Severity</span>
                    <span className={`severity-tag severity-${activeCellModal.data.severity}`}>
                      {getSeverityLabel(activeCellModal.data.severity)}
                    </span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">Current / Target</span>
                    <span className="metric-val">{activeCellModal.data.current} / {activeCellModal.data.required} (Lvl)</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">Impacted Team</span>
                    <span className="metric-val"><Users size={14}/> {activeCellModal.data.affected} Employees</span>
                  </div>
                </div>

                <div className="modal-desc-box">
                  <strong>Assessment Analysis:</strong>
                  <p>{activeCellModal.data.desc}</p>
                </div>

                <div className="modal-actions">
                  <Button 
                    className="primary-glow-btn w-full"
                    onClick={() => {
                      generateAiPath(`${activeCellModal.dept} Lead`, activeCellModal.skill);
                      setActiveCellModal(null);
                    }}
                  >
                    <Zap size={16} /> Generate AI Learning Intervention
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GapHeatmap;
