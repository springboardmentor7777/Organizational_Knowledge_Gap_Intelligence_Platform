package com.knowledgegap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {
    public Employee() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeId;

    private String name;

    private String email;

    private String department;

    private String role;

    private Integer experience;
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

    public Long getId() {
        return id;
    }

    public Employee(Long id, String employeeId, String name, String email, String department, String role, Integer experience) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.department = department;
        this.email = email;
        this.role = role;
        this.experience = experience;
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


}