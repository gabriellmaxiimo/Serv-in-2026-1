package com.servin.api.modules.professional.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.modules.professional.model.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID>{

	Optional<Professional> findById(UUID id);

	boolean existsByCpf(String cpf);

	boolean existsByEmail(String email);

	
}
