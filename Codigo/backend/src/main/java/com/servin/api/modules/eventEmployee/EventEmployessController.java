package com.servin.api.modules.eventEmployee;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.eventEmployee.services.CreateEventEmployee;
import com.servin.api.modules.eventEmployee.services.ListEventsByEmployee;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/event-employees")
public class EventEmployessController {

    @Autowired
    private CreateEventEmployee createEventEmployee;

    @Autowired
    private ListEventsByEmployee listEventsByEmployee;

    @GetMapping("/list/{employeeId}")
    public ResponseEntity<String> list(@PathVariable @NonNull UUID employeeId) {
        try {
            listEventsByEmployee.execute(employeeId);
            return ResponseEntity.status(HttpStatus.OK).body("Listagem de eventos por funcionário");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@Valid @RequestBody @NonNull UUID employeeId,
            @Valid @RequestBody @NonNull UUID eventId) {
        try {
            createEventEmployee.execute(employeeId, eventId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Funcionário associado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
