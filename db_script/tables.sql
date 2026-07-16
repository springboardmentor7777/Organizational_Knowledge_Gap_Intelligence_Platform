SET search_path TO organization;

CREATE TABLE roles (
    role_id SERIAL,
    role_name VARCHAR(50)
);

CREATE TABLE users (
    user_id SERIAL,
    username VARCHAR(50),
    email VARCHAR(100),
    role_id INT
);

CREATE TABLE departments (
    department_id SERIAL,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id SERIAL,
    user_id INT,
    department_id INT,
    salary DECIMAL(10,2),
    joining_date DATE
);