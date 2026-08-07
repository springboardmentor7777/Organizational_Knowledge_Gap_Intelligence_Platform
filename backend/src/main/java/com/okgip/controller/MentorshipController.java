package com.okgip.controller;

import com.okgip.model.MentorshipMatch;
import com.okgip.model.MentorshipSession;
import com.okgip.security.UserDetailsImpl;
import com.okgip.service.MentorshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentorship")
public class MentorshipController {

    @Autowired
    MentorshipService mentorshipService;

    @GetMapping("/options")
    public List<Map<String, Object>> getMentorshipOptions() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mentorshipService.findPotentialMentors(userDetails.getId());
    }

    @PostMapping("/request")
    public ResponseEntity<?> requestMentorship(@RequestParam Long mentorId, @RequestParam Long skillId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MentorshipMatch match = mentorshipService.requestMentorship(userDetails.getId(), mentorId, skillId);
        return ResponseEntity.ok(match);
    }

    @PutMapping("/match/{id}")
    public ResponseEntity<?> updateMatch(@PathVariable Long id, @RequestParam String status) {
        MentorshipMatch updated = mentorshipService.updateMatchStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/matches")
    public List<MentorshipMatch> getMyMatches() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mentorshipService.getUserMatches(userDetails.getId());
    }

    @GetMapping("/sessions")
    public List<MentorshipSession> getMySessions() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mentorshipService.getUserSessions(userDetails.getId());
    }

    @PostMapping("/sessions")
    public ResponseEntity<?> scheduleSession(
            @RequestParam Long matchId,
            @RequestParam String title,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time,
            @RequestParam Integer duration) {
        MentorshipSession session = mentorshipService.scheduleSession(matchId, title, time, duration);
        return ResponseEntity.ok(session);
    }

    @RequestMapping(value = "/sessions/{id}/complete", method = {RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<?> completeSession(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Object> body,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) Integer rating) {
        try {
            String finalNotes = notes;
            Integer finalRating = rating;

            if (body != null) {
                if (body.containsKey("notes") && body.get("notes") != null) {
                    finalNotes = body.get("notes").toString();
                }
                if (body.containsKey("rating") && body.get("rating") != null) {
                    try {
                        finalRating = Integer.parseInt(body.get("rating").toString());
                    } catch (Exception ignored) {}
                }
            }

            MentorshipSession updated = mentorshipService.completeSession(id, finalNotes, finalRating);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> errMsg = new HashMap<>();
            errMsg.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errMsg);
        }
    }

    @PutMapping("/sessions/{id}/cancel")
    public ResponseEntity<?> cancelSession(@PathVariable Long id) {
        MentorshipSession updated = mentorshipService.cancelSession(id);
        return ResponseEntity.ok(updated);
    }
}
