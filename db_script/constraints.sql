SET search_path TO organization;

-- Primary Keys
ALTER TABLE roles
ADD CONSTRAINT pk_roles
PRIMARY KEY (role_id);

ALTER TABLE users
ADD CONSTRAINT pk_users
PRIMARY KEY (user_id);

ALTER TABLE departments
ADD CONSTRAINT pk_departments
PRIMARY KEY (department_id);

ALTER TABLE employees
ADD CONSTRAINT pk_employees
PRIMARY KEY (employee_id);

-- Unique Constraints
ALTER TABLE roles
ADD CONSTRAINT uq_role_name
UNIQUE (role_name);

ALTER TABLE users
ADD CONSTRAINT uq_users_email
UNIQUE (email);

ALTER TABLE departments
ADD CONSTRAINT uq_department_name
UNIQUE (department_name);

-- Foreign Keys
ALTER TABLE users
ADD CONSTRAINT fk_users_role
FOREIGN KEY (role_id)
REFERENCES roles(role_id);

ALTER TABLE employees
ADD CONSTRAINT fk_employee_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);

ALTER TABLE employees
ADD CONSTRAINT fk_employee_department
FOREIGN KEY (department_id)
REFERENCES departments(department_id);