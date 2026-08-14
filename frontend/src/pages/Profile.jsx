import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Mail, 
  Briefcase, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Shield, 
  Users,
  CheckCircle2,
  Sparkles,
  Edit3,
  Lock,
  Printer,
  Save,
  Phone,
  MapPin,
  Globe,
  Check,
  X,
  ExternalLink,
  Navigation,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function Profile() {
  const { user, updateUser, changePassword, setup2FA, verifySetup2FA, disable2FA, fetchSecurityLogs, deleteAccount } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [userGaps, setUserGaps] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [mentorshipMatches, setMentorshipMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tab state: 'overview' | 'edit' | 'activity' | 'security'
  const [activeTab, setActiveTab] = useState('overview');

  // Edit form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [locationMode, setLocationMode] = useState('manual');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationGeoError, setLocationGeoError] = useState('');
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [education, setEducation] = useState('');
  const [certifications, setCertifications] = useState('');
  const [isAvailableForMentorship, setIsAvailableForMentorship] = useState(true);

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

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Security Tab State
  const [securityLogs, setSecurityLogs] = useState([]);
  const [is2faModalOpen, setIs2faModalOpen] = useState(false);
  const [mfaData, setMfaData] = useState(null);
  const [mfaVerifyCode, setMfaVerifyCode] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [changePassNew, setChangePassNew] = useState('');
  const [changePassConfirm, setChangePassConfirm] = useState('');
  const [secMsg, setSecMsg] = useState('');
  const [secErr, setSecErr] = useState('');

  // Delete Account State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Inline Rating State
  const [ratings, setRatings] = useState({});
  const fetchProfile = async () => {
    try {
      const profRes = await API.get('/users/profile');
      setProfileData(profRes.data);
      const currentSkills = profRes.data.skills || [];

      // Prepopulate edit form
      const u = profRes.data.user || user;
      setFullName(u.fullName || '');
      setEmail(u.email || '');
      setTitle(u.title || '');
      setDepartment(u.department || 'Engineering');
      setPhone(u.phone || '');
      setLocation(u.location || '');
      setBio(u.bio || '');
      setLinkedinUrl(u.linkedinUrl || '');
      setWorkExperience(u.workExperience || '');
      setEducation(u.education || '');
      setCertifications(u.certifications || '');
      setIsAvailableForMentorship(u.isAvailableForMentorship !== false);

      // Prepopulate ratings map
      const rMap = {};
      currentSkills.forEach(s => {
        if (s.source === 'SELF') {
          rMap[s.skill.id] = s.proficiencyLevel;
        }
      });
      setRatings(rMap);

      const gapsRes = await API.get('/gaps/my');
      setUserGaps(gapsRes.data);

      const enrollRes = await API.get('/progress/my');
      setEnrollments(enrollRes.data);

      const skillsRes = await API.get('/skills');
      setAllSkills(skillsRes.data);

      const matchesRes = await API.get('/mentorship/matches');
      setMentorshipMatches(matchesRes.data);

      const logsRes = await fetchSecurityLogs();
      if (logsRes.success) {
        setSecurityLogs(logsRes.logs);
      }
    } catch (err) {
      console.error('Error fetching profile information:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOpen2FA = async () => {
    setSecErr('');
    setSecMsg('');
    const res = await setup2FA();
    if (res.success) {
      setMfaData(res.data);
      setIs2faModalOpen(true);
    } else {
      setSecErr(res.error);
    }
  };

  const handleConfirm2FA = async (e) => {
    e.preventDefault();
    setSecErr('');
    const res = await verifySetup2FA(userObj?.username || user?.username, mfaVerifyCode);
    if (res.success) {
      setSecMsg('2FA has been successfully enabled!');
      setIs2faModalOpen(false);
      setMfaVerifyCode('');
      fetchProfile();
    } else {
      setSecErr(res.error);
    }
  };

  const handleDisable2FA = async () => {
    setSecErr('');
    setSecMsg('');
    const res = await disable2FA();
    if (res.success) {
      setSecMsg('2FA has been disabled.');
      fetchProfile();
    } else {
      setSecErr(res.error);
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    setSecErr('');
    setSecMsg('');

    if (changePassNew !== changePassConfirm) {
      setSecErr('New password and confirmation do not match.');
      return;
    }

    const res = await changePassword(currentPass, changePassNew);
    if (res.success) {
      setSecMsg('Password updated successfully!');
      setCurrentPass('');
      setChangePassNew('');
      setChangePassConfirm('');
      const logsRes = await fetchSecurityLogs();
      if (logsRes.success) setSecurityLogs(logsRes.logs);
    } else {
      setSecErr(res.error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess('');
    setProfileError('');

    if (newPassword && newPassword !== confirmPassword) {
      setProfileError('New password and confirm password do not match.');
      setSavingProfile(false);
      return;
    }

    try {
      const res = await API.put('/users/profile', {
        fullName,
        email,
        title,
        department,
        phone,
        location,
        bio,
        linkedinUrl,
        workExperience,
        education,
        certifications,
        isAvailableForMentorship,
        newPassword: newPassword || undefined
      });

      updateUser(res.data);
      setProfileSuccess('Profile details updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      fetchProfile();
    } catch (err) {
      setProfileError(err.response?.data || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleInlineRate = async (skillId, level) => {
    setSavingRating(true);
    const updatedRatings = { ...ratings, [skillId]: level };
    setRatings(updatedRatings);

    const ratingsArray = Object.keys(updatedRatings).map(sId => ({
      skillId: parseInt(sId),
      level: updatedRatings[sId]
    }));

    try {
      await API.post('/users/assess', { ratings: ratingsArray });
      fetchProfile(); // Refresh gap metrics dynamically
    } catch (err) {
      console.error('Failed to update rating:', err);
    } finally {
      setSavingRating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userObj = profileData?.user || user;
  const userSkills = profileData?.skills || [];

  const getLevelColor = (level) => {
    switch (level) {
      case 0: return 'bg-slate-800 text-slate-400';
      case 1: return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 2: return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 3: return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
      setDeleteError('Please type "DELETE" to confirm account deletion.');
      return;
    }

    setDeletingAccount(true);
    setDeleteError('');
    const res = await deleteAccount();
    setDeletingAccount(false);

    if (res.success) {
      window.location.href = '/login';
    } else {
      setDeleteError(res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in print:max-w-none print:p-0">
      {/* Top Banner Card */}
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-5">
            <div className="w-20 h-20 rounded-2xl bg-white text-black font-black flex items-center justify-center text-3xl shadow-xl border border-zinc-200 flex-shrink-0">
              {userObj?.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                <h2 className="text-2xl font-bold text-zinc-100">{userObj?.fullName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-white border border-zinc-700">
                  {userObj?.role?.replace('_', ' ')}
                </span>
                {userObj?.isAvailableForMentorship !== false ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Open to Mentor
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    Mentorship Busy
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-400 mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="flex items-center"><Briefcase className="w-4 h-4 text-slate-500 mr-1" />{userObj?.title}</span>
                <span>•</span>
                <span className="flex items-center"><Users className="w-4 h-4 text-slate-500 mr-1" />{userObj?.department}</span>
                {userObj?.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center text-slate-300"><MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1" />{userObj?.location}</span>
                  </>
                )}
              </p>

              <div className="flex items-center space-x-4 text-xs text-slate-400 mt-2 flex-wrap gap-y-1">
                <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />{userObj?.email}</span>
                {userObj?.phone && (
                  <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-slate-500" />{userObj?.phone}</span>
                )}
                {userObj?.linkedinUrl && (
                  <a href={userObj.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center text-cyan-400 hover:underline">
                    <Globe className="w-3.5 h-3.5 mr-1" />Portfolio <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>

              {userObj?.bio && (
                <p className="text-xs text-slate-300 mt-3 max-w-2xl bg-slate-900/60 p-3 rounded-xl border border-slate-800 italic leading-relaxed">
                  "{userObj?.bio}"
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="glass-panel px-4 py-2.5 rounded-xl text-center border border-slate-800">
              <span className="block text-xl font-bold text-cyan-400">{userSkills.length}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Assessed Skills</span>
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl text-center border border-slate-800">
              <span className="block text-xl font-bold text-rose-400">{userGaps.length}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Gaps</span>
            </div>
            <div className="glass-panel px-4 py-2.5 rounded-xl text-center border border-slate-800">
              <span className="block text-xl font-bold text-emerald-400">
                {enrollments.filter(e => e.status === 'COMPLETED').length}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Courses Done</span>
            </div>
            <button
              onClick={handlePrint}
              className="p-3 glass-panel hover:bg-slate-800 text-slate-300 rounded-xl transition duration-150 print:hidden"
              title="Print Profile Summary"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-4 print:hidden">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition duration-150 ${
            activeTab === 'overview'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Competency & Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition duration-150 ${
            activeTab === 'edit'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile & Contact Details</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition duration-150 ${
            activeTab === 'activity'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learning & Mentorship Activity</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition duration-150 ${
            activeTab === 'security'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security & 2FA Settings</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & PORTFOLIO */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Inventory Portfolio */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-200 flex items-center">
                <Award className="w-5 h-5 mr-2 text-cyan-400" />
                Competency & Skill Portfolio
              </h3>
              <span className="text-xs text-slate-400">Quick Skill Adjuster</span>
            </div>

            {allSkills.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No skills available.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {allSkills.map((skillItem) => {
                  const currentLevel = ratings[skillItem.id] || 0;
                  return (
                    <div key={skillItem.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                            {skillItem.category}
                          </span>
                          <h4 className="font-bold text-slate-200 text-sm mt-1">{skillItem.name}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${getLevelColor(currentLevel)}`}>
                          L{currentLevel}
                        </span>
                      </div>

                      {/* Level Adjustment Buttons */}
                      <div className="grid grid-cols-5 gap-1.5 mt-3">
                        {[0, 1, 2, 3, 4].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => handleInlineRate(skillItem.id, lvl)}
                            className={`py-1 rounded text-xs font-bold border transition duration-150 ${
                              currentLevel === lvl
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                                : 'border-slate-800 bg-slate-950/40 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                            }`}
                          >
                            L{lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detected Skill Gaps & Benchmarks */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-200 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-rose-400" />
                Detected Skill Gaps
              </h3>
              <span className="text-xs text-slate-400">{userGaps.length} Gaps Active</span>
            </div>

            {userGaps.length === 0 ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 text-emerald-400" />
                <span>Great job! No skill gaps detected for your target role benchmarks.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {userGaps.map((gap, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{gap.skill?.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target Level: <strong className="text-slate-300">L{gap.requiredLevel}</strong> | Current: <strong className="text-cyan-400">L{gap.currentLevel}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        gap.severity === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                        gap.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      }`}>
                        Gap -{gap.gapScore} ({gap.severity})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* User Meta Information Card */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1">
                <span>Username:</span>
                <span className="font-semibold text-slate-200">{userObj?.username}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Phone Number:</span>
                <span className="font-semibold text-slate-200">{userObj?.phone || 'Not specified'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Location:</span>
                <span className="font-semibold text-slate-200">{userObj?.location || 'Not specified'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Department:</span>
                <span className="font-semibold text-slate-200">{userObj?.department}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Access Permission:</span>
                <span className="font-semibold text-cyan-400">{userObj?.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EDIT PROFILE & CONTACT DETAILS */}
      {activeTab === 'edit' && (
        <div className="glass-panel p-8 rounded-2xl max-w-3xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-slate-200 flex items-center">
            <Edit3 className="w-5 h-5 mr-2 text-cyan-400" />
            Update Profile & Contact Details
          </h3>
          <p className="text-xs text-slate-400">
            Edit your personal account parameters, phone number, location, bio, or update your security credentials.
          </p>

          {profileSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {profileSuccess}
            </div>
          )}

          {profileError && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
              {profileError}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  placeholder="+1 (555) 019-2834"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Office / City Location
                  </label>
                  <div className="flex items-center space-x-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
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
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setLocationMode('manual');
                    }}
                    placeholder={locationMode === 'live' ? 'Detecting location...' : 'San Francisco HQ / Remote'}
                    className={`w-full pl-4 pr-20 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 text-sm ${
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
                    <span>Detect</span>
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

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input bg-[#0f172a] focus:border-cyan-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Product">Product</option>
                  <option value="Executive">Executive</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Portfolio / LinkedIn URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  placeholder="https://linkedin.com/in/yourprofile"
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Professional Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  placeholder="Tell colleagues about your core strengths, experience, and learning goals..."
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Open to Peer Mentorship</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Allow colleagues to request mentorship sessions for skills you master.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAvailableForMentorship(!isAvailableForMentorship)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                    isAvailableForMentorship
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isAvailableForMentorship ? 'Available' : 'Busy'}
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h4 className="font-bold text-sm text-slate-300 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-indigo-400" />
                Change Password (Optional)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="Leave empty to keep current password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Re-type new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-slate-200 glass-input focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg transition duration-150 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: ACTIVITY & ACHIEVEMENTS */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Training Enrollments */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-200 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-cyan-400" />
              Training Enrollments & Progress
            </h3>

            {enrollments.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No active or completed course enrollments.</p>
            ) : (
              <div className="space-y-4">
                {enrollments.map((e) => (
                  <div key={e.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        {e.course?.provider}
                      </span>
                      <h4 className="font-bold text-slate-200 text-sm mt-1">{e.course?.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Skill: {e.course?.skill?.name}</p>
                    </div>

                    <div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        e.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      }`}>
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mentorship Connections */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-slate-200 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-400" />
              Mentorship Connections
            </h3>

            {mentorshipMatches.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">No active or pending mentorship pairings.</p>
            ) : (
              <div className="space-y-4">
                {mentorshipMatches.map((m) => {
                  const isMentor = m.mentor?.id === userObj?.id;
                  const partner = isMentor ? m.mentee : m.mentor;
                  return (
                    <div key={m.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                          {isMentor ? 'Mentoring' : 'Mentored By'}
                        </span>
                        <h4 className="font-bold text-slate-200 text-sm mt-1">{partner?.fullName}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Skill: {m.skill?.name}</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        m.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY & 2FA SETTINGS */}
      {activeTab === 'security' && (
        <div className="space-y-8">
          {secMsg && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span>{secMsg}</span>
            </div>
          )}

          {secErr && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center">
              <X className="w-5 h-5 mr-2" />
              <span>{secErr}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 2FA Card */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-200 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                    Two-Factor Authentication (2FA)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Adds an extra layer of security using a 6-digit OTP code when signing in.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Status</span>
                  {userObj?.is2faEnabled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 2FA Enabled & Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      2FA Disabled
                    </span>
                  )}
                </div>

                {userObj?.is2faEnabled ? (
                  <button
                    onClick={handleDisable2FA}
                    className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition"
                  >
                    Disable 2FA
                  </button>
                ) : (
                  <button
                    onClick={handleOpen2FA}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg transition"
                  >
                    Enable 2FA
                  </button>
                )}
              </div>
            </div>

            {/* Change Password Card */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-200 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-indigo-400" />
                Change Account Password
              </h3>

              <form onSubmit={handleChangePass} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={changePassNew}
                    onChange={(e) => setChangePassNew(e.target.value)}
                    placeholder="Min 8 chars, Upper, Lower, Special..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={changePassConfirm}
                    onChange={(e) => setChangePassConfirm(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          {/* Security Audit Logs */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-200 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-cyan-400" />
              Recent Security & Login Audit History
            </h3>
            {securityLogs.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">No security audit records logged yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/60 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Event Action</th>
                      <th className="px-4 py-3">Performed By</th>
                      <th className="px-4 py-3">Details</th>
                      <th className="px-4 py-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {securityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/40">
                        <td className="px-4 py-3 font-bold text-cyan-400">{log.action}</td>
                        <td className="px-4 py-3 text-slate-300">{log.performedBy}</td>
                        <td className="px-4 py-3 text-slate-400">{log.details}</td>
                        <td className="px-4 py-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Danger Zone: Delete Account */}
          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-red-950/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-red-400 flex items-center">
                  <X className="w-5 h-5 mr-2 text-red-500" />
                  Danger Zone — Permanently Delete Account
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Once deleted, your profile, enrolled courses, skill history, and security logs will be permanently removed. This action cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmText('');
                  setDeleteError('');
                  setIsDeleteModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-950/50 transition whitespace-nowrap"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl space-y-4 relative">
            <h3 className="text-xl font-bold text-red-400">Confirm Account Deletion</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete your account (<strong className="text-slate-100">{user?.email}</strong>)? This action is permanent and cannot be reversed.
            </p>

            {deleteError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl">
                {deleteError}
              </div>
            )}

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                  Type <strong className="text-red-400">DELETE</strong> to confirm
                </label>
                <input
                  type="text"
                  required
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deletingAccount}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-sm"
                >
                  {deletingAccount ? 'Deleting...' : 'Permanently Delete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {is2faModalOpen && mfaData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-4">
            <h3 className="text-xl font-bold text-slate-100">Setup Two-Factor Authentication</h3>
            <p className="text-xs text-slate-400">
              Scan the QR code with your Authenticator app (e.g. Google Authenticator) or copy the manual key code.
            </p>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl">
              <img src={mfaData.qrCodeUrl} alt="2FA QR Code" className="w-44 h-44 object-contain" />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">Secret Key</span>
              <code className="text-sm font-mono text-cyan-400 select-all">{mfaData.manualCode}</code>
            </div>

            <form onSubmit={handleConfirm2FA} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaVerifyCode}
                  onChange={(e) => setMfaVerifyCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-center text-lg font-mono text-cyan-300 tracking-[0.3em] focus:border-cyan-500"
                />
                <p className="text-[11px] text-slate-500 mt-1 text-center">Tip: Use demo code <code className="text-cyan-400">123456</code> to verify</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIs2faModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm"
                >
                  Verify & Enable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
