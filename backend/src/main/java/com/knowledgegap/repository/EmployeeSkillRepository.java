package com.knowledgegap.repository;

import com.knowledgegap.entity.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Integer> {

    List<EmployeeSkill> findByUserUserId(Integer userId);

}