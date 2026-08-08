package org.example.service;

import java.util.Optional;

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