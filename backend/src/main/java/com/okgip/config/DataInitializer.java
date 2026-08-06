package com.okgip.config;

import com.okgip.model.*;
import com.okgip.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@SuppressWarnings("null")
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    RoleRequirementRepository roleRequirementRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    MentorshipSessionRepository mentorshipSessionRepository;

    @Autowired
    MentorshipMatchRepository mentorshipMatchRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Migration: Ensure ALL courses in database use clean valid Infosys Springboard search URLs
        List<Course> existingCourses = courseRepository.findAll();
        for (Course c : existingCourses) {
            c.setIsFree(true);
            c.setProvider("Infosys Springboard");
            String queryTerm = c.getSkill() != null ? c.getSkill().getName() : c.getTitle();
            String titleLower = c.getTitle().toLowerCase();
            if (titleLower.contains("react")) {
                c.setTitle("Infosys Springboard: Modern React.js & Web Apps Certificate Course");
                c.setDescription("100% Free Infosys Certificate course covering React components, Hooks, State Management, and Redux.");
                queryTerm = "React.js";
            } else if (titleLower.contains("java")) {
                c.setTitle("Infosys Springboard: Java SE 11 Programming Certificate Course");
                c.setDescription("100% Free Infosys Certified course covering Java SE 11, OOPs, Collections, Lambdas & Multithreading.");
                queryTerm = "Java";
            } else if (titleLower.contains("docker")) {
                c.setTitle("Infosys Springboard: Cloud Containerization with Docker & Kubernetes");
                c.setDescription("100% Free Infosys Springboard certificate training on Docker containers, Docker Compose, and Kubernetes deployment.");
                queryTerm = "Docker";
            } else if (titleLower.contains("postgres")) {
                c.setTitle("Infosys Springboard: Relational Database & PostgreSQL Essentials");
                c.setDescription("100% Free Infosys certification on SQL queries, database indexing, normalization, and PostgreSQL administration.");
                queryTerm = "PostgreSQL";
            } else if (titleLower.contains("spring")) {
                c.setTitle("Infosys Springboard: Spring Boot & Microservices Developer Certificate");
                c.setDescription("100% Free Infosys Springboard certification for REST APIs, Spring Data JPA, Microservices, and Security.");
                queryTerm = "Spring Boot";
            } else if (titleLower.contains("redis")) {
                c.setTitle("Infosys Springboard: Redis In-Memory Data Structures & Caching");
                c.setDescription("100% Free Infosys certificate course covering Redis caching strategies, Pub/Sub, and high-performance key-value databases.");
                queryTerm = "Redis";
            } else if (titleLower.contains("elastic")) {
                c.setTitle("Infosys Springboard: Elasticsearch & Distributed Full-Text Search");
                c.setDescription("100% Free Infosys Springboard certification on search indices, mappings, aggregations, and Kibana dashboards.");
                queryTerm = "Elasticsearch";
            } else if (titleLower.contains("communication")) {
                c.setTitle("Infosys Springboard: Business Communication & Workplace Leadership");
                c.setDescription("100% Free Infosys Certificate course on executive communication, active listening, and cross-functional leadership.");
                queryTerm = "Communication";
            } else if (titleLower.contains("conflict")) {
                c.setTitle("Infosys Springboard: Conflict Management & Workplace Negotiation");
                c.setDescription("100% Free Infosys Springboard certificate course on resolving team disputes, negotiation strategies, and mediation.");
                queryTerm = "Conflict Resolution";
            } else if (titleLower.contains("product") || titleLower.contains("strategy") || titleLower.contains("roadmap")) {
                c.setTitle("Infosys Springboard: Product Planning & Agile Roadmap Execution");
                c.setDescription("100% Free Infosys certificate training on product strategy, backlog prioritization, and sprint roadmap execution.");
                queryTerm = "Product Roadmap";
            }
            c.setUrl("https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=" + java.net.URLEncoder.encode(queryTerm, java.nio.charset.StandardCharsets.UTF_8) + "&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D");
            courseRepository.save(c);
        }

        // Seed core catalog (skills, requirements, courses) if database is empty
        if (skillRepository.count() == 0) {
            logger.info("Initializing core platform skills catalog and role requirements...");

            // 1. Core Skills Catalog
            Skill java = skillRepository.save(new Skill(null, "Java", "Backend", "Core Java, Collections, Multithreading, and OOP concepts"));
            Skill spring = skillRepository.save(new Skill(null, "Spring Boot", "Backend", "REST APIs, Dependency Injection, JPA, Hibernate, and Security"));
            Skill react = skillRepository.save(new Skill(null, "React.js", "Frontend", "Components, Hooks, State Management, and Virtual DOM"));
            Skill postgres = skillRepository.save(new Skill(null, "PostgreSQL", "Cloud & DB", "Relational database design, SQL querying, indexing, and optimization"));
            Skill docker = skillRepository.save(new Skill(null, "Docker", "Cloud & DB", "Containerization, Dockerfiles, Docker Compose, and registry management"));
            Skill redis = skillRepository.save(new Skill(null, "Redis", "Cloud & DB", "Caching, Pub/Sub, and key-value store usage"));
            Skill es = skillRepository.save(new Skill(null, "Elasticsearch", "Cloud & DB", "Full-text search engine index design, mapping, and querying"));
            Skill roadmap = skillRepository.save(new Skill(null, "Product Roadmap", "Management", "Developing strategic product direction, milestone mapping, and releases"));
            Skill comm = skillRepository.save(new Skill(null, "Communication", "Soft Skills", "Effective oral and written workplace sharing, listening, and active collaboration"));
            Skill conflict = skillRepository.save(new Skill(null, "Conflict Resolution", "Soft Skills", "Mediating disputes and finding win-win agreements among team members"));

            // 2. Role Requirements Framework
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Engineering", java, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Engineering", spring, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Engineering", react, 2));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Engineering", postgres, 2));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Engineering", docker, 2));

            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Engineering", java, 2));
            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Engineering", spring, 2));
            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Engineering", comm, 4));
            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Engineering", conflict, 4));

            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Product", roadmap, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Product", comm, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Product", roadmap, 4));
            roleRequirementRepository.save(new RoleRequirement(null, "MANAGER", "Product", comm, 4));

            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Human Resources", comm, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "EMPLOYEE", "Human Resources", conflict, 3));
            roleRequirementRepository.save(new RoleRequirement(null, "HR_SPECIALIST", "Human Resources", comm, 4));
            roleRequirementRepository.save(new RoleRequirement(null, "HR_SPECIALIST", "Human Resources", conflict, 4));

            // 3. Courses Catalog (100% Free Open Platforms)
            courseRepository.save(Course.builder().title("Java Programming & Data Structures (Free)").provider("Infosys Springboard").description("100% Free comprehensive Java course covering core concepts, lambdas, streams, and multithreading.").difficultyLevel("Intermediate").url("https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Java&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D").isFree(true).skill(java).build());
            courseRepository.save(Course.builder().title("Spring Boot 3 & Microservices Full Course").provider("freeCodeCamp").description("100% Free guide to build REST APIs and microservices with Spring Boot, JPA, Hibernate, and Spring Security.").difficultyLevel("Advanced").url("https://www.freecodecamp.org/news/build-a-spring-boot-application/").isFree(true).skill(spring).build());
            courseRepository.save(Course.builder().title("React.js Full Interactive Course").provider("freeCodeCamp").description("Learn React.js from scratch 100% free, including Hooks, Router, State Management, and Next.js.").difficultyLevel("Intermediate").url("https://www.freecodecamp.org/news/tag/react/").isFree(true).skill(react).build());
            courseRepository.save(Course.builder().title("PostgreSQL Database Administration & SQL").provider("PostgreSQL Tutorial").description("Master PostgreSQL query design, database schema, and performance indexing for free.").difficultyLevel("Beginner").url("https://www.postgresqltutorial.com/").isFree(true).skill(postgres).build());
            courseRepository.save(Course.builder().title("Docker Containerization & Kubernetes Basics").provider("Docker Docs").description("100% Free official guide to containerize apps and run Docker and Kubernetes clusters.").difficultyLevel("Intermediate").url("https://docs.docker.com/get-started/").isFree(true).skill(docker).build());
            courseRepository.save(Course.builder().title("Redis In-Memory Caching Essentials").provider("Redis University").description("Free official course on Redis caching patterns, data structures, and key-value models.").difficultyLevel("Intermediate").url("https://university.redis.io/").isFree(true).skill(redis).build());
            courseRepository.save(Course.builder().title("Elasticsearch Full-Text Search Fundamentals").provider("Elastic Academy").description("Free Elastic training on full-text search indexing, mappings, and aggregations.").difficultyLevel("Beginner").url("https://learn.elastic.co/").isFree(true).skill(es).build());
            courseRepository.save(Course.builder().title("Product Strategy & Roadmap Execution").provider("Infosys Springboard").description("100% Free Infosys training on product planning, milestone mapping, and release management.").difficultyLevel("Intermediate").url("https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Product%20Roadmap&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D").isFree(true).skill(roadmap).build());
            courseRepository.save(Course.builder().title("Executive Communication & Workplace Leadership").provider("Infosys Springboard").description("100% Free Infosys training on oral, written, and cross-departmental collaboration.").difficultyLevel("Beginner").url("https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Communication&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D").isFree(true).skill(comm).build());
            courseRepository.save(Course.builder().title("Conflict Resolution & Mediation for Managers").provider("Infosys Springboard").description("100% Free Infosys course on mediating team disputes and win-win negotiation.").difficultyLevel("Intermediate").url("https://infyspringboard.onwingspan.com/web/en/app/search/learning?lang=en&q=Conflict%20Resolution&p=0&f=%7B%22contentType%22:%5B%22Course%22%5D%7D").isFree(true).skill(conflict).build());

            logger.info("Successfully initialized clean system catalog.");
        }
    }
}
