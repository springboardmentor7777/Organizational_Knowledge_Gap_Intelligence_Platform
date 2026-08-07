-- Seed data for H2 using MERGE INTO with explicit column mapping
-- Insert Departments
MERGE INTO departments (id, name, code, parent_department_id) KEY(id) VALUES ('de000000-0000-0000-0000-000000000001', 'Engineering', 'ENG', NULL);
MERGE INTO departments (id, name, code, parent_department_id) KEY(id) VALUES ('de000000-0000-0000-0000-000000000002', 'Human Resources', 'HR', NULL);
MERGE INTO departments (id, name, code, parent_department_id) KEY(id) VALUES ('de000000-0000-0000-0000-000000000003', 'Product', 'PROD', NULL);
MERGE INTO departments (id, name, code, parent_department_id) KEY(id) VALUES ('de000000-0000-0000-0000-000000000004', 'Sales', 'SALES', NULL);

-- Insert Job Titles
MERGE INTO job_titles (id, title, department_id, description) KEY(id) VALUES ('b0000000-0000-0000-0000-000000000001', 'Software Engineer', 'de000000-0000-0000-0000-000000000001', 'Builds and maintains software systems');
MERGE INTO job_titles (id, title, department_id, description) KEY(id) VALUES ('b0000000-0000-0000-0000-000000000002', 'Engineering Manager', 'de000000-0000-0000-0000-000000000001', 'Leads engineering teams');
MERGE INTO job_titles (id, title, department_id, description) KEY(id) VALUES ('b0000000-0000-0000-0000-000000000003', 'HR Specialist', 'de000000-0000-0000-0000-000000000002', 'Manages workforce programs');
MERGE INTO job_titles (id, title, department_id, description) KEY(id) VALUES ('b0000000-0000-0000-0000-000000000004', 'Product Manager', 'de000000-0000-0000-0000-000000000003', 'Owns product strategy and roadmap');

