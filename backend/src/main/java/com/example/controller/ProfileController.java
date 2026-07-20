package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final AuthService authService;

    public ProfileController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        authService.changePassword(principal.getName(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password changed successfully");
    }

    // Static DTO with MANUAL getters to bypass Lombok processing issues
    public static class ChangePasswordRequest {
        private String oldPassword;
        private String newPassword;

        // Manual Getters
        public String getOldPassword() { return oldPassword; }
        public String getNewPassword() { return newPassword; }
        
        // Manual Setters (for JSON deserialization)
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}