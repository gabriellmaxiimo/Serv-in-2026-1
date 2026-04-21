package com.servin.api.modules.professional;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.professional.dto.CreateProfessionalDto;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.modules.professional.services.CreateProfessionalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

	@Autowired
	private CreateProfessionalService createProfessionalService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@GetMapping
	public ResponseEntity<List<Professional>> listAll() {
		return ResponseEntity.ok(professionalRepository.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable UUID id) {
		return professionalRepository.findById(id)
				.<ResponseEntity<?>>map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional não encontrado."));
	}

	@PostMapping
	public ResponseEntity<String> create(@Valid @RequestBody CreateProfessionalDto dto) {
		try {
			createProfessionalService.execute(dto);
			return ResponseEntity.status(HttpStatus.CREATED).body("Profissional criado com sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable UUID id) {
		try {
			if (!professionalRepository.existsById(id)) {
				throw new IllegalArgumentException("Profissional não encontrado.");
			}

			professionalRepository.deleteById(id);
			return ResponseEntity.ok("Profissional excluído com sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}


	// TODO: adicionar endpoint PUT /professionals/{id} para editar 		profissional.

	// TODO: adicionar endpoint PATCH /professionals/{id}/inactivate para inativar conta. 

	// TODO: trocar DELETE hard por soft delete/inativação. 
	
	// TODO: filtrar GET para retornar apenas profissionais ativos (ou aceitar query param status). 
	
	
	
}
