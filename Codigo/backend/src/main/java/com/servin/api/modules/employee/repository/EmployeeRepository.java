package com.servin.api.modules.employee.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.servin.api.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    // Busca funcionário específico ignorando os deletados (se você usar deletedAt)
    Optional<Employee> findByIdAndDeletedAtIsNull(UUID id);

    // Verifica se já existe funcionário com mesmo nome (evitar duplicidade)
    boolean existsByNameIgnoreCase(String name);

    // Retorna todos que NÃO foram deletados
    @Query("SELECT e FROM Employee e WHERE e.deletedAt IS NULL")
    List<Employee> findAllActive();

    @Query("SELECT e FROM Employee e WHERE e.cpf = :cpf AND e.deletedAt IS NULL")
    Optional<Employee> findByCpf(@Param("cpf") String cpf);
}