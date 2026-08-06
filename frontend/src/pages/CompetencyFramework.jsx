import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Settings
} from 'lucide-react';

export default function CompetencyFramework() {
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState('EMPLOYEE');
  const [department, setDepartment] = useState('Engineering');
  
  // Requirement levels (skillId -> level)
  const [requirements, setRequirements] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    try {
      const skillsRes = await API.get('/skills');
      setSkills(skillsRes.data);
    } catch (err) {
      console.error('Error fetching skills list:', err);
    }
  };

  const fetchRequirements = async () => {
    setError('');
    setSuccess('');
    try {
      const requirementsRes = await API.get(`/skills/requirements?role=${role}&department=${department}`);
      const mapping = {};
      requirementsRes.data.forEach(req => {
        mapping[req.skill.id] = req.requiredLevel;
      });
      setRequirements(mapping);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    fetchRequirements();
  }, [role, department]);

  const handleLevelChange = (skillId, val) => {
    setRequirements(prev => ({
      ...prev,
      [skillId]: val
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      // Post each requirements update to backend
      for (const skillId of Object.keys(requirements)) {
        await API.post('/skills/requirements', {
          role,
          department,
          skill: { id: parseInt(skillId) },
          requiredLevel: requirements[skillId]
        });
      }
      setSuccess(`Competency benchmarks for '${role}' in '${department}' updated successfully!`);
    } catch (err) {
      setError('Failed to save some competency benchmarking options. Check your connections.');
    } finally {
      setSaving(false);
    }
  };

  const levels = [
    { num: 0, name: 'Unaware' },
    { num: 1, name: 'Beginner' },
    { num: 2, name: 'Intermediate' },
    { num: 3, name: 'Advanced' },
    { num: 4, name: 'Expert' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-200 mb-2 flex items-center">
          <FileSpreadsheet className="w-6 h-6 mr-2 text-cyan-400" />
          Competency Framework Builder
        </h3>
        <p className="text-xs text-slate-400">
          Establish required competency benchmarks. Gaps are calculated as the difference between employees' ratings and these values.
        </p>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-200 glass-input bg-[#0f172a] rounded-lg focus:border-cyan-500"
            >
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Product">Product</option>
              <option value="Executive">Executive</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-200 glass-input bg-[#0f172a] rounded-lg focus:border-cyan-500"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="HR_SPECIALIST">HR Specialist</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {error}
        </div>
      )}

      {/* Target Level Matrix Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl divide-y divide-slate-800/80">
          <div className="pb-4 font-bold text-xs text-slate-300 flex items-center justify-between">
            <span>Skill Name</span>
            <span>Required Proficiency Benchmark Level</span>
          </div>

          {skills.map((skill) => {
            const currentVal = requirements[skill.id] || 0;
            return (
              <div key={skill.id} className="py-5 first:pt-4 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">{skill.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{skill.category}</p>
                </div>

                <div className="flex items-center space-x-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl.num}
                      type="button"
                      onClick={() => handleLevelChange(skill.id, lvl.num)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition duration-150 ${
                        currentVal === lvl.num
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                          : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:border-slate-700'
                      }`}
                      title={lvl.name}
                    >
                      L{lvl.num}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg transition duration-150"
        >
          {saving ? 'Saving Benchmarks...' : 'Save Competency Benchmarks'}
        </button>
      </form>
    </div>
  );
}
