package com.servin.api.modules.professional.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.model.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID>{

	boolean existsByCpf(String cpf);

	boolean existsByEmail(String email);
}
