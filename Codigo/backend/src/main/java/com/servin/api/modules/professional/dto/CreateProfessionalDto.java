package com.servin.api.modules.professional.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

public class CreateProfessionalDto {

    @Getter
    @NotBlank(message = "Digite o CPF do profissional") String cpf;

    @Getter
    @NotBlank(message = "Informe o nome do profissional") String name;

    @Getter
    @NotBlank(message = "Informe o Email do profissional para concluir o cadastro do mesmo")String email;

    @Getter
    @NotNull(message = "Informe a data de nascimento do profissional")LocalDate birthDate;

    @Getter
    @NotBlank(message = "Informe o telefone do profissional") String phone;

    @Getter
    @NotBlank(message = "Informe a area de atuacao do profissional") String area;

    @Getter
    @NotBlank(message = "Informe o cargo do profissional") String role;
}
