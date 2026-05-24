package com.servin.api.modules.dashboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class TotalEmployeesService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public int execute() {
        try {
            int totalActiveEmployees = employeeRepository.findAllActive().size();
            return totalActiveEmployees;
        } catch (Exception e) {
            System.err.println("Erro ao calcular o total de funcionários: " + e.getMessage());
            return 0;
        }
    }
}
