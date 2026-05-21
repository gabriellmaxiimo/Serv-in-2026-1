package com.servin.api.modules.eventProfessional.dto;

public record InviteEventProfessionalResponseDto(
        String message,
        boolean emailSent,
        boolean emailQueued) {
}
