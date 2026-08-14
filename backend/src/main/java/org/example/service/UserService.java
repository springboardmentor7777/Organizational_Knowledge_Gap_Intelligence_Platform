package org.example.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.example.dto.CreateUserRequest;
import org.example.dto.SignupRequest;
import org.example.dto.UserResponse;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserResponse login(String email, String password) {

        String normalizedEmail = email == null ? "" : email.trim().toLowerCase();
        Optional<User> existingUser = repository.findByEmail(normalizedEmail);

        if (existingUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = existingUser.get();

        if (Boolean.FALSE.equals(user.getEmailVerified())) {
            throw new RuntimeException("Please verify your email before signing in");
        }

        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword())
                || user.getPassword().equals(password);

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return toResponse(user, token);
    }

    public void register(SignupRequest request) {

        String normalizedEmail = request.getEmail().trim().toLowerCase();

        Optional<User> existingUser = repository.findByEmail(normalizedEmail);

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        emailVerificationService.createPendingSignup(request);
    }

    public void resendVerificationCode(String email) {
        emailVerificationService.resendVerificationCode(email);
    }

    public void verifyEmail(String email, String otp) {
        emailVerificationService.verifyEmail(email, otp);
    }

    /**
     * Returns the users visible to the currently authenticated role.
     * Employee -> Employee only
     * Manager  -> Employee + Manager
     * Admin    -> Employee + Manager + Admin
     */
    public List<UserResponse> getVisibleUsers(String currentRole) {
        String role = normalizeRole(currentRole);

        return repository.findAll().stream()
                .filter(user -> isVisible(role, user.getRole()))
                .map(user -> toResponse(user, null))
                .collect(Collectors.toList());
    }

    public UserResponse getCurrentUser(String email) {
        User user = repository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user, null);
    }

    public UserResponse getUserById(Long id, String currentRole) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String role = normalizeRole(currentRole);
        if (!isVisible(role, user.getRole())) {
            throw new AccessDeniedException("You do not have permission to view this user");
        }

        return toResponse(user, null);
    }

    public UserResponse toSafeResponse(User user) {
        return toResponse(user, null);
    }

    public User updateUserFromAdmin(Long id, CreateUserRequest request) {
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request == null) {
            throw new RuntimeException("User data is required");
        }

        String updatedEmail = request.getEmail() == null ? existingUser.getEmail() : request.getEmail().trim().toLowerCase();
        if (!existingUser.getEmail().equals(updatedEmail) && repository.findByEmail(updatedEmail).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String trimmedName = request.getName() == null ? existingUser.getName() : request.getName().trim();
        if (trimmedName.isBlank()) {
            throw new RuntimeException("Name is required");
        }

        existingUser.setName(trimmedName);
        existingUser.setEmail(updatedEmail);
        existingUser.setRole(normalizeRoleForStorage(request.getRole() == null ? existingUser.getRole() : request.getRole()));
        existingUser.setTitle(request.getTitle() == null ? existingUser.getTitle() : request.getTitle().trim());
        existingUser.setDepartment(request.getDepartment() == null ? existingUser.getDepartment() : request.getDepartment().trim());
        existingUser.setLocation(request.getLocation() == null ? existingUser.getLocation() : request.getLocation());
        existingUser.setManager(request.getManager() == null ? existingUser.getManager() : request.getManager());
        existingUser.setStatus(request.getStatus() == null ? existingUser.getStatus() : request.getStatus().trim());
        existingUser.setEmployeeId(request.getEmployeeId() == null || request.getEmployeeId().isBlank()
                ? existingUser.getEmployeeId()
                : request.getEmployeeId().trim());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            if (request.getPassword().length() < 6) {
                throw new RuntimeException("Password must be at least 6 characters");
            }
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return repository.save(existingUser);
    }

    public void deleteUserById(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        repository.deleteById(id);
    }

    public User createUserFromAdmin(CreateUserRequest request) {
        if (request == null) {
            throw new RuntimeException("User data is required");
        }

        String normalizedEmail = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase();
        if (normalizedEmail.isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (repository.findByEmail(normalizedEmail).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String password = request.getPassword();
        if (password == null || password.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(normalizeRoleForStorage(request.getRole()));
        user.setTitle(request.getTitle() == null ? "Employee" : request.getTitle().trim());
        user.setDepartment(request.getDepartment() == null ? "Unassigned" : request.getDepartment().trim());
        user.setLocation(request.getLocation());
        user.setManager(request.getManager());
        user.setStatus(request.getStatus() == null ? "Active" : request.getStatus().trim());
        user.setEmployeeId(request.getEmployeeId() == null || request.getEmployeeId().isBlank()
                ? "EMP" + System.currentTimeMillis() % 1000000
                : request.getEmployeeId().trim());
        user.setEmailVerified(true);

        return repository.save(user);
    }

    private boolean isVisible(String currentRole, String targetRole) {
        String target = normalizeRole(targetRole);

        return switch (currentRole) {
            case "EMPLOYEE" -> target.equals("EMPLOYEE");
            case "MANAGER" -> target.equals("EMPLOYEE") || target.equals("MANAGER");
            case "ADMIN" -> true;
            default -> false;
        };
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            throw new RuntimeException("User role is not configured");
        }

        String normalized = role.trim().toUpperCase();
        if (normalized.startsWith("ROLE_")) {
            normalized = normalized.substring(5);
        }

        if (!normalized.equals("EMPLOYEE")
                && !normalized.equals("MANAGER")
                && !normalized.equals("ADMIN")) {
            throw new RuntimeException("Invalid user role");
        }

        return normalized;
    }

    private String normalizeRoleForStorage(String role) {
        return switch (normalizeRole(role)) {
            case "EMPLOYEE" -> "Employee";
            case "MANAGER" -> "Manager";
            case "ADMIN" -> "Admin";
            default -> throw new RuntimeException("Invalid user role");
        };
    }

    private UserResponse toResponse(User user, String token) {
        UserResponse response = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getTitle(),
                user.getDepartment(),
                user.getLocation(),
                user.getManager(),
                user.getStatus(),
                user.getEmployeeId(),
                user.getEmailVerified()
        );
        response.setToken(token);
        return response;
    }
}
