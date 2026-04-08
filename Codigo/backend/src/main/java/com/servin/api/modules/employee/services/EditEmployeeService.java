package com.servin.api.modules.employee.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.model.Employee;
import com.servin.api.modules.employee.dto.EditEmployeeDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class EditEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void execute(UUID id, EditEmployeeDto editEmployeeDto) {

        try {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado."));

            // Validação básica
            if (editEmployeeDto.name() == null || editEmployeeDto.name().trim().isEmpty()) {
                throw new IllegalArgumentException("O nome é obrigatório.");
            }

            if (editEmployeeDto.role() == null || editEmployeeDto.role().trim().isEmpty()) {
                throw new IllegalArgumentException("O cargo é obrigatório.");
            }

            // Atualização dos campos
            employee.setName(editEmployeeDto.name().trim());
            employee.setRole(editEmployeeDto.role().trim());

            // Se você tiver campo updatedAt no model, pode usar:
            // employee.setUpdatedAt(LocalDateTime.now());

            employeeRepository.save(employee);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar funcionário: " + e.getMessage());
        }
    }
}