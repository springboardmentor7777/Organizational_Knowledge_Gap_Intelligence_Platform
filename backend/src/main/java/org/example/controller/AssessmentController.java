
package org.example.controller;

import org.example.model.Assessment;
import org.example.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    // Create Assessment
    @PostMapping
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return assessmentService.saveAssessment(assessment);
    }

    // Get All Assessments
    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.getAllAssessments();
    }

    // Get Assessment By Id
    @GetMapping("/{id}")
    public Optional<Assessment> getAssessmentById(@PathVariable Long id) {
        return assessmentService.getAssessmentById(id);
    }

    // Get Assessments By Employee Id
    @GetMapping("/employee/{employeeId}")
    public List<Assessment> getAssessmentsByEmployeeId(@PathVariable Long employeeId) {
        return assessmentService.getAssessmentsByEmployeeId(employeeId);
    }

    // Update Assessment
    @PutMapping("/{id}")
    public Assessment updateAssessment(@PathVariable Long id,
                                       @RequestBody Assessment assessment) {
        return assessmentService.updateAssessment(id, assessment);
    }

    // Delete Assessment
    @DeleteMapping("/{id}")
    public void deleteAssessment(@PathVariable Long id) {
        assessmentService.deleteAssessment(id);
    }
}