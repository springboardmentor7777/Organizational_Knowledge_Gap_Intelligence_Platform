-- Clear all user credentials, temp skills, gaps, enrollments, and audit data
-- Run this script on PostgreSQL or H2 console to reset the database state

SET REFERENTIAL_INTEGRITY FALSE; -- For H2 compatibility

TRUNCATE TABLE audit_logs;
TRUNCATE TABLE notifications;
TRUNCATE TABLE mentorship_sessions;
TRUNCATE TABLE mentorship_matches;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE employee_skills;
TRUNCATE TABLE email_otps;
TRUNCATE TABLE password_reset_tokens;
TRUNCATE TABLE refresh_tokens;
TRUNCATE TABLE users;

SET REFERENTIAL_INTEGRITY TRUE;

-- Summary notification of cleanup
SELECT 'All user credentials, employee skills inventory, gap analysis records, enrollments, and security logs have been successfully cleared.' AS status;
