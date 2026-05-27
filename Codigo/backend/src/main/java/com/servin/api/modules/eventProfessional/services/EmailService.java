package com.servin.api.modules.eventProfessional.services;

import java.util.concurrent.CompletableFuture;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.util.Objects;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    // SYNCHRONOUS (envio real)
    public boolean sendSimpleSync(String to, String subject, String htmlBody) {
        try {

            if (to == null || to.isBlank()) {
                logger.warn("[EmailService] Destinatário vazio");
                return false;
            }

            if (!isValidEmail(to)) {
                logger.warn("[EmailService] E-mail inválido: {}", to);
                return false;
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            // garantir que subject não seja null para atender @NonNull
            helper.setSubject(subject == null ? "" : subject);

            // IMPORTANTE: true = HTML habilitado
            // Garantir que não seja passado null para setText (evita problemas com @NonNull)
            helper.setText(htmlBody == null ? "" : htmlBody, true);

            if (from != null && !from.isBlank()) {
                // ensure non-null for APIs annotated with @NonNull
                helper.setFrom(Objects.requireNonNull(from.trim()));
            }

            logger.info("[EmailService] Enviando e-mail para: {}", to);

            mailSender.send(message);

            logger.info("[EmailService] E-mail enviado com sucesso para: {}", to);

            return true;

        } catch (Exception e) {
            logger.error("[EmailService] Erro ao enviar e-mail para {}: {}", to, e.getMessage(), e);
            return false;
        }
    }

    // ASYNC wrapper (fire-and-forget)
    @Async
    public CompletableFuture<Boolean> sendSimpleAsync(String to, String subject, String htmlBody) {
        boolean result = sendSimpleSync(to, subject, htmlBody);
        return CompletableFuture.completedFuture(result);
    }
}