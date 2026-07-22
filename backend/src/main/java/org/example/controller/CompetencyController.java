package org.example.controller;

import org.example.model.Competency;
import org.example.service.CompetencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/competencies")
@CrossOrigin(origins = "*")
public class CompetencyController {

    @Autowired
    private CompetencyService competencyService;

    @PostMapping
    public Competency createCompetency(@RequestBody Competency competency) {
        return competencyService.saveCompetency(competency);
    }

    @GetMapping
    public List<Competency> getAllCompetencies() {
        return competencyService.getAllCompetencies();
    }

    @GetMapping("/{id}")
    public Optional<Competency> getCompetencyById(@PathVariable Long id) {
        return competencyService.getCompetencyById(id);
    }

    @GetMapping("/skill/{skillId}")
    public Optional<Competency> getCompetencyBySkillId(@PathVariable Long skillId) {
        return competencyService.getCompetencyBySkillId(skillId);
    }

    @PutMapping("/{id}")
    public Competency updateCompetency(@PathVariable Long id,
                                       @RequestBody Competency competency) {
        return competencyService.updateCompetency(id, competency);
    }

    @DeleteMapping("/{id}")
    public void deleteCompetency(@PathVariable Long id) {
        competencyService.deleteCompetency(id);
    }
}