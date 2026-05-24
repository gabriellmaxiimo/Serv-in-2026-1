package com.servin.api.modules.dashboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.professional.repository.ProfessionalRepository;

@Service
public class TotalProfessionalsService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    public int execute() {
        try {
            int totalActiveProfessionals = professionalRepository.findByDeletedAtIsNull().size();
            return totalActiveProfessionals;
        } catch (Exception e) {
            System.err.println("Erro ao calcular o total de profissionais: " + e.getMessage());
            return 0;
        }
    }

}