-- Insert Users
MERGE INTO users (id, email, password_hash, first_name, last_name, phone, avatar_url, department_id, job_title_id, manager_id, hire_date, is_active, is_email_verified, created_at, updated_at) KEY(id) VALUES ('a0000000-0000-0000-0000-000000000001', 'alex.johnson@orgknow.com', '$2a$10$8.UnVuG9HHgffUDalk8Ur.dGC3EaCYg2K/6v1A2Xq7x8m7/1yqZ2a', 'Alex', 'Johnson', '1234567890', NULL, 'de000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', NULL, '2022-03-15', TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
MERGE INTO users (id, email, password_hash, first_name, last_name, phone, avatar_url, department_id, job_title_id, manager_id, hire_date, is_active, is_email_verified, created_at, updated_at) KEY(id) VALUES ('a0000000-0000-0000-0000-000000000002', 'manager@orgknow.com', '$2a$10$8.UnVuG9HHgffUDalk8Ur.dGC3EaCYg2K/6v1A2Xq7x8m7/1yqZ2a', 'Mike', 'Chen', '1234567891', NULL, 'de000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', NULL, '2020-01-10', TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
MERGE INTO users (id, email, password_hash, first_name, last_name, phone, avatar_url, department_id, job_title_id, manager_id, hire_date, is_active, is_email_verified, created_at, updated_at) KEY(id) VALUES ('a0000000-0000-0000-0000-000000000003', 'hr@orgknow.com', '$2a$10$8.UnVuG9HHgffUDalk8Ur.dGC3EaCYg2K/6v1A2Xq7x8m7/1yqZ2a', 'Jane', 'Smith', '1234567892', NULL, 'de000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003', NULL, '2021-05-20', TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
MERGE INTO users (id, email, password_hash, first_name, last_name, phone, avatar_url, department_id, job_title_id, manager_id, hire_date, is_active, is_email_verified, created_at, updated_at) KEY(id) VALUES ('a0000000-0000-0000-0000-000000000004', 'admin@orgknow.com', '$2a$10$8.UnVuG9HHgffUDalk8Ur.dGC3EaCYg2K/6v1A2Xq7x8m7/1yqZ2a', 'Super', 'Admin', '1234567893', NULL, NULL, NULL, NULL, '2019-06-01', TRUE, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Grant Roles
MERGE INTO user_system_roles (user_id, system_role) KEY(user_id, system_role) VALUES ('a0000000-0000-0000-0000-000000000001', 'EMPLOYEE');
MERGE INTO user_system_roles (user_id, system_role) KEY(user_id, system_role) VALUES ('a0000000-0000-0000-0000-000000000002', 'MANAGER');
MERGE INTO user_system_roles (user_id, system_role) KEY(user_id, system_role) VALUES ('a0000000-0000-0000-0000-000000000002', 'EMPLOYEE');
MERGE INTO user_system_roles (user_id, system_role) KEY(user_id, system_role) VALUES ('a0000000-0000-0000-0000-000000000003', 'HR_SPECIALIST');
MERGE INTO user_system_roles (user_id, system_role) KEY(user_id, system_role) VALUES ('a0000000-0000-0000-0000-000000000004', 'SYSTEM_ADMIN');

-- Skill Categories
MERGE INTO skill_categories (id, name, description) KEY(id) VALUES ('c0000000-0000-0000-0000-000000000001', 'Programming Languages', 'Core coding languages');
MERGE INTO skill_categories (id, name, description) KEY(id) VALUES ('c0000000-0000-0000-0000-000000000002', 'Cloud & DevOps', 'Cloud platforms and delivery tooling');
MERGE INTO skill_categories (id, name, description) KEY(id) VALUES ('c0000000-0000-0000-0000-000000000003', 'Data & Analytics', 'Data engineering, analysis, and BI');
MERGE INTO skill_categories (id, name, description) KEY(id) VALUES ('c0000000-0000-0000-0000-000000000004', 'Soft Skills', 'Communication, leadership, collaboration');
MERGE INTO skill_categories (id, name, description) KEY(id) VALUES ('c0000000-0000-0000-0000-000000000005', 'Product & Design', 'Product thinking and UX');

-- Skills
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Java', 'Java programming language', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'React.js', 'React front-end library', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'AWS', 'Amazon Web Services', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', 'Docker', 'Containerization', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 'SQL', 'Relational database querying', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000003', 'Data Visualization', 'Charting and BI tooling', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000004', 'Stakeholder Communication', 'Cross-functional communication', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000004', 'Public Speaking', 'Presenting to groups', TRUE, CURRENT_TIMESTAMP);
MERGE INTO skills (id, category_id, name, description, is_active, created_at) KEY(id) VALUES ('e0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000005', 'UX Research', 'User research methods', TRUE, CURRENT_TIMESTAMP);

-- Insert Courses
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000101', 'AWS Certified Solutions Architect Masterclass', 'AWS Skill Builder', 'c0000000-0000-0000-0000-000000000002', 14.5, 0.0, 'OTHER', 'https://aws.amazon.com/training/', 'Master VPCs, EC2, IAM, Lambda, and multi-region resilience to eliminate critical cloud gaps.', TRUE, CURRENT_TIMESTAMP);
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000102', 'Advanced React 19 & Performance Optimization', 'Coursera', 'c0000000-0000-0000-0000-000000000001', 8.75, 0.0, 'COURSERA', 'https://www.coursera.org/', 'Learn Server Components, Compiler optimizations, and state management at enterprise scale.', TRUE, CURRENT_TIMESTAMP);
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000103', 'LLMOps: Deploying Production AI Systems', 'Udemy', 'c0000000-0000-0000-0000-000000000003', 12.0, 0.0, 'UDEMY', 'https://www.udemy.com/', 'Fine-tuning, vector databases, RAG architecture, and monitoring for modern AI models.', TRUE, CURRENT_TIMESTAMP);
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000104', 'Enterprise Design Systems & Tokens', 'Internal Catalog', 'c0000000-0000-0000-0000-000000000005', 4.0, 0.0, 'INTERNAL', '#', 'Internal guide to our Figma token library, accessibility compliance, and UI patterns.', TRUE, CURRENT_TIMESTAMP);
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000105', 'Agile Leadership & Cross-Functional Coaching', 'LinkedIn Learning', 'c0000000-0000-0000-0000-000000000004', 5.5, 0.0, 'LINKEDIN_LEARNING', 'https://www.linkedin.com/learning/', 'Empower autonomous teams, manage sprints, and remove systemic bottlenecks.', TRUE, CURRENT_TIMESTAMP);
MERGE INTO courses (id, title, provider, category_id, duration_hours, cost, source, external_url, description, is_active, created_at) KEY(id) VALUES 
    ('c0000000-0000-0000-0000-000000000106', 'Kubernetes & GitOps with ArgoCD', 'Pluralsight', 'c0000000-0000-0000-0000-000000000002', 10.25, 0.0, 'OTHER', 'https://www.pluralsight.com/', 'Automate zero-downtime microservice deployments on Kubernetes using GitOps principles.', TRUE, CURRENT_TIMESTAMP);
