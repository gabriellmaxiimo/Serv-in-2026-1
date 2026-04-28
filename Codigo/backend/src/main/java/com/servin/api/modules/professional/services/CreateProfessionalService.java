package com.servin.api.modules.professional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

        String normalizedCpf = dto.getCpf().replaceAll("\\D", "");
        String normalizedEmail = dto.getEmail().trim().toLowerCase();
        String normalizedName = dto.getName().trim();
        String normalizedPhone = dto.getPhone().trim();

        if (normalizedCpf.length() != 11) {
            throw new IllegalArgumentException("CPF deve conter exatamente 11 dígitos numéricos");
        }

        if(repository.existsByCpf(normalizedCpf)){
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        if (repository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email já cadastrado");
        } 

        Professional professional = new Professional();

        professional.setCreatedAt(LocalDateTime.now());
        professional.setName(normalizedName);
        professional.setCpf(normalizedCpf);
        professional.setEmail(normalizedEmail);
        professional.setBirthDate(dto.getBirthDate());
        professional.setPhone(normalizedPhone);
        professional.setArea(dto.getArea());
        professional.setStatus(ProfessionalStatusEnum.AVAILABLE);

        if (dto.getRole() == null || dto.getRole().isBlank()) {
        throw new IllegalArgumentException("Cargo é obrigatório");
        }

        String roleName = dto.getRole().trim().toUpperCase();

        Role role = roleRepository.findByName(roleName)
            .orElseThrow(() -> new IllegalArgumentException("Cargo não encontrado"));

        professional.setRole(role);

        return repository.save(professional);
    }
}
