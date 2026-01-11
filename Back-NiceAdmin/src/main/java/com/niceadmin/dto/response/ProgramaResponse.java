package com.niceadmin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgramaResponse  implements Serializable {

    private Long id;
    private String nombre;

}
