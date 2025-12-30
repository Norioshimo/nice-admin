package com.niceadmin.mapper;


import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.entity.Programa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramaMapper extends CommonMapper<Programa, ProgramaRequest>{


}