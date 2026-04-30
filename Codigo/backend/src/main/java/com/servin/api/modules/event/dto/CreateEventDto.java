package com.servin.api.modules.event.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateEventDto(
                @NotBlank(message = "O nome é obrigatório") String name,

                String description,

                @NotBlank(message = "A data inicial é obrigatória") String initialDate,

                String finalDate,

                String imageUrl,

                @NotBlank(message = "O CEP é obrigatório") String cep,
                @NotBlank(message = "A rua é obrigatória") String street,
                @NotBlank(message = "O bairro é obrigatório") String neighborhood,
                @NotBlank(message = "O estado é obrigatório") String state,
                @NotBlank(message = "A cidade é obrigatória") String city) {
}