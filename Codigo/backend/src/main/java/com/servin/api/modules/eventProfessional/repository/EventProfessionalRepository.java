package com.servin.api.modules.eventProfessional.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.eventProfessional.model.EventProfessional;
import com.servin.api.modules.professional.model.Professional;

public interface EventProfessionalRepository extends JpaRepository<EventProfessional, UUID> {

    // * Verifica se já existe vínculo entre o evento e o profissional.
    boolean existsByEventAndProfessional(Event event, Professional professional);

    // * Busca vínculo por token para confirmar/recusar convite.
    Optional<EventProfessional> findByConfirmationToken(String token);

    // * Lista vínculos de um evento.
    List<EventProfessional> findByEventId(UUID eventId);

    // * Lista vínculos de um profissional.
    List<EventProfessional> findByProfessionalId(UUID professionalId);

    // * Busca vínculo específico para remoção.
    Optional<EventProfessional> findByEventIdAndProfessionalId(UUID eventId, UUID professionalId);

    List<EventProfessional> findByProfessional(Professional professional);

    @Query(value = "SELECT e.description AS description, COUNT(p.id) AS totalProfessionals " +
            "FROM event_professionals ep " +
            "INNER JOIN events e ON e.id = ep.event_id " +
            "INNER JOIN professionals p ON p.id = ep.professional_id " +
            "GROUP BY e.description", nativeQuery = true)
    List<Map<String, Object>> countProfessionalsPerEvent();

}
