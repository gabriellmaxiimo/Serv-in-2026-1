package com.servin.api.modules.employee.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.servin.api.modules.employee.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    Optional<Employee> findByIdAndDeletedAtIsNull(UUID id);

    boolean existsByNameIgnoreCase(String name);

    @Query("SELECT e FROM Employee e WHERE e.deletedAt IS NULL")
    List<Employee> findAllActive();

    @Query("SELECT e FROM Employee e WHERE e.cpf = :cpf AND e.deletedAt IS NULL")
    Optional<Employee> findByCpf(@Param("cpf") String cpf);
}