package com.orgkgi.controller;

import com.orgkgi.dto.ProfileUpdateRequest;
import com.orgkgi.dto.UserProfileResponse;
import com.orgkgi.service.AuthService;
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

    @GetMapping
    public ResponseEntity<UserProfileResponse> getProfile(Principal principal) {
        return ResponseEntity.ok(authService.getProfile(principal.getName()));
    }
    @GetMapping("/admin-only")
@org.springframework.security.access.prepost.PreAuthorize("hasAuthority('ROLE_ADMIN')")
public ResponseEntity<String> adminOnlyEndpoint() {
    return ResponseEntity.ok("Welcome, Admin! This endpoint is restricted.");
}

    @PutMapping
    public ResponseEntity<UserProfileResponse> updateProfile(@RequestBody ProfileUpdateRequest request, Principal principal) {
        return ResponseEntity.ok(authService.updateProfile(principal.getName(), request));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        authService.changePassword(principal.getName(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password changed successfully");
    }

    public static class ChangePasswordRequest {
        private String oldPassword;
        private String newPassword;

        public String getOldPassword() { return oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}