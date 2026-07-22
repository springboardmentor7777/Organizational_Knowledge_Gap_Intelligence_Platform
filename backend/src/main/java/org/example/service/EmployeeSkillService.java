package org.example.service;

import org.example.model.EmployeeSkill;
import org.example.repository.EmployeeSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeSkillService {

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    // Get All Employee Skills
    public List<EmployeeSkill> getAllEmployeeSkills() {
        return employeeSkillRepository.findAll();
    }

    // Get Employee Skill By ID
    public Optional<EmployeeSkill> getEmployeeSkillById(Long id) {
        return employeeSkillRepository.findById(id);
    }

    // Get Skills By Employee ID
    public List<EmployeeSkill> getSkillsByEmployeeId(Long employeeId) {
        return employeeSkillRepository.findByEmployeeId(employeeId);
    }

    // Add Employee Skill
    public EmployeeSkill addEmployeeSkill(EmployeeSkill employeeSkill) {
        return employeeSkillRepository.save(employeeSkill);
    }

    // Update Employee Skill
    public EmployeeSkill updateEmployeeSkill(Long id, EmployeeSkill employeeSkill) {

        EmployeeSkill existingEmployeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        existingEmployeeSkill.setEmployee(employeeSkill.getEmployee());
        existingEmployeeSkill.setSkill(employeeSkill.getSkill());
        existingEmployeeSkill.setProficiencyLevel(employeeSkill.getProficiencyLevel());
        existingEmployeeSkill.setExperienceYears(employeeSkill.getExperienceYears());

        return employeeSkillRepository.save(existingEmployeeSkill);
    }

    // Delete Employee Skill
    public void deleteEmployeeSkill(Long id) {

        if (!employeeSkillRepository.existsById(id)) {
            throw new RuntimeException("Employee Skill not found");
        }

        employeeSkillRepository.deleteById(id);
    }
}