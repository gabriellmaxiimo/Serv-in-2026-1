package com.servin.api.modules.employee.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.employee.dto.CreateEmployeeDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class CreateEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void execute(CreateEmployeeDto createEmployeeDto) {

        boolean isValidPhone = createEmployeeDto.phone() != null &&
                createEmployeeDto.phone().trim().length() >= 10;

        boolean isValidCpf = createEmployeeDto.cpf() != null &&
                createEmployeeDto.cpf().trim().length() >= 11;

        try {
            if (createEmployeeDto.name() == null || createEmployeeDto.name().trim().isEmpty()) {
                throw new IllegalArgumentException("O nome é obrigatório.");
            }

            if (employeeRepository.findByCpf(createEmployeeDto.cpf()).isPresent() || !isValidCpf) {
                throw new IllegalArgumentException("Já existe um funcionário com esse cpf ou o cpf é inválido.");
            }

            if (!isValidPhone) {
                throw new IllegalArgumentException("Telefone é obrigatório e deve conter no mínimo 10 dígitos.");
            }

            Employee employee = new Employee();
            employee.setName(createEmployeeDto.name().trim());
            employee.setRole(createEmployeeDto.role());
            employee.setCpf(createEmployeeDto.cpf());
            employee.setEmail(createEmployeeDto.email());
            employee.setPhone(createEmployeeDto.phone());
            employee.setBirthDate(createEmployeeDto.birthDate());
            employee.setCreatedAt(LocalDateTime.now());

            employeeRepository.save(employee);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}