package org.example.security;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String role = normalizeRole(user.getRole());

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            throw new UsernameNotFoundException("User role is not configured");
        }

        String normalized = role.trim().toUpperCase();
        if (normalized.startsWith("ROLE_")) {
            normalized = normalized.substring(5);
        }

        if (!normalized.equals("EMPLOYEE")
                && !normalized.equals("MANAGER")
                && !normalized.equals("ADMIN")) {
            throw new UsernameNotFoundException("Invalid user role");
        }

        return normalized;
    }
}
