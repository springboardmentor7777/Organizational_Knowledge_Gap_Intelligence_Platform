package com.knowledgegap.service;

import com.knowledgegap.entity.EmployeeSkill;

import java.util.List;
import java.util.Optional;

public interface EmployeeSkillService {

    EmployeeSkill saveEmployeeSkill(EmployeeSkill skill);

    List<EmployeeSkill> getAllEmployeeSkills();

    Optional<EmployeeSkill> getEmployeeSkillById(Integer id);

    void deleteEmployeeSkill(Integer id);
}