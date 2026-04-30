package com.servin.api.modules.employee.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.employee.dto.EditEmployeeDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class EditEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void execute(UUID id, EditEmployeeDto editEmployeeDto) {

        boolean isValidPhone = editEmployeeDto.phone() != null &&
                editEmployeeDto.phone().trim().length() >= 10;

        try {
            if (id == null) {
                throw new IllegalArgumentException("ID não pode ser nulo.");
            }

            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado."));

            if (editEmployeeDto.name() == null || editEmployeeDto.name().trim().isEmpty()) {
                throw new IllegalArgumentException("O nome é obrigatório.");
            }

            if (editEmployeeDto.email() == null || editEmployeeDto.email().trim().isEmpty()) {
                throw new IllegalArgumentException("Email é obrigatório.");
            }

            if (!isValidPhone) {
                throw new IllegalArgumentException("Telefone é obrigatório e deve conter no mínimo 10 dígitos.");
            }

            employee.setName(editEmployeeDto.name().trim());
            employee.setBirthDate(editEmployeeDto.birthDate());
            employee.setEmail(editEmployeeDto.email() != null ? editEmployeeDto.email().trim() : null);
            employee.setPhone(editEmployeeDto.phone() != null ? editEmployeeDto.phone().trim() : null);
            employee.setRole(editEmployeeDto.role());

            employee.setUpdatedAt(LocalDateTime.now());

            employeeRepository.save(employee);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar funcionário: " + e.getMessage());
        }
    }
}