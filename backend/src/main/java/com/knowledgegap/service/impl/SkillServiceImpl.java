package com.knowledgegap.service.impl;

import com.knowledgegap.entity.Skill;
import com.knowledgegap.repository.SkillRepository;
import com.knowledgegap.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Optional<Skill> getSkillById(Integer id) {
        return skillRepository.findById(id);
    }

    @Override
    public void deleteSkill(Integer id) {
        skillRepository.deleteById(id);
    }
}