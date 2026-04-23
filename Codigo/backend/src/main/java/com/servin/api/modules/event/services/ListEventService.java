package com.servin.api.modules.event.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;

@Service
public class ListEventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> execute() {

        try {
            List<Event> events = eventRepository.findAllActive();

            return events;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar eventos: " + e.getMessage());
        }
    }
}
