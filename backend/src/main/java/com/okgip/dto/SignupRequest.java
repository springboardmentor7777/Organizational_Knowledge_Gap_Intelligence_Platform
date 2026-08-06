package com.okgip.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String role; // EMPLOYEE, MANAGER, HR_SPECIALIST, ADMIN
    private String department;
    private String fullName;
    private String title;
    private String phone;
    private String location;
    private String bio;
    private String linkedinUrl;
}
