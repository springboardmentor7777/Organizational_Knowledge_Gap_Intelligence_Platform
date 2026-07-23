SET search_path TO organization;

-- ==========================================
-- Users Indexes
-- ==========================================

CREATE INDEX idx_users_username
ON users(username);

CREATE INDEX idx_users_role
ON users(role_id);

-- ==========================================
-- Employees Indexes
-- ==========================================

CREATE INDEX idx_employees_department
ON employees(department_id);

-- ==========================================
-- Skills Indexes
-- ==========================================

CREATE INDEX idx_skills_name
ON skills(skill_name);

-- ==========================================
-- Employee Skills Indexes
-- ==========================================

CREATE INDEX idx_employee_skills_employee
ON employee_skills(employee_id);

CREATE INDEX idx_employee_skills_skill
ON employee_skills(skill_id);

-- ==========================================
-- Department Competencies Indexes
-- ==========================================

CREATE INDEX idx_department_competencies_department
ON department_competencies(department_id);

-- ==========================================
-- Gap Analysis Indexes
-- ==========================================

CREATE INDEX idx_gap_employee
ON gap_analysis(employee_id);

CREATE INDEX idx_gap_skill
ON gap_analysis(skill_id);

CREATE INDEX idx_gap_status
ON gap_analysis(status);

-- ==========================================
-- Training Recommendations Indexes
-- ==========================================

CREATE INDEX idx_training_gap
ON training_recommendations(gap_id);