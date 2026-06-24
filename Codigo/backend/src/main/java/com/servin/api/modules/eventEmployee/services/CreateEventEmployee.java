package com.servin.api.modules.eventEmployee.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;

import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.employee.repository.EmployeeRepository;
import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.repository.EventRepository;
import com.servin.api.modules.eventEmployee.model.EventEmployee;
import com.servin.api.modules.eventEmployee.repository.EventEmployeeRepository;

import jakarta.transaction.Transactional;

public class CreateEventEmployee {

    @Autowired
    private EventEmployeeRepository eventEmployeeRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EventRepository eventRepository;

    @Transactional
    public EventEmployee execute(@NonNull UUID employeeId, @NonNull UUID eventId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        EventEmployee eventEmployee = new EventEmployee();
        eventEmployee.setEmployee(employee);
        eventEmployee.setEvent(event);

        return eventEmployeeRepository.save(eventEmployee);
    }
}
