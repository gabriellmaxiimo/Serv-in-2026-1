package com.servin.api.modules.checkin;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.checkin.dto.CheckInResponseDTO;
import com.servin.api.modules.checkin.dto.CheckInRequestDTO;
import com.servin.api.modules.checkin.services.CheckInService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/events")
@RequiredArgsConstructor

public class CheckInController {
    private final CheckInService checkInService;

    @PostMapping("/{eventId}/check-in/{professionalId}")

    public ResponseEntity<CheckInResponseDTO> realizarCheckOut(
        @PathVariable UUID eventId,
        @PathVariable UUID professionalId
    ){
        return ResponseEntity.ok(
            checkInService.realizarCheckOut(eventId, professionalId)
        );
    }

    public ResponseEntity<CheckInResponseDTO> realizarCheckIn(
        @PathVariable UUID eventId,
        @PathVariable UUID professionalId,
        @RequestBody CheckInRequestDTO dto
    ){
        return ResponseEntity.ok(
            checkInService.realizarCheckIn(eventId, professionalId, dto)
        );
    }
}
