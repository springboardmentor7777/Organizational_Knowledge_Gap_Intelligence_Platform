package com.orgkgi.service;

import com.orgkgi.entity.EmployeeSkill;
import com.orgkgi.repository.EmployeeSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeSkillService {

    private final EmployeeSkillRepository employeeSkillRepository;

    public EmployeeSkillService(EmployeeSkillRepository employeeSkillRepository) {
        this.employeeSkillRepository = employeeSkillRepository;
    }

    public List<EmployeeSkill> getAllEmployeeSkills() {
        return employeeSkillRepository.findAll();
    }

    public Optional<EmployeeSkill> getEmployeeSkillById(Long id) {
        return employeeSkillRepository.findById(id);
    }

    public EmployeeSkill createEmployeeSkill(EmployeeSkill employeeSkill) {
        return employeeSkillRepository.save(employeeSkill);
    }

    public EmployeeSkill updateEmployeeSkill(Long id, EmployeeSkill updatedEmployeeSkill) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        employeeSkill.setEmployee(updatedEmployeeSkill.getEmployee());
        employeeSkill.setSkill(updatedEmployeeSkill.getSkill());
        employeeSkill.setLevel(updatedEmployeeSkill.getLevel());

        return employeeSkillRepository.save(employeeSkill);
    }

    public void deleteEmployeeSkill(Long id) {

        EmployeeSkill employeeSkill = employeeSkillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Skill not found"));

        employeeSkillRepository.delete(employeeSkill);
    }
}