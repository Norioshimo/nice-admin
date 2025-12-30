package com.niceadmin.mapper;

import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends CommonMapper<Usuario,UsuarioRequest>{

}
