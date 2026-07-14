import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListFilter, Search, ChevronDown, ChevronUp, Code, Database, LineChart, Users } from 'lucide-react';
import './GapAnalysisTable.css';

const initialData = [
  { id: 1, skill: 'Advanced React', current: 2, required: 5, category: 'Engineering' },
  { id: 2, skill: 'Cloud Architecture', current: 3, required: 5, category: 'Engineering' },
  { id: 3, skill: 'Agile Leadership', current: 4, required: 4, category: 'Management' },
  { id: 4, skill: 'Data Visualization', current: 2, required: 4, category: 'Data Science' },
  { id: 5, skill: 'Machine Learning', current: 1, required: 4, category: 'Data Science' },
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
  if (gap >= 3) return { label: 'Critical', class: 'badge-critical' };
  if (gap === 2) return { label: 'High', class: 'badge-high' };
  if (gap === 1) return { label: 'Medium', class: 'badge-medium' };
  return { label: 'On Track', class: 'badge-low' };
};

const GapAnalysisTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'gap', direction: 'desc' });

  const processedData = initialData.map(item => ({
    ...item,
    gap: item.required - item.current
  }));

  const filteredData = processedData.filter(item => 
    item.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="table-title">
          <ListFilter className="icon-gradient" size={24} />
          Skill Gap Analysis
        </h2>
        <div className="search-input-wrapper">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search skills..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="gap-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('skill')}>
                <div>Skill <SortIcon columnKey="skill" /></div>
              </th>
              <th onClick={() => requestSort('current')}>
                <div>Current Level <SortIcon columnKey="current" /></div>
              </th>
              <th onClick={() => requestSort('required')}>
                <div>Required Level <SortIcon columnKey="required" /></div>
              </th>
              <th onClick={() => requestSort('gap')}>
                <div>Gap Score <SortIcon columnKey="gap" /></div>
              </th>
              <th>Severity</th>
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
                          <div style={{ fontWeight: 600 }}>{row.skill}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{row.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            background: i < row.current ? 'var(--color-brand-cyan, #06b6d4)' : 'rgba(255,255,255,0.1)' 
                          }} />
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            background: i < row.required ? 'var(--color-brand-purple, #a855f7)' : 'rgba(255,255,255,0.1)' 
                          }} />
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 'bold', color: row.gap > 0 ? '#ef4444' : '#22c55e' }}>
                      {row.gap > 0 ? `-${row.gap}` : '0'}
                    </td>
                    <td>
                      <span className={`severity-badge ${severity.class}`}>
                        {severity.label}
                      </span>
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
