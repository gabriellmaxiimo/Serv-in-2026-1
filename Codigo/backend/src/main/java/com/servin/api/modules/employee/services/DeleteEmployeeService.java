package com.servin.api.modules.employee.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.model.Employee;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class DeleteEmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public void execute(UUID id) {
        try {
            if(id == null) {
                throw new IllegalArgumentException("ID não pode ser nulo.");
            }

            if (!employeeRepository.existsById(id)) {
                throw new IllegalArgumentException("Funcionário não encontrado.");
            }

            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado."));

            employeeRepository.delete(employee);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao excluir funcionário: " + e.getMessage());
        }
    }
}
