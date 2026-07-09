SET search_path TO organization;

CREATE INDEX idx_users_username
ON users(username);

CREATE INDEX idx_users_role
ON users(role_id);

CREATE INDEX idx_employees_department
ON employees(department_id);