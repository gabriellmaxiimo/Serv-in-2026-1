package com.servin.api.modules.professional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.dto.UpdateProfessionalDto;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.modules.role.model.Role;
import com.servin.api.modules.role.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
public class UpdateProfessionalService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private RoleRepository roleRepository;

    private void validateAdult(UpdateProfessionalDto dto) {
        int age = Period.between(dto.birthDate(), LocalDate.now()).getYears();
        if (age < 18) {
            throw new IllegalArgumentException("O profissional deve ser maior de idade.");
        }
    }

    @Transactional
    public Professional execute(UUID id, UpdateProfessionalDto dto) {
        Professional professional = professionalRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new IllegalArgumentException("Profissional não encontrado."));

        validateAdult(dto);

        if (professionalRepository.existsByCpfAndIdNot(dto.cpf(), id)) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        if (professionalRepository.existsByEmailAndIdNot(dto.email(), id)) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        String roleName = dto.role().trim().toUpperCase();
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    return roleRepository.save(newRole);
                });

        professional.setName(dto.name().trim());
        professional.setCpf(dto.cpf().trim());
        professional.setEmail(dto.email().trim());
        professional.setBirthDate(dto.birthDate());
        professional.setPhone(dto.phone().trim());
        professional.setArea(dto.area());
        professional.setRole(role);
        professional.setStatus(dto.status());
        professional.setUpdatedAt(LocalDateTime.now());

        if (dto.status() == ProfessionalStatusEnum.INACTIVE) {
            if (professional.getDeletedAt() == null) {
                professional.setDeletedAt(LocalDateTime.now());
            }
        } else {
            professional.setDeletedAt(null);
        }

        return professionalRepository.save(professional);
    }
}
