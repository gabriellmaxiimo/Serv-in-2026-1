package com.servin.api.modules.professional;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.servin.api.modules.professional.dto.CreateProfessionalDto;
import com.servin.api.modules.professional.dto.UpdateProfessionalDto;
import com.servin.api.modules.professional.enums.ProfessionalStatusEnum;
import com.servin.api.modules.professional.model.Professional;
import com.servin.api.modules.professional.repository.ProfessionalRepository;
import com.servin.api.modules.professional.services.CreateProfessionalService;
import com.servin.api.modules.professional.services.InactivateProfessionalService;
import com.servin.api.modules.professional.services.UpdateProfessionalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

	@Autowired
	private CreateProfessionalService createProfessionalService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private UpdateProfessionalService updateProfessionalService;

	@Autowired
	private InactivateProfessionalService inactivateProfessionalService;

	@GetMapping
	public ResponseEntity<List<Professional>> listAll(@RequestParam(required = false) ProfessionalStatusEnum status) {
		if (status != null) {
			return ResponseEntity.ok(professionalRepository.findByStatusAndDeletedAtIsNull(status));
		}
		return ResponseEntity.ok(professionalRepository.findByDeletedAtIsNull());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable UUID id) {
		return professionalRepository.findByIdAndDeletedAtIsNull(id)
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

	@PutMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable UUID id, @Valid @RequestBody UpdateProfessionalDto dto) {
		try {
			updateProfessionalService.execute(id, dto);
			return ResponseEntity.ok("Profissional atualizado com sucesso.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PatchMapping("/{id}/inactivate")
	public ResponseEntity<String> inactivate(@PathVariable UUID id) {
		try {
			inactivateProfessionalService.execute(id);
			return ResponseEntity.ok("Profissional inativado com sucesso.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable UUID id) {
		try {
			inactivateProfessionalService.execute(id);
			return ResponseEntity.ok("Profissional inativado com sucesso.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}
