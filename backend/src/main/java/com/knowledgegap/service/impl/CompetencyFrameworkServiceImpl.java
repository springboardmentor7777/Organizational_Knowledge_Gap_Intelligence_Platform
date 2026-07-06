package com.knowledgegap.service.impl;

import com.knowledgegap.entity.CompetencyFramework;
import com.knowledgegap.repository.CompetencyFrameworkRepository;
import com.knowledgegap.service.CompetencyFrameworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompetencyFrameworkServiceImpl implements CompetencyFrameworkService {

    @Autowired
    private CompetencyFrameworkRepository competencyFrameworkRepository;

    @Override
    public CompetencyFramework saveCompetencyFramework(CompetencyFramework framework) {
        return competencyFrameworkRepository.save(framework);
    }

    @Override
    public List<CompetencyFramework> getAllCompetencyFrameworks() {
        return competencyFrameworkRepository.findAll();
    }

    @Override
    public Optional<CompetencyFramework> getCompetencyFrameworkById(Integer id) {
        return competencyFrameworkRepository.findById(id);
    }

    @Override
    public void deleteCompetencyFramework(Integer id) {
        competencyFrameworkRepository.deleteById(id);
    }
}