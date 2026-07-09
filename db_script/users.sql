CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(100) NOT NULL
);
INSERT INTO users(email, password)
VALUES ('admin@gmail.com', '123456');
SELECT * FROM users;