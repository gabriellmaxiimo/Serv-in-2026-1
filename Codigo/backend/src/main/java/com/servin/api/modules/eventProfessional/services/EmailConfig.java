package com.servin.api.modules.eventProfessional.services;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

    @Bean
    @ConditionalOnMissingBean(JavaMailSender.class)
    public JavaMailSender javaMailSender() {
        // Fallback simples: registra um JavaMailSender vazio para evitar falha na inicialização.
        // Se quiser enviar e-mails de verdade, configure as propriedades em application.properties.
        return new JavaMailSenderImpl();
    }
}
