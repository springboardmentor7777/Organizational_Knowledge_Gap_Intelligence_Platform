package org.example.service;

import java.util.Optional;

import org.example.dto.CreateUserRequest;
import org.example.dto.SignupRequest;
import org.example.dto.UserResponse;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EmailVerificationService emailVerificationService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserResponse login(String email, String password) {

        Optional<User> existingUser = repository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (Boolean.FALSE.equals(user.getEmailVerified())) {
                throw new RuntimeException("Please verify your email before signing in");
            }
            if (passwordEncoder.matches(password, user.getPassword())
                    || user.getPassword().equals(password)) {
                return toResponse(user);
            } else {
                throw new RuntimeException("Invalid email or password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void register(SignupRequest request) {

        Optional<User> existingUser = repository.findByEmail(request.getEmail().trim().toLowerCase());

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
        user.setRole(request.getRole() == null ? "Employee" : request.getRole().trim());
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

    private UserResponse toResponse(User user) {
        return new UserResponse(
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
    }
}