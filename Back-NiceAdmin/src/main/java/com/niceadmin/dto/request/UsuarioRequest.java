package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioRequest {

    @NotNull(message = "Nombre es requerido.")
    @NotBlank(message = "Nombre es requerido.")
    private String nombre;


    @NotNull(message = "Usuario es requerido.")
    @NotBlank(message = "Usuario es requerido.")
    private String usuario;


    @NotNull(message = "Clave es requerido.")
    @NotBlank(message = "Clave es requerido.")
    private String clave;



}
