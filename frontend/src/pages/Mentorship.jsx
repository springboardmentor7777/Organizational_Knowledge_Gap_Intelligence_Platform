import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  PlusCircle, 
  Send, 
  X, 
  Check, 
  XCircle, 
  MessageSquare,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';

export default function Mentorship() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('find'); // 'find' | 'sessions'

  const [mentors, setMentors] = useState([]);
  const [mySessions, setMySessions] = useState({ asMentee: [], asMentor: [] });
  const [loading, setLoading] = useState(true);

  // Mentor Focus Mode Toggle State
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Session Booking Modal State
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('14:00');
  const [topic, setTopic] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Post-Session Rating Modal State
  const [ratingSession, setRatingSession] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingFeedback, setRatingFeedback] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchMentorsAndSessions = async () => {
    setLoading(true);
    try {
      const [expertsRes, sessionsRes] = await Promise.all([
        API.get('/skills/experts'),
        API.get('/mentorship/my-sessions')
      ]);

      setMentors(expertsRes.data.filter(m => m.id !== user.id));
      setMySessions(sessionsRes.data || { asMentee: [], asMentor: [] });
    } catch (err) {
      console.error('Failed to load mentorship data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorsAndSessions();

    // Default tomorrow date for booking
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduledDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleOpenBooking = (mentor) => {
    setSelectedMentor(mentor);
    if (mentor.expertSkills && mentor.expertSkills.length > 0) {
      setSelectedSkillId(mentor.expertSkills[0].skillId);
    } else {
      setSelectedSkillId('');
    }
    setTopic('');
  };

  const handleConfirmSchedule = async (e) => {
    e.preventDefault();
    if (!selectedSkillId) {
      showToast('Please select a skill topic for the session', 'error');
      return;
    }

    setSubmittingBooking(true);
    try {
      const fullScheduledTime = `${scheduledDate} ${scheduledTime}`;
      await API.post('/mentorship/schedule', {
        mentorId: selectedMentor.id,
        skillId: Number(selectedSkillId),
        scheduledTime: fullScheduledTime,
        topic: topic
      });

      showToast(`Mentorship session requested! Waiting for ${selectedMentor.fullName}'s approval.`);
      setSelectedMentor(null);
      fetchMentorsAndSessions();
      setActiveTab('sessions');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to schedule session', 'error');
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleApproveSession = async (sessionId, approved) => {
    try {
      const res = await API.post('/mentorship/approve-session', {
        sessionId: sessionId,
        approved: approved
      });
      showToast(res.data.message);
      fetchMentorsAndSessions();
    } catch (err) {
      showToast('Failed to update session status', 'error');
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!ratingSession) return;

    setSubmittingRating(true);
    try {
      await API.post('/mentorship/rate-session', {
        sessionId: ratingSession.id,
        rating: Number(ratingScore),
        feedback: ratingFeedback
      });

      showToast('Thank you for rating your mentorship session!');
      setRatingSession(null);
      fetchMentorsAndSessions();
    } catch (err) {
      showToast('Failed to submit session rating', 'error');
    } finally {
      setSubmittingRating(false);
    }
  };

  const pendingApprovalsCount = (mySessions.asMentor || []).filter(s => s.status === 'PENDING_APPROVAL').length;
  const activeConfirmedCount = [...(mySessions.asMentee || []), ...(mySessions.asMentor || [])].filter(s => s.status === 'CONFIRMED').length;

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-7xl mx-auto">
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all transform animate-bounce ${
          toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Peer Guidance & Coaching
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Mentor Hub
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Connect with verified domain experts for 1-on-1 coaching sessions. Enjoy zero-stress 24-hour advance scheduling, virtual room links, and mentor rating badges.
          </p>
        </div>

        {/* Zero-Stress Mentor Control Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3 shrink-0 w-full md:w-auto">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between gap-4">
            <span>My Mentorship Status</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              !isFocusMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}>
              {!isFocusMode ? '🟢 Available' : '🔴 Focus Mode'}
            </span>
          </div>

          <button
            onClick={() => {
              setIsFocusMode(!isFocusMode);
              showToast(!isFocusMode ? 'Focus Mode activated (Requests paused)' : 'Mentorship status: Available');
            }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
              !isFocusMode
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-rose-600 hover:bg-rose-500 border-rose-500 text-white shadow-lg'
            }`}
          >
            {!isFocusMode ? 'Pause Incoming Requests' : 'Resume Availability'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('find')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'find'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Find Mentor ({mentors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'sessions'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>My Sessions ({activeConfirmedCount + pendingApprovalsCount})</span>
          {pendingApprovalsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>
      </div>

      {/* TAB 1: FIND MENTOR */}
      {activeTab === 'find' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/50 flex items-center gap-3 text-xs text-indigo-200">
            <Info className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <span className="font-bold">Zero-Stress Protection: </span>
              Mentors receive your request in advance. Meetings require a 24-hour notice period and mentor approval before virtual rooms are activated.
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-60 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : mentors.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-3">
              <Users className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-300">No Other Mentors Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Check back soon as colleagues level up their skills and join the Mentor Hub.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all shadow-md group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        {mentor.avatarUrl ? (
                          <img src={mentor.avatarUrl} alt={mentor.fullName} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {mentor.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                            {mentor.fullName}
                          </h3>
                          <p className="text-xs text-slate-400">{mentor.title}</p>
                          <p className="text-[11px] text-slate-500">{mentor.department}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>4.9</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Expertise Topics</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(mentor.expertSkills || []).map((sk, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60">
                            {sk.skillName} (L{sk.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> 24h Advance Notice
                    </span>
                    <button
                      onClick={() => handleOpenBooking(mentor)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1"
                    >
                      <span>Book Session</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="space-y-8">
          {/* Pending Requests for Me as Mentor */}
          {mySessions.asMentor && mySessions.asMentor.filter(s => s.status === 'PENDING_APPROVAL').length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> Pending Session Requests (Requires Your Approval)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mySessions.asMentor.filter(s => s.status === 'PENDING_APPROVAL').map((s) => (
                  <div key={s.id} className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100">{s.menteeName}</h4>
                        <p className="text-xs text-indigo-300 font-semibold">Topic: {s.skillName}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        Pending
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div>Requested Time: <strong className="text-white">{s.scheduledTime}</strong></div>
                      {s.topic && <div className="mt-1 text-slate-400 italic">"{s.topic}"</div>}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => handleApproveSession(s.id, false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApproveSession(s.id, true)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-md shadow-emerald-600/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Generate Room</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Confirmed Sessions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-400" /> Confirmed & Active Sessions
            </h3>

            {[...(mySessions.asMentee || []), ...(mySessions.asMentor || [])].filter(s => s.status === 'CONFIRMED').length === 0 ? (
              <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 text-slate-500 text-sm">
                No active confirmed mentorship sessions at this time.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...(mySessions.asMentee || []), ...(mySessions.asMentor || [])].filter(s => s.status === 'CONFIRMED').map((s) => (
                  <div key={s.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100">{s.topic || s.skillName}</h4>
                        <p className="text-xs text-slate-400">Mentor: {s.mentorName} • Mentee: {s.menteeName}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        Confirmed
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" /> {s.scheduledTime}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <a
                        href={s.virtualRoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Virtual Room</span>
                      </a>

                      {s.menteeId === user.id && (
                        <button
                          onClick={() => {
                            setRatingSession(s);
                            setRatingScore(5);
                            setRatingFeedback('');
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
                        >
                          Rate Session
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button onClick={() => setSelectedMentor(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Book 1-on-1 Session</h3>
                <p className="text-xs text-slate-400">With {selectedMentor.fullName}</p>
              </div>
            </div>

            <form onSubmit={handleConfirmSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Skill Topic
                </label>
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  required
                >
                  {(selectedMentor.expertSkills || []).map((sk) => (
                    <option key={sk.skillId} value={sk.skillId}>
                      {sk.skillName} (Level {sk.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Date (24h Notice)
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Time Slot
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Session Topic / Question
                </label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What specific blocker or topic would you like guidance on?"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setSelectedMentor(null)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={submittingBooking} className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50">
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingBooking ? 'Sending...' : 'Request Session'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RATING MODAL */}
      {ratingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button onClick={() => setRatingSession(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              <h3 className="text-lg font-bold text-white">Rate Mentorship Session</h3>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setRatingScore(num)}
                    className={`py-3 rounded-xl font-bold text-sm border transition-all flex flex-col items-center gap-1 ${
                      ratingScore === num
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${ratingScore === num ? 'fill-white' : ''}`} />
                    <span>{num}</span>
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
                placeholder="Constructive feedback for mentor..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none"
              />

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setRatingSession(null)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={submittingRating} className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md disabled:opacity-50">
                  {submittingRating ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
