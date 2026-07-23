-- ==========================================
-- Organizational Knowledge Gap Intelligence Platform
-- Milestone 1 & Milestone 2 Database
-- PostgreSQL
-- ==========================================

CREATE TABLE usersdetail (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(100),
    role VARCHAR(100),
    experience INT
);

CREATE TABLE skill_table (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL
);

CREATE TABLE employee_skills (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    FOREIGN KEY (skill_id) REFERENCES skill_table(id)
);

CREATE TABLE assessment (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    skill_id INT NOT NULL,
    current_level INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id),
    FOREIGN KEY (skill_id) REFERENCES skill_table(id)
);

CREATE TABLE competency (
    id SERIAL PRIMARY KEY,
    skill_id INT UNIQUE NOT NULL,
    required_level INT NOT NULL,
    FOREIGN KEY (skill_id) REFERENCES skill_table(id)
);

INSERT INTO usersdetail(email, password)
VALUES
('admin@gmail.com','admin123'),
('employee@gmail.com','emp123');

INSERT INTO employee(employee_id,name,email,department,role,experience)
VALUES
('EMP001','Kalaivani','kalai@gmail.com','IT','Java Developer',2),
('EMP002','Rahul','rahul@gmail.com','IT','Backend Developer',3);

INSERT INTO skill_table(skill_name,category)
VALUES
('Java','Programming'),
('Spring Boot','Backend'),
('SQL','Database');

INSERT INTO employee_skills(employee_id,skill_id)
VALUES
(1,1),
(1,2),
(2,1),
(2,3);

INSERT INTO assessment(employee_id,skill_id,current_level)
VALUES
(1,1,3),
(1,2,2),
(2,1,4),
(2,3,2);

INSERT INTO competency(skill_id,required_level)
VALUES
(1,5),
(2,4),
(3,3);