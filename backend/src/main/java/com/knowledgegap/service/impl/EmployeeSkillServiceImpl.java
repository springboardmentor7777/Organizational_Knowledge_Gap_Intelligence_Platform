package com.knowledgegap.service.impl;

import com.knowledgegap.entity.EmployeeSkill;
import com.knowledgegap.repository.EmployeeSkillRepository;
import com.knowledgegap.service.EmployeeSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeSkillServiceImpl implements EmployeeSkillService {

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @Override
    public EmployeeSkill saveEmployeeSkill(EmployeeSkill employeeSkill) {
        return employeeSkillRepository.save(employeeSkill);
    }

    @Override
    public List<EmployeeSkill> getAllEmployeeSkills() {
        return employeeSkillRepository.findAll();
    }

    @Override
    public Optional<EmployeeSkill> getEmployeeSkillById(Integer id) {
        return employeeSkillRepository.findById(id);
    }

    @Override
    public void deleteEmployeeSkill(Integer id) {
        employeeSkillRepository.deleteById(id);
    }
}