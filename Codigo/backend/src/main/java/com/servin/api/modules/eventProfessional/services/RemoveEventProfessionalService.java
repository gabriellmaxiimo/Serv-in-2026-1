package com.servin.api.modules.eventProfessional.services;

import java.util.UUID;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.servin.api.modules.eventProfessional.model.EventProfessional;
import com.servin.api.modules.eventProfessional.repository.EventProfessionalRepository;

import jakarta.transaction.Transactional;

@Service
public class RemoveEventProfessionalService {

    private final EventProfessionalRepository eventProfessionalRepository;

    public RemoveEventProfessionalService(EventProfessionalRepository eventProfessionalRepository) {
        this.eventProfessionalRepository = eventProfessionalRepository;
    }

    @Transactional
    // * Remove o vínculo através dos ids de evento e profissional.
    public void remove(UUID eventId, UUID professionalId) {
        EventProfessional eventProfessional = eventProfessionalRepository
                .findByEventIdAndProfessionalId(eventId, professionalId)
                .orElseThrow(() -> new IllegalArgumentException("Vínculo entre evento e profissional não encontrado"));

        eventProfessionalRepository.delete(Objects.requireNonNull(eventProfessional));
    }
}
