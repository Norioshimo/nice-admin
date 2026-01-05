package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Usuario es requerido.")
    @NotNull(message = "Usuario es requerido.")
    public String usuario;

    @NotBlank(message = "Clave es requerido.")
    @NotNull(message = "Clave es requerido.")
    public String clave;
}
