package com.servin.api.modules.EventProfessional.repository;

import java.util.UUID;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.modules.EventProfessional.model.EventProfessional;
import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.professional.model.Professional;

public interface EventProfessionalRepository extends JpaRepository<EventProfessional, UUID> {

	boolean existsByEventAndProfessional(Event event, Professional professional);

    Optional<EventProfessional> findByConfirmationToken(String token);

}
