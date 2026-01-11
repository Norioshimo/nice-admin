package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class RolRequest {

    @NotNull(message = "Nombre de Rol es requerido.")
    @NotBlank(message = "Nombre de Rol es requerido.")
    private String nombre;


    private List<@NotNull(message = "El ID del programa no puede ser nulo.")Long> programasList;
}
