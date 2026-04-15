package com.servin.api.modules.employee.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.model.Employee;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class ListEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> execute() {
        return employeeRepository.findAll();
    }
}