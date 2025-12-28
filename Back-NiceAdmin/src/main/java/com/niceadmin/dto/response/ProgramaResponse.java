package com.niceadmin.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProgramaResponse {

    private Long id;
    private String nombre;
    private Date createAt;
}
