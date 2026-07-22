package com.orgkgi.controller;

import com.orgkgi.entity.EmployeeSkill;
import com.orgkgi.service.EmployeeSkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee-skills")
public class EmployeeSkillController {

    private final EmployeeSkillService employeeSkillService;

    public EmployeeSkillController(EmployeeSkillService employeeSkillService) {
        this.employeeSkillService = employeeSkillService;
    }

    // Create Employee Skill
    @PostMapping
    public EmployeeSkill createEmployeeSkill(@RequestBody EmployeeSkill employeeSkill) {
        return employeeSkillService.createEmployeeSkill(employeeSkill);
    }

    // Get All Employee Skills
    @GetMapping
    public List<EmployeeSkill> getAllEmployeeSkills() {
        return employeeSkillService.getAllEmployeeSkills();
    }

    // Get Employee Skill By ID
    @GetMapping("/{id}")
    public Optional<EmployeeSkill> getEmployeeSkillById(@PathVariable Long id) {
        return employeeSkillService.getEmployeeSkillById(id);
    }

    // Update Employee Skill
    @PutMapping("/{id}")
    public EmployeeSkill updateEmployeeSkill(@PathVariable Long id,
                                             @RequestBody EmployeeSkill employeeSkill) {
        return employeeSkillService.updateEmployeeSkill(id, employeeSkill);
    }

    // Delete Employee Skill
    @DeleteMapping("/{id}")
    public void deleteEmployeeSkill(@PathVariable Long id) {
        employeeSkillService.deleteEmployeeSkill(id);
    }
}