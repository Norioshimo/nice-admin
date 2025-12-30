package com.niceadmin.mapper;

import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.dto.request.UsuarioUpdateRequest;
import com.niceadmin.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends CommonMapper<Usuario,UsuarioRequest>{


    
    void updateEntityFromDto(UsuarioUpdateRequest dto, @MappingTarget Usuario entity);
}
