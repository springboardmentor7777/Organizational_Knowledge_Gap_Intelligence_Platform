package com.knowledgegap.knowledgegapplatform.service;

import com.knowledgegap.knowledgegapplatform.dto.LoginRequest;
import com.knowledgegap.knowledgegapplatform.dto.LoginResponse;
import com.knowledgegap.knowledgegapplatform.dto.RegisterRequest;
import com.knowledgegap.knowledgegapplatform.entity.User;
import com.knowledgegap.knowledgegapplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(RegisterRequest request) {

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    // Login User
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new LoginResponse("User not found");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse("Invalid Password");
        }

        return new LoginResponse("Login Successful");
    }

    // Get User
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}