package com.niceadmin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolResponse implements Serializable {

    private Long id;

    private String nombre;

    private Date createAt;

    private Date updateAt;

    private List<RolprogramaResponse> rolprogramaList;
}
