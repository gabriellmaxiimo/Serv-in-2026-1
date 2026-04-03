package com.servin.api.modules.event.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record CreateEventDto(
    @NotBlank(message = "O nome é obrigatório") 
    String name,

    String description,

    @NotBlank(message = "A data inicial é obrigatória")
    String initialDate, 
    
    String finalDate,  

    @NotBlank(message = "O local é obrigatório")
    String location,
    
    String imageUrl
) {}