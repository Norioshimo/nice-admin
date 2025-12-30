package com.niceadmin.mapper;

import org.mapstruct.MappingTarget;

// Entity y EntityRequest
public interface CommonMapper<E,R>{

    E toEntity(R dto);

    Object toDto(E entity);

    void updateEntityFromDto(R dto, @MappingTarget E entity);

}
