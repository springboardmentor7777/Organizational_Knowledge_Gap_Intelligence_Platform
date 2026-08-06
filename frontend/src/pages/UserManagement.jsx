import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  Search, 
  Shield, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Building2, 
  RefreshCw 
} from 'lucide-react';

export default function UserManagement() {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  // Edit Role Modal State
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load user directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenRoleModal = (u) => {
    setEditingUser(u);
    setSelectedRole(u.role);
    setSuccess('');
    setError('');
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      await API.put(`/users/${editingUser.id}/role`, { role: selectedRole });
      setSuccess(`Updated role for ${editingUser.fullName || editingUser.username} to ${selectedRole}!`);
      setEditingUser(null);
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data || 'Failed to update user role');
    } finally {
      setUpdating(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (u.fullName || '').toLowerCase().includes(searchLower) ||
                          (u.username || '').toLowerCase().includes(searchLower) ||
                          (u.email || '').toLowerCase().includes(searchLower) ||
                          (u.title || '').toLowerCase().includes(searchLower);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesDept = deptFilter === 'ALL' || u.department === deptFilter;
    return matchesSearch && matchesRole && matchesDept;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-400 border border-rose-500/30">ADMIN</span>;
      case 'HR_SPECIALIST':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">HR SPECIALIST</span>;
      case 'MANAGER':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30">MANAGER</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">EMPLOYEE</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin System Control</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">User & Role Access Administration</h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Manage organization members, assign authorization permissions, and promote users across Employee, Manager, HR, and Admin roles.
            </p>
          </div>
          <button
            onClick={fetchUsers}
            className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center gap-2 text-xs font-bold transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Directory
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
          {success}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Directory Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, username, email, title..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:border-cyan-500"
          >
            <option value="ALL">All Roles</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="HR_SPECIALIST">HR Specialist</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium focus:border-cyan-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product">Product</option>
            <option value="Executive">Executive</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center">
            <Users className="w-5 h-5 mr-2 text-cyan-400" />
            Registered Organization Accounts ({filteredUsers.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">User</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Job Title</th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Assigned Role</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500 italic">
                      No matching user accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/50 transition">
                      <td className="px-4 py-3.5 font-bold text-slate-100 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300">
                          {u.fullName?.charAt(0) || u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-100">{u.fullName || u.username}</p>
                          <p className="text-[10px] text-slate-500 font-mono">@{u.username}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">{u.email}</td>
                      <td className="px-4 py-3.5 text-slate-300">{u.title || 'Staff Member'}</td>
                      <td className="px-4 py-3.5 font-semibold text-cyan-400">{u.department || 'General'}</td>
                      <td className="px-4 py-3.5">{getRoleBadge(u.role)}</td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => handleOpenRoleModal(u)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 font-bold text-[11px] transition inline-flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Change Role
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Update Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-panel bg-slate-950 border border-slate-800 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-6 animate-scale-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Role Promotion / Assignment</span>
                <h3 className="text-lg font-bold text-slate-100">{editingUser.fullName || editingUser.username}</h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Authorization Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm font-bold focus:border-cyan-500"
                >
                  <option value="EMPLOYEE">EMPLOYEE (Personal Growth & Assessments)</option>
                  <option value="MANAGER">MANAGER (Team Matrix & Direct Reports)</option>
                  <option value="HR_SPECIALIST">HR_SPECIALIST (Org Intelligence & Frameworks)</option>
                  <option value="ADMIN">ADMIN (System Administration & Full Access)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Role Authority Note:</p>
                <p>Changing this user's role will instantly adjust their access control and dashboard capabilities across the platform.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition"
                >
                  {updating ? 'Updating...' : 'Save Role Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
