import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  Download, 
  Printer, 
  Users, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Grid, 
  Info, 
  ArrowUpRight, 
  HelpCircle,
  FileSpreadsheet,
  Activity
} from 'lucide-react';

export default function ExecutiveAnalytics() {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [spofRisks, setSpofRisks] = useState([]);

  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);
  const [loadingSpof, setLoadingSpof] = useState(true);

  // Selected tooltip state for heatmap
  const [activeCellTooltip, setActiveCellTooltip] = useState(null);

  // Toast alert
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchOverview = async () => {
    setLoadingOverview(true);
    try {
      const res = await API.get('/analytics/overview');
      setOverview(res.data);
    } catch (err) {
      console.error('Failed to load analytics overview:', err);
    } finally {
      setLoadingOverview(false);
    }
  };

  const fetchHeatmap = async () => {
    setLoadingHeatmap(true);
    try {
      const res = await API.get('/analytics/department-heatmap');
      setHeatmap(res.data);
    } catch (err) {
      console.error('Failed to load department heatmap:', err);
    } finally {
      setLoadingHeatmap(false);
    }
  };

  const fetchSpofRisks = async () => {
    setLoadingSpof(true);
    try {
      const res = await API.get('/analytics/spof-risks');
      setSpofRisks(res.data);
    } catch (err) {
      console.error('Failed to load SPOF risks:', err);
    } finally {
      setLoadingSpof(false);
    }
  };

  useEffect(() => {
    fetchOverview();
    fetchHeatmap();
    fetchSpofRisks();
  }, []);

  const handleDownloadCsv = async () => {
    try {
      const response = await API.get('/analytics/export-csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'executive_skill_gap_report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Executive CSV report downloaded successfully!');
    } catch (err) {
      showToast('Failed to download CSV report', 'error');
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // Helper color for heatmap cells
  const getCellColorClass = (score) => {
    if (score >= 3.8) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30';
    if (score >= 2.5) return 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30';
    if (score > 0) return 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30';
    return 'bg-slate-900/40 text-slate-600 border-slate-800';
  };

  return (
    <div className="space-y-8 p-2 md:p-6 max-w-7xl mx-auto print:p-0 print:m-0">
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:border-none print:shadow-none">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Executive Intelligence & Governance
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Organizational Skill Health & SPOF Risk Center
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Real-time matrix view of department competency health, critical single-point-of-failure vulnerabilities, and executive summary exports for leadership decision making.
          </p>
        </div>

        {/* Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export CSV Report</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Executive Brief</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">
              {loadingOverview ? '...' : `${overview?.healthIndexScore || 0}%`}
            </div>
            <div className="text-xs text-slate-400 font-medium">Company Skill Health Index</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">
              {loadingOverview ? '...' : overview?.totalIdentifiedGaps || 0}
            </div>
            <div className="text-xs text-slate-400 font-medium">Active Knowledge Gaps</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">
              {loadingOverview ? '...' : overview?.spofVulnerabilityCount || 0}
            </div>
            <div className="text-xs text-slate-400 font-medium">SPOF Skill Vulnerabilities</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">
              {loadingOverview ? '...' : overview?.totalEmployees || 0}
            </div>
            <div className="text-xs text-slate-400 font-medium">Assessed Team Members</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: DEPARTMENT SKILL HEATMAP */}
      <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Department Skill Competency Heatmap</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Matrix comparing average proficiency across company departments.
            </p>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-300">Healthy (&ge; 3.8)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-slate-300">Moderate (2.5 - 3.7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500" />
              <span className="text-slate-300">Critical Gap (&lt; 2.5)</span>
            </div>
          </div>
        </div>

        {loadingHeatmap ? (
          <div className="h-64 bg-slate-950/40 rounded-2xl animate-pulse" />
        ) : heatmap.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">No department heatmap data available.</div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 w-48">Department</th>
                  {heatmap[0]?.skillScores?.map((s) => (
                    <th key={s.skillId} className="py-3 px-4 text-center">
                      <span className="block font-bold text-slate-200">{s.skillName}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{s.category}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {heatmap.map((row) => (
                  <tr key={row.department} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-200">
                      <div>{row.department}</div>
                      <div className="text-[11px] font-normal text-slate-500">{row.employeeCount} Members</div>
                    </td>

                    {row.skillScores?.map((sk) => (
                      <td key={sk.skillId} className="py-3 px-3 text-center">
                        <div
                          className={`py-2 px-3 rounded-xl border font-extrabold text-xs transition-all cursor-pointer shadow-sm relative group ${getCellColorClass(sk.avgProficiency)}`}
                        >
                          {sk.avgProficiency > 0 ? `${sk.avgProficiency} / 5.0` : 'N/A'}

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 w-48 p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl text-left pointer-events-none">
                            <div className="text-xs font-bold text-slate-100">{sk.skillName}</div>
                            <div className="text-[11px] text-indigo-300">{row.department}</div>
                            <div className="mt-2 text-[11px] space-y-1 text-slate-300">
                              <div>Avg Level: <strong className="text-white">{sk.avgProficiency} / 5.0</strong></div>
                              <div>Assessed Members: <strong className="text-white">{sk.evaluatedEmployees}</strong></div>
                              <div>Status: <strong className={sk.status === 'HEALTHY' ? 'text-emerald-400' : sk.status === 'MODERATE' ? 'text-amber-400' : 'text-rose-400'}>{sk.status}</strong></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 2: SINGLE-POINT-OF-FAILURE (SPOF) RISK RADAR */}
      <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Single-Point-of-Failure (SPOF) Vulnerability Radar</h2>
            <p className="text-xs text-slate-400">Critical enterprise skills that rely on 2 or fewer verified experts ($\text{Level} \ge 4$).</p>
          </div>
        </div>

        {loadingSpof ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-44 bg-slate-950/40 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : spofRisks.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-sm space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div className="font-semibold text-slate-200">No High-Risk SPOF Vulnerabilities Detected!</div>
            <p className="text-xs text-slate-500">All critical skills have a healthy distribution of verified domain experts across departments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spofRisks.map((spof) => (
              <div
                key={spof.skillId}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 space-y-5 transition-all shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{spof.skillName}</h3>
                    <span className="text-xs text-slate-400">{spof.category}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    spof.expertCount === 0
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {spof.expertCount === 0 ? '0 Experts (Critical Risk)' : `${spof.expertCount} Sole Expert`}
                  </span>
                </div>

                {/* Sole Experts List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Current Domain Expert(s)
                  </div>
                  {spof.soleExperts && spof.soleExperts.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {spof.soleExperts.map((exp) => (
                        <div key={exp.id} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-semibold">{exp.name}</span>
                          <span className="text-[10px] text-slate-400">({exp.department})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-rose-400 italic">No Level 4/5 experts currently exist for this skill.</div>
                  )}
                </div>

                {/* Recommended Cross-Training Candidates */}
                {spof.crossTrainCandidates && spof.crossTrainCandidates.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Recommended Cross-Training Candidates
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {spof.crossTrainCandidates.map((cand) => (
                        <span key={cand.id} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                          {cand.name} (Level {cand.currentLevel})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
