package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RolRequest {

    @NotNull(message = "Nombre de Rol es requerido.")
    @NotBlank(message = "Nombre de Rol es requerido.")
    private String nombre;
}
