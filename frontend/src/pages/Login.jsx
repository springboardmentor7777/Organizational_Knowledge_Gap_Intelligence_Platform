import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import './Login.css';

// Animated particle for background
const Particle = ({ style }) => (
  <motion.div
    className="login-particle"
    style={style}
    animate={{
      y: [0, -100, 0],
      x: [0, Math.random() * 40 - 20, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      delay: Math.random() * 3,
      ease: 'easeInOut',
    }}
  />
);

// 3D orbiting ring
const OrbitRing = ({ size, duration, delay, color, clockwise = true }) => (
  <motion.div
    className="orbit-ring"
    style={{ width: size, height: size, borderColor: color }}
    animate={{ rotate: clockwise ? 360 : -360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  >
    <div className="orbit-dot" style={{ background: color }} />
  </motion.div>
);

const Login = () => {
  const { login, loading } = useAuthContext();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  
  // Rate limiting / brute-force protection state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (lockoutTimer > 0) {
      timer = setInterval(() => setLockoutTimer(t => t - 1), 1000);
    } else if (lockoutTimer === 0 && loginAttempts >= 3) {
      // Reset attempts after lockout period ends
      setLoginAttempts(0);
    }
    return () => clearInterval(timer);
  }, [lockoutTimer, loginAttempts]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      background: i % 3 === 0 ? '#7c3aed' : i % 3 === 1 ? '#06b6d4' : '#10b981',
      borderRadius: '50%',
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side rate limiting check
    if (lockoutTimer > 0) return;
    
    if (loginAttempts >= 3) {
      setLockoutTimer(30); // 30 second lockout
      setErrors({ general: 'Too many failed attempts. Please wait 30 seconds.' });
      return;
    }

    if (!validate()) return;
    
    try {
      await login(formData);
      // Reset on success
      setLoginAttempts(0);
    } catch (err) {
      setLoginAttempts(prev => prev + 1);
      setErrors({ general: err.message });
    }
  };

  const quickLogin = (role) => {
    const creds = {
      EMPLOYEE: { email: 'employee@orgknow.com', password: 'password123' },
      MANAGER: { email: 'manager@orgknow.com', password: 'password123' },
      HR: { email: 'hr@orgknow.com', password: 'password123' },
      ADMIN: { email: 'admin@orgknow.com', password: 'password123' },
    };
    login(creds[role]);
  };

  return (
    <div className="login-root">
      {/* Animated background */}
      <div className="login-bg">
        {/* Grid */}
        <div className="login-grid" />

        {/* Gradient orbs */}
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />

        {/* Particles */}
        {particles.map(p => <Particle key={p.id} style={p.style} />)}
      </div>

      {/* Left panel — Branding */}
      <motion.div
        className="login-brand-panel"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* 3D Sphere visualization */}
        <div className="login-sphere-container">
          <div className="login-sphere">
            <OrbitRing size={240} duration={8} delay={0} color="rgba(124,58,237,0.6)" clockwise />
            <OrbitRing size={180} duration={6} delay={1} color="rgba(6,182,212,0.5)" clockwise={false} />
            <OrbitRing size={120} duration={4} delay={0.5} color="rgba(16,185,129,0.4)" />
            <div className="login-sphere-core">
              <Building2 size={40} />
            </div>
          </div>
        </div>

        <motion.div
          className="login-brand-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="login-brand-title">
            <span className="gradient-text">OrgKnow</span>
          </h1>
          <p className="login-brand-subtitle">
            Intelligence Platform for Organizational Knowledge Gap Analysis
          </p>

          {/* Feature highlights */}
          <div className="login-features">
            {[
              { icon: <Sparkles size={18} />, text: 'AI-Powered Gap Detection' },
              { icon: <Shield size={18} />, text: 'Role-Based Access Control' },
              { icon: <Zap size={18} />, text: 'Real-Time Analytics' },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="login-feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <span className="login-feature-icon">{feat.icon}</span>
                <span>{feat.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right panel — Login form */}
      <motion.div
        className="login-form-panel"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="login-form-container">
          {/* Header */}
          <motion.div
            className="login-form-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="login-logo-badge">
              <Building2 size={24} />
            </div>
            <h2 className="login-form-title">Welcome back</h2>
            <p className="login-form-subtitle">Sign in to your intelligence dashboard</p>
          </motion.div>

          {/* Quick login buttons */}
          <motion.div
            className="login-quick-access"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="login-quick-label">Quick demo access:</p>
            <div className="login-quick-btns">
              {['EMPLOYEE', 'MANAGER', 'HR', 'ADMIN'].map((role) => (
                <button
                  key={role}
                  className={`login-quick-btn login-quick-${role.toLowerCase()}`}
                  onClick={() => quickLogin(role)}
                  disabled={loading}
                >
                  {role}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="login-divider"><span>or sign in with credentials</span></div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="login-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* General error */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  className="login-error-banner"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                >
                  {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email field */}
            <div className={`login-field ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'has-error' : ''}`}>
              <label className="login-label">Email Address</label>
              <div className="login-input-wrap">
                <Mail size={16} className="login-input-icon" />
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  className="login-input"
                  placeholder="you@organization.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email"
                />
                {focusedField === 'email' && (
                  <motion.div
                    className="login-input-glow"
                    layoutId="input-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    className="login-error-text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Password field */}
            <div className={`login-field ${focusedField === 'password' ? 'focused' : ''} ${errors.password ? 'has-error' : ''}`}>
              <div className="login-label-row">
                <label className="login-label">Password</label>
                <Link to="/forgot-password" className="login-forgot-link">Forgot password?</Link>
              </div>
              <div className="login-input-wrap">
                <Lock size={16} className="login-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="login-password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.span
                    className="login-error-text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={lockoutTimer > 0}
              icon={!loading && <ArrowRight size={18} />}
              iconPosition="right"
              className="login-submit-btn"
            >
              {lockoutTimer > 0 ? `Try again in ${lockoutTimer}s` : 'Sign In'}
            </Button>
          </motion.form>

          {/* Register link */}
          <motion.p
            className="login-register-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Don't have an account?{' '}
            <Link to="/register">Create one now</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
