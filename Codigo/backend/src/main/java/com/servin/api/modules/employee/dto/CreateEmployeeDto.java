package com.servin.api.modules.employee.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

public record CreateEmployeeDto(
    @NotBlank(message = "O nome é obrigatório")
    String name,
    
    @NotBlank(message = "O CPF é obrigatório")
    @CPF(message = "O CPF informado é inválido")
    String cpf,
    
    LocalDate birthDate,
    String email,
    String phone,
    
    @NotBlank(message = "O cargo é obrigatório")
    String role
) {}