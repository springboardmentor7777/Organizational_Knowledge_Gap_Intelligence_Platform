package com.knowledgegap.knowledgegapplatform.controller;

import com.knowledgegap.knowledgegapplatform.dto.LoginRequest;
import com.knowledgegap.knowledgegapplatform.dto.LoginResponse;
import com.knowledgegap.knowledgegapplatform.dto.RegisterRequest;
import com.knowledgegap.knowledgegapplatform.entity.User;
import com.knowledgegap.knowledgegapplatform.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.registerUser(request);
    }

    // Login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // Get User
    @GetMapping("/user")
    public User getUser(@RequestParam String email) {
        return authService.getUserByEmail(email);
    }
}