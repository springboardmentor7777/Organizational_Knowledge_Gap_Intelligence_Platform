package com.orgkgi.repository;

import com.orgkgi.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findBySkillName(String name);
   boolean existsBySkillName(String name);
}