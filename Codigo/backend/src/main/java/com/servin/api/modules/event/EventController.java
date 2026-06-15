package com.servin.api.modules.event;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.event.dto.CreateEventDto;
import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.event.services.CreateEventService;
import com.servin.api.modules.event.services.DeleteEventService;
import com.servin.api.modules.event.services.EditEventService;
import com.servin.api.modules.event.services.ListEventService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private CreateEventService createEventService;

    @Autowired
    private ListEventService listEventService;

    @Autowired
    private DeleteEventService deleteEventService;

    @Autowired
    private EditEventService editEventService;

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

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @Valid @RequestBody CreateEventDto dto) {
        try {
            Event updated = editEventService.edit(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
