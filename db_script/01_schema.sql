-- ============================================================================
-- Organizational Knowledge Gap Intelligence Platform
-- PostgreSQL Database Schema
-- ============================================================================
-- Covers Modules 1-11 from the project spec:
--   1. Auth & Role-Based Access
--   2. Employee Profile & Skill Inventory
--   3. Competency Framework & Role Benchmarking
--   4. Knowledge Gap Analysis
--   5. Training Recommendation
--   6. Knowledge-Sharing & Mentorship
--   7. Learning Progress Tracking
--   8. Assessment & Survey
--   9. Notifications
--   10. Analytics Dashboard (reads from tables below, no own tables needed)
--   11. Reports & Export
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- for gen_random_uuid()

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE system_role_enum AS ENUM (
    'EMPLOYEE',
    'MANAGER',
    'HR_SPECIALIST',
    'DEPARTMENT_HEAD',
    'LND_ADMIN',
    'SYSTEM_ADMIN'
);

CREATE TYPE proficiency_level_enum AS ENUM (
    'UNAWARE',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'EXPERT'
);

CREATE TYPE training_status_enum AS ENUM (
    'NOT_STARTED',
    'IN_PROGRESS',
    'COMPLETED',
    'CERTIFIED',
    'EXPIRED_RENEWAL_REQUIRED'
);

CREATE TYPE gap_severity_enum AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

CREATE TYPE gap_dimension_enum AS ENUM (
    'ROLE_REQUIREMENT',
    'PROJECT_DEMAND',
    'ORG_GOAL',
    'FUTURE_FORECAST'
);

CREATE TYPE course_source_enum AS ENUM (
    'INTERNAL',
    'COURSERA',
    'UDEMY',
    'LINKEDIN_LEARNING',
    'OTHER'
);

CREATE TYPE assessment_type_enum AS ENUM (
    'SELF',
    'PEER',
    'MANAGER',
    'THREE_SIXTY'
);

CREATE TYPE assessment_status_enum AS ENUM (
    'SCHEDULED',
    'IN_PROGRESS',
    'COMPLETED',
    'OVERDUE'
);

CREATE TYPE mentorship_status_enum AS ENUM (
    'PROPOSED',
    'ACTIVE',
    'COMPLETED',
    'DECLINED',
    'CANCELLED'
);

CREATE TYPE session_status_enum AS ENUM (
    'SCHEDULED',
    'COMPLETED',
    'CANCELLED'
);

CREATE TYPE notification_channel_enum AS ENUM (
    'EMAIL',
    'SMS',
    'PUSH',
    'IN_APP'
);

CREATE TYPE report_scope_enum AS ENUM (
    'INDIVIDUAL',
    'DEPARTMENT',
    'ORGANIZATION'
);

CREATE TYPE report_format_enum AS ENUM (
    'PDF',
    'EXCEL'
);

-- ============================================================================
-- MODULE 1: ORG STRUCTURE, AUTH & ROLE-BASED ACCESS
-- ============================================================================

CREATE TABLE departments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(150) NOT NULL,
    code                VARCHAR(30) UNIQUE,
    parent_department_id UUID REFERENCES departments(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE job_titles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(150) NOT NULL,
    department_id   UUID REFERENCES departments(id),
    description     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email               VARCHAR(255) NOT NULL UNIQUE,
    password_hash       VARCHAR(255),              -- nullable for OAuth-only accounts
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    phone               VARCHAR(30),
    avatar_url          VARCHAR(500),
    department_id       UUID REFERENCES departments(id),
    job_title_id        UUID REFERENCES job_titles(id),
    manager_id          UUID REFERENCES users(id),
    hire_date           DATE,
    is_active           BOOLEAN NOT NULL DEFAULT true,
    is_email_verified   BOOLEAN NOT NULL DEFAULT false,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_users_manager ON users(manager_id);

CREATE TABLE user_system_roles (
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    system_role     system_role_enum NOT NULL,
    granted_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, system_role)
);

CREATE TABLE oauth_accounts (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider            VARCHAR(50) NOT NULL,       -- e.g. GOOGLE
    provider_user_id    VARCHAR(255) NOT NULL,
    access_token        TEXT,
    refresh_token       TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (provider, provider_user_id)
);

