import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, UserPlus, Lock, Mail, Users, Briefcase, Award, Eye, EyeOff, 
  Check, X, Phone, MapPin, FileText, Globe, Info, Sparkles, Building2, ShieldCheck,
  Navigation, RefreshCw, AlertCircle
} from 'lucide-react';

const ROLE_DETAILS = {
  EMPLOYEE: {
    badge: 'Individual Contributor',
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    icon: Award,
    description: 'Conduct personal skill self-assessments, view individual gap analysis, receive AI learning recommendations, and request peer mentorship.',
    titlePlaceholder: 'e.g., Junior Software Engineer',
    fields: ['bio', 'linkedin'],
  },
  MANAGER: {
    badge: 'Team Leader',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    icon: Users,
    description: 'Access department skill matrix heatmaps, track team gap severity, review team learning progress, and approve skill goals.',
    titlePlaceholder: 'e.g., Engineering Manager',
    fields: ['phone', 'location'],
  },
  HR_SPECIALIST: {
    badge: 'Talent & L&D Specialist',
    color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    icon: Building2,
    description: 'Manage organizational course catalogs, analyze cross-department skill gap metrics, and coordinate mentorship programs.',
    titlePlaceholder: 'e.g., L&D Specialist / Talent Lead',
    fields: ['phone', 'location', 'bio'],
  },
  ADMIN: {
    badge: 'Platform Administrator',
    color: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
    icon: ShieldCheck,
    description: 'Full platform control: assign user security roles, inspect audit event logs, lock/unlock accounts, and manage system configuration.',
    titlePlaceholder: 'e.g., System Security Administrator',
    fields: ['phone', 'linkedin'],
  },
};

