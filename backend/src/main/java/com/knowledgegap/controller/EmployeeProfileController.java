package com.knowledgegap.controller;

import com.knowledgegap.entity.EmployeeProfile;
import com.knowledgegap.service.EmployeeProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee-profiles")
@CrossOrigin(origins = "*")
public class EmployeeProfileController {

    @Autowired
    private EmployeeProfileService employeeProfileService;

    @PostMapping
    public EmployeeProfile saveEmployeeProfile(@RequestBody EmployeeProfile profile) {
        return employeeProfileService.saveEmployeeProfile(profile);
    }

    @GetMapping
    public List<EmployeeProfile> getAllEmployeeProfiles() {
        return employeeProfileService.getAllEmployeeProfiles();
    }

    @GetMapping("/{id}")
    public Optional<EmployeeProfile> getEmployeeProfileById(@PathVariable Integer id) {
        return employeeProfileService.getEmployeeProfileById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployeeProfile(@PathVariable Integer id) {
        employeeProfileService.deleteEmployeeProfile(id);
    }
}