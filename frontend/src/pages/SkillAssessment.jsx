import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Award, 
  CheckCircle2, 
  HelpCircle,
  Users,
  Search,
  FileText,
  Sparkles,
  Check
} from 'lucide-react';

export default function SkillAssessment() {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [userAssessedSkills, setUserAssessedSkills] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  
  // Rating states (skillId -> rating)
  const [ratings, setRatings] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Assessment Mode: 'matrix' | 'quiz' | 'resume'
  const [assessmentMode, setAssessmentMode] = useState('matrix');
  const [activeQuizSkill, setActiveQuizSkill] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // Resume Parsing State
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsingResume, setParsingResume] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleParseResume = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text or upload a resume file first.');
      return;
    }
    setParsingResume(true);
    setError('');
    setSuccess('');

    const textLower = resumeText.toLowerCase();
    const detected = [];
    const newRatingsArray = [];
    const updatedMap = { ...ratings };

    skills.forEach(s => {
      const sNameLower = s.name.toLowerCase();
      if (textLower.includes(sNameLower) || (s.category && textLower.includes(s.category.toLowerCase()))) {
        let level = 2; // Default Intermediate if mentioned
        if (textLower.includes(`senior ${sNameLower}`) || textLower.includes(`lead ${sNameLower}`) || textLower.includes(`expert in ${sNameLower}`) || textLower.includes('architect')) {
          level = 4;
        } else if (textLower.includes(`advanced ${sNameLower}`) || textLower.includes('microservices') || textLower.includes('spring boot') || textLower.includes('react')) {
          level = 3;
        } else if (textLower.includes(`basic ${sNameLower}`) || textLower.includes(`beginner ${sNameLower}`)) {
          level = 1;
        }

        detected.push({ skill: s, level });
        newRatingsArray.push({ skillId: s.id, level });
        updatedMap[s.id] = level;
      }
    });

    if (detected.length === 0) {
      // Fallback: assign introductory rating to top 3 general skills
      skills.slice(0, 3).forEach(s => {
        detected.push({ skill: s, level: 2 });
        newRatingsArray.push({ skillId: s.id, level: 2 });
        updatedMap[s.id] = 2;
      });
    }

    try {
      await API.post('/users/assess', { ratings: newRatingsArray });
      setRatings(updatedMap);
      setExtractedSkills(detected);
      setSuccess(`Successfully extracted ${detected.length} skills from your resume and updated your database inventory!`);
      await fetchData();
    } catch (err) {
      setError('Failed to update skill ratings from parsed resume.');
    } finally {
      setParsingResume(false);
    }
  };

  const fetchData = async () => {
    try {
      const skillsRes = await API.get('/skills');
      setSkills(skillsRes.data);

      if (user.role === 'MANAGER' || user.role === 'ADMIN' || user.role === 'HR_SPECIALIST') {
        const empRes = await API.get('/users');
        setEmployees(empRes.data.filter(e => e.id !== user.id));
      }

      const profileRes = await API.get('/users/profile');
      const currentSkills = profileRes.data.skills || [];
      setUserAssessedSkills(currentSkills);

      const selfRatings = {};
      currentSkills.forEach(s => {
        if (s.source === 'SELF') {
          selfRatings[s.skill.id] = s.proficiencyLevel;
        }
      });
      setRatings(selfRatings);

    } catch (err) {
      console.error('Error fetching assessment data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectEmployee = async (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    setError('');
    setSuccess('');

    if (!empId) {
      fetchData();
      return;
    }

    try {
      const skillsRes = await API.get(`/users/${empId}/skills`);
      const peerRatings = {};
      skillsRes.data.forEach(s => {
        if (s.source === 'MANAGER' || s.source === 'PEER') {
          peerRatings[s.skill.id] = s.proficiencyLevel;
        }
      });
      setRatings(peerRatings);
    } catch (err) {
      console.error('Error fetching employee skills:', err);
    }
  };

  const handleRate = (skillId, level) => {
    setRatings(prev => ({
      ...prev,
      [skillId]: level
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const ratingsArray = Object.keys(ratings).map(skillId => ({
      skillId: parseInt(skillId),
      level: ratings[skillId]
    }));

    try {
      if (selectedEmployee) {
        await API.post('/users/peer-assess', {
          targetUserId: parseInt(selectedEmployee),
          ratings: ratingsArray
        });
        setSuccess('Manager/Peer review submitted successfully! Skill records updated.');
      } else {
        await API.post('/users/assess', {
          ratings: ratingsArray
        });
        setSuccess('Self-assessment submitted! Your skill portfolio has been updated in the database.');
      }
      await fetchData(); // Immediately refresh user skills and UI badges!
    } catch (err) {
      setError('Failed to save assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Diagnostic Quiz Question Bank
  const sampleQuizQuestions = {
    Java: [
      { id: 1, q: "Which Java collection guarantees element insertion order without duplicates?", opts: ["ArrayList", "LinkedHashSet", "HashMap", "TreeSet"], correct: 1 },
      { id: 2, q: "What is the result of applying .flatMap() on a Java Stream?", opts: ["Filters null elements", "Flattens nested streams into a single stream", "Sorts elements in descending order", "Executes concurrently"], correct: 1 },
      { id: 3, q: "In Spring Boot JPA, how do you specify custom JPQL queries?", opts: ["@Query annotation", "@Column annotation", "@Repository", "@Path"], correct: 0 }
    ],
    "Spring Boot": [
      { id: 1, q: "What annotation marks a class as a Spring REST Controller?", opts: ["@Controller", "@RestController", "@Service", "@Component"], correct: 1 },
      { id: 2, q: "Which file is default for Spring Boot properties?", opts: ["config.xml", "application.properties / application.yml", "pom.xml", "web.xml"], correct: 1 },
      { id: 3, q: "How do you handle Spring Security JWT authentication filters?", opts: ["OncePerRequestFilter", "ServletListener", "HandlerInterceptor", "FilterBean"], correct: 0 }
    ],
    "React.js": [
      { id: 1, q: "Which Hook handles side effects in React functional components?", opts: ["useState", "useEffect", "useMemo", "useCallback"], correct: 1 },
      { id: 2, q: "How do you pass data down a React component tree without prop drilling?", opts: ["Redux / Context API", "URL Params", "Global Window variables", "Ref Callbacks"], correct: 0 },
      { id: 3, q: "What triggers a component re-render in React?", opts: ["Console logs", "State or Prop changes", "HTML comments", "CSS class updates"], correct: 1 }
    ]
  };

  const handleStartQuiz = (skill) => {
    setActiveQuizSkill(skill);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleAnswerQuiz = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuizSkill) return;
    const questions = sampleQuizQuestions[activeQuizSkill.name] || [
      { id: 1, q: `Do you feel confident working independently with ${activeQuizSkill.name}?`, opts: ["No experience", "Beginner", "Intermediate", "Advanced Expert"], correct: 3 }
    ];

    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correctCount++;
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    let calculatedLevel = 1;
    if (percent === 100) calculatedLevel = 4;
    else if (percent >= 66) calculatedLevel = 3;
    else if (percent >= 33) calculatedLevel = 2;

    setQuizResult({ correctCount, total: questions.length, percent, calculatedLevel });

    const updatedRatings = { ...ratings, [activeQuizSkill.id]: calculatedLevel };
    setRatings(updatedRatings);

    try {
      await API.post('/users/assess', {
        ratings: [{ skillId: activeQuizSkill.id, level: calculatedLevel }]
      });
      setSuccess(`Diagnostic assessment completed! Assessed ${activeQuizSkill.name} at Level ${calculatedLevel}. Database updated.`);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const levels = [
    { num: 0, name: 'Unaware', desc: 'No knowledge or practical exposure' },
    { num: 1, name: 'Beginner', desc: 'Basic conceptual understanding' },
    { num: 2, name: 'Intermediate', desc: 'Able to complete tasks independently' },
    { num: 3, name: 'Advanced', desc: 'Can design and solve complex issues' },
    { num: 4, name: 'Expert', desc: 'Deep technical mastery and coaches others' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Onboarding Notice Banner */}
      {userAssessedSkills.length === 0 && (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-white bg-zinc-950 border border-zinc-800">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h4 className="font-extrabold text-base text-white">Profile Onboarding: Initial Skill Assessment</h4>
          </div>
          <p className="text-xs text-zinc-300">
            Welcome! Select your proficiency level (Level 0–4) for each skill below or use the AI Resume Extractor tab to automatically parse your skills. Once submitted, your real-time Knowledge Gap Intelligence will be generated.
          </p>
        </div>
      )}

      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-1">Competency & Skill Evaluation</h3>
          <p className="text-xs text-slate-400">
            Rate competencies on Level 0 to Level 4, or take a diagnostic quiz to auto-calculate your gap scores.
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setAssessmentMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 ${
              assessmentMode === 'matrix' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Direct Rating Matrix
          </button>
          <button
            onClick={() => setAssessmentMode('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 flex items-center space-x-1 ${
              assessmentMode === 'quiz' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Diagnostic Quiz Mode
          </button>
          <button
            onClick={() => setAssessmentMode('resume')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 flex items-center space-x-1 ${
              assessmentMode === 'resume' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 mr-1" />
            AI Resume Extractor
          </button>
        </div>
      </div>

      {/* ACTIVE ASSESSED SKILLS SUMMARY CARD */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-200 text-sm flex items-center">
            <Award className="w-4 h-4 mr-2 text-cyan-400" />
            Your Current Saved Skill Portfolio ({userAssessedSkills.length} Assessed)
          </h4>
          <span className="text-xs text-slate-400">Updates live after every assessment</span>
        </div>

        {userAssessedSkills.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No skills assessed yet. Complete the evaluation matrix below.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {userAssessedSkills.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  {item.skill?.category}
                </span>
                <h5 className="font-bold text-xs text-slate-200 truncate">{item.skill?.name}</h5>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-cyan-400 font-bold">Level {item.proficiencyLevel}</span>
                  <span className="text-[10px] text-slate-500">{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {employees.length > 0 && assessmentMode === 'matrix' && (
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center space-x-4">
          <Users className="w-5 h-5 text-cyan-400" />
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Evaluation Context
            </label>
            <select
              value={selectedEmployee}
              onChange={handleSelectEmployee}
              className="glass-input text-xs text-slate-200 bg-[#0f172a] rounded-lg px-3 py-1.5 focus:border-cyan-500"
            >
              <option value="">Self-Assessment (My Skills)</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  Manager Review: {emp.fullName} ({emp.department} - {emp.title})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* MODE 1: MATRIX SELF RATING */}
      {assessmentMode === 'matrix' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl divide-y divide-slate-800/80">
            {skills.map((skill) => {
              const currentRating = ratings[skill.id];
              return (
                <div key={skill.id} className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        {skill.category}
                      </span>
                      {currentRating !== undefined && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                          Active: L{currentRating}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-200 mt-2 text-sm">{skill.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.description}</p>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-5 gap-2">
                    {levels.map((lvl) => {
                      const active = currentRating === lvl.num;
                      return (
                        <button
                          key={lvl.num}
                          type="button"
                          onClick={() => handleRate(skill.id, lvl.num)}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition duration-150 cursor-pointer ${
                            active
                              ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-md'
                              : 'border-slate-800 bg-slate-900/10 text-slate-400 hover:border-slate-700'
                          }`}
                          title={lvl.desc}
                        >
                          <span className="text-xs font-bold">L{lvl.num}</span>
                          <span className="text-[9px] mt-1 hidden sm:inline truncate max-w-[80px]">{lvl.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg transition duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {submitting ? 'Saving Assessment...' : 'Submit Assessment Ratings'}
          </button>
        </form>
      )}

      {/* MODE 2: DIAGNOSTIC QUIZ MODE */}
      {assessmentMode === 'quiz' && (
        <div className="space-y-6">
          {!activeQuizSkill ? (
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-200">Select a Skill to Take Diagnostic Test</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleStartQuiz(s)}
                    className="p-4 rounded-xl glass-panel bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition duration-150 group"
                  >
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                      {s.category}
                    </span>
                    <h5 className="font-bold text-slate-200 text-sm mt-2 group-hover:text-cyan-400">{s.name}</h5>
                    <p className="text-xs text-slate-500 mt-1">Click to launch diagnostic test →</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Diagnostic Test</span>
                  <h3 className="text-xl font-bold text-slate-100">{activeQuizSkill.name}</h3>
                </div>

                <button
                  onClick={() => setActiveQuizSkill(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Change Skill
                </button>
              </div>

              {quizResult ? (
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-100">Diagnostic Score: {quizResult.percent}%</h4>
                  <p className="text-xs text-slate-400">
                    You answered {quizResult.correctCount} out of {quizResult.total} questions correctly.
                  </p>
                  <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl font-bold text-sm">
                    Calculated Proficiency: Level {quizResult.calculatedLevel}
                  </div>
                  <div>
                    <button
                      onClick={() => handleStartQuiz(activeQuizSkill)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs"
                    >
                      Retake Test
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(sampleQuizQuestions[activeQuizSkill.name] || [
                    { id: 1, q: `Do you feel confident building production features in ${activeQuizSkill.name}?`, opts: ["No experience", "Beginner", "Intermediate", "Advanced Expert"], correct: 3 }
                  ]).map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                      <h5 className="font-semibold text-sm text-slate-200">
                        {qIdx + 1}. {q.q}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.opts.map((opt, optIdx) => {
                          const selected = quizAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerQuiz(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-xs text-left font-medium transition duration-150 ${
                                selected
                                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                                  : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg transition duration-200"
                  >
                    Submit Quiz & Auto-Calculate Level
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: AI RESUME SKILL EXTRACTOR */}
      {assessmentMode === 'resume' && (
        <div className="glass-panel p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <h4 className="font-bold text-lg text-slate-100 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cyan-400" />
              AI Resume Skill Parser & Automated Extractor
            </h4>
            <p className="text-xs text-slate-400">
              Upload your resume document or paste your professional experience text. Our AI skill parser will automatically extract your technical skills, estimate proficiency levels, and update your knowledge gap profile!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Drag and Drop / File Input */}
            <div className="p-6 rounded-2xl bg-slate-950/60 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center space-y-3 transition duration-200">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Upload Resume File (.pdf, .txt, .docx)</p>
                <p className="text-[11px] text-slate-500 mt-1">Select file to auto-read text content</p>
              </div>
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resumeFileInput"
              />
              <label
                htmlFor="resumeFileInput"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition"
              >
                {fileName ? `File: ${fileName}` : 'Choose File'}
              </label>
            </div>

            {/* Paste Raw Text Area */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Or Paste Resume Content / Bio Text
              </label>
              <textarea
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text, summary of experience, or technical stack here..."
                className="w-full p-4 rounded-xl text-xs text-slate-200 glass-input bg-slate-950/60 focus:border-cyan-500 resize-none font-mono"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleParseResume}
            disabled={parsingResume || !resumeText.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl shadow-lg transition duration-200 flex items-center justify-center disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {parsingResume ? 'Analyzing & Extracting Skills...' : 'Parse Resume & Extract Skills'}
          </button>

          {/* Extracted Skill Badges */}
          {extractedSkills && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
              <h5 className="font-bold text-sm text-slate-200 flex items-center">
                <Check className="w-4 h-4 mr-2 text-emerald-400" />
                Extracted Competencies ({extractedSkills.length} Skills Auto-Saved)
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {extractedSkills.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {item.skill.category}
                    </span>
                    <h6 className="font-bold text-xs text-slate-100">{item.skill.name}</h6>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Calculated Level {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