CREATE TABLE refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token       VARCHAR(500) NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked     BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);

CREATE TABLE password_reset_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token       VARCHAR(255) NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    used        BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activity_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id),
    action      VARCHAR(150) NOT NULL,
    entity_type VARCHAR(100),
    entity_id   UUID,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);

-- ============================================================================
-- MODULE 2: EMPLOYEE PROFILE & SKILL INVENTORY
-- ============================================================================

CREATE TABLE employee_profiles (
    user_id     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    bio         TEXT,
    location    VARCHAR(150),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE work_experience (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company     VARCHAR(200) NOT NULL,
    title       VARCHAR(150) NOT NULL,
    start_date  DATE,
    end_date    DATE,
    description TEXT
);
CREATE INDEX idx_work_experience_user ON work_experience(user_id);

CREATE TABLE education_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(200) NOT NULL,
    degree      VARCHAR(150),
    field       VARCHAR(150),
    start_date  DATE,
    end_date    DATE
);
CREATE INDEX idx_education_history_user ON education_history(user_id);

CREATE TABLE certifications (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                VARCHAR(200) NOT NULL,
    issuing_org         VARCHAR(200),
    issue_date          DATE,
    expiry_date         DATE,
    credential_url      VARCHAR(500),
    status              training_status_enum NOT NULL DEFAULT 'COMPLETED',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_certifications_user ON certifications(user_id);

CREATE TABLE skill_categories (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name    VARCHAR(150) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE skills (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id     UUID REFERENCES skill_categories(id),
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (category_id, name)
);

CREATE TABLE employee_skills (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id            UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level   proficiency_level_enum NOT NULL DEFAULT 'UNAWARE',
    self_rated          BOOLEAN NOT NULL DEFAULT true,
    verified_by         UUID REFERENCES users(id),
    last_assessed_at    TIMESTAMPTZ,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, skill_id)
);
CREATE INDEX idx_employee_skills_user ON employee_skills(user_id);
CREATE INDEX idx_employee_skills_skill ON employee_skills(skill_id);

-- ============================================================================
-- MODULE 3: COMPETENCY FRAMEWORK & ROLE BENCHMARKING
-- ============================================================================

CREATE TABLE competency_frameworks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title_id    UUID NOT NULL REFERENCES job_titles(id),
    name            VARCHAR(200) NOT NULL,
    version         INT NOT NULL DEFAULT 1,
    effective_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    is_current      BOOLEAN NOT NULL DEFAULT true,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_competency_frameworks_job_title ON competency_frameworks(job_title_id);

CREATE TABLE competency_framework_skills (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework_id                UUID NOT NULL REFERENCES competency_frameworks(id) ON DELETE CASCADE,
    skill_id                    UUID NOT NULL REFERENCES skills(id),
    required_proficiency_level  proficiency_level_enum NOT NULL,
    weight                      NUMERIC(4,2) NOT NULL DEFAULT 1.0,
    UNIQUE (framework_id, skill_id)
);

CREATE TABLE industry_benchmarks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id        UUID NOT NULL REFERENCES skills(id),
    industry        VARCHAR(150) NOT NULL,
    benchmark_level proficiency_level_enum NOT NULL,
    source          VARCHAR(255),
    recorded_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- MODULE 4: KNOWLEDGE GAP ANALYSIS
-- ============================================================================

CREATE TABLE skill_gaps (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        UUID NOT NULL REFERENCES skills(id),
    required_level  proficiency_level_enum NOT NULL,
    current_level   proficiency_level_enum NOT NULL,
    gap_score       NUMERIC(5,2) NOT NULL,          -- computed distance between levels
    severity        gap_severity_enum NOT NULL,
    dimension       gap_dimension_enum NOT NULL DEFAULT 'ROLE_REQUIREMENT',
    detected_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_skill_gaps_user ON skill_gaps(user_id);
CREATE INDEX idx_skill_gaps_skill ON skill_gaps(skill_id);
CREATE INDEX idx_skill_gaps_severity ON skill_gaps(severity);

CREATE TABLE team_gap_aggregates (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manager_id          UUID NOT NULL REFERENCES users(id),
    skill_id            UUID NOT NULL REFERENCES skills(id),
    avg_gap_score       NUMERIC(5,2) NOT NULL,
    employees_affected  INT NOT NULL DEFAULT 0,
    period_start        DATE NOT NULL,
    period_end          DATE NOT NULL,
    generated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_team_gap_manager ON team_gap_aggregates(manager_id);

CREATE TABLE department_gap_aggregates (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id       UUID NOT NULL REFERENCES departments(id),
    skill_id            UUID NOT NULL REFERENCES skills(id),
    avg_gap_score       NUMERIC(5,2) NOT NULL,
    employees_affected  INT NOT NULL DEFAULT 0,
    period_start         DATE NOT NULL,
    period_end           DATE NOT NULL,
    generated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_dept_gap_department ON department_gap_aggregates(department_id);

CREATE TABLE gap_trend_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_type  VARCHAR(20) NOT NULL,   -- 'USER' | 'TEAM' | 'DEPARTMENT'
    reference_id    UUID NOT NULL,
    skill_id        UUID REFERENCES skills(id),
    gap_score       NUMERIC(5,2) NOT NULL,
    recorded_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_gap_trend_reference ON gap_trend_history(reference_type, reference_id);

-- ============================================================================
-- MODULE 5: TRAINING RECOMMENDATION
-- ============================================================================

CREATE TABLE courses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    provider        VARCHAR(150),
    external_url    VARCHAR(500),
    category_id     UUID REFERENCES skill_categories(id),
    duration_hours  NUMERIC(6,2),
    cost            NUMERIC(10,2) DEFAULT 0,
    source          course_source_enum NOT NULL DEFAULT 'INTERNAL',
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE course_skills (
    course_id               UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    skill_id                UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    target_proficiency_level proficiency_level_enum NOT NULL,
    PRIMARY KEY (course_id, skill_id)
);

CREATE TABLE learning_paths (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    generated_by    VARCHAR(20) NOT NULL DEFAULT 'AI',   -- 'AI' | 'MANUAL'
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_learning_paths_user ON learning_paths(user_id);

CREATE TABLE learning_path_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id),
    sequence_order  INT NOT NULL DEFAULT 1,
    status          training_status_enum NOT NULL DEFAULT 'NOT_STARTED'
);
CREATE INDEX idx_learning_path_items_path ON learning_path_items(learning_path_id);

CREATE TABLE recommendations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id),
    skill_gap_id    UUID REFERENCES skill_gaps(id),
    relevance_score NUMERIC(5,2) NOT NULL,
    reason          TEXT,
    is_dismissed    BOOLEAN NOT NULL DEFAULT false,
    generated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);

-- ============================================================================
-- MODULE 7: LEARNING PROGRESS TRACKING (enrollment lives here too)
-- ============================================================================

CREATE TABLE enrollments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           UUID NOT NULL REFERENCES courses(id),
    status              training_status_enum NOT NULL DEFAULT 'NOT_STARTED',
    progress_percent    NUMERIC(5,2) NOT NULL DEFAULT 0,
    enrolled_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at        TIMESTAMPTZ,
    UNIQUE (user_id, course_id)
);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

