package com.okgip.controller;

import com.okgip.model.Course;
import com.okgip.model.Enrollment;
import com.okgip.security.UserDetailsImpl;
import com.okgip.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    ProgressService progressService;

    @GetMapping("/catalog")
    public List<Course> getCatalog() {
        return progressService.getCourseCatalog();
    }

    @GetMapping("/my")
    public List<Enrollment> getMyProgress() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return progressService.getEnrollmentsByUserId(userDetails.getId());
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestParam Long courseId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Enrollment enrollment = progressService.enrollInCourse(userDetails.getId(), courseId);
        return ResponseEntity.ok(enrollment);
    }

    @PutMapping("/enrollment/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Enrollment updated = progressService.updateProgress(id, status);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/enrollment/{id}/verify-certificate")
    public ResponseEntity<?> verifyCertificate(
            @PathVariable Long id,
            @RequestParam(required = false) String certificateUrl,
            @RequestParam(required = false) String certificateId) {
        Enrollment updated = progressService.verifyAndCompleteCertificate(id, certificateUrl, certificateId);
        return ResponseEntity.ok(updated);
    }
}
