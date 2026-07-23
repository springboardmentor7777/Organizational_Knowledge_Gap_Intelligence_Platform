package com.orgkgi.repository;

import com.orgkgi.entity.RequiredSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequiredSkillRepository extends JpaRepository<RequiredSkill, Long> {
    List<RequiredSkill> findByDesignation(String designation);
}
