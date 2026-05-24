package com.servin.api.modules.checkin.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.modules.checkin.model.CheckIn;
import com.servin.api.modules.eventProfessional.model.EventProfessional;

public interface CheckInRepository extends JpaRepository<CheckIn, UUID> {
    boolean existsByEventProfessional(EventProfessional eventProfessional);

    Optional<CheckIn> findByEventProfessional(EventProfessional eventProfessional);
}
