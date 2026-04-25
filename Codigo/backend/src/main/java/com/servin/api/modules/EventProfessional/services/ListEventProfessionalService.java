package com.servin.api.modules.EventProfessional.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servin.api.modules.EventProfessional.dto.EventProfessionalDto;
import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.EventProfessional.repository.EventProfessionalRepository;

@Service
public class ListEventProfessionalService {

    private final EventProfessionalRepository eventProfessionalRepository;

    public ListEventProfessionalService(EventProfessionalRepository eventProfessionalRepository) {
        this.eventProfessionalRepository = eventProfessionalRepository;
    }

    public List<EventProfessionalDto> listByEvent(UUID eventId) {
        return eventProfessionalRepository.findByEventId(eventId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<EventProfessionalDto> listByProfessional(UUID professionalId) {
        return eventProfessionalRepository.findByProfessionalId(professionalId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    private EventProfessionalDto toDto(EventProfessional eventProfessional) {
        return new EventProfessionalDto(
                eventProfessional.getId(),
                eventProfessional.getEvent().getId(),
                eventProfessional.getEvent().getName(),
                eventProfessional.getProfessional().getId(),
                eventProfessional.getProfessional().getName(),
                eventProfessional.getStatus(),
                eventProfessional.getConfirmationToken(),
                eventProfessional.getConfirmedAt(),
                eventProfessional.getCreatedAt());
    }
}
