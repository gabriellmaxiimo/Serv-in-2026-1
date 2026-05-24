package com.servin.api.modules.checkin.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CheckInResponseDTO {
    private UUID id;

    private String credentialNumber;

    private LocalDateTime checkInAt;

    private LocalDateTime checkOutAt;
}
