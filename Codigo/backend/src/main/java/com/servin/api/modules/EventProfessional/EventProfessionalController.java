package com.servin.api.modules.EventProfessional;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.EventProfessional.dto.EventProfessionalDto;
import com.servin.api.modules.EventProfessional.services.InviteEventProfessionalService;
import com.servin.api.modules.EventProfessional.services.ListEventProfessionalService;
import com.servin.api.modules.EventProfessional.services.RemoveEventProfessionalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EventProfessionalController {

    private final InviteEventProfessionalService inviteEventProfessionalService;
    private final ListEventProfessionalService listEventProfessionalService;
    private final RemoveEventProfessionalService removeEventProfessionalService;

    @PostMapping("/events/{eventId}/professionals/{professionalId}/invite")
    public ResponseEntity<String> invite(@PathVariable UUID eventId, @PathVariable UUID professionalId) {
        try {
            inviteEventProfessionalService.invite(eventId, professionalId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Profissional convidado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/event-professionals/confirm/{token}")
    public ResponseEntity<String> confirm(@PathVariable String token) {
        try {
            inviteEventProfessionalService.confirm(token);
            return ResponseEntity.ok("Presença confirmada com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/event-professionals/reject/{token}")
    public ResponseEntity<String> reject(@PathVariable String token) {
        try {
            inviteEventProfessionalService.reject(token);
            return ResponseEntity.ok("Convite recusado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/events/{eventId}/professionals/{professionalId}")
    public ResponseEntity<String> remove(@PathVariable UUID eventId, @PathVariable UUID professionalId) {
        try {
            removeEventProfessionalService.remove(eventId, professionalId);
            return ResponseEntity.ok("Profissional removido do evento com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/events/{eventId}/professionals")
    public ResponseEntity<List<EventProfessionalDto>> listByEvent(@PathVariable UUID eventId) {
        try {
            return ResponseEntity.ok(listEventProfessionalService.listByEvent(eventId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/professionals/{professionalId}/events")
    public ResponseEntity<List<EventProfessionalDto>> listByProfessional(@PathVariable UUID professionalId) {
        try {
            return ResponseEntity.ok(listEventProfessionalService.listByProfessional(professionalId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
