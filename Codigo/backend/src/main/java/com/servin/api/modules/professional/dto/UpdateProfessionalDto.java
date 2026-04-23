package com.servin.api.modules.professional.dto;

import java.time.LocalDate;

import com.servin.api.modules.professional.enums.ProfessionalAreaEnum;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateProfessionalDto(
        @NotBlank(message = "Digite o CPF do profissional") String cpf,
        @NotBlank(message = "Informe o nome do profissional") String name,
        @NotBlank(message = "Informe o Email do profissional para concluir o cadastro do mesmo") String email,
        @NotNull(message = "Informe a data de nascimento do profissional") LocalDate birthDate,
        @NotBlank(message = "Informe o telefone do profissional") String phone,
        @NotNull(message = "Informe a area de atuacao do profissional") ProfessionalAreaEnum area,
        @NotBlank(message = "Informe o cargo do profissional") String role,
        @NotNull(message = "Informe o status do profissional") ProfessionalStatusEnum status) {
}
