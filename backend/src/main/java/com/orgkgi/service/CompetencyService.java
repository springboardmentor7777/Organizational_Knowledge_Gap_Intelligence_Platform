package com.orgkgi.service;

import com.orgkgi.entity.Competency;
import com.orgkgi.repository.CompetencyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompetencyService {

    private final CompetencyRepository competencyRepository;

    public CompetencyService(CompetencyRepository competencyRepository) {
        this.competencyRepository = competencyRepository;
    }

    public List<Competency> getAllCompetencies() {
        return competencyRepository.findAll();
    }

    public Optional<Competency> getCompetencyById(Long id) {
        return competencyRepository.findById(id);
    }

    public Competency createCompetency(Competency competency) {
        return competencyRepository.save(competency);
    }

    public Competency updateCompetency(Long id, Competency updatedCompetency) {

        Competency competency = competencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competency not found"));

        competency.setCompetencyName(updatedCompetency.getCompetencyName());
        competency.setRequiredLevel(updatedCompetency.getRequiredLevel());
        competency.setDepartment(updatedCompetency.getDepartment());
        competency.setSkill(updatedCompetency.getSkill());

        return competencyRepository.save(competency);
    }

    public void deleteCompetency(Long id) {

        Competency competency = competencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competency not found"));

        competencyRepository.delete(competency);
    }
}