package com.knowledgegap.controller;

import com.knowledgegap.entity.EmployeeSkill;
import com.knowledgegap.service.EmployeeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee-skills")
@CrossOrigin(origins = "*")
public class EmployeeSkillController {

    @Autowired
    private EmployeeSkillService employeeSkillService;

    @PostMapping
    public EmployeeSkill saveEmployeeSkill(@RequestBody EmployeeSkill employeeSkill) {
        return employeeSkillService.saveEmployeeSkill(employeeSkill);
    }

    @GetMapping
    public List<EmployeeSkill> getAllEmployeeSkills() {
        return employeeSkillService.getAllEmployeeSkills();
    }

    @GetMapping("/{id}")
    public Optional<EmployeeSkill> getEmployeeSkillById(@PathVariable Integer id) {
        return employeeSkillService.getEmployeeSkillById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployeeSkill(@PathVariable Integer id) {
        employeeSkillService.deleteEmployeeSkill(id);
    }
}