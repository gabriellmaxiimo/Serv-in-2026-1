package com.servin.api.modules.eventEmployee.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.eventEmployee.repository.EventEmployeeRepository;

@Service
public class ListEventsByEmployee {

    @Autowired
    private EventEmployeeRepository eventEmployeeRepository;

    public List<Event> execute(UUID employeeId) {
        List<Event> allEventsByEmployee = eventEmployeeRepository.findEventsByEmployeeId(employeeId);

        if (allEventsByEmployee.isEmpty()) {
            return null;
        }

        return allEventsByEmployee;
    }
}
