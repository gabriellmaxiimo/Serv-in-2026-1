package com.servin.api.modules.eventProfessional.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimple(String to, String subject, String text) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);
            if (from != null && !from.isBlank()) {
                msg.setFrom(from);
            }
            mailSender.send(msg);
        } catch (Exception e) {
            System.out.println("[EmailService] falha ao enviar e-mail: " + e.getMessage());
        }
    }
}
