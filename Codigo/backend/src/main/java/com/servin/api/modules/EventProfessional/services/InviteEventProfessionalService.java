package com.servin.api.modules.eventProfessional.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import com.servin.api.modules.eventProfessional.enums.EventProfessionalStatusEnum;
import com.servin.api.modules.eventProfessional.model.EventProfessional;
import com.servin.api.modules.eventProfessional.repository.EventProfessionalRepository;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import java.time.Duration;

import jakarta.transaction.Transactional;


@Service
public class InviteEventProfessionalService {

 
    private final EventRepository eventRepository;
    private final ProfessionalRepository professionalRepository;
    private final EventProfessionalRepository eventProfessionalRepository;

    public InviteEventProfessionalService(EventRepository eventRepository, ProfessionalRepository professionalRepository, EventProfessionalRepository eventProfessionalRepository) {
        this.eventRepository = eventRepository;
        this.professionalRepository = professionalRepository;
        this.eventProfessionalRepository = eventProfessionalRepository;
    }

    @Transactional
    public void invite(UUID eventId, UUID professionalId) {

    Event event = eventRepository.findByIdAndDeletedAtIsNull(eventId)
        .orElseThrow(() -> new IllegalArgumentException("Event não encontrado"));

    Professional professional = professionalRepository.findById(professionalId)
            .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

    if (professional.getStatus() == ProfessionalStatusEnum.INACTIVE) {
        throw new RuntimeException("Profissional está inativo");
    }

    if (eventProfessionalRepository.existsByEventAndProfessional(event, professional)) {
        throw new RuntimeException("Profissional já está nesse evento");
    }

    var existingRelations = eventProfessionalRepository.findByProfessional(professional);

    for (EventProfessional existing : existingRelations) {

        if (existing.getStatus() == EventProfessionalStatusEnum.REJECTED) continue;

        Event existingEvent = existing.getEvent();

        long diff = Math.abs(
            Duration.between(
                existingEvent.getInitialDate(),
                event.getInitialDate()
            ).toHours()
        );

        if (diff < 4) {
            throw new RuntimeException("Profissional já possui evento com intervalo menor que 4 horas");
        }
    }

    EventProfessional ep = new EventProfessional();
    ep.setEvent(event);
    ep.setProfessional(professional);
    ep.setStatus(EventProfessionalStatusEnum.PENDING_CONFIRMATION);
    ep.setCreatedAt(LocalDateTime.now());

    String token = UUID.randomUUID().toString();
    ep.setConfirmationToken(token);

    eventProfessionalRepository.save(ep);
    }

    //* Marca o convite como confirmado.
    public void confirm(String token){
        EventProfessional ep = eventProfessionalRepository.findByConfirmationToken(token)
            .orElseThrow(() -> new RuntimeException("Token Inválido"));

        ep.setStatus(EventProfessionalStatusEnum.CONFIRMED);
        ep.setConfirmedAt(LocalDateTime.now());

        eventProfessionalRepository.save(ep); 
    }

    //* Marca o convite como recusado.
    public void reject(String token){
        EventProfessional ep = eventProfessionalRepository.findByConfirmationToken(token)
            .orElseThrow(() -> new RuntimeException("Token Inválido"));

        ep.setStatus(EventProfessionalStatusEnum.REJECTED);

        eventProfessionalRepository.save(ep);
    }

}
