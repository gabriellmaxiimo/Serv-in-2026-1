package com.servin.api.modules.eventProfessional.services;

import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.util.concurrent.CompletableFuture;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    // synchronous send used internally
    public boolean sendSimpleSync(String to, String subject, String text) {
        try {
            if (to == null || to.isBlank()) {
                logger.warn("[EmailService] Tentativa de enviar e-mail com destinatário vazio");
                return false;
            }

            if (!isValidEmail(to)) {
                logger.warn("[EmailService] E-mail inválido informado: {}", to);
                return false;
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
            return true;
        } catch (Exception e) {
            logger.error("[EmailService] Erro ao enviar e-mail para {}: {}", to, e.getMessage(), e);
            return false;
        }
    }

    // async wrapper - returns CompletableFuture so caller can fire-and-forget
    @Async
    public CompletableFuture<Boolean> sendSimpleAsync(String to, String subject, String text) {
        boolean result = sendSimpleSync(to, subject, text);
        return CompletableFuture.completedFuture(result);
    }
}
