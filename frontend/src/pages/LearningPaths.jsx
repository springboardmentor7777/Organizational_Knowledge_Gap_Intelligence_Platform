import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, PenTool, CheckCircle2, Circle, Clock, Plus, Trash2, Sparkles, BookOpen, Layers, X, Play } from 'lucide-react';
import { useGapContext } from '../context/GapContext';
import Button from '../components/common/Button';
import './LearningPaths.css';

const LearningPaths = () => {
  const { learningPaths, toggleMilestone, createCustomPath, generateAiPath } = useGapContext();
  const [showBuilderModal, setShowBuilderModal] = useState(false);

  // Custom Path Builder Form State
  const [pathTitle, setPathTitle] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [level, setLevel] = useState('Intermediate');
  const [steps, setSteps] = useState([
    { title: 'Foundational Skill Diagnostics', duration: '2 Weeks', resource: 'Coursera' },
    { title: 'Core Implementation & Hands-on Labs', duration: '3 Weeks', resource: 'AWS Skill Builder' }
  ]);

  const handleAddStep = () => {
    setSteps(prev => [...prev, { title: '', duration: '2 Weeks', resource: 'Internal Catalog' }]);
  };

  const handleStepChange = (index, field, value) => {
    setSteps(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleRemoveStep = (index) => {
    if (steps.length <= 1) return;
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveCustomPath = (e) => {
    e.preventDefault();
    if (!pathTitle.trim()) return;

    createCustomPath({
      title: pathTitle,
      targetRole: targetRole || 'Specialist',
      category: category,
      level: level,
      steps: steps
    });

    setShowBuilderModal(false);
    setPathTitle('');
    setTargetRole('');
  };

  const handleAiAutoFill = () => {
    setPathTitle(`AI-Curated ${targetRole || 'Architect'} Roadmap`);
    setSteps([
      { title: 'Baseline Skill Gap Diagnostics & Prerequisite Review', duration: '1 Week', resource: 'Platform Evaluation' },
      { title: 'Deep-dive Core Mastery & Enterprise Architecture', duration: '3 Weeks', resource: 'Coursera & Udemy' },
      { title: 'Cross-functional Peer Mentorship & Capstone Lab', duration: '2 Weeks', resource: 'Internal Workshop' },
      { title: 'Final Certification & Competency Verification', duration: '1 Week', resource: 'AWS Skill Builder' }
    ]);
  };

  return (
    <motion.div 
      className="page-container learning-paths-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="page-header path-header">
        <div>
          <h1 className="page-title">
            <span className="title-gradient">Personalized Learning Paths</span>
          </h1>
          <p className="page-subtitle">Structured, milestone-driven roadmaps to bridge critical organizational knowledge gaps.</p>
        </div>

        <Button 
          className="primary-glow-btn"
          onClick={() => setShowBuilderModal(true)}
        >
          <PenTool size={18} /> Build Custom Path
        </Button>
      </header>

      {/* Prebuilt & Active Learning Paths Section */}
      <section className="prebuilt-paths-section">
        <div className="section-title-row">
          <h2 className="section-title">
            <Map size={24} className="accent-icon"/> Active & Recommended Roadmaps
          </h2>
          <span className="path-count-tag">{learningPaths.length} Paths Available</span>
        </div>

        <div className="paths-grid">
          {learningPaths.map((path, i) => (
            <motion.div 
              key={path.id} 
              className="path-card glass-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="path-header">
                <div>
                  <span className="path-cat-badge">{path.category}</span>
                  <h3>{path.title}</h3>
                  <div className="path-target-role">Target Role: <strong>{path.targetRole}</strong></div>
                </div>
                <div className="path-meta-box">
                  <span className="level-badge">{path.level}</span>
                  <span className="duration-text"><Clock size={14}/> {path.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="path-progress-container">
                <div className="progress-label-row">
                  <span>Milestone Progress</span>
                  <span className="progress-percent">{path.progress}%</span>
                </div>
                <div className="path-progress-bar">
                  <div className="path-progress-fill" style={{ width: `${path.progress}%` }}></div>
                </div>
              </div>

              {/* Roadmap Visual */}
              <div className="roadmap-visual">
                {path.steps.map((step, index) => {
                  const isCompleted = step.status === 'completed';
                  return (
                    <div 
                      key={index} 
                      className={`roadmap-step ${isCompleted ? 'step-done' : ''}`}
                      onClick={() => toggleMilestone(path.id, index)}
                      title="Click to toggle milestone completion"
                    >
                      <div className="step-icon-container">
                        {isCompleted ? (
                          <CheckCircle2 size={22} className="completed-icon"/>
                        ) : (
                          <Circle size={22} className="pending-icon"/>
                        )}
                        {index < path.steps.length - 1 && <div className={`step-line ${isCompleted ? 'line-done' : ''}`} />}
                      </div>
                      <div className="step-details">
                        <span className="step-label">{step.title}</span>
                        <div className="step-submeta">
                          <span className="step-duration">{step.duration}</span>
                          <span className="step-resource">• {step.resource}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="path-footer">
                <Button 
                  className="glass-button w-full"
                  onClick={() => toggleMilestone(path.id, 0)}
                >
                  {path.progress === 100 ? '🎉 Path Completed' : 'Continue Learning Path'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Path Builder Section Banner */}
      <section className="custom-path-builder glass-panel">
        <div className="builder-content">
          <div className="builder-text">
            <h2><Sparkles size={24} className="accent-icon"/> AI Learning Path Generator</h2>
            <p>Select your targeted competency or job role and let the AI recommendation engine generate a milestone-based curriculum tailored to your learning velocity.</p>
          </div>
          <div className="builder-action">
            <Button 
              className="primary-glow-btn"
              onClick={() => {
                generateAiPath('Senior Cloud Engineer', 'Kubernetes & AWS');
              }}
            >
              <Sparkles size={18} /> Quick AI Path Launch
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Path Builder Modal */}
      <AnimatePresence>
        {showBuilderModal && (
          <div className="modal-backdrop" onClick={() => setShowBuilderModal(false)}>
            <motion.div 
              className="builder-modal glass-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-box">
                  <PenTool className="text-cyan" size={22} />
                  <div>
                    <h3>Create Custom Learning Path</h3>
                    <p className="modal-subtitle">Design a milestone roadmap for your team</p>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setShowBuilderModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveCustomPath} className="modal-body">
                <div className="form-group">
                  <label>Path Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. LLMOps & Generative AI Engineering" 
                    className="modal-input" 
                    value={pathTitle}
                    onChange={(e) => setPathTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Target Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AI Lead" 
                      className="modal-input"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      className="modal-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>

                <div className="milestones-builder-box">
                  <div className="milestones-header">
                    <strong>Milestone Steps ({steps.length})</strong>
                    <button 
                      type="button" 
                      className="ai-autofill-btn"
                      onClick={handleAiAutoFill}
                    >
                      <Sparkles size={14} /> AI Auto-Fill
                    </button>
                  </div>

                  {steps.map((step, idx) => (
                    <div key={idx} className="step-builder-row">
                      <span className="step-num">{idx + 1}</span>
                      <input 
                        type="text"
                        placeholder="Milestone title..."
                        className="modal-input step-title-input"
                        value={step.title}
                        onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                        required
                      />
                      <input 
                        type="text"
                        placeholder="Duration"
                        className="modal-input step-dur-input"
                        value={step.duration}
                        onChange={(e) => handleStepChange(idx, 'duration', e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="remove-step-btn"
                        onClick={() => handleRemoveStep(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="add-step-btn"
                    onClick={handleAddStep}
                  >
                    <Plus size={14} /> Add Milestone Step
                  </button>
                </div>

                <div className="modal-footer-actions">
                  <Button type="submit" className="primary-glow-btn w-full">
                    Save Learning Path
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LearningPaths;
