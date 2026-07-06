package com.knowledgegap.service;

import com.knowledgegap.entity.Skill;

import java.util.List;
import java.util.Optional;

public interface SkillService {

    Skill saveSkill(Skill skill);

    List<Skill> getAllSkills();

    Optional<Skill> getSkillById(Integer id);

    void deleteSkill(Integer id);
}