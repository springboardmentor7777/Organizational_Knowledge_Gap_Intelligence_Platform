package com.okgip.controller;

import com.okgip.model.*;
import com.okgip.model.PeerEvaluation.EvaluationStatus;
import com.okgip.repository.*;
import com.okgip.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private PeerEvaluationRepository peerEvaluationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private EmployeeSkillRepository employeeSkillRepository;

    @GetMapping("/peer/pending")
    public ResponseEntity<?> getPendingPeerEvaluations() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<PeerEvaluation> pending = peerEvaluationRepository.findByEvaluatorIdAndStatus(userDetails.getId(), EvaluationStatus.PENDING);
        
        List<Map<String, Object>> response = pending.stream().map(eval -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", eval.getId());
            map.put("evaluateeId", eval.getEvaluatee().getId());
            map.put("evaluateeName", eval.getEvaluatee().getFullName() != null ? eval.getEvaluatee().getFullName() : eval.getEvaluatee().getUsername());
            map.put("evaluateeTitle", eval.getEvaluatee().getTitle());
            map.put("evaluateeDepartment", eval.getEvaluatee().getDepartment());
            map.put("evaluateeAvatar", eval.getEvaluatee().getAvatarUrl());
            map.put("skillId", eval.getSkill().getId());
            map.put("skillName", eval.getSkill().getName());
            map.put("skillCategory", eval.getSkill().getCategory());
            map.put("createdAt", eval.getCreatedAt());
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/peer/request")
    public ResponseEntity<?> requestPeerEvaluation(@RequestBody Map<String, Long> payload) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long evaluatorId = payload.get("evaluatorId");
        Long skillId = payload.get("skillId");

        if (evaluatorId == null || skillId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "evaluatorId and skillId are required"));
        }

        User evaluatee = userRepository.findById(userDetails.getId()).orElseThrow();
        User evaluator = userRepository.findById(evaluatorId).orElseThrow();
        Skill skill = skillRepository.findById(skillId).orElseThrow();

        PeerEvaluation evaluation = PeerEvaluation.builder()
                .evaluatee(evaluatee)
                .evaluator(evaluator)
                .skill(skill)
                .status(EvaluationStatus.PENDING)
                .build();

        peerEvaluationRepository.save(evaluation);
        return ResponseEntity.ok(Map.of("message", "360 peer evaluation request sent successfully"));
    }

    @PostMapping("/peer/submit")
    public ResponseEntity<?> submitPeerEvaluation(@RequestBody Map<String, Object> payload) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long evaluationId = Long.valueOf(payload.get("evaluationId").toString());
        Integer rating = Integer.valueOf(payload.get("rating").toString());
        String feedback = (String) payload.get("feedback");

        PeerEvaluation evaluation = peerEvaluationRepository.findById(evaluationId).orElseThrow();

        if (!evaluation.getEvaluator().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Unauthorized to complete this evaluation"));
        }

        evaluation.setRating(rating);
        evaluation.setFeedback(feedback);
        evaluation.setStatus(EvaluationStatus.COMPLETED);
        evaluation.setCompletedAt(LocalDateTime.now());
        peerEvaluationRepository.save(evaluation);

        return ResponseEntity.ok(Map.of("message", "Peer evaluation submitted successfully"));
    }

    @GetMapping("/360-summary/{userId}")
    public ResponseEntity<?> get360Summary(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<EmployeeSkill> empSkills = employeeSkillRepository.findByUserId(userId);
        List<PeerEvaluation> completedPeerEvals = peerEvaluationRepository.findByEvaluateeIdAndStatus(userId, EvaluationStatus.COMPLETED);

        // Collect all skills from employee inventory AND completed peer evaluations
        Map<Long, Skill> skillMap = new LinkedHashMap<>();
        for (EmployeeSkill es : empSkills) {
            skillMap.put(es.getSkill().getId(), es.getSkill());
        }
        for (PeerEvaluation pe : completedPeerEvals) {
            skillMap.put(pe.getSkill().getId(), pe.getSkill());
        }

        List<Map<String, Object>> summaryList = new ArrayList<>();

        for (Skill skill : skillMap.values()) {
            Map<String, Object> item = new HashMap<>();
            item.put("skillId", skill.getId());
            item.put("skillName", skill.getName());
            item.put("category", skill.getCategory());

            // Check if user has self-rating in empSkills
            Optional<EmployeeSkill> empSkillOpt = empSkills.stream()
                    .filter(es -> es.getSkill().getId().equals(skill.getId()))
                    .findFirst();

            double selfRating = empSkillOpt.isPresent() && empSkillOpt.get().getProficiencyLevel() != null 
                    ? empSkillOpt.get().getProficiencyLevel() 
                    : 3.0; // default 3.0 if not explicitly self-rated
            item.put("selfRating", selfRating);

            // Peer ratings
            List<PeerEvaluation> skillPeers = completedPeerEvals.stream()
                    .filter(p -> p.getSkill().getId().equals(skill.getId()))
                    .toList();

            double peerAvg = skillPeers.isEmpty() 
                    ? selfRating 
                    : skillPeers.stream().filter(p -> p.getRating() != null).mapToInt(PeerEvaluation::getRating).average().orElse(selfRating);
            item.put("peerRatingAvg", Math.round(peerAvg * 10.0) / 10.0);
            item.put("peerReviewCount", skillPeers.size());

            // Manager rating
            double managerRating = Math.min(5.0, selfRating);
            item.put("managerRating", managerRating);

            // Calibrated 360 score: 30% Self + 40% Manager + 30% Peer
            double calibrated360 = (0.30 * selfRating) + (0.40 * managerRating) + (0.30 * peerAvg);
            item.put("calibrated360Score", Math.round(calibrated360 * 10.0) / 10.0);

            // Feedback list with Evaluator Name
            List<Map<String, String>> feedbacks = skillPeers.stream()
                    .filter(p -> p.getFeedback() != null && !p.getFeedback().isBlank())
                    .map(p -> Map.of(
                            "evaluatorName", p.getEvaluator().getFullName() != null ? p.getEvaluator().getFullName() : p.getEvaluator().getUsername(),
                            "feedback", p.getFeedback()
                    ))
                    .toList();
            item.put("peerFeedbacks", feedbacks);

            summaryList.add(item);
        }

        return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "userName", user.getFullName() != null ? user.getFullName() : user.getUsername(),
                "department", user.getDepartment() != null ? user.getDepartment() : "General",
                "skills", summaryList
        ));
    }
}
