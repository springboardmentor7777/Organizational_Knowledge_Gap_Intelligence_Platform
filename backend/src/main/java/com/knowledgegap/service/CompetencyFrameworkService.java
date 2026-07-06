package com.knowledgegap.service;

import com.knowledgegap.entity.CompetencyFramework;

import java.util.List;
import java.util.Optional;

public interface CompetencyFrameworkService {

    CompetencyFramework saveCompetencyFramework(CompetencyFramework framework);

    List<CompetencyFramework> getAllCompetencyFrameworks();

    Optional<CompetencyFramework> getCompetencyFrameworkById(Integer id);

    void deleteCompetencyFramework(Integer id);
}