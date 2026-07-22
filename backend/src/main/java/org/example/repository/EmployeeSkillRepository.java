package org.example.repository;

import org.example.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {

    List<EmployeeSkill> findByEmployeeId(Long employeeId);

    List<EmployeeSkill> findBySkillId(Long skillId);
}