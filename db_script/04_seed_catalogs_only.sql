-- Seed Catalog Data Only (Skills, Courses, Role Frameworks)
-- NO dummy user credentials or temporary employee gap data

-- Skills catalog
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
('Conflict Resolution', 'Soft Skills', 'Mediating disputes and finding win-win agreements among team members')
ON CONFLICT (name) DO NOTHING;

-- Courses catalog (100% Free Open Educational Platforms)
INSERT INTO courses (title, provider, description, difficulty_level, url, skill_id) VALUES
('Java Programming & Data Structures (Free)', 'Infosys Springboard', '100% Free comprehensive Java course covering core concepts, lambdas, streams, and multithreading.', 'Intermediate', 'https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Java&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D', 1),
('Spring Boot 3 & Microservices Full Course', 'freeCodeCamp', '100% Free guide to build REST APIs and microservices with Spring Boot, JPA, Hibernate, and Spring Security.', 'Advanced', 'https://www.freecodecamp.org/news/build-a-spring-boot-application/', 2),
('React.js Full Interactive Course', 'freeCodeCamp', 'Learn React.js from scratch 100% free, including Hooks, Router, State Management, and Next.js.', 'Intermediate', 'https://www.freecodecamp.org/news/tag/react/', 3),
('PostgreSQL Database Administration & SQL', 'PostgreSQL Tutorial', 'Master PostgreSQL query design, database schema, and performance indexing for free.', 'Beginner', 'https://www.postgresqltutorial.com/', 4),
('Docker Containerization & Kubernetes Basics', 'Docker Docs', '100% Free official guide to containerize apps and run Docker and Kubernetes clusters.', 'Intermediate', 'https://docs.docker.com/get-started/', 5),
('Redis In-Memory Caching Essentials', 'Redis University', 'Free official course on Redis caching patterns, data structures, and key-value models.', 'Intermediate', 'https://university.redis.io/', 6);
