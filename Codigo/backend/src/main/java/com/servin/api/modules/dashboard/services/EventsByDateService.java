package com.servin.api.modules.dashboard.services;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.repository.EventRepository;

@Service
public class EventsByDateService {

    @Autowired
    private EventRepository eventRepository;

    public List<Map<String, Object>> execute() {
        try {
            List<Map<String, Object>> eventsByDate = eventRepository.countEventsByDate();
            return eventsByDate;
        } catch (Exception e) {
            System.err.println("Erro ao calcular o total de eventos por data: " + e.getMessage());
            return Collections.emptyList();
        }
    }

}
