package com.okgip.controller;

import com.okgip.dto.GapResponse;
import com.okgip.security.UserDetailsImpl;
import com.okgip.service.GapAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gaps")
public class GapAnalysisController {

    @Autowired
    GapAnalysisService gapAnalysisService;

    @GetMapping("/my")
    public List<GapResponse> getMyGaps() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gapAnalysisService.calculateUserGaps(userDetails.getId());
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('HR_SPECIALIST') or hasRole('ADMIN')")
    public List<GapResponse> getUserGaps(@PathVariable Long id) {
        return gapAnalysisService.calculateUserGaps(id);
    }

    @GetMapping("/heatmap")
    @PreAuthorize("hasRole('MANAGER') or hasRole('HR_SPECIALIST') or hasRole('ADMIN')")
    public ResponseEntity<?> getHeatmap(@RequestParam String department) {
        Map<String, Object> heatmap = gapAnalysisService.calculateDepartmentHeatmap(department);
        return ResponseEntity.ok(heatmap);
    }
}
