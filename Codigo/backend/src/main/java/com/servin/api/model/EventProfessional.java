package com.servin.api.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.servin.api.enums.EventProfessionalStatusEnum;
import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.professional.model.Professional;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_professionals")

public class EventProfessional {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "professional_id")
    private Professional professional;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Enumerated(EnumType.STRING)
    private EventProfessionalStatusEnum status;

    private String confirmationToken;

    private LocalDateTime confirmedAt;

    private LocalDateTime createdAt;
}
