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
public class ReactivateProfessionalService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Transactional
    public void execute(UUID id) {
        Professional professional = professionalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Profissional não encontrado."));

        professional.setStatus(ProfessionalStatusEnum.AVAILABLE);
        professional.setUpdatedAt(LocalDateTime.now());

        professionalRepository.save(professional);
    }
}