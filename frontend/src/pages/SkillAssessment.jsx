import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Trophy, Activity, Target } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './SkillAssessment.css';

const questions = [
  {
    id: 1,
    domain: "React Development",
    question: "How would you rate your proficiency in React performance optimization?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  },
  {
    id: 2,
    domain: "Software Testing",
    question: "How frequently do you write unit tests for your front-end code?",
    options: ["Rarely", "Sometimes", "Usually", "Always"]
  },
  {
    id: 3,
    domain: "DevOps",
    question: "Rate your experience with CI/CD pipelines (e.g., GitHub Actions, Jenkins).",
    options: ["No Experience", "Basic Setup", "Advanced Pipelines", "Architect"]
  },
  {
    id: 4,
    domain: "UI/UX",
    question: "How comfortable are you with designing and implementing glassmorphism UI architectures?",
    options: ["Uncomfortable", "Learning", "Comfortable", "Pioneer"]
  }
];

const SkillAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + (isCompleted ? 1 : 0)) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="skill-assessment-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="completion-card glass-panel"
        >
          <Trophy className="trophy-icon" size={64} />
          <h2>Assessment Complete!</h2>
          <p>Your skill profile has been updated. AI is generating your personalized learning path.</p>
          <div className="action-buttons">
            <Button variant="primary">View My Gaps</Button>
            <Button variant="secondary">Go to Dashboard</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="skill-assessment-container">
      <div className="assessment-header">
        <h1>Skill Self-Assessment</h1>
        <p>Calibrate your skills to receive personalized AI recommendations</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <motion.div 
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="question-card glass-panel"
        >
          <div className="domain-tag">
            <Activity size={16} />
            {q.domain}
          </div>
          <h2 className="question-text">{q.question}</h2>
          
          <div className="options-grid">
            {q.options.map((opt, idx) => {
              const isSelected = answers[currentQuestion] === idx;
              return (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-label">{opt}</span>
                  {isSelected && <CheckCircle2 className="check-icon" size={20} />}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="navigation-buttons">
        <Button 
          variant="secondary" 
          onClick={prevQuestion} 
          disabled={currentQuestion === 0}
        >
          <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Previous
        </Button>
        <Button 
          variant="primary" 
          onClick={nextQuestion}
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </div>
  );
};

export default SkillAssessment;
