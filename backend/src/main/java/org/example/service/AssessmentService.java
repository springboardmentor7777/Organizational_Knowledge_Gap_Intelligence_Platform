package org.example.service;

import java.util.List;
import java.util.Optional;

import org.example.model.Assessment;
import org.example.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        Assessment existing = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        existing.setEmployee(assessment.getEmployee());
        existing.setSkill(assessment.getSkill());
        existing.setCurrentLevel(assessment.getCurrentLevel());
        existing.setScore(assessment.getScore());
        existing.setTotalScore(assessment.getTotalScore());
        existing.setGap(assessment.getGap());
        existing.setStatus(assessment.getStatus());
        existing.setReviewer(assessment.getReviewer());
        existing.setSubmittedOn(assessment.getSubmittedOn());

        return assessmentRepository.save(existing);
    }

    // Delete Assessment
    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }
}