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
  Search
} from 'lucide-react';

export default function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Infosys Springboard Direct Search State
  const [springboardQuery, setSpringboardQuery] = useState('ai');

  // Selected Course Viewer Modal State
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({ 0: false, 1: false, 2: false });

  // Certificate Verification Modal State
  const [certModalEnrollment, setCertModalEnrollment] = useState(null);
  const [certUrl, setCertUrl] = useState('');
  const [certId, setCertId] = useState('');
  const [certFileName, setCertFileName] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [aiRecs, setAiRecs] = useState([]);
  const [learningPath, setLearningPath] = useState([]);

  const fetchTrainingData = async () => {
    try {
      const catalogRes = await API.get('/progress/catalog');
      setCourses(catalogRes.data);

      const enrollRes = await API.get('/progress/my');
      setEnrollments(enrollRes.data);

      const gapsRes = await API.get('/gaps/my');
      setGaps(gapsRes.data);

      const recsRes = await API.get('/recommendations/courses');
      setAiRecs(recsRes.data || []);

      const pathRes = await API.get('/recommendations/learning-path');
      setLearningPath(pathRes.data || []);
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
      fetchTrainingData();
    } catch (err) {
      console.error('Error enrolling in course:', err);
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
    if (enrollment) {
      handleOpenCertificateModal(enrollment);
    }
  };

  const handleCertFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertFileName(file.name);
      setCertUrl(`file://uploads/certificates/${file.name}`);
      if (!certId) {
        setCertId(`CERT-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    }
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    if (!certModalEnrollment) return;

    setVerifying(true);
    try {
      await API.post(
        `/progress/enrollment/${certModalEnrollment.id}/verify-certificate?certificateUrl=${encodeURIComponent(certUrl || certFileName || 'Verified')}&certificateId=${encodeURIComponent(certId)}`
      );
      alert('🎉 Certificate uploaded & verified successfully! Training marked as COMPLETED and your skill rating has been upgraded!');
      setCertModalEnrollment(null);
      if (selectedCourse) setSelectedCourse(null);
      fetchTrainingData();
    } catch (err) {
      console.error('Error verifying certificate:', err);
      alert('Certificate verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleOpenCourseModal = (course) => {
    setSelectedCourse(course);
    setActiveModule(0);
    setModuleProgress({ 0: true, 1: false, 2: false });
    const state = getEnrollmentState(course.id);
    if (!state) {
      handleEnroll(course.id);
    }
  };

  const toggleModuleCheck = (idx) => {
    setModuleProgress(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getEnrollmentState = (courseId) => {
    return enrollments.find(e => e.course.id === courseId);
  };

  const isGapSkill = (skillId) => {
    return gaps.some(g => g.skill.id === skillId);
  };

  const handleSpringboardSearch = (e, customQuery) => {
    if (e) e.preventDefault();
    const query = customQuery !== undefined ? customQuery : springboardQuery;
    const targetQuery = query.trim() || 'ai';
    const searchUrl = `https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=${encodeURIComponent(targetQuery)}&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  const modulesList = [
    { title: '1. Foundations & Architecture Overview', duration: '45 mins', desc: 'Core principles, dependency initialization, and setup.' },
    { title: '2. Applied Implementation & Microservices', duration: '90 mins', desc: 'Hands-on practical coding exercise, REST APIs, and patterns.' },
    { title: '3. Advanced Performance & Optimization', duration: '60 mins', desc: 'Production deployment, caching, indexing, and benchmarks.' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-200">Learning Catalog & Certificate Verification Hub</h3>
          <p className="text-xs text-slate-400 mt-1">
            Explore free & sponsored courses. Launch lessons, complete modules, and submit certificates to verify training.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
            {courses.length} Courses
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
            {enrollments.filter(e => e.status === 'COMPLETED').length} Verified Complete
          </span>
        </div>
      </div>

      {/* INFOSYS SPRINGBOARD DIRECT LEARNING SEARCH BAR */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-extrabold uppercase tracking-wider border border-cyan-500/30">
                Infosys Springboard Direct
              </span>
              <h4 className="text-base font-bold text-slate-100 flex items-center">
                Course Learning Search Engine
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Search thousands of free certified courses on Infosys Springboard directly from this platform.
            </p>
          </div>
        </div>

        <form onSubmit={(e) => handleSpringboardSearch(e)} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              value={springboardQuery}
              onChange={(e) => setSpringboardQuery(e.target.value)}
              placeholder="Enter course name or skill (e.g. AI, Java, React, Docker)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center space-x-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Springboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400 pt-1">
          <span className="text-[11px] font-semibold text-slate-400">Popular Quick Queries:</span>
          {['AI', 'Java', 'Spring Boot', 'React.js', 'Docker', 'PostgreSQL', 'Cloud & DevOps'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSpringboardQuery(tag);
                handleSpringboardSearch(null, tag);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 text-[11px] font-medium transition cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendation & LLM Learning Path Section */}
      {aiRecs.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl space-y-4 border-l-4 border-l-cyan-400">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-200 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
              AI-Driven Upskilling & Training Recommendations
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
              {aiRecs.length} AI Recommended Fits
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {aiRecs.slice(0, 2).map((rec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">{rec.course?.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                    Gap Score -{rec.associatedGap?.gapScore}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  "{rec.aiRationale}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const state = getEnrollmentState(course.id);
          const hasGap = isGapSkill(course.skill.id);

          return (
            <div 
              key={course.id} 
              className={`glass-panel p-6 rounded-2xl flex flex-col justify-between transition duration-200 border ${
                hasGap ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/5' : 'border-slate-800/80'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      {course.provider}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      FREE COURSE
                    </span>
                  </div>
                  
                  {hasGap && (
                    <span className="inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Gap Fit
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-200 text-base mb-2">{course.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{course.description}</p>
                
                <div className="flex items-center space-x-3 text-xs text-slate-500 mb-6">
                  <span className="font-semibold text-slate-300">Skill: {course.skill.name}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-medium">{course.difficultyLevel}</span>
                </div>
              </div>

              {/* Action Buttons & Launch External Link */}
              <div className="pt-4 border-t border-slate-800/60 mt-auto space-y-3">
                <button
                  onClick={() => handleOpenCourseModal(course)}
                  className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 text-cyan-400 rounded-xl font-bold text-xs border border-cyan-500/30 hover:border-cyan-500/60 transition duration-150 flex items-center justify-center space-x-2"
                >
                  <PlayCircle className="w-4 h-4 text-cyan-400" />
                  <span>Launch Course Material</span>
                </button>

                {state ? (
                  state.status === 'COMPLETED' ? (
                    <div className="w-full p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold text-center border border-emerald-500/25 space-y-1">
                      <div className="flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
                        <span>Verified Certificate Completed</span>
                      </div>
                      {state.certificateId && (
                        <span className="text-[10px] text-slate-400 block font-mono">
                          ID: {state.certificateId}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 py-2 text-center text-xs font-bold bg-cyan-500/10 text-cyan-300 rounded-xl border border-cyan-500/20">
                        In Progress
                      </div>
                      <button
                        onClick={() => handleOpenCertificateModal(state)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold text-xs text-white transition duration-150 shadow-md shadow-emerald-500/10 flex items-center"
                      >
                        <FileCheck className="w-3.5 h-3.5 mr-1" />
                        Submit Cert
                      </button>
                    </div>
                  )
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 transition"
                    >
                      Enroll Free
                    </button>
                    <button
                      onClick={() => handleDirectCertUpload(course)}
                      className="px-3 py-2 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl transition flex items-center shadow"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1 text-black" />
                      Upload Cert
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE COURSE VIEWER MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-panel bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-0.5 bg-slate-800 text-slate-300 font-bold rounded-md border border-slate-700">
                    {selectedCourse.provider}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold rounded-md border border-emerald-500/20">
                    FREE
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-100 mt-2">{selectedCourse.title}</h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedCourse.description}</p>
              </div>
            </div>

            {/* Simulated Player Display */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden aspect-video flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30 animate-pulse">
                <PlayCircle className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-lg text-slate-200">
                {modulesList[activeModule]?.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                {modulesList[activeModule]?.desc}
              </p>

              <div className="mt-6 flex items-center space-x-4">
                <a
                  href={selectedCourse.url?.startsWith('http') ? selectedCourse.url : `https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=${encodeURIComponent(selectedCourse.skill?.name || selectedCourse.title)}&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition duration-150 flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Free Course ({selectedCourse.provider})</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Syllabus Checklist */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center">
                <Layers className="w-4 h-4 mr-2 text-cyan-400" />
                Curriculum Modules ({Object.values(moduleProgress).filter(Boolean).length}/3 Completed)
              </h4>

              <div className="space-y-3">
                {modulesList.map((mod, idx) => {
                  const done = moduleProgress[idx];
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveModule(idx)}
                      className={`p-4 rounded-xl border transition duration-150 cursor-pointer flex items-center justify-between ${
                        activeModule === idx
                          ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-200'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleModuleCheck(idx);
                          }}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition duration-150 ${
                            done ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {done && <Check className="w-4 h-4 font-extrabold" />}
                        </button>

                        <div>
                          <h5 className="font-bold text-sm text-slate-200">{mod.title}</h5>
                          <p className="text-xs text-slate-400">{mod.desc}</p>
                        </div>
                      </div>

                      <span className="text-xs text-slate-500 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {mod.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Completion Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-slate-400">
                To complete this course, submit your verified completion certificate.
              </span>

              {(() => {
                const state = getEnrollmentState(selectedCourse.id);
                if (state && state.status === 'COMPLETED') {
                  return (
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-xl font-bold text-xs flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Certificate Verified & Skill Levelled Up
                    </div>
                  );
                }
                return (
                  <button
                    onClick={() => {
                      const state = getEnrollmentState(selectedCourse.id);
                      if (state) handleOpenCertificateModal(state);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition duration-150 flex items-center space-x-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Submit Certificate for Verification</span>
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CERTIFICATE VERIFICATION MODAL */}
      {certModalEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel bg-[#090d16] border border-slate-800 rounded-2xl w-full max-w-lg p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setCertModalEnrollment(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Submit Course Certificate</h3>
                <p className="text-xs text-slate-400 mt-0.5">Course: {certModalEnrollment.course?.title}</p>
              </div>
            </div>

            <form onSubmit={handleVerifyCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Option 1: Upload Certificate File (PDF / Image)
                </label>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <Upload className="w-5 h-5 text-white flex-shrink-0" />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleCertFileChange}
                    className="text-xs text-zinc-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer w-full"
                  />
                </div>
                {certFileName && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    ✓ File selected: {certFileName}
                  </p>
                )}
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="flex-shrink mx-3 text-[10px] text-zinc-500 font-bold uppercase">OR</span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Option 2: Certificate URL / Verification Link
                </label>
                <input
                  type="url"
                  placeholder="https://infyspringboard.onwingspan.com/verify/YOUR-CERT-ID"
                  value={certUrl}
                  onChange={(e) => setCertUrl(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs text-white glass-input rounded-xl focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Certificate ID / Issue Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="CERT-OKGIP-884920"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs text-white glass-input rounded-xl focus:border-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <p className="font-bold text-white">Automated Verification & Progression:</p>
                <p>1. Certificate file/URL proof is logged into the audit ledger.</p>
                <p>2. Upon verification, your skill rating will automatically increment (+1 level).</p>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl shadow-lg transition duration-150 flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>{verifying ? 'Verifying Certificate...' : 'Upload & Verify Certificate'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
