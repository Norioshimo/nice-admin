package com.niceadmin.exception;

import com.niceadmin.dto.response.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(400, "Errores de validación", errors));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(404, ex.getMessage(), null));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleDataIntegrity(
            DataIntegrityViolationException ex) {

        Map<String, String> error = new HashMap<>();
        error.put("error", "Violación de integridad de datos");

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(400, "Error de integridad", error));
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleTransactionException(
            TransactionSystemException ex) {

        Throwable cause = ex.getRootCause();

        if (cause instanceof jakarta.validation.ConstraintViolationException violationEx) {

            Map<String, String> errors = new HashMap<>();
            violationEx.getConstraintViolations().forEach(v -> {
                String field = v.getPropertyPath().toString();
                String message = v.getMessage();
                errors.put(field, message);
            });

            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, "Errores de validación", errors));
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Error de transacción");

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(500, "Error de transacción", error));
    }
}
