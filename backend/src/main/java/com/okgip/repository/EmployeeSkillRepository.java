package com.okgip.repository;

import com.okgip.model.EmployeeSkill;
import com.okgip.model.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {
    List<EmployeeSkill> findByUserId(Long userId);
    List<EmployeeSkill> findByUserIdAndSource(Long userId, Source source);
    Optional<EmployeeSkill> findByUserIdAndSkillIdAndSource(Long userId, Long skillId, Source source);
}
