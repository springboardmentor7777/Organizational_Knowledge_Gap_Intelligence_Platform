package org.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.example.dto.EmailVerificationRequest;
import org.example.dto.LoginRequest;
import org.example.dto.ResendVerificationRequest;
import org.example.dto.SignupRequest;
import org.example.dto.UserResponse;
import org.example.dto.VerificationResponse;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request,
                                   BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        UserResponse response = service.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request,
                                      BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        service.register(request);
        return ResponseEntity.ok(new VerificationResponse(
                "Registration received. Check your email for the verification code."));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<VerificationResponse> verifyEmail(
            @Valid @RequestBody EmailVerificationRequest request) {
        service.verifyEmail(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(new VerificationResponse("Email verified successfully"));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<VerificationResponse> resendVerification(
            @Valid @RequestBody ResendVerificationRequest request) {
        service.resendVerificationCode(request.getEmail());
        return ResponseEntity.ok(new VerificationResponse("A new verification code was sent"));
    }
}
