package org.example.dto;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String title;
    private String department;
    private String location;
    private String manager;
    private String status;
    private String employeeId;
    private Boolean emailVerified;
    private String token;

    public UserResponse() {
    }

    public UserResponse(Long id, String name, String email, String role, String title,
                        String department, String location, String manager,
                        String status, String employeeId, Boolean emailVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.title = title;
        this.department = department;
        this.location = location;
        this.manager = manager;
        this.status = status;
        this.employeeId = employeeId;
        this.emailVerified = emailVerified;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
