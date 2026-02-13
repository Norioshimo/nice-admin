package com.niceadmin.mapper;

import com.niceadmin.dto.request.RolprogramaRequest;
import com.niceadmin.dto.response.RolprogramaResponse;
import com.niceadmin.entity.Rolprograma;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RolprogramaMapper {

    @Mapping(source = "programaId.id", target = "programaId")
    @Mapping(source = "programaId", target = "programaResponse")
    RolprogramaResponse toDto(Rolprograma entity);

    @Mapping(source = "programaId", target = "programaId.id")
    Rolprograma toEntity(RolprogramaRequest dto);

    @Mapping(source = "programaId", target = "programaId.id")
    void updateEntityFromDto(RolprogramaRequest dto, @MappingTarget Rolprograma entity);

}
