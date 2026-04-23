package com.servin.api.modules.auth.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.servin.api.config.TokenService;
import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.auth.dto.LoginDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;

@Service
public class FirstAccess {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public String firstAccess(LoginDto loginDto) {
        String cpf = loginDto.cpf().trim();
        Optional<Employee> employeeOpt = employeeRepository.findByCpf(cpf);

        if (employeeOpt.isEmpty()) {
            throw new RuntimeException("Funcionário não encontrado.");
        }

        Employee employee = employeeOpt.get();

        if (employee.getPassword() != null && !employee.getPassword().isEmpty()) {
            throw new RuntimeException("Este usuário já possui senha cadastrada.");
        }

        String encodedPassword = passwordEncoder.encode(loginDto.password());
        employee.setPassword(encodedPassword);
        employeeRepository.save(employee);

        return tokenService.generateToken(employee);
    }

}
