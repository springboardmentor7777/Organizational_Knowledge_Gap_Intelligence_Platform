package com.okgip.bootstrap;

import com.okgip.model.*;
import com.okgip.repo.*;
import com.okgip.service.NotificationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

/** Seeds a realistic demo organisation so every Milestone 1-3 screen has data. */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final SkillRepository skills;
    private final EmployeeSkillRepository employeeSkills;
    private final RoleCompetencyRepository competencies;
    private final TrainingProgramRepository programs;
    private final AssessmentRepository assessments;
    private final QuestionRepository questions;
    private final SharingSessionRepository sessions;
    private final KnowledgeArticleRepository articles;
    private final EnrollmentRepository enrollments;
    private final NotificationService notifications;
    private final PasswordEncoder encoder;

    public DataSeeder(UserRepository users, SkillRepository skills, EmployeeSkillRepository employeeSkills,
                      RoleCompetencyRepository competencies, TrainingProgramRepository programs,
                      AssessmentRepository assessments, QuestionRepository questions,
                      SharingSessionRepository sessions, KnowledgeArticleRepository articles,
                      EnrollmentRepository enrollments, NotificationService notifications,
                      PasswordEncoder encoder) {
        this.users = users; this.skills = skills; this.employeeSkills = employeeSkills;
        this.competencies = competencies; this.programs = programs; this.assessments = assessments;
        this.questions = questions; this.sessions = sessions; this.articles = articles;
        this.enrollments = enrollments; this.notifications = notifications; this.encoder = encoder;
    }

    private final Map<String, Skill> S = new LinkedHashMap<>();

    @Override
    public void run(String... args) {
        if (users.count() > 0) return;

        seedSkills();
        Map<String, User> people = seedUsers();
        seedCompetencyFramework();
        seedEmployeeSkills(people);
        seedCatalog();
        seedAssessments();
        seedCommunity(people);
        seedEnrollmentsAndAlerts(people);
    }

    private void skill(String name, String category, String description) {
        S.put(name, skills.save(Skill.builder().name(name).category(category).description(description).build()));
    }

    private void seedSkills() {
        skill("Java", "Backend", "Core Java 17 language and JVM fundamentals");
        skill("Spring Boot", "Backend", "REST services, dependency injection, Spring Data");
        skill("Spring Security", "Backend", "Authentication, authorization, JWT and OAuth2");
        skill("SQL & PostgreSQL", "Data", "Relational modelling, indexing and query tuning");
        skill("React.js", "Frontend", "Component architecture, hooks and state management");
        skill("REST API Design", "Architecture", "Resource modelling, versioning and contracts");
        skill("Docker & CI/CD", "DevOps", "Containerisation and automated delivery pipelines");
        skill("Data Analysis", "Data", "Metrics, dashboards and workforce analytics");
        skill("Cloud (AWS)", "DevOps", "Core AWS services and deployment models");
        skill("Communication", "Soft Skills", "Stakeholder communication and documentation");
        skill("Leadership", "Soft Skills", "Coaching, delegation and performance management");
    }

    private User person(String email, String name, Role role, String dept, String jobRole) {
        return users.save(User.builder()
                .email(email).password(encoder.encode("password123")).fullName(name)
                .role(role).department(dept).jobRole(jobRole)
                .avatarInitials(initials(name)).active(true).build());
    }

    private static String initials(String name) {
        String[] p = name.trim().split("\\s+");
        return (p[0].charAt(0) + "" + (p.length > 1 ? p[p.length - 1].charAt(0) : "")).toUpperCase();
    }

    private Map<String, User> seedUsers() {
        Map<String, User> m = new LinkedHashMap<>();
        m.put("employee", person("employee@okgip.com", "Aarav Sharma", Role.EMPLOYEE, "Engineering", "Backend Developer"));
        m.put("priya", person("priya@okgip.com", "Priya Nair", Role.EMPLOYEE, "Engineering", "Frontend Developer"));
        m.put("rahul", person("rahul@okgip.com", "Rahul Verma", Role.EMPLOYEE, "Engineering", "Backend Developer"));
        m.put("expert", person("meera@okgip.com", "Meera Iyer", Role.EMPLOYEE, "Engineering", "Senior Backend Developer"));
        m.put("manager", person("manager@okgip.com", "Vikram Rao", Role.MANAGER, "Engineering", "Engineering Manager"));
        m.put("analyst", person("sana@okgip.com", "Sana Khan", Role.EMPLOYEE, "Analytics", "Data Analyst"));
        m.put("hr", person("hr@okgip.com", "Divya Menon", Role.HR, "Human Resources", "HR Specialist"));
        m.put("admin", person("admin@okgip.com", "System Admin", Role.ADMIN, "IT", "System Administrator"));
        return m;
    }

    private void comp(String jobRole, String dept, String skillName, Proficiency level, boolean critical) {
        competencies.save(RoleCompetency.builder()
                .jobRole(jobRole).department(dept).skill(S.get(skillName))
                .requiredLevel(level).critical(critical).build());
    }

    private void seedCompetencyFramework() {
        comp("Backend Developer", "Engineering", "Java", Proficiency.ADVANCED, true);
        comp("Backend Developer", "Engineering", "Spring Boot", Proficiency.ADVANCED, true);
        comp("Backend Developer", "Engineering", "Spring Security", Proficiency.INTERMEDIATE, true);
        comp("Backend Developer", "Engineering", "SQL & PostgreSQL", Proficiency.ADVANCED, false);
        comp("Backend Developer", "Engineering", "REST API Design", Proficiency.ADVANCED, false);
        comp("Backend Developer", "Engineering", "Docker & CI/CD", Proficiency.INTERMEDIATE, false);
        comp("Backend Developer", "Engineering", "Communication", Proficiency.INTERMEDIATE, false);

        comp("Senior Backend Developer", "Engineering", "Java", Proficiency.EXPERT, true);
        comp("Senior Backend Developer", "Engineering", "Spring Boot", Proficiency.EXPERT, true);
        comp("Senior Backend Developer", "Engineering", "Cloud (AWS)", Proficiency.ADVANCED, false);
        comp("Senior Backend Developer", "Engineering", "Leadership", Proficiency.INTERMEDIATE, false);

        comp("Frontend Developer", "Engineering", "React.js", Proficiency.ADVANCED, true);
        comp("Frontend Developer", "Engineering", "REST API Design", Proficiency.INTERMEDIATE, false);
        comp("Frontend Developer", "Engineering", "Communication", Proficiency.INTERMEDIATE, false);
        comp("Frontend Developer", "Engineering", "Docker & CI/CD", Proficiency.BEGINNER, false);

        comp("Engineering Manager", "Engineering", "Leadership", Proficiency.ADVANCED, true);
        comp("Engineering Manager", "Engineering", "Communication", Proficiency.ADVANCED, true);
        comp("Engineering Manager", "Engineering", "Data Analysis", Proficiency.INTERMEDIATE, false);

        comp("Data Analyst", "Analytics", "SQL & PostgreSQL", Proficiency.EXPERT, true);
        comp("Data Analyst", "Analytics", "Data Analysis", Proficiency.ADVANCED, true);
        comp("Data Analyst", "Analytics", "Communication", Proficiency.INTERMEDIATE, false);

        comp("HR Specialist", "Human Resources", "Data Analysis", Proficiency.INTERMEDIATE, false);
        comp("HR Specialist", "Human Resources", "Communication", Proficiency.ADVANCED, true);

        comp("System Administrator", "IT", "Docker & CI/CD", Proficiency.ADVANCED, true);
        comp("System Administrator", "IT", "Cloud (AWS)", Proficiency.ADVANCED, true);
    }

    private void es(User u, String skillName, Proficiency level, String source) {
        employeeSkills.save(EmployeeSkill.builder().user(u).skill(S.get(skillName)).level(level).source(source).build());
    }

    private void seedEmployeeSkills(Map<String, User> p) {
        User aarav = p.get("employee");
        es(aarav, "Java", Proficiency.INTERMEDIATE, "SELF");
        es(aarav, "Spring Boot", Proficiency.BEGINNER, "SELF");
        es(aarav, "Spring Security", Proficiency.UNAWARE, "SELF");
        es(aarav, "SQL & PostgreSQL", Proficiency.INTERMEDIATE, "PEER");
        es(aarav, "REST API Design", Proficiency.INTERMEDIATE, "SELF");
        es(aarav, "Docker & CI/CD", Proficiency.BEGINNER, "SELF");
        es(aarav, "Communication", Proficiency.ADVANCED, "MANAGER");

        User priya = p.get("priya");
        es(priya, "React.js", Proficiency.ADVANCED, "MANAGER");
        es(priya, "REST API Design", Proficiency.INTERMEDIATE, "SELF");
        es(priya, "Communication", Proficiency.ADVANCED, "PEER");
        es(priya, "Docker & CI/CD", Proficiency.UNAWARE, "SELF");

        User rahul = p.get("rahul");
        es(rahul, "Java", Proficiency.ADVANCED, "MANAGER");
        es(rahul, "Spring Boot", Proficiency.INTERMEDIATE, "SELF");
        es(rahul, "Spring Security", Proficiency.BEGINNER, "SELF");
        es(rahul, "SQL & PostgreSQL", Proficiency.ADVANCED, "PEER");
        es(rahul, "REST API Design", Proficiency.ADVANCED, "SELF");
        es(rahul, "Docker & CI/CD", Proficiency.INTERMEDIATE, "SELF");
        es(rahul, "Communication", Proficiency.INTERMEDIATE, "SELF");

        User meera = p.get("expert");
        es(meera, "Java", Proficiency.EXPERT, "MANAGER");
        es(meera, "Spring Boot", Proficiency.EXPERT, "MANAGER");
        es(meera, "Spring Security", Proficiency.EXPERT, "PEER");
        es(meera, "SQL & PostgreSQL", Proficiency.ADVANCED, "SELF");
        es(meera, "Cloud (AWS)", Proficiency.ADVANCED, "SELF");
        es(meera, "Docker & CI/CD", Proficiency.ADVANCED, "SELF");
        es(meera, "Leadership", Proficiency.INTERMEDIATE, "MANAGER");
        es(meera, "REST API Design", Proficiency.EXPERT, "PEER");

        User vikram = p.get("manager");
        es(vikram, "Leadership", Proficiency.ADVANCED, "SELF");
        es(vikram, "Communication", Proficiency.EXPERT, "PEER");
        es(vikram, "Data Analysis", Proficiency.BEGINNER, "SELF");
        es(vikram, "Java", Proficiency.ADVANCED, "SELF");

        User sana = p.get("analyst");
        es(sana, "SQL & PostgreSQL", Proficiency.ADVANCED, "MANAGER");
        es(sana, "Data Analysis", Proficiency.INTERMEDIATE, "SELF");
        es(sana, "Communication", Proficiency.INTERMEDIATE, "SELF");

        User divya = p.get("hr");
        es(divya, "Communication", Proficiency.EXPERT, "PEER");
        es(divya, "Data Analysis", Proficiency.BEGINNER, "SELF");

        User admin = p.get("admin");
        es(admin, "Docker & CI/CD", Proficiency.EXPERT, "SELF");
        es(admin, "Cloud (AWS)", Proficiency.ADVANCED, "SELF");
    }

    private void program(String title, String provider, String url, String skillName,
                         Proficiency target, int hours, boolean internal, String description) {
        programs.save(TrainingProgram.builder().title(title).provider(provider).url(url)
                .skill(S.get(skillName)).targetLevel(target).durationHours(hours)
                .internal(internal).description(description).build());
    }

    private void seedCatalog() {
        program("Modern Java 17 Deep Dive", "Internal Academy", "https://learn.internal/java17", "Java",
                Proficiency.ADVANCED, 16, true, "Records, sealed types, streams, concurrency and JVM tuning.");
        program("Java Programming Masterclass", "Udemy", "https://www.udemy.com/course/java-the-complete-java-developer-course/",
                "Java", Proficiency.EXPERT, 40, false, "Comprehensive Java track from fundamentals to advanced patterns.");
        program("Spring Boot 3 in Practice", "Internal Academy", "https://learn.internal/spring-boot", "Spring Boot",
                Proficiency.ADVANCED, 20, true, "Build production REST services with Spring Data JPA and testing.");
        program("Spring Framework Specialization", "Coursera", "https://www.coursera.org/specializations/spring-framework",
                "Spring Boot", Proficiency.EXPERT, 35, false, "Vendor-aligned Spring specialization with capstone project.");
        program("Securing APIs with Spring Security & JWT", "LinkedIn Learning",
                "https://www.linkedin.com/learning/", "Spring Security", Proficiency.ADVANCED, 12, false,
                "JWT, OAuth2 login, method security and role-based access control.");
        program("PostgreSQL Performance Engineering", "Udemy", "https://www.udemy.com/course/postgresql/",
                "SQL & PostgreSQL", Proficiency.EXPERT, 18, false, "Indexes, execution plans, partitioning and tuning.");
        program("React.js Professional Patterns", "Coursera", "https://www.coursera.org/learn/react-basics",
                "React.js", Proficiency.ADVANCED, 22, false, "Hooks, context, performance and component architecture.");
        program("API Design Guild Workshop", "Internal Academy", "https://learn.internal/api-design",
                "REST API Design", Proficiency.ADVANCED, 8, true, "Resource modelling, versioning, pagination and error contracts.");
        program("Docker & GitHub Actions Bootcamp", "Internal Academy", "https://learn.internal/docker-ci",
                "Docker & CI/CD", Proficiency.ADVANCED, 14, true, "Containerise services and ship with automated pipelines.");
        program("AWS Cloud Practitioner Essentials", "Coursera", "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
                "Cloud (AWS)", Proficiency.INTERMEDIATE, 10, false, "Core AWS services, pricing and the well-architected framework.");
        program("Workforce Analytics with Data Storytelling", "LinkedIn Learning", "https://www.linkedin.com/learning/",
                "Data Analysis", Proficiency.ADVANCED, 9, false, "Turn HR and skills data into decision-ready dashboards.");
        program("Influential Communication for Engineers", "Internal Academy", "https://learn.internal/communication",
                "Communication", Proficiency.ADVANCED, 6, true, "Structured writing, stakeholder updates and review facilitation.");
        program("First-Time Leadership Programme", "Internal Academy", "https://learn.internal/leadership",
                "Leadership", Proficiency.ADVANCED, 24, true, "Coaching, delegation, feedback and team performance management.");
    }

    private Assessment assessment(String title, String skillName, String description, int minutes) {
        return assessments.save(Assessment.builder().title(title).skill(S.get(skillName))
                .description(description).type(AssessmentType.QUIZ).timeLimitMinutes(minutes).build());
    }

    private void q(Assessment a, String text, String A, String B, String C, String D,
                   String correct, String explanation) {
        questions.save(Question.builder().assessment(a).text(text)
                .optionA(A).optionB(B).optionC(C).optionD(D)
                .correctOption(correct).explanation(explanation).weight(1).build());
    }

    private void seedAssessments() {
        Assessment java = assessment("Core Java Proficiency Quiz", "Java",
                "10 questions covering Java language fundamentals, collections, OOP and concurrency.", 15);
        q(java, "Which statement about a Java `record` is correct?",
                "It is implicitly final and its fields are final",
                "It supports mutable fields by default",
                "It cannot implement interfaces",
                "It requires an explicit equals() implementation",
                "A", "Records are implicitly final with final fields and auto-generated equals/hashCode/toString.");
        q(java, "What is the time complexity of `HashMap.get()` in the average case?",
                "O(n)", "O(log n)", "O(1)", "O(n log n)",
                "C", "Hashing gives average constant-time lookup; worst case degrades to O(log n) with treeified bins.");
        q(java, "Which collection guarantees insertion order and allows duplicates?",
                "HashSet", "TreeSet", "ArrayList", "HashMap",
                "C", "ArrayList is an ordered, index-based list that permits duplicate elements.");
        q(java, "What does the `volatile` keyword guarantee?",
                "Atomic compound operations", "Visibility of writes across threads",
                "Mutual exclusion", "Thread-safe collections",
                "B", "volatile guarantees visibility and ordering, but not atomicity of compound actions like i++.");
        q(java, "Which of these is NOT a functional interface in java.util.function?",
                "Supplier<T>", "Consumer<T>", "Function<T,R>", "Iterator<T>",
                "D", "Iterator declares multiple abstract methods, so it is not a functional interface.");
        q(java, "What happens when an exception is thrown inside a try block with a finally block?",
                "finally is skipped", "finally runs before the exception propagates",
                "The exception is swallowed", "The program exits immediately",
                "B", "finally always executes (except on JVM exit) before the exception propagates upward.");
        q(java, "Which stream operation is a terminal operation?",
                "map()", "filter()", "collect()", "peek()",
                "C", "collect() triggers pipeline execution; map/filter/peek are intermediate and lazy.");
        q(java, "What is the correct way to compare two String values for equality?",
                "s1 == s2", "s1.equals(s2)", "s1.compare(s2)", "s1 === s2",
                "B", "== compares references; equals() compares character content.");
        q(java, "Which access modifier makes a member visible only within its own package?",
                "private", "protected", "public", "default (no modifier)",
                "D", "Package-private (no modifier) restricts visibility to the same package.");
        q(java, "What does `Optional.orElseGet()` do that `orElse()` does not?",
                "It throws when empty", "It lazily evaluates the fallback only when the value is absent",
                "It always evaluates the fallback", "It returns null when empty",
                "B", "orElseGet takes a Supplier evaluated lazily; orElse evaluates its argument eagerly.");

        Assessment boot = assessment("Spring Boot Fundamentals Quiz", "Spring Boot",
                "8 questions on Spring Boot auto-configuration, dependency injection and Spring Data JPA.", 12);
        q(boot, "What does @SpringBootApplication combine?",
                "@Configuration, @EnableAutoConfiguration, @ComponentScan",
                "@Controller, @Service, @Repository",
                "@Entity, @Table, @Id",
                "@Bean, @Autowired, @Qualifier",
                "A", "It is a meta-annotation for configuration, auto-configuration and component scanning.");
        q(boot, "Which annotation marks a class as a REST endpoint returning JSON by default?",
                "@Controller", "@RestController", "@Component", "@Service",
                "B", "@RestController = @Controller + @ResponseBody, so return values are serialized to the body.");
        q(boot, "Which is the recommended dependency injection style in Spring?",
                "Field injection", "Setter injection", "Constructor injection", "Static injection",
                "C", "Constructor injection makes dependencies explicit, immutable and testable.");
        q(boot, "In Spring Data JPA, what does `findByEmail(String email)` rely on?",
                "Reflection over SQL files", "Derived query method naming",
                "A stored procedure", "Manual EntityManager code",
                "B", "Spring Data derives the query from the method name at runtime.");
        q(boot, "Which property file format is supported for Spring Boot configuration?",
                "Only .properties", "Only .yml", "Both .properties and .yml", "Only .xml",
                "C", "Spring Boot supports application.properties and application.yml.");
        q(boot, "What is the default scope of a Spring bean?",
                "prototype", "singleton", "request", "session",
                "B", "Beans are singletons per application context unless another scope is declared.");
        q(boot, "How do you expose a custom bean to the context from a configuration class?",
                "@Entity", "@Bean", "@Value", "@Transactional",
                "B", "@Bean methods inside @Configuration classes register beans.");
        q(boot, "What does spring.jpa.hibernate.ddl-auto=update do?",
                "Drops and recreates schema each start", "Validates only",
                "Incrementally updates the schema to match entities", "Disables JPA",
                "C", "update alters the existing schema to match the entity model without dropping data.");

        Assessment sec = assessment("Spring Security & JWT Quiz", "Spring Security",
                "6 questions on authentication, authorization and stateless JWT security.", 10);
        q(sec, "What are the three parts of a JWT?",
                "Header, Payload, Signature", "Header, Body, Cookie",
                "Subject, Scope, Secret", "Issuer, Claim, Cipher",
                "A", "A JWT is base64url(header).base64url(payload).signature.");
        q(sec, "Why is a JWT-based API typically configured as STATELESS?",
                "To store sessions in Redis", "Because the token carries the identity, so no server session is needed",
                "To enable CSRF tokens", "To allow cookie-based logins only",
                "B", "Each request is self-contained, so no HTTP session is created.");
        q(sec, "Which encoder is recommended for storing passwords?",
                "MD5", "SHA-1", "BCryptPasswordEncoder", "Base64",
                "C", "BCrypt is an adaptive, salted hash designed for passwords.");
        q(sec, "What does @PreAuthorize(\"hasRole('ADMIN')\") require?",
                "An authority named ADMIN", "An authority named ROLE_ADMIN",
                "A claim named admin", "A cookie named ADMIN",
                "B", "hasRole prefixes the role with ROLE_ when matching authorities.");
        q(sec, "Where should the JWT filter be placed in the filter chain?",
                "After the last filter", "Before UsernamePasswordAuthenticationFilter",
                "Inside the controller", "It does not matter",
                "B", "The token must populate the SecurityContext before standard authentication filters run.");
        q(sec, "What does CORS configuration control?",
                "Password hashing strength", "Which browser origins may call the API",
                "Database access", "JWT expiry",
                "B", "CORS declares which cross-origin browser clients are permitted.");

        Assessment sql = assessment("SQL & PostgreSQL Quiz", "SQL & PostgreSQL",
                "8 questions on relational modelling, joins, indexing and query tuning.", 12);
        q(sql, "Which join returns all rows from the left table and matching rows from the right?",
                "INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN",
                "B", "LEFT OUTER JOIN preserves every left-hand row, filling unmatched right columns with NULL.");
        q(sql, "Which clause filters rows AFTER aggregation?",
                "WHERE", "GROUP BY", "HAVING", "ORDER BY",
                "C", "HAVING filters aggregated groups; WHERE filters rows before grouping.");
        q(sql, "What does an index primarily improve?",
                "Insert speed", "Read/lookup speed", "Disk usage", "Backup speed",
                "B", "Indexes accelerate lookups at the cost of extra write and storage overhead.");
        q(sql, "Which PostgreSQL command shows a query execution plan?",
                "DESCRIBE", "EXPLAIN ANALYZE", "SHOW PLAN", "PROFILE",
                "B", "EXPLAIN ANALYZE runs the query and reports the actual plan and timings.");
        q(sql, "What guarantees referential integrity between two tables?",
                "A unique index", "A foreign key constraint", "A trigger", "A view",
                "B", "Foreign keys enforce that referenced rows exist.");
        q(sql, "Which normal form removes partial dependency on a composite key?",
                "1NF", "2NF", "3NF", "BCNF",
                "B", "2NF removes partial dependencies on part of a composite primary key.");
        q(sql, "What does a transaction's ACID 'I' stand for?",
                "Indexing", "Integrity", "Isolation", "Idempotency",
                "C", "Isolation ensures concurrent transactions do not interfere.");
        q(sql, "Which is the most selective way to paginate large result sets?",
                "OFFSET with large offsets", "Keyset (cursor) pagination",
                "SELECT * then filter in code", "RANDOM() ordering",
                "B", "Keyset pagination stays fast because it seeks by indexed key instead of scanning offsets.");

        Assessment react = assessment("React.js Essentials Quiz", "React.js",
                "8 questions on components, hooks, state and rendering behaviour.", 12);
        q(react, "What does the dependency array of useEffect control?",
                "Component styling", "When the effect re-runs",
                "The render order", "Prop validation",
                "B", "The effect re-runs whenever a listed dependency changes.");
        q(react, "Which hook is used for values that persist across renders without causing re-render?",
                "useState", "useMemo", "useRef", "useContext",
                "C", "useRef holds a mutable value whose change does not trigger re-render.");
        q(react, "Why do list items need a stable `key` prop?",
                "For CSS styling", "To help React reconcile and reuse DOM nodes",
                "To sort the list", "It is optional and has no effect",
                "B", "Keys let React match elements between renders and avoid unnecessary DOM work.");
        q(react, "What is the correct way to update state based on the previous state?",
                "setCount(count + 1)", "setCount(prev => prev + 1)",
                "count = count + 1", "this.count++",
                "B", "The functional updater avoids stale-closure bugs during batched updates.");
        q(react, "What does Context API solve?",
                "Server rendering", "Prop drilling across deeply nested components",
                "Routing", "Form validation",
                "B", "Context shares values down the tree without passing props at each level.");
        q(react, "Which library is used in this project for client-side routing?",
                "Angular Router", "React Router", "Vue Router", "Express Router",
                "B", "React Router provides declarative client-side routing.");
        q(react, "What does useMemo do?",
                "Caches an expensive computed value between renders",
                "Stores data on the server", "Replaces useState", "Fetches data",
                "A", "useMemo memoizes a computation so it only recomputes when dependencies change.");
        q(react, "Which HTTP client is used to call the Spring Boot API here?",
                "jQuery", "Axios", "Socket.IO", "GraphQL",
                "B", "Axios wraps fetch-style HTTP calls with interceptors for the JWT header.");

        Assessment comms = assessment("Professional Communication Assessment", "Communication",
                "5 scenario questions on stakeholder communication and technical writing.", 8);
        q(comms, "A release will slip by three days. What is the best first action?",
                "Wait until the deadline passes", "Notify stakeholders early with impact and a revised plan",
                "Blame the blocking team", "Reduce test coverage silently",
                "B", "Early, factual escalation with options preserves trust and allows re-planning.");
        q(comms, "What makes a status update most effective?",
                "Maximum technical detail", "Outcome, risk and next step stated up front",
                "A long chronological log", "Only what went well",
                "B", "Lead with the decision-relevant summary, then supporting detail.");
        q(comms, "During code review, which comment is most constructive?",
                "This is wrong.", "Consider extracting this into a service to keep the controller thin.",
                "Rewrite everything.", "I would never write this.",
                "B", "Specific, actionable and impersonal feedback drives improvement.");
        q(comms, "What is the purpose of documenting an architecture decision record (ADR)?",
                "To satisfy auditors only", "To capture context, options and rationale for future teams",
                "To replace code comments", "To increase document count",
                "B", "ADRs preserve why a decision was made, not just what was decided.");
        q(comms, "How should you present skill-gap findings to a department head?",
                "Raw data export", "Prioritised gaps with business impact and recommended interventions",
                "Individual blame list", "Only positive metrics",
                "B", "Leaders act on prioritised, impact-linked insight with clear next steps.");
    }

    private void seedCommunity(Map<String, User> p) {
        sessions.save(SharingSession.builder().host(p.get("expert")).skill(S.get("Spring Security"))
                .title("Securing Spring Boot APIs with JWT")
                .description("Live walkthrough of the filter chain, token issuance and role-based access control.")
                .scheduledAt(LocalDateTime.now().plusDays(3)).seats(30).registered(12).build());
        sessions.save(SharingSession.builder().host(p.get("priya")).skill(S.get("React.js"))
                .title("React Performance Clinic")
                .description("Profiling renders, memoisation strategy and avoiding unnecessary state.")
                .scheduledAt(LocalDateTime.now().plusDays(6)).seats(25).registered(9).build());
        sessions.save(SharingSession.builder().host(p.get("analyst")).skill(S.get("SQL & PostgreSQL"))
                .title("Query Tuning War Stories")
                .description("Real execution plans from production and how we cut p95 latency by 60%.")
                .scheduledAt(LocalDateTime.now().plusDays(10)).seats(40).registered(21).build());

        articles.save(KnowledgeArticle.builder().author(p.get("expert")).skill(S.get("Spring Boot"))
                .title("Our Spring Boot service blueprint")
                .content("Standard package layout, constructor injection, DTO boundaries, validation strategy and "
                        + "testing pyramid used across all backend services in the organisation.")
                .createdAt(LocalDateTime.now().minusDays(5)).build());
        articles.save(KnowledgeArticle.builder().author(p.get("admin")).skill(S.get("Docker & CI/CD"))
                .title("From commit to container in 9 minutes")
                .content("Reference GitHub Actions pipeline: build, test, image scan, push and deploy with rollback.")
                .createdAt(LocalDateTime.now().minusDays(12)).build());
        articles.save(KnowledgeArticle.builder().author(p.get("priya")).skill(S.get("React.js"))
                .title("State management decision guide")
                .content("When to use local state, Context, or a server-cache layer — with examples from our portal.")
                .createdAt(LocalDateTime.now().minusDays(2)).build());
    }

    private void seedEnrollmentsAndAlerts(Map<String, User> p) {
        User aarav = p.get("employee");
        programs.findAll().stream()
                .filter(pr -> pr.getTitle().startsWith("Spring Boot 3"))
                .findFirst()
                .ifPresent(pr -> enrollments.save(Enrollment.builder()
                        .user(aarav).program(pr).status(TrainingStatus.IN_PROGRESS).progressPercent(45)
                        .enrolledAt(LocalDateTime.now().minusDays(9))
                        .dueAt(LocalDateTime.now().plusDays(12)).build()));

        User rahul = p.get("rahul");
        programs.findAll().stream()
                .filter(pr -> pr.getTitle().startsWith("Securing APIs"))
                .findFirst()
                .ifPresent(pr -> enrollments.save(Enrollment.builder()
                        .user(rahul).program(pr).status(TrainingStatus.COMPLETED).progressPercent(100)
                        .enrolledAt(LocalDateTime.now().minusDays(30))
                        .completedAt(LocalDateTime.now().minusDays(4))
                        .dueAt(LocalDateTime.now().minusDays(1)).build()));

        notifications.push(aarav, "GAP_ALERT", "Critical gap detected: Spring Security",
                "Your role requires INTERMEDIATE Spring Security. Current level: UNAWARE. Take the quiz or enroll in training.");
        notifications.push(aarav, "DEADLINE", "Training due in 12 days",
                "\"Spring Boot 3 in Practice\" is 45% complete. Keep going to stay on schedule.");
        notifications.push(aarav, "RECOMMENDATION", "3 new training recommendations",
                "New programs matched to your prioritised skill gaps are available in Learning.");
        notifications.push(p.get("manager"), "GAP_ALERT", "Engineering: 4 high-risk skill gaps",
                "Spring Security and Docker & CI/CD coverage is below target across your team.");
        notifications.push(p.get("hr"), "GAP_ALERT", "Organisation readiness at risk",
                "Two departments are below 70% competency readiness this cycle.");
    }
}
