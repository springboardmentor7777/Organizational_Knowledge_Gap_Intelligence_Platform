package org.example.controller;

import jakarta.validation.Valid;
import org.example.model.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user,
                                   BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        String response = service.login(user.getEmail(), user.getPassword());

        return ResponseEntity.ok(response);}
        @PostMapping("/register")
        public ResponseEntity<?> register(@Valid @RequestBody User user,
                BindingResult result) {

            if (result.hasErrors()) {

                Map<String, String> errors = new HashMap<>();

                result.getFieldErrors().forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage()));

                return ResponseEntity.badRequest().body(errors);
            }

            String response = service.register(user);

            return ResponseEntity.ok(response);
        }
    }
