package com.servin.api.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInviteEmail(String to, String token) {

        String confirmLink =
            "http://localhost:8080/invites/confirm?token=" + token;

        String rejectLink =
            "http://localhost:8080/invites/reject?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Convite para evento");

        message.setText(
            "Você recebeu um convite!\n\n" +
            "Confirmar:\n" + confirmLink + "\n\n" +
            "Recusar:\n" + rejectLink
        );

        mailSender.send(message);
    }
}
