import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Award, 
  Search, 
  Filter, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  Clock,
  Send,
  X
} from 'lucide-react';

export default function ExpertDirectory() {
  const { user } = useContext(AuthContext);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Booking modal state
  const [bookingExpert, setBookingExpert] = useState(null);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [submitting, setSubmitting] = useState(false);

  // Toast alert
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/skills/experts?search=${encodeURIComponent(search)}&department=${encodeURIComponent(selectedDept)}`);
      setExperts(res.data);
    } catch (err) {
      console.error('Failed to load expert directory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [search, selectedDept]);

  const handleOpenBooking = (expert) => {
    setBookingExpert(expert);
    if (expert.expertSkills && expert.expertSkills.length > 0) {
      setSelectedSkillId(expert.expertSkills[0].skillId);
    } else {
      setSelectedSkillId('');
    }
    setSessionNotes('');
    setDurationMinutes(30);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedSkillId) {
      showToast('Please select a skill for consultation', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/mentorship/request', {
        mentorId: bookingExpert.id,
        skillId: Number(selectedSkillId)
      });
      showToast(`Consultation request sent to ${bookingExpert.fullName}!`);
      setBookingExpert(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit consultation request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const departments = ['All', 'Engineering', 'Product Management', 'Data & AI', 'Design', 'Executive', 'Human Resources'];

  // Total stats calculations
  const totalExperts = experts.length;
  const availableExperts = experts.filter(e => e.isAvailableForMentorship).length;
  const totalSkillsCovered = new Set(experts.flatMap(e => (e.expertSkills || []).map(s => s.skillName))).size;

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
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
            <Sparkles className="w-3.5 h-3.5" /> Subject Matter Expertise
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Internal Expert Directory
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Connect directly with verified domain experts across departments to resolve technical blockers, request peer guidance, and bridge specialized skill gaps.
          </p>
        </div>

        {/* Decorative Graphic Elements */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">{totalExperts}</div>
            <div className="text-xs text-slate-400 font-medium">Verified Domain Experts</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">{availableExperts}</div>
            <div className="text-xs text-slate-400 font-medium">Available for Consultation</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">{totalSkillsCovered}</div>
            <div className="text-xs text-slate-400 font-medium">Advanced Skill Domains</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
        {/* Keyword Search */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experts by name, title, or skill (e.g. React, Spring Boot, AI)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 ml-1 hidden lg:block" />
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Experts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse p-6" />
          ))}
        </div>
      ) : experts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-3">
          <Users className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-300">No Domain Experts Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or department filter to find internal subject matter experts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl group"
            >
              <div className="space-y-5">
                {/* Header Profile Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {expert.avatarUrl ? (
                      <img
                        src={expert.avatarUrl}
                        alt={expert.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md border border-indigo-400/30">
                        {expert.fullName ? expert.fullName.charAt(0).toUpperCase() : expert.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                        {expert.fullName}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{expert.title}</p>
                      <p className="text-[11px] text-slate-500">{expert.department}</p>
                    </div>
                  </div>

                  {/* Availability Pill */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                    expert.isAvailableForMentorship
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {expert.isAvailableForMentorship ? 'Available' : 'Busy'}
                  </span>
                </div>

                {/* Expert Skills Tags */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Verified Expert Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(expert.expertSkills || []).map((sk, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/60 text-slate-200 text-xs font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{sk.skillName}</span>
                        <span className="ml-1 text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                          {sk.level === 5 ? 'L5 Expert' : 'L4 Adv'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> 1-on-1 Sessions
                </span>
                <button
                  onClick={() => handleOpenBooking(expert)}
                  disabled={!expert.isAvailableForMentorship || expert.id === user.id}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <span>Request Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setBookingExpert(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Book Expert Consultation</h3>
                <p className="text-xs text-slate-400">Schedule 1-on-1 guidance with {bookingExpert.fullName}</p>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Target Skill Domain
                </label>
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  required
                >
                  {(bookingExpert.expertSkills || []).map((sk) => (
                    <option key={sk.skillId} value={sk.skillId}>
                      {sk.skillName} (Proficiency Level {sk.level})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 30, 60].map((mins) => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setDurationMinutes(mins)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        durationMinutes === mins
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Consultation Topic & Problem Description
                </label>
                <textarea
                  rows={3}
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Briefly describe what you'd like guidance on..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingExpert(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Send Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
