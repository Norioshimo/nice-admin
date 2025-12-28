package com.niceadmin.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProgramaRequest {
    @NotNull(message = "Nombre de programa es requerido.")
    @NotBlank(message = "Nombre de programa es requerido.")
    private String nombre;
}
