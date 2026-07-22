package org.example.controller;

import jakarta.validation.Valid;
import org.example.model.Skill;
import org.example.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Get All Skills
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    // Get Skill By ID
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add Skill
    @PostMapping
    public ResponseEntity<?> addSkill(@Valid @RequestBody Skill skill,
                                      BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        Skill savedSkill = skillService.addSkill(skill);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedSkill);
    }

    // Update Skill
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(@PathVariable Long id,
                                         @Valid @RequestBody Skill skill,
                                         BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        Skill updatedSkill = skillService.updateSkill(id, skill);

        return ResponseEntity.ok(updatedSkill);
    }

    // Delete Skill
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.ok("Skill deleted successfully.");
    }
}