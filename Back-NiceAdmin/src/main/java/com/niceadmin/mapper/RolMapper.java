package com.niceadmin.mapper;


import com.niceadmin.dto.request.RolRequest;
import com.niceadmin.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RolMapper {

    Rol toEntity(RolRequest dto);

    Object toDto(Rol entity);


    void updateEntityFromDto(RolRequest dto, @MappingTarget Rol entity);

}
