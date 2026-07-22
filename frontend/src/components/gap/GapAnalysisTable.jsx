import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListFilter, Search, ChevronDown, ChevronUp, Code, Database, LineChart, Users, Sparkles, Target, Zap } from 'lucide-react';
import { useGapContext } from '../../context/GapContext';
import Button from '../common/Button';
import './GapAnalysisTable.css';

const DIMENSIONS = [
  { id: 'individualVsRole', label: 'Individual vs Role' },
  { id: 'teamVsProject', label: 'Team vs Project' },
  { id: 'deptVsOrg', label: 'Department vs Strategic Goals' },
  { id: 'currentVsFuture', label: 'Current vs Strategic Forecast' },
];

const getIconForCategory = (cat) => {
  switch(cat) {
    case 'Engineering': return <Code size={16} />;
    case 'Data Science': return <Database size={16} />;
    case 'Management': return <Users size={16} />;
    default: return <LineChart size={16} />;
  }
};

const getSeverity = (gap) => {
  if (gap >= 3) return { label: 'Critical Risk', class: 'badge-critical' };
  if (gap === 2) return { label: 'High Gap', class: 'badge-high' };
  if (gap === 1) return { label: 'Medium Gap', class: 'badge-medium' };
  return { label: 'On Track', class: 'badge-low' };
};

const GapAnalysisTable = () => {
  const { gapData, activeDimension, setActiveDimension, getDimensionValue, generateAiPath } = useGapContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'gap', direction: 'desc' });

  const processedData = gapData.map(item => {
    const { current, required } = getDimensionValue(item, activeDimension);
    const gap = Math.max(0, required - current);
    return {
      ...item,
      computedCurrent: current,
      computedRequired: required,
      gap: gap
    };
  });

  const filteredData = processedData.filter(item => 
    item.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown size={14} style={{ opacity: 0.3 }} />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="gap-table-container">
      <div className="table-header">
        <div>
          <h2 className="table-title">
            <ListFilter className="icon-gradient" size={24} />
            Multi-Dimensional Skill Gap Analysis
          </h2>
          <p className="table-subtitle">Evaluate gap severity across organizational benchmarks and project demands.</p>
        </div>

        <div className="search-input-wrapper">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search skills, departments..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Dimension Filter Controls */}
      <div className="dimension-filter-bar">
        <span className="dimension-label"><Target size={14}/> Analysis Dimension:</span>
        <div className="dimension-pills">
          {DIMENSIONS.map(dim => (
            <button
              key={dim.id}
              className={`dimension-pill ${activeDimension === dim.id ? 'active' : ''}`}
              onClick={() => setActiveDimension(dim.id)}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="gap-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('skill')}>
                <div>Skill / Department <SortIcon columnKey="skill" /></div>
              </th>
              <th onClick={() => requestSort('computedCurrent')}>
                <div>Current Level <SortIcon columnKey="computedCurrent" /></div>
              </th>
              <th onClick={() => requestSort('computedRequired')}>
                <div>Target Requirement <SortIcon columnKey="computedRequired" /></div>
              </th>
              <th onClick={() => requestSort('gap')}>
                <div>Gap Score <SortIcon columnKey="gap" /></div>
              </th>
              <th>Impacted</th>
              <th>Severity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedData.map((row) => {
                const severity = getSeverity(row.gap);
                return (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td>
                      <div className="skill-info">
                        <div className="skill-icon-wrapper">
                          {getIconForCategory(row.category)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#f8fafc' }}>{row.skill}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{row.department} • {row.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            background: i < row.computedCurrent ? '#06b6d4' : 'rgba(255,255,255,0.1)' 
                          }} />
                        ))}
                        <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: '#cbd5e1' }}>Lvl {row.computedCurrent}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            background: i < row.computedRequired ? '#a855f7' : 'rgba(255,255,255,0.1)' 
                          }} />
                        ))}
                        <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: '#cbd5e1' }}>Lvl {row.computedRequired}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 'bold', color: row.gap > 0 ? '#ef4444' : '#22c55e' }}>
                      {row.gap > 0 ? `-${row.gap}` : '0'}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {row.affectedEmployees} headcount
                    </td>
                    <td>
                      <span className={`severity-badge ${severity.class}`}>
                        {severity.label}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="intervention-btn"
                        onClick={() => generateAiPath(`${row.department} Role`, row.skill)}
                        title="Generate AI Training Intervention"
                      >
                        <Zap size={14} /> Intervention
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GapAnalysisTable;
