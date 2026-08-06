-- Seed data for Organizational Knowledge Gap Intelligence Platform

-- Clear existing data (in case script is re-run)
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE notifications CASCADE;
TRUNCATE TABLE mentorship_sessions CASCADE;
TRUNCATE TABLE mentorship_matches CASCADE;
TRUNCATE TABLE enrollments CASCADE;
TRUNCATE TABLE courses CASCADE;
TRUNCATE TABLE employee_skills CASCADE;
TRUNCATE TABLE role_requirements CASCADE;
TRUNCATE TABLE skills CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert Users (Password is BCrypt hash of 'password')
INSERT INTO users (username, password, email, role, department, full_name, title) VALUES
('admin', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'admin@okgip.com', 'ADMIN', 'Executive', 'Alice Johnson', 'System Administrator'),
('manager', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'manager@okgip.com', 'MANAGER', 'Engineering', 'Bob Smith', 'Engineering Manager'),
('employee1', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'employee1@okgip.com', 'EMPLOYEE', 'Engineering', 'Charlie Brown', 'Junior Software Engineer'),
('employee2', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'employee2@okgip.com', 'EMPLOYEE', 'Engineering', 'Diana Prince', 'Senior Software Engineer'),
('hr', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'hr@okgip.com', 'HR_SPECIALIST', 'Human Resources', 'Emma Watson', 'HR Business Partner'),
('product_manager', '$2a$10$hKDVYxLefVLYjlwRtgZ6G.LgjhC.O4A45B8S/nK9pS4nUaD.Q9NKG', 'pm@okgip.com', 'MANAGER', 'Product', 'Frank Castle', 'Director of Product');

-- Insert Skills
INSERT INTO skills (name, category, description) VALUES
('Java', 'Backend', 'Core Java, Collections, Multithreading, and OOP concepts'),
('Spring Boot', 'Backend', 'REST APIs, Dependency Injection, JPA, Hibernate, and Security'),
('React.js', 'Frontend', 'Components, Hooks, State Management, and Virtual DOM'),
('PostgreSQL', 'Cloud & DB', 'Relational database design, SQL querying, indexing, and optimization'),
('Docker', 'Cloud & DB', 'Containerization, Dockerfiles, Docker Compose, and registry management'),
('Redis', 'Cloud & DB', 'Caching, Pub/Sub, and key-value store usage'),
('Elasticsearch', 'Cloud & DB', 'Full-text search engine index design, mapping, and querying'),
('Product Roadmap', 'Management', 'Developing strategic product direction, milestone mapping, and releases'),
('Communication', 'Soft Skills', 'Effective oral and written workplace sharing, listening, and active collaboration'),
('Conflict Resolution', 'Soft Skills', 'Mediating disputes and finding win-win agreements among team members');

-- Insert Competency Requirements (Role Requirements)
-- Engineering
INSERT INTO role_requirements (role, department, skill_id, required_level) VALUES
('EMPLOYEE', 'Engineering', 1, 3), -- Java
('EMPLOYEE', 'Engineering', 2, 3), -- Spring Boot
('EMPLOYEE', 'Engineering', 3, 2), -- React.js
('EMPLOYEE', 'Engineering', 4, 2), -- PostgreSQL
('EMPLOYEE', 'Engineering', 5, 2), -- Docker
('MANAGER', 'Engineering', 1, 2),
('MANAGER', 'Engineering', 2, 2),
('MANAGER', 'Engineering', 9, 4), -- Communication
('MANAGER', 'Engineering', 10, 4); -- Conflict Resolution

-- Product
INSERT INTO role_requirements (role, department, skill_id, required_level) VALUES
('EMPLOYEE', 'Product', 8, 3), -- Product Roadmap
('EMPLOYEE', 'Product', 9, 3), -- Communication
('MANAGER', 'Product', 8, 4), -- Product Roadmap
('MANAGER', 'Product', 9, 4); -- Communication

-- Human Resources
INSERT INTO role_requirements (role, department, skill_id, required_level) VALUES
('EMPLOYEE', 'Human Resources', 9, 3),
('EMPLOYEE', 'Human Resources', 10, 3),
('HR_SPECIALIST', 'Human Resources', 9, 4),
('HR_SPECIALIST', 'Human Resources', 10, 4),
('MANAGER', 'Human Resources', 9, 4),
('MANAGER', 'Human Resources', 10, 4);

-- Sales & Executive
INSERT INTO role_requirements (role, department, skill_id, required_level) VALUES
('EMPLOYEE', 'Sales', 9, 4),
('EMPLOYEE', 'Sales', 10, 3),
('MANAGER', 'Sales', 9, 4),
('MANAGER', 'Sales', 10, 4),
('EMPLOYEE', 'Executive', 9, 4),
('EMPLOYEE', 'Executive', 8, 3),
('MANAGER', 'Executive', 9, 4),
('MANAGER', 'Executive', 8, 4),
('ADMIN', 'Executive', 5, 3),
('ADMIN', 'Executive', 4, 3);

