package com.orgkgi.service;

import com.orgkgi.entity.Skill;
import com.orgkgi.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // Create Skill
    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // Get All Skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get Skill By Id
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    // Update Skill
    public Skill updateSkill(Long id, Skill skill) {
        skill.setId(id);
        return skillRepository.save(skill);
    }

    // Delete Skill
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
