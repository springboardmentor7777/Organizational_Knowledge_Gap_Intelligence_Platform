SET search_path TO organization;

-- Roles
INSERT INTO roles (role_name)
VALUES
('Admin'),
('Manager'),
('Employee');

-- Departments
INSERT INTO departments (department_name)
VALUES
('HR'),
('IT'),
('Finance');

-- Users
INSERT INTO users (username, email, role_id)
VALUES
('Alice', 'alice@gmail.com', 1),
('Bob', 'bob@gmail.com', 2),
('Charlie', 'charlie@gmail.com', 3);

-- Employees
INSERT INTO employees (user_id, department_id, salary, joining_date)
VALUES
(1, 2, 80000.00, '2025-01-10'),
(2, 1, 60000.00, '2024-08-15'),
(3, 3, 50000.00, '2023-03-12');