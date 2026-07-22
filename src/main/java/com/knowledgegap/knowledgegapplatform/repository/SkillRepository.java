package com.knowledgegap.knowledgegapplatform.repository;

import com.knowledgegap.knowledgegapplatform.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findBySkillCategory(String skillCategory);

    List<Skill> findBySkillLevel(String skillLevel);

}