package com.niceadmin.dto.response;

import lombok.*;


import java.io.Serializable;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse  implements Serializable {

    private Long id;

    private String nombre;

    private String usuario;

    private String email;

    private Date createAt;

    private Date updataAt;

    private Long rolId;


}
