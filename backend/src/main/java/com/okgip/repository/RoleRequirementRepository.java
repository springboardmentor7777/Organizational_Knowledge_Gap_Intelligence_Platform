package com.okgip.repository;

import com.okgip.model.RoleRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRequirementRepository extends JpaRepository<RoleRequirement, Long> {
    List<RoleRequirement> findByRoleAndDepartment(String role, String department);
    Optional<RoleRequirement> findByRoleAndDepartmentAndSkillId(String role, String department, Long skillId);
}
