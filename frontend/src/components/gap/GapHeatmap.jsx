import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import './GapHeatmap.css';

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales'];
const skills = ['React', 'Python', 'UI/UX', 'SEO', 'Negotiation', 'Leadership', 'Data Analysis'];

// Mock data: gap severity 0 (none) to 4 (critical)
const gapData = [
  [1, 0, 3, 0, 0, 2, 1], // Engineering
  [0, 1, 2, 0, 0, 1, 3], // Product
  [2, 0, 1, 0, 0, 0, 1], // Design
  [0, 0, 1, 2, 1, 0, 3], // Marketing
  [0, 0, 0, 0, 3, 2, 1], // Sales
];

const getSeverityClass = (val) => {
  if (val >= 4) return 'severity-critical';
  if (val === 3) return 'severity-high';
  if (val === 2) return 'severity-medium';
  if (val === 1) return 'severity-low';
  return 'severity-none';
};

const getSeverityLabel = (val) => {
  if (val >= 4) return 'Critical Gap';
  if (val === 3) return 'High Gap';
  if (val === 2) return 'Medium Gap';
  if (val === 1) return 'Low Gap';
  return 'No Gap';
};

const GapHeatmap = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="gap-heatmap-container">
      <div className="heatmap-header">
        <h2 className="heatmap-title">
          <LayoutGrid className="icon-gradient" size={24} />
          Cross-Department Skill Gaps
        </h2>
      </div>

      <div className="heatmap-grid" style={{ gridTemplateColumns: `auto repeat(${skills.length}, 1fr)` }}>
        {/* Header Row */}
        <div className="heatmap-row">
          <div className="heatmap-cell header-cell"></div>
          {skills.map((skill, i) => (
            <div key={`header-${i}`} className="heatmap-cell col-header">
              {skill}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <motion.div className="heatmap-row-wrapper" variants={containerVariants} initial="hidden" animate="show" style={{ display: 'contents' }}>
          {departments.map((dept, rowIndex) => (
            <div key={`row-${rowIndex}`} className="heatmap-row">
              <div className="heatmap-cell header-cell">{dept}</div>
              {gapData[rowIndex].map((val, colIndex) => (
                <motion.div
                  key={`cell-${rowIndex}-${colIndex}`}
                  variants={itemVariants}
                  className={`heatmap-cell data-cell ${getSeverityClass(val)}`}
                >
                  {val > 0 && val}
                  <div className="heatmap-tooltip">
                    <strong>{dept} - {skills[colIndex]}</strong><br />
                    {getSeverityLabel(val)}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="heatmap-legend">
        <div className="legend-item"><div className="legend-color severity-none"></div> No Gap</div>
        <div className="legend-item"><div className="legend-color severity-low"></div> Low</div>
        <div className="legend-item"><div className="legend-color severity-medium"></div> Medium</div>
        <div className="legend-item"><div className="legend-color severity-high"></div> High</div>
        <div className="legend-item"><div className="legend-color severity-critical"></div> Critical</div>
      </div>
    </div>
  );
};

export default GapHeatmap;
