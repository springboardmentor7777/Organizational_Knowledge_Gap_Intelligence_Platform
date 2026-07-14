import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Award, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Register.css';

const steps = [
  { id: 1, title: 'Personal Info', icon: <User size={20} /> },
  { id: 2, title: 'Work Details', icon: <Briefcase size={20} /> },
  { id: 3, title: 'Role Selection', icon: <Award size={20} /> },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    jobTitle: '',
    role: '',
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else setIsCompleted(true);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="register-step"
          >
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="register-step"
          >
            <div className="form-group">
              <label>Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Engineering, Marketing" />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Senior Developer" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="register-step"
          >
            <div className="role-selection">
              {['Employee', 'Manager', 'Administrator'].map(role => (
                <div
                  key={role}
                  className={`role-card ${formData.role === role ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role }))}
                >
                  <div className="role-icon">
                    {role === 'Employee' ? <User /> : role === 'Manager' ? <Briefcase /> : <Award />}
                  </div>
                  <h3>{role}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="register-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="register-success"
        >
          <Card className="success-card">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <CheckCircle className="success-icon" size={64} />
            </motion.div>
            <h2>Registration Complete!</h2>
            <p>Welcome to the Organizational Knowledge Gap Intelligence Platform.</p>
            <Button className="mt-4">Go to Dashboard</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-header">
          <h1>Create an Account</h1>
          <p>Join the intelligence platform to bridge knowledge gaps.</p>
        </div>
        
        <div className="step-indicator">
          {steps.map((step, idx) => (
            <div key={step.id} className={`step-item ${currentStep >= step.id ? 'active' : ''}`}>
              <div className="step-icon">
                {currentStep > step.id ? <CheckCircle size={16} /> : step.icon}
              </div>
              <span className="step-title">{step.title}</span>
              {idx < steps.length - 1 && <div className={`step-line ${currentStep > step.id ? 'active' : ''}`} />}
            </div>
          ))}
        </div>

        <Card className="register-card">
          <div className="step-content-wrapper">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
          
          <div className="register-actions">
            <Button 
              variant="secondary" 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className="back-btn"
            >
              <ChevronLeft size={16} /> Back
            </Button>
            <Button onClick={handleNext} className="next-btn">
              {currentStep === 3 ? 'Complete Registration' : 'Continue'} <ChevronRight size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
