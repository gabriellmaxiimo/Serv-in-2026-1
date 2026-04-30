package com.servin.api.modules.employee.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;

public record EditEmployeeDto(
                String name,
                LocalDate birthDate,
                String email,

                @Min(value = 10, message = "O telefone deve conter no mínimo 11 dígitos") String phone,
                boolean role) {
}