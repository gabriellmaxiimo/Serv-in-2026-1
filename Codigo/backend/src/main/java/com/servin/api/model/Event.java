package com.servin.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.time.LocalDateTime;
import com.servin.api.enums.EventStatusEnum;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid DEFAULT uuid_generate_v4()", updatable = false, nullable = false)
    private UUID id;

    private String name;

    @Column(nullable = true)
    private String description;

    private LocalDateTime initialDate;

    @Column(nullable = true)
    private LocalDateTime finalDate;

    private String location;

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private EventStatusEnum status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

}