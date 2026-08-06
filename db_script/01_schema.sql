-- Schema for Organizational Knowledge Gap Intelligence Platform

-- Drop tables if they exist
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS mentorship_sessions CASCADE;
DROP TABLE IF EXISTS mentorship_matches CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS employee_skills CASCADE;
DROP TABLE IF EXISTS role_requirements CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS email_otps CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS refresh_tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL, -- EMPLOYEE, MANAGER, HR_SPECIALIST, ADMIN
    department VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    phone VARCHAR(30),
    location VARCHAR(100),
    bio TEXT,
    linkedin_url VARCHAR(255),
    is_available_for_mentorship BOOLEAN DEFAULT TRUE,
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    failed_attempt INT DEFAULT 0,
    account_non_locked BOOLEAN DEFAULT TRUE,
    lock_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email OTPs Table
CREATE TABLE email_otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh Tokens Table
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password Reset Tokens Table
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., Backend, Frontend, Cloud, Soft Skills
    description TEXT
);

-- Competency frameworks / role requirements
CREATE TABLE role_requirements (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    required_level INTEGER NOT NULL CHECK (required_level BETWEEN 0 AND 4), -- 0: Unaware, 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert
    CONSTRAINT unique_role_dept_skill UNIQUE (role, department, skill_id)
);

-- Employee Skill Inventory
CREATE TABLE employee_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER NOT NULL CHECK (proficiency_level BETWEEN 0 AND 4),
    source VARCHAR(20) NOT NULL, -- SELF, PEER, MANAGER
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_skill_source UNIQUE (user_id, skill_id, source)
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- Coursera, Udemy, Internal, etc.
    description TEXT,
    difficulty_level VARCHAR(20) NOT NULL, -- Beginner, Intermediate, Advanced
    url VARCHAR(255),
    is_free BOOLEAN DEFAULT TRUE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE
);

-- Enrollments / Learning Progress
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED', -- NOT_STARTED, IN_PROGRESS, COMPLETED
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    certificate_url VARCHAR(255),
    certificate_id VARCHAR(100)
);

-- Mentorship Matching
CREATE TABLE mentorship_matches (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mentee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, ACTIVE, COMPLETED, DECLINED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_mentor_mentee_skill UNIQUE (mentor_id, mentee_id, skill_id)
);

-- Mentorship Sessions
CREATE TABLE mentorship_sessions (
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES mentorship_matches(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED' -- SCHEDULED, COMPLETED, CANCELLED
);

-- Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(30) NOT NULL, -- GAP_ALERT, DEADLINE, RECOMMENDATION, MENTORSHIP
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT
);
