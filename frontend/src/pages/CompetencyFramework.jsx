import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Edit2, Plus, Search, Layers, Briefcase, Zap } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './CompetencyFramework.css';

const MOCK_TAXONOMY = [
  {
    id: 1,
    name: 'Technical Skills',
    icon: Layers,
    children: [
      { id: 11, name: 'Frontend Development', level: 'Advanced', description: 'React, Vue, Angular, HTML/CSS' },
      { id: 12, name: 'Backend Development', level: 'Intermediate', description: 'Node.js, Python, Java, Go' },
      { id: 13, name: 'Cloud Infrastructure', level: 'Beginner', description: 'AWS, Azure, GCP' },
    ]
  },
  {
    id: 2,
    name: 'Soft Skills',
    icon: Briefcase,
    children: [
      { id: 21, name: 'Leadership', level: 'Advanced', description: 'Team management, strategic planning' },
      { id: 22, name: 'Communication', level: 'Intermediate', description: 'Public speaking, technical writing' },
    ]
  },
  {
    id: 3,
    name: 'Domain Knowledge',
    icon: Zap,
    children: [
      { id: 31, name: 'Finance', level: 'Beginner', description: 'Banking regulations, capital markets' },
      { id: 32, name: 'Healthcare', level: 'Intermediate', description: 'HIPAA, clinical trials' },
    ]
  }
];

const CompetencyFramework = () => {
  const [expandedNodes, setExpandedNodes] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNode = (id) => {
    setExpandedNodes(prev => 
      prev.includes(id) ? prev.filter(nodeId => nodeId !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      className="competency-container page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header">
        <div>
          <h1 className="page-title">Competency Framework</h1>
          <p className="page-subtitle">Manage organizational skill taxonomy and proficiency levels</p>
        </div>
        <Button className="glass-btn primary"><Plus size={18} /> Add Category</Button>
      </header>

      <Card className="glass-card full-width">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search competencies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input"
          />
        </div>

        <div className="taxonomy-tree">
          {MOCK_TAXONOMY.map((category) => (
            <div key={category.id} className="tree-node">
              <div 
                className={`node-header ${expandedNodes.includes(category.id) ? 'expanded' : ''}`}
                onClick={() => toggleNode(category.id)}
              >
                {expandedNodes.includes(category.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <category.icon size={22} className="category-icon" />
                <span className="category-name">{category.name}</span>
                <span className="badge">{category.children.length} Skills</span>
              </div>
              
              <AnimatePresence>
                {expandedNodes.includes(category.id) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="node-children"
                  >
                    {category.children.map(skill => (
                      <div key={skill.id} className="skill-item glass-panel">
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <p>{skill.description}</p>
                        </div>
                        <div className="skill-actions">
                          <span className={`level-badge ${skill.level.toLowerCase()}`}>{skill.level}</span>
                          <button className="icon-btn"><Edit2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                    <button className="add-skill-btn"><Plus size={16} /> Add Skill to {category.name}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default CompetencyFramework;
