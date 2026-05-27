package com.servin.api.modules.auth.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.servin.api.config.TokenService;
import com.servin.api.modules.auth.dto.LoginDto;
import com.servin.api.modules.employee.model.Employee;
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
        Employee employee = employeeRepository.findByCpf(cpf)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Funcionário não encontrado."));

        if (employee.getPassword() != null && !employee.getPassword().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Este usuário já possui senha cadastrada.");
        }

        String encodedPassword = passwordEncoder.encode(loginDto.password());
        employee.setPassword(encodedPassword);
        employeeRepository.save(employee);

        return tokenService.generateToken(employee);
    }

}
