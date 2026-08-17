import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  Star, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Send, 
  BarChart3, 
  MessageSquare, 
  Sparkles, 
  Info,
  ChevronRight,
  Shield,
  PlusCircle
} from 'lucide-react';

export default function PeerEvaluation() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'summary' | 'request'

  const [pendingEvaluations, setPendingEvaluations] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [summary360, setSummary360] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const fetchSentRequests = async () => {
    try {
      const res = await API.get('/assessments/peer/my-requests');
      setSentRequests(res.data || []);
    } catch (err) {
      console.error('Failed to load sent requests:', err);
    }
  };

  // Active review evaluation form state
  const [activeEvaluation, setActiveEvaluation] = useState(null);
  const [rating, setRating] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Request review state
  const [targetEvaluatorId, setTargetEvaluatorId] = useState('');
  const [targetSkillId, setTargetSkillId] = useState('');
  const [requestingPeer, setRequestingPeer] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPendingEvaluations = async () => {
    setLoadingPending(true);
    try {
      const res = await API.get('/assessments/peer/pending');
      setPendingEvaluations(res.data);
    } catch (err) {
      console.error('Failed to load pending evaluations:', err);
    } finally {
      setLoadingPending(false);
    }
  };

  const fetch360Summary = async () => {
    setLoadingSummary(true);
    try {
      const res = await API.get(`/assessments/360-summary/${user.id}`);
      setSummary360(res.data);
    } catch (err) {
      console.error('Failed to load 360 summary:', err);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchUsersAndSkills = async () => {
    try {
      const [usersRes, skillsRes] = await Promise.all([
        API.get('/users'),
        API.get('/skills')
      ]);
      setAllUsers(usersRes.data.filter(u => u.id !== user.id));
      setAllSkills(skillsRes.data);
    } catch (err) {
      console.error('Failed to load users/skills:', err);
    }
  };

  useEffect(() => {
    fetchPendingEvaluations();
    fetch360Summary();
    fetchUsersAndSkills();
    fetchSentRequests();
  }, []);

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    if (!activeEvaluation) return;

    setSubmittingReview(true);
    try {
      await API.post('/assessments/peer/submit', {
        evaluationId: activeEvaluation.id,
        rating: Number(rating),
        feedback: feedback
      });
      showToast(`Peer evaluation submitted for ${activeEvaluation.evaluateeName}!`);
      setActiveEvaluation(null);
      fetchPendingEvaluations();
      fetch360Summary();
      fetchSentRequests();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit peer evaluation', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleRequestPeerReview = async (e) => {
    e.preventDefault();
    if (!targetEvaluatorId || !targetSkillId) {
      showToast('Please select both a peer reviewer and a skill', 'error');
      return;
    }

    setRequestingPeer(true);
    try {
      await API.post('/assessments/peer/request', {
        evaluatorId: Number(targetEvaluatorId),
        skillId: Number(targetSkillId)
      });
      showToast('360 Peer review request sent successfully!');
      setTargetEvaluatorId('');
      setTargetSkillId('');
      fetchSentRequests();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to send review request', 'error');
    } finally {
      setRequestingPeer(false);
    }
  };

  const rubricLabels = {
    1: '1 - Novice (Basic awareness, needs constant supervision)',
    2: '2 - Developing (Can perform basic tasks independently)',
    3: '3 - Competent (Solid proficiency, meets role expectations)',
    4: '4 - Advanced (Highly skilled, solves complex problems)',
    5: '5 - Expert (Recognized domain authority, mentors others)'
  };

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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 shadow-xl border border-slate-800">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Multi-Perspective Feedback
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            360-Degree Peer Assessments
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Gain unbiased insights into technical capabilities by combining self-ratings, peer feedback, and manager evaluations into a calibrated 360-degree competency score.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Pending Reviews ({pendingEvaluations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>My 360 Score Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('request')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'request'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Request Peer Review</span>
        </button>
      </div>

      {/* TAB 1: PENDING EVALUATIONS */}
      {activeTab === 'pending' && (
        <div className="space-y-6">
          {loadingPending ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-28 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : pendingEvaluations.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-300">All Caught Up!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                You have no pending 360 peer evaluations assigned to you at this time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pendingEvaluations.map((evalItem) => (
                <div
                  key={evalItem.id}
                  className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                        {evalItem.evaluateeName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100">{evalItem.evaluateeName}</h4>
                        <p className="text-xs text-slate-400">{evalItem.evaluateeTitle} • {evalItem.evaluateeDepartment}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Skill to Evaluate</div>
                        <div className="text-sm font-bold text-indigo-300">{evalItem.skillName}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                        {evalItem.skillCategory}
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Assigned Recently
                    </span>
                    <button
                      onClick={() => {
                        setActiveEvaluation(evalItem);
                        setRating(3);
                        setFeedback('');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                    >
                      <span>Complete Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY 360 SCORE BREAKDOWN */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {loadingSummary ? (
            <div className="h-64 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
          ) : !summary360 || !summary360.skills || summary360.skills.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-3">
              <BarChart3 className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-300">No 360 Data Available</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Add skills to your profile or request peer evaluations to see your calibrated 360-degree feedback scores.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Formula Explanatory Card */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/50 flex items-start gap-3.5 text-xs text-indigo-200">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Calibrated 360 Score Formula: </span>
                  Self Rating (30%) + Manager Rating (40%) + Average Peer Rating (30%). This multi-perspective formula eliminates single-evaluator bias.
                </div>
              </div>

              {/* Skills 360 Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {summary360.skills.map((item) => (
                  <div key={item.skillId} className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100 text-lg">{item.skillName}</h4>
                        <span className="text-xs text-slate-400">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-indigo-400">{item.calibrated360Score} / 5.0</div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">360 Calibrated Score</span>
                      </div>
                    </div>

                    {/* Breakdown Bars */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-400">Self Rating (30%)</span>
                          <span className="text-slate-200">{item.selfRating} / 5.0</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(item.selfRating / 5) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-400">Peer Average ({item.peerReviewCount} reviews - 30%)</span>
                          <span className="text-slate-200">{item.peerRatingAvg} / 5.0</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(item.peerRatingAvg / 5) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-400">Manager Benchmark (40%)</span>
                          <span className="text-slate-200">{item.managerRating} / 5.0</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(item.managerRating / 5) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Peer Feedback Comments */}
                    {item.peerFeedbacks && item.peerFeedbacks.length > 0 && (
                      <div className="pt-4 border-t border-slate-800/80 space-y-2">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Qualitative Peer Feedback
                        </div>
                        <div className="space-y-2">
                          {item.peerFeedbacks.map((fb, idx) => {
                            const text = typeof fb === 'object' ? fb.feedback : fb;
                            const author = typeof fb === 'object' && fb.evaluatorName ? fb.evaluatorName : null;
                            return (
                              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/60 text-xs text-slate-300">
                                {author && <span className="font-bold text-indigo-400 not-italic block mb-1">Evaluator: {author}</span>}
                                <span className="italic">"{text}"</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REQUEST PEER REVIEW */}
      {activeTab === 'request' && (
        <div className="max-w-2xl bg-slate-900/60 backdrop-blur border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Invite Peer Evaluator</h3>
              <p className="text-xs text-slate-400">Select a colleague to evaluate one of your key technical skills.</p>
            </div>
          </div>

          <form onSubmit={handleRequestPeerReview} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Colleague (Evaluator)
              </label>
              <select
                value={targetEvaluatorId}
                onChange={(e) => setTargetEvaluatorId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">-- Choose a Colleague --</option>
                {allUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.fullName ? u.fullName : u.username} ({u.department || 'Department'}) - {u.title || 'Team Member'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Skill Domain to be Evaluated
              </label>
              <select
                value={targetSkillId}
                onChange={(e) => setTargetSkillId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">-- Choose a Skill --</option>
                {allSkills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={requestingPeer}
              className="w-full py-3 rounded-xl font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{requestingPeer ? 'Sending Request...' : 'Send Review Request'}</span>
            </button>
          </form>

          {/* Outbound Sent Requests Tracker */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> My Sent Review Requests ({sentRequests.length})
            </h4>

            {sentRequests.length === 0 ? (
              <div className="text-xs text-slate-500 italic">No 360 review requests sent yet.</div>
            ) : (
              <div className="space-y-3">
                {sentRequests.map((req) => (
                  <div key={req.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{req.evaluatorName}</div>
                      <div className="text-[11px] text-slate-400">Skill: <strong className="text-indigo-300">{req.skillName}</strong></div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {req.status === 'COMPLETED' ? 'Completed' : 'Pending Reviewer'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVE EVALUATION MODAL */}
      {activeEvaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Evaluate Peer: {activeEvaluation.evaluateeName}</h3>
                <p className="text-xs text-indigo-400 font-semibold">Skill: {activeEvaluation.skillName}</p>
              </div>
              <button
                onClick={() => setActiveEvaluation(null)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEvaluation} className="space-y-6">
              {/* Rating Rubric Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Proficiency Rating (1 to 5)
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className={`py-3 rounded-xl font-bold text-sm border transition-all flex flex-col items-center gap-1 ${
                        rating === num
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${rating === num ? 'fill-white' : ''}`} />
                      <span>{num}</span>
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-medium">
                  {rubricLabels[rating]}
                </div>
              </div>

              {/* Qualitative Comments */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Qualitative Constructive Feedback
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share specific strengths, examples, or suggestions for growth..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveEvaluation(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingReview ? 'Submitting...' : 'Submit Peer Evaluation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
