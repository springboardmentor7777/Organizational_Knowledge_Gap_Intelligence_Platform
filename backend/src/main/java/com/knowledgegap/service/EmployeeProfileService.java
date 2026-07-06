package com.knowledgegap.service;

import com.knowledgegap.entity.EmployeeProfile;

import java.util.List;
import java.util.Optional;

public interface EmployeeProfileService {

    EmployeeProfile saveEmployeeProfile(EmployeeProfile profile);

    List<EmployeeProfile> getAllEmployeeProfiles();

    Optional<EmployeeProfile> getEmployeeProfileById(Integer id);

    void deleteEmployeeProfile(Integer id);
}