import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../../services/employeeService';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const STATUS_STYLES = {
  'Active':   'bg-green-100 text-green-700',
  'Inactive': 'bg-red-100   text-red-700',
  'On Leave': 'bg-yellow-100 text-yellow-700',
};

const EMPLOYEE_COLUMNS = [
  { label: 'Employee Code', key: 'employeeCode' },
  { label: 'Full Name',     key: 'name' },
  { label: 'Email',         key: 'email' },
  { label: 'Department',    key: 'department' },
  { label: 'Designation',   key: 'designation' },
  { label: 'Experience (Yrs)', key: 'experience' },
  { label: 'Status',        key: 'status' },
];

export default function EmployeeList() {
  const [employees,  setEmployees]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [search,     setSearch]     = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  function fetchEmployees() {
    setLoading(true);
    setError(null);
    getEmployees()
      .then((data) => { setEmployees(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchEmployees(); }, []);

  const departments = ['All', ...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesDept   = deptFilter === 'All' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  if (loading) return <LoadingScreen message="Loading employees…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchEmployees} />;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Employees</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and view workforce profiles</p>
        </div>
        <span className="text-sm text-gray-400">{employees.length} total</span>
      </div>

      {/* Export Toolbar */}
      <ExportToolbar
        data={filtered}
        columns={EMPLOYEE_COLUMNS}
        filename="employees_report"
        title="Export Employee List"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          id="employee-search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition"
        />
        <select
          id="dept-filter"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No employees found"
          message="Try adjusting your search or department filter."
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Department', 'Designation', 'Experience', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{emp.name}</p>
                    <p className="text-xs text-gray-400">{emp.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.designation}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {emp.experience ? `${emp.experience} yrs` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        STATUS_STYLES[emp.status] ?? 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/employees/${emp.id}`}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
