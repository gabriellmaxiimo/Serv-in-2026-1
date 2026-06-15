package com.servin.api.modules.event.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.event.enums.EventStatusEnum;
import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;

@Service
public class EditEventService {

    @Autowired
    private EventRepository eventRepository;

    public Event edit(UUID id, CreateEventDto createEventDto) {
    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    LocalDateTime start = LocalDateTime.parse(createEventDto.initialDate(), formatter);
    LocalDateTime end = createEventDto.finalDate() != null
            ? LocalDateTime.parse(createEventDto.finalDate(), formatter)
            : null;

    LocalDateTime now = LocalDateTime.now();

    Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

    if (end != null && end.isBefore(start)) {
        throw new IllegalArgumentException("A data final não pode ser anterior à data inicial.");
    }

    event.setName(createEventDto.name());
    event.setDescription(createEventDto.description());
    event.setInitialDate(start);
    event.setFinalDate(end);
    event.setImageUrl(createEventDto.imageUrl());
    event.setUpdatedAt(now);

    event.setCep(createEventDto.cep());
    event.setStreet(createEventDto.street());
    event.setNeighborhood(createEventDto.neighborhood());
    event.setState(createEventDto.state());
    event.setCity(createEventDto.city());

    // status
    if (end != null && now.isAfter(start) && now.isBefore(end)) {
        event.setStatus(EventStatusEnum.ANDAMENTO);
    } else if (end != null && now.isAfter(end)) {
        event.setStatus(EventStatusEnum.FINALIZADO);
    } else {
        event.setStatus(EventStatusEnum.AGENDADO);
    }

    return eventRepository.save(event);
    }
}
