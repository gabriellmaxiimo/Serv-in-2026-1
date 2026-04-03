package com.servin.api.modules.event.services;

import com.servin.api.model.Event;
import com.servin.api.enums.EventStatusEnum;
import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CreateEventService {

    @Autowired
    private EventRepository eventRepository;

    public void execute(CreateEventDto createEventDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME; 
        
        LocalDateTime start = LocalDateTime.parse(createEventDto.initialDate(), formatter);
        LocalDateTime end = createEventDto.finalDate() != null ? 
                            LocalDateTime.parse(createEventDto.finalDate(), formatter) : null;

        LocalDateTime now = LocalDateTime.now();

        try {
            if (end != null && end.isBefore(start)) {
                throw new IllegalArgumentException("A data final não pode ser anterior à data inicial.");
            }

            boolean eventExists = eventRepository.existsBySimilarNameAndInitialDate(
                createEventDto.name().trim(),
                start
            );

            if (eventExists) {
                throw new IllegalArgumentException("Já existe um evento ativo com este nome.");
            }

            Event event = new Event();
            event.setName(createEventDto.name());
            event.setDescription(createEventDto.description());
            
            event.setInitialDate(start); 
            event.setFinalDate(end);
            
            event.setLocation(createEventDto.location());
            event.setImageUrl(createEventDto.imageUrl());
            event.setCreatedAt(now);
            event.setUpdatedAt(now);

            if (end != null && now.isAfter(start) && now.isBefore(end)) {
                event.setStatus(EventStatusEnum.ANDAMENTO);
            } else if (end != null && now.isAfter(end)) {
                event.setStatus(EventStatusEnum.FINALIZADO);
            } else {
                event.setStatus(EventStatusEnum.AGENDADO);
            }

            eventRepository.save(event);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar evento: " + e.getMessage());
        }
    }
}