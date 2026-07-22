package org.example.service;

import org.example.model.Competency;
import org.example.repository.CompetencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompetencyService {

    @Autowired
    private CompetencyRepository competencyRepository;

    // Create
    public Competency saveCompetency(Competency competency) {
        return competencyRepository.save(competency);
    }

    // Get All
    public List<Competency> getAllCompetencies() {
        return competencyRepository.findAll();
    }

    // Get By Id
    public Optional<Competency> getCompetencyById(Long id) {
        return competencyRepository.findById(id);
    }

    // Get By Skill Id
    public Optional<Competency> getCompetencyBySkillId(Long skillId) {
        return competencyRepository.findBySkillId(skillId);
    }

    // Update
    public Competency updateCompetency(Long id, Competency competency) {
        competency.setId(id);
        return competencyRepository.save(competency);
    }

    // Delete
    public void deleteCompetency(Long id) {
        competencyRepository.deleteById(id);
    }
}