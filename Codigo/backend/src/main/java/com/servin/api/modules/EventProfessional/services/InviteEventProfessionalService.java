package com.servin.api.modules.EventProfessional.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import com.servin.api.modules.EventProfessional.enums.EventProfessionalStatusEnum;
import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.EventProfessional.repository.EventProfessionalRepository;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;

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
    //* Convida profissional para evento e cria token de confirmação.
    public void invite(UUID eventId, UUID professionalId) {

        Event event = eventRepository.findByIdAndDeletedAtIsNull(eventId)
            .orElseThrow(() -> new IllegalArgumentException("Event não encontrado"));

        Professional professional = professionalRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (professional.getStatus() == ProfessionalStatusEnum.INACTIVE){
            throw new RuntimeException("Profissional está inativo");
        }
        
        if (eventProfessionalRepository.existsByEventAndProfessional(event, professional)) {
            throw new RuntimeException("Profissional já está nesse evento");
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
