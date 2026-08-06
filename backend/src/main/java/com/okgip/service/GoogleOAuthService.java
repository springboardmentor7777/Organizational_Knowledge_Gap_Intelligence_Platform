package com.okgip.service;

import com.okgip.model.Role;
import com.okgip.model.User;
import com.okgip.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@SuppressWarnings("null")
public class GoogleOAuthService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleOAuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditLogService auditLogService;

    public User processGoogleUser(Map<String, Object> googleUserData) {
        String email = (String) googleUserData.get("email");
        String name = (String) googleUserData.get("name");
        
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Google OAuth token missing email claim.");
        }

        String cleanEmail = email.trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmail(cleanEmail);

        if (userOpt.isPresent()) {
            User existing = userOpt.get();
            auditLogService.logEvent("GOOGLE_OAUTH_LOGIN", existing.getUsername(), "Logged in via Google OAuth2");
            return existing;
        }

        // Auto-register new Google user
        String username = cleanEmail.split("@")[0].replaceAll("[^a-zA-Z0-9_]", "_");
        if (userRepository.existsByUsername(username)) {
            username = username + "_" + (int)(Math.random() * 900 + 100);
        }

        User newUser = User.builder()
                .username(username)
                .email(cleanEmail)
                .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                .role(Role.EMPLOYEE)
                .department("Engineering")
                .fullName(name != null && !name.isBlank() ? name : username)
                .title("Software Engineer")
                .isEmailVerified(true)
                .isAvailableForMentorship(true)
                .build();

        User saved = userRepository.save(newUser);
        auditLogService.logEvent("GOOGLE_OAUTH_REGISTER", saved.getUsername(), "New user registered via Google OAuth2");
        return saved;
    }
}
