package com.servin.api.modules.eventProfessional.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimple(String to, String subject, String text) {
        try {
            if (to == null || to.isBlank()) {
                logger.warn("[EmailService] Tentativa de enviar e-mail com destinatário vazio");
                return;
            }
            
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);
            if (from != null && !from.isBlank()) {
                msg.setFrom(from);
            }
            
            logger.info("[EmailService] Enviando e-mail para: {}, assunto: {}", to, subject);
            mailSender.send(msg);
            logger.info("[EmailService] E-mail enviado com sucesso para: {}", to);
        } catch (Exception e) {
            logger.error("[EmailService] Erro ao enviar e-mail para {}: {}", to, e.getMessage(), e);
        }
    }
}
