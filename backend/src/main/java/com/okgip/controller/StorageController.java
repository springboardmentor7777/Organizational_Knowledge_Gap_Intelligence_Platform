package com.okgip.controller;

import com.okgip.dto.MessageResponse;
import com.okgip.service.AuditLogService;
import com.okgip.service.CloudStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/storage")
@SuppressWarnings("null")
public class StorageController {

    @Autowired
    private CloudStorageService cloudStorageService;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, Authentication authentication) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: File is empty!"));
        }

        try {
            String fileUrl = cloudStorageService.storeFile(file);
            String username = (authentication != null && authentication.isAuthenticated()) 
                    ? authentication.getName() 
                    : "anonymous";

            auditLogService.logEvent("FILE_UPLOADED", username, "Uploaded certificate/credential document: " + file.getOriginalFilename());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "File uploaded successfully!");
            response.put("fileUrl", fileUrl);
            response.put("filename", file.getOriginalFilename());
            response.put("size", file.getSize());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Failed to upload file: " + e.getMessage()));
        }
    }
}
