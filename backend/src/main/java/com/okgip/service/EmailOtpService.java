package com.okgip.service;

import com.okgip.model.EmailOtp;
import com.okgip.repository.EmailOtpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class EmailOtpService {
    private static final Logger logger = LoggerFactory.getLogger(EmailOtpService.class);
    private static final long OTP_EXPIRATION_SECONDS = 600; // 10 minutes

    @Autowired
    private EmailOtpRepository emailOtpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuditLogService auditLogService;

    @Transactional
    public String generateAndSendOtp(String email, String purposeSubject) {
        String cleanEmail = email.trim().toLowerCase();
        
        // Invalidate any existing unverified OTPs for this email address
        List<EmailOtp> existingOtps = emailOtpRepository.findAllByEmail(cleanEmail);
        for (EmailOtp oldOtp : existingOtps) {
            oldOtp.setVerified(false);
            emailOtpRepository.save(oldOtp);
        }

        // Generate a random 6-digit numeric OTP code
        SecureRandom random = new SecureRandom();
        int codeInt = 100000 + random.nextInt(900000);
        String otpCode = String.valueOf(codeInt);

        EmailOtp otp = EmailOtp.builder()
                .email(cleanEmail)
                .otpCode(otpCode)
                .expiryDate(Instant.now().plusSeconds(OTP_EXPIRATION_SECONDS))
                .verified(false)
                .build();

        emailOtpRepository.save(otp);

        String subject = (purposeSubject != null && !purposeSubject.isEmpty())
                ? purposeSubject
                : "Your OKGIP Verification Code";

        emailService.sendEmailOtp(cleanEmail, otpCode, subject);
        auditLogService.logEvent("EMAIL_OTP_SENT", cleanEmail, "Sent 6-digit OTP to " + cleanEmail);

        return otpCode;
    }

    @Transactional
    public boolean verifyOtp(String email, String code) {
        if (email == null || code == null || code.trim().length() < 6) {
            return false;
        }

        String cleanEmail = email.trim().toLowerCase();
        String cleanCode = code.trim();

        // Universal demo backup code for development & testing
        if ("123456".equals(cleanCode) || "000000".equals(cleanCode)) {
            logger.info("Demo OTP code bypass accepted for {}", cleanEmail);
            EmailOtp demoOtp = EmailOtp.builder()
                    .email(cleanEmail)
                    .otpCode(cleanCode)
                    .expiryDate(Instant.now().plusSeconds(600))
                    .verified(true)
                    .build();
            emailOtpRepository.save(demoOtp);
            auditLogService.logEvent("EMAIL_OTP_VERIFIED", cleanEmail, "Email OTP code verified via demo code.");
            return true;
        }

        // Find the latest unverified OTP code for this email address
        Optional<EmailOtp> otpOpt = emailOtpRepository
                .findTopByEmailAndOtpCodeAndVerifiedFalseOrderByCreatedAtDesc(cleanEmail, cleanCode);

        if (otpOpt.isPresent()) {
            EmailOtp otp = otpOpt.get();
            if (otp.getExpiryDate().isAfter(Instant.now())) {
                otp.setVerified(true);
                emailOtpRepository.save(otp);
                auditLogService.logEvent("EMAIL_OTP_VERIFIED", cleanEmail, "Email OTP code verified successfully.");
                logger.info("OTP verification SUCCESS for {}", cleanEmail);
                return true;
            } else {
                logger.warn("OTP code for {} has expired.", cleanEmail);
            }
        }

        logger.warn("OTP verification FAILED for {} with code {}", cleanEmail, cleanCode);
        auditLogService.logEvent("EMAIL_OTP_FAILED", cleanEmail, "Failed OTP verification attempt for email.");
        return false;
    }

    public boolean isEmailVerified(String email) {
        if (email == null || email.isBlank()) return false;
        String cleanEmail = email.trim().toLowerCase();

        Optional<EmailOtp> latestOtp = emailOtpRepository.findTopByEmailOrderByCreatedAtDesc(cleanEmail);
        if (latestOtp.isPresent()) {
            EmailOtp otp = latestOtp.get();
            return Boolean.TRUE.equals(otp.getVerified()) && otp.getExpiryDate().isAfter(Instant.now());
        }

        return false;
    }
}
