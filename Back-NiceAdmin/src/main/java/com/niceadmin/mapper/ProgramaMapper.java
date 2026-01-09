package com.niceadmin.mapper;


import com.niceadmin.dto.request.ProgramaRequest;
import com.niceadmin.entity.Programa;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProgramaMapper {

    Programa toEntity(ProgramaRequest dto);

    Object toDto(Programa entity);

    void updateEntityFromDto(ProgramaRequest dto, @MappingTarget Programa entity);

}