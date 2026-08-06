package com.okgip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String refreshToken;
    @Builder.Default
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String role;
    private String department;
    private String fullName;
    private String title;
    private String phone;
    private String location;
    private String bio;
    private String linkedinUrl;
    private Boolean isAvailableForMentorship;
    private Boolean is2faEnabled;
    private Boolean mfaRequired;

    public JwtResponse(String token, String refreshToken, Long id, String username, String email, String role,
                       String department, String fullName, String title, String phone, String location,
                       String bio, String linkedinUrl, Boolean isAvailableForMentorship, Boolean is2faEnabled) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.type = "Bearer";
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.department = department;
        this.fullName = fullName;
        this.title = title;
        this.phone = phone;
        this.location = location;
        this.bio = bio;
        this.linkedinUrl = linkedinUrl;
        this.isAvailableForMentorship = isAvailableForMentorship;
        this.is2faEnabled = is2faEnabled;
        this.mfaRequired = false;
    }
}