CREATE TABLE learning_milestones (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id   UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    achieved_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE skill_improvements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        UUID NOT NULL REFERENCES skills(id),
    enrollment_id   UUID REFERENCES enrollments(id),
    before_level    proficiency_level_enum NOT NULL,
    after_level     proficiency_level_enum NOT NULL,
    measured_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_skill_improvements_user ON skill_improvements(user_id);

-- ============================================================================
-- MODULE 6: KNOWLEDGE-SHARING & MENTORSHIP
-- ============================================================================

CREATE TABLE expert_directory (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id                UUID NOT NULL REFERENCES skills(id),
    expertise_level         proficiency_level_enum NOT NULL,
    available_for_mentorship BOOLEAN NOT NULL DEFAULT true,
    UNIQUE (user_id, skill_id)
);

CREATE TABLE mentorship_matches (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id       UUID NOT NULL REFERENCES users(id),
    mentee_id       UUID NOT NULL REFERENCES users(id),
    skill_id        UUID NOT NULL REFERENCES skills(id),
    match_score     NUMERIC(5,2),
    status          mentorship_status_enum NOT NULL DEFAULT 'PROPOSED',
    matched_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_mentorship_mentor ON mentorship_matches(mentor_id);
CREATE INDEX idx_mentorship_mentee ON mentorship_matches(mentee_id);

CREATE TABLE knowledge_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id         UUID NOT NULL REFERENCES users(id),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    skill_id        UUID REFERENCES skills(id),
    scheduled_at    TIMESTAMPTZ NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 60,
    location_or_link VARCHAR(500),
    status          session_status_enum NOT NULL DEFAULT 'SCHEDULED',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_knowledge_sessions_host ON knowledge_sessions(host_id);

CREATE TABLE session_attendees (
    session_id      UUID NOT NULL REFERENCES knowledge_sessions(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    attended        BOOLEAN NOT NULL DEFAULT false,
    feedback_rating SMALLINT CHECK (feedback_rating BETWEEN 1 AND 5),
    feedback_comment TEXT,
    PRIMARY KEY (session_id, user_id)
);

CREATE TABLE communities_of_practice (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(200) NOT NULL,
    description         TEXT,
    skill_category_id   UUID REFERENCES skill_categories(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE community_members (
    community_id    UUID NOT NULL REFERENCES communities_of_practice(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_in_community VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    joined_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (community_id, user_id)
);

CREATE TABLE shared_resources (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uploaded_by     UUID NOT NULL REFERENCES users(id),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    file_url        VARCHAR(500) NOT NULL,
    skill_id        UUID REFERENCES skills(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- MODULE 8: ASSESSMENT & SURVEY
-- ============================================================================

CREATE TABLE assessment_templates (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL,
    type        assessment_type_enum NOT NULL,
    created_by  UUID REFERENCES users(id),
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assessment_questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id     UUID NOT NULL REFERENCES assessment_templates(id) ON DELETE CASCADE,
    question_text   TEXT NOT NULL,
    skill_id        UUID REFERENCES skills(id),
    question_order  INT NOT NULL DEFAULT 1
);

CREATE TABLE assessment_instances (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id         UUID NOT NULL REFERENCES assessment_templates(id),
    subject_user_id      UUID NOT NULL REFERENCES users(id),
    assessor_user_id      UUID NOT NULL REFERENCES users(id),
    status              assessment_status_enum NOT NULL DEFAULT 'SCHEDULED',
    scheduled_at        TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_assessment_instances_subject ON assessment_instances(subject_user_id);
CREATE INDEX idx_assessment_instances_assessor ON assessment_instances(assessor_user_id);

CREATE TABLE assessment_responses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instance_id     UUID NOT NULL REFERENCES assessment_instances(id) ON DELETE CASCADE,
    question_id     UUID NOT NULL REFERENCES assessment_questions(id),
    response_value  proficiency_level_enum,
    comments        TEXT,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_assessment_responses_instance ON assessment_responses(instance_id);

-- ============================================================================
-- MODULE 9: NOTIFICATIONS
-- ============================================================================

CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(100) NOT NULL,     -- e.g. GAP_ALERT, TRAINING_DEADLINE, MILESTONE
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    channel     notification_channel_enum NOT NULL DEFAULT 'IN_APP',
    is_read     BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);

CREATE TABLE notification_preferences (
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel     notification_channel_enum NOT NULL,
    enabled     BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY (user_id, channel)
);

-- ============================================================================
-- MODULE 11: REPORTS & EXPORT
-- ============================================================================

CREATE TABLE generated_reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requested_by    UUID NOT NULL REFERENCES users(id),
    report_type     VARCHAR(100) NOT NULL,   -- e.g. SKILL_GAP, TRAINING_EFFECTIVENESS, ROI
    scope           report_scope_enum NOT NULL,
    scope_reference_id UUID,                 -- user_id / department_id depending on scope
    format          report_format_enum NOT NULL,
    file_url        VARCHAR(500),
    generated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_generated_reports_requested_by ON generated_reports(requested_by);

-- ============================================================================
-- UPDATED_AT TRIGGER HELPER (applied to a few high-churn tables)
-- ============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_employee_skills_updated_at
    BEFORE UPDATE ON employee_skills
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_employee_profiles_updated_at
    BEFORE UPDATE ON employee_profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
