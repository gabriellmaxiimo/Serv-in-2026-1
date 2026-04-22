package com.servin.api.modules.professional.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID>{

	Optional<Professional> findById(UUID id);

	Optional<Professional> findByIdAndDeletedAtIsNull(UUID id);

	boolean existsByCpf(String cpf);

	boolean existsByEmail(String email);

	boolean existsByCpfAndIdNot(String cpf, UUID id);

	boolean existsByEmailAndIdNot(String email, UUID id);

	List<Professional> findByDeletedAtIsNull();

	List<Professional> findByStatusAndDeletedAtIsNull(ProfessionalStatusEnum status);

	
}
