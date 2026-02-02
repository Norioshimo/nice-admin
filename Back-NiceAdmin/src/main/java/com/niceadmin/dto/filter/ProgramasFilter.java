package com.niceadmin.dto.filter;

import lombok.Data;

@Data
public class ProgramasFilter {

    private Long Id;
    private String nombre;

    @Override
    public String toString() {
        return "ProgramasFilter{" +
                "Id=" + Id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
