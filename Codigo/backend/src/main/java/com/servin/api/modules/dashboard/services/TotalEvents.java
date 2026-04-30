package com.servin.api.modules.dashboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.repository.EventRepository;

@Service
public class TotalEvents {

    @Autowired
    private EventRepository eventRepository;

    public int execute() {
        return (int) eventRepository.count();
    }

}
