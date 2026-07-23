package com.orgkgi.controller;

import com.orgkgi.entity.Competency;
import com.orgkgi.service.CompetencyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/competencies")
public class CompetencyController {

    private final CompetencyService competencyService;

    public CompetencyController(CompetencyService competencyService) {
        this.competencyService = competencyService;
    }

    // Create Competency
    @PostMapping
    public Competency createCompetency(@RequestBody Competency competency) {
        return competencyService.createCompetency(competency);
    }

    // Get All Competencies
    @GetMapping
    public List<Competency> getAllCompetencies() {
        return competencyService.getAllCompetencies();
    }

    // Get Competency By ID
    @GetMapping("/{id}")
    public Optional<Competency> getCompetencyById(@PathVariable Long id) {
        return competencyService.getCompetencyById(id);
    }

    // Update Competency
    @PutMapping("/{id}")
    public Competency updateCompetency(@PathVariable Long id,
                                       @RequestBody Competency competency) {
        return competencyService.updateCompetency(id, competency);
    }

    // Delete Competency
    @DeleteMapping("/{id}")
    public void deleteCompetency(@PathVariable Long id) {
        competencyService.deleteCompetency(id);
    }
}