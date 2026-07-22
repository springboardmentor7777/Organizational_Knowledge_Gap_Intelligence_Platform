package org.example.controller;

import jakarta.validation.Valid;
import org.example.model.EmployeeSkill;
import org.example.service.EmployeeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee-skills")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeSkillController {

    @Autowired
    private EmployeeSkillService employeeSkillService;

    // Get All Employee Skills
    @GetMapping
    public ResponseEntity<List<EmployeeSkill>> getAllEmployeeSkills() {
        return ResponseEntity.ok(employeeSkillService.getAllEmployeeSkills());
    }

    // Get Employee Skill By ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeSkill> getEmployeeSkillById(@PathVariable Long id) {

        return employeeSkillService.getEmployeeSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get Skills By Employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeSkill>> getSkillsByEmployeeId(@PathVariable Long employeeId) {

        return ResponseEntity.ok(employeeSkillService.getSkillsByEmployeeId(employeeId));
    }

    // Add Employee Skill
    @PostMapping
    public ResponseEntity<?> addEmployeeSkill(@Valid @RequestBody EmployeeSkill employeeSkill,
                                              BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        EmployeeSkill savedEmployeeSkill = employeeSkillService.addEmployeeSkill(employeeSkill);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployeeSkill);
    }

    // Update Employee Skill
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployeeSkill(@PathVariable Long id,
                                                 @Valid @RequestBody EmployeeSkill employeeSkill,
                                                 BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            result.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            return ResponseEntity.badRequest().body(errors);
        }

        EmployeeSkill updatedEmployeeSkill =
                employeeSkillService.updateEmployeeSkill(id, employeeSkill);

        return ResponseEntity.ok(updatedEmployeeSkill);
    }

    // Delete Employee Skill
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployeeSkill(@PathVariable Long id) {

        employeeSkillService.deleteEmployeeSkill(id);

        return ResponseEntity.ok("Employee Skill deleted successfully.");
    }
}