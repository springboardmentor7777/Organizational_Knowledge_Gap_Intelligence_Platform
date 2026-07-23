import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FEATURES = [
  { icon: '📊', text: 'Executive analytics dashboard with real-time KPIs' },
  { icon: '🧠', text: 'AI-powered skill gap detection and recommendations' },
  { icon: '🗺️', text: 'Personalized learning roadmaps for every employee' },
  { icon: '🔬', text: 'Competency matrix across departments and roles' },
];

const STATS = [
  { value: '2,400+', label: 'Employees Tracked' },
  { value: '94%',   label: 'Gap Reduction Rate' },
  { value: '18K',   label: 'Skills Mapped' },
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const newErrors = {};
    if (!form.fullName.trim())
      newErrors.fullName = 'Full name is required.';

    if (!form.email.trim())
      newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address.';

    if (!form.password)
      newErrors.password = 'Password is required.';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    if (!form.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 600);
  }

  return (
    <div className="auth-split-page">
      {/* ── Left Brand Panel ───────────────────────────── */}
      <div className="auth-left-panel">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -left-16 w-80 h-80 rounded-full bg-blue-500/10" />
        <div className="absolute top-1/2 -right-8 w-40 h-40 rounded-full bg-indigo-500/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">KnowledgeGap</p>
              <p className="text-blue-300 text-[10px] font-medium">Intelligence Platform</p>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-white leading-tight mb-4 text-balance">
            Empower Your Workforce with Intelligent Growth.
          </h1>
          <p className="text-blue-200 text-sm leading-relaxed mb-10 max-w-sm">
            Join thousands of corporate HR teams using data-driven insights to transform organizational talent strategy.
          </p>

          <div className="space-y-3.5">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-item text-blue-100">
                <div className="feature-icon">
                  <span className="text-xs">{f.icon}</span>
                </div>
                <span className="text-sm leading-snug">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-10">
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/15">
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-[11px] text-blue-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ───────────────────────────── */}
      <div className="auth-right-panel">
        <div className="auth-form-container animate-fadeIn">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-btn-primary">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-sm">KnowledgeGap Platform</span>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Registration Successful!</h2>
              <p className="text-sm text-slate-500">Redirecting you to the sign-in page…</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-1.5">Create account</h2>
                <p className="text-sm text-slate-500">Join the KnowledgeGap Platform today</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    id="fullName" name="fullName" type="text" autoComplete="name"
                    value={form.fullName} onChange={handleChange}
                    placeholder="Jane Smith"
                    className={errors.fullName ? 'form-input-error' : 'form-input'}
                  />
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className={errors.email ? 'form-input-error' : 'form-input'}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password" name="password" type="password" autoComplete="new-password"
                    value={form.password} onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className={errors.password ? 'form-input-error' : 'form-input'}
                  />
                  {errors.password && <p className="form-error">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password"
                    value={form.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter password"
                    className={errors.confirmPassword ? 'form-input-error' : 'form-input'}
                  />
                  {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                </div>

                <button
                  id="register-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-2.5 text-sm mt-3"
                >
                  {loading ? (
                    <><span className="loading-spinner w-4 h-4 border-2" /> Creating account…</>
                  ) : (
                    <>Create Account <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-semibold">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
