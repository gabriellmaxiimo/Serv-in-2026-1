package com.servin.api.modules.EventProfessional.repository;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.professional.model.Professional;

public interface EventProfessionalRepository extends JpaRepository<EventProfessional, UUID> {

	//* Verifica se já existe vínculo entre o evento e o profissional.
	boolean existsByEventAndProfessional(Event event, Professional professional);

    //* Busca vínculo por token para confirmar/recusar convite.
    Optional<EventProfessional> findByConfirmationToken(String token);

    //* Lista vínculos de um evento.
    List<EventProfessional> findByEventId(UUID eventId);

    //* Lista vínculos de um profissional.
    List<EventProfessional> findByProfessionalId(UUID professionalId);

    //* Busca vínculo específico para remoção.
    Optional<EventProfessional> findByEventIdAndProfessionalId(UUID eventId, UUID professionalId);

}
