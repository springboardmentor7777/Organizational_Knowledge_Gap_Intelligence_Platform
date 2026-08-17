import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  ExternalLink,
  Sparkles,
  Award,
  PlayCircle,
  X,
  Check,
  Globe,
  Clock,
  Layers,
  FileCheck,
  ShieldCheck,
  Upload,
  Search,
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function CourseCatalog() {
  const [activeTab, setActiveTab] = useState('ai-path'); // 'ai-path' | 'catalog'

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [personalizedPath, setPersonalizedPath] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & filter
  const [search, setSearch] = useState('');
  const [springboardQuery, setSpringboardQuery] = useState('ai');

  // Course Viewer Modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({ 0: false, 1: false, 2: false });

  // Cert Upload Modal
  const [certModalEnrollment, setCertModalEnrollment] = useState(null);
  const [certUrl, setCertUrl] = useState('');
  const [certId, setCertId] = useState('');
  const [certFileName, setCertFileName] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Toast alert
  const [toast, setToast] = useState(null);
  const [completingId, setCompletingId] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  const fetchTrainingData = async () => {
    setLoading(true);
    try {
      const [catalogRes, enrollRes, gapsRes, pathRes] = await Promise.all([
        API.get('/progress/catalog'),
        API.get('/progress/my'),
        API.get('/gaps/my'),
        API.get('/learning-paths/personalized')
      ]);

      setCourses(catalogRes.data);
      setEnrollments(enrollRes.data);
      setGaps(gapsRes.data);
      setPersonalizedPath(pathRes.data || []);
    } catch (err) {
      console.error('Error fetching training catalog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await API.post(`/progress/enroll?courseId=${courseId}`);
      showToast('Enrolled in course successfully!');
      fetchTrainingData();
    } catch (err) {
      console.error('Error enrolling in course:', err);
    }
  };

  const handleCompleteAndLevelUp = async (courseId) => {
    setCompletingId(courseId);
    try {
      const res = await API.post(`/learning-paths/complete-course/${courseId}`);
      const data = res.data;
      if (data.leveledUp) {
        showToast(`🎉 Level Up! Your proficiency in ${data.skillName} upgraded from L${data.previousLevel} to L${data.newLevel}!`);
      } else {
        showToast(`Course completed for ${data.skillName}!`);
      }
      fetchTrainingData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to complete course', 'error');
    } finally {
      setCompletingId(null);
    }
  };

  const handleOpenCertificateModal = (enrollment) => {
    setCertModalEnrollment(enrollment);
    setCertUrl('');
    setCertFileName('');
    setCertId(`CERT-OKGIP-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleDirectCertUpload = async (course) => {
    let enrollment = enrollments.find(e => e.course.id === course.id);
    if (!enrollment) {
      try {
        const res = await API.post(`/progress/enroll?courseId=${course.id}`);
        enrollment = res.data;
        const updatedEnrollments = [...enrollments, enrollment];
        setEnrollments(updatedEnrollments);
      } catch (err) {
        console.error('Error enrolling for cert upload:', err);
      }
    }
    handleOpenCertificateModal(enrollment || { course });
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    if (!certModalEnrollment) return;

    setVerifying(true);
    try {
      await API.post('/progress/verify-certificate', {
        enrollmentId: certModalEnrollment.id,
        certificateUrl: certUrl || `https://infosys.springboard.com/credentials/${certId}`,
        certificateId: certId
      });
      showToast('Certificate verified! Skill level upgraded.');
      setCertModalEnrollment(null);
      fetchTrainingData();
    } catch (err) {
      showToast('Failed to verify certificate', 'error');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
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
            <Sparkles className="w-3.5 h-3.5" /> AI-Driven Skill Upskilling
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Personalized Learning Paths & Course Hub
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Close your skill gaps with AI-matched training courses. Complete modules to automatically level up your skill proficiency and earn verified certifications.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('ai-path')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'ai-path'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>My AI Learning Path ({personalizedPath.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3.5 px-4 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>All Courses & Springboard Catalog</span>
        </button>
      </div>

      {/* TAB 1: MY AI LEARNING PATH */}
      {activeTab === 'ai-path' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/50 flex items-center gap-3 text-xs text-indigo-200">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold">AI Skill-Gap Matching: </span>
              These courses are dynamically recommended to close your identified skill gaps. Completing a course automatically levels up your skill score!
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-56 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : personalizedPath.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-300">No Active Skill Gaps Found!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                You are currently meeting or exceeding all required role skill benchmarks. Browse the full course catalog to explore advanced topics.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalizedPath.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all shadow-md group"
                >
                  <div className="space-y-4">
                    {/* Header Skill Target */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                          Target Skill: {item.skillName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <span>L{item.currentLevel}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Target L{item.targetLevel}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> ~{item.estimatedDurationHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-500" /> {item.provider || 'Infosys Springboard'}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={item.url || 'https://infosysspringboard.onwingspan.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center gap-1"
                    >
                      <span>Open Course Content</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleCompleteAndLevelUp(item.courseId)}
                      disabled={completingId === item.courseId}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{completingId === item.courseId ? 'Upgrading...' : 'Complete & Auto Level-Up'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COURSE CATALOG & ENROLLMENTS */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Springboard Direct Link Banner */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" /> Direct Access to Infosys Springboard Portal
              </h3>
              <p className="text-xs text-slate-400">Launch any topic query directly on the Springboard learning portal.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={springboardQuery}
                onChange={(e) => setSpringboardQuery(e.target.value)}
                placeholder="Topic e.g. Java, Cloud..."
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <a
                href={`https://infosysspringboard.onwingspan.com/web/en/app/toc/${encodeURIComponent(springboardQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white whitespace-nowrap flex items-center gap-1"
              >
                <span>Search Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const enrollment = enrollments.find(e => e.course.id === course.id);
              const isEnrolled = !!enrollment;
              const isCompleted = enrollment?.status === 'COMPLETED';

              return (
                <div
                  key={course.id}
                  className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
                        {course.skill ? course.skill.category : 'General'}
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-100 text-base">{course.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleDirectCertUpload(course)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Cert
                    </button>

                    {!isEnrolled ? (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
                      >
                        Enroll Now
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteAndLevelUp(course.id)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
                      >
                        Auto Level-Up
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Upload Modal */}
      {certModalEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setCertModalEnrollment(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Upload Springboard Certificate</h3>
            </div>

            <form onSubmit={handleVerifyCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Certificate Verification URL
                </label>
                <input
                  type="url"
                  value={certUrl}
                  onChange={(e) => setCertUrl(e.target.value)}
                  placeholder="https://infosys.springboard.com/credentials/CERT-123"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCertModalEnrollment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={verifying}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
                >
                  {verifying ? 'Verifying...' : 'Verify Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
