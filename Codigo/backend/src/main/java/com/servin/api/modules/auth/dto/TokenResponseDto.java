package com.servin.api.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record TokenResponseDto(
                @NotBlank(message = "O token é obrigatório") String token) {
}
