package com.servin.api.modules.event.repository;

import com.servin.api.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    Optional<Event> findByIdAndDeletedAtIsNull(UUID id);

    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE LOWER(e.name) = LOWER(:name) AND e.deletedAt IS NULL")
    boolean existsBySimilarName(@Param("name") String name);
}