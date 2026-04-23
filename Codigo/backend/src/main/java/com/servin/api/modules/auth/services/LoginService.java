package com.servin.api.modules.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.servin.api.config.TokenService;
import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.auth.dto.LoginDto;
import com.servin.api.modules.employee.repository.EmployeeRepository;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public String login(LoginDto loginDto) {
        String cpf = loginDto.cpf().trim();

        Optional<Employee> employeeOpt = employeeRepository.findByCpf(cpf);

        if (employeeOpt.isEmpty())
            return null;

        Employee employee = employeeOpt.get();

        if (passwordEncoder.matches(loginDto.password(), employee.getPassword())) {
            return tokenService.generateToken(employee);
        }

        return null;
    }
}