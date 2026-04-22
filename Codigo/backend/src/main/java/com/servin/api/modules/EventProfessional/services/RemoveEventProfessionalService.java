package com.servin.api.modules.EventProfessional.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.EventProfessional.repository.EventProfessionalRepository;

import jakarta.transaction.Transactional;

@Service
public class RemoveEventProfessionalService {

    //* Serviço que remove vínculo existente entre evento e profissional.

    private final EventProfessionalRepository eventProfessionalRepository;

    public RemoveEventProfessionalService(EventProfessionalRepository eventProfessionalRepository) {
        this.eventProfessionalRepository = eventProfessionalRepository;
    }

    @Transactional
    //* Remove o vínculo através dos ids de evento e profissional.
    public void remove(UUID eventId, UUID professionalId) {
        EventProfessional eventProfessional = eventProfessionalRepository
                .findByEventIdAndProfessionalId(eventId, professionalId)
                .orElseThrow(() -> new IllegalArgumentException("Vínculo entre evento e profissional não encontrado"));

        eventProfessionalRepository.delete(eventProfessional);
    }
}
