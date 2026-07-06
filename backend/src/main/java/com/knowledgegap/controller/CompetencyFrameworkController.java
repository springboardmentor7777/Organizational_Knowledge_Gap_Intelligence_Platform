package com.knowledgegap.controller;

import com.knowledgegap.entity.CompetencyFramework;
import com.knowledgegap.service.CompetencyFrameworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/competency-frameworks")
@CrossOrigin(origins = "*")
public class CompetencyFrameworkController {

    @Autowired
    private CompetencyFrameworkService competencyFrameworkService;

    @PostMapping
    public CompetencyFramework saveCompetencyFramework(@RequestBody CompetencyFramework framework) {
        return competencyFrameworkService.saveCompetencyFramework(framework);
    }

    @GetMapping
    public List<CompetencyFramework> getAllCompetencyFrameworks() {
        return competencyFrameworkService.getAllCompetencyFrameworks();
    }

    @GetMapping("/{id}")
    public Optional<CompetencyFramework> getCompetencyFrameworkById(@PathVariable Integer id) {
        return competencyFrameworkService.getCompetencyFrameworkById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCompetencyFramework(@PathVariable Integer id) {
        competencyFrameworkService.deleteCompetencyFramework(id);
    }
}