package com.knowledgegap.service.impl;

import com.knowledgegap.dto.AuthResponse;
import com.knowledgegap.dto.LoginRequest;
import com.knowledgegap.dto.RegisterRequest;
import com.knowledgegap.entity.Role;
import com.knowledgegap.entity.User;
import com.knowledgegap.repository.RoleRepository;
import com.knowledgegap.repository.UserRepository;
import com.knowledgegap.security.JwtUtil;
import com.knowledgegap.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(null, "Email already exists");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setStatus("ACTIVE");

        Role employeeRole = roleRepository.findByRoleName("EMPLOYEE")
        .orElseThrow(() -> new RuntimeException("EMPLOYEE not found"));

user.setRole(employeeRole);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, "Registration Successful");
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtUtil.generateToken(request.getEmail());

        return new AuthResponse(token, "Login Successful");
    }
}