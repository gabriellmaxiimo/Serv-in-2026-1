package com.servin.api.modules.dashboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.repository.EventRepository;

@Service
public class TotalEventsService {

    @Autowired
    private EventRepository eventRepository;

    public int execute() {

        try {
            int totalActiveEvents = eventRepository.findAllActive().size();
            return totalActiveEvents;
        } catch (Exception e) {
            System.err.println("Erro ao calcular o total de eventos: " + e.getMessage());
            return 0;
        }

    }
}
