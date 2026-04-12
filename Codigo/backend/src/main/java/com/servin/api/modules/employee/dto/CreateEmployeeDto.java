package com.servin.api.modules.employee.dto;

import java.time.LocalDate;

public record CreateEmployeeDto(
    String name,
    String cpf,
    LocalDate birthDate,
    String email,
    String phone,
    String role
) {}