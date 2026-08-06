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
}
