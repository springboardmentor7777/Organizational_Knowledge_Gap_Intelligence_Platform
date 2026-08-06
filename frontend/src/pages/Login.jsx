import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Eye, EyeOff, KeyRound, ArrowLeft, CheckCircle2, Info, Sparkles } from 'lucide-react';
import API from '../services/api';

export default function Login() {
  const { login, verify2FA, forgotPassword, resetPassword } = useContext(AuthContext);
  
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [infoMsg, setInfoMsg]           = useState('');
  const [loading, setLoading]           = useState(false);
  const [mounted, setMounted]           = useState(false);

  const [mfaRequired, setMfaRequired]   = useState(false);
  const [mfaCode, setMfaCode]           = useState('');

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetStep, setResetStep]       = useState(1);
  const [forgotEmail, setForgotEmail]   = useState('');
  const [resetToken, setResetToken]     = useState('');
  const [newPassword, setNewPassword]   = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setInfoMsg(''); setLoading(true);
    const res = await login(username, password);
    setLoading(false);
    if (res.success) {
      if (res.mfaRequired) {
        setMfaRequired(true);
        setInfoMsg('Two-Factor Authentication enabled. Enter your 6-digit code.');
      } else {
        navigate('/');
      }
    } else {
      setError(res.error);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await verify2FA(username, mfaCode);
    setLoading(false);
    if (res.success) { navigate('/'); } else { setError(res.error); }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await forgotPassword(forgotEmail);
    setLoading(false);
    if (res.success) { setInfoMsg(res.message || 'Reset token sent!'); setResetStep(2); }
    else { setError(res.error); }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await resetPassword(resetToken, newPassword);
    setLoading(false);
    if (res.success) {
      setResetSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => { setIsForgotModalOpen(false); setResetStep(1); setResetSuccess(''); }, 2200);
    } else { setError(res.error); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]">
      {/* ── Animated Background Orbs ── */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-700/20 blur-[100px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-violet-700/15 blur-[100px] pointer-events-none" style={{ animation: 'orb-2 14s ease-in-out infinite' }} />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-cyan-700/10 blur-[80px] pointer-events-none animate-float" />

      {/* ── Card ── */}
      <div className={`relative z-10 w-full max-w-md mx-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Glow ring around card */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/20 blur-xl -z-10 scale-105" />
        
        <div className="bg-[#0c0c18]/90 border border-white/8 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white mb-4 shadow-xl animate-glow-pulse relative">
              <Shield className="w-8 h-8" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-50 blur-md -z-10" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {mfaRequired ? 'Verify Identity' : 'Welcome back'}
            </h1>
            <p className="text-sm text-slate-400">
              {mfaRequired
                ? 'Enter your authentication code to proceed'
                : 'Sign in to the Knowledge Gap Platform'}
            </p>

            {/* Decorative gradient line */}
            <div className="mx-auto mt-4 w-16 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60" />
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-rose-500/8 border border-rose-500/20 flex items-start space-x-3 animate-fade-up">
              <AlertCircle className="w-4.5 h-4.5 text-rose-400 flex-shrink-0 mt-0.5" style={{ width: '18px', height: '18px' }} />
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          )}
          {infoMsg && (
            <div className="mb-5 p-4 rounded-xl bg-indigo-500/8 border border-indigo-500/20 flex items-start space-x-3 animate-fade-up">
              <Info className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0 mt-0.5" style={{ width: '18px', height: '18px' }} />
              <p className="text-sm text-indigo-300">{infoMsg}</p>
            </div>
          )}

          {!mfaRequired ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-100 glass-input text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setIsForgotModalOpen(true); setError(''); setInfoMsg(''); }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-slate-100 glass-input text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                  color: '#fff'
                }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Sign In Securely</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              {/* Divider & Google OAuth */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#0c0c18] px-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest absolute">or</span>
              </div>

              <button
                type="button"
                onClick={async () => {
                  setLoading(true); setError('');
                  try {
                    const sampleGoogleUser = { email: 'demo.google@okgip.com', name: 'Google Single Sign-On User' };
                    const res = await API.post('/auth/google', sampleGoogleUser);
                    localStorage.setItem('token', res.data.token);
                    if (res.data.refreshToken) {
                      localStorage.setItem('refreshToken', res.data.refreshToken);
                    }
                    localStorage.setItem('user', JSON.stringify(res.data));
                    window.location.href = '/';
                  } catch (err) {
                    setError('Google SSO Login failed. ' + (err.response?.data?.message || ''));
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google OAuth2</span>
              </button>
            </form>
          ) : (
            /* 2FA Form */
            <form onSubmit={handleMfaSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  6-Digit Security Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-center text-2xl tracking-[0.5em] font-mono text-indigo-300 glass-input"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 text-center">
                  Demo code: <code className="text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded">123456</code>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setMfaRequired(false); setMfaCode(''); setError(''); }}
                  className="w-1/3 py-3 px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-semibold rounded-xl flex items-center justify-center transition text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading || mfaCode.length < 6}
                  className="w-2/3 py-3 px-4 rounded-xl font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
                >
                  {loading ? 'Verifying...' : 'Verify & Enter'}
                </button>
              </div>
            </form>
          )}

          {/* Register link */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
              Create account
            </Link>
          </p>

          {/* Platform tag */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <p className="text-[10px] text-slate-600 font-medium tracking-wider uppercase">
              AI-Powered Skill Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* ── Forgot Password Modal ── */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#0e0e1c] border border-white/8 rounded-2xl p-6 shadow-2xl relative animate-fade-up">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/8 to-violet-500/8" />
            
            <div className="relative">
              <h3 className="text-lg font-bold text-slate-100 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Reset Password</h3>
              <p className="text-xs text-slate-400 mb-6">
                {resetStep === 1
                  ? 'Enter your registered email to receive a recovery token.'
                  : 'Enter the token and your new password.'}
              </p>

              {resetSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{resetSuccess}</span>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {resetStep === 1 ? (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="user@okgip.com"
                      className="w-full px-4 py-3 rounded-xl text-sm glass-input"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-1">
                    <button type="button" onClick={() => setIsForgotModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm transition">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading}
                      className="px-5 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}>
                      {loading ? 'Sending...' : 'Send Token'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Reset Token</label>
                    <input
                      type="text"
                      required
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      placeholder="e.g. A1B2C3D4"
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 chars, 1 uppercase, 1 special..."
                      className="w-full px-4 py-3 rounded-xl text-sm glass-input"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-1">
                    <button type="button" onClick={() => { setIsForgotModalOpen(false); setResetStep(1); }}
                      className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm transition">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading}
                      className="px-5 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}>
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
