package org.example.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.HexFormat;

import org.example.dto.SignupRequest;
import org.example.entity.EmailVerificationCode;
import org.example.model.User;
import org.example.repository.EmailVerificationCodeRepository;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmailVerificationService {

    private static final Duration OTP_TTL = Duration.ofMinutes(10);

    private final EmailVerificationCodeRepository codeRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final SecureRandom secureRandom = new SecureRandom();
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${spring.mail.username:no-reply@knowledgegap.local}")
    private String senderAddress;

    public EmailVerificationService(EmailVerificationCodeRepository codeRepository,
                                    UserRepository userRepository,
                                    JavaMailSender mailSender) {
        this.codeRepository = codeRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    @Transactional
    public void createPendingSignup(SignupRequest request) {
        String email = normalize(request.getEmail());
        String otp = String.format("%06d", secureRandom.nextInt(1_000_000));
        Instant now = Instant.now();

        codeRepository.deleteByEmail(email);

        EmailVerificationCode verificationCode = new EmailVerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setName(request.getName().trim());
        verificationCode.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        verificationCode.setCodeHash(hash(otp));
        verificationCode.setCreatedAt(now);
        verificationCode.setExpiresAt(now.plus(OTP_TTL));
        codeRepository.save(verificationCode);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderAddress);
        message.setTo(email);
        message.setSubject("Verify your Knowledge Gap Intelligence account");
        message.setText("Your verification code is " + otp + ". It expires in 10 minutes.");
        mailSender.send(message);
    }

    public void resendVerificationCode(String email) {
        String normalizedEmail = normalize(email);
        EmailVerificationCode pendingSignup = codeRepository
                .findTopByEmailOrderByCreatedAtDesc(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("No pending signup found for this email"));

        sendCode(normalizedEmail, pendingSignup.getName(), pendingSignup.getPasswordHash());
    }

    @Transactional
    public void verifyEmail(String email, String otp) {
        String normalizedEmail = normalize(email);
        EmailVerificationCode verificationCode = codeRepository
                .findTopByEmailOrderByCreatedAtDesc(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("Verification code not found or expired"));

        if (verificationCode.getExpiresAt().isBefore(Instant.now())) {
            codeRepository.delete(verificationCode);
            throw new RuntimeException("Verification code has expired");
        }

        if (!MessageDigest.isEqual(hash(otp).getBytes(StandardCharsets.UTF_8),
                verificationCode.getCodeHash().getBytes(StandardCharsets.UTF_8))) {
            throw new RuntimeException("Invalid verification code");
        }

        User user = userRepository.findByEmail(normalizedEmail).orElse(null);
        if (user == null) {
            user = new User();
            user.setName(verificationCode.getName());
            user.setEmail(normalizedEmail);
            user.setPassword(verificationCode.getPasswordHash());
            user.setRole("Employee");
            user.setTitle("Employee");
            user.setDepartment("Unassigned");
            user.setStatus("Active");
        }
        user.setEmailVerified(true);
        User savedUser = userRepository.save(user);
        if (savedUser.getEmployeeId() == null || savedUser.getEmployeeId().isBlank()) {
            savedUser.setEmployeeId("EMP" + String.format("%05d", savedUser.getId()));
            userRepository.save(savedUser);
        }
        codeRepository.deleteByEmail(normalizedEmail);
    }

    private void sendCode(String email, String name, String passwordHash) {
        String otp = String.format("%06d", secureRandom.nextInt(1_000_000));
        Instant now = Instant.now();
        codeRepository.deleteByEmail(email);

        EmailVerificationCode verificationCode = new EmailVerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setName(name);
        verificationCode.setPasswordHash(passwordHash);
        verificationCode.setCodeHash(hash(otp));
        verificationCode.setCreatedAt(now);
        verificationCode.setExpiresAt(now.plus(OTP_TTL));
        codeRepository.save(verificationCode);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderAddress);
        message.setTo(email);
        message.setSubject("Verify your Knowledge Gap Intelligence account");
        message.setText("Your verification code is " + otp + ". It expires in 10 minutes.");
        mailSender.send(message);
    }

    private String normalize(String email) {
        return email.trim().toLowerCase();
    }

    private String hash(String value) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is unavailable", exception);
        }
    }
}
