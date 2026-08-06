package com.okgip.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:tharun7632@gmail.com}")
    private String fromEmail;

    @Value("${app.email.enabled:true}")
    private boolean emailEnabled;

    public void sendEmailOtp(String toEmail, String otpCode, String subject) {
        String body = String.format(
            "Hello,\n\nYour OKGIP Platform Verification Code is: %s\n\nThis OTP is valid for 10 minutes. Please do not share this code with anyone.\n\nBest regards,\nOKGIP Platform Security Team",
            otpCode
        );

        logger.info("==========================================================");
        logger.info("EMAIL DISPATCH -> To: {}", toEmail);
        logger.info("Subject: {}", subject);
        logger.info("OTP Code: [{}]", otpCode);
        logger.info("==========================================================");

        if (mailSender != null && emailEnabled) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                logger.info("Email successfully dispatched via SMTP to {}", toEmail);
            } catch (Exception e) {
                logger.warn("SMTP email dispatch to {} was unsuccessful ({}). Fallback -> OTP [{}] recorded in backend database and logs.", toEmail, e.getMessage(), otpCode);
            }
        }
    }
}
