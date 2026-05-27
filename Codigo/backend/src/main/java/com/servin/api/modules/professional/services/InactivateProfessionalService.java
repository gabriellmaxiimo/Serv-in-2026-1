package com.servin.api.modules.professional.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;

import jakarta.transaction.Transactional;

@Service
public class InactivateProfessionalService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Transactional
    public void execute(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("ID não pode ser nulo.");
        }
        Professional professional = professionalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Profissional não encontrado."));

        // Change status to INACTIVE (inactivation, not deletion)
        // Do NOT mark deletedAt - that's for real deletions
        professional.setStatus(ProfessionalStatusEnum.INACTIVE);
        professional.setUpdatedAt(LocalDateTime.now());

        professionalRepository.save(professional);
    }
}
