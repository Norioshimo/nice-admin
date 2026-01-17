package com.niceadmin.dto.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Builder
public class PerfilResponse implements Serializable {

    private Long id;

    private String nombre;

    private String usuario;

    private String email;

    private Date createAt;


    private String nombreRol;
}
