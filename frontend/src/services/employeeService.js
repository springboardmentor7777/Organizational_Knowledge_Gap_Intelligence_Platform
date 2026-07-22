/**
 * employeeService.js
 * Integrated with GET /employees & GET /employees/{id} using fetchWithFallback.
 */

import api from './api';
import { fetchWithFallback } from '../utils/apiFallback';

export const LEVEL_LABELS = {
  1: 'Beginner',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const MOCK_EMPLOYEES = [
  { id: 1, employeeCode: 'EMP001', name: 'David Chen', email: 'david.chen@company.com', phone: '555-0101', designation: 'Senior Software Engineer', department: 'Engineering', experience: 5, status: 'Active', skills: ['React', 'Node.js', 'Docker'] },
  { id: 2, employeeCode: 'EMP002', name: 'Alice Johnson', email: 'alice.johnson@company.com', phone: '555-0102', designation: 'Frontend Developer', department: 'Engineering', experience: 3, status: 'Active', skills: ['React', 'TypeScript'] },
  { id: 3, employeeCode: 'EMP003', name: 'Bob Martinez', email: 'bob.martinez@company.com', phone: '555-0103', designation: 'Data Analyst', department: 'Data Science', experience: 4, status: 'Active', skills: ['Python', 'SQL', 'Power BI'] },
  { id: 4, employeeCode: 'EMP004', name: 'Carol Williams', email: 'carol.williams@company.com', phone: '555-0104', designation: 'HR Specialist', department: 'Human Resources', experience: 6, status: 'Active', skills: ['Recruitment', 'HRIS'] },
  { id: 5, employeeCode: 'EMP005', name: 'Eva Patel', email: 'eva.patel@company.com', phone: '555-0105', designation: 'Marketing Manager', department: 'Marketing', experience: 7, status: 'Active', skills: ['SEO', 'Brand Strategy'] },
  { id: 6, employeeCode: 'EMP006', name: 'Frank Thompson', email: 'frank.thompson@company.com', phone: '555-0106', designation: 'Financial Analyst', department: 'Finance', experience: 4, status: 'Active', skills: ['Excel', 'Financial Modeling'] },
  { id: 7, employeeCode: 'EMP007', name: 'Grace Kim', email: 'grace.kim@company.com', phone: '555-0107', designation: 'Full Stack Engineer', department: 'Engineering', experience: 4, status: 'Active', skills: ['React', 'Java', 'Docker'] },
  { id: 8, employeeCode: 'EMP008', name: 'Irene Lopez', email: 'irene.lopez@company.com', phone: '555-0108', designation: 'Operations Lead', department: 'Operations', experience: 8, status: 'Active', skills: ['Process Management', 'ERP'] },
];

export function mapEmployee(emp) {
  if (!emp) return null;
  return {
    id:           emp.id,
    employeeCode: emp.employeeCode ?? `EMP00${emp.id || 1}`,
    name:         emp.name || `Employee #${emp.id}`,
    email:        emp.email || 'employee@company.com',
    phone:        emp.phone ?? '555-0000',
    designation:  emp.designation || 'Software Engineer',
    department:   typeof emp.department === 'string' ? emp.department : emp.department?.departmentName ?? 'Engineering',
    experience:   emp.experience ?? 4,
    status:       emp.status ?? 'Active',
    skills:       emp.skills ?? ['React', 'Node.js'],
  };
}

export function getEmployees() {
  return fetchWithFallback({
    request: () => api.get('/employees'),
    mockData: MOCK_EMPLOYEES,
    normalize: mapEmployee,
    moduleName: 'Employees',
  });
}

export function getEmployeeById(id) {
  return fetchWithFallback({
    request: () => api.get(`/employees/${id}`),
    mockData: () => MOCK_EMPLOYEES.find((e) => e.id === Number(id)) || MOCK_EMPLOYEES[0],
    normalize: mapEmployee,
    moduleName: 'Employee Details',
  });
}
