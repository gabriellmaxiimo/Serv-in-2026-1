package com.servin.api.modules.professional;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
import com.servin.api.modules.professional.services.ReactivateProfessionalService;
import com.servin.api.modules.professional.services.UpdateProfessionalService;

import jakarta.validation.Valid;
import jakarta.validation.ConstraintViolationException;

@RestController
@RequestMapping("/professionals")
public class ProfessionalController {

	private String resolveErrorMessage(Exception e) {
		if (e instanceof IllegalArgumentException) {
			return e.getMessage();
		}

		Throwable cause = e.getCause();
		while (cause != null) {
			if (cause instanceof ConstraintViolationException) {
				return cause.getMessage();
			}
			cause = cause.getCause();
		}

		if (e instanceof DataIntegrityViolationException) {
			return "Violação de integridade dos dados. Verifique CPF, email e cargo.";
		}

		if (e.getMessage() != null && !e.getMessage().isBlank()) {
			return e.getMessage();
		}

		return "Erro interno ao processar profissional.";
	}

	@Autowired
	private CreateProfessionalService createProfessionalService;

	@Autowired
	private ProfessionalRepository professionalRepository;

	@Autowired
	private UpdateProfessionalService updateProfessionalService;

	@Autowired
	private InactivateProfessionalService inactivateProfessionalService;

	@Autowired
	private ReactivateProfessionalService reactivateProfessionalService;

	@GetMapping
	public ResponseEntity<List<Professional>> listAll(@RequestParam(required = false) ProfessionalStatusEnum status) {
		if (status != null) {
			// When filtering by status, show all professionals with that status (including those with deletedAt set)
			return ResponseEntity.ok(professionalRepository.findByStatus(status));
		}
		// When no status filter, show only non-deleted professionals
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
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resolveErrorMessage(e));
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable UUID id, @Valid @RequestBody UpdateProfessionalDto dto) {
		try {
			updateProfessionalService.execute(id, dto);
			return ResponseEntity.ok("Profissional atualizado com sucesso.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resolveErrorMessage(e));
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

	@PatchMapping("/{id}/reactivate")
	public ResponseEntity<String> reactivate(@PathVariable UUID id) {
		try {
			reactivateProfessionalService.execute(id);
			return ResponseEntity.ok("Profissional reativado com sucesso.");
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
