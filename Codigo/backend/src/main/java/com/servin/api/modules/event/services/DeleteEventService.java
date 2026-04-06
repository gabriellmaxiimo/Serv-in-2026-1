package com.servin.api.modules.event.services;

import com.servin.api.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DeleteEventService {

    @Autowired
    private EventRepository eventRepository;

    public void execute(UUID id) {
        Event event = eventRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado ou já deletado."));

        event.setDeletedAt(LocalDateTime.now());

        eventRepository.save(event);

        System.out.println("\u001B[32m[SUCESSO] O evento '" + event.getName() + "' foi marcado como DELETADO!\u001B[0m");
    }
}