package org.example.service;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public String login(String email, String password) {

        Optional<User> existingUser = repository.findByEmail(email);

        if (existingUser.isPresent()) {

            if (existingUser.get().getPassword().equals(password)) {
                return "Login Success";
            } else {
                return "Invalid Email or Password";
            }

        } else {
            return "user not found";
        }
    }
    public String register(User user) {

        Optional<User> existingUser = repository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists";
        }

        repository.save(user);

        return "Registration Successful";
    }
}