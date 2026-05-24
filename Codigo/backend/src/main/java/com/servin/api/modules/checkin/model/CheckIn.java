package com.servin.api.modules.checkin.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.servin.api.modules.eventProfessional.model.EventProfessional;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "check_ins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CheckIn {
    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "event_professional_id", nullable = false)
    private EventProfessional eventProfessional;

    @Column(name = "credential_number", nullable = false)
    private String credentialNumber;

    @Column(name = "check_in_at")
    private LocalDateTime checkInAt;

    @Column(name = "check_out_at")
    private LocalDateTime checkOutAt;
}
