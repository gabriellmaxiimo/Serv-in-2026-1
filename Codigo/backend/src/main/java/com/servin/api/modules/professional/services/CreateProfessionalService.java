package com.servin.api.modules.professional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.enums.ProfessionalAreaEnum;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.dto.CreateProfessionalDto;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;

@Service
public class CreateProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

public void validateAdult(CreateProfessionalDto dto){

    int age = Period.between(dto.getBirthDate(), LocalDate.now()).getYears();

    if (age < 18) {
        throw new IllegalArgumentException("O profissional deve ser maior de idade.");
        }
    }

    public Professional execute(CreateProfessionalDto dto){

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

        try {
            professional.setRole(dto.getRole().trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Função/Cargo inválidos");
        }
        
        professional.setStatus(ProfessionalStatusEnum.AVAILABLE);

        
        return repository.save(professional);
    }
}
