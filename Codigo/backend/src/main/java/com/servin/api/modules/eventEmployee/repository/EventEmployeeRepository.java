package com.servin.api.modules.eventEmployee.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.servin.api.modules.event.model.Event;
import com.servin.api.modules.eventEmployee.model.EventEmployee;

@Repository
public interface EventEmployeeRepository extends JpaRepository<EventEmployee, UUID> {

    @Query("SELECT ee.event FROM EventEmployee ee WHERE ee.employee.id = :employeeId")
    List<Event> findEventsByEmployeeId(@Param("employeeId") UUID employeeId);
}