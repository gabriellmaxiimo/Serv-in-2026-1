package com.servin.api.modules.employee;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.model.Employee;
import com.servin.api.modules.employee.dto.CreateEmployeeDto;
import com.servin.api.modules.employee.dto.EditEmployeeDto;
import com.servin.api.modules.employee.services.CreateEmployeeService;
import com.servin.api.modules.employee.services.DeleteEmployeeService;
import com.servin.api.modules.employee.services.EditEmployeeService;
import com.servin.api.modules.employee.services.ListEmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private CreateEmployeeService createEmployeeService;

    @Autowired
    private EditEmployeeService editEmployeeService;

    @Autowired
    private ListEmployeeService listEmployeeService;

    @Autowired
    private DeleteEmployeeService deleteEmployeeService;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody CreateEmployeeDto dto) {
        try {
            createEmployeeService.execute(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Funcionário criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable UUID id,
                                         @Valid @RequestBody EditEmployeeDto dto) {
        try {
            editEmployeeService.execute(id, dto);
            return ResponseEntity.ok("Funcionário atualizado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Employee>> listAll() {
        try {
            List<Employee> employees = listEmployeeService.execute();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        try {
            deleteEmployeeService.execute(id);
            return ResponseEntity.ok("Funcionário deletado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}