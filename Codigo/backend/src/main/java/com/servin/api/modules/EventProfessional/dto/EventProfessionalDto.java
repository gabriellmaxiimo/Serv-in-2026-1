package com.servin.api.modules.EventProfessional.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.servin.api.modules.EventProfessional.enums.EventProfessionalStatusEnum;

public record EventProfessionalDto(
        UUID id,
        UUID eventId,
        String eventName,
        UUID professionalId,
        String professionalName,
        EventProfessionalStatusEnum status,
        String confirmationToken,
        LocalDateTime confirmedAt,
        LocalDateTime createdAt) {
}
