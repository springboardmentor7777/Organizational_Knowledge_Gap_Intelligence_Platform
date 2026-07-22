import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../../services/employeeService';
import LoadingScreen from '../../components/feedback/LoadingScreen';
import ErrorState    from '../../components/feedback/ErrorState';

const STATUS_STYLES = {
  'Active':   'bg-green-100 text-green-700',
  'Inactive': 'bg-red-100   text-red-700',
  'On Leave': 'bg-yellow-100 text-yellow-700',
};

// ── Small presentational component ────────────────────
function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}

export default function EmployeeDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [employee,  setEmployee]  = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  function fetchEmployee() {
    setLoading(true);
    setError(null);
    getEmployeeById(id)
      .then((data) => { setEmployee(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { fetchEmployee(); }, [id]);

  if (loading) return <LoadingScreen message="Loading employee…" />;
  if (error)   return <ErrorState message={error} onRetry={fetchEmployee} />;
  if (!employee) return null;

  return (
    <div className="max-w-3xl">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        ← Back to Employees
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{employee.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{employee.designation}</p>
          </div>
          <span
            className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
              STATUS_STYLES[employee.status] ?? 'bg-gray-100 text-gray-600'
            }`}
          >
            {employee.status}
          </span>
        </div>

        {/* Info grid */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="Email"       value={employee.email} />
          <InfoField label="Department"  value={employee.department} />
          <InfoField label="Designation" value={employee.designation} />
          <InfoField
            label="Experience"
            value={`${employee.experience} ${employee.experience === 1 ? 'year' : 'years'}`}
          />
        </div>

        {/* Skills */}
        <div className="px-6 py-5 border-t border-gray-100">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Skills</h2>
          {employee.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}
