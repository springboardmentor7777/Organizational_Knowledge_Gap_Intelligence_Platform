package org.example.service;

import org.example.model.Skill;
import org.example.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    // Get All Skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Get Skill By ID
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    // Add Skill
    public Skill addSkill(Skill skill) {

        if (skillRepository.existsBySkillName(skill.getSkillName())) {
            throw new RuntimeException("Skill already exists");
        }

        return skillRepository.save(skill);
    }

    // Update Skill
    public Skill updateSkill(Long id, Skill skill) {

        Skill existingSkill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        existingSkill.setSkillName(skill.getSkillName());
        existingSkill.setCategory(skill.getCategory());

        return skillRepository.save(existingSkill);
    }

    // Delete Skill
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new RuntimeException("Skill not found");
        }

        skillRepository.deleteById(id);
    }
}