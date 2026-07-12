-- ============================================================================
-- Seed / reference data
-- Run after 01_schema.sql
-- ============================================================================

-- Sample departments
INSERT INTO departments (name, code) VALUES
    ('Engineering', 'ENG'),
    ('Human Resources', 'HR'),
    ('Product', 'PROD'),
    ('Sales', 'SALES')
ON CONFLICT DO NOTHING;

-- Sample job titles
INSERT INTO job_titles (title, department_id, description)
SELECT 'Software Engineer', id, 'Builds and maintains software systems' FROM departments WHERE code = 'ENG'
UNION ALL
SELECT 'Engineering Manager', id, 'Leads engineering teams' FROM departments WHERE code = 'ENG'
UNION ALL
SELECT 'HR Specialist', id, 'Manages workforce programs' FROM departments WHERE code = 'HR'
UNION ALL
SELECT 'Product Manager', id, 'Owns product strategy and roadmap' FROM departments WHERE code = 'PROD';

-- Skill categories
INSERT INTO skill_categories (name, description) VALUES
    ('Programming Languages', 'Core coding languages'),
    ('Cloud & DevOps', 'Cloud platforms and delivery tooling'),
    ('Data & Analytics', 'Data engineering, analysis, and BI'),
    ('Soft Skills', 'Communication, leadership, collaboration'),
    ('Product & Design', 'Product thinking and UX')
ON CONFLICT DO NOTHING;

-- Sample skills
INSERT INTO skills (category_id, name, description)
SELECT id, 'Java', 'Java programming language' FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT id, 'React.js', 'React front-end library' FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT id, 'Spring Boot', 'Java backend framework' FROM skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT id, 'AWS', 'Amazon Web Services' FROM skill_categories WHERE name = 'Cloud & DevOps'
UNION ALL
SELECT id, 'Docker', 'Containerization' FROM skill_categories WHERE name = 'Cloud & DevOps'
UNION ALL
SELECT id, 'SQL', 'Relational database querying' FROM skill_categories WHERE name = 'Data & Analytics'
UNION ALL
SELECT id, 'Data Visualization', 'Charting and BI tooling' FROM skill_categories WHERE name = 'Data & Analytics'
UNION ALL
SELECT id, 'Stakeholder Communication', 'Cross-functional communication' FROM skill_categories WHERE name = 'Soft Skills'
UNION ALL
SELECT id, 'Public Speaking', 'Presenting to groups' FROM skill_categories WHERE name = 'Soft Skills'
UNION ALL
SELECT id, 'UX Research', 'User research methods' FROM skill_categories WHERE name = 'Product & Design';
