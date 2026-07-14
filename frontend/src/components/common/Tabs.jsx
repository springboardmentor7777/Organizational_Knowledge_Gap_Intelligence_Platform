import { useState } from 'react';
import { motion } from 'framer-motion';
import './Tabs.css';

const Tabs = ({ tabs, defaultTab, onChange }) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id) => {
    setActive(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="tabs-root" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tabs-btn ${active === tab.id ? 'active' : ''}`}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => handleChange(tab.id)}
        >
          {tab.icon && <span className="tabs-icon">{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <span className="tabs-count">{tab.count}</span>
          )}
          {active === tab.id && (
            <motion.div
              className="tabs-indicator"
              layoutId="tabs-active-indicator"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
