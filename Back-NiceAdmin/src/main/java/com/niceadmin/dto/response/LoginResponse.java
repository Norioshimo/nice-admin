package com.niceadmin.dto.response;


import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class LoginResponse  implements Serializable {
    private String token;

    private Long id;
    private String usuario;
    private String nombre;

}
