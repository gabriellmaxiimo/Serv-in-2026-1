package com.servin.api.modules.event;

import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.event.services.CreateEventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private CreateEventService createEventService;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody CreateEventDto createEventDto) {
        try {
            createEventService.execute(createEventDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}