export default function Register() {
  const { register, login, sendEmailOtp, verifyEmailOtp } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [role, setRole] = useState('EMPLOYEE');

  // Role-specific extended fields
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [locationMode, setLocationMode] = useState('manual'); // 'manual' | 'live'
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationGeoError, setLocationGeoError] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationGeoError('Geolocation is not supported by your browser.');
      setLocationMode('manual');
      return;
    }

    setIsDetectingLocation(true);
    setLocationGeoError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || '';
          const state = data.address?.state || '';
          const country = data.address?.country || '';
          
          let detected = [city, state, country].filter(Boolean).join(', ');
          if (!detected) {
            detected = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
          }
          setLocation(detected);
          setLocationMode('live');
        } catch (err) {
          setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
          setLocationMode('live');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        setLocationGeoError('Permission denied or location unavailable. Enter manually below.');
        setLocationMode('manual');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };
  
  // Email OTP state
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMsg, setOtpMsg] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const activeRoleConfig = ROLE_DETAILS[role] || ROLE_DETAILS.EMPLOYEE;

  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address first.');
      return;
    }
    setError('');
    setOtpMsg('');
    setOtpLoading(true);

    const res = await sendEmailOtp(email, 'OKGIP Registration Email Verification');
    setOtpLoading(false);

    if (res.success) {
      setIsOtpSent(true);
      setOtpMsg(res.message);
    } else {
      setError(res.error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setError('Please enter the full 6-digit OTP code.');
      return;
    }
    setError('');
    setOtpMsg('');
    setOtpLoading(true);

    const res = await verifyEmailOtp(email, otpCode);
    setOtpLoading(false);

    if (res.success) {
      setIsOtpVerified(true);
      setOtpMsg('Email verified successfully!');
    } else {
      setError(res.error);
    }
  };

  // Password rules validation
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@#$%^&+=!._-]/.test(password),
  };

  const fulfilledCount = Object.values(rules).filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (!password) return { text: '', color: 'bg-slate-700', width: 'w-0' };
    if (fulfilledCount <= 2) return { text: 'Weak', color: 'bg-rose-500', width: 'w-1/4' };
    if (fulfilledCount === 3 || fulfilledCount === 4) return { text: 'Fair', color: 'bg-amber-500', width: 'w-2/4' };
    if (fulfilledCount === 5) return { text: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    return { text: 'Weak', color: 'bg-rose-500', width: 'w-1/4' };
  };

  const strength = getStrengthLabel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isOtpVerified) {
      setError('Please click "Send OTP" and enter the 6-digit code sent to your email address before completing registration.');
      return;
    }

    if (fulfilledCount < 5) {
      setError('Please ensure password meets all security strength rules listed below.');
      return;
    }

    setLoading(true);

    const res = await register(
      username, 
      email, 
      password, 
      role, 
      department, 
      fullName, 
      title,
      phone.trim() || null,
      location.trim() || null,
      bio.trim() || null,
      linkedinUrl.trim() || null
    );

    if (res.success) {
      setSuccess('Account created successfully! Signing you in...');
      const loginRes = await login(username, password);
      setLoading(false);
      if (loginRes.success) {
        navigate('/');
      } else {
        setTimeout(() => navigate('/login'), 1500);
      }
    } else {
      setLoading(false);
      setError(res.error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black py-12 px-4 overflow-hidden">
      {/* Subtle Monochrome Grid */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      <div className="w-full max-w-3xl glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border border-zinc-800">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-zinc-800 text-white mb-3 border border-zinc-700">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Select your platform access role to customize your onboarding information
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Role Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              1. Select Platform Access Role
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(ROLE_DETAILS).map((r) => {
                const isSelected = role === r;
                const RoleIcon = ROLE_DETAILS[r].icon;
                return (
                  <label
                    key={r}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-xl border cursor-pointer transition duration-200 ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={isSelected}
                      onChange={() => setRole(r)}
                      className="sr-only"
                    />
                    <RoleIcon className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-bold tracking-wider">{r.replace('_', ' ')}</span>
                  </label>
                );
              })}
            </div>

            {/* Dynamic Role Information Banner */}
            <div className={`mt-3 p-4 rounded-xl border bg-gradient-to-r ${activeRoleConfig.color} flex items-start space-x-3 transition-all duration-300`}>
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="flex items-center space-x-2 font-bold">
                  <span>Role Scope: {role.replace('_', ' ')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950/40 border border-current">
                    {activeRoleConfig.badge}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeRoleConfig.description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Account & Verification Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              2. Core Account Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Username *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <UserPlus className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="charlie1"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-400">
                    Email Address *
                  </label>
                  {isOtpVerified ? (
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading || !email}
                      className="text-xs font-semibold text-cyan-400 hover:underline disabled:opacity-50"
                    >
                      {otpLoading ? 'Sending...' : isOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsOtpVerified(false);
                    }}
                    placeholder="charlie@company.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                  />
                </div>

                {/* OTP Code Verification Field */}
                {isOtpSent && !isOtpVerified && (
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="6-digit OTP"
                        className="w-2/3 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs text-center focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otpLoading || otpCode.length < 6}
                        className="w-1/3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition"
                      >
                        Verify
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">
                      Demo OTP Code: <code className="text-cyan-400 font-mono bg-cyan-500/10 px-1 py-0.5 rounded">123456</code>
                    </p>
                  </div>
                )}

                {otpMsg && (
                  <p className="mt-1 text-[11px] text-cyan-300 italic">{otpMsg}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Password Strength:</span>
                      <span className="font-bold text-slate-200">{strength.text}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                      <span className={`flex items-center ${rules.length ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {rules.length ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />} At least 8 characters
                      </span>
                      <span className={`flex items-center ${rules.upper ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {rules.upper ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />} 1 Uppercase letter
                      </span>
                      <span className={`flex items-center ${rules.lower ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {rules.lower ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />} 1 Lowercase letter
                      </span>
                      <span className={`flex items-center ${rules.number ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {rules.number ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />} 1 Number
                      </span>
                      <span className={`flex items-center ${rules.special ? 'text-emerald-400' : 'text-slate-500'} col-span-2`}>
                        {rules.special ? <Check className="w-3.5 h-3.5 mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />} 1 Special character (@#$%^&+=!._-)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Organizational Profile Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              3. Organization & Role Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <UserPlus className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Charlie Brown"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Department *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Users className="w-4 h-4" />
                  </span>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input bg-[#0f172a] focus:border-cyan-500 text-sm"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product">Product</option>
                    <option value="Executive">Executive</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Designation / Job Title *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={activeRoleConfig.titlePlaceholder}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              {/* Dynamic Role-Specific Fields */}
              {activeRoleConfig.fields.includes('phone') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>Contact Phone</span>
                    <span className="text-[10px] text-cyan-400 font-normal">Requested for {role.replace('_', ' ')}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {activeRoleConfig.fields.includes('location') && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-400">
                      Office Location / Site
                    </label>
                    <div className="flex items-center space-x-1.5 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setLocationMode('manual');
                          setLocationGeoError('');
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                          locationMode === 'manual'
                            ? 'bg-slate-700 text-slate-100'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Manual
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLocationMode('live');
                          handleDetectLiveLocation();
                        }}
                        disabled={isDetectingLocation}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center space-x-1 transition ${
                          locationMode === 'live'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'text-slate-400 hover:text-cyan-400'
                        }`}
                      >
                        <Navigation className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                        <span>{isDetectingLocation ? 'Locating...' : 'Live GPS'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setLocationMode('manual');
                      }}
                      placeholder={locationMode === 'live' ? 'Detecting location...' : 'San Francisco HQ / Remote'}
                      className={`w-full pl-9 pr-24 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm ${
                        locationMode === 'live' ? 'border-cyan-500/50 bg-cyan-950/20' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleDetectLiveLocation}
                      disabled={isDetectingLocation}
                      title="Detect current live location"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold space-x-1 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Detect</span>
                    </button>
                  </div>

                  {locationMode === 'live' && location && (
                    <p className="mt-1 text-[11px] text-emerald-400 flex items-center">
                      <Check className="w-3 h-3 mr-1" /> Live GPS Location active
                    </p>
                  )}

                  {locationGeoError && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" /> {locationGeoError}
                    </p>
                  )}
                </div>
              )}

              {activeRoleConfig.fields.includes('linkedin') && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>LinkedIn Profile URL</span>
                    <span className="text-[10px] text-cyan-400 font-normal">Optional</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Globe className="w-4 h-4" />
                    </span>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/charlie-brown"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {activeRoleConfig.fields.includes('bio') && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>Professional Bio & Key Focus Areas</span>
                    <span className="text-[10px] text-cyan-400 font-normal">Optional</span>
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 flex items-center text-slate-500">
                      <FileText className="w-4 h-4" />
                    </span>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief overview of primary skills, domain expertise, and professional goals..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !isOtpVerified}
              className="w-full py-3.5 px-4 bg-white hover:bg-zinc-200 text-black font-extrabold rounded-xl shadow-lg transition duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Creating Account...' : `Register as ${role.replace('_', ' ')}`}</span>
            </button>
            {!isOtpVerified && (
              <p className="text-[11px] text-amber-400 text-center mt-2.5 font-medium">
                * Please click "Send OTP" and verify the 6-digit code sent to your email to enable registration.
              </p>
            )}
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#0b0c16] px-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest absolute">or</span>
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
            <span>Instant Register with Google OAuth2</span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}


