package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class RolRequest {

    @NotNull(message = "Nombre de Rol es requerido.")
    @NotBlank(message = "Nombre de Rol es requerido.")
    private String nombre;

    @NotNull(message = "Estado es requerido.")
    private boolean estado;

    @Size(max = 2000, message = "La descripción no puede superar los 2000 caracteres.")
    private String descripcion;


    private List<RolprogramaRequest> rolprogramaList;
}
