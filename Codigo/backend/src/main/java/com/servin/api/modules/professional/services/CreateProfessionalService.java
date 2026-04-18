package com.servin.api.modules.professional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.role.*;
import com.servin.api.modules.professional.enums.ProfessionalAreaEnum;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.dto.CreateProfessionalDto;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.modules.role.model.Role;
import com.servin.api.modules.role.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
public class CreateProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

    @Autowired
    private RoleRepository roleRepository;

public void validateAdult(CreateProfessionalDto dto){ //*Valida a idade do profissional, não pode ser de menor */

    int age = Period.between(dto.getBirthDate(), LocalDate.now()).getYears();

    if (age < 18) {
        throw new IllegalArgumentException("O profissional deve ser maior de idade.");
        }
    }

    @Transactional
    public Professional execute(CreateProfessionalDto dto){ //*Recebe os dados do dto e cria o profissional após todas as validações

        validateAdult(dto);

        if(repository.existsByCpf(dto.getCpf())){
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        if (repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        } 

        Professional professional = new Professional();

        professional.setCreatedAt(LocalDateTime.now());
        professional.setName(dto.getName());
        professional.setCpf(dto.getCpf());
        professional.setEmail(dto.getEmail());
        professional.setBirthDate(dto.getBirthDate());
        professional.setPhone(dto.getPhone());
        professional.setArea(dto.getArea());
        professional.setStatus(ProfessionalStatusEnum.AVAILABLE);

        if (dto.getRole() == null || dto.getRole().isBlank()) {
        throw new IllegalArgumentException("Cargo é obrigatório");
        }

        String roleName = dto.getRole().trim().toUpperCase();

            Role role = roleRepository.findByName(roleName)
            .orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName(roleName);
        return roleRepository.save(newRole);
        });

        professional.setRole(role);

        return repository.save(professional);
    }
}
