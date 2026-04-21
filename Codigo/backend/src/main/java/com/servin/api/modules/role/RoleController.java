package com.servin.api.modules.role;

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

import com.servin.api.modules.role.model.Role;
import com.servin.api.modules.role.repository.RoleRepository;

@RestController
@RequestMapping("/roles")
public class RoleController {

	@Autowired
	private RoleRepository roleRepository;

	@GetMapping
	public ResponseEntity<List<Role>> listAll() {
		return ResponseEntity.ok(roleRepository.findAll());
	}

	@PostMapping
	public ResponseEntity<String> create(@RequestBody Role role) {
		try {
			if (role.getName() == null || role.getName().isBlank()) {
				throw new IllegalArgumentException("Nome do cargo é obrigatório.");
			}

			String normalizedName = role.getName().trim().toUpperCase();

			if (roleRepository.findByName(normalizedName).isPresent()) {
				throw new IllegalArgumentException("Cargo já cadastrado.");
			}

			Role newRole = new Role();
			newRole.setName(normalizedName);
			roleRepository.save(newRole);

			return ResponseEntity.status(HttpStatus.CREATED).body("Cargo criado com sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable UUID id) {
		try {
			if (!roleRepository.existsById(id)) {
				throw new IllegalArgumentException("Cargo não encontrado.");
			}

			roleRepository.deleteById(id);
			return ResponseEntity.ok("Cargo excluído com sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}
