import { useState, useEffect } from 'react';
import { getDepartments } from '../../services/departmentService';
import ExportToolbar from '../../components/common/ExportToolbar';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';
import EmptyState    from '../../components/feedback/EmptyState';

const DEPT_COLUMNS = [
  { label: 'Department Name', key: 'name' },
  { label: 'Description',     key: 'description' },
  { label: 'Manager',         key: 'manager' },
  { label: 'Employee Count',  key: 'employeeCount' },
];

function DepartmentCard({ dept }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">{dept.name}</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Manager</span>
            <span className="text-gray-800 font-medium">{dept.manager}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Employees</span>
            <span className="text-gray-800 font-medium">{dept.employeeCount}</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled
        className="mt-5 w-full py-2 border border-gray-200 text-gray-400 text-sm rounded-lg cursor-not-allowed bg-gray-50"
      >
        View Details (coming soon)
      </button>
    </div>
  );
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  function fetchDepartments() {
    setLoading(true);
    setError(null);
    getDepartments()
      .then((data) => { setDepartments(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchDepartments(); }, []);

  if (loading) return <LoadingScreen message="Loading departments…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchDepartments} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Departments</h1>
        <span className="text-sm text-gray-400">{departments.length} total</span>
      </div>

      <ExportToolbar
        data={departments}
        columns={DEPT_COLUMNS}
        filename="departments_report"
        title="Export Departments"
      />

      {departments.length === 0 ? (
        <EmptyState title="No departments found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} dept={dept} />
          ))}
        </div>
      )}
    </div>
  );
}
