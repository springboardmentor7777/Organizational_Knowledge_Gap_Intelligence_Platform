import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fp-container">
      <motion.div 
        className="fp-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="fp-card">
          {!isSubmitted ? (
            <motion.div 
              className="fp-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="fp-header">
                <div className="fp-icon-container">
                  <Mail size={32} className="fp-icon" />
                </div>
                <h2>Forgot Password?</h2>
                <p>No worries, we'll send you reset instructions.</p>
              </div>

              <form onSubmit={handleSubmit} className="fp-form">
                <div className="fp-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="fp-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </Button>
              </form>

              <div className="fp-footer">
                <a href="/login" className="fp-back-link">
                  <ArrowLeft size={16} /> Back to log in
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="fp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div 
                className="fp-success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              >
                <CheckCircle size={56} />
              </motion.div>
              <h2>Check your email</h2>
              <p>We sent a password reset link to <br/><strong>{email}</strong></p>
              
              <div className="fp-success-actions">
                <Button className="fp-submit-btn" onClick={() => window.location.href = '/login'}>
                  Back to Login
                </Button>
                <p className="fp-resend">
                  Didn't receive the email? <button onClick={() => setIsSubmitted(false)}>Click to resend</button>
                </p>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
