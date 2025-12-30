package com.niceadmin.mapper;


import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.entity.Programa;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProgramaMapper extends CommonMapper<Programa, ProgramaRequest>{

    void updateEntityFromDto(ProgramaRequest dto, @MappingTarget Programa entity);

}