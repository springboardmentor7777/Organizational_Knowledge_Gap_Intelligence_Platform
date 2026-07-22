import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/dashboard',             label: 'Dashboard' },
  { to: '/employees',             label: 'Employees' },
  { to: '/departments',           label: 'Departments' },
  { to: '/skills',                label: 'Skills' },
  { to: '/employee-skills',       label: 'Employee Skills' },
  { to: '/competency-matrix',     label: 'Competency Matrix' },
  { to: '/gap-analysis',          label: 'Gap Analysis' },
  { to: '/recommendations',       label: 'Recommendations' },
  { to: '/department-skill-matrix', label: 'Dept. Skill Matrix' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-full bg-white border-r border-gray-200 shrink-0">
      <nav className="flex flex-col gap-0.5 p-3 pt-4">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