-- Insert Employee Skills (Inventory)
-- Charlie (employee1): Has gaps in Java, Spring Boot, PostgreSQL, and Docker.
INSERT INTO employee_skills (user_id, skill_id, proficiency_level, source, updated_at) VALUES
(3, 1, 1, 'SELF', CURRENT_TIMESTAMP - INTERVAL '10 days'), -- Java: Beginner (Gap of 2)
(3, 2, 1, 'SELF', CURRENT_TIMESTAMP - INTERVAL '10 days'), -- Spring Boot: Beginner (Gap of 2)
(3, 3, 2, 'SELF', CURRENT_TIMESTAMP - INTERVAL '10 days'), -- React.js: Intermediate (Gap of 0)
(3, 4, 1, 'SELF', CURRENT_TIMESTAMP - INTERVAL '10 days'), -- PostgreSQL: Beginner (Gap of 1)
(3, 5, 1, 'SELF', CURRENT_TIMESTAMP - INTERVAL '10 days'); -- Docker: Beginner (Gap of 1)

-- Diana (employee2): Senior developer. Meets or exceeds requirements, and can act as a mentor.
INSERT INTO employee_skills (user_id, skill_id, proficiency_level, source, updated_at) VALUES
(4, 1, 4, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- Java: Expert
(4, 2, 3, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- Spring Boot: Advanced
(4, 3, 2, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- React.js: Intermediate
(4, 4, 3, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- PostgreSQL: Advanced
(4, 5, 3, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- Docker: Advanced
(4, 6, 2, 'SELF', CURRENT_TIMESTAMP - INTERVAL '5 days'); -- Redis: Intermediate

-- Bob (manager)
INSERT INTO employee_skills (user_id, skill_id, proficiency_level, source, updated_at) VALUES
(2, 1, 2, 'SELF', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(2, 9, 4, 'SELF', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(2, 10, 3, 'SELF', CURRENT_TIMESTAMP - INTERVAL '2 days'); -- Conflict Resolution: Advanced (Gap of 1)

-- Insert Courses (100% Free Open Educational Platforms)
INSERT INTO courses (title, provider, description, difficulty_level, url, skill_id) VALUES
('Java Programming & Data Structures (Free)', 'Infosys Springboard', '100% Free comprehensive Java course covering core concepts, lambdas, streams, and multithreading.', 'Intermediate', 'https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Java&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D', 1),
('Spring Boot 3 & Microservices Full Course', 'freeCodeCamp', '100% Free guide to build REST APIs and microservices with Spring Boot, JPA, Hibernate, and Spring Security.', 'Advanced', 'https://www.freecodecamp.org/news/build-a-spring-boot-application/', 2),
('React.js Full Interactive Course', 'freeCodeCamp', 'Learn React.js from scratch 100% free, including Hooks, Router, State Management, and Next.js.', 'Intermediate', 'https://www.freecodecamp.org/news/tag/react/', 3),
('PostgreSQL Database Administration & SQL', 'PostgreSQL Tutorial', 'Master PostgreSQL query design, database schema, and performance indexing for free.', 'Beginner', 'https://www.postgresqltutorial.com/', 4),
('Docker Containerization & Kubernetes Basics', 'Docker Docs', '100% Free official guide to containerize apps and run Docker and Kubernetes clusters.', 'Intermediate', 'https://docs.docker.com/get-started/', 5),
('Redis In-Memory Caching Essentials', 'Redis University', 'Free official course on Redis caching patterns, data structures, and key-value models.', 'Intermediate', 'https://university.redis.io/', 6);

-- Insert Enrollments
-- Charlie (user 3) is taking the Java and Spring Boot courses to close his gaps.
INSERT INTO enrollments (user_id, course_id, status, enrolled_at, completed_at) VALUES
(3, 1, 'IN_PROGRESS', CURRENT_TIMESTAMP - INTERVAL '3 days', NULL),
(3, 2, 'NOT_STARTED', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL);

-- Insert Mentorship Matches
-- Diana (user 4) is mentoring Charlie (user 3) in Java
INSERT INTO mentorship_matches (mentor_id, mentee_id, skill_id, status, created_at) VALUES
(4, 3, 1, 'ACTIVE', CURRENT_TIMESTAMP - INTERVAL '4 days');

-- Insert Mentorship Sessions
INSERT INTO mentorship_sessions (match_id, title, scheduled_at, duration_minutes, status) VALUES
(1, 'Java Core & Collections Walkthrough', CURRENT_TIMESTAMP + INTERVAL '1 days 2 hours', 60, 'SCHEDULED'),
(1, 'Spring Boot JPA & Hibernate Integration Tips', CURRENT_TIMESTAMP + INTERVAL '4 days 3 hours', 90, 'SCHEDULED');

-- Insert Notifications
INSERT INTO notifications (user_id, message, type, read, created_at) VALUES
(3, 'Welcome to the platform! Please complete your skill self-assessment in the Profile tab.', 'RECOMMENDATION', FALSE, CURRENT_TIMESTAMP - INTERVAL '5 hours'),
(3, 'Mentorship match with Diana Prince is now ACTIVE. A new session is scheduled for tomorrow.', 'MENTORSHIP', FALSE, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(2, 'Skill Gap Alert: Charlie Brown has a gap of 2 in Java (Required: 3, Current: 1).', 'GAP_ALERT', FALSE, CURRENT_TIMESTAMP - INTERVAL '1 hours');

-- Insert Audit Logs
INSERT INTO audit_logs (action, performed_by, timestamp, details) VALUES
('USER_REGISTRATION', 'system', CURRENT_TIMESTAMP - INTERVAL '10 days', 'Default seed users registered in database'),
('ROLE_REQUIREMENT_SET', 'admin', CURRENT_TIMESTAMP - INTERVAL '9 days', 'Set engineering team required skill levels for Java, Spring Boot, React, and Postgres');
