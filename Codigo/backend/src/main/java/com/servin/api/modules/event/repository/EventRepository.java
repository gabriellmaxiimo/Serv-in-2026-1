package com.servin.api.modules.event.repository;

import com.servin.api.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    // Busca um evento específico ignorando os deletados
    Optional<Event> findByIdAndDeletedAtIsNull(UUID id);

    // Validação para não criar eventos duplicados no mesmo horário
    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE (LOWER(e.name) = LOWER(:name) AND e.initialDate = :initialDate) AND e.deletedAt IS NULL")
    boolean existsBySimilarNameAndInitialDate(@Param("name") String name,
            @Param("initialDate") LocalDateTime initialDate);

    // Retorna todos os eventos que NÃO foram deletados
    @Query("SELECT e from Event e WHERE e.deletedAt IS NULL")
    List<Event> findAllActive();
}