package com.servin.api.modules.event;

import com.servin.api.model.Event;
import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.event.services.CreateEventService;
import com.servin.api.modules.event.services.ListEventService;
import com.servin.api.modules.event.services.DeleteEventService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private CreateEventService createEventService;

    @Autowired
    private ListEventService listEventService;

    @Autowired
    private DeleteEventService deleteEventService;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody CreateEventDto createEventDto) {
        try {
            createEventService.execute(createEventDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Event>> listAllEvents() {
        try {
            List<Event> events = listEventService.execute();
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        try {
            deleteEventService.execute(id);
            return ResponseEntity.ok("Evento deletado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}