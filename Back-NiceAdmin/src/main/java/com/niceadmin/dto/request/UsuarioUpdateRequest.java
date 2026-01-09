package com.niceadmin.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioUpdateRequest {

    @NotNull(message = "Nombre es requerido.")
    @NotBlank(message = "Nombre es requerido.")
    private String nombre;


    @NotNull(message = "Usuario es requerido.")
    @NotBlank(message = "Usuario es requerido.")
    private String usuario;

    private String clave;


    private String email;

    //@NotNull(message = "Rol es requerido.")
    //@NotBlank(message = "Rol es requerido.")
    private Long rolId;

}
