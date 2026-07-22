package com.knowledgegap.knowledgegapplatform.service;

import com.knowledgegap.knowledgegapplatform.entity.Skill;
import com.knowledgegap.knowledgegapplatform.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    // Add Skill
    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // Get All Skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get Skill By ID
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    // Update Skill
    public Skill updateSkill(Long id, Skill skill) {

        Skill existingSkill = skillRepository.findById(id).orElse(null);

        if (existingSkill != null) {

            existingSkill.setSkillName(skill.getSkillName());
            existingSkill.setSkillCategory(skill.getSkillCategory());
            existingSkill.setSkillLevel(skill.getSkillLevel());

            return skillRepository.save(existingSkill);
        }

        return null;
    }

    // Delete Skill
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}