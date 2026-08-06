package com.okgip.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String fullName;
    private String email;
    private String department;
    private String title;
    private String phone;
    private String location;
    private String bio;
    private String linkedinUrl;
    private String workExperience;
    private String education;
    private String certifications;
    private Boolean isAvailableForMentorship;
    private String newPassword;
}
