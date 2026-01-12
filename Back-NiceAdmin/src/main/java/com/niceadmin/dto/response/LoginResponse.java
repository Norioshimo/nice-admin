package com.niceadmin.dto.response;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;

    private Long id;
    private String usuario;
    private String nombre;

}
