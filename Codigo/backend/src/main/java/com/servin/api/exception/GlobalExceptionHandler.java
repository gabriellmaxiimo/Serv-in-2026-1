package com.servin.api.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDuplicateKey(DataIntegrityViolationException ex) {
        if (ex.getMessage() != null && ex.getMessage().contains("cpf")) {
            return ResponseEntity.status(409).body("Erro: Este CPF já está cadastrado no sistema.");
        }
        return ResponseEntity.status(400).body("Erro ao processar os dados no banco de dados.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(400).body("Erro de validação: " + ex.getMessage());
    }
}

// Corrigir não está funcionando as mensagens de erro no painel do thunderclient.