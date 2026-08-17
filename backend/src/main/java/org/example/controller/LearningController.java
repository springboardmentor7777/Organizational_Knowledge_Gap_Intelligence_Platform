package org.example.controller;

import org.example.dto.LearningProgressResponse;
import org.example.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/learning")
@CrossOrigin(origins = "http://localhost:5173")
public class LearningController {

    @Autowired
    private LearningService learningService;

    @GetMapping("/employee/{employeeId}")
    public LearningProgressResponse getLearningProgress(@PathVariable Long employeeId) {
        return learningService.getLearningProgressForEmployee(employeeId);
    }
}
