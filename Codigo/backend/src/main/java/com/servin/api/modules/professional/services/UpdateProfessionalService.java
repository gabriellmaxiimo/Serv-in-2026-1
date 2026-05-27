package com.servin.api.modules.professional.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.dto.UpdateProfessionalDto;
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

        String normalizedCpf = dto.cpf().replaceAll("\\D", "");
        String normalizedEmail = dto.email().trim().toLowerCase();
        String normalizedName = dto.name().trim();
        String normalizedPhone = dto.phone().trim();

        if (normalizedCpf.length() != 11) {
            throw new IllegalArgumentException("CPF deve conter exatamente 11 dígitos numéricos");
        }

        if (professionalRepository.existsByCpfAndIdNot(normalizedCpf, id)) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        if (professionalRepository.existsByEmailAndIdNot(normalizedEmail, id)) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        String roleName = dto.role().trim().toUpperCase();
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Cargo não encontrado"));

        professional.setName(normalizedName);
        professional.setCpf(normalizedCpf);
        professional.setEmail(normalizedEmail);
        professional.setBirthDate(dto.birthDate());
        professional.setPhone(normalizedPhone);
        professional.setArea(dto.area());
        professional.setRole(role);
        professional.setStatus(dto.status());
        professional.setUpdatedAt(LocalDateTime.now());

        // Note: Do NOT modify deletedAt based on status
        // Status is for inactivation (business logic)
        // deletedAt is for soft deletion (system logic)

        return professionalRepository.save(professional);
    }
}
