package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank; 
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioChangePasswordRequest {

    @NotNull(message = "El id de usuario es requerido")
    private Long id;


    @NotNull(message = "El clave de usuario es requerido")
    @NotBlank(message = "El clave de usuario es requerido")
    private String clave;
}
