package com.niceadmin.dto.response;

import lombok.*;


import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {

    private Long id;

    private String nombre;

    private String usuario;

    private String email;

    private Date createAt;

    private Date updataAt;

    private Long rolId;


}
