package com.knowledgegap.config;

import com.knowledgegap.entity.*;
import com.knowledgegap.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CompetencyRepository competencyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Autowired
    private TrainingCourseRepository trainingCourseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Initialize Roles based on SRS Section 4.1
        String[] srsRoles = {
            "Employee",
            "Team Lead / Manager",
            "HR Specialist",
            "Department Head",
            "Learning & Development Admin",
            "System Administrator"
        };

        // Ensure compliant SRS roles exist in the database
        for (String roleName : srsRoles) {
            if (roleRepository.findByRoleName(roleName).isEmpty()) {
                Role role = new Role();
                role.setRoleName(roleName);
                roleRepository.save(role);
            }
        }

        // Get standard Employee role for fallback mapping
        Role standardEmployeeRole = roleRepository.findByRoleName("Employee").orElse(null);

        // Standardize any users that were previously registered with duplicate role variations
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            if (user.getRole() != null) {
                String name = user.getRole().getRoleName();
                if (name.equalsIgnoreCase("role_employee") || name.equalsIgnoreCase("employee_role") || name.equalsIgnoreCase("employeerole")) {
                    user.setRole(standardEmployeeRole);
                    userRepository.save(user);
                }
            }
        }

        // Clean up legacy roles that are not SRS-compliant
        List<Role> allDbRoles = roleRepository.findAll();
        List<String> compliantRoles = Arrays.asList(srsRoles);
        for (Role dbRole : allDbRoles) {
            if (!compliantRoles.contains(dbRole.getRoleName())) {
                try {
                    // Update any users still referencing this custom/legacy role to the standard Employee role
                    for (User user : allUsers) {
                        if (user.getRole() != null && user.getRole().getRoleId().equals(dbRole.getRoleId())) {
                            user.setRole(standardEmployeeRole);
                            userRepository.save(user);
                        }
                    }
                    roleRepository.delete(dbRole);
                } catch (Exception e) {
                    System.err.println("Could not delete legacy role: " + dbRole.getRoleName() + ". " + e.getMessage());
                }
            }
        }

        // 2. Initialize Departments based on SRS Requirements
        String[][] srsDepartments = {
            {"Engineering", "ENG"},
            {"Product Management", "PROD"},
            {"UI/UX Design", "DESIGN"},
            {"Human Resources", "HR"},
            {"Learning & Development", "L&D"},
            {"Sales & Marketing", "MKT"},
            {"Operations", "OPS"}
        };

        for (String[] deptInfo : srsDepartments) {
            if (departmentRepository.findByDepartmentName(deptInfo[0]).isEmpty()) {
                Department dept = new Department();
                dept.setDepartmentName(deptInfo[0]);
                dept.setDepartmentCode(deptInfo[1]);
                departmentRepository.save(dept);
            }
        }

        // 3. Initialize Skills
        String[][] initialSkills = {
            {"Java", "Backend Development", "Core Java, multithreading, collections, Streams API"},
            {"Spring Boot", "Backend Development", "Spring framework, MVC, REST APIs, JPA/Hibernate, Security"},
            {"Python", "Backend Development / Data Science", "Scripting, pandas, numpy, machine learning libraries"},
            {"React", "Frontend Development", "Virtual DOM, JSX, hooks, state management, components"},
            {"Docker", "DevOps / Infrastructure", "Containerization, Dockerfile, docker-compose, images, volumes"},
            {"Kubernetes", "DevOps / Infrastructure", "Orchestration, pods, services, deployments, helm charts"},
            {"SQL", "Databases", "Relational databases, joins, subqueries, indexes, query optimization"},
            {"System Design", "Architecture & Design", "High-level design, low-level design, scalability, microservices"}
        };

        for (String[] skillInfo : initialSkills) {
            if (skillRepository.findBySkillName(skillInfo[0]).isEmpty()) {
                Skill skill = new Skill();
                skill.setSkillName(skillInfo[0]);
                skill.setCategory(skillInfo[1]);
                skill.setDescription(skillInfo[2]);
                skillRepository.save(skill);
            }
        }

        // 4. Initialize Competencies (Expected Skill Levels for Gap Analysis)
        String[][] expectedCompetencies = {
            {"Java", "Backend developer level", "4"},
            {"Spring Boot", "Enterprise framework level", "4"},
            {"Python", "Data and scripting level", "3"},
            {"React", "Modern frontend web UI level", "4"},
            {"Docker", "Basic containerization level", "3"},
            {"Kubernetes", "Clustered deployment level", "3"},
            {"SQL", "Relational querying level", "3"},
            {"System Design", "Distributed architectural design level", "4"}
        };

        for (String[] compInfo : expectedCompetencies) {
            if (competencyRepository.findByCompetencyName(compInfo[0]).isEmpty()) {
                Competency competency = new Competency();
                competency.setCompetencyName(compInfo[0]);
                competency.setDescription(compInfo[1]);
                competency.setExpectedLevel(Integer.parseInt(compInfo[2]));
                competencyRepository.save(competency);
            }
        }

        // 5. Initialize Seed Test Users
        if (userRepository.count() == 0) {
            Role employeeRole = roleRepository.findByRoleName("Employee").orElse(null);
            Role managerRole = roleRepository.findByRoleName("Team Lead / Manager").orElse(null);

            Department engDept = departmentRepository.findByDepartmentName("Engineering").orElse(null);
            Department prodDept = departmentRepository.findByDepartmentName("Product Management").orElse(null);

            // Seed John Doe (Employee - Engineering)
            User john = new User();
            john.setFirstName("John");
            john.setLastName("Doe");
            john.setEmail("john.doe@example.com");
            john.setPassword(passwordEncoder.encode("password123"));
            john.setPhone("1234567890");
            john.setStatus("Active");
            john.setRole(employeeRole);
            john.setDepartment(engDept);
            userRepository.save(john);

            // Seed Jane Smith (Manager - Engineering)
            User jane = new User();
            jane.setFirstName("Jane");
            jane.setLastName("Smith");
            jane.setEmail("jane.smith@example.com");
            jane.setPassword(passwordEncoder.encode("password123"));
            jane.setPhone("9876543210");
            jane.setStatus("Active");
            jane.setRole(managerRole);
            jane.setDepartment(engDept);
            userRepository.save(jane);

            // Seed Bob Johnson (Employee - Product)
            User bob = new User();
            bob.setFirstName("Bob");
            bob.setLastName("Johnson");
            bob.setEmail("bob.johnson@example.com");
            bob.setPassword(passwordEncoder.encode("password123"));
            bob.setPhone("5551234567");
            bob.setStatus("Active");
            bob.setRole(employeeRole);
            bob.setDepartment(prodDept);
            userRepository.save(bob);

            // 6. Seed Employee Skills (Assessed Skill Proficiency)
            seedEmployeeSkill(john, "Java", 2, 2);          // Gap of 2 (Expected 4)
            seedEmployeeSkill(john, "Spring Boot", 1, 1);   // Gap of 3 (Expected 4) - Critical
            seedEmployeeSkill(john, "Docker", 3, 3);        // Gap of 0 (Expected 3) - Competent

            seedEmployeeSkill(jane, "Java", 4, 5);          // Gap of 0 (Expected 4) - Competent
            seedEmployeeSkill(jane, "Spring Boot", 3, 4);   // Gap of 1 (Expected 4)
            seedEmployeeSkill(jane, "System Design", 4, 6); // Gap of 0 (Expected 4) - Competent

            seedEmployeeSkill(bob, "Python", 2, 2);         // Gap of 1 (Expected 3)
            seedEmployeeSkill(bob, "React", 1, 1);          // Gap of 3 (Expected 4) - Critical
        }

        // 7. Seed Training Courses for Recommendations
        if (trainingCourseRepository.count() == 0) {
            String[][] courses = {
                {"Java", "Java Programming Masterclass", "Udemy", "80 hours", "Beginner-Advanced", "https://www.udemy.com/course/java-the-complete-java-developer-course/"},
                {"Java", "Java In-Depth: Become a Complete Java Engineer", "Udemy", "34 hours", "Intermediate", "https://www.udemy.com/course/java-in-depth-become-a-complete-java-engineer/"},
                {"Java", "Java Certification Training Course", "Simplilearn", "40 hours", "Intermediate", "https://www.simplilearn.com/java-certification-training-course"},
                {"Spring Boot", "Spring Boot Microservices and Spring Cloud", "Udemy", "22 hours", "Advanced", "https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/"},
                {"Spring Boot", "Spring Framework 6 & Spring Boot 3", "Udemy", "45 hours", "Beginner-Advanced", "https://www.udemy.com/course/spring-hibernate-tutorial/"},
                {"Spring Boot", "Building Microservices with Spring Boot", "Coursera", "12 hours", "Advanced", "https://www.coursera.org/learn/building-microservices-spring-boot"},
                {"SQL", "The Complete SQL Bootcamp: Go from Zero to Hero", "Udemy", "9 hours", "Beginner", "https://www.udemy.com/course/the-complete-sql-bootcamp/"},
                {"SQL", "SQL for Data Science", "Coursera", "14 hours", "Beginner", "https://www.coursera.org/learn/sql-for-data-science"},
                {"SQL", "Advanced SQL for Query Tuning and Performance", "LinkedIn Learning", "3 hours", "Advanced", "https://www.linkedin.com/learning/advanced-sql-for-query-tuning-and-performance"},
                {"React", "React - The Complete Guide (incl Hooks, React Router, Redux)", "Udemy", "48 hours", "Beginner-Advanced", "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"},
                {"React", "Modern React with Redux", "Udemy", "38 hours", "Beginner", "https://www.udemy.com/course/react-redux/"},
                {"React", "Advanced React", "Coursera", "26 hours", "Advanced", "https://www.coursera.org/learn/advanced-react"},
                {"System Design", "Pragmatic System Design", "Udemy", "12 hours", "Advanced", "https://www.udemy.com/course/pragmatic-system-design/"},
                {"System Design", "System Design Interview - An Insider's Guide", "ByteByteGo", "20 hours", "Advanced", "https://bytebytego.com/"},
                {"System Design", "Software Architecture & System Design", "LinkedIn Learning", "5 hours", "Advanced", "https://www.linkedin.com/learning/software-architecture-and-system-design"},
                {"Python", "Complete Python Bootcamp From Zero to Hero in Python", "Udemy", "22 hours", "Beginner", "https://www.udemy.com/course/complete-python-bootcamp/"},
                {"Python", "Python for Data Science and Machine Learning", "Udemy", "25 hours", "Intermediate", "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/"},
                {"Docker", "Docker and Kubernetes: The Complete Guide", "Udemy", "22 hours", "Intermediate-Advanced", "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/"},
                {"Kubernetes", "Kubernetes Certified Application Developer (CKAD)", "Udemy", "15 hours", "Advanced", "https://www.udemy.com/course/certified-kubernetes-application-developer/"}
            };

            for (String[] courseInfo : courses) {
                TrainingCourse course = new TrainingCourse();
                course.setSkillName(courseInfo[0]);
                course.setCourseName(courseInfo[1]);
                course.setProvider(courseInfo[2]);
                course.setDuration(courseInfo[3]);
                course.setLevel(courseInfo[4]);
                course.setCourseUrl(courseInfo[5]);
                trainingCourseRepository.save(course);
            }
        }
    }

    private void seedEmployeeSkill(User user, String skillName, int proficiency, int experience) {
        Optional<Skill> skillOpt = skillRepository.findBySkillName(skillName);
        if (skillOpt.isPresent()) {
            EmployeeSkill employeeSkill = new EmployeeSkill();
            employeeSkill.setUser(user);
            employeeSkill.setSkill(skillOpt.get());
            employeeSkill.setProficiencyLevel(proficiency);
            employeeSkill.setExperienceYears(experience);
            employeeSkill.setEmployeeSkillId(null); // autogenerated
            employeeSkillRepository.save(employeeSkill);
        }
    }
}
