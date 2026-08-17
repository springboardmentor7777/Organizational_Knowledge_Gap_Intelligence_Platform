package org.example.repository;

import java.util.List;

import org.example.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {

    List<EmployeeSkill> findByEmployeeId(Long employeeId);

    List<EmployeeSkill> findByEmployeeEmail(String email);

    List<EmployeeSkill> findBySkillId(Long skillId);
}