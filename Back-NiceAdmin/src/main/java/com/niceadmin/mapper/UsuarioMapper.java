package com.niceadmin.mapper;

import com.niceadmin.dto.request.UsuarioRequest;
import com.niceadmin.dto.request.UsuarioUpdateRequest;
import com.niceadmin.dto.response.PerfilResponse;
import com.niceadmin.entity.Rol;
import com.niceadmin.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {


    Usuario toEntity(UsuarioRequest dto);

    Object toDto(Usuario entity);


    void updateEntityFromDto(UsuarioUpdateRequest dto, @MappingTarget Usuario entity);

    // Método que MapStruct puede usar para mapear Long -> Rol
    default Rol map(Long rolId) {
        if (rolId == null) {
            return null;
        }
        Rol rol = new Rol();
        rol.setId(rolId); // asumimos que la entidad Rol tiene un campo id
        return rol;
    }

    @Mapping(source = "rolId.nombre", target = "nombreRol")
    PerfilResponse toPerfilDto(Usuario entity);
}
