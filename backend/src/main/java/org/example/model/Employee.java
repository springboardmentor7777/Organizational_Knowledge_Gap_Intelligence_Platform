package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "employeee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employee ID is required")
    @Column(unique = true, nullable = false)
    private String employeeId;

    @NotBlank(message = "Employee name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Role is required")
    private String role;

    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    public Employee() {
    }

    public Employee(Long id, String employeeId, String name, String email,
                    String department, String role, Integer experience) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.role = role;
        this.experience = experience;
    }

    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public String getRole() {
        return role;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }
}