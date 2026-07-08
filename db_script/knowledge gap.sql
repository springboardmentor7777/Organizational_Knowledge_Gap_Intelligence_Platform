SELECT
    u.first_name,
    u.last_name,
    tp.training_name,
    tp.provider,
    tp.duration,
    te.status,
    te.completion_date
FROM users u
JOIN employees e
    ON u.user_id = e.user_id
JOIN training_enrollment te
    ON e.employee_id = te.employee_id
JOIN training_programs tp
    ON te.training_id = tp.training_id;