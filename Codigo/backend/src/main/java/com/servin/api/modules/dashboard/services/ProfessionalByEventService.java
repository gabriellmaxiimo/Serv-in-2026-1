package com.servin.api.modules.dashboard.services;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servin.api.modules.eventProfessional.repository.EventProfessionalRepository;


@Service
public class ProfessionalByEventService {

    @Autowired
    private EventProfessionalRepository eventProfessionalRepository;

    public List<Map<String, Object>> execute() {
        try {
            List<Map<String, Object>> professionalsPerEvent = eventProfessionalRepository
                    .countProfessionalsPerEvent();
            return professionalsPerEvent;
        } catch (Exception e) {
            System.err.println("Erro ao calcular o total de profissionais por evento: " + e.getMessage());
            return Collections.emptyList();
        }
    }

}
