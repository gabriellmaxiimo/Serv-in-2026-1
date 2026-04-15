package com.servin.api.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.servin.api.enums.ProfessionalAreaEnum;
import com.servin.api.enums.ProfessionalStatusEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "professionals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Professional {

	@Id
	@GeneratedValue
	@Column(columnDefinition = "uuid DEFAULT uuid_generate_v4()", updatable = false, nullable = false)
	private UUID id;

	@NotBlank(message = "Nome é obrigatório.")
	@Column(nullable = false)
	private String name;

	@NotBlank(message = "CPF é obrigatório.")
	@Pattern(regexp = "^[0-9]{11}$", message = "CPF deve conter exatamente 11 dígitos numéricos.")
	@Column(nullable = false, unique = true, length = 11)
	private String cpf;

	@NotBlank(message = "E-mail é obrigatório.")
	@Email(message = "E-mail inválido.")
	@Column(nullable = false, unique = true)
	private String email;

	@NotNull(message = "Data de nascimento é obrigatória.")
	@Column(name = "birth_date", nullable = false)
	private LocalDate birthDate;

	@NotBlank(message = "Telefone é obrigatório.")
	@Column(nullable = false)
	private String phone;

	@NotNull(message = "Área é obrigatória.")
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ProfessionalAreaEnum area;

	@NotBlank(message = "Cargo é obrigatório.")
	@Column(nullable = false)
	private String role;

	@NotNull(message = "Status é obrigatório.")
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ProfessionalStatusEnum status;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = true)
	private LocalDateTime updatedAt;

	@Column(name = "deleted_at", nullable = true)
	private LocalDateTime deletedAt;
}
