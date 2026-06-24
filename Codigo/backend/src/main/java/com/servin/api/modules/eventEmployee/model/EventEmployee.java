package com.servin.api.modules.eventEmployee.model;

import java.util.UUID;

import com.servin.api.modules.employee.model.Employee;
import com.servin.api.modules.event.model.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "event_employees")
@NoArgsConstructor
@AllArgsConstructor
public class EventEmployee {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid DEFAULT uuid_generate_v4()", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

}
