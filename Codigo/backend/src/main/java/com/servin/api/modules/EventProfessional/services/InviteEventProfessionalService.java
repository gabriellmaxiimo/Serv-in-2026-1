package com.servin.api.modules.EventProfessional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.modules.EventProfessional.enums.EventProfessionalStatusEnum;
import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.EventProfessional.repository.EventProfessionalRepository;

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
    public void invite(UUID eventId, UUID professionalId) { //*Convida o profissional para o evento, gerando o token e definindo o Status dele para Confirmação Pendente;

        Event event = eventRepository.findByIdAndDeletedAtIsNull(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event não encontrado")); //Busca o evento pelo Id

        Professional professional = professionalRepository.findById(professionalId)
                    .orElseThrow(() -> new RuntimeException("Profissional não encontrado")); //Busca o profissional pelo Id

        if (professional.getStatus() == ProfessionalStatusEnum.INACTIVE){
            throw new RuntimeException("Profissional está inativo"); //Impede que o profissional inavito seja convidado para um evento
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

    public void confirm(String token){ //*Caso o profissional confirme a presença, o Status muda para confirmado.
        EventProfessional ep = eventProfessionalRepository.findByConfirmationToken(token)
            .orElseThrow(() -> new RuntimeException("Token Inválido"));

        ep.setStatus(EventProfessionalStatusEnum.CONFIRMED);
        ep.setConfirmedAt(LocalDateTime.now());

        eventProfessionalRepository.save(ep); 
    }

    public void reject(String token){ //*Caso o profissional confirme a presença, o Status muda para recusado.
        EventProfessional ep = eventProfessionalRepository.findByConfirmationToken(token)
            .orElseThrow(() -> new RuntimeException("Token Inválido"));

        ep.setStatus(EventProfessionalStatusEnum.REJECTED);

        eventProfessionalRepository.save(ep);
    }

}
