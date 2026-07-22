package org.example.service;

import org.example.model.Assessment;
import org.example.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    // Create Assessment
    public Assessment saveAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    // Get All Assessments
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    // Get Assessment By Id
    public Optional<Assessment> getAssessmentById(Long id) {
        return assessmentRepository.findById(id);
    }

    // Get Assessments By Employee Id
    public List<Assessment> getAssessmentsByEmployeeId(Long employeeId) {
        return assessmentRepository.findByEmployeeId(employeeId);
    }

    // Update Assessment
    public Assessment updateAssessment(Long id, Assessment assessment) {
        assessment.setId(id);
        return assessmentRepository.save(assessment);
    }

    // Delete Assessment
    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }
}