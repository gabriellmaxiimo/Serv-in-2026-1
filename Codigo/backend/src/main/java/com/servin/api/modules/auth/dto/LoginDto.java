package com.servin.api.modules.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDto(
        @NotBlank(message = "O CPF é obrigatório") 
        String cpf,

        @NotBlank(message = "A senha é obrigatória") 
        @Size(min = 6, message = "A senha deve conter no mínimo 6 caracteres") 
        String password
) {}
