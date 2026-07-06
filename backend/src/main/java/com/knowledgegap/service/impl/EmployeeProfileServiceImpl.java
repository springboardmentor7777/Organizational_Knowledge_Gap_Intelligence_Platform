package com.knowledgegap.service.impl;

import com.knowledgegap.entity.EmployeeProfile;
import com.knowledgegap.repository.EmployeeProfileRepository;
import com.knowledgegap.service.EmployeeProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeProfileServiceImpl implements EmployeeProfileService {

    @Autowired
    private EmployeeProfileRepository employeeProfileRepository;

    @Override
    public EmployeeProfile saveEmployeeProfile(EmployeeProfile profile) {
        return employeeProfileRepository.save(profile);
    }

    @Override
    public List<EmployeeProfile> getAllEmployeeProfiles() {
        return employeeProfileRepository.findAll();
    }

    @Override
    public Optional<EmployeeProfile> getEmployeeProfileById(Integer id) {
        return employeeProfileRepository.findById(id);
    }

    @Override
    public void deleteEmployeeProfile(Integer id) {
        employeeProfileRepository.deleteById(id);
    }
}