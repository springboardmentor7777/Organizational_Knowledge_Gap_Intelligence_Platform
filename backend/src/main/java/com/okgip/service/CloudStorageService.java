package com.okgip.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@SuppressWarnings("null")
public class CloudStorageService {
    private static final Logger logger = LoggerFactory.getLogger(CloudStorageService.class);

    @Value("${app.storage.upload-dir:./uploads}")
    private String uploadDir;

    @Value("${app.cloudinary.cloud-name:}")
    private String cloudinaryCloudName;

    public String storeFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file.");
        }

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "document.pdf";
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i);
        }

        String uniqueFilename = UUID.randomUUID().toString() + extension;

        // Ensure target directory exists
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path targetLocation = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetLocation);

        logger.info("File successfully saved to storage: {}", targetLocation);

        // If Cloudinary / AWS S3 cloud name is provided, log integration point
        if (cloudinaryCloudName != null && !cloudinaryCloudName.isBlank()) {
            return String.format("https://res.cloudinary.com/%s/image/upload/okgip_credentials/%s", cloudinaryCloudName, uniqueFilename);
        }

        // Return relative file resource URL
        return "/api/storage/files/" + uniqueFilename;
    }
}
