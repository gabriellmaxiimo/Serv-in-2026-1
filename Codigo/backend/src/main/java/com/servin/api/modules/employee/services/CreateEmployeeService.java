package com.servin.api.modules.employee.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.model.Employee;
import com.servin.api.modules.employee.dto.CreateEmployeeDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;
import com.servin.api.utils.CpfUtils;

@Service
public class CreateEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void execute(CreateEmployeeDto createEmployeeDto) {
        try {
            if (createEmployeeDto.name() == null || createEmployeeDto.name().trim().isEmpty()) {
                throw new IllegalArgumentException("O nome é obrigatório.");
            }

            if (createEmployeeDto.role() == null || createEmployeeDto.role().trim().isEmpty()) {
                throw new IllegalArgumentException("O cargo é obrigatório.");
            }

            Employee employee = new Employee();
            employee.setName(createEmployeeDto.name().trim());
            employee.setRole(createEmployeeDto.role().trim());
            
            employee.setCpf(CpfUtils.sanitizar(createEmployeeDto.cpf()));
            
            employee.setEmail(createEmployeeDto.email());
            employee.setPhone(createEmployeeDto.phone());
            employee.setBirthDate(createEmployeeDto.birthDate());

            employeeRepository.save(employee);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}