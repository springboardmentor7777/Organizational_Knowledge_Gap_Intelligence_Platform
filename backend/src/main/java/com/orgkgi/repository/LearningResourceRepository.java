package com.orgkgi.repository;

import com.orgkgi.entity.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningResourceRepository extends JpaRepository<LearningResource, Long> {
    List<LearningResource> findBySkillIdAndTargetLevelGreaterThanEqual(Long skillId, int targetLevel);
}