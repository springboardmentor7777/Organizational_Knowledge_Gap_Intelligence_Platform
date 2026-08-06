import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  UserPlus, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  Sparkles,
  Award,
  Video,
  ExternalLink,
  MessageSquare,
  Globe,
  Search,
  Phone,
  Star,
  FileText,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';

export default function Mentorship() {
  const { user } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [expertSearch, setExpertSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Mentorship Pairing Request Modal State
  const [selectedExpertModal, setSelectedExpertModal] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState('');

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Session form state
  const [activeMatchId, setActiveMatchId] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState(60);

  // Active Session Room Modal State
  const [activeSessionRoom, setActiveSessionRoom] = useState(null);

  // Post-Meeting Feedback & Summary Modal State
  const [completionModalSession, setCompletionModalSession] = useState(null);
  const [sessionRating, setSessionRating] = useState(5);
  const [sessionNotes, setSessionNotes] = useState('');

  const fetchMentorshipData = async () => {
    try {
      const optionsRes = await API.get('/mentorship/options');
      setOptions(optionsRes.data);

      const matchesRes = await API.get('/mentorship/matches');
      setMatches(matchesRes.data);

      const sessionsRes = await API.get('/mentorship/sessions');
      setSessions(sessionsRes.data);

      const usersRes = await API.get('/users');
      setAllUsers(usersRes.data || []);

      const skillsRes = await API.get('/skills');
      setAllSkills(skillsRes.data || []);
    } catch (err) {
      console.error('Error fetching mentorship info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorshipData();
  }, []);

  const handleRequestMatch = async (mentorId, skillId) => {
    try {
      await API.post(`/mentorship/request?mentorId=${mentorId}&skillId=${Number(skillId)}`);
      showToast('Mentorship request sent! The mentor will be notified.');
      fetchMentorshipData();
    } catch (err) {
      console.error('Error requesting match:', err);
      showToast('Failed to send request. Please try again.', 'error');
    }
  };

  const handleAcceptDecline = async (matchId, accept) => {
    const status = accept ? 'ACTIVE' : 'DECLINED';
    try {
      await API.put(`/mentorship/match/${matchId}?status=${status}`);
      alert(`Match request ${status.toLowerCase()}!`);
      fetchMentorshipData();
    } catch (err) {
      console.error('Error updating match:', err);
    }
  };

  const handleScheduleSession = async (e) => {
    e.preventDefault();
    if (!activeMatchId || !sessionTitle || !scheduledAt) return;

    try {
      await API.post(`/mentorship/sessions?matchId=${activeMatchId}&title=${sessionTitle}&time=${scheduledAt}&duration=${duration}`);
      showToast('Mentorship session scheduled successfully!');
      setSessionTitle('');
      setScheduledAt('');
      setActiveMatchId('');
      fetchMentorshipData();
    } catch (err) {
      console.error('Error scheduling session:', err);
      showToast('Failed to schedule session.', 'error');
    }
  };

  const handleCompleteSession = async (e) => {
    if (e) e.preventDefault();
    if (!completionModalSession) return;
    try {
      await API.post(`/mentorship/sessions/${completionModalSession.id}/complete`, {
        notes: sessionNotes,
        rating: sessionRating
      });
      showToast('Meeting completed & feedback saved successfully!');
      setCompletionModalSession(null);
      setSessionNotes('');
      setSessionRating(5);
      fetchMentorshipData();
    } catch (err) {
      try {
        await API.put(`/mentorship/sessions/${completionModalSession.id}/complete`, {
          notes: sessionNotes,
          rating: sessionRating
        });
        showToast('Meeting completed & feedback saved successfully!');
        setCompletionModalSession(null);
        setSessionNotes('');
        setSessionRating(5);
        fetchMentorshipData();
      } catch (err2) {
        console.error('Error completing session:', err2);
        const isAuthErr = err2.response?.status === 401 || err.response?.status === 401;
        if (isAuthErr) {
          showToast('Your login session expired. Redirecting to login...', 'error');
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/login';
          }, 1500);
        } else {
          showToast(err2.response?.data?.message || err.response?.data?.message || 'Failed to save completion feedback.', 'error');
        }
      }
    }
  };

  const handleCancelSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to cancel this mentorship session?')) return;
    try {
      await API.put(`/mentorship/sessions/${sessionId}/cancel`);
      showToast('Session cancelled.');
      fetchMentorshipData();
    } catch (err) {
      console.error('Error cancelling session:', err);
      showToast('Failed to cancel session.', 'error');
    }
  };

  const openVideoRoom = (session) => {
    setActiveSessionRoom(session);
  };

  const closeVideoRoom = useCallback(() => {
    if (window._jitsiApi) {
      window._jitsiApi.dispose();
      window._jitsiApi = null;
    }
    const currentSession = activeSessionRoom;
    setActiveSessionRoom(null);
    if (currentSession) {
      setCompletionModalSession(currentSession);
    }
  }, [activeSessionRoom]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Separate incoming vs outgoing vs active matches
  const incomingMatches = matches.filter(m => m.mentor.id === user.id && m.status === 'PENDING');
  const outgoingMatches = matches.filter(m => m.mentee.id === user.id && m.status === 'PENDING');
  const activeMatches = matches.filter(m => m.status === 'ACTIVE');

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold animate-fade-in ${
          toast.type === 'error'
            ? 'bg-rose-600 text-white border border-rose-400'
            : 'bg-emerald-600 text-white border border-emerald-400'
        }`}>
          {toast.type === 'error' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          <span>{toast.msg}</span>
        </div>
      )}
      
      {/* Incoming Match Requests (Action needed) */}
      {incomingMatches.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500">
          <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-amber-400" />
            Incoming Mentorship Requests
          </h3>
          <div className="space-y-4">
            {incomingMatches.map(match => (
              <div key={match.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">{match.mentee.fullName}</h4>
                  <p className="text-xs text-slate-400">Department: {match.mentee.department} | Skill: {match.skill.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleAcceptDecline(match.id, true)}
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg border border-emerald-500/20 transition duration-150"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleAcceptDecline(match.id, false)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg border border-rose-500/20 transition duration-150"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outgoing Pending Requests (Sent by current user, awaiting mentor approval) */}
      {outgoingMatches.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500">
          <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-cyan-400" />
            Your Pending Mentorship Requests
          </h3>
          <div className="space-y-3">
            {outgoingMatches.map(match => (
              <div key={match.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">{match.mentor.fullName}</h4>
                  <p className="text-xs text-slate-400">Skill: <span className="text-cyan-400 font-semibold">{match.skill.name}</span> • {match.mentor.department}</p>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 flex items-center space-x-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Awaiting Approval
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Options vs Active/Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Options lists: Find a Mentor */}
        <div className="xl:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
              Expert Peer Recommendations
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              AI-driven peer recommendations based on complementaries in your skills and team availability.
            </p>

            <div className="space-y-4">
              {options.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  No mentorship recommendation options available. (Self ratings up-to-date)
                </div>
              ) : (
                options.map((opt, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/30 border border-slate-800 rounded-2xl hover:border-slate-700 transition duration-150 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{opt.mentor.fullName}</h4>
                      <p className="text-xs text-slate-400 mt-1">{opt.mentor.title} ({opt.mentor.department})</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/25">
                          {opt.skill.name} (Expert Level: {opt.mentorLevel})
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold">
                          Your Gap: {opt.gapScore}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRequestMatch(opt.mentor.id, opt.skill.id)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-xl font-semibold text-xs text-white shadow-lg transition duration-150 flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Request Pairing
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Internal Subject-Matter Expert Directory */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-200 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-indigo-400" />
                  Internal Subject-Matter Expert Directory
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Search internal domain experts, senior mentors, and specialists across departments.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={expertSearch}
                  onChange={(e) => setExpertSearch(e.target.value)}
                  placeholder="Search expert by name, title, dept..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {allUsers
                .filter(u => u.isAvailableForMentorship || u.role === 'MANAGER' || u.role === 'HR_SPECIALIST' || u.role === 'ADMIN' || u.id !== user.id)
                .filter(u => u.id !== user.id)
                .filter(u => {
                  const query = expertSearch.toLowerCase();
                  return (u.fullName || '').toLowerCase().includes(query) ||
                         (u.title || '').toLowerCase().includes(query) ||
                         (u.department || '').toLowerCase().includes(query);
                })
                .slice(0, 8)
                .map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start justify-between gap-3 hover:border-indigo-500/40 transition shadow-md">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {exp.fullName?.charAt(0) || exp.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-200 text-xs truncate">{exp.fullName}</h4>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                            {exp.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{exp.title || 'Subject Matter Expert'}</p>
                        <p className="text-[10px] text-cyan-400 mt-1 font-semibold">{exp.department}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedExpertModal(exp);
                        setSelectedSkillId(allSkills[0]?.id || '');
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-bold text-xs shadow transition flex items-center space-x-1 cursor-pointer flex-shrink-0"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Request</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right side: Active Matches & Schedule Sessions */}
        <div className="space-y-8">
          
          {/* Active Matches & Session Scheduler */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
              Schedule a Meeting
            </h3>
            
            {activeMatches.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No active mentorship matches to schedule meetings.</p>
            ) : (
              <form onSubmit={handleScheduleSession} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Mentor Pairing
                  </label>
                  <select
                    required
                    value={activeMatchId}
                    onChange={(e) => setActiveMatchId(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-slate-200 glass-input bg-[#0f172a] rounded-lg focus:border-cyan-500"
                  >
                    <option value="">Select an active pairing</option>
                    {activeMatches.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.mentor.id === user.id ? `Mentoring: ${m.mentee.fullName}` : `Mentor: ${m.mentor.fullName}`} ({m.skill.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    placeholder="e.g., Code review session"
                    className="w-full px-3 py-2 text-sm text-slate-200 glass-input rounded-lg focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-slate-200 glass-input rounded-lg focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-sm text-slate-200 glass-input bg-[#0f172a] rounded-lg focus:border-cyan-500"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                    <option value={120}>120 Minutes</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition duration-150"
                >
                  Schedule Session
                </button>
              </form>
            )}
          </div>

          {/* Scheduled & Completed Sessions list */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                  Scheduled Sessions
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                  {sessions.filter(s => s.status === 'SCHEDULED' || s.status === 'IN_PROGRESS').length} Active
                </span>
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {sessions.filter(s => s.status === 'SCHEDULED' || s.status === 'IN_PROGRESS').length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No upcoming active sessions scheduled.</p>
                ) : (
                  sessions.filter(s => s.status === 'SCHEDULED' || s.status === 'IN_PROGRESS').map(sess => (
                    <div key={sess.id} className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-3 shadow-md hover:border-cyan-500/30 transition">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-200 text-sm">{sess.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                            {sess.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Pairing: <strong className="text-slate-300">{sess.match.mentor.fullName}</strong> & <strong className="text-slate-300">{sess.match.mentee.fullName}</strong> ({sess.match.skill.name})
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-cyan-400 font-medium">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {new Date(sess.scheduledAt).toLocaleDateString()} at {new Date(sess.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <span className="flex items-center text-slate-400">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {sess.durationMinutes} mins
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => openVideoRoom(sess)}
                          className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-lg font-bold text-xs transition duration-150 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Live Video Room</span>
                        </button>

                        <button
                          onClick={() => setCompletionModalSession(sess)}
                          title="Complete & Add Feedback"
                          className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleCancelSession(sess.id)}
                          title="Cancel Session"
                          className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30 text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Completed Sessions History */}
            {sessions.filter(s => s.status === 'COMPLETED').length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
                  Completed Sessions History ({sessions.filter(s => s.status === 'COMPLETED').length})
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {sessions.filter(s => s.status === 'COMPLETED').map(sess => (
                    <div key={sess.id} className="p-3.5 bg-slate-900/30 border border-slate-800/60 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{sess.title}</span>
                        <div className="flex items-center space-x-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= (sess.rating || 5)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Skill: <span className="text-cyan-400 font-semibold">{sess.match.skill.name}</span> • Mentor: {sess.match.mentor.fullName}
                      </p>
                      {sess.notes && (
                        <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 flex items-start space-x-1.5">
                          <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="italic">{sess.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* REQUEST MENTORSHIP PAIRING MODAL */}
      {selectedExpertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setSelectedExpertModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md flex-shrink-0">
                {selectedExpertModal.fullName?.charAt(0) || selectedExpertModal.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">{selectedExpertModal.fullName}</h3>
                <p className="text-xs text-slate-400">{selectedExpertModal.title || 'Subject Matter Expert'} • {selectedExpertModal.department}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Competency / Skill to Learn:
                </label>
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:border-cyan-400"
                >
                  {allSkills.map(sk => (
                    <option key={sk.id} value={sk.id}>
                      {sk.name} ({sk.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-200">Mentorship Request Details:</p>
                <p>1. {selectedExpertModal.fullName} will receive a notification to approve your 1-on-1 pairing.</p>
                <p>2. Once approved, you can schedule live video sessions together.</p>
              </div>

              <button
                onClick={async () => {
                  if (!selectedSkillId) return;
                  await handleRequestMatch(selectedExpertModal.id, selectedSkillId);
                  setSelectedExpertModal(null);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Send Mentorship Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REAL-TIME VIDEO MEETING ROOM (Embedded Jitsi - like Google Meet / Teams) */}
      {activeSessionRoom && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, background: '#000', display: 'flex', flexDirection: 'column' }}>
          {/* Meeting Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: '#0f172a', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#fff', fontSize: 14, margin: 0 }}>{activeSessionRoom.title}</p>
                <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>Live Mentorship Session • Room ID: okgip-session-{activeSessionRoom.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>LIVE</span>
              </span>
              <button
                onClick={closeVideoRoom}
                style={{ padding: '8px 16px', background: '#e11d48', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Phone className="w-4 h-4" />
                <span>Leave Meeting</span>
              </button>
            </div>
          </div>

          {/* Jitsi Meeting IFrame */}
          <JitsiMeeting
            roomName={`okgip-session-${activeSessionRoom.id}`}
            displayName={user.fullName || user.username}
            onClose={closeVideoRoom}
          />
        </div>,
        document.body
      )}

      {/* POST-MEETING FEEDBACK & COMPLETION MODAL */}
      {completionModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setCompletionModalSession(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 text-white font-black text-lg flex items-center justify-center shadow-md flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Session Completed!</h3>
                <p className="text-xs text-slate-400">{completionModalSession.title} ({completionModalSession.match?.skill?.name})</p>
              </div>
            </div>

            <form onSubmit={handleCompleteSession} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Rate your Mentorship Session:
                </label>
                <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800 justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSessionRating(star)}
                      className="p-1 hover:scale-110 transition cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= sessionRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Takeaways & Action Notes:
                </label>
                <textarea
                  rows={3}
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="What were the key takeaways, learnings, or action items discussed?"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-slate-200">Session Completion Summary:</p>
                <p>Submitting will update the session status to <strong className="text-emerald-400">COMPLETED</strong> and save your rating & key takeaways.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save Feedback & Complete Session</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   JitsiMeeting Component — embeds Jitsi IFrame API
   Works fully like Google Meet / Microsoft Teams (WebRTC)
───────────────────────────────────────────────────────── */
function JitsiMeeting({ roomName, displayName, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let api = null;

    const initJitsi = () => {
      if (!containerRef.current || !window.JitsiMeetExternalAPI) return;

      const domain = 'meet.jit.si';
      const options = {
        roomName,
        parentNode: containerRef.current,
        width: '100%',
        height: '100%',
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          toolbarButtons: [
            'microphone', 'camera', 'closedcaptions', 'desktop',
            'fullscreen', 'fodeviceselection', 'hangup', 'chat',
            'recording', 'raisehand', 'videoquality', 'tileview',
            'participants-pane', 'shortcuts', 'mute-everyone',
          ],
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_ALWAYS_VISIBLE: true,
          DEFAULT_BACKGROUND: '#0f172a',
          APP_NAME: 'OKGIP Mentorship Meeting',
          NATIVE_APP_NAME: 'OKGIP',
          PROVIDER_NAME: 'OKGIP',
          HIDE_INVITE_MORE_HEADER: true,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        },
        userInfo: {
          displayName: displayName || 'User',
        },
      };

      api = new window.JitsiMeetExternalAPI(domain, options);
      window._jitsiApi = api;

      api.addEventListener('readyToClose', onClose);
      api.addEventListener('videoConferenceLeft', onClose);
    };

    // Load Jitsi external API script if not already loaded
    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = initJitsi;
      document.head.appendChild(script);
    }

    return () => {
      if (api) {
        api.dispose();
        window._jitsiApi = null;
      }
    };
  }, [roomName, displayName, onClose]);

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full"
      style={{ minHeight: 0 }}
    />
  );
}
