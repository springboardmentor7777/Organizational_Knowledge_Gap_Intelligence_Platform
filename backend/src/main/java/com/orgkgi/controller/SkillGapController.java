package com.orgkgi.controller;

import com.orgkgi.dto.SkillGapDTO;
import com.orgkgi.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class SkillGapController {

    private final AIService aiService;

    @Autowired
    public SkillGapController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/{employeeId}/skill-gaps")
    public ResponseEntity<List<SkillGapDTO>> getSkillGaps(@PathVariable Long employeeId) {
        List<SkillGapDTO> gaps = aiService.analyzeGaps(employeeId);
        return ResponseEntity.ok(gaps);
    }
@GetMapping("/{employeeId}/learning-path")
    public ResponseEntity<com.orgkgi.dto.LearningPathDTO> getLearningPath(@PathVariable Long employeeId) {
        com.orgkgi.dto.LearningPathDTO path = aiService.generateLearningPath(employeeId);
        return ResponseEntity.ok(path);
    }
}